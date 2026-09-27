/**
 * BASTION PAMIĘCI – Interaktywna Mapa
 * Leaflet.js z OpenStreetMap
 */

(function() {
    'use strict';

    let map = null;
    let markers = [];
    let activeFilter = 'all';

    // Kolory markerów według kategorii
    const MARKER_COLORS = {
        represje: '#cc0000',
        walki:    '#ff6600',
        bunkry:   '#006633',
        pamiec:   '#3366cc'
    };

    // Ikony SVG dla markerów
    function createMarkerIcon(type, isHighImportance) {
        const color = MARKER_COLORS[type] || '#999';
        const size = isHighImportance ? 22 : 16;
        const svg = `
            <svg xmlns="http://www.w3.org/2000/svg" width="${size + 8}" height="${size + 14}" viewBox="0 0 ${size + 8} ${size + 14}">
                <defs>
                    <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
                        <feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="#000" flood-opacity="0.6"/>
                    </filter>
                </defs>
                <circle cx="${(size + 8) / 2}" cy="${size / 2 + 2}" r="${size / 2}" 
                    fill="${color}" stroke="rgba(255,255,255,0.5)" stroke-width="1.5"
                    filter="url(#shadow)"/>
                <line x1="${(size + 8) / 2}" y1="${size + 2}" 
                      x2="${(size + 8) / 2}" y2="${size + 13}" 
                    stroke="${color}" stroke-width="2" opacity="0.8"/>
                ${isHighImportance ? `<circle cx="${(size + 8) / 2}" cy="${size / 2 + 2}" r="${size / 2 - 4}" fill="rgba(255,255,255,0.25)"/>` : ''}
            </svg>
        `;
        return L.divIcon({
            html: svg,
            iconSize: [size + 8, size + 14],
            iconAnchor: [(size + 8) / 2, size + 13],
            popupAnchor: [0, -(size + 10)],
            className: 'custom-marker'
        });
    }

    // Buduje HTML popup-a dla markera
    function buildPopupHTML(point) {
        const typeLabels = {
            represje: 'Miejsce represji',
            walki:    'Miejsce walki',
            bunkry:   'Bunkier / kwatera',
            pamiec:   'Miejsce pamięci'
        };
        
        return `
            <div class="popup-title">${point.name}</div>
            <span class="popup-type popup-type-${point.type}">${typeLabels[point.type] || point.type}</span>
            <div class="popup-desc">${point.description}</div>
            <div class="popup-date">
                <i class="fas fa-clock" style="margin-right:4px;"></i>${point.date}
            </div>
            ${point.address ? `<div class="popup-date" style="color: #c8b89a; margin-top: 4px;">
                <i class="fas fa-map-marker-alt" style="margin-right:4px;"></i>${point.address}
            </div>` : ''}
            <div class="popup-date" style="color: rgba(139,105,20,0.5); margin-top:6px; font-size:0.6rem;">
                Źródło: ${point.source}
            </div>
        `;
    }

    // Inicjalizuje mapę Leaflet
    function initMap() {
        const mapEl = document.getElementById('lubartowMap');
        if (!mapEl || typeof L === 'undefined') return;

        // Centrum mapy – Lubartów
        map = L.map('lubartowMap', {
            center: [51.43, 22.70],
            zoom: 10,
            zoomControl: true,
            attributionControl: false
        });

        // Warstwa kafelkowa – OpenStreetMap z ciemnym motywem przez filtr CSS.
        // CartoDB (używany do VIII 2026) wymaga darmowego klucza API: carto.com/basemaps/apikey.
        // Poniższy OSM NIE wymaga klucza; ciemność dodaje styl w css/style.css (#lubartowMap .leaflet-tile).
        // Dawny URL CartoDB pozostaje na końcu jako zakomentowany fallback.
        const tileProvider = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            subdomains: 'abc',
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        // Auto-fallback: gdyby główna warstwa zwróciła błąd (rate-limit, awaria),
        // bezpiecznie przełącz na kopię Humanitarnej Grupy OSM Francja.
        tileProvider.on('tileerror', () => {
            if (window._bastionMapFallbackUsed) return;
            window._bastionMapFallbackUsed = true;
            console.warn('Bastion: główna warstwa kafelkowa zwróciła błąd, przełączam na OSM France HOT.');
            const fallback = L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
                maxZoom: 19,
                subdomains: 'abc',
                attribution: '&copy; OpenStreetMap contributors, Tiles HOT'
            });
            map.removeLayer(tileProvider);
            fallback.addTo(map);
        });

        // Dawna warstwa CartoDB dark_all — zakomentowana. Aby wrócić do niej:
        // 1) zarejestruj się na carto.com/basemaps/apikey (darmowe, bez konta),
        // 2) wstaw klucz w URL po '?key=', 3) odkomentuj poniższy blok i zakomentuj powyższy OSM.
        // L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png?key=TWOJ_KLUCZ', {
        //     maxZoom: 18, subdomains: 'abcd',
        //     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
        // }).addTo(map);

        // Dodaj atrybuty
        L.control.attribution({ position: 'bottomleft', prefix: false })
            .addAttribution('© OpenStreetMap · IPN Lublin')
            .addTo(map);

        // Dodaj wszystkie markery
        addMarkers(MAP_POINTS);

        // Generuj listę punktów
        generatePointsList(MAP_POINTS);
    }

    // Dodaje markery do mapy
    function addMarkers(points) {
        // Usuń stare markery
        markers.forEach(m => map.removeLayer(m));
        markers = [];

        points.forEach(point => {
            if (activeFilter !== 'all' && point.type !== activeFilter) return;

            const icon = createMarkerIcon(point.type, point.importance === 'high');
            const marker = L.marker([point.lat, point.lng], { icon })
                .addTo(map)
                .bindPopup(buildPopupHTML(point), {
                    maxWidth: 300,
                    className: 'bastion-popup'
                });

            // Efekt hover
            marker.on('mouseover', function() {
                this.openPopup();
            });

            markers.push(marker);
            point._marker = marker;
        });
    }

    // Filtrowanie markerów
    function setupFilters() {
        const legendItems = document.querySelectorAll('.legend-item');
        legendItems.forEach(item => {
            item.addEventListener('click', function() {
                legendItems.forEach(li => li.classList.remove('active'));
                this.classList.add('active');
                activeFilter = this.getAttribute('data-filter') || 'all';
                addMarkers(MAP_POINTS);
                generatePointsList(MAP_POINTS.filter(p => activeFilter === 'all' || p.type === activeFilter));
            });
        });
    }

    // Generuje listę kart punktów pod mapą
    function generatePointsList(points) {
        const grid = document.getElementById('mplGrid');
        if (!grid) return;

        const filtered = activeFilter === 'all' ? points : points.filter(p => p.type === activeFilter);

        grid.innerHTML = filtered.map(point => {
            const color = MARKER_COLORS[point.type] || '#999';
            const typeLabels = {
                represje: 'Represje',
                walki:    'Walki',
                bunkry:   'Bunkier',
                pamiec:   'Pamięć'
            };
            return `
                <div class="mpl-card fade-in" data-point-id="${point.id}" onclick="focusMapPoint('${point.id}')">
                    <div class="mpl-card-dot" style="background:${color};"></div>
                    <div class="mpl-card-content">
                        <div class="mpl-card-name">${point.name}</div>
                        <div class="mpl-card-desc">
                            <span style="color:${color}; font-size:0.65rem;">[${typeLabels[point.type]}]</span> 
                            ${point.date}
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        // Trigger fade-in dla nowych kart
        requestAnimationFrame(() => {
            grid.querySelectorAll('.fade-in').forEach(el => {
                setTimeout(() => el.classList.add('visible'), 50);
            });
        });
    }

    // Funkcja globalna – centruj mapę na wybranym punkcie
    window.focusMapPoint = function(pointId) {
        const point = MAP_POINTS.find(p => p.id === pointId);
        if (!point || !map) return;
        
        map.setView([point.lat, point.lng], 13, { animate: true, duration: 1 });
        if (point._marker) {
            point._marker.openPopup();
        }
        
        // Przewiń do mapy
        document.getElementById('mapa').scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    // Inicjalizacja po załadowaniu DOM
    function init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', function() {
                initMap();
                setupFilters();
            });
        } else {
            initMap();
            setupFilters();
        }
    }

    init();

})();

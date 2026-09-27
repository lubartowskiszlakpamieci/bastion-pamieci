/**
 * BASTION PAMIĘCI - Interaktywna Mapa
 * Leaflet.js z OpenStreetMap / Carto
 */

(function() {
    'use strict';

    let map = null;
    let markers = [];
    let activeFilter = 'all';

    // Kolory markerów według kategorii
    const MARKER_COLORS = {
        represje: '#cc0000',
        walki: '#ff6600',
        bunkry: '#006633',
        pamiec: '#3366cc'
    };

    // Ikony SVG dla markerów
    function createMarkerIcon(type, isHighImportance) {
        const color = MARKER_COLORS[type] || '#999999';
        const size = isHighImportance ? 24 : 18;
        
        const svg = `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="${size}" height="${size}">
                <circle cx="12" cy="12" r="9" fill="${color}" stroke="#ffffff" stroke-width="2.5"/>
                ${isHighImportance ? `<circle cx="12" cy="12" r="4" fill="#ffffff"/>` : ''}
            </svg>
        `;

        return L.divIcon({
            html: svg,
            className: 'custom-map-marker',
            iconSize: [size, size],
            iconAnchor: [size / 2, size / 2],
            popupAnchor: [0, -size / 2]
        });
    }

    // Inicjalizacja mapy Leaflet
    function initMap() {
        const mapContainer = document.getElementById('map');
        if (!mapContainer) return;

        // Domyślny środek (rejon Lubartowa/Spleczy/Radzic)
        const defaultCenter = [51.462, 22.608];
        const defaultZoom = 11;

        map = L.map('map', {
            center: defaultCenter,
            zoom: defaultZoom,
            zoomControl: true,
            scrollWheelZoom: false
        });

        // TŁO MAPY (Zmienione na otwarte kafelki Carto Voyager - NIE WYMAGAJĄ KLUCZA API)
        L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
            subdomains: 'abcd',
            maxZoom: 19
        }).addTo(map);

        // Załaduj punkty, jeśli są dostępne w obiekcie window.MAP_PLACES
        if (window.MAP_PLACES && Array.isArray(window.MAP_PLACES)) {
            loadMarkers(window.MAP_PLACES);
        }

        // Podpięcie przycisków filtrowania
        setupFilterButtons();
    }

    // Wczytywanie punktów na mapę
    function loadMarkers(places) {
        // Czyszczenie istniejących markerów
        markers.forEach(m => map.removeLayer(m.instance));
        markers = [];

        const bounds = L.latLngBounds();

        places.forEach(place => {
            if (!place.lat || !place.lng) return;

            const icon = createMarkerIcon(place.type, place.highImportance);
            const marker = L.marker([place.lat, place.lng], { icon: icon });

            // Zbudowanie zawartości Popupa
            const popupContent = `
                <div class="map-popup-card">
                    <span class="badge badge-${place.type}">${getCategoryName(place.type)}</span>
                    <h3>${place.title}</h3>
                    <p>${place.description || ''}</p>
                    ${place.date ? `<div class="popup-date">📅 ${place.date}</div>` : ''}
                    ${place.location ? `<div class="popup-location">📍 ${place.location}</div>` : ''}
                </div>
            `;

            marker.bindPopup(popupContent);
            marker.addTo(map);

            bounds.extend([place.lat, place.lng]);

            markers.push({
                id: place.id,
                type: place.type,
                instance: marker
            });
        });

        // Dopasowanie widoku do wszystkich punktów
        if (markers.length > 0) {
            map.fitBounds(bounds, { padding: [30, 30] });
        }
    }

    // Nazwy kategorii dla etykiet
    function getCategoryName(type) {
        const names = {
            represje: 'Miejsce Represji',
            walki: 'Miejsce Walk',
            bunkry: 'Bunkier / Kwatera',
            pamiec: 'Miejsce Pamięci'
        };
        return names[type] || 'Inne';
    }

    // Obsługa filtrowania
    function setupFilterButtons() {
        const filterBtns = document.querySelectorAll('[data-filter]');
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const filter = this.getAttribute('data-filter');
                
                filterBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');

                activeFilter = filter;

                markers.forEach(m => {
                    if (filter === 'all' || m.type === filter) {
                        map.addLayer(m.instance);
                    } else {
                        map.removeLayer(m.instance);
                    }
                });
            });
        });
    }

    // Uruchomienie po załadowaniu drzewa DOM
    document.addEventListener('DOMContentLoaded', initMap);

})();

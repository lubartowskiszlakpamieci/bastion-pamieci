/**
 * BASTION PAMIĘCI – Galeria Chwały
 * Karty żołnierzy z modalem szczegółów
 */

(function() {
    'use strict';

    let activeFilter = 'wszyscy';

    // Renderuje siatę kart galerii
    function renderGallery(filter) {
        const grid = document.getElementById('galleryGrid');
        if (!grid) return;

        const filtered = filter === 'wszyscy'
            ? SOLDIERS
            : SOLDIERS.filter(s => s.category === filter || 
                (filter === 'polegli' && s.died));

        grid.innerHTML = filtered.map((soldier, idx) => {
            const rankClass = soldier.category === 'dowodcy' ? 'rank-dowodca' : 
                              soldier.died ? 'rank-polegly' : 'rank-partyzant';
            const rankLabel = soldier.category === 'dowodcy' ? 'Dowódca' :
                              soldier.died ? 'Poległy / Zamordowany' : 'Partyzant';

            const delayClass = `fade-in fade-in-delay-${(idx % 3) + 1}`;

            return `
                <div class="gallery-card ${delayClass}" 
                     data-category="${soldier.category}" 
                     data-died="${soldier.died}"
                     onclick="openSoldierModal('${soldier.id}')">
                    <div class="gc-photo">
                        <span class="gc-rank-badge ${rankClass}">${rankLabel}</span>
                        ${soldier.died ? '<span class="gc-casualty-mark"><i class="fas fa-cross"></i></span>' : ''}
                        <i class="fas fa-user-shield gc-photo-icon"></i>
                    </div>
                    <div class="gc-body">
                        <div class="gc-name">${soldier.name}</div>
                        <div class="gc-codename">${soldier.codename}</div>
                        <div class="gc-info">
                            <div><i class="fas fa-star" style="font-size:0.6rem; margin-right:4px; color: #8b6914;"></i>${soldier.rank}</div>
                            <div><i class="fas fa-calendar" style="font-size:0.6rem; margin-right:4px; color: #8b6914;"></i>${soldier.years}</div>
                            <div><i class="fas fa-tasks" style="font-size:0.6rem; margin-right:4px; color: #8b6914;"></i>${soldier.role}</div>
                        </div>
                        <div class="gc-signature">${soldier.signature}</div>
                    </div>
                </div>
            `;
        }).join('');

        // Trigger animacji wejścia
        requestAnimationFrame(() => {
            grid.querySelectorAll('.fade-in').forEach((el, i) => {
                setTimeout(() => el.classList.add('visible'), i * 80);
            });
        });
    }

    // Otwiera modal ze szczegółami żołnierza
    window.openSoldierModal = function(soldierId) {
        const soldier = SOLDIERS.find(s => s.id === soldierId);
        if (!soldier) return;

        const modal = document.getElementById('modalOverlay');
        const content = document.getElementById('modalContent');
        if (!modal || !content) return;

        content.innerHTML = `
            <div class="modal-photo">
                <i class="fas fa-user-shield"></i>
            </div>
            <div class="modal-name">${soldier.name}</div>
            <div class="modal-codename">${soldier.codename}</div>
            <table class="modal-table">
                <tr>
                    <td>Stopień:</td>
                    <td>${soldier.rank}</td>
                </tr>
                <tr>
                    <td>Lata życia:</td>
                    <td>${soldier.years}</td>
                </tr>
                <tr>
                    <td>Urodził/a się:</td>
                    <td>${soldier.born}</td>
                </tr>
                <tr>
                    <td>Śmierć / Aresztowanie:</td>
                    <td>${soldier.died_place}</td>
                </tr>
                <tr>
                    <td>Rola:</td>
                    <td>${soldier.role}</td>
                </tr>
                <tr>
                    <td>Organizacje:</td>
                    <td>${soldier.organizations}</td>
                </tr>
            </table>
            <div class="modal-desc">${soldier.info}</div>
            <div class="modal-sig">
                <i class="fas fa-archive" style="margin-right:6px;"></i>
                ${soldier.signature}
            </div>
        `;

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    // Obsługa filtrów galerii
    function setupGalleryFilters() {
        const buttons = document.querySelectorAll('.gf-btn');
        buttons.forEach(btn => {
            btn.addEventListener('click', function() {
                buttons.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                activeFilter = this.getAttribute('data-filter');
                renderGallery(activeFilter);
            });
        });
    }

    // Obsługa modalu
    function setupModal() {
        const modal = document.getElementById('modalOverlay');
        const closeBtn = document.getElementById('modalClose');

        if (closeBtn) {
            closeBtn.addEventListener('click', closeModal);
        }

        if (modal) {
            modal.addEventListener('click', function(e) {
                if (e.target === modal) closeModal();
            });
        }

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') closeModal();
        });
    }

    function closeModal() {
        const modal = document.getElementById('modalOverlay');
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    // Inicjalizacja
    function init() {
        renderGallery('wszyscy');
        setupGalleryFilters();
        setupModal();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();

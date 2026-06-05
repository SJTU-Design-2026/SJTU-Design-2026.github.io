window.CONFIG = {
    keys: [
        'u_ball_count', 'u_base_radius', 'u_decay', 'u_focus',
        'u_warp_strength', 'u_flow_speed', 'u_silver_cut', 'u_gold_cut',
        'u_type_speed', 'u_box_count'
    ],
    mappings: [
        { id: 'u_ball_count', target: 'val-ballCount', fix: 0 },
        { id: 'u_base_radius', target: 'val-baseRadius', fix: 2 },
        { id: 'u_decay', target: 'val-decay', fix: 2 },
        { id: 'u_focus', target: 'val-focus', fix: 2 },
        { id: 'u_warp_strength', target: 'val-warpStrength', fix: 2 },
        { id: 'u_flow_speed', target: 'val-flowSpeed', fix: 2 },
        { id: 'u_silver_cut', target: 'val-silverCut', fix: 2 },
        { id: 'u_gold_cut', target: 'val-goldCut', fix: 2 },
        { id: 'u_type_speed', target: 'val-typeSpeed', fix: 0 },
        { id: 'u_box_count', target: 'val-boxCount', fix: 0 }
    ],
    
    layers: { layer1: true, layer2: true, layer3: true, layer4: true },
    
    initLayerToggles: function(onToggleCallback) {
        [1, 2, 3, 4].forEach(num => {
            const toggleEl = document.getElementById(`toggle-layer${num}`);
            const detailsEl = document.querySelector(`#section-layer${num} details`);

            function syncState(isVisible) {
                if (detailsEl && detailsEl.open !== isVisible) {
                    detailsEl.open = isVisible;
                }
                if (toggleEl && toggleEl.checked !== isVisible) {
                    toggleEl.checked = isVisible;
                }
                window.CONFIG.layers[`layer${num}`] = isVisible;
                if (onToggleCallback) onToggleCallback(`layer${num}`, isVisible);
            }

            if (toggleEl) {
                toggleEl.addEventListener('change', (e) => {
                    syncState(e.target.checked);
                });
            }

            if (detailsEl) {
                detailsEl.addEventListener('toggle', () => {
                    syncState(detailsEl.open);
                });
                syncState(detailsEl.open);
            }
        });
    }
};
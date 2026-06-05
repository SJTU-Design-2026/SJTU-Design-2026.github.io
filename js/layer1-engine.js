(function() {
    const layer1Container = document.getElementById('layer1-container');
    const toggleCheckbox = document.getElementById('toggle-layer1');

    function checkLayoutResponse() {
        if (!layer1Container) return;

        // 1. 首先核验控制台面板的“眼睛显示隐藏开关”状态
        const isToggleVisible = toggleCheckbox ? toggleCheckbox.checked : true;
        
        // 实时同步状态至全局系统映射表中
        if (window.CONFIG) {
            window.CONFIG.layers.layer1 = isToggleVisible;
        }

        // 如果用户在列表里点灭了显示，直接关断不显示
        if (!isToggleVisible) {
            layer1Container.style.display = 'none';
            return;
        }

        // 2. 画布比例已由 CSS 固定，展览信息仅由用户开关决定是否显示
        const viewport = document.getElementById('canvas-frame');
        if (!viewport) return;

        // 仅当画布存在且用户未关闭显示时，保持顶层信息可见
        layer1Container.style.display = 'block';
        if (window.CONFIG && typeof window.CONFIG.getLayer1StyleConfig === 'function') {
            layer1Container.style.mixBlendMode = window.CONFIG.getLayer1StyleConfig().blendMode;
        }
    }

    // 绑定高频重置监听与开关 change 联动
    window.addEventListener('resize', checkLayoutResponse);
    if (toggleCheckbox) {
        toggleCheckbox.addEventListener('change', checkLayoutResponse);
    }

    // 执行系统开局初验判定
    checkLayoutResponse();
})();
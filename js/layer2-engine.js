(function() {
    const canvas = document.getElementById('layer2-canvas');
    const ctx = canvas.getContext('2d');

    let activeParagraphs = [];

    function resizeCanvas() {
        const frame = document.getElementById('canvas-frame') || document.getElementById('canvas-container');
        if (frame) {
            canvas.width = frame.clientWidth;
            canvas.height = frame.clientHeight;
        }
    }

    class StatefulPlaceholderGroup {
        constructor(canvasWidth, canvasHeight, maxBarWidth, boxHeight, fullyGrown = false) {
            this.maxRows = Math.floor(Math.random() * 10) + 3; // 3-12行
            this.barHeight = boxHeight * 3; // 3倍尺寸体量感
            this.groupWidth = (Math.random() * (maxBarWidth - 60) + 60) * 3;
            this.lineSpacing = -1; // 负行距叠印

            this.totalMaxHeight = this.maxRows * this.barHeight + (this.maxRows - 1) * this.lineSpacing;
            this.y = Math.random() * (canvasHeight + this.totalMaxHeight * 0.5) - this.totalMaxHeight * 0.25;
            
            // 80%靠极左，20%靠极右
            this.align = Math.random() < 0.80 ? 'left' : 'right';

            this.lines = [];
            for (let i = 0; i < this.maxRows; i++) {
                let wFactor = 0.5 + Math.random() * 0.5;
                if (i === this.maxRows - 1) wFactor = 0.25 + Math.random() * 0.35; // 文本尾行短留白
                this.lines.push(this.groupWidth * wFactor);
            }

            this.currentVisibleRows = fullyGrown ? this.maxRows : (Math.floor(Math.random() * 3) + 1);

            this.startTime = performance.now();
            this.duration = 1800 + Math.random() * 1500; 
            this.lastGrowthTime = performance.now();
            this.growthInterval = 220 + Math.random() * 150; 
        }

        update() {
            let now = performance.now();
            if (now - this.startTime > this.duration) return false;

            if (now - this.lastGrowthTime > this.growthInterval) {
                if (this.currentVisibleRows < this.maxRows) {
                    let nextBatch = Math.floor(Math.random() * 3) + 1;
                    this.currentVisibleRows = Math.min(this.maxRows, this.currentVisibleRows + nextBatch);
                }
                this.lastGrowthTime = now;
            }
            return true;
        }

        // 向上下文登记自身的路径网格
        recordPath(context, canvasWidth) {
            let currentY = this.y;
            for (let i = 0; i < this.currentVisibleRows; i++) {
                let w = this.lines[i];
                let drawX = (this.align === 'right') ? (canvasWidth - w) : 0;
                context.rect(drawX, currentY, w, this.barHeight);
                currentY += this.barHeight + this.lineSpacing;
            }
        }
    }

    function drawEngine() {
        if (window.CONFIG && window.CONFIG.layers.layer2 === false) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            activeParagraphs = [];
            requestAnimationFrame(drawEngine);
            return;
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        let progress = 0;
        let isPaused = false;
        let pauseElapsed = 0;
        if (window.LAYER3_SHARED) {
            progress = window.LAYER3_SHARED.progress;
            isPaused = window.LAYER3_SHARED.isPaused;
            pauseElapsed = window.LAYER3_SHARED.pauseElapsed || 0;
        }

        const boxCountSlider = parseInt(document.getElementById('u_box_count').value) || 40;
        const maxWidthPercent = 0.48; // 原为u_box_width，已删除，改用固定值
        const boxHeight = 12; // 原为u_box_height，已删除，改用固定值
        const maxBarWidth = canvas.width * maxWidthPercent;

        let baseMaxGroups = boxCountSlider;
        let currentAllowedGroups = 0;

        // 开局直接硬铺满
        if (progress === 0 && !isPaused && activeParagraphs.length === 0) {
            while (activeParagraphs.length < baseMaxGroups) {
                activeParagraphs.push(new StatefulPlaceholderGroup(canvas.width, canvas.height, maxBarWidth, boxHeight, true));
            }
        }

        // 编译期数量生命周期递减
        if (!isPaused) {
            currentAllowedGroups = Math.ceil(baseMaxGroups * (1.0 - progress * 0.8));
        } else {
            if (pauseElapsed >= 4930) {
                currentAllowedGroups = 0; 
            } else {
                let pauseProgress = pauseElapsed / 5000;
                currentAllowedGroups = Math.ceil(baseMaxGroups * 0.2 * (1.0 - pauseProgress));
                if (currentAllowedGroups < 1) currentAllowedGroups = 1; 
            }
        }

        if (window.CONFIG && typeof window.CONFIG.getBoxStyleConfig === 'function') {
            canvas.style.mixBlendMode = window.CONFIG.getBoxStyleConfig().blendMode;
        }

        activeParagraphs = activeParagraphs.filter(p => p.update());

        if (currentAllowedGroups === 0) {
            activeParagraphs.length = 0;
        } else if (activeParagraphs.length > currentAllowedGroups) {
            activeParagraphs.splice(currentAllowedGroups);
        }

        if (currentAllowedGroups > 0 && activeParagraphs.length < currentAllowedGroups && Math.random() < 0.04) {
            activeParagraphs.push(new StatefulPlaceholderGroup(canvas.width, canvas.height, maxBarWidth, boxHeight, false));
        }

        // 一整张不规整的动态材质 ＋ 占位符全局剪辑蒙版
        if (activeParagraphs.length > 0) {
            ctx.save(); // 1. 保存画布初始状态，准备建立安全裁剪区

            ctx.beginPath();
            // 2. 依次遍历所有在场的段落块，将它们的几何矩形路径全部合并注入同一个 path 中
            activeParagraphs.forEach(p => p.recordPath(ctx, canvas.width));
            
            // 3. 激活全局剪辑蒙版 画布后续绘制的内容只有在这层占位符格点内才会显现
            ctx.clip(); 

            // 4. 在底层铺设大面积扭曲流动的金属反光材质
            let t = performance.now() * 0.0003;
            let baseSilver = "#CCC8C5";
            if (window.CONFIG && typeof window.CONFIG.getBoxStyleConfig === 'function') {
                baseSilver = window.CONFIG.getBoxStyleConfig().color;
            }
            let goldColor = "#C4A050";       

            // 采用中心点大幅度非对称旋转径向渐变
            let cx = canvas.width * 0.2 + Math.sin(t * 1.2) * canvas.width * 0.45;
            let cy = canvas.height * 0.4 + Math.cos(t * 0.8) * canvas.height * 0.35;
            let r1 = canvas.width * 0.02;
            let r2 = canvas.width * 1.5 + Math.sin(t * 0.4) * canvas.width * 0.3;

            let fullScreenGrad = ctx.createRadialGradient(cx, cy, r1, cx + Math.sin(t)*150, cy + Math.cos(t)*150, r2);
            
            // 颜色占比模型
            fullScreenGrad.addColorStop(0.0, goldColor);
            fullScreenGrad.addColorStop(0.08, goldColor);
            fullScreenGrad.addColorStop(0.16, baseSilver);
            fullScreenGrad.addColorStop(0.44, baseSilver);
            fullScreenGrad.addColorStop(0.52, "#FFFFFF"); 
            fullScreenGrad.addColorStop(0.62, baseSilver);
            fullScreenGrad.addColorStop(0.85, "#D4D0CE"); 
            fullScreenGrad.addColorStop(1.0, baseSilver);

            // 5. 将流动金属色块满铺填满整个屏幕
            ctx.fillStyle = fullScreenGrad;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.restore(); // 6. 恢复画布状态，释放蒙版
        }

        requestAnimationFrame(drawEngine);
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    drawEngine();
})();
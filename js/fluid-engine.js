const canvas = document.getElementById('gl-canvas');
const gl = canvas.getContext('webgl');

if (!gl) { alert('WebGL Unsupported'); }

let program;
let uniforms = {};

function initGL() {
    function createShader(gl, type, source) {
        const shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        return shader;
    }
    // 读取 window 作用域下的着色器代码
    const vertexShader = createShader(gl, gl.VERTEX_SHADER, window.vsSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, window.fsSource);

    program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.useProgram(program);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
        -1, -1, 1, -1, -1, 1,
        -1, 1, 1, -1, 1, 1,
    ]), gl.STATIC_DRAW);

    const positionLocation = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    // 缓存全局 Uniform 位置
    uniforms['u_resolution'] = gl.getUniformLocation(program, 'u_resolution');
    uniforms['u_time'] = gl.getUniformLocation(program, 'u_time');
    
    // 从 CONFIG 模块批量获取位置
    window.CONFIG.keys.forEach(key => {
        uniforms[key] = gl.getUniformLocation(program, key);
    });
}

function updateUniformsFromUI() {
    gl.useProgram(program);
    window.CONFIG.keys.forEach(key => {
        const inputEl = document.getElementById(key);
        if (inputEl) {
            gl.uniform1f(uniforms[key], parseFloat(inputEl.value));
        }
    });
}

function setupUIListeners() {
    window.CONFIG.mappings.forEach(item => {
        const inputEl = document.getElementById(item.id);
        
        if (inputEl) {
            inputEl.addEventListener('input', () => {
                const displayEl = document.getElementById(item.target);
                if (displayEl) {
                    displayEl.innerText = parseFloat(inputEl.value).toFixed(item.fix);
                }
                updateUniformsFromUI();
            });
        }
    });
}

function resizeCanvas() {
    const frame = document.getElementById('canvas-frame') || document.getElementById('canvas-container');
    canvas.width = frame.clientWidth;
    canvas.height = frame.clientHeight;
    gl.viewport(0, 0, canvas.width, canvas.height);
    if (program) {
        gl.useProgram(program);
        gl.uniform2f(uniforms['u_resolution'], canvas.width, canvas.height);
    }
}

window.addEventListener('resize', resizeCanvas);

// 渲染初始化管线
initGL();
resizeCanvas();
setupUIListeners();
updateUniformsFromUI();

function render(timestamp) {
    gl.uniform1f(uniforms['u_time'], timestamp * 0.001);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
    requestAnimationFrame(render);
}
requestAnimationFrame(render);

// 当用户切换图层折叠状态时，直接接管对应画布 / 展示容器显示状态
window.CONFIG.initLayerToggles((layerId, isVisible) => {
    const layerElementMap = {
        layer1: 'layer1-container',
        layer2: 'layer2-canvas',
        layer3: 'layer3-canvas',
        layer4: 'gl-canvas',
    };

    const elementId = layerElementMap[layerId];
    if (elementId) {
        const elem = document.getElementById(elementId);
        if (elem) {
            elem.style.display = isVisible ? 'block' : 'none';
        }
    }
});

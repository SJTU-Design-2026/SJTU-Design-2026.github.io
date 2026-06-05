window.vsSource = `
    attribute vec2 position;
    void main() { gl_Position = vec4(position, 0.0, 1.0); }
`;

window.fsSource = `
    precision mediump float;
    uniform vec2 u_resolution;
    uniform float u_time;

    uniform float u_ball_count;
    uniform float u_base_radius;
    uniform float u_decay;
    uniform float u_focus;
    uniform float u_warp_strength;
    uniform float u_flow_speed;
    uniform float u_silver_cut;
    // uniform float u_silver_max; // 已删除
    uniform float u_gold_cut;

    float hash(float n) { return fract(sin(n) * 43758.5453123); }
    float noise(float x) {
        float i = floor(x); float f = fract(x);
        float u = f * f * (3.0 - 2.0 * f);
        return mix(hash(i), hash(i + 1.0), u);
    }

    vec2 warp(vec2 p, float t) {
        float x = sin(p.y * 3.0 + t) * 0.25 + cos(p.x * 2.0 - t * 0.6) * 0.15;
        float y = cos(p.x * 2.5 + t * 0.8) * 0.25 + sin(p.y * 3.5 - t) * 0.15;
        return vec2(x, y) * u_warp_strength;
    }

    void main() {
        vec2 uv = gl_FragCoord.xy / u_resolution.xy;
        vec2 p = (gl_FragCoord.xy * 2.0 - u_resolution.xy) / min(u_resolution.x, u_resolution.y);
        float aspect = u_resolution.x / u_resolution.y;

        float t = u_time * u_flow_speed;
        vec2 warpedP = p + warp(p * 1.2, t * 0.5);

        float totalEnergy = 0.0;
        
        for (int i = 0; i < 60; i++) {
            if (float(i) >= u_ball_count) break;
            float fi = float(i);
            vec2 center;
            if (hash(fi * 13.7) < u_focus) {
                center = vec2(hash(fi * 23.4) * 0.7 - 0.35, hash(fi * 45.1) * 0.8 - 0.4);
            } else {
                center = vec2((hash(fi * 11.2) * 3.2 - 1.6) * (aspect > 1.0 ? aspect : 1.3), (hash(fi * 89.3) * 3.2 - 1.6) * (aspect < 1.0 ? 1.0 / aspect : 1.3));
            }
            center.x += (noise(t * 0.3 + fi * 4.5) * 2.0 - 1.0) * 0.25;
            center.y += (noise(t * 0.25 + fi * 9.1) * 2.0 - 1.0) * 0.25;

            float dist = length(warpedP - center);
            float radius = u_base_radius + 0.15 * noise(t * 0.4 + fi * 3.3);
            if (dist < radius) {
                totalEnergy += pow(1.0 - (dist / radius), u_decay * 0.85);
            }
        }

        vec3 bgColor = vec3(0.898, 0.890, 0.886);   // #E5E3E2 浅灰色
        vec3 white   = vec3(1.0);                    // #FFFFFF 纯白高光
        vec3 silver  = vec3(0.800, 0.784, 0.773);   // #CCC8C5 银灰色
        vec3 gold    = vec3(0.768, 0.627, 0.314);   // #C4A050 金色

        vec3 finalColor = bgColor;

        if (totalEnergy > 0.0) {
            float whiteMask = smoothstep(0.0001, 0.25, totalEnergy); // 原为 u_silver_max * 2.5，已改为常数0.25
            whiteMask = pow(whiteMask, 0.6);
            finalColor = mix(bgColor, white, whiteMask);
        }

        float silverStart = u_silver_cut * 1.5;
        if (totalEnergy > silverStart) {
            float silverMask = smoothstep(silverStart, u_gold_cut * 1.2, totalEnergy);
            silverMask = pow(silverMask, 0.8);
            finalColor = mix(finalColor, silver, silverMask);
            
            if (totalEnergy > u_gold_cut) {
                float goldMask = smoothstep(u_gold_cut, u_gold_cut + 0.8, totalEnergy);
                finalColor = mix(finalColor, gold, goldMask);
            }
        }

        gl_FragColor = vec4(finalColor, 1.0);
    }
`;
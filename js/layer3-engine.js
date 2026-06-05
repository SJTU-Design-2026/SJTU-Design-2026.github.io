(function() {
    const rawText = `
    SJTU_SOD_GRADSHOW_2026 上海交通大学设计学院 2026 毕业设计展 TITLE_CN: 正在读取… TITLE_EN: READING…
    const exhibition = { institution_cn: "上海交通大学设计学院", institution_en: "School of Design, Shanghai Jiao Tong University", year: 2026, title_cn: "正在读取", title_en: "READING", visual_mode: "plain_text_poster + manual_graphics", interface_mode: ["CLI", "config", "manifest", "log", "version_record"], output_status: "temporary", process_status: "running" }
    $ init ./sjtu_sod_gradshow_2026 --title="正在读取" --mode=material-feed
    [BOOT] project_id SJTU_SOD_GRADSHOW_2026 title_cn 正在读取 title_en READING language zh-cn / en canvas vertical_long_strip text_density variable graphics pending_manual_insert poster_status editable system_status reading
    [INDEX] 00_boot.config 01_building_space.log 02_principle_ti_yong.record 03_program_inputs.log 04_visual_statement.md 05_plain_text_poster.output
    01_BUILDING_SPACE.LOG source material: 上海交通大学设计大楼 / School of Design Building role in poster: site context before exhibition information
    $ open ./materials/01_building_space
    [BUILDING.METADATA] name_cn 上海交通大学设计大楼 name_en SJTU School of Design Building building_type renovated academic building award_reference 凡尔赛宫大奖 Prix Versailles 2025 全球最美校园建筑 室内特别奖 site_role exhibition_context text_role spatial_record
    [BUILDING.QUESTION] 建筑能给人带来时间的感知吗？我们深陷于计算而几乎无暇判断，建筑能否让我们重新看到、听到、闻到和触摸到，找回计算之外的感知 and 判断？
    [BUILDING.RECORD] 上海交通大学设计大楼的更新并未把原有建筑完全覆盖，而是在既有结构中重新组织大厅、连廊、采光、材料与公共活动。木构大厅、混凝土框架、天光与日常通行共同构成学院空间的基本界面。该部分文本不把建筑写成展览背景，而把建筑作为毕业设计展的第一层上下文：观众进入展览之前，先进入一栋已经被改造、修复和重新使用的建筑。
    [BUILDING.SPATIAL_TERMS] existing_frame retained timber_structure inserted skylight active hall public corridor connected campus_memory preserved daily_use ongoing
    [BUILDING.STATUS] 正在读取既有结构... 正在校准大厅尺度... 正在记录木构与混凝土的连接... 正在检查天光进入室内后的路径... 正在把“家”的表述保留为建筑与学院共同的语境...
    [BUILDING.OUTPUT] ./context/building_space.log saved
    02_PRINCIPLE_TI_YONG.RECORD source material: 体用并举 / 设计大义
    $ open ./materials/02_principle_ti_yong
    [PRINCIPLE.METADATA] motto_cn 体用并举，设计大义 keywords_cn 体 / 用 / 道 / 器 / 大设计 keywords_en theory / practice / value / instrument / large design text_role institutional_record
    [PRINCIPLE.CONFIG] ti theory / knowledge / judgment yong practice / material / action dao value / purpose / public responsibility qi drawing / model / object / interface / landscape / system
    [PRINCIPLE.TEXT_LAYER] motto active theory_practice active dao_qi_relation active large_design active public_responsibility active decorative_slogan disabled
    [PRINCIPLE.STATUS] 正在连接理论与实践... 正在连接价值与工具... 正在连接专业训练与公共责任... 正在把“大设计”写入展览上下文...
    [PRINCIPLE.OUTPUT] ./context/principle_ti_yong.record saved
    03_PROGRAM_INPUTS.LOG source material: undergraduate programs role in poster: material manifest / process log / editable text layer
    $ ls ./programs architecture/ visual_communication_design/ industrial_design/ landscape_architecture/ program_manifest.csv
    program_id, program_cn, program_en, material_type, visible_files, process_tag
    ARCH, 建筑学, Architecture, site + space + structure, plan/section/model/site, spatial_validation
    VCD, 视觉传达设计, Visual Communication Design, text + image + media, type/grid/archive/screen, information_editing
    ID, 工业设计, Industrial Design, object + interaction + prototype, model/material/test/feedback, use_testing
    LA, 风景园林, Landscape Architecture, terrain + ecology + time, soil/water/plant/community, long_term_revision
    03.01 ARCHITECTURE $ open ./programs/architecture/materials
    ARCHITECTURE/ site_boundary.geojson site_photos_contactsheet.pdf plan_iteration_01.dwg plan_iteration_07.dwg section_cut_AA.pdf section_cut_BB.pdf structure_grid.ai circulation_test.svg sunlight_0321_0621_1221.csv model_photo_process.zip review_notes.txt
    [ARCHITECTURE.RECORD] 建筑学材料包含场地、功能、结构、剖面、动线、尺度、光照与模型记录。当前文本层不描述建筑“像什么”，只保留其被推敲的依据：场地如何被读取，结构如何成立，人在何处进入、停留、转向，剖面如何把不可见的空间关系显示出来。
    [ARCHITECTURE.STATUS] 正在校准尺度... 正在删除一个没有必要的体块... 正在等待模型干透... 正在场地重新读一遍...
    03.02 VISUAL COMMUNICATION DESIGN $ open ./programs/visual_communication_design/materials
    VISUAL_COMMUNICATION_DESIGN/ title_cn.txt title_en.txt font_test_01.otf font_test_02_variable.ttf poster_grid.indd layout_versions.pdf image_archive.zip caption_rules.md screen_motion_test.mov interface_flow.fig print_sample_scan.tif error_screenshot.png
    [VCD.RECORD] 视觉传达设计材料包含标题、字体、图像、网格、版式、媒介、动效、界面与输出样张。当前文本层保留排版过程中的操作痕迹：删减解释、调整间距、检查中英文关系、决定图像进入版面的方式，以及在清晰与噪声之间控制信息密度。
    [VCD.STATUS] 视觉传达 删除了一行解释... 视觉传达 添加了一个空格... 视觉传达 把图像作为附件插入，而不是作为配图... 视觉传达 正在检查中英文是否真的对齐...
    03.03 INDUSTRIAL DESIGN $ open ./programs/industrial_design/materials
    INDUSTRIAL_DESIGN/ prototype_v01.stl prototype_v02.stl prototype_v07_broken.jpg prototype_v12_handtest.mp4 prototype_v23_not_final.obj material_sample_scan.png ergonomic_notes.xlsx interaction_flow.pdf button_position_test.jpg user_feedback_raw.txt repair_record.md
    [ID.RECORD] 工业设计材料包含原型、材料、尺度、握持、交互、反馈、测试与失败记录。当前文本层保留使用发生前后的证据：样机版本、误触位置、材料磨损、反馈延迟、维修记录，以及从展示模型转向工作原型的修改过程。
    [ID.STATUS] 工业设计 标记了误触区域... 工业设计 正在重新计算手与界面的距离... 工业设计 保留了材料磨损的边缘... 工业设计 将 prototype_v23 重命名为 prototype_v23_not_final...
    03.04 LANDSCAPE ARCHITECTURE $ open ./programs/landscape_architecture/materials
    LANDSCAPE_ARCHITECTURE/ terrain_model.tif contour_lines.dxf soil_sample_report.pdf rainfall_data.csv runoff_diagram.svg planting_matrix.xlsx seasonal_section.ai community_interview.txt maintenance_year_01_10.plan future_growth_preview.png
    [LA.RECORD] 风景园林材料包含地形、水文、土壤、植物、季节、社区、维护与未来生长记录。当前文本层保留时间维度中的设计信息：雨水路径、土壤修复、植物配置、季相变化、公共使用与后续维护。效果图不作为终点，只作为某一阶段的预览文件。
    [LA.STATUS] 风景园林 正在等待下一场雨... 风景园林 正在预览十年后的树荫... 风景园林 正在允许不可控因素进入设计... 风景园林 将“完成时间”改为“生长时间”...
    03.05 COMPILE $ compile ./programs --to ./context/program_inputs.log
    [COMPILE.RESULT] architecture loaded visual_communication_design loaded industrial_design loaded landscape_architecture loaded
    [OUTPUT] ./context/program_inputs.log saved cursor waiting: █
    04_VISUAL_STATEMENT.MD source material: theme explanation role in poster: visual system explanation, not theoretical essay
    $ open ./materials/04_visual_statement
    [VISUAL_STATEMENT.METADATA] title_cn 正在读取 title_en READING main_metaphor material_feed interface_reference CLI / code / manifest / log poster_object plain_text_poster graphics_method manual_insert text_role exhibition_theme_record
    [VISUAL_STATEMENT.RECORD_CN] 在生成式技术成为日常工具的语境中，本次毕业设计展不把“读取”理解为机器自动生产图像，而把它理解为一个持续输入、整理、判断、修正和截取的过程。空间、学院理念、专业材料、作品信息与视觉元素被依次送入同一文本系统，形成可滚动、可中断、可继续编辑的长条视觉。最终出现的纯文本海报不是对过程的终结，而是当前版本的输出记录。
    [VISUAL_STATEMENT.STATUS] 正在导入空间材料... 正在导入学院理念... 正在导入专业材料... 正在导入毕业设计项目信息... 正在生成纯文本海报... 正在等待手动图形插入... 当前输出不是最终版本...
    [VISUAL_STATEMENT.OUTPUT] ./context/visual_statement.md saved
    05_PLAIN_TEXT_POSTER.OUTPUT role in poster: final text layer for main visual
    $ generate ./output/plain_text_poster.txt --title="正在读取" --format=vertical_long_strip
    [GENERATE] building_space.log loaded principle_ti_yong.record loaded program_inputs.log loaded visual_statement.md loaded exhibition_information partial manual_graphics pending
    [MISSING_FIELDS] date TO_BE_UPDATED opening_time TO_BE_UPDATED venue_detail TO_BE_UPDATED website TO_BE_UPDATED qr_code TO_BE_UPDATED
    [OUTPUT_POLICY] keep_placeholders true keep_editable_fields true allow_date_update true allow_venue_update true allow_qr_insert true
    $ output ./public_information
    [PUBLIC_INFORMATION] title_cn 正在读取 title_en READING event_cn 2026 上海交通大学设计学院 毕业设计展 event_en SJTU School of Design Graduation Exhibition 2026 date [TO BE UPDATED] opening [TO BE UPDATED] venue_cn 上海交通大学设计学院 venue_en School of Design, Shanghai Jiao Tong University website [TO BE UPDATED] qr_code [TO BE UPDATED]
    [PROGRAMS_DISPLAY] 建筑学 Architecture 风景园林 Landscape Architecture 工业设计 Industrial Design 视觉传达设计 Visual Communication
    [CONTACT_ORGANIZER] organizer_cn 上海交通大学设计学院 organizer_en School of Design, Shanghai Jiao Tong University`;

    function formatToSingleStream(str) {
        return str.replace(/[\r\n]+/g, ' ').replace(/\s+/g, ' ').trim();
    }

    const cleanedSource = formatToSingleStream(rawText);
    const canvas = document.getElementById('layer3-canvas');
    const ctx = canvas.getContext('2d');

    let visibleCharsCount = 0; 
    const lines = [];          
    let lastFontSize = 0;      
    let isPaused = false;
    let pauseStartTime = 0;

    function breakTextIntoPosterLines(currentFontSize) {
        lines.length = 0; 
        ctx.font = `${currentFontSize}px "InstrumentSerif"`;
        let words = cleanedSource.split(' ');
        let currentLine = "";

        for (let i = 0; i < words.length; i++) {
            let testLine = currentLine + (currentLine === "" ? "" : " ") + words[i];
            let metrics = ctx.measureText(testLine);
            if (metrics.width > canvas.width && currentLine !== "") {
                lines.push(currentLine);
                currentLine = words[i];
            } else {
                currentLine = testLine;
            }
        }
        if (currentLine !== "") lines.push(currentLine);
    }

    function initCanvasSize(currentFontSize) {
        const frame = document.getElementById('canvas-frame') || document.getElementById('canvas-container');
        canvas.width = frame.clientWidth;
        canvas.height = frame.clientHeight;
        breakTextIntoPosterLines(currentFontSize);
    }

    function animateText() {
        if (window.CONFIG && window.CONFIG.layers.layer3 === false) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            requestAnimationFrame(animateText);
            return;
        }

        const fontSize = 20; // 原为u_text_size，已撤销，改用固定值
        const typeSpeed = parseInt(document.getElementById('u_type_speed').value) || 4;
        const lineHeight = fontSize * 1.1; 

        if (fontSize !== lastFontSize) {
            initCanvasSize(fontSize);
            lastFontSize = fontSize;
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        let uiStyles = { color: '#CBBFAA', blendMode: 'darken' };
        if (window.CONFIG && typeof window.CONFIG.getTextStyleConfig === 'function') {
            uiStyles = window.CONFIG.getTextStyleConfig();
        }

        canvas.style.mixBlendMode = uiStyles.blendMode;
        ctx.fillStyle = uiStyles.color; 

        ctx.font = `${fontSize}px "InstrumentSerif"`;
        ctx.textBaseline = "top";

        if (visibleCharsCount < cleanedSource.length) {
            visibleCharsCount += typeSpeed;
        } else if (!isPaused) {
            isPaused = true;
            pauseStartTime = performance.now();
        }

        // 精确计时器
        let currentPauseElapsed = 0;
        if (isPaused) {
            currentPauseElapsed = performance.now() - pauseStartTime;
            if (currentPauseElapsed >= 5000) { 
                visibleCharsCount = 0; 
                isPaused = false;      
                currentPauseElapsed = 0; // 重置
            }
        }

        // 向 Layer 2 同步投射停顿流逝的绝对时间
        window.LAYER3_SHARED = {
            progress: cleanedSource.length > 0 ? (visibleCharsCount / cleanedSource.length) : 0,
            isPaused: isPaused,
            pauseElapsed: currentPauseElapsed
        };

        let charCounter = 0;
        let currentLineIndex = 0;
        for (let i = 0; i < lines.length; i++) {
            if (visibleCharsCount >= charCounter) {
                currentLineIndex = i;
            }
            charCounter += lines[i].length + 1;
        }

        let maxVisibleLines = Math.floor(canvas.height / lineHeight);
        let targetScrollLines = Math.max(0, currentLineIndex - (maxVisibleLines - 1));
        let scrollY = targetScrollLines * lineHeight;

        charCounter = 0;
        for (let i = 0; i < lines.length; i++) {
            let lineText = lines[i];
            let currentY = i * lineHeight - scrollY; 

            if (currentY + lineHeight >= 0 && currentY <= canvas.height) {
                if (charCounter + lineText.length <= visibleCharsCount) {
                    ctx.fillText(lineText, 0, currentY); 
                    charCounter += lineText.length + 1;
                } else {
                    let allowedLength = visibleCharsCount - charCounter;
                    if (allowedLength > 0) {
                        let partialText = lineText.substring(0, allowedLength);
                        ctx.fillText(partialText, 0, currentY);
                    }
                    break; 
                }
            } else {
                charCounter += lineText.length + 1;
            }
        }

        requestAnimationFrame(animateText);
    }

    window.addEventListener('resize', () => {
        const currentFontSize = 20; // 原为u_text_size，已撤销，改用固定值
        initCanvasSize(currentFontSize);
    });
    
    document.fonts.ready.then(() => {
        const currentFontSize = 20; // 原为u_text_size，已撤销，改用固定值
        initCanvasSize(currentFontSize);
        animateText();
    });
})();
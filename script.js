// script.js - Enhanced crane calculation visualization
document.addEventListener('DOMContentLoaded', function() {
    // DOM elementlerini yakala
    const calculateBtn = document.getElementById('calculate-btn');
    const defaultBtn = document.getElementById('default-btn');
    const resultLabel = document.getElementById('result-label');
    const sectionResultsDiv = document.createElement('div');
    sectionResultsDiv.id = 'section-results';
    
    // Şema container elementlerini yakala
    const craneSideView = document.getElementById('crane-side-view');
    const forceDiagram = document.getElementById('force-diagram');
    const beamDiagram = document.getElementById('beam-diagram');
    
    // result-frame'in içine section-results div'ini ekle
    document.querySelector('.result-frame').appendChild(sectionResultsDiv);
    
    // IPE kesit verileri [Ad, h (mm), b (mm), tw (mm), tf (mm), Iy (cm4), Wel,y (cm3), Wpl,y (cm3)]
    const IPEsections = [
        ["IPE 80", 80, 46, 3.8, 5.2, 80.1, 20.0, 23.2],
        ["IPE 100", 100, 55, 4.1, 5.7, 171, 34.2, 39.4],
        ["IPE 120", 120, 64, 4.4, 6.3, 318, 53.0, 60.7],
        ["IPE 140", 140, 73, 4.7, 6.9, 541, 77.3, 88.3],
        ["IPE 160", 160, 82, 5.0, 7.4, 869, 109, 124],
        ["IPE 180", 180, 91, 5.3, 8.0, 1320, 146, 166],
        ["IPE 200", 200, 100, 5.6, 8.5, 1940, 194, 221],
        ["IPE 220", 220, 110, 5.9, 9.2, 2770, 252, 286],
        ["IPE 240", 240, 120, 6.2, 9.8, 3890, 324, 367],
        ["IPE 270", 270, 135, 6.6, 10.2, 5790, 429, 484],
        ["IPE 300", 300, 150, 7.1, 10.7, 8360, 557, 628],
        ["IPE 330", 330, 160, 7.5, 11.5, 11770, 713, 804],
        ["IPE 360", 360, 170, 8.0, 12.7, 16270, 904, 1019],
        ["IPE 400", 400, 180, 8.6, 13.5, 23130, 1160, 1307],
        ["IPE 450", 450, 190, 9.4, 14.6, 33740, 1500, 1702],
        ["IPE 500", 500, 200, 10.2, 16.0, 48200, 1930, 2194],
        ["IPE 550", 550, 210, 11.1, 17.2, 67120, 2440, 2787],
        ["IPE 600", 600, 220, 12.0, 19.0, 92080, 3070, 3512]
    ];
    
    // HEA kesit verileri [Ad, h (mm), b (mm), tw (mm), tf (mm), Iy (cm4), Wel,y (cm3), Wpl,y (cm3)]
    const HEAsections = [
        ["HEA 100", 96, 100, 5.0, 8.0, 349, 72.8, 83.0],
        ["HEA 120", 114, 120, 5.0, 8.0, 606, 106, 119],
        ["HEA 140", 133, 140, 5.5, 8.5, 1033, 155, 173],
        ["HEA 160", 152, 160, 6.0, 9.0, 1673, 220, 245],
        ["HEA 180", 171, 180, 6.0, 9.5, 2510, 294, 325],
        ["HEA 200", 190, 200, 6.5, 10.0, 3692, 389, 429],
        ["HEA 220", 210, 220, 7.0, 11.0, 5410, 515, 568],
        ["HEA 240", 230, 240, 7.5, 12.0, 7763, 675, 744],
        ["HEA 260", 250, 260, 7.5, 12.5, 10450, 836, 920],
        ["HEA 280", 270, 280, 8.0, 13.0, 13670, 1010, 1110],
        ["HEA 300", 290, 300, 8.5, 14.0, 18250, 1260, 1380],
        ["HEA 320", 310, 300, 9.0, 15.5, 22930, 1480, 1630],
        ["HEA 340", 330, 300, 9.5, 16.5, 27690, 1680, 1850],
        ["HEA 360", 350, 300, 10.0, 17.5, 33090, 1890, 2090],
        ["HEA 400", 390, 300, 11.0, 19.0, 45070, 2310, 2560],
        ["HEA 450", 440, 300, 11.5, 21.0, 63720, 2900, 3220],
        ["HEA 500", 490, 300, 12.0, 23.0, 86970, 3550, 3950],
        ["HEA 550", 540, 300, 12.5, 24.0, 111900, 4150, 4620],
        ["HEA 600", 590, 300, 13.0, 25.0, 141200, 4790, 5350]
    ];
    
    // HEB kesit verileri [Ad, h (mm), b (mm), tw (mm), tf (mm), Iy (cm4), Wel,y (cm3), Wpl,y (cm3)]
    const HEBsections = [
        ["HEB 100", 100, 100, 6.0, 10.0, 450, 90.0, 104],
        ["HEB 120", 120, 120, 6.5, 11.0, 864, 144, 165],
        ["HEB 140", 140, 140, 7.0, 12.0, 1509, 216, 245],
        ["HEB 160", 160, 160, 8.0, 13.0, 2492, 311, 354],
        ["HEB 180", 180, 180, 8.5, 14.0, 3831, 426, 482],
        ["HEB 200", 200, 200, 9.0, 15.0, 5696, 570, 643],
        ["HEB 220", 220, 220, 9.5, 16.0, 8091, 736, 827],
        ["HEB 240", 240, 240, 10.0, 17.0, 11260, 938, 1053],
        ["HEB 260", 260, 260, 10.0, 17.5, 14920, 1150, 1283],
        ["HEB 280", 280, 280, 10.5, 18.0, 19270, 1380, 1534],
        ["HEB 300", 300, 300, 11.0, 19.0, 25170, 1680, 1869],
        ["HEB 320", 320, 300, 11.5, 20.5, 30820, 1930, 2150],
        ["HEB 340", 340, 300, 12.0, 21.5, 36660, 2160, 2400],
        ["HEB 360", 360, 300, 12.5, 22.5, 43190, 2400, 2680],
        ["HEB 400", 400, 300, 13.5, 24.0, 57680, 2880, 3230],
        ["HEB 450", 450, 300, 14.0, 26.0, 79890, 3550, 3980],
        ["HEB 500", 500, 300, 14.5, 28.0, 107200, 4290, 4810],
        ["HEB 550", 550, 300, 15.0, 29.0, 136700, 4970, 5590],
        ["HEB 600", 600, 300, 15.5, 30.0, 171000, 5700, 6420]
    ];
    
    // HEM kesit verileri [Ad, h (mm), b (mm), tw (mm), tf (mm), Iy (cm4), Wel,y (cm3), Wpl,y (cm3)]
    const HEMsections = [
        ["HEM 100", 120, 106, 12.0, 20.0, 1143, 190, 235],
        ["HEM 120", 140, 126, 12.5, 21.0, 2018, 288, 350],
        ["HEM 140", 160, 146, 13.0, 22.0, 3291, 411, 493],
        ["HEM 160", 180, 166, 14.0, 23.0, 5098, 567, 674],
        ["HEM 180", 200, 186, 14.5, 24.0, 7483, 748, 883],
        ["HEM 200", 220, 206, 15.0, 25.0, 10640, 967, 1135],
        ["HEM 220", 240, 226, 15.5, 26.0, 14600, 1217, 1419],
        ["HEM 240", 270, 248, 18.0, 32.0, 24290, 1800, 2117],
        ["HEM 260", 290, 268, 18.0, 32.5, 31310, 2160, 2524],
        ["HEM 280", 310, 288, 18.5, 33.0, 39550, 2551, 2966],
        ["HEM 300", 340, 310, 21.0, 39.0, 59200, 3482, 4078],
        ["HEM 320", 359, 309, 21.0, 40.0, 68130, 3796, 4435],
        ["HEM 340", 377, 309, 21.0, 40.0, 76370, 4052, 4718],
        ["HEM 360", 395, 308, 21.0, 40.0, 84870, 4297, 4988],
        ["HEM 400", 432, 307, 21.0, 40.0, 104100, 4820, 5571],
        ["HEM 450", 478, 307, 21.0, 40.0, 131500, 5501, 6331],
        ["HEM 500", 524, 306, 21.0, 40.0, 161900, 6180, 7094],
        ["HEM 550", 572, 306, 21.0, 40.0, 198000, 6920, 7934],
        ["HEM 600", 620, 305, 21.0, 40.0, 237400, 7660, 8772]
    ];
    
    // Çelik mukavemet parametreleri - S275 çeliği için
    const fy = 275; // Akma dayanımı, MPa (N/mm²)
    
    // Tüm input alanlarını seç
    const inputFields = {
        Lc: document.getElementById('Lc'),
        ah: document.getElementById('ah'),
        aw: document.getElementById('aw'),
        wc: document.getElementById('wc'),
        wcb: document.getElementById('wcb'),
        wcap: document.getElementById('wcap'),
        L: document.getElementById('L')
    };
    
    // Hesapla düğmesine tıklama olayı ekle
    calculateBtn.addEventListener('click', hesaplaWeb);
      // Varsayılan değerler düğmesine tıklama olayı ekle
    defaultBtn.addEventListener('click', setDefaultValues);
    
    // Şematik diyagramları oluşturan fonksiyonlar
    function drawCraneSideView(params) {
        const { Lc, ah, wc, wcb, wcap } = params;
        
        const width = 600;
        const height = 400; // Daha fazla arttırılmış yükseklik
        const scale = width / (Lc * 1.2); // Ölçek faktörü
        
        // SVG oluştur
        let svg = `
        <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
            <defs>
                <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
                    <polygon points="0 0, 10 3.5, 0 7" fill="#e74c3c"/>
                </marker>
            </defs>
            <g transform="translate(50, 50)">
                <!-- Taban çizgisi -->
                <line x1="0" y1="${height - 80}" x2="${width - 100}" y2="${height - 80}" stroke="#34495e" stroke-width="3" class="crane-line" />
                
                <!-- Sol kolon -->
                <rect x="-5" y="20" width="10" height="${height - 100}" fill="#7f8c8d" stroke="#34495e" />
                <text x="10" y="${height - 120}" class="text-label">4m</text>
                
                <!-- Sağ kolon -->
                <rect x="${width - 105}" y="20" width="10" height="${height - 100}" fill="#7f8c8d" stroke="#34495e" />
                <text x="${width - 90}" y="${height - 120}" class="text-label">4m</text>
                
                <!-- Çatı -->
                <polygon points="0,20 ${(width - 100) / 2},-30 ${width - 100},20" 
                         fill="#ecf0f1" stroke="#34495e" stroke-width="2" />
                
                <!-- Yapı tabanı -->
                <rect x="-15" y="${height - 80}" width="30" height="10" fill="#95a5a6" stroke="#34495e" />
                <rect x="${width - 115}" y="${height - 80}" width="30" height="10" fill="#95a5a6" stroke="#34495e" />
                
                <!-- Kren kirişi -->
                <rect x="20" y="${height - 190}" width="${width - 140}" height="20" fill="#e74c3c" stroke="#c0392b" stroke-width="1" />
                <text x="${(width - 100) / 2}" y="${height - 155}" class="text-label" font-weight="bold">Lc = ${Lc}m</text>
                
                <!-- Kren taşıyıcıları -->
                <rect x="40" y="${height - 200}" width="20" height="10" fill="#34495e" stroke="#2c3e50" />
                <rect x="${width - 160}" y="${height - 200}" width="20" height="10" fill="#34495e" stroke="#2c3e50" />
                
                <!-- Kanca ve yük -->
                <line x1="${20 + ah * scale}" y1="${height - 170}" x2="${20 + ah * scale}" y2="${height - 140}" stroke="#7f8c8d" stroke-width="2" />
                <text x="${20 + ah * scale - 10}" y="${height - 130}" class="text-label" font-weight="bold">ah = ${ah}m</text>
                
                <!-- Yük gösterimi -->
                <rect x="${20 + ah * scale - 20}" y="${height - 140}" width="40" height="30" fill="#f39c12" stroke="#e67e22" stroke-width="2" />
                <text x="${20 + ah * scale}" y="${height - 125}" class="text-label" text-anchor="middle" fill="white" font-weight="bold">Wcb+Wcap</text>
                <text x="${20 + ah * scale}" y="${height - 110}" class="text-label" text-anchor="middle" fill="white" font-size="10px">${wcb + wcap} kN</text>                <!-- Kren ağırlığı gösterimi -->
                <polygon points="${(width - 100) / 2 - 30},${height - 165} ${(width - 100) / 2 + 30},${height - 165} ${(width - 100) / 2},${height - 135}" 
                         fill="#3498db" stroke="#2980b9" stroke-width="2" />
                <text x="${(width - 100) / 2}" y="${height - 150}" class="text-label" text-anchor="middle" fill="white" font-weight="bold">Wc</text>
                <text x="${(width - 100) / 2}" y="${height - 135}" class="text-label" text-anchor="middle" fill="white" font-size="10px">${wc} kN</text>
                
                <!-- Lc ölçüsü (genişlik) -->
                <line x1="20" y1="${height - 20}" x2="${width - 140}" y2="${height - 20}" class="dimension-line" stroke="#3498db" stroke-width="2" stroke-dasharray="5,2" />
                <line x1="20" y1="${height - 30}" x2="20" y2="${height - 10}" stroke="#3498db" stroke-width="2" />
                <line x1="${width - 140}" y1="${height - 30}" x2="${width - 140}" y2="${height - 10}" stroke="#3498db" stroke-width="2" />
                <text x="${(width - 100) / 2}" y="${height + 5}" class="text-label" text-anchor="middle" font-size="14" font-weight="bold" fill="#2980b9">Lc = ${Lc} m</text>
            </g>
        </svg>`;
        
        return svg;
    }
    
    function drawForceDiagram(params) {
        const { wc, wcb, wcap, Wh1, Wh2A, Wh2B } = params || {};
        
        const width = 400;
        const height = 230;
        
        // SVG oluştur
        let svg = `
        <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
            <defs>
                <marker id="arrow" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
                    <polygon points="0 0, 10 3.5, 0 7" fill="#e74c3c"/>
                </marker>
                <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur in="SourceAlpha" stdDeviation="2" />
                    <feOffset dx="2" dy="2" />
                    <feComponentTransfer>
                        <feFuncA type="linear" slope="0.3"/>
                    </feComponentTransfer>
                    <feMerge>
                        <feMergeNode />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>
            <g transform="translate(50, 40)">
                <!-- Başlık -->
                <text x="${width/2 - 80}" y="0" font-size="14" font-weight="bold">Kuvvetler Diyagramı</text>
                
                <!-- Kren rayı -->
                <rect x="0" y="50" width="${width - 100}" height="8" fill="#95a5a6" stroke="#7f8c8d" />
                <rect x="0" y="58" width="${width - 100}" height="4" fill="#7f8c8d" />
                <text x="${width - 80}" y="60" class="text-label" text-anchor="start">Kren Rayı</text>
                
                <!-- Kren birincil kiriş -->
                <rect x="40" y="30" width="${width - 180}" height="20" fill="#e67e22" stroke="#d35400" />
                
                <!-- Dikey yük (Wv) -->
                <line x1="${width/2 - 50}" y1="-10" x2="${width/2 - 50}" y2="30" class="force-arrow" stroke="#e74c3c" stroke-width="2" marker-end="url(#arrow)" />
                <text x="${width/2 - 50}" y="-15" class="text-label" text-anchor="middle" font-weight="bold">Wv = ${wc ? ((wcb + wcap + wc)).toFixed(2) + ' kN' : 'Wv'}</text>
                
                <!-- Yatay kuvvetler -->
                <!-- Wh1 kuvveti -->
                <line x1="${width/2}" y1="40" x2="${width/2 + 60}" y2="40" class="force-arrow" stroke="#27ae60" stroke-width="2" marker-end="url(#arrow)" />
                <text x="${width/2 + 30}" y="35" class="text-label" text-anchor="middle" font-weight="bold">Wh1</text>
                <text x="${width/2 + 30}" y="55" class="text-label" text-anchor="middle" font-size="10px">${Wh1 ? Wh1.toFixed(2) + ' kN' : '0.025×(Wcb+Wcap)'}</text>
                
                <!-- Wh2 kuvveti -->
                <line x1="${width/2 - 90}" y1="40" x2="${width/2 - 150}" y2="40" class="force-arrow" stroke="#27ae60" stroke-width="2" marker-end="url(#arrow)" />
                <text x="${width/2 - 120}" y="35" class="text-label" text-anchor="middle" font-weight="bold">Wh2</text>
                <text x="${width/2 - 120}" y="55" class="text-label" text-anchor="middle" font-size="10px">${Wh2A ? Wh2A.toFixed(2) + ' kN' : '0.05×Wv'}</text>
                
                <!-- Kuvvet ikonu -->
                <g transform="translate(${width-90}, 100)" filter="url(#shadow)">
                    <circle cx="0" cy="0" r="25" fill="#3498db" stroke="#2980b9" stroke-width="2" />
                    <text x="0" y="5" class="text-label" text-anchor="middle" fill="white" font-weight="bold">F</text>
                </g>
                
                <!-- Açıklayıcı notlar -->
                <text x="0" y="100" class="text-label">Wh1: Boyuna kuvvet = 0.025×(Wcb+Wcap)</text>
                <text x="0" y="120" class="text-label">Wh2: Yanal kuvvet = 0.05×Wv</text>
                <text x="0" y="140" class="text-label">Wv: Toplam dikey yük = Wc+Wcb+Wcap</text>
            </g>
        </svg>`;
        
        return svg;
    }
      function drawBeamDiagram(params) {
        const { L, aw, WvA_t, WvB_t, MMajor3max } = params;
        const width = 800;
        const height = 450;
        const scale = width / (L * 1.5); // Daha geniş ölçek faktörü
        
        // SVG oluştur
        let svg = `
        <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
            <defs>
                <marker id="arrow2" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
                    <polygon points="0 0, 10 3.5, 0 7" fill="#e74c3c"/>
                </marker>                <linearGradient id="momentGradient" x1="0%" y1="100%" x2="0%" y2="0%">
                    <stop offset="0%" style="stop-color:#3498db;stop-opacity:0.2" />
                    <stop offset="100%" style="stop-color:#3498db;stop-opacity:0.7" />
                </linearGradient>
            </defs>
            <g transform="translate(50, 30)">
                <!-- Başlık -->
                <text x="${L * scale / 2}" y="0" font-size="14" font-weight="bold" text-anchor="middle">Kiriş Yükleme Diyagramı</text>
                
                <!-- Üst kısım - kiriş ve yükler -->
                <rect x="0" y="50" width="${L * scale}" height="12" fill="#95a5a6" stroke="#7f8c8d" rx="2" ry="2" />
                <text x="${L * scale / 2}" y="40" class="text-label" text-anchor="middle" font-weight="bold">Kren Kirişi</text>
                
                <!-- Sol destek -->
                <rect x="-5" y="62" width="10" height="25" fill="#34495e" />
                <rect x="-15" y="87" width="30" height="8" fill="#34495e" />
                <text x="0" y="110" class="text-label" text-anchor="middle" font-weight="bold">1</text>
                
                <!-- Sağ destek -->
                <rect x="${L * scale - 5}" y="62" width="10" height="25" fill="#34495e" />
                <rect x="${L * scale - 15}" y="87" width="30" height="8" fill="#34495e" />
                <text x="${L * scale}" y="110" class="text-label" text-anchor="middle" font-weight="bold">1</text>
                  <!-- Tekerlekler ve aw mesafesi -->
                <line x1="${(L * scale - aw * scale) / 2}" y1="50" x2="${(L * scale - aw * scale) / 2}" y2="85" class="force-arrow" stroke="#e74c3c" stroke-width="2" marker-end="url(#arrow2)" />
                <line x1="${(L * scale + aw * scale) / 2}" y1="50" x2="${(L * scale + aw * scale) / 2}" y2="85" class="force-arrow" stroke="#e74c3c" stroke-width="2" marker-end="url(#arrow2)" />
                  <!-- Kuvvet değerleri -->
                <text x="${(L * scale - aw * scale) / 2 - 40}" y="70" class="text-label" font-weight="bold" text-anchor="end">WvA</text>
                <text x="${(L * scale - aw * scale) / 2 - 40}" y="82" class="text-label" font-size="10px" text-anchor="end">${WvA_t ? WvA_t.toFixed(2) + ' kN' : 'WvA'}</text>
                
                <text x="${(L * scale + aw * scale) / 2 + 40}" y="70" class="text-label" font-weight="bold" text-anchor="start">WvA</text>
                <text x="${(L * scale + aw * scale) / 2 + 40}" y="82" class="text-label" font-size="10px" text-anchor="start">${WvA_t ? WvA_t.toFixed(2) + ' kN' : 'WvA'}</text>
                
                <!-- aw ölçüsü -->
                <line x1="${(L * scale - aw * scale) / 2}" y1="65" x2="${(L * scale + aw * scale) / 2}" y2="65" class="dimension-line" stroke="#3498db" stroke-width="1" stroke-dasharray="5,2" />
                <text x="${L * scale / 2}" y="75" class="text-label" text-anchor="middle" font-weight="bold">aw = ${aw}m</text>
                
                <!-- L ölçüsü -->
                <line x1="0" y1="120" x2="${L * scale}" y2="120" class="dimension-line" stroke="#3498db" stroke-width="1" stroke-dasharray="5,2" />
                <text x="${L * scale / 2}" y="135" class="text-label" text-anchor="middle" font-weight="bold">L = ${L}m</text>
                
                <!-- Alt kısım - moment diyagramı -->
                <g transform="translate(0, 180)">
                    <!-- Diyagramın başlığı -->
                    <text x="${L * scale / 2}" y="-20" class="text-label" text-anchor="middle" font-weight="bold">Moment Diyagramı</text>
                    
                    <!-- Diyagramın tabanı -->
                    <line x1="0" y1="0" x2="${L * scale}" y2="0" stroke="#34495e" stroke-width="1" />
                    
                    <!-- Sol ve sağ destekler -->
                    <line x1="0" y1="-5" x2="0" y2="5" stroke="#34495e" stroke-width="1" />
                    <text x="0" y="20" class="text-label" text-anchor="middle">0</text>
                    
                    <line x1="${L * scale}" y1="-5" x2="${L * scale}" y2="5" stroke="#34495e" stroke-width="1" />
                    <text x="${L * scale}" y="20" class="text-label" text-anchor="middle">0</text>
                      <!-- Moment diyagramı (parabolik) -->
                    <path d="M 0,0 Q ${L * scale / 4},80 ${L * scale / 2},100 T ${L * scale},0" 
                          stroke="#3498db" stroke-width="2" fill="url(#momentGradient)" />
                    
                    <!-- Yük pozisyonlarını gösteren çizgiler -->
                    <line x1="${(L * scale - aw * scale) / 2}" y1="10" x2="${(L * scale - aw * scale) / 2}" y2="-60" 
                          stroke="#e74c3c" stroke-width="1" stroke-dasharray="5,2" />
                    <text x="${(L * scale - aw * scale) / 2}" y="25" class="text-label" text-anchor="middle" font-weight="bold">2</text>
                    
                    <line x1="${(L * scale + aw * scale) / 2}" y1="10" x2="${(L * scale + aw * scale) / 2}" y2="-60" 
                          stroke="#e74c3c" stroke-width="1" stroke-dasharray="5,2" />
                    <text x="${(L * scale + aw * scale) / 2}" y="25" class="text-label" text-anchor="middle" font-weight="bold">2</text>
                      <!-- Maksimum moment değeri -->
                    <text x="${L * scale / 2}" y="110" class="text-label" text-anchor="middle" font-weight="bold">Mmax = ${MMajor3max ? MMajor3max.toFixed(2) + ' kNm' : 'Mmax'}</text>
                </g>
            </g>
        </svg>`;
        
        return svg;
    }
    
    // Şemaları ilk yükleme sırasında çiz
    function drawInitialSchemes() {
        // Varsayılan parametreler
        const defaultParams = {
            Lc: 33.0,
            ah: 0.8,
            aw: 1.56,
            wc: 380.0,
            wcb: 50.0,
            wcap: 200.0,
            L: 12.0
        };
        
        // Şemaları çiz
        if (craneSideView) craneSideView.innerHTML = drawCraneSideView(defaultParams);
        if (forceDiagram) forceDiagram.innerHTML = drawForceDiagram();
        if (beamDiagram) beamDiagram.innerHTML = drawBeamDiagram(defaultParams);
    }
    
    // Sayfa yüklendiğinde şemaları çiz
    drawInitialSchemes();
      // Kesit seçimi yapan fonksiyon
    function sectionDesign(moment, L) {
        // moment is in kNm, we need to work in consistent units throughout
        
        // Calculate required plastic section modulus (cm³)
        // Formula: Wpl = M / (fy * φ)
        // M in kNcm = moment * 100 (kNm to kNcm)
        // fy in kN/cm² = 27.5 (275 MPa = 27.5 kN/cm²)
        // φ = 0.9 (safety factor)
        const requiredWpl = (moment * 100) / (27.5 * 0.9);
        
        // Find suitable section for each profile type
        const suitableIPE = findSuitableSectionWithBuckling(IPEsections, requiredWpl, L, moment);
        const suitableHEA = findSuitableSectionWithBuckling(HEAsections, requiredWpl, L, moment);
        const suitableHEB = findSuitableSectionWithBuckling(HEBsections, requiredWpl, L, moment);
        const suitableHEM = findSuitableSectionWithBuckling(HEMsections, requiredWpl, L, moment);
        
        // Collect buckling checks
        const buckling = {
            IPE: suitableIPE ? suitableIPE.buckling : null,
            HEA: suitableHEA ? suitableHEA.buckling : null,
            HEB: suitableHEB ? suitableHEB.buckling : null,
            HEM: suitableHEM ? suitableHEM.buckling : null
        };
        
        const result = {
            requiredWpl: requiredWpl.toFixed(2),
            IPE: suitableIPE ? suitableIPE.section : null,
            HEA: suitableHEA ? suitableHEA.section : null,
            HEB: suitableHEB ? suitableHEB.section : null,
            HEM: suitableHEM ? suitableHEM.section : null,
            IPEName: suitableIPE ? suitableIPE.section[0] : "Uygun IPE kesit bulunamadı",
            HEAName: suitableHEA ? suitableHEA.section[0] : "Uygun HEA kesit bulunamadı",
            HEBName: suitableHEB ? suitableHEB.section[0] : "Uygun HEB kesit bulunamadı",
            HEMName: suitableHEM ? suitableHEM.section[0] : "Uygun HEM kesit bulunamadı",
            buckling: buckling
        };
        
        return result;
    }    // AISC burkulma kontrollerini hesaplayan fonksiyon
    function calculateBuckling(section, L, moment) {
        // Kesit bilgilerini çıkar (all converted to cm)
        const name = section[0];
        const h = section[1] / 10; // mm -> cm
        const b = section[2] / 10; // mm -> cm
        const tw = section[3] / 10; // mm -> cm
        const tf = section[4] / 10; // mm -> cm
        const Iy = section[5]; // cm⁴
        const Wely = section[6]; // cm³
        const Wply = section[7]; // cm³
        
        // Section properties (all in cm units)
        const A = 2 * b * tf + (h - 2 * tf) * tw; // cm²
        const ry = Math.sqrt(Iy / A); // cm
        
        // Convert length to cm and calculate slenderness ratio
        const L_cm = L * 100; // m -> cm
        const KL_ry = L_cm / ry;
        
        // Material properties in consistent units
        const E = 21000; // kN/cm²
        const fy = 27.5;  // kN/cm² (converted from 275 MPa)
        
        // Elastic buckling stress (kN/cm²)
        const Fe = Math.PI * Math.PI * E / Math.pow(KL_ry, 2);
        
        // Critical buckling stress (kN/cm²)
        let Fcr;
        if (KL_ry <= 4.71 * Math.sqrt(E / fy)) {
            // Inelastic buckling - AISC Equation E3-2
            Fcr = fy * Math.pow(0.658, (fy/Fe));
        } else {
            // Elastic buckling - AISC Equation E3-3
            Fcr = 0.877 * Fe;
        }
        
        // Nominal compressive strength (kN)
        const Pn = Fcr * A;
        const PhiPn = 0.9 * Pn;
        
        // Convert moment to consistent units (kNcm)
        const moment_kNcm = moment * 100; // kNm to kNcm
        
        // Calculate plastic and elastic moment capacities
        const Mp = Wply * fy / 10; // kNm
        const My = Wely * fy / 10; // kNm
        
        // Lateral-torsional buckling parameters
        const Lp = 1.76 * ry * Math.sqrt(E / fy);
        const Lr = 1.95 * ry * Math.sqrt(E / (0.7 * fy)) * 
                   Math.sqrt(1 / Math.sqrt(1 + Math.sqrt(1 + 6.76 * Math.pow(0.7 * fy / E, 2))));
    
        // Calculate nominal flexural strength
        let Mn;
        const Cb = 1.0; // Conservative assumption for uniform moment
    
        if (L_cm <= Lp) {
            Mn = Mp;
        } else if (L_cm <= Lr) {
            Mn = Cb * (Mp - (Mp - 0.7 * My) * ((L_cm - Lp) / (Lr - Lp)));
        } else {
            const Fcr_LTB = (Cb * Math.PI * Math.PI * E) / Math.pow(L_cm / ry, 2);
            Mn = Fcr_LTB * Wely / 1000; // Convert to kNm
            Mn = Math.min(Mn, Mp);
        }
        
        const PhiMn = 0.9 * Mn;
        
        // Calculate demand/capacity ratios
        const momentRatio = moment / PhiMn;
        const axialRatio = (moment_kNcm * h/2) / (Iy * Fcr); // Bending stress / critical stress
        
        // Combined ratio per AISC H1.1
        const combinedRatio = axialRatio + momentRatio;
        const globalSafetyFactor = 1.0 / combinedRatio;
        
        // Local buckling checks
        const h_tw = (h - 2 * tf) / tw;
        const lambda_w = 1.49 * Math.sqrt(E / fy);
        const webCheck = h_tw <= lambda_w;
        
        const b_tf = (b / 2) / tf;
        const lambda_f = 0.56 * Math.sqrt(E / fy);
        const flangeCheck = b_tf <= lambda_f;
        
        // Return results with all relevant safety metrics
        return {
            KL_ry: KL_ry.toFixed(2),
            bucklingSafety: globalSafetyFactor.toFixed(2),
            momentSafety: (PhiMn / moment).toFixed(2),
            bucklingCapacity: PhiPn.toFixed(2),
            webRatio: h_tw.toFixed(2),
            webLimit: lambda_w.toFixed(2),
            webCheck: webCheck,
            flangeRatio: b_tf.toFixed(2),
            flangeLimit: lambda_f.toFixed(2),
            flangeCheck: flangeCheck,
            bucklingMoment: PhiMn.toFixed(2),
            plasticMoment: Mp.toFixed(2),
            elasticMoment: My.toFixed(2),
            axialRatio: axialRatio.toFixed(3),
            momentRatio: momentRatio.toFixed(3),
            combinedRatio: combinedRatio.toFixed(3)
        };
    }
    
    // Burkulma kontrollerini geçen uygun kesiti bulan fonksiyon
    function findSuitableSectionWithBuckling(sections, requiredWpl, L, moment) {
        for (let i = 0; i < sections.length; i++) {
            const section = sections[i];
            
            // First check plastic section modulus requirement
            if (section[7] >= requiredWpl) {
                const bucklingCheck = calculateBuckling(section, L, moment);
                
                // Comprehensive safety checks:
                // 1. Combined buckling and moment safety factor > 1.0
                // 2. Local web buckling check
                // 3. Local flange buckling check
                // 4. Pure moment capacity check
                // 5. Combined ratio check (AISC H1.1)
                if (Number(bucklingCheck.bucklingSafety) >= 1.0 && 
                    bucklingCheck.webCheck && 
                    bucklingCheck.flangeCheck && 
                    Number(bucklingCheck.momentSafety) >= 1.0 && 
                    Number(bucklingCheck.combinedRatio) <= 1.0) {
                    
                    return {
                        section: section,
                        buckling: bucklingCheck
                    };
                }
            }
        }
        
        // Try with larger sections if no suitable section found
        for (let i = 0; i < sections.length; i++) {
            const section = sections[i];
            if (section[7] >= requiredWpl * 1.5) { // Try sections with 50% more capacity
                const bucklingCheck = calculateBuckling(section, L, moment);
                
                if (Number(bucklingCheck.bucklingSafety) >= 1.0 && 
                    bucklingCheck.webCheck && 
                    bucklingCheck.flangeCheck && 
                    Number(bucklingCheck.momentSafety) >= 1.0 && 
                    Number(bucklingCheck.combinedRatio) <= 1.0) {
                    
                    return {
                        section: section,
                        buckling: bucklingCheck
                    };
                }
            }
        }
        
        return null;
    }
    
    // Kesit çizimini oluşturan fonksiyon
    function drawSection(section, type) {
        if (!section) return `<div class="section-not-found">Uygun ${type} Kesit Bulunmadı</div>`;
        
        const name = section[0];
        const h = section[1]; // yükseklik
        const b = section[2]; // genişlik
        const tw = section[3]; // gövde kalınlığı
        const tf = section[4]; // flanş kalınlığı
        const Iy = section[5]; // atalet momenti
        const Wely = section[6]; // elastik kesit modülü
        const Wply = section[7]; // plastik kesit modülü
        
        // Çizim için ölçeklendirme (mm -> px)
        const scale = 0.5;
        const scaledH = h * scale;
        const scaledB = b * scale;
        const scaledTw = Math.max(tw * scale, 2); // En az 2px kalınlık
        const scaledTf = Math.max(tf * scale, 2); // En az 2px kalınlık
        
        // SVG çizim alanı
        let svg = `
        <div class="section-container">
            <div class="section-title">${name}</div>
            <svg width="${scaledB + 40}" height="${scaledH + 40}" viewBox="0 0 ${scaledB + 40} ${scaledH + 40}">
                <defs>
                    <linearGradient id="${type}Gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" style="stop-color:#2980b9;stop-opacity:0.8" />
                        <stop offset="50%" style="stop-color:#3498db;stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#2980b9;stop-opacity:0.8" />
                    </linearGradient>
                </defs>
                <g transform="translate(${(scaledB + 40)/2 - scaledB/2}, 20)">
                    <!-- Üst flanş -->
                    <rect x="0" y="0" width="${scaledB}" height="${scaledTf}" fill="url(#${type}Gradient)" stroke="#2c3e50" stroke-width="1" />
                    
                    <!-- Gövde -->
                    <rect x="${(scaledB - scaledTw) / 2}" y="${scaledTf}" width="${scaledTw}" height="${scaledH - 2 * scaledTf}" fill="url(#${type}Gradient)" stroke="#2c3e50" stroke-width="1" />
                    
                    <!-- Alt flanş -->
                    <rect x="0" y="${scaledH - scaledTf}" width="${scaledB}" height="${scaledTf}" fill="url(#${type}Gradient)" stroke="#2c3e50" stroke-width="1" />
                    
                    <!-- Boyutlar -->
                    <line x1="${scaledB}" y1="${scaledTf/2}" x2="${scaledB + 10}" y2="${scaledTf/2}" stroke="#7f8c8d" stroke-width="1" />
                    <text x="${scaledB + 12}" y="${scaledTf/2 + 4}" font-size="8" fill="#7f8c8d">tf=${tf}mm</text>
                    
                    <line x1="${(scaledB + scaledTw) / 2 + 2}" y1="${scaledH/2}" x2="${scaledB + 10}" y2="${scaledH/2}" stroke="#7f8c8d" stroke-width="1" />
                    <text x="${scaledB + 12}" y="${scaledH/2 + 4}" font-size="8" fill="#7f8c8d">tw=${tw}mm</text>
                </g>
            </svg>            <div class="section-dimensions">
                <div class="dimension-row">
                    <span class="dimension-label">Yükseklik (h):</span>
                    <span class="dimension-value">${h} mm</span>
                </div>
                <div class="dimension-row">
                    <span class="dimension-label">Genişlik (b):</span>
                    <span class="dimension-value">${b} mm</span>
                </div>
                <div class="dimension-row">
                    <span class="dimension-label">Wpl,y:</span>
                    <span class="dimension-value">${Wply} cm³</span>
                </div>
                <div class="dimension-row">
                    <span class="dimension-label">Iy:</span>
                    <span class="dimension-value">${Iy} cm⁴</span>
                </div>
                ${section[8] ? `
                <div class="section-buckling-title">Burkulma Güvenliği</div>
                <div class="dimension-row">
                    <span class="dimension-label">Global:</span>
                    <span class="dimension-value ${Number(section[8].bucklingSafety) >= 1.0 ? 'safe' : 'unsafe'}">${section[8].bucklingSafety} ${Number(section[8].bucklingSafety) >= 1.0 ? '✓' : '✗'}</span>
                </div>
                <div class="dimension-row">
                    <span class="dimension-label">Gövde:</span>
                    <span class="dimension-value ${section[8].webCheck ? 'safe' : 'unsafe'}">${section[8].webCheck ? 'Güvenli ✓' : 'Güvensiz ✗'}</span>
                </div>
                <div class="dimension-row">
                    <span class="dimension-label">Başlık:</span>
                    <span class="dimension-value ${section[8].flangeCheck ? 'safe' : 'unsafe'}">${section[8].flangeCheck ? 'Güvenli ✓' : 'Güvensiz ✗'}</span>
                </div>
                ` : ''}
            </div>
        </div>`;
        
        return svg;
    }
    
    // Hesaplama fonksiyonu
    function hesaplaWeb() {
        try {
            // Kullanıcı girdilerini al ve float'a dönüştür
            const Lc = parseFloat(inputFields.Lc.value);
            const ah = parseFloat(inputFields.ah.value);
            const aw = parseFloat(inputFields.aw.value);
            const wc = parseFloat(inputFields.wc.value);
            const wcb = parseFloat(inputFields.wcb.value);
            const wcap = parseFloat(inputFields.wcap.value);
            const L = parseFloat(inputFields.L.value);
            
            // Tüm değerlerin sayı olup olmadığını kontrol et
            if (isNaN(Lc) || isNaN(ah) || isNaN(aw) || isNaN(wc) || 
                isNaN(wcb) || isNaN(wcap) || isNaN(L)) {
                throw new Error("Tüm alanlar sayısal değer içermelidir.");
            }
            
            // Hesaplamalar - Python kodundaki formüller ile aynı
            const RA = (wc / 2) + ((Lc - ah) / Lc) * (wcb + wcap);
            const RB = wc + wcb + wcap - RA;
            const WvA = RA / 2;
            const WvB = RB / 2;
            const WvA_t = WvA * 1.25;
            const WvB_t = WvB * 1.25;
            const Wh1 = 0.025 * (wcb + wcap);
            const Wh2A = 0.05 * WvA;
            const Wh2B = 0.05 * WvB_t;

            const QMaxA = WvA_t * (2 - aw / L);
            const QMaxB = WvB_t * (2 - aw / L);

            const M1 = QMaxA * 2 / L * ((L / 2 - aw / 4) ** 2);
            const M2 = QMaxA * L / 4;
            const MMajor3max = Math.max(M1, M2);
            const V3Majormax = Wh2A * (2 - aw / L);

            const MMinor1 = 2 * Wh2A / L * ((L / 2 - aw / 4) ** 2);
            const MMinor2 = Wh2A * L / 4;
            const MMinor2max = Math.max(MMinor1, MMinor2);
            
            // Parametreleri güncelle ve şemaları çiz
            const params = { 
                Lc, ah, aw, wc, wcb, wcap, L, 
                WvA_t, WvB_t, Wh1, Wh2A, Wh2B, MMajor3max 
            };
            
            if (craneSideView) craneSideView.innerHTML = drawCraneSideView(params);
            if (forceDiagram) forceDiagram.innerHTML = drawForceDiagram(params);
            if (beamDiagram) beamDiagram.innerHTML = drawBeamDiagram(params);
              // Kesit tasarımını yap - S275 çeliği için (burkulma kontrollerini içerir)
            const sectionResult = sectionDesign(MMajor3max, L);            // Sonuçları arayüzde göster - formatı koruyarak
            const results = 
                `RA = ${RA.toFixed(2)} kN\nRB = ${RB.toFixed(2)} kN\n` +
                `W'vA = ${WvA_t.toFixed(2)} kN\nW'vB = ${WvB_t.toFixed(2)} kN\n` +
                `Wh1 = ${Wh1.toFixed(2)} kN\nWh2A = ${Wh2A.toFixed(2)} kN\nWh2B = ${Wh2B.toFixed(2)} kN\n` +
                `QMaxA = ${QMaxA.toFixed(2)} kN\nQMaxB = ${QMaxB.toFixed(2)} kN\n` +
                `M1 = ${M1.toFixed(2)} kNm\nM2 = ${M2.toFixed(2)} kNm\n` +
                `MMajor3max = ${MMajor3max.toFixed(2)} kNm\n` +
                `V3Majormax = ${V3Majormax.toFixed(2)} kN\n` +
                `MMinor1 = ${MMinor1.toFixed(2)} kNm\nMMinor2 = ${MMinor2.toFixed(2)} kNm\n` +
                `MMinor2max = ${MMinor2max.toFixed(2)} kNm\n\n` +                `--- KESİT TASARIMI (S275 Çeliği) ---\n` +
                `Gerekli Plastik Kesit Modülü = ${sectionResult.requiredWpl} cm³\n` +
                `Seçilen IPE Kesiti: ${sectionResult.IPEName} ${sectionResult.IPE && sectionResult.buckling.IPE.bucklingSafety >= 1.0 ? '(Burkulma kontrolü ✓)' : '(Burkulma kontrolü başarısız)'}\n` +
                `Seçilen HEA Kesiti: ${sectionResult.HEAName} ${sectionResult.HEA && sectionResult.buckling.HEA.bucklingSafety >= 1.0 ? '(Burkulma kontrolü ✓)' : '(Burkulma kontrolü başarısız)'}\n` +
                `Seçilen HEB Kesiti: ${sectionResult.HEBName} ${sectionResult.HEB && sectionResult.buckling.HEB.bucklingSafety >= 1.0 ? '(Burkulma kontrolü ✓)' : '(Burkulma kontrolü başarısız)'}\n` +
                `Seçilen HEM Kesiti: ${sectionResult.HEMName} ${sectionResult.HEM && sectionResult.buckling.HEM.bucklingSafety >= 1.0 ? '(Burkulma kontrolü ✓)' : '(Burkulma kontrolü başarısız)'}\n\n` +
                `--- BURKULMA KONTROLLERİ (AISC) ---\n` +
                (sectionResult.IPE ? `IPE ${sectionResult.IPE[0]}:\n` +
                `  Narinlik Oranı (KL/r) = ${sectionResult.buckling.IPE.KL_ry}\n` +
                `  Global Burkulma Emniyet Faktörü = ${sectionResult.buckling.IPE.bucklingSafety} ${Number(sectionResult.buckling.IPE.bucklingSafety) >= 1.0 ? '✓' : '✗'}\n` +
                `  Gövde Yerel Burkulma Kontrolü: h/tw = ${sectionResult.buckling.IPE.webRatio} <= ${sectionResult.buckling.IPE.webLimit} ${sectionResult.buckling.IPE.webCheck ? '✓' : '✗'}\n` +
                `  Başlık Yerel Burkulma Kontrolü: b/(2*tf) = ${sectionResult.buckling.IPE.flangeRatio} <= ${sectionResult.buckling.IPE.flangeLimit} ${sectionResult.buckling.IPE.flangeCheck ? '✓' : '✗'}\n` : '') +
                (sectionResult.HEA ? `\nHEA ${sectionResult.HEA[0]}:\n` +
                `  Narinlik Oranı (KL/r) = ${sectionResult.buckling.HEA.KL_ry}\n` +
                `  Global Burkulma Emniyet Faktörü = ${sectionResult.buckling.HEA.bucklingSafety} ${Number(sectionResult.buckling.HEA.bucklingSafety) >= 1.0 ? '✓' : '✗'}\n` +
                `  Gövde Yerel Burkulma Kontrolü: h/tw = ${sectionResult.buckling.HEA.webRatio} <= ${sectionResult.buckling.HEA.webLimit} ${sectionResult.buckling.HEA.webCheck ? '✓' : '✗'}\n` +
                `  Başlık Yerel Burkulma Kontrolü: b/(2*tf) = ${sectionResult.buckling.HEA.flangeRatio} <= ${sectionResult.buckling.HEA.flangeLimit} ${sectionResult.buckling.HEA.flangeCheck ? '✓' : '✗'}\n` : '') +
                (sectionResult.HEB ? `\nHEB ${sectionResult.HEB[0]}:\n` +
                `  Narinlik Oranı (KL/r) = ${sectionResult.buckling.HEB.KL_ry}\n` +
                `  Global Burkulma Emniyet Faktörü = ${sectionResult.buckling.HEB.bucklingSafety} ${Number(sectionResult.buckling.HEB.bucklingSafety) >= 1.0 ? '✓' : '✗'}\n` +
                `  Gövde Yerel Burkulma Kontrolü: h/tw = ${sectionResult.buckling.HEB.webRatio} <= ${sectionResult.buckling.HEB.webLimit} ${sectionResult.buckling.HEB.webCheck ? '✓' : '✗'}\n` +
                `  Başlık Yerel Burkulma Kontrolü: b/(2*tf) = ${sectionResult.buckling.HEB.flangeRatio} <= ${sectionResult.buckling.HEB.flangeLimit} ${sectionResult.buckling.HEB.flangeCheck ? '✓' : '✗'}\n` : '') +
                (sectionResult.HEM ? `\nHEM ${sectionResult.HEM[0]}:\n` +
                `  Narinlik Oranı (KL/r) = ${sectionResult.buckling.HEM.KL_ry}\n` +
                `  Global Burkulma Emniyet Faktörü = ${sectionResult.buckling.HEM.bucklingSafety} ${Number(sectionResult.buckling.HEM.bucklingSafety) >= 1.0 ? '✓' : '✗'}\n` +
                `  Gövde Yerel Burkulma Kontrolü: h/tw = ${sectionResult.buckling.HEM.webRatio} <= ${sectionResult.buckling.HEM.webLimit} ${sectionResult.buckling.HEM.webCheck ? '✓' : '✗'}\n` +
                `  Başlık Yerel Burkulma Kontrolü: b/(2*tf) = ${sectionResult.buckling.HEM.flangeRatio} <= ${sectionResult.buckling.HEM.flangeLimit} ${sectionResult.buckling.HEM.flangeCheck ? '✓' : '✗'}\n` : '');
            
            resultLabel.textContent = results;
              // Burkulma bilgilerini kesit dizilerine ekle
            if (sectionResult.IPE && sectionResult.buckling.IPE) {
                sectionResult.IPE[8] = sectionResult.buckling.IPE;
            }
            if (sectionResult.HEA && sectionResult.buckling.HEA) {
                sectionResult.HEA[8] = sectionResult.buckling.HEA;
            }
            if (sectionResult.HEB && sectionResult.buckling.HEB) {
                sectionResult.HEB[8] = sectionResult.buckling.HEB;
            }
            if (sectionResult.HEM && sectionResult.buckling.HEM) {
                sectionResult.HEM[8] = sectionResult.buckling.HEM;
            }
            
            // Seçilen kesitlerin görsel gösterimi
            const sectionsHTML = `
                <div class="section-title-main">Seçilen Kesit Profilleri</div>
                <div class="sections-grid">
                    <div class="section-column">
                        ${drawSection(sectionResult.IPE, "IPE")}
                    </div>
                    <div class="section-column">
                        ${drawSection(sectionResult.HEA, "HEA")}
                    </div>
                    <div class="section-column">
                        ${drawSection(sectionResult.HEB, "HEB")}
                    </div>
                    <div class="section-column">
                        ${drawSection(sectionResult.HEM, "HEM")}
                    </div>
                </div>
            `;
            
            sectionResultsDiv.innerHTML = sectionsHTML;
            
        } catch (error) {
            alert("Hata: " + error.message);
        }
    }
    
    // Varsayılan değerleri girdi alanlarına yerleştir
    function setDefaultValues() {
        const defaults = {
            Lc: 33.0,
            ah: 0.8,
            aw: 1.56,
            wc: 380.0,
            wcb: 50.0,
            wcap: 200.0,
            L: 12.0
        };
        
        for (const key in defaults) {
            if (inputFields[key]) {
                inputFields[key].value = defaults[key];
            }
        }
        
        // Varsayılan değerlerle şemaları güncelle
        if (craneSideView) craneSideView.innerHTML = drawCraneSideView(defaults);
        if (forceDiagram) forceDiagram.innerHTML = drawForceDiagram();
        if (beamDiagram) beamDiagram.innerHTML = drawBeamDiagram(defaults);
    }
    
    function createSectionResult(section, name, buckling) {
        const sectionDiv = document.createElement('div');
        sectionDiv.className = 'section-result';
        
        const nameElem = document.createElement('h3');
        nameElem.textContent = section ? section[0] : `Uygun ${name} kesit bulunamadı`;
        sectionDiv.appendChild(nameElem);
        
        if (section && buckling) {
            const detailsDiv = document.createElement('div');
            detailsDiv.className = 'section-details';
            
            // Get LTB status
            const ltbStatus = getLTBStatus(buckling);
            
            let stiffenerText = '';
            if (buckling.stiffenerInfo && buckling.stiffenerInfo.needsStiffeners) {
                const spacing = (buckling.stiffenerInfo.spacing / 100).toFixed(2);
                stiffenerText = `
                    <div class="stiffener-info">
                        <p><strong>Gövde Berkitme Gerekli ✓</strong></p>
                        <p>Berkitme Aralığı: ${spacing} m</p>
                        <p>Efektif Gövde Narinliği: ${buckling.webRatio}</p>
                    </div>`;
            }
            
            detailsDiv.innerHTML = `
                <p>Burkulma Güvenliği: ${buckling.bucklingSafety} ${Number(buckling.bucklingSafety) >= 1.0 ? '✓' : '✗'}</p>
                <p>Gövde Narinliği: ${buckling.webRatio} / ${buckling.webLimit} ${buckling.webCheck ? '✓' : '✗'}</p>
                <p>Başlık Narinliği: ${buckling.flangeRatio} / ${buckling.flangeLimit} ${buckling.flangeCheck ? '✓' : '✗'}</p>
                <p>Moment Güvenliği: ${buckling.momentSafety} ${Number(buckling.momentSafety) >= 1.0 ? '✓' : '✗'}</p>
                <div class="ltb-info">
                    <p><strong>Yanal Burulmalı Burkulma (LTB):</strong></p>
                    <p>Durum: ${ltbStatus.status}</p>
                    <p>Mp = ${buckling.plasticMoment} kNm</p>
                    <p>Mn = ${buckling.bucklingMoment} kNm</p>
                </div>
                ${stiffenerText}
            `;
            
            sectionDiv.appendChild(detailsDiv);
        }
        
        return sectionDiv;
    }

    function getLTBStatus(buckling) {
        const Mn = Number(buckling.bucklingMoment);
        const Mp = Number(buckling.plasticMoment);
        
        if (Mn === Mp) {
            return {
                status: "Plastik Bölge - LTB Yok ✓",
                ratio: 1
            };
        } else if (Mn >= 0.7 * Mp) {
            return {
                status: "İnelastik LTB Bölgesi ⚠️",
                ratio: Mn / Mp
            };
        } else {
            return {
                status: "Elastik LTB Bölgesi ⚠️",
                ratio: Mn / Mp
            };
        }
    }
});

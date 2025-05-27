// script.js - Vinç hesap algoritması
document.addEventListener('DOMContentLoaded', function() {
    // DOM elementlerini yakala
    const calculateBtn = document.getElementById('calculate-btn');
    const defaultBtn = document.getElementById('default-btn');
    const resultLabel = document.getElementById('result-label');
    
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
    
    // Kesit seçimi yapan fonksiyon
    function sectionDesign(moment) {
        // moment kNm cinsinden, kesit tablosundaki değerler cm3 cinsinden
        // Çevirme faktörü: 1 kNm = 100000 Nmm = 100 Ncm
        const Md = moment * 100; // kNm'yi Ncm'ye çevir
        
        // Gerekli plastik kesit modülü (cm3)
        const requiredWpl = Md / (fy * 0.9); // 0.9 güvenlik faktörü
        
        // Her bir kesit tipi için uygun olan en küçük kesiti bul
        const suitableIPE = IPEsections.find(section => section[7] >= requiredWpl);
        const suitableHEA = HEAsections.find(section => section[7] >= requiredWpl);
        const suitableHEB = HEBsections.find(section => section[7] >= requiredWpl);
        
        const result = {
            requiredWpl: requiredWpl.toFixed(2),
            IPE: suitableIPE ? suitableIPE[0] : "Uygun IPE kesit bulunamadı",
            HEA: suitableHEA ? suitableHEA[0] : "Uygun HEA kesit bulunamadı",
            HEB: suitableHEB ? suitableHEB[0] : "Uygun HEB kesit bulunamadı"
        };
        
        return result;
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
            
            // Kesit tasarımını yap - S275 çeliği için
            const sectionResult = sectionDesign(MMajor3max);

            // Sonuçları arayüzde göster - formatı koruyarak
            const results = 
                `RA = ${RA.toFixed(2)} kN\nRB = ${RB.toFixed(2)} kN\n` +
                `W'vA = ${WvA_t.toFixed(2)} kN\nW'vB = ${WvB_t.toFixed(2)} kN\n` +
                `Wh1 = ${Wh1.toFixed(2)} kN\nWh2A = ${Wh2A.toFixed(2)} kN\nWh2B = ${Wh2B.toFixed(2)} kN\n` +
                `QMaxA = ${QMaxA.toFixed(2)} kN\nQMaxB = ${QMaxB.toFixed(2)} kN\n` +
                `M1 = ${M1.toFixed(2)} kNm\nM2 = ${M2.toFixed(2)} kNm\n` +
                `MMajor3max = ${MMajor3max.toFixed(2)} kNm\n` +
                `V3Majormax = ${V3Majormax.toFixed(2)} kN\n` +
                `MMinor1 = ${MMinor1.toFixed(2)} kNm\nMMinor2 = ${MMinor2.toFixed(2)} kNm\n` +
                `MMinor2max = ${MMinor2max.toFixed(2)} kNm\n\n` +
                `--- KESİT TASARIMI (S275 Çeliği) ---\n` +
                `Gerekli Plastik Kesit Modülü = ${sectionResult.requiredWpl} cm³\n` +
                `Önerilen IPE Kesiti: ${sectionResult.IPE}\n` +
                `Önerilen HEA Kesiti: ${sectionResult.HEA}\n` +
                `Önerilen HEB Kesiti: ${sectionResult.HEB}`;
            
            resultLabel.textContent = results;
            
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
    }
});

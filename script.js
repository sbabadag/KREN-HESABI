// script.js - Vinç hesap algoritması
document.addEventListener('DOMContentLoaded', function() {
    // DOM elementlerini yakala
    const calculateBtn = document.getElementById('calculate-btn');
    const defaultBtn = document.getElementById('default-btn');
    const resultLabel = document.getElementById('result-label');
    
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
                `MMinor2max = ${MMinor2max.toFixed(2)} kNm`;
            
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

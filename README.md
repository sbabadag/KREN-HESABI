# KASCCO 20t Vinç Hesabı Web Uygulaması

Bu uygulama, KASCCO 20t vinç hesaplarını yapan bir web arayüzüdür. Python tkinter uygulamasından web platformuna dönüştürülmüştür.

## İçerik

- `index.html`: Ana HTML sayfası
- `styles.css`: Uygulama stilleri
- `script.js`: Hesaplama fonksiyonları

## GitHub Pages'e Yükleme Adımları

1. Bu dosyaları GitHub repository'nize yükleyin (`https://github.com/sbabadag/sebawebstorage`):

   ```bash
   git add index.html styles.css script.js
   git commit -m "Vinç hesaplama web uygulaması eklendi"
   git push origin main
   ```

2. GitHub Pages ayarlarını kontrol edin:
   - GitHub'da repository sayfanıza gidin
   - "Settings" sekmesine tıklayın
   - Sol menüden "Pages" seçeneğine tıklayın
   - "Branch" bölümünde "main" branch'ini seçin ve "/root" klasörünü seçin
   - "Save" düğmesine tıklayın

3. Birkaç dakika içinde web siteniz şu adreste yayınlanacaktır:
   `https://sbabadag.github.io/sebawebstorage/`

## Mevcut Web Sitenize Entegre Etme

Eğer mevcut web sitenize bu uygulamayı eklemek istiyorsanız:

1. Dosyaları sitenizin uygun bir alt dizinine kopyalayın (örneğin `/vinc-hesabi/`)
2. Ana web sayfanıza bir link ekleyin:

   ```html
   <a href="vinc-hesabi/index.html">KASCCO 20t Vinç Hesabı</a>
   ```

## Not

Bu web uygulaması, orijinal Python programındaki hesaplamaları birebir aynı şekilde yapmaktadır ve tamamen tarayıcı üzerinde çalışır.

## İletişim

KASCCO Mühendislik

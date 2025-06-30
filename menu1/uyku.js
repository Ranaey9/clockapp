// Yıldızları oluşturur
function yildizlariOlustur() {
  // stars ID'li alanı seç
  const yildizAlani = document.getElementById("stars");

  // Önceki yıldızları temizle
  yildizAlani.innerHTML = "";

  // 120 tane yıldız oluştur
  for (let i = 0; i < 120; i++) {
    const yildiz = document.createElement("div"); // yeni yıldız (div) oluştur
    yildiz.classList.add("star"); // CSS sınıfı ekle

    // Rastgele konum ver
    yildiz.style.left = Math.random() * 100 + "vw";
    yildiz.style.top = Math.random() * -100 + "vh";

    // Hareket süresi ve saydamlık
    yildiz.style.animationDuration = (2 + Math.random() * 4) + "s";
    yildiz.style.opacity = Math.random();

    // Yıldızı ekrana (div içine) ekle
    yildizAlani.appendChild(yildiz);
  }
}

// Uyku modunu açar/kapatır
function uykuModuDegistir() {
  // body elementini al
  const govde = document.body;

  // Buton elementini al
  const buton = document.querySelector("button");

  // Uyku sınıfı varsa kaldır, yoksa ekle
  govde.classList.toggle("uyku");

  // Duruma göre buton yazısını değiştir
  if (govde.classList.contains("uyku")) {
    buton.textContent = "Kapat";
    yildizlariOlustur(); // yıldızları başlat
  } else {
    buton.textContent = "Başlat";
  }
}

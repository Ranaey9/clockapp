// Başlangıçta saat ve dakika bilgisi
let saat = 6;
let dakika = 0;

// Sayılar tek haneliyse başına 0 koyar (örnek: 6 → "06")
function sifirEkle(sayi) {
  if (sayi < 10) return "0" + sayi;
  return sayi;
}

// Saat ve dakikayı ekranda gösteren fonksiyon
function saatiGoster() {
  const saatAlani = document.getElementById("hour-column");
  const dakikaAlani = document.getElementById("minute-column");

  // Önceki ve sonraki saatler
  let once = (saat - 1 + 24) % 24;
  let sonra = (saat + 1) % 24;

  saatAlani.innerHTML = `
    <div class="faded">${sifirEkle(once)}</div>
    <div class="active">${sifirEkle(saat)}</div>
    <div class="faded">${sifirEkle(sonra)}</div>
  `;

  // Önceki ve sonraki dakikalar
  let onceDk = (dakika - 1 + 60) % 60;
  let sonraDk = (dakika + 1) % 60;

  dakikaAlani.innerHTML = `
    <div class="faded">${sifirEkle(onceDk)}</div>
    <div class="active">${sifirEkle(dakika)}</div>
    <div class="faded">${sifirEkle(sonraDk)}</div>
  `;
}

// Yukarı veya aşağı kaydırınca saat değişsin
document.getElementById("hour-column").addEventListener("wheel", function (e) {
  e.preventDefault();
  if (e.deltaY < 0) saat = (saat + 1) % 24;
  else saat = (saat - 1 + 24) % 24;
  saatiGoster();
});

// Dakika için aynı işlem
document
  .getElementById("minute-column")
  .addEventListener("wheel", function (e) {
    e.preventDefault();
    if (e.deltaY < 0) dakika = (dakika + 1) % 60;
    else dakika = (dakika - 1 + 60) % 60;
    saatiGoster();
  });

// Gün seçme: tıklayınca seçili olmasını sağlar
document.querySelectorAll(".day").forEach(function (gun) {
  gun.addEventListener("click", function () {
    gun.classList.toggle("selected");
  });
});

// Sayfa ilk açıldığında saatleri göster
saatiGoster();

// Ses aç/kapat butonu
const sesButonu = document.getElementById("sound-toggle");
const sesAyarKutusu = document.getElementById("sound-link-wrapper");

// Açıkken görünür, kapalıyken gizli
sesButonu.addEventListener("change", function () {
  if (sesButonu.checked) {
    sesAyarKutusu.style.display = "inline-block";
  } else {
    sesAyarKutusu.style.display = "none";
  }
});

// Sayfa yüklendiğinde çalışacak
document.addEventListener("DOMContentLoaded", function () {
  // Kaydet Butonuna tıklanınca:
  document.querySelector(".save-btn").addEventListener("click", function () {
    // Saat ve dakika değerlerini al (değişkenlerden)
    const alarmSaati = `${sifirEkle(saat)}:${sifirEkle(dakika)}`;

    // Alarm adı
    const not = document.getElementById("label").value || "(Adsız)";

    // Diğer ayarlar
    const sesAcik = document.getElementById("sound-toggle").checked;
    const titreşimAcik = document.getElementById("vibration").checked;
    const erteleAcik = document.getElementById("snooze").checked;

    // Seçilen günleri al
    const gunler = [];
    document.querySelectorAll(".day.selected").forEach(function (el) {
      gunler.push(el.textContent);
    });

    // Alarm nesnesi oluştur
    const alarm = {
      saat: alarmSaati,
      not: not,
      ses: sesAcik,
      titreşim: titreşimAcik,
      ertele: erteleAcik,
      gunler: gunler,
    };

    // Kaydet (localStorage)
    let alarmlar = JSON.parse(localStorage.getItem("alarjiler") || "[]");
    alarmlar.push(alarm);
    localStorage.setItem("alarjiler", JSON.stringify(alarmlar));

    // Ana sayfaya dön
    window.location.href = "../Alarm.html";
  });

  // İptal butonu → geri dön
  document.querySelector(".cancel-btn").addEventListener("click", function () {
    window.location.href = "../Alarm.html";
  });
});
document.querySelector(".save-btn").addEventListener("click", function () {
  const alarmSaati = `${sifirEkle(saat)}:${sifirEkle(dakika)}`;
  const alarmAdi = document.getElementById("label").value || "(Adsız)";
  const tarih = new Date();
  const gunler = ["Paz", "Pzt", "Sal", "Çar", "Per", "Cum", "Cmt"];
  const gun = gunler[tarih.getDay()];
  const aylar = [
    "Oca",
    "Şub",
    "Mar",
    "Nis",
    "May",
    "Haz",
    "Tem",
    "Ağu",
    "Eyl",
    "Eki",
    "Kas",
    "Ara",
  ];
  const tarihYazi = `${gun}, ${tarih.getDate()} ${aylar[tarih.getMonth()]}`;

  const alarm = {
    saat: alarmSaati,
    tarih: tarihYazi,
    aktif: true,
  };

  let alarmlar = JSON.parse(localStorage.getItem("alarjiler") || "[]");
  alarmlar.push(alarm);
  localStorage.setItem("alarjiler", JSON.stringify(alarmlar));

  // Alarm listesi sayfasına git
  window.location.href = "Alarmlar.html";
});

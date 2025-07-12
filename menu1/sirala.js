let alarmlar = JSON.parse(localStorage.getItem("alarjiler") || "[]");
let siralama = localStorage.getItem("siralama") || "ozel";

const menuBtn = document.getElementById("menuBtn");
const mainMenu = document.getElementById("mainMenu");
const kaydetBtn = document.getElementById("kaydetBtn");
const iptalBtn = document.getElementById("iptalBtn");
const menuItems = mainMenu.querySelectorAll(".menu-item");

// Menü aç/kapa
menuBtn.addEventListener("click", e => {
  e.stopPropagation();
  mainMenu.style.display = mainMenu.style.display === "block" ? "none" : "block";
});

// Sayfa dışına tıklayınca menüyü kapat
document.addEventListener("click", () => {
  mainMenu.style.display = "none";
});

// Menüde sıralama seçimi
menuItems.forEach(item => {
  item.addEventListener("click", e => {
    e.stopPropagation();
    siralama = item.getAttribute("data-val");
    updateActive();
    listeyiGoster();
    mainMenu.style.display = "none";
  });
});

// Aktif menü öğesini güncelle
function updateActive() {
  menuItems.forEach(i => {
    i.classList.toggle("active", i.getAttribute("data-val") === siralama);
  });
}

// Listeyi göster
function listeyiGoster() {
  let liste = [...alarmlar];
  if (siralama === "kucuktenBuyuge") {
    liste.sort((a, b) => a.saat.localeCompare(b.saat));
  }

  const container = document.getElementById('alarm-listesi');
  container.innerHTML = '';

  if (liste.length === 0) {
    container.innerHTML = '<p style="text-align:center; color:#999;">Hiç alarm yok.</p>';
    return;
  }

  liste.forEach((alarm, index) => {
    const kart = document.createElement('div');
    kart.className = 'alarm-card';

    if (!alarm.aktif) {
      kart.classList.add('kapali');
    }

    kart.innerHTML = `
      <div class="alarm-info">
        <div class="alarm-left">${alarm.saat}</div>
        <div class="alarm-center">${alarm.tarih || 'undefined'}</div>
      </div>
      <div class="alarm-right">
        <label class="toggle-switch">
          <input type="checkbox" ${alarm.aktif ? 'checked' : ''}>
          <span class="slider"></span>
        </label>
        <button class="sil-btn" title="Sil">🗑️</button>
      </div>
    `;

    // Sil
    kart.querySelector('.sil-btn').addEventListener('click', () => {
      alarmlar.splice(index, 1);
      localStorage.setItem('alarjiler', JSON.stringify(alarmlar));
      listeyiGoster();
    });

    // Aç/kapa
    kart.querySelector('input[type="checkbox"]').addEventListener('change', function () {
      alarmlar[index].aktif = this.checked;
      localStorage.setItem('alarjiler', JSON.stringify(alarmlar));
      listeyiGoster();
    });

    container.appendChild(kart);
  });
}

// Alt butonlar
kaydetBtn.addEventListener('click', () => {
  localStorage.setItem('siralama', siralama);
  window.location.href = '../Alarm.html';
});

iptalBtn.addEventListener('click', () => {
  window.location.href = '../Alarm.html';
});

// Başlangıçta yükle
updateActive();
listeyiGoster();

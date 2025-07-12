// LocalStorage'tan alarmları al
  let alarmlar = JSON.parse(localStorage.getItem("alarjiler") || "[]");

  // Siralama isteği var mı?
  const siralama = localStorage.getItem("siralama");

  if (siralama === "kucuktenBuyuge") {
    alarmlar.sort((a, b) => a.saat.localeCompare(b.saat));
    localStorage.removeItem("siralama");
  } else if (siralama === "buyuktenKucuge") {
    alarmlar.sort((a, b) => b.saat.localeCompare(a.saat));
    localStorage.removeItem("siralama");
  } else {
    alarmlar.sort((a, b) => {
      if (a.aktif === b.aktif) return 0;
      return a.aktif ? -1 : 1;
    });
  }

  const container = document.getElementById("alarm-listesi");
  if (alarmlar.length === 0) {
    container.innerHTML = `<p style="text-align:center; color:#999;">Hiç alarm yok.</p>`;
  }

  alarmlar.forEach((alarm, index) => {
    const kart = document.createElement("div");
    kart.className = "alarm-card";

kart.innerHTML = `
  <div class="alarm-left ${alarm.aktif ? "" : "kapali"}">${alarm.saat}</div>
  <div class="alarm-center ${alarm.aktif ? "" : "kapali"}">${alarm.tarih}</div>
  <div class="alarm-right">
    <label class="toggle-switch">
      <input type="checkbox" ${alarm.aktif ? "checked" : ""} data-index="${index}">
      <span class="slider"></span>
    </label>
    <button class="sil-btn" title="Sil">🗑️</button>
  </div>
`;

    // Silme butonuna basılınca alarm sil
    const silBtn = kart.querySelector(".sil-btn");
    silBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      if (confirm("Bu alarmı silmek istiyor musun?")) {
        alarmlar.splice(index, 1);
        localStorage.setItem("alarjiler", JSON.stringify(alarmlar));
        location.reload();
      }
    });

    // Switch'e tıklanınca aktiflik değiştir
    const toggle = kart.querySelector('input[type="checkbox"]');
    toggle.addEventListener("click", (e) => {
      e.stopPropagation();
      alarm.aktif = toggle.checked;
      localStorage.setItem("alarjiler", JSON.stringify(alarmlar));
      location.reload();
    });

    container.appendChild(kart);
  });
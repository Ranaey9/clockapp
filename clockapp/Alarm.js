let alarmlar = JSON.parse(localStorage.getItem("alarmlar") || "[]");
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
    container.innerHTML = `<p class="no-alarm">Hiç alarm yok.</p>`;
}

alarmlar.forEach((alarm, index) => {
    const kart = document.createElement("div");
    kart.className = "alarm-card";

    const gunlerYazisi = Array.isArray(alarm.gunler) ? alarm.gunler.join(", ") : "";

    kart.innerHTML = `
    <div class="alarm-left ${alarm.aktif ? "" : "kapali"}">
        <span class="alarm-time">${alarm.saat}</span>
        <div class="alarm-meta">
            <span class="alarm-note">${alarm.not}</span> 
            ${gunlerYazisi ? '<span class="separator">•</span>' + gunlerYazisi : ''}
        </div>
    </div>

    <div class="alarm-right">
        <label class="toggle-switch">
            <input type="checkbox" ${alarm.aktif ? "checked" : ""} data-index="${index}">
            <span class="slider round"></span>
        </label>
        
        <button class="sil-btn" title="Sil">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            </svg>
        </button>
    </div>
    `;

    const silBtn = kart.querySelector(".sil-btn");
    silBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        if (confirm("Bu alarmı silmek istiyor musun?")) {
            alarmlar.splice(index, 1);
            localStorage.setItem("alarmlar", JSON.stringify(alarmlar));
            location.reload();
        }
    });

    const toggle = kart.querySelector('input[type="checkbox"]');
    toggle.addEventListener("click", (e) => {
        e.stopPropagation();
        alarm.aktif = toggle.checked;
        localStorage.setItem("alarmlar", JSON.stringify(alarmlar));
        location.reload();
    });

    container.appendChild(kart);
});

let saat = 6;
let dakika = 0;

const format = (n) => n.toString().padStart(2, '0');

function saatiGoster() {
    const hrCol = document.getElementById("hour-column");
    const minCol = document.getElementById("minute-column");

    hrCol.innerHTML = `
        <div class="faded" onclick="saatDegistir(-1)">${format((saat - 1 + 24) % 24)}</div>
        <input type="number" class="active-input" value="${format(saat)}" id="hr-input">
        <div class="faded" onclick="saatDegistir(1)">${format((saat + 1) % 24)}</div>
    `;

    minCol.innerHTML = `
        <div class="faded" onclick="dakikaDegistir(-1)">${format((dakika - 1 + 60) % 60)}</div>
        <input type="number" class="active-input" value="${format(dakika)}" id="min-input">
        <div class="faded" onclick="dakikaDegistir(1)">${format((dakika + 1) % 60)}</div>
    `;

    document.getElementById("hr-input").onchange = (e) => {
        let val = parseInt(e.target.value);
        saat = isNaN(val) ? 0 : Math.min(Math.max(val, 0), 23);
        saatiGoster();
    };
    document.getElementById("min-input").onchange = (e) => {
        let val = parseInt(e.target.value);
        dakika = isNaN(val) ? 0 : Math.min(Math.max(val, 0), 59);
        saatiGoster();
    };
}

function saatDegistir(fark) {
    saat = (saat + fark + 24) % 24;
    saatiGoster();
}

function dakikaDegistir(fark) {
    dakika = (dakika + fark + 60) % 60;
    saatiGoster();
}

document.querySelectorAll(".day").forEach(day => {
    day.onclick = () => day.classList.toggle("selected");
});

document.querySelector(".save-btn").onclick = () => {
    const hInput = document.getElementById("hr-input");
    const mInput = document.getElementById("min-input");
    
    if (hInput) saat = parseInt(hInput.value);
    if (mInput) dakika = parseInt(mInput.value);

    const isimInput = document.getElementById("label");
    let alarmAdi = "Alarm";
    if (isimInput && isimInput.value.trim() !== "") {
        alarmAdi = isimInput.value.trim();
    }

    const alarm = {
        id: Date.now(),
        saat: `${format(saat)}:${format(dakika)}`,
        not: alarmAdi,
        gunler: Array.from(document.querySelectorAll(".day.selected")).map(d => d.textContent),
        aktif: true
    };

    let alarmlar = JSON.parse(localStorage.getItem("alarmlar") || "[]");
    alarmlar.push(alarm);
    localStorage.setItem("alarmlar", JSON.stringify(alarmlar));
    
    window.location.href = "../Alarm.html";
};

document.querySelector(".cancel-btn").onclick = () => window.location.href = "../Alarm.html";

saatiGoster();

let dakika = 0,
  saniye = 0,
  salise = 0;
let interval = null;
let durum = "baslamadi"; // diğer durumlar: "calisiyor", "durdu"

const sayac = document.getElementById("sayac");
const solBtn = document.getElementById("solBtn");
const sagBtn = document.getElementById("sagBtn");
const turListesi = document.getElementById("turListesi");

function formatla(dk, sn, ss) {
  const d = dk < 10 ? "0" + dk : dk;
  const s = sn < 10 ? "0" + sn : sn;
  const ms = ss < 10 ? "0" + ss : ss;
  return `${d}:${s}.${ms}`;
}

function guncelle() {
  salise++;
  if (salise === 100) {
    salise = 0;
    saniye++;
  }
  if (saniye === 60) {
    saniye = 0;
    dakika++;
  }
  sayac.textContent = formatla(dakika, saniye, salise);
}

function baslatVeyaDurdur() {
  if (durum === "baslamadi" || durum === "durdu") {
    interval = setInterval(guncelle, 10);
    sagBtn.textContent = "Durdur";
    sagBtn.classList.remove("mavi");
    sagBtn.classList.add("kirmizi");
    solBtn.textContent = "Tur";
    solBtn.disabled = false;
    durum = "calisiyor";
  } else {
    clearInterval(interval);
    sagBtn.textContent = "Sürdür";
    sagBtn.classList.remove("kirmizi");
    sagBtn.classList.add("mavi");
    solBtn.textContent = "Sıfırla";
    durum = "durdu";
  }
}

function turVeyaSifirla() {
  if (durum === "calisiyor") {
    const li = document.createElement("li");
    li.textContent = sayac.textContent;
    turListesi.appendChild(li);
  } else if (durum === "durdu") {
    dakika = 0;
    saniye = 0;
    salise = 0;
    sayac.textContent = "00:00.00";
    sagBtn.textContent = "Başlat";
    sagBtn.classList.remove("kirmizi", "mavi");
    sagBtn.classList.add("mavi");
    solBtn.textContent = "Tur";
    turListesi.innerHTML = "";
    durum = "baslamadi";
  }
}

function menüucnokta() {
  alert("Menü açılabilir (simülasyon)");
}

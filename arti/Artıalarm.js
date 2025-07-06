// function alarmEkle() {
//   const bugun = bugunTarih();

//   const alarm = {
//     saat: "07:00",
//     gun: "Pzt",
//     tarih: bugun
//   };

//   let alarmlar = JSON.parse(localStorage.getItem("alarmlar") || "[]");
//   alarmlar.push(alarm);
//   localStorage.setItem("alarmlar", JSON.stringify(alarmlar));

//   // Sayfada da göster (isteğe bağlı)
//   const liste = document.getElementById("alarmListesi");
//   if (liste) {
//     const alarmDiv = document.createElement("div");
//     alarmDiv.className = "alarm-kutu";
//     alarmDiv.textContent = `Saat: ${alarm.saat} | Gün: ${alarm.gun} | Tarih: ${alarm.tarih}`;
//     liste.appendChild(alarmDiv);
//   }
// }

// function bugunTarih() {
//   const d = new Date();
//   const yyyy = d.getFullYear();
//   const mm = String(d.getMonth() + 1).padStart(2, "0");
//   const dd = String(d.getDate()).padStart(2, "0");
//   return `${yyyy}-${mm}-${dd}`;
// }
// document.addEventListener("DOMContentLoaded", function () {
//   // İptal tıklanırsa Alarm.html sayfasına dön
//   document.getElementById("btnIptal").addEventListener("click", function () {
//     window.location.href = "../Alarm.html";
//   });

//   // Kaydet tıklanırsa alarmı kaydet ve sonra Alarm.html'e dön
//   document.getElementById("btnKaydet").addEventListener("click", function () {
//     const saat = document.getElementById("alarmSaat").value || "00:00";
//     const gunler = Array.from(document.querySelectorAll(".gunler input:checked")).map(input => input.value);
//     const ad = document.querySelector('input[type="text"]').value || "Adsız Alarm";
//     const ses = document.querySelectorAll("select")[0].value;
//     const titre = document.querySelectorAll("select")[1].value;
//     const ertele = document.querySelectorAll("select")[2].value;

//     const yeniAlarm = {
//       saat,
//       gunler,
//       ad,
//       ses,
//       titre,
//       ertele
//     };

//     // LocalStorage'a kaydet
//     const alarmlar = JSON.parse(localStorage.getItem("alarmlar") || "[]");
//     alarmlar.push(yeniAlarm);
//     localStorage.setItem("alarmlar", JSON.stringify(alarmlar));

//     // Alarm.html sayfasına yönlendir
//     window.location.href = "../Alarm.html";
//   });
// });
// function alarmlariYukle() {
//   const container = document.getElementById("alarmList");
//   container.innerHTML = "";

//   const alarmlar = JSON.parse(localStorage.getItem("alarmlar") || "[]");

//   if (alarmlar.length === 0) {
//     container.innerHTML = "<p>Kayıtlı alarm yok.</p>";
//     return;
//   }

//   alarmlar.forEach(alarm => {
//     const div = document.createElement("div");
//     div.className = "alarm-kutu";
//     div.innerHTML = `
//       <strong>${alarm.ad}</strong><br>
//       Saat: ${alarm.saat} <br>
//       Günler: ${alarm.gunler.join(", ")}<br>
//       Ses: ${alarm.ses} | Titreşim: ${alarm.titre} | Ertele: ${alarm.ertele}
//     `;
//     container.appendChild(div);
//   });
// }

// window.addEventListener("load", alarmlariYukle);
function increaseHour() {
  let hour = parseInt(document.getElementById("hour").innerText);
  hour = (hour + 1) % 24;
  document.getElementById("hour").innerText = hour.toString().padStart(2, '0');
}

function decreaseHour() {
  let hour = parseInt(document.getElementById("hour").innerText);
  hour = (hour - 1 + 24) % 24;
  document.getElementById("hour").innerText = hour.toString().padStart(2, '0');
}

// Ek olarak dakika ayarlamak istersen benzer fonksiyonları minute için yazabilirsin.
// Kaydet, İptal gibi butonlara özel işlem eklemek için aşağıyı düzenle:

document.querySelector(".save-btn").addEventListener("click", () => {
  alert("Alarm kaydedildi!");
});

document.querySelector(".cancel-btn").addEventListener("click", () => {
  alert("İptal edildi!");
});

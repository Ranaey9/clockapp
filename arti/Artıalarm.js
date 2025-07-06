
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

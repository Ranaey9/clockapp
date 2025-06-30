function alarmEkle() {
  let saat = document.getElementById("saatSec").value;

  if (saat === "") {
    alert("Saat seçmelisin!");
    return;
  }

  let alarmDiv = document.createElement("div");
  alarmDiv.className = "alarm-kutu";

  alarmDiv.innerHTML = `
    <div class="saat">${saat}</div>
    <div class="gun-sec">
      <span>Pzt</span>
      <span>Sal</span>
      <span>Çar</span>
      <span>Per</span>
      <span>Cum</span>
      <span>Cts</span>
      <span>Paz</span>
    </div>
  `;

  document.getElementById("alarmListesi").appendChild(alarmDiv);

  document.getElementById("saatSec").value = "";

  // Günlere tıklama ekle
  let gunler = alarmDiv.querySelectorAll("span");
  gunler.forEach(function(gun) {
    gun.onclick = function() {
      gun.classList.toggle("secili");
    };
  });
}

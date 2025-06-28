function menüucnokta() {
  var menu = document.getElementById("ucnoktaMenu");

  if (menu.style.display == "block") {
    menu.style.display = "none"; // Menü açıkken kapat
  } else {
    menu.style.display = "block"; // Menü kapalıysa aç
  }
}

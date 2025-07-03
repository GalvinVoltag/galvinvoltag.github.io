
function start() {
}
window.onload = start;

function openTab(id) {
  var i, tabcontent, buttons;
  tabcontent = document.getElementsByClassName("tab_container");
  buttons = document.getElementsByClassName("tablink");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].classList.add("hidden")
  }
  for (i = 0; i < buttons.length; i++) {
    buttons[i].classList.remove("tablink_active")
  }
  document.getElementById('btn' + id).classList.add("tablink_active")
  document.getElementById('tab' + id).classList.remove("hidden");
  window.scrollTo(0, 0)
}
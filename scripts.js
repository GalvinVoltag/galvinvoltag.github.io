// function onLoadFunctions() {
//   //some funcitons here...
// }

window.addEventListener('scroll', () => {
  document.body.style.setProperty('--scroll', window.pageYOffset / (document.body.offsetHeight - window.innerHeight));
}, false);


function start() {
  document.getElementById("tab1").style.display = "block";
  document.getElementById("btn1").style.backgroundColor = "#1f1f1f";
  document.getElementById("btn1").style.padding = "7px 10px";
}
window.onload = start;

function openTab(tabName, btnid) {
  // Hide all tab content
  var i, tabcontent, buttons;
  tabcontent = document.getElementsByClassName("tabcontent");
  buttons = document.getElementsByClassName("tablink");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.backgroundColor="transparent";
    tabcontent[i].style.display="none";
  }
  for (i = 0; i < buttons.length; i++) {
    buttons[i].style.backgroundColor = "#444";
    buttons[i].style.padding = "5px 10px";
  }
  document.getElementById(btnid).style.backgroundColor = "#1f1f1f";
  document.getElementById(btnid).style.padding = "7px 10px";
  // this.classList.add("tablink");
  // Show the selected tab content
  document.getElementById(tabName).style.display="block";
  document.getElementById(tabName).scrollIntoView();
}



// // Smooth scrolling for anchor links
// document.querySelectorAll('a[href^="#"]').forEach(anchor => {
//     anchor.addEventListener('click', function (e) {
//       e.preventDefault();
  
//       const targetSection = document.querySelector(this.getAttribute('href'));
//       targetSection.scrollIntoView({
//         behavior: 'smooth'
//       });
//     });
//   });
  
//   // Smooth scrolling on arrow keys for sections
//   const sections = document.querySelectorAll('section');
  
//   window.addEventListener('keydown', function (e) {
//     let currentSectionIndex = Array.from(sections).findIndex(section => {
//       const rect = section.getBoundingClientRect();
//       return rect.top >= 0;
//     });
  
//     if (e.key === 'ArrowUp') {
//       e.preventDefault();
//       currentSectionIndex = Math.max(currentSectionIndex - 1, 0);
//       sections[currentSectionIndex].scrollIntoView({
//         behavior: 'smooth'
//       });
//     } else if (e.key === 'ArrowDown') {
//       e.preventDefault();
//       currentSectionIndex = Math.min(currentSectionIndex + 1, sections.length - 1);
//       sections[currentSectionIndex].scrollIntoView({
//         behavior: 'smooth'
//       });
//     }
//   });
  
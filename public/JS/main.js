$(document).ready(function() {
  $(".menuBar").click(function() {
    $(".menuBar").toggleClass("active")
  })

  $(".menuBar").click(function() {
    $(".menu").toggleClass("active")
  })
})

$(window).scroll(function () {
  if ($(window).scrollTop() >= 100) {
    $('.mainBar').css('background-color','#333333');
  }
  else {
    $('.mainBar').css('background-color','transparent');
  }
});

function openData(pageName, page) {
  var i, tabContent, tablink;
  tabContent = document.getElementsByClassName("tabContent");

  for(i = 0; i < tabContent.length; i++) {
    tabContent[i].style.display = "none";
  }

  tablink = document.getElementsByClassName("tablink");
  for(i = 0; i < tablink.length; i++) {
    tablink[i].style.backgroundColor = "";
  }

  page.style.backgroundColor = "#D64541";

  document.getElementById(pageName).style.display = "block";
}

$(document).ready(function() {
  //slide
  // var swiper = new Swiper('.swiper-container', {
  //   pagination: {
  //     el: '.swiper-pagination',
  //   },
  // });
  //giu thanh menu
  $(window).scroll(function () {
    if ($(this).scrollTop()) {
      $(".header-bot").addClass('menu-fixed animated');
    } else {
      $(".header-bot").removeClass('menu-fixed animated');
    }
  });
 /* menu mobile */

    $("#spinner-form").click(function(){
      $("#menu").toggleClass("active");
    });
  /* menu */
  /* backtotop */

  $(document).ready(function() {

    $(window).scroll(function() {

      if($(window).scrollTop() != 0){

        $('.back-to-top').fadeIn();

      }else {

        $('.back-to-top').fadeOut();

      }

    });



    $('.back-to-top').click(function() {

      $('html, body').animate({scrollTop:0},500);

    });



    smoothScrolling();

    function smoothScrolling() {

      try {$.browserSelector();

        if ($("html").hasClass("chrome")) {

          $.smoothScroll();

        }

      }catch (err) {}

    }



    $(document).on('click','#baophu, .close-popup',function(){

      $('#baophu, .login-popup').fadeOut(300, function(){

        $('#baophu').remove();

        $('.login-popup').remove();

      });

    });

  });
  //==
  function myFunction(x) {
    if (x.matches) { // If media query matches
      $(".footer-locat").removeClass("container");
      $("#menu>ul").removeClass("d-flex justify-content-center");

    } else {
      $(".footer-locat").addClass("container");
      $("#menu>ul").addClass("d-flex justify-content-center");
    }
  }

  var x = window.matchMedia("(max-width: 992px)")
  myFunction(x) // Call listener function at run time
  x.addListener(myFunction) // Attach listener function on state changes

  //button search
  $('.search-button').click(function(){
    $(this).parent().toggleClass('open');
  });
    AOS.init();
});

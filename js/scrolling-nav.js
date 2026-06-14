(function ($) {
  "use strict"; // Start of use strict

  function closeResponsiveMenu(callback) {
    var $menu = $('.navbar-collapse');

    if ($menu.hasClass('show') || $menu.hasClass('collapsing')) {
      $menu.one('hidden.bs.collapse', function () {
        if (callback) callback();
      });
      $menu.collapse('hide');
    } else if (callback) {
      callback();
    }
  }

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function (event) {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        event.preventDefault();
        event.stopImmediatePropagation();

        closeResponsiveMenu(function () {
          $('html, body').stop(true).animate({
            scrollTop: (target.offset().top - 70) // Increased offset to account for nav height/margins
          }, 850, "easeInOutExpo");
        });
      }
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function () {
    closeResponsiveMenu();
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#mainNav',
    offset: 75 // Increased offset so section activates earlier
  });

})(jQuery); // End of use strict



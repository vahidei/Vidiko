    var menuopen = false;
$(document).ready(function() {

    $(document).ready(function(){ $('.toast').toast('show'); });

  $(".menu-toggle").click(function() {

      if(!menuopen){
          $(".menu-toggle svg").hide();
          $(".menu-toggle").append('<i class="fa fa-times fs-lg"></i>');
          $('.applist-container').css({visibility: 'visible', opacity: '1'});
          menuopen = true;
      }else{
          $('.applist-container').css({visibility: 'hidden', opacity: '0'});
          $(".menu-toggle .fa-times").remove();
          $(".menu-toggle svg").show();
          menuopen = false;
      }

  });

    

    

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  $('body').mouseup(function(e) 
    {
        var container = $(".applist-container");
        var container2 = $(".menu-toggle");

        if (!container.is(e.target) && container.has(e.target).length === 0
           && !container2.is(e.target) && container2.has(e.target).length === 0
           ) 
        {
             $('.applist-container').css({visibility: 'hidden', opacity: '0'});
            $(".menu-toggle .fa-times").remove();
          $(".menu-toggle svg").show();
            menuopen = false;
        }

        var container = $("#plyr-subtitle-custom-setting-2114");
        var container2 = $('button[aria-controls="plyr-subtitle-custom-setting-2114"]');

        if (
            !container.is(e.target) && container.has(e.target).length === 0 &&
            !container2.is(e.target) && container2.has(e.target).length === 0
        )
        {
            container.prop('hidden', true);
        }
    });

  // Scroll to top button appear
  $(document).scroll(function() {
    var scrollDistance = $(this).scrollTop();
    if (scrollDistance > 100) {
      $('.scroll-to-top').fadeIn();
    } else {
      $('.scroll-to-top').fadeOut();
    }
  });

}); // End of use strict

// Disable Google Maps scrolling
// See http://stackoverflow.com/a/25904582/1607849
// Disable scroll zooming and bind back the click event
var onMapMouseleaveHandler = function(event) {
  var that = $(this);
  that.on('click', onMapClickHandler);
  that.off('mouseleave', onMapMouseleaveHandler);
  that.find('iframe').css("pointer-events", "none");
}
var onMapClickHandler = function(event) {
  var that = $(this);
  // Disable the click handler until the user leaves the map area
  that.off('click', onMapClickHandler);
  // Enable scrolling zoom
  that.find('iframe').css("pointer-events", "auto");
  // Handle the mouse leave event
  that.on('mouseleave', onMapMouseleaveHandler);
}
// Enable map zooming with mouse scroll when the user clicks the map
$('.map').on('click', onMapClickHandler);

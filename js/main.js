
/*-------------
    JAVASCRIPT
--------------*/

/*-- hide menu on body clicked /*********************************************/
$('#rideau').click(function(e){
  $('body').removeClass('nav-is-toggled');
  $('#rideau').fadeToggle();
});

/*-- logo resize in nav bar /*********************************************/
window.onscroll = function() {
    growShrinkLogo()
};

function growShrinkLogo() {
    var Logo = document.getElementById("Logo");
    if (document.body.scrollTop > 5 || document.documentElement.scrollTop > 5) {
        Logo.style.width = '50px';
    } else {
        Logo.style.width = '150px';
    }
}


 /*-- Main Slider header /*********************************************/

 (function() {
    var $slides = document.querySelectorAll('.slide');
    var $controls = document.querySelectorAll('.slider__control');
    var numOfSlides = $slides.length;
    var slidingAT = 1300; // sync this with scss variable
    var slidingBlocked = false;
    
  
    [].slice.call($slides).forEach(function($el, index) {
      var i = index + 1;
      $el.classList.add('slide-' + i);
      $el.dataset.slide = i;
    });
  
    [].slice.call($controls).forEach(function($el) {
      $el.addEventListener('click', controlClickHandler);
    });
  
    function controlClickHandler() {
      if (slidingBlocked) return;
      slidingBlocked = true;
  
      var $control = this;
      var isRight = $control.classList.contains('m--right');
      var $curActive = document.querySelector('.slide.s--active');
      var index = +$curActive.dataset.slide;
      (isRight) ? index++ : index--;
      if (index < 1) index = numOfSlides;
      if (index > numOfSlides) index = 1;
      var $newActive = document.querySelector('.slide-' + index);
  
      $control.classList.add('a--rotation');
      $curActive.classList.remove('s--active', 's--active-prev');
      document.querySelector('.slide.s--prev').classList.remove('s--prev');
      
      $newActive.classList.add('s--active');
      if (!isRight) $newActive.classList.add('s--active-prev');
      
  
      var prevIndex = index - 1;
      if (prevIndex < 1) prevIndex = numOfSlides;
  
      document.querySelector('.slide-' + prevIndex).classList.add('s--prev');
  
      setTimeout(function() {
        $control.classList.remove('a--rotation');
        slidingBlocked = false;
      }, slidingAT*0.75);
    };
  
  }());

  

/*-------------
    JQUERY
--------------*/
  $(document).ready(function(){

  
    /*-- slide header /*********************************************/
    let mome = setInterval(()=>{
        $(".slider__control.slider__control--right").click();
      }, 7000)


      /*-- counter /*********************************************/
      var counters = $(".count");
      var countersQuantity = counters.length;
      var counter = [];
  
      for (i = 0; i < countersQuantity; i++) {
        counter[i] = parseInt(counters[i].innerHTML);
      }
  
      var count = function(start, value, id) {
        var localStart = start;
        setInterval(function() {
          if (localStart < value) {
            localStart++;
            counters[id].innerHTML = localStart;
          }
        }, 0.1);
      }
  
      for (j = 0; j < countersQuantity; j++) {
        count(0, counter[j], j);
      }

  });



    /*-- tabs /*********************************************/

    var tabs = $('.tabs');
    var selector = $('.tabs').find('a').length;
    //var selector = $(".tabs").find(".selector");
    var activeItem = tabs.find('.active');
    var activeWidth = activeItem.innerWidth();
    $(".selector").css({
        "left": activeItem.position.left + "px", 
        "width": activeWidth + "px"
    });

    $(".tabs").on("click","a",function(e){
        e.preventDefault();
        $('.tabs a').removeClass("active");
        $(this).addClass('active');
        var contain = $(this).attr('id');
        var activeWidth = $(this).innerWidth();
        var itemPos = $(this).position();
        $(".selector").css({
            "left":itemPos.left + "px", 
            "width": activeWidth + "px"
        });
        let ele = "." + contain;
        $(".itent").hide();
        $(ele).fadeIn(1000);
    });
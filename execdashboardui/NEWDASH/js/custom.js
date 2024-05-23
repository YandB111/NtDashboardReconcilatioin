 $(document).ready(function(e) {	

	$('.showOnMob a').on('click', function(e){

		e.preventDefault();

		setTimeout(function(){ 

			$('body').addClass('menuOpen');

			$('.full-content').addClass('contentPush');

		}, 50);



	});

	 $('body').on('click', '.close, .contentPush.full-content', function(e){

		e.preventDefault();

			$('body').removeClass('menuOpen');

			$('.full-content').removeClass('contentPush');

	 });

	 

	 $(".mmenu-bar ul li .toggleItem").click(function(e){

	  e.preventDefault();

	   if ( $(this).closest('li').hasClass('active')){

			$(".mmenu-bar ul li").removeClass("active");

			$(".mmenu-bar ul li .sub-menu-mob").slideUp(300);			

		  } else {

			$(".mmenu-bar ul li").removeClass("active");

			$(this).closest('li').addClass('active'); 

			$(".mmenu-bar ul li .sub-menu-mob").slideUp(300);		

			$(".mmenu-bar ul li.active .sub-menu-mob").slideToggle(300);

		  }

	 });

	//  $('.main-banner-slider').slick({

	// 	dots:false,

	// 	arrows: false,

	// 	infinite:true,

	// 	slidesToShow:1,

	// 	slidesToScroll:1,

	// 	fade: true,

	// 	cssEase: 'linear',

	// 	autoplay:true,

	// 	autoplaySpeed:3000,

	// });	

	// $('.main-core-slider').slick({

	// 	dots:true,

	// 	arrows: true,

	// 	infinite:true,

	// 	slidesToShow:1,

	// 	slidesToScroll:1,

	// 	autoplay:true,

	// 	autoplaySpeed:3000,

	// });

	$(window).scroll(function() {    

		var scroll = $(window).scrollTop();

		if(scroll > 10) {

			$(".main-header").addClass("darkHeader");

		} else {

		    $(".main-header").removeClass("darkHeader");

		}

    });

	
	$('.from-btn button').click(function(){
		var tab_id = $(this).attr('data-tab');

		$('.from-btn button').removeClass('active');
		$('.from-fild').removeClass('active');

		$(this).addClass('active');
		$("#"+tab_id).addClass('active');
	});

	$('ul.mmenulist').find('a').click(function(){
	    var $href = $(this).attr('href');
	    var $anchor = $('#'+$href).offset();
	    window.scrollTo($anchor.left,$anchor.top);
	    return false;
	});

	$('.mmenulist ul li a').click(function(){
		$('.main-footer').click();
	});

});


 $(window).scroll(function(){
    if ($(window).scrollTop() >= 300) {
        $('.main-nav').addClass('fixed-header');
        // $('nav div').addClass('visible-title');
    }
    else {
        $('.main-nav').removeClass('fixed-header');
        // $('nav div').removeClass('visible-title');
    }
});
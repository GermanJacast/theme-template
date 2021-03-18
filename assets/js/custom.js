
$(document).ready(function () {
	if($('#product-details .product-out-of-stock').siblings().length == 0){
		$('.tabs li a[aria-controls="product-details"]').css('display','none');
		$('.tabs li a[aria-controls="product-details"]').parent().siblings().first().children("a").addClass("active");
	}

});

/* search open */
if (!(document.getElementById('search_not_found') || document.getElementById('pagenotfound') || document.getElementById('search_header_3')))

{   

 $(document).ready(function() {
        $("body").on("click", function(h) {
	            var target2 = $(h.target);
	            function close(elem) {
	                if (target2.hasClass('open-icon') || target2.closest(elem).length !== 0 || target2.hasClass('open-icon-path')) {
                        $("#header #search_widget").show();
                        $("#header .search-icon").hide();
					} else {
                        $("#header").find(elem).slideUp(0);
                        $("#header .search-icon").show();
	                }
	            }
	            close("#search_widget");
        });
 });
        
}



/* end search open */

function lazySizes () {
    let $catimg_height;
    let imgScaling = $('.thumbnail-container-image:first img').attr('data-height') / $('.thumbnail-container-image:first img').attr('data-width');
    $('.product-thumbnail').each(function() {
        $(this).css('height',$(this).parents('.thumbnail-container-image').width()*imgScaling);
    });
    $('.product-thumbnail img').each(function() {
        $catimg_height = $(this).parents('.thumbnail-container-image').width()*imgScaling;
        if ($catimg_height) {
            $('.thumbnail-container-image').each(function() {
                $(this).css('min-height',$catimg_height);
            });
        }
        
    });
}
function lazyTabsSizes () {
    let imgScaling = $('.thumbnail-container-image:first img').attr('data-height') / $('.thumbnail-container-image:first img').attr('data-width');
    let $tabimg_height = $('.tab-pane.active').find('.thumbnail-container-image').width()*imgScaling;
    $('.tab-content .thumbnail-container-image').each(function() {
        $(this).css('min-height',$tabimg_height);
    });
    $('.tab-content .product-thumbnail').each(function() {
        $(this).css('height',$tabimg_height);
    });

}
$(document).ready(function () {
    $('a[data-toggle="tab"]').on('shown.bs.tab', function () {
		lazyTabsSizes();
		if ($('.slider_product-wrapper').length) {
			slider_reload($('.tab-content .an_slick-slider.slick-initialized'));
		}
    });
    var openPhotoSwipe = function() {
		var pswpElement = document.querySelectorAll('.pswp')[0];
		let items = [];
		$('.js-thumb').each(function() {
			if ($(this).hasClass('selected')) {
				items.unshift(
					{
						src: $(this).attr('data-image-large-src'),
						w: $(this).attr('data-width'),
						h: $(this).attr('data-height'),
					}
				);
			} else {
				items.push(
					{
						src: $(this).attr('data-image-large-src'),
						w: $(this).attr('data-width'),
						h: $(this).attr('data-height'),
					}
				);
			}
		});
		var options = {
			history: false,
			focus: false,
			showAnimationDuration: 0,
			hideAnimationDuration: 0,
			closeOnScroll: false,
			closeOnVerticalDrag: false,
			
		};
		var gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
		gallery.init();
	};
    if (document.getElementById('zoom-in-slider')) {
		$('.page-content').on('click', '.product-cover', openPhotoSwipe);
	}
    
    if ($.cookie('an_collection_view')) {
        $('.collection-view-btn').removeClass('active');
        $('.collection-view-btn[data-xl = '+$.cookie('an_collection_view')+']').addClass('active');
    }
    $('.product-miniature').addClass('col-lg-'+$('.collection-view-btn.active').attr('data-xl'));

    $('.collection-view-btn').on('click', function() {
        $.cookie('an_collection_view', $(this).attr('data-xl'));
        $('.collection-view-btn').removeClass('active');
        $(this).addClass('active');
        $('.product-miniature').removeClass('col-lg-12 col-lg-6 col-lg-4 col-lg-3');
        $('.product-miniature').addClass('col-lg-'+$('.collection-view-btn.active').attr('data-xl'));
        lazySizes();
        lazyTabsSizes();
        if ($('.slider_product-wrapper').length) {
			slider_reload($('.an_slick-slider'));
		}
		let view_cols = $('.collection-view-btn.active').attr('data-xl');
		switch (view_cols) {
			case '3':
				$('.product-miniature img').each(function(){
					if ($(this).attr('data-lazy-gif')) {
						$(this).attr('src',$(this).attr('data-lazy-gif'));
						$(this).removeClass('b-loaded b-initialized');
						$(this).attr('data-src',$(this).attr('data-catalog-small'));
					} else {
						$(this).attr('src',$(this).attr('data-catalog-small'));
					}
				});
				break;
			case '4':
				$('.product-miniature img').each(function(){
					if ($(this).attr('data-lazy-gif')) {
						$(this).attr('src',$(this).attr('data-lazy-gif'));
						$(this).removeClass('b-loaded b-initialized');
						$(this).attr('data-src',$(this).attr('data-catalog-medium'));
					} else {
						$(this).attr('src',$(this).attr('data-catalog-medium'));
					}
				});
				break;
			case '6':
				$('.product-miniature img').each(function(){
					if ($(this).attr('data-lazy-gif')) {
						$(this).attr('src',$(this).attr('data-lazy-gif'));
						$(this).removeClass('b-loaded b-initialized');
						$(this).attr('data-src',$(this).attr('data-catalog-large'));
					} else {
						$(this).attr('src',$(this).attr('data-catalog-large'));
					}
				});
				break;
			default:
				$('.product-miniature img').each(function(){
					if ($(this).attr('data-lazy-gif')) {
						$(this).attr('src',$(this).attr('data-lazy-gif'));
						$(this).removeClass('b-loaded b-initialized');
						$(this).attr('data-src',$(this).attr('data-catalog-medium'));
					} else {
						$(this).attr('src',$(this).attr('data-catalog-medium'));
					}
				});
		}
    });
    lazySizes();
    lazyTabsSizes();

    $(document).ajaxSuccess(function() {
        if ($.cookie('an_collection_view')) {
            $('.collection-view-btn').removeClass('active');
            $('.collection-view-btn[data-xl = '+$.cookie('an_collection_view')+']').addClass('active');
        }
        $('.product-miniature').addClass('col-lg-'+$('.collection-view-btn.active').attr('data-xl'));

        $('.collection-view-btn').on('click', function() {
            $.cookie('an_collection_view', $(this).attr('data-xl'));
            $('.collection-view-btn').removeClass('active');
            $(this).addClass('active');
            $('.product-miniature').removeClass('col-lg-12 col-lg-6 col-lg-4 col-lg-3');
            $('.product-miniature').addClass('col-lg-'+$('.collection-view-btn.active').attr('data-xl'));
            lazySizes();
            lazyTabsSizes();
            if ($('.slider_product-wrapper').length) {
                slider_reload($('.an_slick-slider'));
            }
            let view_cols = $('.collection-view-btn.active').attr('data-xl');
            switch (view_cols) {
                case '3':
                    $('.product-miniature img').each(function(){
                        if ($(this).attr('data-lazy-gif')) {
                            $(this).attr('src',$(this).attr('data-lazy-gif'));
                            $(this).removeClass('b-loaded b-initialized');
                            $(this).attr('data-src',$(this).attr('data-catalog-small'));
                        } else {
                            $(this).attr('src',$(this).attr('data-catalog-small'));
                        }
                    });
                    break;
                case '4':
                    $('.product-miniature img').each(function(){
                        if ($(this).attr('data-lazy-gif')) {
                            $(this).attr('src',$(this).attr('data-lazy-gif'));
                            $(this).removeClass('b-loaded b-initialized');
                            $(this).attr('data-src',$(this).attr('data-catalog-medium'));
                        } else {
                            $(this).attr('src',$(this).attr('data-catalog-medium'));
                        }
                    });
                    break;
                case '6':
                    $('.product-miniature img').each(function(){
                        if ($(this).attr('data-lazy-gif')) {
                            $(this).attr('src',$(this).attr('data-lazy-gif'));
                            $(this).removeClass('b-loaded b-initialized');
                            $(this).attr('data-src',$(this).attr('data-catalog-large'));
                        } else {
                            $(this).attr('src',$(this).attr('data-catalog-large'));
                        }
                    });
                    break;
                default:
                    $('.product-miniature img').each(function(){
                        if ($(this).attr('data-lazy-gif')) {
                            $(this).attr('src',$(this).attr('data-lazy-gif'));
                            $(this).removeClass('b-loaded b-initialized');
                            $(this).attr('data-src',$(this).attr('data-catalog-medium'));
                        } else {
                            $(this).attr('src',$(this).attr('data-catalog-medium'));
                        }
                    });
            }
        });
        lazySizes();
        lazyTabsSizes();

    });
});
$( document ).ajaxStop(function() {
    if ($.cookie('an_collection_view')) {
        $('.collection-view-btn').removeClass('active');
        $('.collection-view-btn[data-xl = '+$.cookie('an_collection_view')+']').addClass('active');
    }
    $('.product-miniature').addClass('col-lg-'+$('.collection-view-btn.active').attr('data-xl'));

    $('.collection-view-btn').on('click', function() {
        $.cookie('an_collection_view', $(this).attr('data-xl'));
        $('.collection-view-btn').removeClass('active');
        $(this).addClass('active');
        $('.product-miniature').removeClass('col-lg-12 col-lg-6 col-lg-4 col-lg-3');
        $('.product-miniature').addClass('col-lg-'+$('.collection-view-btn.active').attr('data-xl'));
        lazySizes();
        lazyTabsSizes();
        if ($('.slider_product-wrapper').length) {
			slider_reload($('.an_slick-slider'));
		}
		let view_cols = $('.collection-view-btn.active').attr('data-xl');
		switch (view_cols) {
			case '3':
				$('.product-miniature img').each(function(){
					if ($(this).attr('data-lazy-gif')) {
						$(this).attr('src',$(this).attr('data-lazy-gif'));
						$(this).removeClass('b-loaded b-initialized');
						$(this).attr('data-src',$(this).attr('data-catalog-small'));
					} else {
						$(this).attr('src',$(this).attr('data-catalog-small'));
					}
				});
				break;
			case '4':
				$('.product-miniature img').each(function(){
					if ($(this).attr('data-lazy-gif')) {
						$(this).attr('src',$(this).attr('data-lazy-gif'));
						$(this).removeClass('b-loaded b-initialized');
						$(this).attr('data-src',$(this).attr('data-catalog-medium'));
					} else {
						$(this).attr('src',$(this).attr('data-catalog-medium'));
					}
				});
				break;
			case '6':
				$('.product-miniature img').each(function(){
					if ($(this).attr('data-lazy-gif')) {
						$(this).attr('src',$(this).attr('data-lazy-gif'));
						$(this).removeClass('b-loaded b-initialized');
						$(this).attr('data-src',$(this).attr('data-catalog-large'));
					} else {
						$(this).attr('src',$(this).attr('data-catalog-large'));
					}
				});
				break;
			default:
				$('.product-miniature img').each(function(){
					if ($(this).attr('data-lazy-gif')) {
						$(this).attr('src',$(this).attr('data-lazy-gif'));
						$(this).removeClass('b-loaded b-initialized');
						$(this).attr('data-src',$(this).attr('data-catalog-medium'));
					} else {
						$(this).attr('src',$(this).attr('data-catalog-medium'));
					}
				});
		}
    });
    lazySizes();
    lazyTabsSizes();
});

$(window).on('resize', function(){
    $('.collection-view-btn').on('click', function() {
        $.cookie('an_collection_view', $(this).attr('data-xl'));
        $('.collection-view-btn').removeClass('active');
        $(this).addClass('active');
        $('.product-miniature').removeClass('col-lg-12 col-lg-6 col-lg-4 col-lg-3');
        $('.product-miniature').addClass('col-lg-'+$('.collection-view-btn.active').attr('data-xl'));
        lazySizes();
        lazyTabsSizes();

    });
    lazySizes();
    lazyTabsSizes();
});

$(document).on('click', '.js-search-link', function() {
           $(window).scrollTop(0);
       });
       
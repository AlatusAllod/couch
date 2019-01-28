$(document).ready(function () {
	// LinkActivator
	var linkActivator = new LinkActivator({
		scrollContainer: '#scroll-container',
		link: '.link',
		sect: '.sect',
	});
	linkActivator.init();

	//Mobile menu
	$('#mob-mnu').mmenu({
		btn: '#hamburger',
		close_elements: '.blocker',
	});

	// Animator
	var arrDataNum = [],
		bool = false;
	var animator = new Animator({
		scrollContainer: '#scroll-container',
		elems: '.anim-elem',
		animator: 'animator',
		offsetPercent: 80,
		handler: function () {
			if (this.thsElem.hasClass('num') && this.thsElem.hasClass('animator') == false) {
				var el = this.thsElem.find('.number');
				for (var i = 0; i <= el.length; i++) {
					if ($(el[i]).data('num') != undefined) {
						arrDataNum.push($(el[i]).data('num'));
					}
				}
				if (el.length == arrDataNum.length) {
					el.each(function (i) {
						var ths = $(this),
							j = 0;
						function come(elem) {
							var docViewTop = $(window).scrollTop(),
								docViewBottom = docViewTop + $(window).height(),
								elemTop = elem.offset().top,
								elemBottom = elemTop + elem.height();
							if (elemBottom <= docViewBottom && elemTop >= docViewTop) {
								var interval = setInterval(function () {
									j++;
									if (j == arrDataNum[i]) {
										clearInterval(interval);
									}
									ths.text(j);
								}, 5000 / ths.data('num') - j);
								return true;
							} else {
								return false;
							}
						}
						come(ths);
					});
				}
			}
		},
	});
	animator.init();

	// Progress
	var toolbar = $('.toolbar');
	$('.screen-scroll').scroll(function () {
		var scrollTop = $(this)[0].scrollTop,
			scrollHeight = $(this)[0].scrollHeight,
			height = $(window).height(),
			progress = (100 * scrollTop) / (scrollHeight - height);
		$('.progress').css('width', progress + '%');
		if (scrollTop > 100) {
			toolbar.addClass('active-toolbar');
		} else {
			toolbar.removeClass('active-toolbar');
		}
	});

	//Popup
	$('.open-modal').modal({
		btn_close: '.close-modal',
		from: '#Hidden__Container',
		to: 'body',
		after_open: function () {
			console.log('hi');
		},
		after_close: function () {
			console.log('hui');
		},
	});

	// var successMsg = $('.message-success'),
	// 	errorMsg = $('.message-error');
	// $('form').submit(function () {
	// 	var th = $(this);
	// 	$.ajax({
	// 		url: 'mail',
	// 		type: 'GET',
	// 		data: th.serialize(),
	// 	})
	// 		.done(function (data) {
	// 			setTimeout(function () {
	// 				successMsg.addClass('notification-visible');
	// 				th.trigger('reset');
	// 			}, 1000);
	// 			setTimeout(function () {
	// 				successMsg.removeClass('notification-visible');
	// 			}, 5000);
	// 		})
	// 		.fail(function () {
	// 			setTimeout(function () {
	// 				errorMsg.addClass('notification-visible');
	// 				th.trigger('reset');
	// 			}, 1000);
	// 			setTimeout(function () {
	// 				errorMsg.removeClass('notification-visible');
	// 			}, 5000);
	// 		});
	// 	return false;
	// });

	var offline = $('.offline'),
		online = $('.online'),
		notification = $('.notification');
	window.addEventListener(
		'online',
		function (e) {
			$('.notification').removeClass('notification-visible');
			online.addClass('notification-visible');
			setTimeout(function () {
				online.removeClass('notification-visible');
			}, 5000);
		},
		false
	);
	window.addEventListener(
		'offline',
		function (e) {
			$('.notification').removeClass('notification-visible');
			offline.addClass('notification-visible');
			setTimeout(function () {
				offline.removeClass('notification-visible');
			}, 5000);
		},
		false
	);

	$('.mask-phone').mask('+7 (999) 999-99-99');

	$('.sect').mousemove(function (e) {
		var x = e.screenX / 40 + 50 + '%';
		var y = e.screenY / 40 + '%';
		$('.bg-overlay-d').css('background-position', x + ' ' + y);
	});

	var preload = $('.inner-preload'),
		width = 0,
		timeout = 2000,
		inter = 50,
		interval = setInterval(function () {
			width += (inter / timeout) * 100;
			preload.css('width', width + '%');
		}, inter);

	setTimeout(function () {
		var preloader = $('.preloader');
		preloader.fadeOut();
		clearInterval(interval);
		preload.css('width', '100%');
	}, timeout);

	$('.mobile-filter .acc-head').click(function () {
		$(this).next().slideToggle(200);
		$(this).toggleClass('acc-active');
	});

	$('.mobile-filter .acc-body input').click(function () {
		$(this).parent().toggleClass('checkbox-active');
	});

	$(".cost-slider").sliderui({
		range: true,
		min: 7599,
		max: 182000,
		values: [7599, 182000],
		slide: function (event, ui) {
			$(".cost-min").val(ui.values[0]);
			$(".cost-max").val(ui.values[1]);
		}
	});

	$(".cost-min").focusout(function () {
		if (+$(this).val() < +$(this).attr('min')) {
			$(this).val($(this).attr('min'));
		};
		if (+$(this).val() > +$(".cost-max").val()) {
			$(this).val($(".cost-max").val());
		};
		$(".cost-slider").sliderui("values", 0, $(this).val());
	});

	$(".cost-max").focusout(function () {
		if (+$(this).val() > +$(this).attr('max')) {
			$(this).val($(this).attr('max'));
		};
		if (+$(this).val() < +$(".cost-min").val()) {
			$(this).val($(".cost-min").val());
		};
		$(".cost-slider").sliderui("values", 1, $(this).val());
	});

	$(".cost-min").val($(".cost-slider").sliderui("values", 0));
	$(".cost-max").val($(".cost-slider").sliderui("values", 1));

	$("#services menu .active").click(function (e) {
		if ($(window).width() <= '560') {
			if ($(this).siblings().css('display') == 'block') {
				$("#services menu a").not(this).hide();
			} else {
				$("#services menu a").show();
			}
		}
		e.preventDefault();
	});
});

$(window).on('resize', function () {
	if ($(window).width() <= '560') {
		$('#work .tab').css('display', 'none');
		$('#work .tab-active').css('display', 'block');
	} else {
		$('#work .tab').css('display', 'block');
	};
	if ($(window).width() > '560') {
		$("#services menu a").show();
	} else {
		$("#services menu a").not(".active").hide();
	}
});

$(window).on('load', function () {
	$('.slider-sect').slider({
		slider: '.slider',
		slide_class: '.slide-item',
		nav: '.nav',
		item: 1,
		item_sliding: 1,
		loop: true,
		dots: false,
		automove: false,
		interval: 2000,
		transition: '0.5s',
		tabs: false,
		tab_container: '.tab_container',
		tab_class: '.tab',
		response: true
	});

	// Slider with tabs
	$('.slider-tab-sect').slider({
		slider: '.slider',
		slide_class: '.slide-item',
		nav: '.nav',
		item: 1,
		item_sliding: 1,
		loop: true,
		dots: false,
		automove: false,
		interval: 2000,
		transition: '0.5s',
		tabs: true,
		tab_container: '.tab-container',
		tab_class: '.tab',
		response: true
	});

	// Slider fotorama
	$('#main').slider({
		slider: '.slider',
		slide_class: '.slide-item',
		nav: '.nav',
		item: 1,
		item_sliding: 1,
		loop: true,
		dots: true,
		automove: false,
		interval: 2000,
		transition: '0.5s',
		tabs: true,
		tab_container: '.thumb-container',
		tab_class: '.thumb',
		futurama: true,
		response: true,
	});

	$('#main2').slider({
		slider: '.slider',
		slide_class: '.slide-item',
		nav: '.nav',
		item: 1,
		item_sliding: 1,
		loop: true,
		dots: true,
		automove: false,
		interval: 2000,
		transition: '0.5s',
		tabs: true,
		tab_container: '.thumb-container',
		tab_class: '.thumb',
		futurama: true,
		response: true,
	});
	initWorkSliderTabs();

	var body = $('body');
	body.addClass('ready');
});

function initWorkSliderTabs() {
	if ($(window).width() <= '560') {
		$('#work .tab').css('display', 'none');
		$('#work .tab-active').css('display', 'block');
	} else {
		$('#work .tab').css('display', 'block');
	};

	$('#work .tab').click(function () {
		if ($(window).width() <= '560') {
			if ($(this).hasClass('tab-active')) {
				if ($(this).siblings().css('display') == 'block') {
					$('#work .tab').css('display', 'none');
					$(this).css('display', 'block');
				} else {
					$('#work .tab').css('display', 'block');
				}
			} else {
				$('#work .tab').css('display', 'none');
				$(this).css('display', 'block');
			}
		}
	});

	$('#work .nav').click(function () {
		switchActiveTab();
	});

	$('#work .viewport').on('touchend', function () {
		switchActiveTab();
	});
};

function switchActiveTab() {
	if ($(window).width() <= '560') {
		setTimeout(() => {
			$('#work .tab').css('display', 'none');
			$('#work .tab-active').css('display', 'block');
		}, 200);
	}
};

window.onload = function(){
	var sl = new bottle_slider($('.slider'), 1000, 10000, true, 1);
	sl.init();
	$('.search_tab input[type=text]').on('focus', search_show);
	$('.search_tab input[type=text]').on('blur', search_hide);
}

function bottle_slider(el, duration, freak, is_on, amount_on_page){
	this.el = el;
	this.duration = duration;
	this.freak = duration + freak;
	this.is_on = is_on;
	this.amount_on_page = amount_on_page;
	this.slide_width = 0;
	this.slide_height = 0;
	this.slide_left = 0;
	this.position = 0;
	this.amount_slides = 0;
	this.timer = null;
	this.is_paused = 1;
	this.signature_width = 720;
	this.init = function(){
		var context = this;
		this.amount_slides = $(this.el).find('.img_wrap img').size();
		
		$(context.el).find('.arrows').show();
		$(this.el).find('.img_wrap a').css({position: 'absolute', display:'block', height: '100%'});

		this.sliderResize(context);
		/*add events*/
		this.bindMove();
		/*start anim*/
		this.startAnim(context);
		/*pause*/
		$(this.el).on('mouseenter', function(event){
			context.stopAnim(context);
			context.showArrows(context);
		});
		$(this.el).on('mouseleave', function(event){
			context.startAnim(context);
			context.hideArrows(context);
		});

		$( window ).resize(function(){
			context.sliderResize(context);
		});
		$(context.el).find('.arrows a').on('mouseenter', function(event){
			$(this).css({opacity: 1})
		})
		$(context.el).find('.arrows a').on('mouseleave', function(event){
			$(this).css({opacity: 0.5})
		})

	};
	this.sliderResize = function(context){
		context.position = 0;
		context.slide_width = $('#mainbar').width();
		var sig_heights = [];
		var img_heights = [];
		/*самая высокая надпись*/
		$(context.el).find('.signature div').each(function(){
			sig_heights.push($(this).outerHeight());
		})
		var highest_sign = Math.max.apply(0, sig_heights);

		/*самая низкая картинка*/
		$(context.el).find('.img_wrap img').each(function(){
			var h_val = $(this).css('height');
			var w_val = $(this).css('width');
			$(this).css({'height':'auto', 'width': 'auto'});
			var current_width = $(this).width();
			var current_height = $(this).height();
		
			var dimention = context.slide_width*2/3 / current_width;
	
			var dim_height = dimention * parseFloat(current_height);

			img_heights.push(dim_height);

			$(this).css({'height': h_val, 'width': w_val});
		})

		var smaller_img = Math.min.apply(0, img_heights);


		if(smaller_img > highest_sign){
			$(context.el).find('.img_wrap img').css({'height': '100%', 'width': '100%'});
			context.slide_height = smaller_img;
		}else{ 
			$(context.el).find('.img_wrap img').css({'height': '100%', 'width': 'auto' });
			context.slide_height = highest_sign;
		}

		
		var wrap_width = $('.wrapper').width();
		$(context.el).css({position: 'relative', height: context.slide_height});
		$(context.el).find('.img_wrap').css({position: 'absolute', height: context.slide_height, width: context.slide_width*context.amount_on_page, overflow: 'hidden'});
		$(context.el).find('.im_wr').css({height: context.slide_height});

		$(context.el).find('.arrows .left').css({position: 'absolute', left: '0', top: (context.slide_height-58)/2});
		$(context.el).find('.arrows .right').css({position: 'absolute', right: '0', top: (context.slide_height-58)/2});

		var start = -context.slide_width;
		$(context.el).find('.img_wrap a').each(function(){
			$(this).css({'left': start});
			start += context.slide_width;
		});
	};
	this.startAnim = function(context){
		if(context.is_paused == 1){
			context.is_paused = 0;
			context.timer = setInterval(function(){
				context.move(context);

			}, context.freak);
		}
	};
	this.move = function(context){
		context.unbindMove();
		if(context.position == 0){
			context.position = context.amount_slides - 1; 
		} else {
			context.position--;
		}

		$(context.el).find('.img_wrap a').each(function(){
			var new_left = parseInt($(this).css('left')) + context.slide_width;
			$(this).animate(
				{
					left: new_left
				},
				{
					duration: context.duration,
					complete: function(){
						if(this == $(context.el).find('.img_wrap a:last')[0]){
							$(context.el).find('.img_wrap a').eq(context.position).css('left', -context.slide_width);
							context.bindMove();
						}
					}
				}
			);
		});

		return false;
	};
	this.stopAnim = function(context){
		if(context.is_paused == 0){
			context.is_paused = 1;
			clearInterval(context.timer);
		}
		
	};
	this.moveRight = function(event){
		var context = event.data.context;
		context.stopAnim(context);

		context.unbindMove();
		if(context.position == 0){
			context.position = context.amount_slides - 1; 
		} else {
			context.position--;
		}

		$(context.el).find('.img_wrap a').each(function(){
			var new_left = parseInt($(this).css('left')) + context.slide_width;
			$(this).animate(
				{
					left: new_left
				},
				{
					duration: context.duration,
					complete: function(){
						if(this == $(context.el).find('.img_wrap a:last')[0]){
							$(context.el).find('.img_wrap a').eq(context.position).css('left', -context.slide_width);
							context.bindMove();
							context.startAnim(context);
						}
					}
				}
			);
		});

		return false;
	};
	this.moveLeft = function(event){
		var context = event.data.context;
		context.stopAnim(context);
		
		context.unbindMove();
		var cur_bottle = context.position;
		if(context.position == context.amount_slides - 1){
			context.position = 0; 
		} else {
			context.position++;
		}

		$(context.el).find('.img_wrap a').each(function(){
			var new_left = parseInt($(this).css('left')) - context.slide_width;
			$(this).animate(
				{
					left: new_left
				},
				{
					duration: context.duration,
					complete: function(){
						if(this == $(context.el).find('.img_wrap a:last')[0]){
							$(context.el).find('.img_wrap a').eq(cur_bottle).css('left', context.slide_width*(context.amount_slides-2));
							context.bindMove();
							context.startAnim(context);
						}
					}
				}
			);
		});

		return false;
	};
	this.bindMove = function(){
		var context = this;
		$(this.el).find('.arrows .left').off('click');
		$(this.el).find('.arrows .right').off('click');
		$(this.el).find('.arrows .left').on('click', {context: context}, context.moveLeft);
		$(this.el).find('.arrows .right').on('click', {context: context}, context.moveRight);
	};
	this.unbindMove = function(){
		$(this.el).find('.arrows .left').off('click');
		$(this.el).find('.arrows .right').off('click');

		$(this.el).find('.arrows .left').on('click', function(){
			return false;
		});
		$(this.el).find('.arrows .right').on('click', function(){
			return false;
		});
	};
	this.showArrows = function(context){
		$(this.el).find('.arrows a').css({opacity: 0.5})
	}
	this.hideArrows = function(context){
		$(this.el).find('.arrows a').css({opacity: 0})
	}
}

function search_show(){
	if($(window).width()> 400 ){

		if (!(document.all && document.querySelector && !document.addEventListener)) {
			$('.search_tab').css({right: 3});
			$('.search_tab input[type=text]').animate(
				{
					width: 330
				}, 
			200);
		}
	}
}

function search_hide(){
	$('.search_tab input[type=text]').animate({width: 137}, 200);
	$('.search_tab').css({right: -5});
}

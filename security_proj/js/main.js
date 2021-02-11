window.onload = function(){
	var el = $('#slider');
	var sl = new DA_slider(el, 2000, 5000);
	sl.init();

	var sl1 = new bottle_slider($('.bottle_slider'), 2000, 5000, true, 4);
	sl1.init();
}

$(function(){
	$('#current_lang').on('mouseenter', function(event){
		showLanguageMenu(event);
	});

	$('#languages').on('mouseleave', function(event){
		hideLanguageMenu(event);
	});

	$('.content_nav ul li').on('click', function(event){
		$('.content_nav ul li').removeClass('active');
		$(this).addClass('active');
		return false;
	});

	$('input[name="plan"]').on('change', change_plan);

	$('select.styled').each(function() {
        // Cache the number of options
        var $this = $(this),
            numberOfOptions = $(this).children('option').length;

        // Hides the select element
        $this.addClass('s-hidden');

        // Wrap the select element in a div
        $this.wrap('<div class="select"></div>');

        // Insert a styled div to sit over the top of the hidden select element
        $this.after('<div class="styledSelect"></div>');

        // Cache the styled div
        var $styledSelect = $this.next('div.styledSelect');

        // Show the first select option in the styled div
        $styledSelect.text($this.children('option').eq(0).text());

        // Insert an unordered list after the styled div and also cache the list
        var $list = $('<ul />', {
            'class': 'options'
        }).insertAfter($styledSelect);

        // Insert a list item into the unordered list for each select option
        for (var i = 0; i < numberOfOptions; i++) {
            $('<li />', {
                text: $this.children('option').eq(i).text(),
                rel: $this.children('option').eq(i).val()
            }).appendTo($list);
        }
        $styledSelect.text($this.find('option:selected').first().text() );
        // Cache the list items
        var $listItems = $list.children('li');

        // Show the unordered list when the styled div is clicked (also hides it if the div is clicked again)
        $styledSelect.click(function(e) {
            e.stopPropagation();
            $('div.styledSelect.active').each(function() {
                $(this).removeClass('active').next('ul.options').hide();
            });
            $(this).toggleClass('active').next('ul.options').toggle();
        });

        // Hides the unordered list when a list item is clicked and updates the styled div to show the selected list item
        // Updates the select element to have the value of the equivalent option
        $listItems.click(function(e) {
            e.stopPropagation();
            $styledSelect.text($(this).text()).removeClass('active');
            $this.val($(this).attr('rel'));
            $list.hide();
            /* alert($this.val()); Uncomment this for demonstration! */
        });

        // Hides the unordered list when clicking outside of it
        $(document).click(function() {
            $styledSelect.removeClass('active');
            $list.hide();
        });
    });

	// $("#scroll_content").onepage_scroll({
	// 	sectionContainer: ".scroll_section", 
	// 	easing: "ease", 
	// 	animationTime: 1000, 
	// 	pagination: true, 
	// 	updateURL: false, 
	// 	beforeMove: function(index) {}, 
	// 	afterMove: function(index) {}, 
	// 	loop: false, 
	// 	responsiveFallback: false // You can fallback to normal page scroll by defining the width of the browser in which you want the responsive fallback to be triggered. For example, set this to 600 and whenever the browser's width is less than 600, the fallback will kick in.s
	// });
});


function change_plan(event){
	$('.one_plan').removeClass('active');
	$('input[name="plan"]:checked').closest('.one_plan').addClass('active');
}

function showLanguageMenu(event){
	$('#current_lang').css({display: 'none'});
	$('#languages').css({display: 'inline-block'});
}

function hideLanguageMenu(event){
	$('#current_lang').css({display: 'inline-block'});
	$('#languages').css({display: 'none'});
}

function bottle_slider(el, duration, freak, is_on, amount_on_page){
	this.el = el;
	this.duration = duration;
	this.freak = duration + freak;
	this.is_on = is_on;
	this.amount_on_page = amount_on_page;
	this.slide_width = 0;
	this.position = 0;
	this.amount_slides = 0;
	this.timer = null;
	this.is_paused = 1;
	this.margin = 0;
	this.slide_height = 0;
	this.init = function(){

		/*location*/
		var context = this;

		this.amount_slides = $(this.el).find('.img_wrap .bot_slide').size();
		
		this.resize(this);
		var context = this;
		window.onresize = function(){
			context.resize(context);
		}
		/*add events*/
		this.bindMove();

		/*start anim*/
		this.startAnim(context);

		/*pause*/
		$(this.el).on('mouseenter', function(event){
			context.stopAnim(context);
		});
		$(this.el).on('mouseleave', function(event){
			context.startAnim(context);
		});
	};
	this.resize = function(context){
		var d_w = $('body').innerWidth();
		var screen_w = d_w;

		var width_limit = 1280;
		if(d_w > width_limit){
			screen_w = screen_w * 80 /100 - 75;
		} else {
			screen_w = screen_w * 98 / 100 - 75;
		}

		if(d_w > 1000){
			context.slide_width = screen_w /4;
			context.amount_on_page = 4;
		} else if(d_w > 800) {
			context.slide_width = screen_w /3;
			context.amount_on_page = 3;
		} else if((d_w > 600)){
			context.slide_width = screen_w /2;
			context.amount_on_page = 2;
		} else {
			context.slide_width = screen_w;
			context.amount_on_page = 1;
		}

		context.slide_height = $(context.el).find('.img_wrap .bot_slide').outerHeight();

		$(context.el).css({position: 'relative'});
		$(context.el).find('.img_wrap').css({position: 'relative', height: context.slide_height, width: '100%', overflow: 'hidden'});
		$(context.el).find('.img_wrap .bot_slide').css({position: 'absolute'});

		var start = -context.slide_width;
		$(context.el).find('.img_wrap .bot_slide').each(function(){
			$(this).css({'left': start});
			start += context.slide_width;
		});

		$(this.el).find('.arrows .left').css({display: 'block', position: 'absolute', left: '0', top: (this.slide_height-70)/2});
		$(this.el).find('.arrows .right').css({display: 'block', position: 'absolute', right: '0', top: (this.slide_height-70)/2});
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

		$(context.el).find('.img_wrap .bot_slide').each(function(){
			var new_left = parseInt($(this).css('left')) + context.slide_width;
			$(this).animate(
				{
					left: new_left
				},
				{
					duration: context.duration,
					complete: function(){
						if(this == $(context.el).find('.img_wrap .bot_slide:last')[0]){
							$(context.el).find('.img_wrap .bot_slide').eq(context.position).css('left', -context.slide_width);
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

		$(context.el).find('.img_wrap .bot_slide').each(function(){
			var new_left = parseInt($(this).css('left')) + context.slide_width;
			$(this).animate(
				{
					left: new_left
				},
				{
					duration: context.duration,
					complete: function(){
						if(this == $(context.el).find('.img_wrap .bot_slide:last')[0]){
							$(context.el).find('.img_wrap .bot_slide').eq(context.position).css('left', -context.slide_width);
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

		$(context.el).find('.img_wrap .bot_slide').each(function(){
			var new_left = parseInt($(this).css('left')) - context.slide_width;
			$(this).animate(
				{
					left: new_left
				},
				{
					duration: context.duration,
					complete: function(){
						if(this == $(context.el).find('.img_wrap .bot_slide:last')[0]){
							$(context.el).find('.img_wrap .bot_slide').eq(cur_bottle).css('left', context.slide_width*(context.amount_slides-2));
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
		$(this.el).find('.arrows .left').on('click', {context: context}, context.moveLeft);
		$(this.el).find('.arrows .right').on('click', {context: context}, context.moveRight);
	};
	this.unbindMove = function(){
		$(this.el).find('.arrows .left').off('click');
		$(this.el).find('.arrows .right').off('click');
	};
}

function DA_slider(el, duration, freak){
	this.el = el;
	this.duration = duration;
	this.freak = duration + freak;
	this.amount;
	this.timer;
	this.pointer = 0;
	this.init = function(){
		this.amount = $(this.el).find('.img_wrap .slide').size();
		if(this.amount < 1){
			return false;
		}

		var context = this;
		$(context.el).find('.img_wrap .slide').not(':first').css({opacity: 0});
		$(context.el).find('.img_wrap .slide').css({'position': 'absolute', 'display': 'block'});

		this.reSize(this);
		

		$(window).resize(function(){
			context.reSize(context);
		});

		/*--------------------------------------------*/
		$(context.el).find('.img_wrap .slide:first').addClass('active');
		$(context.el).find('.img_wrap .slide').eq(1).addClass('next');


		$(this.el).on('click', '.but_wrap div', function(event){
			var elem = this;
			context.switchBut(event, context, elem);
		});
		this.startAnim(this);
		
	};
	this.reSize = function(context){
		console.log(1);
		var screen_w = $(window).width();
		var width_limit = 1255;
		if(screen_w > width_limit){
			screen_w = screen_w * 78.43 / 100;
		} else {
			screen_w = screen_w * 98 / 100;
		}

		var first_block_width_percent = 65.66/100;
		var second_block_width_percent = 34.34/100;

		/*first block*/
		var img_height = $(context.el).find('.img_wrap .slide img:first').height();
		var img_width = $(context.el).find('.img_wrap .slide img:first').width();

		if(screen_w > 967){
			var img_dimension = screen_w * first_block_width_percent/img_width;

			img_width = screen_w * first_block_width_percent;
			img_height = img_dimension * img_height;

			var first_block_height = img_height + 30;

			/*second block*/
			var second_block_height = $(context.el).find('.img_wrap .slider_sign:first').outerHeight();

			if(first_block_height > second_block_height){
				var max_height = first_block_height;
			} else {
				var max_height = second_block_height;
			}
		} else {
			var img_dimension = screen_w / img_width;
			img_width = screen_w;
			img_height = img_dimension * img_height;

			var max_height = img_height + $(context.el).find('.img_wrap .slider_sign:first').outerHeight();
		}
		

		$(context.el).css({'position': 'relative', 'width': screen_w, 'height': max_height});
		$(context.el).find('.img_wrap').css({'position':'relative', 'height': max_height, 'width': screen_w, 'overflow': 'hidden'});
		
		$(context.el).find('.switch_but').remove();
		var begin = (screen_w - context.amount*18)/2;


		$(context.el).find('.img_wrap .slide').each(function(){
			var el= document.createElement('div');
			el.className = 'switch_but';
			$(context.el).find('.but_wrap').append(el);
			$(el).css({left: begin, bottom: -15, zIndex: 1002});
			begin+= 15;
		});
		/*----------------------------*/
		$(context.el).find('.switch_but:first').addClass('active');
	};
	this.switchBut = function(event, context, elem){
		//debugger;
		context.stopAnim(context);
		context.pointer = $(context.el).find('.but_wrap div').index(elem);
		var future_next;
		if(context.pointer == context.amount - 1){
			future_next = 0;
		} else {
			future_next = context.pointer + 1
		}


		$(context.el).find('.img_wrap .slide').eq(context.pointer).addClass('active').css({opacity: 1});
		$(context.el).find('.img_wrap .slide').not($(context.el).find('.img_wrap .slide').eq(context.pointer)).removeClass('active').css({opacity: 0});
		$(context.el).find('.img_wrap .slide').removeClass('next');
		$(context.el).find('.img_wrap .slide').eq(future_next).addClass('next');
		/*------------------------------------*/
		$(this.el).find('.switch_but').removeClass('active');
		$(this.el).find('.switch_but').eq(context.pointer).addClass('active');

		context.startAnim(context);
	};
	this.startAnim = function(context){
		context.timer = setInterval(function(){
			context.move(context);
		}, context.freak);
	};
	this.stopAnim = function(context){
		$(context.el).find('.img_wrap .slide.active').stop();
		clearInterval(context.timer);
	};
	this.move = function(context){
		
		if(context.pointer == context.amount - 1){
			context.pointer = 0;
		} else {
			context.pointer++;
		}

		var future_next;
		if(context.pointer == context.amount - 1){
			future_next = 0;
		} else {
			future_next = context.pointer + 1
		}

		$(context.el).find('.switch_but').removeClass('active');
		$(context.el).find('.switch_but').eq(context.pointer).addClass('active');

		$(context.el).find('.img_wrap .slide.active').animate(
			{
				opacity: 0
			},
			{
				duration: context.duration,
				complete: function(){
					$(context.el).find('.img_wrap .slide.next').removeClass('next').addClass('active');
					$(context.el).find('.img_wrap .slide').eq(future_next).addClass('next');
					
				}
			}
		);

		$(context.el).find('.img_wrap .slide.next').animate(
			{
				opacity: 1
			},
			{
				duration: context.duration
			}
		);
	};
}
		var elem = $('#promo');
		var duration = 1000;
		var full_dur = 5000;
		var cur_elem = 0;
		var qq_w = $('html').width();
		var qq_h = $('html').height();
		function slider(elem, duration, full_dur, inter){
			$(elem).find('.image_wrap .slide-block').eq(0).addClass('active');
			if($(elem).find('.image_wrap img').length <= 1){
				return false;
			}

			var begin = 9;
			$(elem).find('.image_wrap img').each(function(){
				$(elem).find('.switch_wrap a').eq(0).addClass('active');
				$(this).css({'width': qq_w, 'height': 100 + '%'});
				var pointer = document.createElement('a');
				pointer.href = '#';
				pointer.style.right = begin +'px';
				$(elem).find('.switch_wrap').append(pointer);
				begin += 20;
			});

			var sl_length = $(elem).find('.image_wrap img').length;
			var inter = setInterval(function(){
				move(duration, sl_length)}, full_dur);

			$(elem).find('.switch_wrap a').each( function(i, a){
				$(this).on('click', function(){
   			 		cur_elem = i;
   			 		event.preventDefault();
		   			$(elem).find('.slide-block.active').removeClass('active');
		   			$(elem).find('.slide-block.next').removeClass('next');
		   			$(elem).find('.image_wrap .slide-block').eq(i).addClass('active');
		   			$(elem).find('.switch_wrap a').removeClass();
		   			$(elem).find('.switch_wrap a').eq(i).addClass('active');
		   			var sw_length = $(elem).find('.switch_wrap a').length;
		   			if(i == $(elem).find('.switch_wrap a').length -1){
		   				$(elem).find('.image_wrap .slide-block').first().addClass('next');
		   			} else {
		   				$(elem).find('.image_wrap .slide-block').eq(i+1).addClass('next');
		   			}
				});
			});
				
		}


		function move(duration, sl_length){
			var obj = $(elem).find('.image_wrap .slide-block.active');
			$(elem).find('.image_wrap .slide-block.active').animate({
				opacity: 0
			},
			{
				duration: duration,
				complete:function(){
					var next_elem;
					// console.log(sl_length);
					if(cur_elem == sl_length -1){
						cur_elem = 0;
						next_elem = $(elem).find('.image_wrap .slide-block').first();
					} else{
						next_elem = obj.next();
						cur_elem++;
					}
					if(cur_elem == sl_length -1){
						$(elem).find('.image_wrap .slide-block').first().addClass('next');
					}
					$
					// $(elem).find('.active').removeClass('active');
		   // 			$(elem).find('.next').removeClass('next');
					next_elem.addClass('active');
					next_elem.removeClass('next');
					next_elem.next().addClass('next');



					obj.removeClass('active');
					obj.css({'opacity': 1});
					$(elem).find('.image_wrap .slide-block').each(function(){
					if($(this).hasClass('active')){
						$('.switch_wrap a').removeClass();
						$('.switch_wrap a').eq($(this).index()).addClass('active');
					}
				})
				}
			});
		}
		// var q = $('.image_wrap img');



		function form_login(){
			$('#dialog li').removeClass('bg_color');
			$('.login_but').addClass('bg_color');
			$('.register_but').addClass('active_right').removeClass('active_left');
			$('body').find('.bg').show();	
			$('body').find('#register').css({'display': 'none'});
			$('body').find('#login').css({'display': 'block'});
			$('body').find('#reset_pass').css({'display': 'none'});
		}
		function form_reg(){
			$('#dialog li').removeClass('bg_color');
			$('.register_but').addClass('bg_color');
			$('.register_but').removeClass('active_right').removeClass('active_left');
			$('body').find('.bg').show();
			$('body').find('#login').css({'display': 'none'});
			$('body').find('#register').css({'display': 'block'});
			$('body').find('#reset_pass').css({'display': 'none'});
		}
		function form_pass(){
			$('#dialog li').removeClass('bg_color');
			$('.reset_but').addClass('bg_color');
			$('.register_but').removeClass('active_right').addClass('active_left');
			$('body').find('.bg').show();
			$('body').find('#login').css({'display': 'none'});
			$('body').find('#register').css({'display': 'none'});
			$('body').find('#reset_pass').css({'display': 'block'});
		}
		

		$(window).resize(function(){
			var q_w = $('html').width();
			var img_h = $(".image_wrap .slide-block").height();
			$(elem).find('.image_wrap img').each(function(){
				$(this).css({'width': q_w});
			})
			$(elem).find('.image_wrap').css({'height': img_h});
			if($('html').width() <= 630){
				$(elem).find('.image_wrap img').each(function(){
					$(this).css({'width': 630});
				})
			}
			// if($('html').width() <= 800){
			// 	$(elem).find('.promo-title').css({'left': q_w - $(elem).find('.promo-title').width()-18});
			// }else{
			// 	$(elem).find('.promo-title').css({'left':51 +'%'})
			// }
			$('body').find('#dialog').css({'left': q_w / 2 - 195});
			if(q_w >=660){
				$('body').find('.about_us_full').css({'left': q_w / 2 - 330});
			} else {
				$('body').find('.about_us_full').css({'left': 0});
			}
		})

	$('select.hidden').each(custumSelect);
	function custumSelect(){
		$(this).css({'display': 'none'});
		var el = document.createElement('div');
		var ul = document.createElement('ul');
		$(ul).addClass('select_ul');
		$(ul).addClass('country_menu');
		$(el).addClass('country_head');
		$(el).html($('option:selected:disabled').val());
		$(this).after(el);
		$(el).after(ul);
		$('.hidden option').each(function(){
			var el_o = document.createElement('li');
			var obj = this;
			$(el_o).addClass('sw_li');
			$(el_o).html($(this).val());
			$(ul).append(el_o);
			$(el_o).on('click', function(){
				obj.selected = true;
				$(el).html($(this).html());
				$(this).parent().css({'display': 'none'});
			})
		})
		$(el).on('click', function(){
			// if($(ul).css('display')== 'block'){
			// 	$(ul).css({'display': 'none'});
			// } else{
			// 	$(ul).css({'display': 'block'});
			// }
		})	
	}
	$('.day').each(custumSelect_day);
	function custumSelect_day(){
		$(this).css({'display': 'none'});
		var el = document.createElement('div');
		var ul = document.createElement('ul');
		
		$(ul).addClass('user_day_ul');
		$(el).addClass('user_day_div');
		$(el).html($('#user_day option:selected').val());
		$(this).after(el);
		$(el).after(ul);
		$('#user_day option').each(function(){
			var el_o = document.createElement('li');
			var obj = this;
			$(el_o).html($(this).val());
			$(ul).append(el_o);
			$(el_o).on('click', function(){
				obj.selected = true;
				$(el).html($(this).html());
				$(this).parent().css({'display': 'none'});
			})
		})
		$(el).on('click', function(){
			// if($(ul).css('display')== 'block'){
			// 	$(ul).css({'display': 'none'});
			// } else{
			// 	$(ul).css({'display': 'block'});
			// }
		})	
	}
	$('.month').each(custumSelect_month);
	function custumSelect_month(){
		$(this).css({'display': 'none'});
		var el = document.createElement('div');
		var ul = document.createElement('ul');
		
		$(ul).addClass('user_month_ul');
		$(el).addClass('user_month_div');
		$(el).html($('.month option:selected').val());
		$(this).after(el);
		$(el).after(ul);
		$('.month option').each(function(){
			var el_o = document.createElement('li');
			var obj = this;
			$(el_o).html($(this).val());
			$(ul).append(el_o);
			$(el_o).on('click', function(){
				obj.selected = true;
				$(el).html($(this).html());
				$(this).parent().css({'display': 'none'});
			})
		})
		$(el).on('click', function(){
			// if($(ul).css('display')== 'block'){
			// 	$(ul).css({'display': 'none'});
			// } else{
			// 	$(ul).css({'display': 'block'});
			// }
		})	
	}
	$('.year').each(custumSelect_year);
	function custumSelect_year(){
		$(this).css({'display': 'none'});
		var el = document.createElement('div');
		var ul = document.createElement('ul');
		
		$(ul).addClass('user_year_ul');
		$(el).addClass('user_year_div');
		$(el).html($('.year option:selected').val());
		$(this).after(el);
		$(el).after(ul);
		$('.year option').each(function(){
			var el_o = document.createElement('li');
			var obj = this;
			$(el_o).html($(this).val());
			$(ul).append(el_o);
			$(el_o).on('click', function(){
				obj.selected = true;
				$(el).html($(this).html());
				$(this).parent().css({'display': 'none'});
			})
		})
		$(el).on('click', function(){
			// if($(ul).css('display')== 'block'){
			// 	$(ul).css({'display': 'none'});
			// } else{
			// 	$(ul).css({'display': 'block'});
			// }
			// console.log(3);
		})	
	}

	$(':checkbox.custom_checkbox').each(custumCheckBox);
   	function custumCheckBox(){
		$(this).css({'display': 'none'});
		var el = document.createElement('div');
		if(this.checked){
			$(el).addClass('checked_bg');
			$(el).css({
				height: '25',
				width: '23',
				display: 'inline-block'
			});
			}else{
				$(el).addClass('unchecked_bg');
				$(el).css({
				height: '25',
				width: '23',
				display: 'inline-block'
				});
			}
			$(this).after(el);
			var obj = this;
			$(el).on('click', function(){
				if(obj.checked){
					obj.checked = false;
					$(el).removeClass();
					$(el).addClass('unchecked_bg');
					// $(el).css({
					// 	'background': 'url(images/unchecked.png) no-repeat'});
				}else{
					obj.checked = true;
					$(el).removeClass();
					$(el).addClass('checked_bg');
					// $(el).css({
					// 	'background': 'url(images/checked.png) no-repeat'});
				}
			} )
		}


	$('body').click(function(){
		$('.about_us_full').slideUp("slow");
	});

	$('#dialog').click(function(){
		var div = event.target;
		
		var ul = $(div).next();

		$('form ul').each(function(){
			
			if( $(this)[0] != ul[0]){
				$(this).css('display', 'none');
			}else{
				console.log(ul);
				if(ul.css('display') == 'none'){
					ul.css('display', 'block');
				}else{
					ul.css('display', 'none');
				}
			}
		});
	});

	$('.about_us_full').css({'display':'none'});
// $('ul.about_us a').click(function(e){
	function clear_content(){
		// e.stopPropagation();
   		$('.about_us_full').slideDown("slow");
   		var scroll = $("body").scrollTop();
   		$('.about_us_full').css({'top': scroll + 100});
   		$('.bg').show();
	}
   	

   $(function() {
				var month = ['Jan','Feb','March','April','May','June',
					 'July','Aug','Sep','Oct','Nov','Dec'];
					 
				$( "#datepicker" ).datepicker({
					onSelect: function(dateText, inst) {
						$("#datepicker").css({background: 'white'});
						dateText = $.datepicker.formatDate(
							'dd MM yy',
							new Date(inst.selectedYear, inst.selectedMonth, inst.selectedDay),
							{monthNames: month}
						);

						inst.input.val(dateText);
					},
				});

				var dateText = $.datepicker.formatDate(
					'dd MM yy',
					new Date(),
					{monthNames: month}
				);

			})

   	$('body').click(function(event){
   		if($(event.target).hasClass('login_click' , 'ui-corner-all'))return;

   		if($(event.target).parents().hasClass('login_click'))return;
   		if($(event.target).hasClass('ui-corner-all'))return;

   		if($(event.target).parents().hasClass('ui-corner-all'))return;

   		$('#login').css({'display': 'none'});
   		$('#register').css({'display': 'none'});
   		$('#reset_pass').css({'display': 'none'});
   		$('.bg').hide();
   	})

   	window.onload = function(){
		slider(elem, duration, full_dur);
		var img_h_f = $(".image_wrap .slide-block").height();
		promo_w = $(elem).find('.promo-title').width();
		console.log(promo_w);
		$(elem).find('.image_wrap').css({'height': img_h_f});
		if($('html').width() <= 630){
				$(elem).find('.image_wrap img').each(function(){
					$(this).css({'width': 630});
				})
				$(elem).find('.image_wrap').css({'height': 188});
			}
		// if($('html').width() <= 800){
		// 		$(elem).find('.promo-title').css({'left': qq_w - promo_w - 18});
		// 	}else{
		// 		$(elem).find('.promo-title').css({'left':51 +'%'})
		// 	}
		$('body').find('#dialog').css({'left': qq_w / 2 - 230});
		if(qq_w >=660){
			$('body').find('.about_us_full').css({'left': qq_w / 2 - 330});
		} else {
			$('body').find('.about_us_full').css({'left': 0});
		}
		
		
	}

		// $('#login-form').validate({
		// 	rules: {
		// 		login: {
		// 			required: true
		// 		},
		// 		pass: {
		// 			required: true,
		// 			maxlength: 20,
		// 			minlength: 6
		// 		}
		// 	}
		// });
		// $('#reg-form').validate({
		// 	rules: {
		// 		f_name: {
		// 			required: true
		// 		},
		// 		l_name: {
		// 			required: true
		// 		},
		// 		adrees: {
		// 			required: true
		// 		},
		// 		town: {
		// 			required: true
		// 		},
		// 		e_mail: {
		// 			required: true,
		// 			email: true,
		// 		},
		// 		e_mail_valid: {
		// 			required: true,
		// 			equalTo:"#email"
		// 		},
		// 		number: {
		// 			required: true,
		// 			digits: true
		// 		},
		// 		user_name: {
		// 			required: true
		// 		},
		// 		pass: {
		// 			required: true,
		// 			maxlength: 20,
		// 			minlength: 6
		// 		},
		// 		pass: {
		// 			required: true,
		// 			equalTo:"#pass"
		// 		},
		// 	}
		// });

	$('input[name="register"]').on('click',function(){
		var country = $('select[name="user_country"]').val();
		var first_name = $('input[name="first_name"]').val();
		var last_name = $('input[name="last_name"]').val();
		var user_day = $('input[name="user_day"]').val();
		var user_month = $('input[name="user_month"]').val();
		var user_year = $('input[name="user_year"]').val();
		var user_address = $('input[name="user_address"]').val();
		var user_towncity = $('input[name="user_towncity"]').val();
		var user_email = $('input[name="user_email"]').val();
		var confirm_email_address = $('input[name="confirm_email_address"]').val();
		var contact_number = $('input[name="contact_number"]').val();
		var user_login = $('input[name="user_login"]').val();
		var pass1  = $('input[name="pass1"]').val();
		var pass2 = $('input[name="pass2"]').val();
		var confirm_age = $('input[name="confirm_age"]').is(":checked");
		if(country == null || first_name == '' || last_name == '' || user_day == '' || user_month == '' || user_year == '' || user_address == '' || user_towncity == '' || user_email == '' || confirm_email_address == '' || contact_number == '' || user_login == '' || pass1 == '' || pass2 == '' ) {
			alert('One or more fields are empty. Please, try again.');
			return false;
		}

		if(confirm_age == false ){
			alert("You haven't agreed to the Terms, Privacy & Cookie Policy and policies relating to age verification");
			return false;
		}

		if(pass1 != pass2){
			alert("Password confirmation doesn't match");
			return false;
		}

		if(pass1.length < 6){
			alert("Password should consist at least 6 symbols");
			return false;
		}

		if(user_email != confirm_email_address){
			alert("Email confirmation doesn't match");
			return false;
		}

		if(user_email.indexOf('@') == -1){
			alert("Email is wrong");
			return false;
		}
	});

	$('input[name="reset"]').on('click',function(){
		var user_login = $('input[name="user_login"]').val();
		if(user_login == ''){
			alert('One or more fields are empty. Please, try again.');
			return false;
		}
	});

	$('input[name="login"]').on('click',function(){
		var user_login = $('input[name="log"]').val();
		var pass  = $('input[name="pwd"]').val();

		if(user_login == '' || pass  == ''){
			alert('One or more fields are empty. Please, try again.');
			return false;
		}
	});
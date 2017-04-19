if(typeof String.prototype.trim !== 'function') {
  String.prototype.trim = function() {
    return this.replace(/^\s+|\s+$/g, ''); 
  }
}

var COMMON = {
		LOADING:{
			is_loading: false,
			show: function(){
				$('#hk-loading').show();
				COMMON.LOADING.is_loading = true;
			},
			hide: function(){
				COMMON.LOADING.is_loading = false;
				$('#hk-loading').hide();
			}
		},
		ACTIVE_CLASS: '-active',
		init: function(){
            $('button.hk-select-box').each(function(){
                var $obj = $(this);
                var val = $obj.attr('hk-value') || 1;
                if($obj.attr('hk-group')){
                	
                	if($obj.attr('class').indexOf(COMMON.ACTIVE_CLASS) >= 0){
	                    $('#' + $obj.attr('hk-ref')).val(val);
	                    $('#' + $obj.attr('hk-ref')).trigger('change');
	                }
                }else{
	                if($obj.attr('class').indexOf(COMMON.ACTIVE_CLASS) >= 0){
	                    $('#' + $obj.attr('hk-ref')).val(val);
	                    $('#' + $obj.attr('hk-ref')).trigger('change');
	                }else{
	                    $('#' + $obj.attr('hk-ref')).val('');
	                    $('#' + $obj.attr('hk-ref')).trigger('change');
	                }
                }
            });
            $('select.hk-source').each(function(){
            	var $ob = $(this);
            	var params = $ob.attr('hk-params') || {};
            	var url = $ob.attr('hk-url') || '';
            	if(url){
            		
            		$.ajax({
                		'method': 'GET',
                		'url': url,
                		'dataType': 'json',
                		'data': params,
                		'success': function(data){ 
                			if(parseInt(data.status, 10) == 0){
                				$ob.html('');
                				if($ob.attr('placeholder')){
                					var $option = $('<option value=""></option>');
                					$option.text($ob.attr('placeholder'));
                					$option.val('-1');
                					$ob.append($option);
                				}
            					
                				for(var i=0; i<data.data.sources.length; i++){
                					var $option = $('<option value=""></option>');
                					$option.text(data.data.sources[i].text);
                					$option.val(data.data.sources[i].value);
                					$ob.append($option);
                				}
                			}
                		}
                	});
            	}
            });
            $('input.hk-autocomplete').each(function(){
            	var $ob = $(this);
            	if($ob.attr('hk-url')){
            		
            	}else if($ob.attr('hk-source')){
            		$.ajax({
                		'method': 'GET',
                		'url': $ob.attr('hk-source'),
                		'dataType': 'json',
                		'data': {},
                		'success': function(data){
                			if(parseInt(data.status, 10) == 0){
                				var arr=[];
                				for(var i = 0; i< data.data.sources.length; i++){
                					arr.push(data.data.sources[i].text);
                				}
                				$ob.autocomplete({'source': arr});
                			}
                		}
                	});
            	}
            });
            $('input.hk-date-picker').each(function(){
				var $ob = $(this);
				var options = {
						format: 'YYYY-MM-DD'
						
				};
				if($ob.attr('hk-start-date')){
				
				}
				if($ob.attr('hk-end-date')){
					
				}
				if($ob.attr('hk-view-mode')){
					options.viewMode = $ob.attr('hk-view-mode');
				}
				if($ob.attr('hk-min-date')){
					options.minDate = $ob.attr('hk-min-date');
				}
				if($ob.attr('hk-max-date')){
					options.maxDate = $ob.attr('hk-max-date');
				}
				$ob.datetimepicker(options);
			});
			/*
			* tan.ngo
			* 10/07/2015
			*/
			$('#popoverButton').focus(function() {
				$('#popover').css('z-index', 0);
				var sourcePos = $('#popoverButton').offset();
				var targetHeight = $('#popoverButton').height();
				$('#popover').offset({top: sourcePos.top + targetHeight + 20, left: sourcePos.left});
			});
			$('#popoverClose').click(function() {
				$('#popover').css('z-index', -1);
			});
			COMMON.reInit();
		},
		reInit: function(){
			COMMON.NUMERIC.format_number();
			
			$('.hk-modal').unbind('click').click(function(){
				$('#'+$(this).attr('hk-ref')).modal({"backdrop" : "static"});
			});
			$('.hk-upload').unbind('click').click(function(){ 
				$('#'+$(this).attr('hk-ref')).trigger('click');
			});
			$('input[hk-label=float]').unbind('floatlabel').floatlabel({
				labelClass: 'hk-fadeup',
				transitionDuration : 0.3,
				slideInput: false,
				labelStartTop: '15px',
				labelEndTop: '0px'
			});
			$('input[hk-label=inline]').each(function(){
				var $ob = $(this);
				$ob.unbind('floatlabel').floatlabel({
					labelClass: 'hk-fadeup',
					transitionDuration : 0.3,
					slideInput: false,
					labelStartTop: '15px',
					labelEndTop: '0px'
				});
				var $pr = $ob.parent('div');
				$pr.css('width', $ob.attr('hk-width')).css('display', 'inline-block');
				if($ob.attr('hk-float')){
					$pr.css('float', $ob.attr('hk-float'));
					$pr.parent('div').append('<div style="clear: both"></div>');
				}
			});
            $('button.hk-select-box').unbind('click').click(function(){
                var $obj = $(this);
                var val = $obj.attr('hk-value') || 1;
                
                if($obj.attr('hk-group')){
                	$('button.hk-select-box[hk-group='+$obj.attr('hk-group')+']').each(function(){
                		var $ob = $(this);
                		$('#' +$ob.attr('hk-ref')).val('');
                        $ob.removeClass(COMMON.ACTIVE_CLASS);
                        $('#' + $ob.attr('hk-ref')).trigger('change');
                	});
                	$obj.addClass(COMMON.ACTIVE_CLASS);
                    $('#' + $obj.attr('hk-ref')).val(val);
                    $('#' + $obj.attr('hk-ref')).trigger('change');
                }else{
                	if($obj.attr('class').indexOf(COMMON.ACTIVE_CLASS) >= 0){
                        $('#' + $obj.attr('hk-ref')).val('');
                        $obj.removeClass(COMMON.ACTIVE_CLASS);
                        $('#' + $obj.attr('hk-ref')).trigger('change');
                    }else{
                        $obj.addClass(COMMON.ACTIVE_CLASS);
                        $('#' + $obj.attr('hk-ref')).val(val);
                        $('#' + $obj.attr('hk-ref')).trigger('change');
                    }
                }
            });
            $('button[hk-form=checked], input[hk-form=checked]').unbind('click').click(function(e){
                    var $form = $('form#' + $(this).attr('hk-ref'));
                    if (COMMON.FORM.formCheck($form)){
                        $('button#'+$(this).attr('hk-ng-click')).trigger('click');
                        $(this).attr('disabled', 'disbled');
                    }
                    
            });
            $('button[hk-form=submit], input[hk-form=submit]').unbind('click').click(function(e){
	                var $form = $('form#' + $(this).attr('hk-ref'));
					if (COMMON.FORM.formCheck($form)){
	                   $form.submit();
	                   $(this).attr('disabled', 'disbled');
	                }
	        });
		},
		
		//-----------------------------FUNCTION-------
		
		
		
		
		//------------------------FORM----------
		FORM: {
			check: function($ob){
				$ob.css('background','');
				var error = 'message error undefined !';
				var val = $ob.val().trim();
				
				if($ob.attr('hk-required')){
					error = $ob.attr('hk-error-required') || error;
					
					if(val == '' || (parseInt(val, 10) <= 0 && $ob.is('select'))){
	                    $ob.css('background',COMMON.ERROR.bgColor);
	                    COMMON.ERROR.add(error);
	                    return false;
	                }
				}
				
				if($ob.attr('hk-email-or-tel')){
					error = $ob.attr('hk-error-email-or-tel') || error;
					
					if(val != '' && !VALIDATOR.isEmail(val) && !VALIDATOR.isPhoneNumber(val)){
	                    $ob.css('background',COMMON.ERROR.bgColor);
	                    COMMON.ERROR.add(error);
	                    return false;
	                }
				}
				
                
				if($ob.attr('hk-group-required')){
					error = $ob.attr('hk-error-group-required') || error;
					var is_err = true;
					$('*[hk-group='+$ob.attr('hk-group')+']').each(function(){
						val = $(this).val();
						if(val != ''){
							is_err = false;
						}
					});
					if(is_err){
						COMMON.ERROR.add(error);
	                    return false;
					}
				}
				
				if($ob.attr('hk-phone-number')){
					error = $ob.attr('hk-error-phone-number') || error;
					
					if(val != '' && !VALIDATOR.isPhoneNumber(val)){
	                    $ob.css('background',COMMON.ERROR.bgColor);
	                    COMMON.ERROR.add(error);
	                    return false;
	                }
				}
                
				if($ob.attr('hk-email')){
					error = $ob.attr('hk-error-email') || error;
					
					if(val != '' && !VALIDATOR.isEmail(val)){
	                    $ob.css('background',COMMON.ERROR.bgColor);
	                    COMMON.ERROR.add(error);
	                    return false;
	                }
				}
				
				if($ob.attr('hk-min')){
					error = $ob.attr('hk-error-min') || error;
					
					if(val != '' && val.length < parseInt($ob.attr('hk-min'), 10)){
	                    $ob.css('background',COMMON.ERROR.bgColor);
	                    COMMON.ERROR.add(error);
	                    return false;
	                }
				}
				
				if($ob.attr('hk-max')){
					error = $ob.attr('hk-error-max') || error;
					
					if(val != '' && val.length > parseInt($ob.attr('hk-max'), 10)){
	                    $ob.css('background',COMMON.ERROR.bgColor);
	                    COMMON.ERROR.add(error);
	                    return false;
	                }
				}
				
				if($ob.attr('hk-confirm')){
					error = $ob.attr('hk-error-confirm') || error;
					
					var $obc = $('#'+$ob.attr('hk-ref'));
					var val2 = $obc.val().trim();
					
					if(val != val2 && val2 != ''){
						$ob.css('background',COMMON.ERROR.bgColor);
						$obc.css('background',COMMON.ERROR.bgColor);
	                    COMMON.ERROR.add(error);
	                    return false;
	                }else{
	                	
	                }
				}
                return true;
			},
			formCheck: function($form){
                var $is_error = false;
                COMMON.ERROR.clear();
                $form.find('input.hk-check, textarea.hk-check, select.hk-check').each(function(){
                	var is_err = false;
                	
                	is_err = !COMMON.FORM.check($(this));
                	if(!$is_error){
                		$is_error = is_err;
                	}
                	
                });
                
                if($is_error){                    
                    COMMON.ERROR.show();
                }else{
                    COMMON.ERROR.hide();
                }
                
                return !$is_error;
            }
			
		},
		
        ERROR: {
                bgColor: '#FBEFFB',
                duration: 300,
                delay: 3500,
                timeout: null,
                addErr: function($data){
                    for($i = 0; $i < $data.length;  $i++){
                        $('div.hk-errors ul, div.hk-success ul').append('<li>'+$data[i]+'</li>');
                    }
                },
                add: function($err){
                    $('div.hk-errors ul, div.hk-success ul').append('<li>'+$err+'</li>');
                },
                clear: function(){
                    $('div.hk-errors ul, div.hk-success ul').html('');
                },
                show: function(){
                    COMMON.ERROR.hide();
                    $('div.hk-errors').show('slide', {direction: 'up', duration: COMMON.ERROR.duration },function(){
                        COMMON.ERROR.timeout = setTimeout('COMMON.ERROR.hideSlide()',COMMON.ERROR.delay);
                    });
                    
                },
                showSuccess: function(){
                    COMMON.ERROR.hide();
                    $('div.hk-success').show('slide', {direction: 'up', duration: COMMON.ERROR.duration },function(){
                        COMMON.ERROR.timeout = setTimeout('COMMON.ERROR.hideSlide()',COMMON.ERROR.delay);
                    });
                },
                hideSlide: function(){
                    $('div.hk-errors, div.hk-success').hide('slide', {direction: 'up', duration: COMMON.ERROR.duration });
                    clearTimeout(COMMON.ERROR.timeout);
                },
                hide: function(){
                    $('div.hk-errors, div.hk-success').hide();
                    clearTimeout(COMMON.ERROR.timeout);
                }
        },
		
		//------------------------DATE----------
		DATE: {
			format: 'yyyy/mm/dd'
		},
		
		
		//------------------------NUMERIC
		NUMERIC: {
			separator: ',',
			
			//span, input: class="format_number"
			format_number: function(){
				$('span.hk-format-number').each(function(){
					ULTI.format_number($(this).text(), COMMON.NUMERIC.separator);
				});
				$('input.hk-format-number').unbind('change').change(function(){
					ULTI.format_number($(this).val(), COMMON.NUMERIC.separator);
				}).unbind('focus').focus(function(){
					if(parseInt($(this).val(),10)==0){
						$(this).val('');
					}
				}).unbind('focusout').focusout(function(){
					if($(this).val() == ''){
						$(this).val('0');
					}
				});
			}
		}
};
$(function(){	
	COMMON.init();
});
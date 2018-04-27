/*
 * jQuery Form Elements
 *
 * Author : @starfennec
 * Version: 0.1
 * Date: mar 22 2017
 */

(function($) {

  var customRadio = function(radio, options){
    var settings = $.extend({
    }, options || {});

    this.settings = settings;

    var $radio = $(radio);

    var el = '<span class="radio-btn"></span>';

    if($radio.closest('.form-element').length == 1){
      $(el).insertAfter($radio);
    }
  }

  $.fn.customRadio = function(options){
    return this.each(function(i,e){
      var fe = new customRadio(e, options);
    });
  };

  var customCheckbox = function(checkbox, options){
    var settings = $.extend({

    }, options || {});

    this.settings = settings;

    var $checkbox = $(checkbox);

    var svg = '<span class="checkbox-btn"><svg version="1.1" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M461.6,109.6l-54.9-43.3c-1.7-1.4-3.8-2.4-6.2-2.4c-2.4,0-4.6,1-6.3,2.5L194.5,323c0,0-78.5-75.5-80.7-77.7  c-2.2-2.2-5.1-5.9-9.5-5.9c-4.4,0-6.4,3.1-8.7,5.4c-1.7,1.8-29.7,31.2-43.5,45.8c-0.8,0.9-1.3,1.4-2,2.1c-1.2,1.7-2,3.6-2,5.7  c0,2.2,0.8,4,2,5.7l2.8,2.6c0,0,139.3,133.8,141.6,136.1c2.3,2.3,5.1,5.2,9.2,5.2c4,0,7.3-4.3,9.2-6.2L462,121.8  c1.2-1.7,2-3.6,2-5.8C464,113.5,463,111.4,461.6,109.6z"/></svg></span>';

    if($checkbox.closest('.form-element').length == 1){
      $(svg).insertAfter($checkbox);
    }
  }

  $.fn.customCheckbox = function(options){
    return this.each(function(i,e){
      var fe = new customCheckbox(e, options);
    });
  };

  var dropDown = function(dropdown, options) {

    var settings = $.extend({
        maxItems: 5
    }, options || {});

    this.settings = settings;

    var $dropdown = $(dropdown);

    if($dropdown.parent('.form-element').length == 1){
      var activeVal = $dropdown.find('option:selected').text();
      var options = '';
      $dropdown.find('option').each(function(i,e){
        if($(e).text() == activeVal){
          options += '<li class="selected">'+$(e).text()+'</li>';
        } else {
          options += '<li>'+$(e).text()+'</li>';
        }
      });

      var newDropdown = $('<div class="form-element-dropdown">'+
      '<a href="#">'+activeVal+'</a>'+
      '<ul data-max-items="'+this.settings.maxItems+'">'+options+'</ul>'+
      '</div>');

      $dropdown.hide().parent('.form-element').append(newDropdown);
    }
  }
  function initDropdown(){
    $('body').on('click touchend', '.form-element-dropdown>a', function(e){
      e.preventDefault();
      var wrap = $(this).parent('.form-element-dropdown');
      var isOpen = false;

      if(wrap.hasClass('active')){
        isOpen = true;
      }

      $('.form-element-dropdown').each(function(i,e){
        if($(this).hasClass('active')){
          closeDropdown(this);
        }
      });

      if(!isOpen){
        openDropdown(wrap);
      }
    }).on('click touchend', '.form-element-dropdown ul li', function(e){
      e.preventDefault();
      var index = $(this).index(),
        val = $(this).text(),
        wrap = $(this).closest('.form-element-dropdown');

      wrap.children('ul')
        .find('li')
        .removeClass('selected')
        .eq(index)
        .addClass('selected');

      wrap.siblings('select')
        .find('option')
        .eq(index)
        .prop("selected",true);
      wrap.find('>a').text(val);

      wrap.siblings('select').trigger('change');

      closeDropdown(wrap);
    });

    $('body').on('click touchend', function(e){
      if($(e.target).closest('.form-element-dropdown').length == 0){

        $('.form-element-dropdown').each(function(i,e){
          if($(this).hasClass('active')){
            closeDropdown(this);
          }
        });
      }
    });
  }
  function openDropdown(dropdown){
    var $dropdown = $(dropdown);
    $dropdown.addClass('active');

    var itemHeight = $dropdown.find('li').eq(0).height(),
      itemNum = $dropdown.find('li').length,
      maxItems = $dropdown.find('ul').attr('data-max-items');

    //console.log(itemNum+'*'+itemHeight+'(max '+maxItems+')');
    if(itemNum > maxItems){
      $dropdown.find('ul').css({ 'height' : maxItems*itemHeight });
    }
  }

  function closeDropdown(dropdown){
    var $dropdown = $(dropdown);
    $dropdown.removeClass('active');
  }

  function log(){
    if (window.console && console.log)
      console.log('[FormElements] ' + Array.prototype.join.call(arguments,' '));
  }

  $.fn.dropdown = function(options){
    initDropdown();

    return this.each(function(i,e){
      var fe = new dropDown(e, options);
   });
  };


  var inputFile = function(input, options) {
    var settings = $.extend({

    }, options || {});

    this.settings = settings;

    var $input = $(input);

    if($input.parent('.form-element').length == 1){
      var label = $input.attr('data-label');
      var $btn = $('<div><span>'+label+'</span></div>');
      var $cross = $('<a href="#"></a>');
      $cross.on('click', function(e){
        e.preventDefault();
        e.stopPropagation();

        $input.val('');
        $btn.removeClass('form-element-inputfile-filled');
        $(this).siblings('span').text(label);
      });

      $cross.addClass('form-element-inputfile-reset').appendTo($btn);
      $btn.addClass('form-element-inputfile');
      $btn.on('click', function(){
          $input.trigger('click');
      });

      $input.on('change', function(e){
        var fileName = '';

        if( this.files && this.files.length > 1 )
          fileName = ( this.getAttribute( 'data-multiple-caption' ) || '' ).replace( '{n}', this.files.length );
        else if( e.target.value )
          fileName = e.target.value.split( '\\' ).pop();

        if( fileName )
          $btn.addClass('form-element-inputfile-filled').find('span').text(fileName);
        else
          $btn.removeClass('form-element-inputfile-filled').find('span').text(label);
      });

      // Firefox bug fix
      $input
        .on( 'focus', function(){ $input.addClass( 'has-focus' ); })
        .on( 'blur', function(){ $input.removeClass( 'has-focus' ); });

      $input.addClass('input-file-hidden');
      $btn.appendTo($input.parent('.form-element'));
    }
  }

  $.fn.inputfile = function(options){
    return this.each(function(i,e){
      var fe = new inputFile(e, options);
    });
  };

})(jQuery);

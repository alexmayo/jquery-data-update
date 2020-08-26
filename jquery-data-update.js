//jQuery Data Update
// The MIT License (MIT)
// Copyright (c) 2020 alexmayo (https://github.com/alexmayo)
// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
// The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

var DataUpdate = function(options) {

  //We use this variable so that we can easily call the parent from within child functions.
  var __this = this;

  //Start using jQuery, only once it has loaded.
  $(document).ready(function(){

    //Storage for the interval ID.
    __this.interval = null;

    //Extend the default options if needed.
    __this.options = $.extend({
      interval: 10,
      debug: false,
      dataSelector: 'update',
      updateAll: false,
      ajaxMethod: 'get',
      ajaxData: {},
      success: function() {},
      error: function() {},
    }, options);
    
    //Extend the class with the required functions.
    $.extend(DataUpdate.prototype, {

      //Start the ttimeout.
      start: function() {
        var __this = this;
        this.log('Checking every ' + this.options.interval + ' seconds for updated HTML for elements with the [data-'+this.options.dataSelector+'] selector.');
        this.update();
        this.interval = setInterval(function() {
          __this.update();
        }, this.options.interval * 1000);
      },

      //Stop the timeout.
      stop: function() {
        clearInterval(this.interval);
      },

      //Check for updated content.
      update: function() {
        var __this = this;
        this.log('Checking for updated content.');
        $.ajax({
          url: window.location.href,
          dataType: 'html',
          method: __this.options.ajaxMethod,
          data: __this.options.ajaxData,
          success: function(response) {
            let changes = [];
            $.each($('[data-'+__this.options.dataSelector+']'), function(i, element) {
              let selector = '[data-'+__this.options.dataSelector+'="' + $(element).data(__this.options.dataSelector) + '"]';
              let elements = $(response).filter(selector);
              if(elements.length > 1 && !__this.options.updateAll) {
                __this.warning('There are multiple elements with the same selector (' + selector + '). Only the first will be updated. If you want to update all elements with the same data attribute, simply change the updateAll option to true.');
              }
              let content = elements.html();
              if(content && content != $(selector).html()) {
                __this.log(selector + ' has changed and will be updated.', {oldContent: $(selector).html(), newContent: content});
                if(__this.options.updateAll) {
                  $.each($(selector), function(i, element) {
                    $(element).html(content);
                    changes.push({selector:selector, element:$(element), oldContent:$(selector).first().html(), newContent:content});
                  });
                } else {
                  $(selector).first().html(content);
                  changes.push({selector:selector, element:$(selector).first(), oldContent:$(selector).first().html(), newContent:content});
                }
              }
            });
            __this.options.success(changes, response);
          },
          error: function(response) {
            __this.options.error(response);
          }
        });
      },

      //Return console log info if debug is active.
      log: function(str, obj=' ') {
        return this.options.debug ? console.info('jQuery Data Update: '+str, obj) : null;
      },

      //Return console warn info if debug is active.
      warning: function(str, obj=' ') {
        return this.options.debug ? console.warn('jQuery Data Update: '+str, obj) : null;
      }
    });
    
    //Start the timesouts as soon as the class is instantiated.
    __this.start();
  });
}

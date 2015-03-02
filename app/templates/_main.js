var <%= app_name %> = function($) {
  // private var(s)
  var $initProgress = null;
  var _dom = {};  // Will be populated via initDom();

  // private method(s)
  var _init = function(_mainContainer) {
    // Initialize $initProgress to support synchronous init-subfunction calls.
    $initProgress = $.Deferred();

    // Call 2nd and subsequent init-subfunctions when notified by 1st.
    $initProgress.progress(function (myProgress /* String */, myMsg /* String */) {
      switch (myProgress) {
        case 'domInited':
          initListeners();
          break;
        case 'listenersInited':
          // For this last init-subfunction, resolve $initProgress.
          $initProgress.resolve('initListeners');
          break;
        default:
          break;
      }
    });

    $initProgress.done(function (myLastInitSubFn /* String */) {
      if (typeof $initProgress != null) {
        $initProgress = null;
      }
    });

    // Call 1st init-subfunction to start synchronous call-chain.
    initDom();
  };

  var initDom = function () {
    // Creates DOM handles to optimize DOM access.
    _dom.$container = $('#containerDiv');
    _dom.$header = $('header', _dom.$container);
    _dom.$main = $('main', _dom.$container);
    _dom.$sections = $('section', _dom.$main);
    _dom.$articles = $('article', _dom.$sections);
    _dom.$footer = $('footer', _dom.$container);

    // Notify $initProgress.
    $initProgress.notify('domInited');
  };

  var initListeners = function () {
    // Binds event listeners to DOM elements.

    // IF using jQuery 1.9+, use .on('<event>', function () {}); instead of .live(...).

    // Notify $initProgress.  This is the last init-subfunction.
    $initProgress.notify('listenersInited');
  };


  // output/public     
  return {
    init: _init,
    dom: _dom
  };

}(jQuery);

$(function () {
  <%= app_name %>.init($('#containerDiv'));
});


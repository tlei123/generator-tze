var <%= app_name %> = function($) {
  // private var(s)
  var $initProgress = null;
  var _dom = {};  // Will be populated via initDom();

  // private method(s)
  // Event listeners that trigger these methods should be initialized in 
  // initListener.
  // Also, leverage predefined _dom handlers; add more into initDom as needed.
  var method1 = function () {
    // Placeholder: 1st funtional method.
    var self = this;

    // console.log('[<%= app_name %>.method1] Mehod completed.');
  };


  // Initialization.
  // Uses jQuery deferred object for synchronous subfunction calls.
  // See http://api.jquery.com/category/deferred-object/ for details.
  var _init = function(_mainContainer) {
    // Initialize $initProgress to support synchronous init-subfunction calls.
    $initProgress = $.Deferred();

    // After 1st subfunction-call (bottom of method here) finishes, 
    // this progress method synchronously call the next init-subfunction, 
    // based on the notification message from each subfunction.
    $initProgress.progress(function (myProgress /* String */, myMsg /* String */) {
      switch (myProgress) {
        case 'domInited':
          // console.log('[<%= app_name %>.init] DOM-handles initialized. Now calling initListeners...');

          // Call next init-subfunction.
          initListeners();
          break;
        case 'listenersInited':
          // console.log('[<%= app_name %>.init] Event-listeners initialized. [final init-subfunction]');

          // For this final init-subfunction, resolve $initProgress.
          $initProgress.resolve();
          break;
        default:
          break;
      }
    });

    $initProgress.done(function () {
      if (typeof $initProgress <%= not_equals %> null) {
        $initProgress = null;
      }
      // console.log('[<%= app_name %>.init] App fully initialized!);
    });

    // Call 1st init-subfunction to start synchronous call-chain.
    initDom(_mainContainer);
  };

  var initDom = function (_mainContainer) {
    // Creates DOM handles to optimize DOM access.
    _dom.$container = _mainContainer;
    _dom.$header = $('header', _dom.$container);
    _dom.$main = $('main', _dom.$container);
    _dom.$nav = $('nav', _dom.$container);
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
  <%= app_name %>.init($('#container'));
});


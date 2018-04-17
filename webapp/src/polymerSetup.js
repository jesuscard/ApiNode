var webComponentsSupported = (
   'registerElement' in document 
   && 'import' in document.createElement('link') 
   && 'content' in document.createElement('template') 
);
/**
 * Polifilling webcomponents
 */
if (!webComponentsSupported) {
    var script = document.createElement('script');
    script.async  = true;
    script.src    = '/bower_components/webcomponentsjs/webcomponents-lite.min.js';
    script.onload = onload;
    document.head.appendChild(script);
}
/**
 * Polifilling window fetch
 */
if(!window.fetch) {
    var script = document.createElement('script');
        script.async  = true;
        script.src    = '/bower_components/fetch/fetch.js';
        script.onload = onload;
    document.head.appendChild(script);
}
/**
 * Polifilling Object.assign method
 */
if (typeof Object.assign != 'function') {
  Object.assign = function (target, varArgs) { // .length of function is 2
    'use strict';
    if (target == null) { // TypeError if undefined or null
      throw new TypeError('Cannot convert undefined or null to object');
    }

    var to = Object(target);

    for (var index = 1; index < arguments.length; index++) {
      var nextSource = arguments[index];

      if (nextSource != null) { // pasamos si es undefined o null
         for (var nextKey in nextSource) {
         // Evita un error cuando 'hasOwnProperty' ha sido sobrescrito
            if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
               to[nextKey] = nextSource[nextKey];
            }
         }
      }
    }
    return to;
  };
}

/**
 * Registering service worker
 */
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      try {
         navigator.serviceWorker.register('/service-worker.js');
      } catch(e) {
         console.warn('Service worker not registered');
      }
    });
}
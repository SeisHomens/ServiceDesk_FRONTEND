/*!
 * classie - class helper functions
 * from bonzo https://github.com/ded/bonzo
 * 
 * classie.has( elem, 'my-class' ) -> true/false
 * classie.add( elem, 'my-new-class' )
 * classie.remove( elem, 'my-unwanted-class' )
 * classie.toggle( elem, 'my-class' )
 */

/*jshint browser: true, strict: true, undef: true */
/*global define: false */

(function (window) {

  'use strict';

  // class helper functions from bonzo https://github.com/ded/bonzo

  function classReg(className) {
    return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
  }

  // classList support for class management
  // altho to be fair, the api sucks because it won't accept multiple classes at once
  var hasClass, addClass, removeClass;

  if ('classList' in document.documentElement) {
    hasClass = function (elem, c) {
      return elem.classList.contains(c);
    };
    addClass = function (elem, c) {
      elem.classList.add(c);
    };
    removeClass = function (elem, c) {
      elem.classList.remove(c);
    };
  }
  else {
    hasClass = function (elem, c) {
      return classReg(c).test(elem.className);
    };
    addClass = function (elem, c) {
      if (!hasClass(elem, c)) {
        elem.className = elem.className + ' ' + c;
      }
    };
    removeClass = function (elem, c) {
      elem.className = elem.className.replace(classReg(c), ' ');
    };
  }

  function toggleClass(elem, c) {
    var fn = hasClass(elem, c) ? removeClass : addClass;
    fn(elem, c);
  }

  var classie = {
    // full names
    hasClass: hasClass,
    addClass: addClass,
    removeClass: removeClass,
    toggleClass: toggleClass,
    // short names
    has: hasClass,
    add: addClass,
    remove: removeClass,
    toggle: toggleClass
  };

  // transport
  if (typeof define === 'function' && define.amd) {
    // AMD
    define(classie);
  } else {
    // browser global
    window.classie = classie;
  }

})(window);
// EventListener | @jon_neal | //github.com/jonathantneal/EventListener
!window.addEventListener && window.Element && (function () {
  function addToPrototype(name, method) {
    Window.prototype[name] = HTMLDocument.prototype[name] = Element.prototype[name] = method;
  }

  var registry = [];

  addToPrototype("addEventListener", function (type, listener) {
    var target = this;

    registry.unshift({
      __listener: function (event) {
        event.currentTarget = target;
        event.pageX = event.clientX + document.documentElement.scrollLeft;
        event.pageY = event.clientY + document.documentElement.scrollTop;
        event.preventDefault = function () { event.returnValue = false };
        event.relatedTarget = event.fromElement || null;
        event.stopPropagation = function () { event.cancelBubble = true };
        event.relatedTarget = event.fromElement || null;
        event.target = event.srcElement || target;
        event.timeStamp = +new Date;

        listener.call(target, event);
      },
      listener: listener,
      target: target,
      type: type
    });

    this.attachEvent("on" + type, registry[0].__listener);
  });

  addToPrototype("removeEventListener", function (type, listener) {
    for (var index = 0, length = registry.length; index < length; ++index) {
      if (registry[index].target == this && registry[index].type == type && registry[index].listener == listener) {
        return this.detachEvent("on" + type, registry.splice(index, 1)[0].__listener);
      }
    }
  });

  addToPrototype("dispatchEvent", function (eventObject) {
    try {
      return this.fireEvent("on" + eventObject.type, eventObject);
    } catch (error) {
      for (var index = 0, length = registry.length; index < length; ++index) {
        if (registry[index].target == this && registry[index].type == eventObject.type) {
          registry[index].call(this, eventObject);
        }
      }
    }
  });
})();

(function () {

  var button = document.getElementById('cn-button3'),
    wrapper = document.getElementById('cn-wrapper3'),
    button = document.getElementById('cn-button4'),
    wrapper = document.getElementById('cn-wrapper4'),
    button = document.getElementById('cn-button5'),
    wrapper = document.getElementById('cn-wrapper5'),
    button = document.getElementById('cn-button'),
    wrapper = document.getElementById('cn-wrapper'),
    overlay = document.getElementById('cn-overlay');

  //open and close menu when the button is clicked
  var open = false;
  button.addEventListener('click', handler, false);
  wrapper.addEventListener('click', cnhandle, false);

  function cnhandle(e) {
    e.stopPropagation();
    closeNav();
  }

  function handler(e) {
    if (!e) var e = window.event;
    e.stopPropagation();//so that it doesn't trigger click event on document

    if (!open) {
      openNav();
    }
    else {
      closeNav();
    }
  }
  function openNav() {
    open = true;
    button.innerHTML = "-";
    classie.add(overlay, 'on-overlay');
    classie.add(wrapper, 'opened-nav');
  }
  function closeNav() {
    open = false;
    button.innerHTML = "+";
    classie.remove(overlay, 'on-overlay');
    classie.remove(wrapper, 'opened-nav');
  }
  document.addEventListener('click', closeNav);

})();

(function(root) {
  
  var applyTransformationToNodes = function(nodes, fn) {

  };

  var VictoriaSponge = root.VictoriaSponge = root.$ = function(selector) {
    if (!(this instanceof VictoriaSponge)) {
      return new VictoriaSponge(selector);
    }

    var nodes = document.querySelectorAll(selector);

    this.length = nodes.length;

    this.nodes = (this.length > 0) ? nodes : null;

    return this;
  }

  VictoriaSponge.prototype = {
    addClass: function() {

    },

    removeClass: function() {

    },

    addAttribute: function() {

    },

    removeAttribute: function() {

    },

    offset: function() {

    },

    filter: function() {

    },

    getStyle: function() {
      
    },

    on: function() {

    },

    off: function() {

    }

  }

  // These are just for fun following the whole cake theme :)
  VictoriaSponge.prototype.addDecoration = VictoriaSponge.prototype.addClass;

})(window);
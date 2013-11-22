(function(root) {

  var nodeListToArray = function(nodeList) {
    
      var arr = [];

      for(var i=0, len = nodeList.length; i < len; i++) {
        arr.push(nodeList[i]);
      }
      
      return arr;
  };

  var applyToNodes = function(nodes, args, fn) {
    for (var i = 0; i < nodes.length; i++) {
      fn.apply(nodes[i], args);
    }
  };

  var args = function(arguments) {
    return Array.prototype.slice.call(arguments);
  };

  var VictoriaSponge = root.VictoriaSponge = root.$ = function(selector) {
    if (!(this instanceof VictoriaSponge)) {
      return new VictoriaSponge(selector);
    }

    var nodes = nodeListToArray(document.querySelectorAll(selector));
    this.length = nodes.length;
    this.nodes = (this.length > 0) ? nodes : null;

    return this;
  }

  VictoriaSponge.prototype = {
    // Add in classList support for modern browsers
    addClass: function(classes) {
      applyToNodes(this.nodes, args(arguments), function(classes) {
        if (this.nodeType === 1) {
          var classesToAdd = classes.split(' ');
          var classes = this.className.split(' ');  

          classesToAdd.forEach(function(classs) {
            if (classes.indexOf(classs) < 0) {
              classes.push(classs);
            }
          });        
          
          this.className = classes.join(' ');
        }
      });

      return this;
    },

    removeClass: function(classes) {
      // Add in classList support for modern browsers
      applyToNodes(this.nodes, args(arguments), function(classes) {
        if (this.nodeType === 1) {
          var classesToRemove = classes.split(' ');
          var classes = this.className.split(' ');  

          var toKeep = classes.filter(function(classs) {
            var keep = true;

            var i = 0;

            while (i < classesToRemove.length) {
              if (classesToRemove[i] === classs) {
                keep = false;
                break;
              }

              i++;
            }

            return keep;
          });
          
          this.className = toKeep.join(' ');
        }
      });

      return this;
    },

    hasClass: function(classs) {
      var hasClass = false;

      for (var i = 0, len = this.nodes.length; i < len; i++) {
        var classesApplied = this.nodes[i].className.split(' ');
        if (classesApplied.indexOf(classs) !== -1) {
          hasClass = true;
          break;
        }
      }

      return hasClass;
    },

    addAttribute: function(attr, value) {
      applyToNodes(this.nodes, args(arguments), function(attr, value) {
        this.setAttribute(attr, value);
      });

      return this;
    },

    removeAttribute: function(attr) {
      applyToNodes(this.nodes, args(arguments), function(attr) {
        this.removeAttribute(attr);
      });

      return this;
    },

    offset: function() {

    },

    filter: function(fn) {
      var results = [];

      for (var i = 0, len = this.nodes.length; i < len; i++) {
        if (fn.call(this.nodes[i], i)) {
          results.push(this.nodes[i]);
        }
      }

      this.nodes = results;
      this.length = results.length;

      return this;
    },

    getStyle: function(style) {
      var node;

      if (node = this.nodes[0]) {
        var result = window.getComputedStyle(node, null).getPropertyValue(style);
      }

      return result ? result : null;
    },

    remove: function() {
      applyToNodes(this.nodes, args(arguments), function() {
        this.parentNode.removeChild(this);
      }); 
    },

    on: function() {

    },

    off: function() {

    }

  }

  // These are just for fun following the whole cake theme :)
  VictoriaSponge.prototype.addDecoration = VictoriaSponge.prototype.addClass;
  VictoriaSponge.prototype.eat = VictoriaSponge.prototype.remove;

})(window);
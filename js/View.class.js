/**
 * View class
 * MSIE crap: dont use word "item" from global scope, on IE its a function from window object !!!
 **/
var FW_View$CSSPrefix = ['moz','ms','o','webkit'];
var FW_View = function(selectors) {
	
	// Auto instantiate
	if (this.__proto__.constructor !== FW_View) return new FW_View(selectors);
	
	// Empty element
	var empty = document.createElement('_null_');
	
	// Index
	var index = -1;
	
	// Nodes
	var elements = document.querySelectorAll(selectors);
	
	/**
	 * Get all elements
	 */
	this.all = function() {
		return elements;
	};
	
	/**
	 * Append html to all DOM elements in list
	 */
	this.append = function(newHTML) {
		if (typeof newHTML == 'undefined') return this;
		this.each(function(item) {
			item.append(newHTML);
		});
		return this;
	};
	
	/**
	 * Get/Set attribute on all DOM elements in list
	 */
	this.attr = function(key,value) {
		if (typeof key == 'undefined') return this;
		if (typeof value != 'undefined') {
			this.each(function(item) {
				item.attr(key,value);
			});
		} else {
			if (elements.length < 1) return null;
			else if (elements.length == 1) return this.first().attr(key);
			else {
				var array = [];
				this.each(function(item) {
					array.push(item.attr(key));
				});
				return array;
			}
		}
		return this;
	};
	
	/**
	 * Get elements count
	 */
	this.count = function() {
		return elements.length;
	};
	
	/**
	 * Get/Set css on all DOM elements in list
	 */
	this.css = function(key,value,prefix) {
		if (typeof key == 'undefined') return this;
		if (typeof prefix != 'boolean') prefix = false;
		if (typeof value != 'undefined') {
			this.each(function(item) {
				item.css(key,value,prefix);
			});
		} else {
			if (elements.length < 1) return null;
			else if (elements.length == 1) return this.first().css(key);
			else {
				var array = [];
				this.each(function(item) {
					array.push(item.css(key));
				});
				return array;
			}
		}
		return this;
	};
	
	/**
	 * Get current element in list
	 */
	this.current = function() {
		if (elements.length < 1) return empty;
		if (index < 0) index = 0;
		return elements[index];
	};
	
	/**
	 * Process each element in list
	 */
	this.each = function(doEach) {
		if (typeof doEach !== 'function') doEach = function(item,index) {};
		for (var i = 0; i < elements.length; i++) doEach(elements[i],i);
		return this;
	};
	
	/**
	 * Set event on all DOM elements in list
	 */
	this.event = function(event,doEvent) {
		if (elements.length < 1) return this;
		if (typeof event == 'undefined') return this;
		if (typeof doEvent != 'function') return this;
		this.each(function(item,index) {
			item.event(event,doEvent);
		});
		return this;
	};
	
	/**
	 * Get DOM element by index
	 */
	this.get = function(i) {
		if (elements.length < 1) return empty;
		if (i < 0) return empty;
		if (i > elements.length-1) return empty;
		index = i;
		return elements[index];
	};
	
	/**
	 * Get first element in list
	 */
	this.first = function() {
		if (elements.length < 1) return empty;
		index = 0;
		return elements[index];
	};
	
	/**
	 * Hide all DOM elements
	 */
	this.hide = function() {
		if (elements.length < 1) return this;
		this.each(function(item) {
			item.hide();
		});
		return this;
	};
	
	/**
	 * Get/Set html from all DOM elements in list
	 */
	this.html = function(newHTML) {
		if (typeof newHTML != 'undefined') {
			this.each(function(item) {
				item.html(newHTML);
			});
		} else {
			if (elements.length < 1) return null;
			else if (elements.length == 1) return this.first().html();
			else {
				var array = [];
				this.each(function(item) {
					array.push(item.html());
				});
				return array;
			}
		}
		return this;
	};
	
	/**
	 * Get current index
	 */
	this.index = function(newIndex) {
		if (elements.length < 1) return -1;
		if (typeof newIndex != 'undefined') {
			if (newIndex < 0) index = 0;
			else if (newIndex > elements.length-1) index = elements.length-1;
			else index = newIndex;
		} else return index;
		return this;
	};
	
	/**
	 * Get last element in list
	 */
	this.last = function() {
		if (elements.length < 1) return empty;
		index = elements.length-1;
		return elements[index];
	};
	
	/**
	 * Get next element in list
	 */
	this.next = function() {
		if (elements.length < 1) return empty;
		index++;
		if (index > elements.length-1) {
			index = elements.length-1;
			return empty;
		}
		return elements[index];
	};
	
	/**
	 * Prepend html to all DOM elements in list
	 */
	this.prepend = function(newHTML) {
		if (typeof newHTML == 'undefined') return this;
		this.each(function(item) {
			item.prepend(newHTML);
		});
		return this;
	};
	
	/**
	 * Remove all DOM elements from list
	 */
	this.remove = function() {
		if (elements.length < 1) return this;
		this.each(function(item) {
			item.remove();
		});
		return this;
	};
	
	/**
	 * Reset form
	 */
	this.reset = function() {
		if (elements.length < 1) return this;
		this.each(function(item) {
			if (typeof item.reset == 'function') item.reset();
		});
		return this;
	};
	
	/**
	 * Get/Set select option in all DOM elements
	 */
	this.selected = function(value) {
		if (typeof value != 'undefined') {
			this.each(function(item) {
				item.selected(value);
			});
		} else {
			if (elements.length < 1) return null;
			else if (elements.length == 1) return this.first().selected();
			else {
				var array = [];
				this.each(function(item) {
					array.push(item.selected());
				});
				return array;
			}
		}
		return this;
	};
	
	/**
	 * Show all DOM elements
	 */
	this.show = function(type) {
		if (elements.length < 1) return this;
		this.each(function(item) {
			item.show(type);
		});
		return this;
	};
	
	/**
	 * Submit form
	 */
	this.submit = function() {
		if (elements.length < 1) return this;
		this.each(function(item) {
			if (typeof item.submit == 'function') item.submit();
		});
		return this;
	};
};

/**
 * Array.forEach(fn,scope)
 * Array foreach
 */
if (!Array.prototype.forEach) {
	Array.prototype.forEach = function(fn,scope) {
		var i;
		var len;
		for (i = 0, len = this.length; i < len; ++i) {
			if (i in this) fn.call(scope,this[i],i,this);
		}
		return this;
	};
}

/**
 * Element.append()
 * Append html to DOM element
 * Note: Have to overwrite the prototypes for chrome based browsers, they do the same but escape the HTML!
 */
if (!Element.prototype.append || !!window.chrome) {
	Element.prototype.append = function(newHTML) {
		this.innerHTML = this.innerHTML + newHTML;
		return this;
	};
}

/**
 * Element.attr(key,value)
 * Get/Set attribute on DOM element
 */
if (!Element.prototype.attr) {
	Element.prototype.attr = function(key,value) {
		if (typeof key == 'undefined') return this;
		if (typeof value == 'undefined') return this.getAttribute(key);
		else this.setAttribute(key,value);
		return this;
	};
}

/**
 * Element.css(key,value)
 * Get/Set css on DOM element
 */
if (!Element.prototype.css) {
	Element.prototype.css = function(key,value,prefix) {
		if (typeof key == 'undefined') return this;
		if (typeof prefix != 'boolean') prefix = false;
		if (key.indexOf('-') > -1) {
			key = key.replace(/\-[a-z]/g,function(x) {
				return x[1].toUpperCase();
			});
		}
		if (typeof value == 'undefined') return this.style[key];
		else {
			if (prefix) for (var k in FW_View$CSSPrefix) this.style['-'+FW_View$CSSPrefix[k]+'-'+key] = value;
			this.style[key] = value;
		}
		return this;
	};
}

/**
 * Element.event(event,doEvent)
 * Set event handler on DOM element
 */
if (!Element.prototype.event) {
	Element.prototype.event = function(event,doEvent) {
		if (typeof event == 'undefined') return this;
		if (typeof doEvent != 'function') doEvent = function(element) {};
		this[event] = doEvent;
		return this;
	};
}

/**
 * Element.hide()
 * Hide DOM element
 */
if (!Element.prototype.hide) {
	Element.prototype.hide = function() {
		this.style.display = 'none';
		return this;
	};
}

/**
 * Element.html()
 * Get/Set html on DOM element
 */
if (!Element.prototype.html) {
	Element.prototype.html = function(newHTML) {
		if (typeof newHTML != 'undefined') this.innerHTML = newHTML;
		else return this.innerHTML;
		return this;
	};
}

/**
 * Element.prepend()
 * Prepend html to DOM element
 * Note: Have to overwrite the prototypes for chrome based browsers, they do the same but escape the HTML!
 */
if (!Element.prototype.prepend || !!window.chrome) {
	Element.prototype.prepend = function(newHTML) {
		this.innerHTML = newHTML + this.innerHTML;
		return this;
	};
}

/**
 * Element.remove()
 * Remove DOM element
 */
if (!Element.prototype.remove) {
	Element.prototype.remove = function() {
		this.parentElement.removeChild(this);
		return this;
	};
}

/**
 * Element.selected()
 * Get/Set select option in DOM element
 */
if (!Element.prototype.selected) {
	Element.prototype.selected = function(value) {
		if (typeof this.options != 'object' || typeof this.selectedIndex != 'number') return false;
		if (typeof value == 'undefined') return this.options[this.selectedIndex].value;
		for (var i = 0, l = this.options.length; i < l; i++) {
			if (this.options[i].value == value) {
				this.selectedIndex = i;
				return true;
			}
		}
		return false;
	};
}

/**
 * Element.show()
 * Show DOM element
 */
if (!Element.prototype.show) {
	Element.prototype.show = function(type) {
		if (typeof type == 'undefined') type = '';
		this.style.display = type;
		return this;
	};
}

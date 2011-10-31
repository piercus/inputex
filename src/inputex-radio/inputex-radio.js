/**
 * @module inputex-radio
 */
Gi.addModule("inputex-radio", function(I){

   var lang = I.Lang;
	
	/**
	 * Create a radio button. Here are the added options :
	 * <ul>
	 *	 <li>choices: list of choices (array of string)</li>
	 *	 <li>values: list of returned values (array )</li>
	 *	 <li>allowAny: add an option with a string field</li>
	 * </ul>
	 * @class inputEx.RadioField
	 * @extends inputEx.Field
	 * @constructor
	 * @param {Object} options inputEx.Field options object
	 */
	I.RadioField = function (options) {
		
		I.RadioField.superclass.constructor.call(this,options);
		
		// IE BUG: doesn't want to set the value if the node is not in the DOM
		if (I.UA.ie && !lang.isUndefined(this.options.value)) {
			// Set the initial value, use setTimeout to escape the stack (for nested usage in Group or Form)
			var that = this;
			setTimeout(function () {
				that.setValue(that.options.value, false);
			},0);
		}
		
	};
		
	I.extend(I.RadioField, I.Field, {
		
		/**
		 * Adds the Radio button specific options
		 * @param {Object} options Options object as passed to the constructor
		 */
		setOptions: function (options) {
			
			var i, length;
			
			I.RadioField.superclass.setOptions.call(this, options);
			
			// Display mode
			this.options.display = options.display === "vertically" ? "vertically" : "inline"; // default "inline"
			
			// Classname
			this.options.className = options.className ? options.className : 'inputEx-Field inputEx-RadioField';
			if (this.options.display === "vertically") {
				this.options.className +=  ' inputEx-RadioField-Vertically';
			}
			
			// Choices creation
			
			// Retro-compatibility with old pattern (DEPRECATED since 2010-06-30)
			if (lang.isArray(options.values)) {
				
				this.options.choices = [];
				
				for (i = 0, length = options.values.length; i < length; i += 1) {
					this.options.choices.push({ value: options.values[i], label: options.choices[i] });
				}
			
			// New pattern to define choices
			} else {
				
				this.options.choices = options.choices; // ['val1','val2'] or [{ value: 'val1', label: '1st Choice' }, etc.]
				
			}
			
			if (lang.isUndefined(options.allowAny) || options.allowAny === false ) {
				this.options.allowAny = false;
			} else {
				this.options.allowAny = {};
				if (lang.isArray(options.allowAny.separators)) { this.options.allowAny.separators = options.allowAny.separators;}
				this.options.allowAny.validator = lang.isFunction(options.allowAny.validator) ? options.allowAny.validator : function (val) {return true;};
				this.options.allowAny.value = !lang.isUndefined(options.allowAny.value) ? options.allowAny.value : "";
				this.options.allowAny.field = lang.isUndefined(options.allowAny.field) ? { type: "string", value: this.options.allowAny.value } : options.allowAny.field;
			}
			
		},
		
		/**
		 * Render the checkbox and the hidden field
		 */
		renderComponent: function () {
			
			var choices, length, i, sep;
			
			this.choicesList = [];
			
			choices = this.options.choices;
			
			for (i = 0, length = choices.length ; i < length ; i += 1 ) {
				
				this.addChoice(choices[i]);
				
			}
			
			// Build a "any" radio combined with a StringField
			if (this.options.allowAny) {
				
				this.allowAnyChoice = this.addChoice({ value: this.options.allowAny.value, label:'' });
				
				this.radioAny = this.allowAnyChoice.node.firstChild;
				
				this.anyField = new I.inputEx(this.options.allowAny.field);
				this.anyField.disable();
				
				I.one(this.radioAny).setStyle("float","left");
				I.one(this.anyField.getEl()).setStyle("float","left");
				
				// Hack for firefox 3.5+
				if (I.UA.gecko >= 1.91) { I.one(this.radioAny).setStyle( "marginTop","0.2em"); }
				
				
				if (this.options.allowAny.separators) {
					sep = I.cn("div",null,{marginRight:"3px"},this.options.allowAny.separators[0] || '');
					I.one(sep).setStyle( "float","left");
					this.allowAnyChoice.node.appendChild(sep);
				}
				
				this.allowAnyChoice.node.appendChild(this.anyField.getEl());
				
				if (this.options.allowAny.separators) {
					sep = I.cn("div",null,{marginLeft:"3px"},this.options.allowAny.separators[1] || '');
					I.one(sep).setStyle( "float","left");
					this.allowAnyChoice.node.appendChild(sep);
				}
				
			}
			
		},
		
		/**
		 * Listen for change events on all radios
		 */
		initEvents: function () {
			// TO DO
			// Delegate event listening because list of choices is dynamic
			// so we can't listen on each <input type="radio" class='inputEx-RadioField-radio' />
			
            // var fieldContainer = this.fieldContainer, that = this;
            // 
            // // Change event (IE does not fire "change" event, so listen to click instead)
            // fieldContainer.delegate(I.UA.ie ? "click" : "change", function(e, matchedEl, container) {
            //  that.onChange(e);
            // }, ".inputEx-RadioField-radio", "input");
            // 
            // // Focus / Blur events
            // fieldContainer.delegate("focusin", function(e, matchedEl, container) {
            //  that.onFocus(e);
            // }, ".inputEx-RadioField-radio", "input");
            // 
            // fieldContainer.delegate("focusout", function(e, matchedEl, container) {
            //  that.onBlur(e);
            // }, ".inputEx-RadioField-radio", "input");
            // 
            // // AnyField events
            // if (this.allowAnyChoice) {
            //  
            //  this.anyField.on('updated', function (e, params) {
            //      
            //      var value = params[0];
            //      this.radioAny.value = value;
            //      
            //      this.setClassFromState();
            //      
            //      I.RadioField.superclass.onChange.call(this,e);
            //      
            //  }, this, true);
            //  
            //  // Update radio field style after editing anyField content !
            //             if(this.anyField.el) {
            //                I.one(this.anyField.el).on('blur', this.onBlur, this, true);
            //             }
            // }
		},
		
		/**
		 * Add an additional class to the currently selected inputEx-RadioField-choice
		 */
		setSelectedClass: function () {
			
			var i, length;
			
			for (i = 0, length = this.choicesList.length ; i < length ; i += 1) {
				
				if (this.choicesList[i].node.firstChild.checked) {
					I.one(this.choicesList[i].node).addClass("inputEx-selected");
				} else {
					I.one(this.choicesList[i].node).removeClass("inputEx-selected");
				}
				
			}
		},
		
		setClassFromState: function () {
			
			// call superclass method (will fire updated event)
			I.RadioField.superclass.setClassFromState.call(this);
			
			this.setSelectedClass();
			
		},
		
		/**
		 * Function called when the checkbox is toggled
		 * @param {Event} e The original 'change' event
		 */
		onChange: function (e) {
			var target = e.target._node;
			
			// Enable/disable the "any" field
			if (this.allowAnyChoice) {
				
				var clickedOnAllowAnyChoice = I.indexOf(target, this.choicesList, function(el,arrEl) { return el === arrEl.node.firstChild; }) !== -1 && this.radioAny === target;
				
				// if clicked another choice than allowAnyChoice
				if (!clickedOnAllowAnyChoice) {
					this.anyField.disable();
				} else {
					this.anyField.enable();
					lang.later( 50 , this.anyField , "focus");
				}
				
			}
			
			this.setSelectedClass();
			
			// call superclass method (will fire updated event)
			I.RadioField.superclass.onChange.call(this,e);
		},
		
		/**
		 * Get the field value
		 * @return {Any} 
		 */
		getValue: function () {
			
			var i, length;
			
			for (i = 0, length = this.choicesList.length ; i < length ; i += 1) {
				
				if (this.choicesList[i].node.firstChild.checked) {
					
					if (this.radioAny && this.radioAny == this.choicesList[i].node.firstChild) {
						return this.anyField.getValue();
					}
					
					return this.choicesList[i].value;
				}
			}
			
			return "";
		},
		
		/**
		 * Set the value of the Radio
		 * @param {Any} value The value schould be one of this.options.values (which defaults to this.options.choices if missing) if allowAny option not true.
		 * @param {boolean} [sendUpdatedEvt] (optional) Wether this setValue should fire the updated event or not (default is true, pass false to NOT send the event)
		 */
		setValue: function (value, sendUpdatedEvt) {
			
			var checkAny = true, valueFound = false, i, length;
			
			for (i = 0, length = this.choicesList.length ; i < length ; i += 1) {
				
				// valueFound is a useful when "real" choice has a value equal to allowAny choice default value
				// so we check only the first value-matching radio button
				if (value === this.choicesList[i].value && !valueFound) {
					
					// check the radio
					this.choicesList[i].node.firstChild.checked = true;
					
					// radioAny should not be checked (unless current choice is radioAny !)
					checkAny = this.radioAny && (i === length - 1) ? true : false;
					
					// raise valueFound flag, all other radios should be unchecked now
					valueFound = true;
					
				} else {
					this.choicesList[i].node.firstChild.checked = false;
				}
				
			}
			
			// Option allowAny
			if (this.radioAny) {
				
				if (checkAny) {
					this.radioAny.checked = true;
					this.radioAny.value = value;
					this.anyField.enable();
					this.anyField.setValue(value, false);
				} else {
					this.anyField.disable();
				}
			}
			
			// call parent class method to set style and fire updated event
			I.RadioField.superclass.setValue.call(this, value, sendUpdatedEvt);
		},
		
		/**
		 * Clear the field by setting the field value to this.options.value
		 * @param {boolean} [sendUpdatedEvt] (optional) Wether this clear should fire the updated event or not (default is true, pass false to NOT send the event)
		 */
		clear: function (sendUpdatedEvt) {
			
			if (this.radioAny){
				this.anyField.setValue(this.options.allowAny.value, false);
			}
		
			I.RadioField.superclass.clear.call(this, sendUpdatedEvt);
		},
		
		/**
		 * Should return true if empty
		 */
		isEmpty: function () {
			
			var i, length, radioInput;
			
			for (i = 0, length = this.choicesList.length ; i < length ; i += 1) {
				
				radioInput = this.choicesList[i].node.firstChild;
				
				if (radioInput.checked) {
					
					// if "any" option checked
					if (this.radioAny && this.radioAny == radioInput) {
						
						return this.anyField.getValue() === '';
						
					} else {
						
						return false;
						
					}
				}
			}
			
			return true;
			
		},
		
		validate: function () {
			
			var i, length, radioInput, anyVal;
			
			if (this.options.allowAny) {
				
				for (i = 0, length = this.choicesList.length ; i < length ; i += 1) {
					
					radioInput = this.choicesList[i].node.firstChild;
					
					if (radioInput.checked) {
						
						// if "any" option checked
						if (this.radioAny && this.radioAny == radioInput) {
							anyVal = this.anyField.getValue();
							return this.anyField.validate() && this.options.allowAny.validator(anyVal);
						}
					}
				}
			}
			
			return true;
		},
		
		/**
		 * Disable the field
		 */
		disable: function () {
			
			var i, length;
			
			for (i = 0, length = this.choicesList.length; i < length; i += 1) {
				this.disableChoice(this.choicesList[i], false);
			}
			
		},
	
		/**
		 * Enable the field
		 */
		enable: function () {
			
			var i, length;
			
			for (i = 0, length = this.choicesList.length; i < length; i += 1) {
				this.enableChoice(this.choicesList[i]);
			}
			
		},
		
		createChoiceNode: function (choice) {
			
			var div, radioId, radioNode, labelNode;
			
			div = I.cn('div', {className: 'inputEx-RadioField-choice'});
			
			// radioId MUST be different for each option, to allow click on label (with for:id trick)
			if(!I.RadioField._idCounter) {
			   I.RadioField._idCounter = 0;
			}
			radioId = "_inputex_radioId"+I.RadioField._idCounter;
			I.RadioField._idCounter++;
			
			radioNode = I.cn('input', { id: radioId, type: 'radio', name: this.options.name, value: choice.value, className: 'inputEx-RadioField-radio' });
			div.appendChild(radioNode);
			
			if (choice.label.length > 0) {
				labelNode = I.cn('label', {"for": radioId, className: 'inputEx-RadioField-rightLabel'}, null, ""+choice.label);
				div.appendChild(labelNode);
			}
			
			return div;
			
		},
		
		removeChoiceNode: function (node) {
			
			// remove from selector
			// 
			//   -> style.display = 'none' would work only on FF (when node is an <option>)
			//   -> other browsers (IE, Chrome...) require to remove <option> node from DOM
			//
			this.fieldContainer.removeChild(node);
			
		},
		
		disableChoiceNode: function (node) {
			
			//node.firstChild.disabled = "disabled";
			node.firstChild.disabled = true;
		},
		
		enableChoiceNode: function (node) {
			
			//node.firstChild.removeAttribute("disabled");
			node.firstChild.disabled = false;
			
		},
		
		/**
		 * Attach an <option> node to the <select> at the specified position
		 * @param {HTMLElement} node The <option> node to attach to the <select>
		 * @param {Int} position The position of the choice in choicesList (may not be the "real" position in DOM)
		 */
		appendChoiceNode: function (node, position) {
			
			var domPosition, i;
			
			// Compute real DOM position (since previous choices in choicesList may be hidden)
			domPosition = 0;
			
			for (i = 0; i < position; i += 1) {
				
				if (this.choicesList[i].visible) {
					
					domPosition += 1;
					
				}
				
			}
			
			// Insert in DOM
			if (domPosition < this.fieldContainer.childNodes.length) {
				I.one(this.fieldContainer).insertBefore(node, this.fieldContainer.childNodes[domPosition]);
			} else {
				
				this.fieldContainer.appendChild(node);
				
			}
		}
		
	});
	
	// Augment prototype with choice mixin (functions : addChoice, removeChoice, etc.)
	I.mix(I.RadioField.prototype, I.mixin.choice);
	
	
	// Register this class as "radio" type
	I.registerType("radio", I.RadioField, [
		{
			type: 'list',
			name: 'choices',
			label: 'Choices',
			elementType: {
				type: 'group',
				fields: [
					{ label: 'Value', name: 'value', value: '' }, // not required to allow '' value (which is default)
					{ label: 'Label', name: 'label' } // optional : if left empty, label is not created
				]
			},
			value: [],
			required: true
		},
		{type: 'boolean', label: 'Allow custom value', name: 'allowAny', value: false  }
	]);
	
}, '3.0.0a',{
  requires: ['inputex-field','inputex-choice','inputex-string']
});
	
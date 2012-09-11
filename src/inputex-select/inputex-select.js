/**
 * @module inputex-select
 */
gI.addModule("inputex-select",function(I){

	var lang = I.Lang;
	/**
	 * Create a select field
	 * @class inputEx.SelectField
	 * @extends inputEx.Field
	 * @constructor
	 * @param {Object} options Added options:
	 * <ul>
	 *    <li>choices: contains the list of choices configs ([{value:'usa'}, {value:'fr', label:'France'}]) OR a function function(opts,cb)</li>
	 * </ul>
	 */
	I.SelectField = function (options) {
		I.SelectField.superclass.constructor.call(this, options);
	};

	I.extend(I.SelectField, I.Field, {
		
		/**
		 * Set the default values of the options
		 * @param {Object} options Options object as passed to the constructor
		 */
		setOptions: function (options) {
		
			var i, length;
		
			I.SelectField.superclass.setOptions.call(this, options);
			
			if(lang.isArray(options.choices)){
			    this.options.choices = options.choices;
			    this.choicesReady = true;
			} else if (lang.isFunction(options.choices)) {
			    // create choices in a callback
			    this.choicesReady = false;
			    this.options.choices = options.choices;
			} else {
			    this.options.choices = false;
			    this.choicesReady = true;
			}	
				
			// Retro-compatibility with old pattern (changed since 2010-06-30)
			if (lang.isArray(options.selectValues)) {
			
				for (i = 0, length = options.selectValues.length; i < length; i += 1) {
				
					this.options.choices.push({
						value: options.selectValues[i],
						label: "" + ((options.selectOptions && !lang.isUndefined(options.selectOptions[i])) ? options.selectOptions[i] : options.selectValues[i])
					});
				
				}
			}
		
		},
		buildChoices: function(){
		    var self = this;
		    var cb = function(res){
		        self.options.choices = res;
		        self.choicesReady = true;
		        self.renderComponent();
		    };
		    try {
		      this.options.choices.call(this,this.options,cb);
	        } catch(e) {
	          if(window.console){
	            console.log("choices are not ready",e,e.stack);
              }
              self.choicesReady = false;
	        }
		},
	
		/**
		 * Build a select tag with options
		 */
		renderComponent: function () {
		    if (!this.choicesReady) { return this.buildChoices(); } 
			var i, length;
		
			// create DOM <select> node
			this.fieldEl = I.cn('select', {
			
				id: this.divEl.id ? this.divEl.id + '-field' : I.guid(),
				name: this.options.name || ''
			
			});
		
			// list of choices (e.g. [{ label: "France", value:"fr", node:<DOM-node>, visible:true }, {...}, ...])
			this.choicesList = [];
		
			// add choices
			for (i = 0, length = this.options.choices.length; i < length; i += 1) {
				this.addChoice(this.options.choices[i]);
			}
		
			// append <select> to DOM tree
			this.fieldContainer.appendChild(this.fieldEl);
		},
	
		/**
		 * Register the "change" event
		 */
		initEvents: function () {
			I.on("change", this.onChange, this.fieldEl, this);
			I.on("focus", this.onFocus, this.fieldEl,this);
			I.on("blur", this.onBlur, this.fieldEl,this);
		},
	
		/**
		 * Set the value
		 * @param {String} value The value to set
		 * @param {boolean} [sendUpdatedEvt] (optional) Wether this setValue should fire the 'updated' event or not (default is true, pass false to NOT send the event)
		 */
		setValue: function (value, sendUpdatedEvt) {
		
			var i, length, choice, firstIndexAvailable, choiceFound = false;
		
			for (i = 0, length = this.choicesList.length; i < length ; i += 1) {
			
				if (this.choicesList[i].visible) {
				
					choice = this.choicesList[i];
				
					if (value === choice.value) {
					
						choice.node.selected = "selected";
						choiceFound = true;
						break; // choice node already found
					
					} else if (lang.isUndefined(firstIndexAvailable)) {
					
						firstIndexAvailable = i;
					}
				
				}
			
			}
			
			// select value from first choice available when
			// value not matching any visible choice
			//
			// if no choice available (-> firstIndexAvailable is undefined), skip value setting
			if (!choiceFound && !lang.isUndefined(firstIndexAvailable)) {
				
				choice = this.choicesList[firstIndexAvailable];
				choice.node.selected = "selected";
				value = choice.value;
				
			}
			
			// Call Field.setValue to set class and fire updated event
			I.SelectField.superclass.setValue.call(this, value, sendUpdatedEvt);
		},
	
		/**
		 * Return the value
		 * @return {Any} the selected value
		 */
		getValue: function () {
			if(!this.choicesReady){ return ""; }
		
			var choiceIndex;
			if (this.fieldEl.selectedIndex >= 0) {
				
				choiceIndex = I.indexOf(this.fieldEl.childNodes[this.fieldEl.selectedIndex], this.choicesList, function (node, choice) {
					return node === choice.node;
				});
			
				return this.choicesList[choiceIndex].value;
				
			} else {
				
				return "";
				
			}
		},
	
		/**
		 * Disable the field
		 */
		disable: function () {
			this.fieldEl.disabled = true;
		},

		/**
		 * Enable the field
		 */
		enable: function () {
			this.fieldEl.disabled = false;
		},
		
		createChoiceNode: function (choice) {
			
			return I.cn('option', {value: choice.value}, null, choice.label);
			
		},
		
		removeChoiceNode: function (node) {
			
			// remove from selector
			// 
			//   -> style.display = 'none' would work only on FF (when node is an <option>)
			//   -> other browsers (IE, Chrome...) require to remove <option> node from DOM
			//
			this.fieldEl.removeChild(node);
			
		},
		
		disableChoiceNode: function (node) {
			
			node.disabled = "disabled";
			
		},
		
		enableChoiceNode: function (node) {
			
			node.removeAttribute("disabled");
			
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
			if (domPosition < this.fieldEl.childNodes.length) {
				I.insert(this.fieldEl,node,domPosition)
			} else {
				
				this.fieldEl.appendChild(node);
				
			}
		},	
		// Add stringField setFieldName for classic form in group in listField
		setFieldName: function(name) {
			this.fieldEl.name = name;
    },
    
    // used in multi field, when select is the addField
    getLabel : function(v){
      for(var i = 0; i < this.choicesList.length; i++){
        if(this.choicesList[i].value === v){
          return this.choicesList[i].label;
        }
      }
      return v;
    }
		
	});
	
	// Augment prototype with choice mixin (functions : addChoice, removeChoice, etc.)
	I.mix(I.SelectField.prototype, I.mixin.choice);
	
	
	// Register this class as "select" type
	I.registerType("select", I.SelectField, [
		{
			type: 'list',
			name: 'choices',
			label: 'Choices',
			elementType: {
				type: 'group',
				fields: [
					{ label: 'Value', name: 'value', value: '' }, // not required to allow '' value (which is default)
					{ label: 'Label', name: 'label' } // optional : if left empty, label is same as value
				]
			},
			value: [],
			required: true
		}
	]);

}, '3.0.0a',{
  requires: ['inputex-field','inputex-choice']
});

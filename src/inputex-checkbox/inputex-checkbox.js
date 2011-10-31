/**
 * @module inputex-checkbox
 */
Gi.addModule("inputex-checkbox",function(I){

   var lang = I.Lang;

/**
 * Create a checkbox.
 * @class inputEx.CheckBox
 * @extends inputEx.Field
 * @constructor
 * @param {Object} options Added options for CheckBoxes:
 * <ul>
 *   <li>sentValues: 2D vector of values for checked/unchecked states (default is [true, false])</li>
 * </ul>
 */
I.CheckBox = function(options) {
	I.CheckBox.superclass.constructor.call(this,options);
};
	
I.extend(I.CheckBox, I.Field, {
	   
	/**
	 * Adds the CheckBox specific options
	 * @param {Object} options Options object as passed to the constructor
	 */
	setOptions: function(options) {
	   I.CheckBox.superclass.setOptions.call(this, options);
	   
	   // Overwrite options:
	   this.options.className = options.className ? options.className : 'inputEx-Field inputEx-CheckBox';
	   
	   this.options.rightLabel = options.rightLabel || '';
	   
	   // Added options
	   this.sentValues = options.sentValues || [true, false];
	   this.options.sentValues = this.sentValues; // for compatibility
	   this.checkedValue = this.sentValues[0];
	   this.uncheckedValue = this.sentValues[1];
	},
	   
	/**
	 * Render the checkbox and the hidden field
	 */
	renderComponent: function() {
	
   	var checkBoxId = this.divEl.id?this.divEl.id+'-field':I.guid();
	   this.el = I.cn('input', { id: checkBoxId, type: 'checkbox' });

	   this.fieldContainer.appendChild(this.el);
	
	   this.rightLabelEl = I.cn('label', {"for": checkBoxId, className: 'inputEx-CheckBox-rightLabel'}, null, this.options.rightLabel);
	   this.fieldContainer.appendChild(this.rightLabelEl);
	
	   // Keep state of checkbox in a hidden field (format : this.checkedValue or this.uncheckedValue)
	   // This is useful for non-javascript form submit (it allows custom checked/unchecked values to be submitted)
	   this.hiddenEl = I.cn('input', {type: 'hidden', name: this.options.name || '', value: this.uncheckedValue});
	   this.fieldContainer.appendChild(this.hiddenEl);
	},
	   
	/**
	 * Clear the previous events and listen for the "change" event
	 */
	initEvents: function() {
	   
	   // Awful Hack to work in IE6 and below (the checkbox doesn't fire the change event)
	   // It seems IE 8 removed this behavior from IE7 so it only works with IE 7 ??
	   /*if( YAHOO.env.ua.ie && parseInt(YAHOO.env.ua.ie,10) != 7 ) {
	      Event.addListener(this.el, "click", function() { this.fireUpdatedEvt(); }, this, true);	
	   }*/
	   if( I.UA.ie ) {
	       // to do : wrapper branch
          // I.on("click", function(e) {
          //      I.later(10,this,function(){this.onChange(e);}); 
          // },this.el, this);  
	   } else {
	     I.on("change", this.onChange,this.el, this);
	   }
	   
	   I.on("focus", this.onFocus,this.el , this);
	   I.on("blur", this.onBlur, this.el, this);
	},
	   
	/**
	 * Function called when the checkbox is toggled
	 * @param {Event} e The original 'change' event
	 */
	onChange: function(e) {
	   this.hiddenEl.value = this.el.checked ? this.checkedValue : this.uncheckedValue;
	
	   I.CheckBox.superclass.onChange.call(this,e);
	},
	
	/**
	 * Get the state value
	 * @return {Any} one of [checkedValue,uncheckedValue]
	 */
	getValue: function() {
	      return this.el.checked ? this.checkedValue : this.uncheckedValue;
	},
	
	/**
	 * Set the value of the checkedbox
	 * @param {Any} value The value schould be one of [checkedValue,uncheckedValue]
    * @param {boolean} [sendUpdatedEvt] (optional) Wether this setValue should fire the 'updated' event or not (default is true, pass false to NOT send the event)
	 */
	setValue: function(value, sendUpdatedEvt) {
	   if (value===this.checkedValue || (typeof(value) == 'string' && typeof(this.checkedValue) == 'boolean' &&
		value === String(this.checkedValue))) {
			this.hiddenEl.value = this.checkedValue;
			
			// check checkbox (all browsers)
			this.el.checked = true;
			
			// hacks for IE6, because input is not operational at init, 
			// so "this.el.checked = true" would work for default values !
			// (but still work for later setValue calls)
			if (I.UA.ie === 6) {
			   this.el.setAttribute("defaultChecked","checked"); // for IE6
		   }
		}
	   else {
	      // DEBUG :
	      /*if (value!==this.uncheckedValue && lang.isObject(console) && lang.isFunction(console.log) ) {
	         console.log("inputEx.CheckBox: value is *"+value+"*, schould be in ["+this.checkedValue+","+this.uncheckedValue+"]");
         }*/
			this.hiddenEl.value = this.uncheckedValue;
			
			// uncheck checkbox (all browsers)
		   this.el.checked = false;
		   
			// hacks for IE6, because input is not operational at init, 
			// so "this.el.checked = false" would work for default values !
			// (but still work for later setValue calls)
			if (I.UA.ie === 6) {
			   this.el.removeAttribute("defaultChecked"); // for IE6
		   }
		}
		
		// Call Field.setValue to set class and fire updated event
		I.CheckBox.superclass.setValue.call(this,value, sendUpdatedEvt);
	},
	
	/**
    * Disable the field
    */
   disable: function() {
      this.el.disabled = true;
   },

   /**
    * Enable the field
    */
   enable: function() {
      this.el.disabled = false;
   }
	
});   
	
// Register this class as "boolean" type
I.registerType("boolean", I.CheckBox, [ 
   {type: 'string', label: 'Right Label', name: 'rightLabel'}
]);
	
}, '0.0.1',{
  requires: ["inputex-field"]
});

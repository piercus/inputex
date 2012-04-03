/**
 * @module inputex-list
 */
gI.addModule("inputex-list",function(I){
	
   var lang = I.Lang;
	
/**
 * Meta field to create a list of other fields
 * @class inputEx.ListField
 * @extends inputEx.Field
 * @constructor
 * @param options Added options:
 * <ul>
 *   <li>sortable: Add arrows to sort the items if true (default false)</li>
 *   <li>elementType: an element type definition (default is {type: 'string'})</li>
 *   <li>useButtons: use buttons instead of links (default false)</li>
 *   <li>unique: require values to be unique (default false)</li>
 *   <li>listAddLabel: if useButtons is false, text to add an item</li>
 *   <li>appendFirst: boolean, if true then a new element is add at the top of the list</li>
 *   <li>listRemoveLabel: if useButtons is false, text to remove an item</li>
 *   <li>maxItems: maximum number of items (leave undefined if no maximum, default)</li>
 *   <li>minItems: minimum number of items to validate (leave undefined if no minimum, default)</li>
 * </ul>
 */
I.ListField = function(options) {
	   
   /**
    * List of all the subField instances
    */
   this.subFields = [];
	   
   I.ListField.superclass.constructor.call(this, options);
};
I.extend(I.ListField,I.Field, {

	/**
	 * Colors for the animation
	 */
	arrowAnimColors: { 
		from: '#eeee33',
		to: '#eeeeee' 
	},
	   
	/**
	 * Set the ListField classname
	 * @param {Object} options Options object as passed to the constructor
	 */
	setOptions: function(options) {
	   I.ListField.superclass.setOptions.call(this, options);
	   
	   this.options.className = options.className ? options.className : 'inputEx-Field inputEx-ListField';
	   
	   this.options.sortable = lang.isUndefined(options.sortable) ? false : options.sortable;
	   this.options.elementType = options.elementType || {type: 'string'};
	   this.options.useButtons = lang.isUndefined(options.useButtons) ? false : options.useButtons;
	   this.options.unique = lang.isUndefined(options.unique) ? false : options.unique;
	   this.options.appendFirst = lang.isUndefined(options.appendFirst) ? false : options.appendFirst;
	   
	   this.options.listAddLabel = options.listAddLabel || I.messages.listAddLink;
	   this.options.listLabel = options.listLabel;
	   this.options.listRemoveLabel = options.listRemoveLabel || I.messages.listRemoveLink;
	   
	   this.options.maxItems = options.maxItems;
	   this.options.minItems = options.minItems;
	},
	   
	/**
	 * Render the addButton 
	 */
	renderComponent: function() {
	      
	   // Add element button
	   if(this.options.useButtons) {
	      this.addButton = I.cn('img', {src: I.spacerUrl, className: 'inputEx-ListField-addButton'});
	      this.fieldContainer.appendChild(this.addButton);
      }
	      
	   // List label
	   this.fieldContainer.appendChild( I.cn('span', null, {marginLeft: "4px"}, this.options.listLabel) );
	      
	   // Div element to contain the children
	   this.childContainer = I.cn('div', {className: 'inputEx-ListField-childContainer'});
	   this.fieldContainer.appendChild(this.childContainer);
	   
	   // Add link
	   if(!this.options.useButtons) {
	      this.addButton = I.cn('a', {className: 'inputEx-List-link'}, null, this.options.listAddLabel);
	      this.fieldContainer.appendChild(this.addButton);
      }
	},
	   
	/**
	 * Handle the click event on the add button
	 */
	initEvents: function() {
	   I.on('click', this.onAddButton,this.addButton, this);
	},
	
	/**
    * Validate each field
    * @returns {Boolean} true if all fields validate, required fields are not empty and unique constraint (if specified) is not violated
    */
   validate: function() {

      var response = true;
      
      var uniques = {}; // Hash for unique values option
      var l = this.subFields.length;

      // Validate maxItems / minItems
      if( lang.isNumber(this.options.minItems) && l < this.options.minItems  ) {
         response = false;
      }
      if( lang.isNumber(this.options.maxItems) && l > this.options.maxItems  ) {
         response = false;
      }

      // Validate all the sub fields
      for (var i = 0 ; i < l && response; i++) {
         var input = this.subFields[i];
         var state = input.getState();
         input.setClassFromState(state); // update field classes (mark invalid fields...)
         if( state == I.stateRequired || state == I.stateInvalid ) {
            response = false; // but keep looping on fields to set classes
         }
         if(this.options.unique) {
            var hash = lang.dump(input.getValue());
            if(uniques[hash]) {
               response = false;    // not unique
            } else {
               uniques[hash] = true;
            }
          }
      }
      return response;
   },
	   
	/**
	 * Set the value of all the subfields
	 * @param {Array} value The list of values to set
	 * @param {boolean} [sendUpdatedEvt] (optional) Wether this setValue should fire the 'updated' event or not (default is true, pass false to NOT send the event)
	 */
	setValue: function(value, sendUpdatedEvt) {
	   
	   if(!lang.isArray(value) ) {
	      throw new Error("inputEx.ListField.setValue expected an array, got "+(typeof value));
	   }
	      
	   // Set the values (and add the lines if necessary)
	   for(var i = 0 ; i < value.length ; i++) {
	      if(i == this.subFields.length) {
	         this.addElement(value[i]);
	      }
	      else {
	         this.subFields[i].setValue(value[i], false);
	      }
	   }
	      
	   // Remove additional subFields
	   var additionalElements = this.subFields.length-value.length;
	   if(additionalElements > 0) {
	      for(i = 0 ; i < additionalElements ; i++) { 
	         this.removeElement(value.length);
	      }
	   }
	   
	   I.ListField.superclass.setValue.call(this, value, sendUpdatedEvt);
	},
	   
	/**
	 * Return the array of values
	 * @return {Array} The array
	 */
	getValue: function() {
	   var values = [];
	   for(var i = 0 ; i < this.subFields.length ; i++) {
	      values[i] = this.subFields[i].getValue();
	   }
	   return values;
	},
	   
	/**
	 * Adds an element
	 * @param {Any} The initial value of the subfield to create
	 * @return {inputEx.Field} SubField added instance
	 */
	addElement: function(value) {
	
	   // Render the subField
	   var subFieldEl = this.renderSubField(value);
	
		if(this.options.name) {
	   	subFieldEl.setFieldName(this.options.name+"["+this.subFields.length+"]");
		}
	
	   // Adds it to the local list
	   this.subFields.push(subFieldEl);
	      
	   return subFieldEl;
	},
	
	/**
	 * Re-set the name of all the fields (when we remove an element)
	 */
	resetAllNames: function() {
		if(this.options.name) {
			for(var i = 0 ; i < this.subFields.length ; i++) {
				var subFieldEl = this.subFields[i];
				subFieldEl.setFieldName(this.options.name+"["+i+"]");
			}
		}
	},
	
	/**
	 * Add a new element to the list and fire updated event
	 * @param {Event} e The original click event
	 */
	onAddButton: function(e) {
	   //e.halt();
	   
	   // Prevent adding a new field if already at maxItems
	   if( lang.isNumber(this.options.maxItems) && this.subFields.length >= this.options.maxItems ) {
	      return;
	   }
	   
	   // Add a field with no value: 
	   var subFieldEl = this.addElement();
	   
	   // Focus on this field
	   subFieldEl.focus();
	   
	   // Fire updated !
	   this.fireUpdatedEvt();
	},
	   
	/**
	 * Adds a new line to the List Field
 	 * @param {Any} The initial value of the subfield to create
	 * @return  {inputEx.Field} instance of the created field (inputEx.Field or derivative)
	 */
	renderSubField: function(value) {
	      
	   // Div that wraps the deleteButton + the subField
	   var newDiv = I.cn('div',{className: 'inputEx-List-child'}), delButton, opts;
	      
	   // Delete button
	   if(this.options.useButtons) {
	      delButton = I.cn('img', {src: I.spacerUrl, className: 'inputEx-ListField-delButton'});
	      I.on('click', this.onDelete, delButton, this);
	      newDiv.appendChild( delButton );
      }
	  
	   // Instantiate the new subField
	  //when we want to render a group, it can be useful yo use a function as elemntType, to set the value as we want to
	   if(I.Lang.isFunction(this.options.elementType)){
	       opts = this.options.elementType(value);
	   } else {
	       var opts = I.copy(this.options.elementType);
	   
          // New prefered way to set options of a field
          if (!lang.isUndefined(value)) {
             opts.value = value;
          }
      }
	   var el = I.inputEx(opts,this);
	   
	   var subFieldEl = el.getEl();
	   I.addClass(subFieldEl,'inputEx-ListField-subFieldEl');
	   newDiv.appendChild( subFieldEl );
	   
	   // Subscribe the onChange event to resend it 
	   I.on("updated",this.onChange, el, this);
	
	   // Arrows to order:
	   if(this.options.sortable) {
	      var arrowUp = I.cn('div', {className: 'inputEx-ListField-Arrow inputEx-ListField-ArrowUp'});
	      I.on('click', this.onArrowUp, arrowUp, this);
	      var arrowDown = I.cn('div', {className: 'inputEx-ListField-Arrow inputEx-ListField-ArrowDown'});
	      I.on('click', this.onArrowDown, arrowDown, this);
	      newDiv.appendChild( arrowUp );
	      newDiv.appendChild( arrowDown );
	   }
	   
	   // Delete link
	   if(!this.options.useButtons) {
	      delButton = I.cn('a', {className: 'inputEx-List-link'}, null, this.options.listRemoveLabel);
	      I.on('click', this.onDelete, delButton, this);
	      newDiv.appendChild( delButton );
      }
	
	   // Line breaker
	   newDiv.appendChild( I.cn('div', null, {clear: "both"}) );
	   
	   if(this.options.appendFirst){
	        I.insert(newDiv,this.childContainer.children[0])
	   } else {
	       this.childContainer.appendChild(newDiv);
	   }
	      
	   return el;
	},
	   
	/**
	 * Switch a subField with its previous one
	 * Called when the user clicked on the up arrow of a sortable list
	 * @param {Event} e Original click event
	 */
	onArrowUp: function(e) {
	   var childElement = e.target._node.parentNode;
	   
	   var previousChildNode = null;
	   var nodeIndex = -1;
	   for(var i = 1 ; i < childElement.parentNode.childNodes.length ; i++) {
	      var el=childElement.parentNode.childNodes[i];
	      if(el == childElement) {
	         previousChildNode = childElement.parentNode.childNodes[i-1];
	         nodeIndex = i;
	         break;
	      }
	   }
	   
	   if(previousChildNode) {
	      // Remove the line
	      var removedEl = this.childContainer.removeChild(childElement);
	      
	      // Adds it before the previousChildNode
	      var insertedEl = this.childContainer.insertBefore(removedEl, previousChildNode);
	      
	      // Swap this.subFields elements (i,i-1)
	      var temp = this.subFields[nodeIndex];
	      this.subFields[nodeIndex] = this.subFields[nodeIndex-1];
	      this.subFields[nodeIndex-1] = temp;
	
			// Note: not very efficient, we could just swap the names
			this.resetAllNames();
	
	      // Color Animation
	      if(this.arrowAnim) {
	         this.arrowAnim.stop(true);
	      }
	      
          // this.arrowAnim = new Y.Anim({node:insertedEl, from: {backgroundColor: this.arrowAnimColors.from}, to : {backgroundColor: this.arrowAnimColors.to },duration: 0.4});
          // this.arrowAnim.on("end",function() { I.setStyle(insertedEl,'backgroundColor', ''); });
          // this.arrowAnim.run();
	      
	      // Fire updated !
	      this.fireUpdatedEvt();
	   }
	},
	
	/**
	 * Switch a subField with its next one
	 * Called when the user clicked on the down arrow of a sortable list
	 * @param {Event} e Original click event
	 */
	onArrowDown: function(e) {
	   var childElement = e.target._node.parentNode;
	   
	   var nodeIndex = -1;
	   var nextChildNode = null;
	   for(var i = 0 ; i < childElement.parentNode.childNodes.length ; i++) {
	      var el=childElement.parentNode.childNodes[i];
	      if(el == childElement) {
	         nextChildNode = childElement.parentNode.childNodes[i+1];
	         nodeIndex = i;
	         break;
	      }
	   }
	   
	   if(nextChildNode) {
	      // Remove the line
	      var removedEl = this.childContainer.removeChild(childElement);
	      
	      // Adds it after the nextChildNode
	      // to do : wrapper
	      var insertedEl = I.insert(removedEl, "after", nextChildNode);
	      
	      // Swap this.subFields elements (i,i+1)
	      var temp = this.subFields[nodeIndex];
	      this.subFields[nodeIndex] = this.subFields[nodeIndex+1];
	      this.subFields[nodeIndex+1] = temp;
	
			// Note: not very efficient, we could just swap the names
			this.resetAllNames();      
	
	      // Color Animation
	      // to do : color anim for branch wrapper
	      
          // if(this.arrowAnim) {
          //    this.arrowAnim.stop(true);
          // }
          // this.arrowAnim = new Y.Anim({node: insertedEl, from: {backgroundColor: this.arrowAnimColors.from}, to : {backgroundColor: this.arrowAnimColors.to }, duration: 1});
          // this.arrowAnim.on("end",function() { Y.one(insertedEl).setStyle( 'backgroundColor', ''); });
          // this.arrowAnim.run();
	      
	      // Fire updated !
	      this.fireUpdatedEvt();
	   }
	},
	   
	/**
	 * Called when the user clicked on a delete button.
	 * @param {Event} e The original click event
	 */
	onDelete: function(e) {
	     
	   // to do : wrapper 
	   //e.halt();
	   
	   // Prevent removing a field if already at minItems
	   if( lang.isNumber(this.options.minItems) && this.subFields.length <= this.options.minItems ) {
	      return;
	   }
	      
	   var bool =true,el = e.target;
	   // Get the wrapping div element
	   while(el && bool){
	       el = el.parentNode;
	       el && (bool = !I.hasClass(el,"inputEx-List-child"));
	   }
	   
	   var elementDiv = el;
	   
	   // Get the index of the subField
	   var index = -1;
	   
	   var subFieldEl = elementDiv.childNodes[this.options.useButtons ? 1 : 0];
	   for(var i = 0 ; i < this.subFields.length ; i++) {
	      if(this.subFields[i].getEl() == subFieldEl) {
	         index = i;
	         break;
	      }
	   }
	      
	   // Remove it
	   if(index != -1) {
	      this.removeElement(index);
	   }
		
		// Note: not very efficient
		this.resetAllNames();      
	
	   // Fire the updated event
	   this.fireUpdatedEvt();
	},
	   
	/**
	 * Remove the line from the dom and the subField from the list.
	 * @param {integer} index The index of the element to remove
	 */
	removeElement: function(index) {
	   var elementDiv = this.subFields[index].getEl().parentNode;
	      
	   this.subFields[index] = undefined;
	   this.subFields = I.compactArray(this.subFields);
	      
	   // Remove the element
	   elementDiv.parentNode.removeChild(elementDiv);
	},
	
	/**
    * Clear the field by setting the field value to this.options.value
    * @param {boolean} [sendUpdatedEvt] (optional) Wether this clear should fire the 'updated' event or not (default is true, pass false to NOT send the event)
    */
    clear: function(sendUpdatedEvt) {
        this.setValue(lang.isUndefined(this.options.value) ? [] : this.options.value, sendUpdatedEvt);
    }
	
});
	
// Register this class as "list" type
I.registerType("list", I.ListField, [
   { type: 'string', label: 'List label', name: 'listLabel', value: ''},
   { type: 'type', label: 'List element type', required: true, name: 'elementType' }
]);
	
},'3.0.0a',{
  requires: ["inputex-field"]
});
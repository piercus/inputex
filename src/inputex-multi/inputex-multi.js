gI.addModule("inputex-multi",function(I){

  I.MultiField = function(options){
    I.MultiField.superclass.constructor.call(this,options);
  };
  
  I.extend( I.MultiField,I.ListField,{
    setOptions: function(options){
        I.MultiField.superclass.setOptions.call(this, options);
        // override basic value
        this.options.elementType = options.elementType || {type: 'label'};
        if(typeof(options.addField.description) == "undefined" && options.description){
            options.addField.description = options.description;
            this.options.description = false;
        }
        this.options.addField = options.addField;
        this.options.delimiter = options.delimiter;
        if (typeof(this.options.addField.label) == "undefined"){
            this.options.addField.label = this.options.listLabel;
        }
    },
	/**
	 * Render the addButton 
	 */
	renderComponent: function() {
	    
	    this.renderAddComponent();
	      
	   // Div element to contain the children
	   this.childContainer = I.cn('div', {className: 'inputEx-ListField-childContainer'});
	   this.childContainer.appendChild(I.cn('div',null,{"clear":"both"}))
	   this.fieldContainer.appendChild(this.childContainer);
	   
	},
	renderAddComponent: function(){
	    this.addField = I.inputEx(I.mix(this.options.addField,{parentEl : this.fieldContainer}));
	    
	    this.addField.onKeyPress = function(e){
	      if (e.keyCode == 13) {
	        this.fireUpdatedEvt();
	        return false;
	      }
	    }
	},
	initEvents: function(){
	    this.addField.on("updated", this.onAddFieldUpdate, this, true);
	},
	/**
	 * Add a new element to the list and fire updated event
	 * @param {Event} e The original click event
	 */
	onAddFieldUpdate: function(value) {

	    //Prevent a loop between addField and this
 	   
	   // Prevent adding a new field if already at maxItems
	   if( I.Lang.isNumber(this.options.maxItems) && this.subFields.length >= this.options.maxItems ) {
	      return;
	   }
	   
	   if(this.options.delimiter){
	       values = value.split(this.options.delimiter);
	       for (var i = 0; i< values.length; i++){
	           this.addValue(values[i]);
	       }
	   } else {
	       this.addValue(value);
	   }
	   
	   
	   
	   this.addField.clear(false);

	   // Fire updated !
	   this.fireUpdatedEvt();	   
	},
     addValue: function(v){
          // Add a field with  
         var subFieldEl = this.addElement(v);

     	 // Focus on this field
     	 subFieldEl.focus();

     }
  });


  // Register this class as "multi" type
  I.registerType("multi", I.MultiField);

}, '3.0.0a',{
  requires: ["inputex-list"]
});

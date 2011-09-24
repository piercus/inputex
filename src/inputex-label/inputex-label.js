YUI().add("inputex-label",function(Y){

  Y.inputEx.LabelField = function(options){
    Y.inputEx.LabelField.superclass.constructor.call(this,options);
  };
  
  Y.extend( Y.inputEx.LabelField,Y.inputEx.HiddenField,{
    setOptions: function(options) {
      if( !options.label){
          options.label = options.value || "";
      }
  	   Y.inputEx.LabelField.superclass.setOptions.call(this, options);
    },
    /**
    * Override hiddenField render with field render
    */
    render: function(){
        Y.inputEx.Field.prototype.render.call(this);
    },
    /**
    * Render an 'INPUT' DOM node
    */
    renderComponent: function() {

      // Create the node
      this.el = Y.inputEx.cn('input', {type: 'hidden'});
      this.rawValue = '';
      if(this.options.name) this.el.name = this.options.name;
      // Append it to the main element
      this.fieldContainer.appendChild(this.el);
    },
    setValue: function(value){
        this.labelEl.innerHTML = value;
        Y.inputEx.LabelField.superclass.setValue.call(this, value);
    }
});

  // Register this class as "label" type
  Y.inputEx.registerType("label", Y.inputEx.LabelField);

}, '3.0.0a',{
  requires: ["inputex-field","inputex-hidden"]
})
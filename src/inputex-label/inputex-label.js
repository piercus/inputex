gI.addModule("inputex-label",function(I){

  I.LabelField = function(options){
    I.LabelField.superclass.constructor.call(this,options);
  };
  
  I.extend( I.LabelField,I.HiddenField,{
    setOptions: function(options) {

      if(!options.label){
          options.label = options.getLabel ? options.getLabel(options.value) : "";
      }
  	  I.LabelField.superclass.setOptions.call(this, options);
  	  this.options.getLabel = options.getLabel || function(a){return a};
    },
    /**
    * Override hiddenField render with field render
    */
    render: function(){
        I.Field.prototype.render.call(this);
    },
    /**
    * Render an 'INPUT' DOM node
    */
    renderComponent: function() {

      // Create the node
      this.fieldEl = I.cn('input', {type: 'hidden'});
      this.rawValue = '';
      if(this.options.name) this.fieldEl.name = this.options.name;
      // Append it to the main element
      this.fieldContainer.appendChild(this.fieldEl);
    },
    setValue: function(value){
        this.labelEl.innerHTML = this.options.getLabel(value);
        I.LabelField.superclass.setValue.call(this, value);
    }
});

  // Register this class as "label" type
  I.registerType("label", I.LabelField);

}, '3.0.0a',{
  requires: ["inputex-field","inputex-hidden"]
})
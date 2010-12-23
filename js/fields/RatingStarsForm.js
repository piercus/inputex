(function () {
   var util = YAHOO.util, lang = YAHOO.lang, Event = util.Event, Dom = util.Dom;

/**
 * Create a custom Form that use RatingStars and send it automatically
 * @class inputEx.RatingStarsForm
 * @extends inputEx.Form
 * @constructor
 * @param {Object} options The following options are added for RatingStarsForm :
 * <ul>
 *  <li><b>ratingStarsOptions</b>: see inputEx.RatingStars</li>
 * </ul>
 * <p>The classical Form options may have no sens here</p>
 */
inputEx.RatingStarsForm = function(options) {
   inputEx.RatingStarsForm.superclass.constructor.call(this,options);
};

lang.extend(inputEx.RatingStarsForm, inputEx.Form,{
   initEvents: function(){
     inputEx.RatingStarsForm.superclass.initEvents.call(this);
     this.asyncEvt = new util.CustomEvent("asyncEvtForm");
     this.endAsyncEvt = new util.CustomEvent("endAsyncEvtForm");
     
     this.rateInstance.rateEvt.subscribe(this.onRate, this, true);
     this.asyncEvt.subscribe(this.rateInstance.onAsync,this.rateInstance,true);
     this.endAsyncEvt.subscribe(this.rateInstance.onEndAsync,this.rateInstance,true);
   },
    /**
   * Set Options change default className and set fields options
   * @method setOptions
   */
  setOptions: function(options){
    inputEx.RatingStarsForm.superclass.setOptions.call(this,options);
        
    // Overwrite options
    this.options.ratingStarsOptions = options.ratingStarsOptions;
    this.options.fields = options.fields || [];
    this.options.className = options.className ? options.className : 'inputEx-Form inputEx-RatingStarsForm';
    this.options.ajax.callback.success = function(o){
      this.endAsyncEvt.fire();
    };
    this.options.ajax.callback.scope = this;
    this.setFields();

  },
  /**
   * Set fields option of the form
   * @method setFields
   */
  setFields: function(){
    //we should generalise that for a multi-vote form
    var ratingField = this.options.ratingStarsOptions ;
    ratingField.type = "ratingstars";
    this.options.fields.push(ratingField);
  },
  onRate: function(){
    this.asyncRequest();
    this.asyncEvt.fire();
  },
  /**
  * subscribe rateEvt on each Field
  * @method renderStatusEl
  */
  renderField: function(fieldOptions) {
    if(fieldOptions.type != "ratingstars"){
      return inputEx.RatingStarsForm.superclass.renderField.call(this,fieldOptions);
    }
    
    this.rateInstance = inputEx.RatingStarsForm.superclass.renderField.call(this,fieldOptions);
    return this.rateInstance
  }

});

})();



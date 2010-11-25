(function() {   
  
  var inputEx = YAHOO.inputEx;

  /**
 * Create a multi Select field customized
 * @class inputEx.MultiSelectFieldCustom
 * @extends inputEx.MultiSelectField
 * @constructor
 * @param {Object} options Added options:
 * <ul>
 *    <li>maxItems: the number of Items</li>
 *    <li>maxItemsAlert: a function executed when the maxItems is reach</li>
 *    <li>listSelectOptions : the options for a select field inside of the custom list</li>
 * </ul>
 */


inputEx.MultiSelectFieldCustom = function(options) {
  this.options = this.options || {};
  this.listSelectOptions= options.listSelectOptions;
  this.maxItems = options.maxItems; 
  this.maxItemsAlert = options.maxItemsAlert;
  inputEx.MultiSelectFieldCustom.superclass.constructor.call(this,options);
  this.confirmEmpty = options.confirmEmpty;
};
YAHOO.lang.extend(inputEx.MultiSelectFieldCustom, inputEx.MultiSelectField,{
   /**
    * renderComponent : override the MultiSelectField renderComponent function
    * <ul>
    *   <li>Use the custom ddlist </li>
    *   <li>put options for select fields in the ddList Custom</li>
    * </ul>
    */

   renderComponent: function() {
      inputEx.MultiSelectFieldCustom.superclass.renderComponent.call(this);
      
      this.ddlist = new inputEx.widget.ListCustom({parentEl: this.fieldContainer,listSelectOptions: this.listSelectOptions, maxItems: this.maxItems, uniqueness: true, maxItemsAlert: this.maxItemsAlert});
      this.ddlist.listChangeEvt.subscribe(this.fireUpdatedEvt, this, true);

   }, 
   getState: function(){
     if (this.confirmEmpty && !this.confirmedEmpty ){
       if (this.getValue().length == 0){
          if (typeof(this.confirmEmpty)  == "string"){
            this.confirmedEmpty = ( confirm(this.confirmEmpty) ? "valid" : "invalid");
          } else if (typeof(this.confirmEmpty)  == "function"){
            this.confirmedEmpty = this.confirmEmpty();
          }
          return this.confirmedEmpty;
        }
      } else if (this.confirmedEmpty) {
        if (this.getValue().length == 0){
          return this.confirmedEmpty
        }
      } else {
        inputEx.MultiSelectFieldCustom.superclass.getState.call(this);
      }
   },  
  setValue: function(obj, sendUpdatedEvt) {
     var i, length, position, choice, ddlistValue = [];
      
      if (!YAHOO.lang.isArray(obj)) {
        return;
      }
      
      // Re-enable all choices
      for (i = 0, length=this.choicesList.length ; i < length ; i += 1) {
        this.enableChoice(i);
      }
      this.ddlist.setValue(obj);
      // disable selected choices and fill ddlist value
      for(i = 0 ; i < obj.length ; i++) {
         position = this.getChoicePosition({ value : obj[i].value || obj[i] });
         choice = this.choicesList[position];
         this.hideChoice({ position: position });
      }
     inputEx.sn(this.hiddenEl,{"value": this.stringifyValue()});
     if(sendUpdatedEvt !== false) {
        // fire update event
         this.fireUpdatedEvt();
      }
  },

   disable: function(){
      inputEx.MultiSelectFieldCustom.superclass.disable.call(this);
      this.ddlist.disable();
   },
   enable: function(){
      inputEx.MultiSelectFieldCustom.superclass.enable.call(this);
      this.ddlist.enable();
   },
   clear: function(){
      inputEx.MultiSelectFieldCustom.superclass.clear.call(this);
      this.ddlist.enable();
      this.setValue([]);
   }
   
});
inputEx.registerType("multiselectcustom", inputEx.MultiSelectFieldCustom);

})();

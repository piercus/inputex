(function() {

   var lang = YAHOO.lang;
   var inputEx = YAHOO.inputEx;
   var Event = YAHOO.util.Event;
inputEx.widget.ListCustom = function(options) {
  
	this.listSelectOptions = options.listSelectOptions;
	this.maxItems = options.maxItems;
	this.maxItemsAlert = options.maxItemsAlert;

	inputEx.widget.ListCustom.superclass.constructor.call(this,options);

	this.selects = [];
};
YAHOO.lang.extend(inputEx.widget.ListCustom,inputEx.widget.DDList,{
/**
    * Add an item to the list
    * @param {String|Object} item Either a string with the given value or an object with "label" and "value" attributes
    */
   addItem: function(item) {

      if (this.maxItems && this.items.length >= this.maxItems){
				this.maxItemsAlert ? this.maxItemsAlert.call() : alert("You're limited to "+this.maxItems+" items");
			  return;	
			}
			var iCopy = {};
      iCopy.label = (typeof item == "object") ? item.label : item	;
      iCopy.value = (typeof item == "object") ? item.value : item	;
      var li = inputEx.cn('li', {className: 'inputEx-DDList-item'});
      iCopy.span = inputEx.cn('span', null, null,  iCopy.label)

      if(this.listSelectOptions){
        var select = new inputEx.SelectField(this.listSelectOptions); 
        this.selects.push(select);
        li.appendChild(select.el);
        iCopy.getValue = function(){
				  return {select: select.getValue(), label: this.label, value: this.value};
				}
				iCopy.setValue = function(obj){
					var label = (typeof obj == "object") ? obj.label : obj;
					var value = (typeof obj == "object") ? obj.value : obj;
					var selectValue = (typeof obj == "object") ? obj.selectValue : obj;
				  this.span.innerHTML = label;
				  this.label = label;
				  this.value = value;
				  select.setValue(selectValue);
				}
		  } else {
			  iCopy.getValue = function(){
					result = {};
					if(this.value) result.value = this.value;
					if(this.label) result.label = this.label;
					return result;
				}				
			  iCopy.setValue = function(obj){
          this.label = (typeof obj == "object") ? obj.label : obj	;
          this.value = (typeof obj == "object") ? obj.value : obj	;
          this.span.innerHTML = this.label;
				}
			}
      li.appendChild(iCopy.span);
 

      // Option for the "remove" link (default: true)
		if(!!this.options.allowDelete){
			var removeLink = inputEx.cn('div', {id: iCopy.value+"-Close" ,className:"removeButton"}, null, ""); 
	      li.appendChild( removeLink );
	      Event.addListener(removeLink, 'click', function(e) {
	         var a = Event.getTarget(e);
	         var li = a.parentNode;
	         this.removeItem( inputEx.indexOf(li,this.ul.childNodes) );
	      }, this, true);
      }
      // Don't want any drag and drop
      //var dditem = new inputEx.widget.DDListItem(li);
      //
      
      this.items.push( iCopy );

      this.ul.appendChild(li);
   },
   disable: function(){
      var selects = this.selects;
	    for (var i = 0; i< selects.length; i++){
			  selects[i].disable();
			}
      var items = this.items;
	    for (var i = 0; i< items.length; i++){
			  Event.removeListener(items[i].value+"-Close","click")
			  YAHOO.util.Dom.addClass(items[i].value+"-Close","hidden");
			}
	 },
   enable: function(){
      var selects = this.selects;
	    for (var i = 0; i< selects.length; i++){
			  selects[i].enable();
			}
      var items = this.items;
	    for (var i = 0; i< items.length; i++){
			  Event.addListener(items[i].value+"-Close",'click', function(e) {
	         var a = Event.getTarget(e);
	         var li = a.parentNode;
	         this.removeItem( inputEx.indexOf(li,this.ul.childNodes) );
	      }, this, true);
			  YAHOO.util.Dom.removeClass(items[i].value+"-Close","hidden");	      
			}	 
	 },
   getValue: function(){
		 var results = [];
		 for(var i = 0; i < this.items.length; i++){
		   results.push(this.items[i].getValue());
		 }
		 return results;
	 },
   setValue: function(objs){	  
			if(this.items.length > objs.length){
			  for (var i = 0; i< this.items.length -objs.length; i++){
				  this.removeItem(this.items.length-1-i);
				}
			}
			for (var i = 0; i < objs.length; i++){
				if (this.items[i]){
				 this.items[i].setValue(objs[i]);
				} else {
				 this.addItem(objs[i]);
				}
			} 
	 }
}); 

})();

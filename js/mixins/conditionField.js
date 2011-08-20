YUI.add("inputex-conditionfield",function(Y){
  var inputEx = Y.inputEx;
  // copy inputEx.Group Object
  var basicGroupProto = Y.merge(inputEx.Group.prototype);
  Y.inputEx.conditionField = function(options){
      this.on("updated",function(e){
         this.actualiseFields(); 
      });
  };
  Y.inputEx.conditionField.prototype = {
      renderFields: function(parentEl){
          this.conditionFields = {};
          basicGroupProto.renderFields.call(this,parentEl);
      },
      addField: function(fieldOptions){
          if(fieldOptions.condition){
              var field;
              this.conditionFields[fieldOptions.name] = {
                  status: fieldOptions.condition.call(this,this.getValue()),
                  condition: fieldOptions.condition,
                  options: Y.merge(fieldOptions)
              };
              if(!this.conditionFields[fieldOptions.name].status){
                  otherFieldOption = Y.merge(fieldOptions,{"type": "hidden"});
                  field = basicGroupProto.addField.call(this,otherFieldOption);
              } else {
                  field = basicGroupProto.addField.call(this,fieldOptions);
              }
              this.conditionFields[fieldOptions.name].field = field;
              return field;
          }
          return basicGroupProto.addField.call(this,fieldOptions);
      },
      actualiseFields: function(){
          var v = this.getValue();
          for(var i in this.conditionFields){
            if(this.conditionFields.hasOwnProperty(i)){
                var condition = this.conditionFields[i].condition.call(this,v);
                if(condition !== this.conditionFields[i].status){
                    var newOptions = condition ? this.conditionFields[i].options : Y.merge(this.conditionFields[i].options,{"type": "hidden"}); 
                    this.removeField(i);
                    this.addField(newOptions);             
                }
            }
          }
      }
  };
  Y.augment(inputEx.Group,inputEx.conditionField,true);
},'0.0.1',{
  requires: ["inputex-hidden","inputex-group"]
});
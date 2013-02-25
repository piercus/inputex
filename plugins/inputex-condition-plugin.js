YUI.add("inputex-condition-plugin",function(Y){
  var inputEx = Y.inputEx;
  // copy inputEx.Group Object
  var basicGroupProto = Y.merge(inputEx.Group.prototype);
  Y.inputEx.Condition = function(options){
      this.on("updated",function(e){
         this.actualiseFields(); 
      });
  };
  Y.inputEx.Condition.prototype = {
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
                    var newOptions = condition ? this.conditionFields[i].options : Y.merge({"type": "hidden"},this.conditionFields[i].options); 
                    this.removeField(i);
                    this.addField(newOptions);             
                }
            }
          }
      }
  };
  Y.augment(inputEx.Group,inputEx.Condition,true);
},'0.0.1',{
  requires: ["inputex-hidden","inputex-group"]
});

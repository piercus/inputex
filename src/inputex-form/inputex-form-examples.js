gI.addExamples("inputex-form", {
              keyObject: "",
              requires:["inputex-select","inputex-email","inputex-checkbox","inputex-radio","inputex-url","inputex-list"],
              
              list:[{
		title:"Basic Form creation",
		description:"Use the following code to create a basic inputEx Form.",
		fn:function(parentEl,I){
         new I.Form( { 
            fields: [ 
               {type: 'select', label: 'Title', name: 'title', choices: [{ value: 'Mr' }, { value: 'Mrs' }, { value: 'Ms' }] },
               {label: 'Firstname', name: 'firstname', required: true, value:'Jacques' },
               {label: 'Lastname', name: 'lastname', value:'Dupont' },
               {type:'email', label: 'Email', name: 'email'},
               {type:'url', label: 'Website',name:'website'}
            ], 
            buttons: [{type: 'submit', value: 'Change'}],
            parentEl: parentEl
         });
      }},{
		title:"Multi-group Form",
		description:"Use the following code to create a Form with multiple Groups (fieldsets).",
		fn:function(parentEl,I){
         new I.Form( {
              fields: [
                  { 
                     type:'group',
                     legend:'group 1',
                     name:'group1',
                     fields:[
                       {type: 'select', label: 'Title', name: 'title', choices: [{ value: 'Mr' }, { value: 'Mrs' }, { value: 'Ms' }] },
                       {label: 'Firstname', name: 'firstname', required: true, value:'Jacques' },
                       {label: 'Lastname', name: 'lastname', value:'Dupont' }
                     ]
                  },
                  { 
                     type:'group',
                     legend:'group 2',
                     name:'group2',
                     fields:[
                       {type:'email', label: 'Email', name: 'email'},
                       {type:'url', label: 'Website',name:'website'}
                     ]
                  }
              ],
              buttons: [{type: 'submit', value: 'Change'}],
              parentEl: parentEl
          });
   }},{
		title:"Send in json with ajax",
		description:"How to send the form data using Ajax",
		fn:function(parentEl,I){
         new I.Form( {
            fields: [ 
               { type: 'select', label: 'Title', name: 'title', choices: [{ value: 'Mr' }, { value: 'Mrs' }, { value: 'Ms' }] },
               { label: 'Firstname', name: 'firstname', required: true, value:'Jacques' },
               { label: 'Lastname', name: 'lastname', value:'Dupont' }
            ], 
            buttons: [{type: 'submit', value: 'Change'}],    
            parentEl: parentEl,
            ajax: {
               method: 'POST',
               uri: '../echo.php',
               callback: {
                  success: function(o) { alert("success", o); },
                  failure: function(o) { alert("failure", o); }
               },
               showMask:true
            }
         });
      }},{
		title:"Send with ajax using url encoded parameters",
		description:"How to send the form data using Ajax",
		fn:function(parentEl,I){
         new I.Form( {
            fields: [ 
               { type: 'select', label: 'Title', name: 'title', choices: [{ value: 'Mr' }, { value: 'Mrs' }, { value: 'Ms' }] },
               { label: 'Firstname', name: 'firstname', required: true, value:'Jacques' },
               { label: 'Lastname', name: 'lastname', value:'Dupont' }
            ], 
            buttons: [{type: 'submit', value: 'Change'}],    
            parentEl: parentEl,
            ajax: {
               method: 'POST',
               uri: '../echo.php',
               contentType: "application/x-www-form-urlencoded",
               callback: {
                  success: function(o) { alert("success", o); },
                  failure: function(o) { alert("failure", o); }
               },
               showMask:true
            }
         });
      }},{
		title:"Send with ajax using url encoded parameters wrapped in an object",
		description:"Use wrapObject",
		fn:function(parentEl,I){
         new I.Form( {
            fields: [ 
               { type: 'select', label: 'Title', name: 'title', choices: [{ value: 'Mr' }, { value: 'Mrs' }, { value: 'Ms' }] },
               { label: 'Firstname', name: 'firstname', required: true, value:'Jacques' },
               { label: 'Lastname', name: 'lastname', value:'Dupont' }
            ], 
            buttons: [{type: 'submit', value: 'Change'}],    
            parentEl: parentEl,
            ajax: {
               method: 'POST',
               uri: '../echo.php',
               contentType: "application/x-www-form-urlencoded",
               wrapObject: "person",
               callback: {
                  success: function(o) { alert("success", o); },
                  failure: function(o) { alert("failure", o); }
               },
               showMask:true
            }
         });
      }},{
		title:"Setting and getting form value",
		description:"Use the following code to set or get the value from javascript",
		fn:function(parentEl,I){
         var form6 = new I.Form( { 
            fields: [ 
               {type: 'select', label: 'Title', name: 'title', choices: [{ value: 'Mr' }, { value: 'Mrs' }, { value: 'Ms' }], value:'Mr' },
               {label: 'Firstname', name: 'firstname', required: true, value:'Jacques' },
               {label: 'Lastname', name: 'lastname', value:'Dupont' },
               {
                  type: 'group',
                  legend: 'Emails',
                  name: 'emails',
                  fields: [
                     {type:'email', label: 'Email 1', name:'first'},
                     {type:'email', label: 'Email 2', name:'second'}
                  ]
               }
            ],
            buttons: [
               {
                  type: 'submit',
                  value: 'Set form value',
                  
                  onClick: function(e) { // e === clickEvent (I.widget.Button custom event)
                     
                     // valueObject : object to be passed to setValue function
                     //               its structure is { field_name : field_value, ... }
                     
                     var valueObject = {
                        title:"Mrs",
                        firstname:"Candy",
                        lastname:"Jones",
                        // note the nested object when setting value of a form with a 'group' field :
                        emails:{
                           first:'first@email.com',
                           second:'second@email.com'
                        }
                     };
                     
                     form6.setValue(valueObject);
                     
                     return false; // stop clickEvent, to prevent form submitting
                     
                  }
               },
               {
                  type: 'submit',
                  value: 'Get form value',
                  
                  onClick:function(e) { // e === clickEvent (I.widget.Button custom event)
                     
                     var valueAsJsObject = form6.getValue();
                     var valueAsJsonString = I.JSON.stringify(valueAsJsObject);
                     
                     alert(valueAsJsonString);
                     
                     return false; // stop clickEvent, to prevent form submitting
                  }
               }
            ],
            parentEl: parentEl
         });
      }},{
		title:"Different button types",
		description:"Use the following code to create submit buttons, or 'link' buttons.",
		fn:function(parentEl,I){
         
         var confirmation = {
            
            message : "Are you sure you want to submit ?",
            
            handler : function() {
               if (!confirm(this.message)) {
                  return false;  // return false to prevent form submit
               }
            }
            
         };
         
         var form7 = new I.Form( { 
            fields: [ 
               {type: 'select', label: 'Title', name: 'title', choices: [{ value: 'Mr' }, { value: 'Mrs' }, { value: 'Ms' }], value:'Mr' },
               {label: 'Firstname', name: 'firstname', required: true, value:'Jacques' },
               {label: 'Lastname', name: 'lastname', value:'Dupont' }
            ], 
            buttons: [
               {type: 'submit', value: 'Submit'},
               {type: 'submit-link', value: 'Submit'},
               {
                  type: 'submit-link',
                  value: 'Confirm and submit',
                  onClick: {
                     fn: confirmation.handler, // function called on click
                     scope : confirmation // will become 'this' inside fn, when fn is called
                  }
               },
               {
                  type: 'link',
                  value: 'Reset form',
                  onClick: function() {form7.clear();} // when scope doesn't matter, simpler syntax to attach a click handler
               }
            ],
            parentEl: parentEl
         });
      }},{
		title:"Destroy a form",
		description:"Remove DOM nodes, remove event listeners, free memory...",
		fn:function(parentEl,I){
         var form8 = new I.Form( { 
            fields: [ 
               {type: 'select', label: 'Title', name: 'title', choices: [{ value: 'Mr' }, { value: 'Mrs' }, { value: 'Ms' }], value:'Mr' },
               {label: 'Firstname', name: 'firstname', required: true, value:'Jacques' },
               {label: 'Lastname', name: 'lastname', value:'Dupont' }
            ], 
            buttons: [
               {type: 'submit', value: 'Submit'}
            ],
            parentEl: parentEl
         });
         
         var container = I.cn('div',{id:'destroyButtonContainer'});
         document.getElementById(parentEl).appendChild(container);
         
         var destroyButton = new I.widget.Button({
            parentEl: 'destroyButtonContainer',
            id: 'destroyButton',
            type: 'submit',
            value: 'Destroy the form',
            onClick: function() {
               alert('clicked : form will be destroyed');
               form8.destroy(); // remove nodes from DOM, remove event listeners
               delete form8;  // free memory (no references to removed DOM nodes)
            }
         });
         
         container.appendChild(I.cn('div',null,{clear:'both'}));
         
         
      }},{
		title:"Turn off / on browser autocompletion",
		description:"Activate/deactivate browser autocompletion by field, by form, or for all inputEx fields in the page.",
		fn:function(parentEl,I){

         // autocompletion is 'on'
         new I.Form( { 
            legend: "Form with autocompletion",
            fields: [ 
               {label: 'Lastname', name: 'lastname', description:'autocomplete option set to true by default' },
               // except on this field
               {type:'email', label: 'Email', name: 'email', autocomplete:false, description:"autocomplete option set to false on this field"}
            ], 
            buttons: [{type: 'submit', value: 'Change'}],
            parentEl: parentEl
         });

         // autocompletion is 'off' on the whole form
         new I.Form( { 
            legend: "Form without autocompletion",
            autocomplete: false,
            fields: [ 
               {label: 'Lastname', name: 'lastname' },
               {type:'email', label: 'Email', name: 'email'}
            ], 
            buttons: [{type: 'submit', value: 'Change'}],
            parentEl: parentEl
         });

         // to turn off the browser autocompletion by default in all
         // I fields of the page, set the following value after
         // I source inclusion :
         //
         //   I.browserAutocomplete = false;
         //
      }}]});

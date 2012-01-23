gI.addExamples("inputex-url", {
              keyObject: "",list:[{
		title:"Basic UrlField creation",
		description:"Use the following code to create a basic inputEx UrlField.",
		fn:function(parentEl,I){
			new I.UrlField({parentEl: parentEl, showMsg: true, value: 'http://ajaxian.com/archives/inputex-json-form-builder'});
		}},{
		title:"favicon option",
		description:"If you use https, you might need to remove the favicon option (or provide a proxy).",
		fn:function(parentEl,I){
			new I.UrlField({parentEl: parentEl, showMsg: true, favicon: false, value: 'http://www.ajaxian.com'});
		}},{
		title:"Type invitation",
		description:"You can use all the parameters from StringField, including 'typeInvite':",
		fn:function(parentEl,I){
			new I.UrlField({parentEl: parentEl, showMsg: true, favicon: false, typeInvite: 'webservice url'});
		}}]});
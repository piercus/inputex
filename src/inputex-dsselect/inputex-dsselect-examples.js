gI.addExamples("inputex-dsselect", {
              keyObject: "",list:[{
		title:"Using a DataSource",
		description:"How to populate the selectField using a <a href='http://developer.yahoo.com/yui/datasource/' target='_new'>YUI datasource</a> (from local data, XHR, JSONP, function, ...):",
		fn:function(parentEl,I){

// Configure datasource
var myDataSource = new Y.DataSource.IO({ source: "books.json" });
myDataSource.plug({fn: Y.Plugin.DataSourceJSONSchema, cfg: {
    schema: {
        resultListLocator: "Results",
        resultFields: ["id","quantity","amount","title", "category"]
    }
}});

// Instantiate field
field = new I.DSSelectField({
  name: 'book', 
  datasource: myDataSource, 
  valueKey: "id", 
  labelKey: "title", 
  parentEl: parentEl
});

Y.Node.create("<button>Get Value</button>").appendTo('#container1').on( 'click', function() {
	alert( field.getValue() );
});
		}}]});
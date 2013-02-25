gI.addExamples("inputex-dtInPlaceEdit", {
              keyObject: "",list:[{
		title:"InPlaceEditing",
		description:"Use the following code to create a basic inputEx DataTable",
		fn:function(parentEl,I){ 
		var YAHOO = Y.YUI2;
	/**
	 * Datasource and I fields used for both examples
	 */
	var myDataSource = new YAHOO.util.DataSource([
	    {id:"po-0167", date:new Date(1980, 2, 24), quantity:1, amount:4, title:"A Book About Nothing", category: "SF"},
	    {id:"po-0783", date:new Date("January 3, 1983"), quantity:null, amount:12.12345, title:"The Meaning of Life", category: "Novel"},
	    {id:"po-0297", date:new Date(1978, 11, 12), quantity:12, amount:1.25, title:"This Book Was Meant to Be Read Aloud", category: "SF"},
	    {id:"po-1482", date:new Date("March 11, 1985"), quantity:6, amount:3.5, title:"Read Me Twice", category: "Philosophy"}
	]);
	myDataSource.responseType = YAHOO.util.DataSource.TYPE_JSARRAY;
	myDataSource.responseSchema = { fields: ["id","date","quantity","amount","title", "category"] };

	var myFields = [
		{type: 'hidden', label: 'Id', name: 'id' },
		{type: 'date', label: 'Date', name: 'date', showMsg: true},
		{type: 'integer', label: 'Quantity', name: 'quantity'},
		{type: 'number', label: 'Amount', name: 'amount'},
		{type: 'string', label: 'Title', name: 'title'},
		{type: 'select', label: 'Category', name: 'category', choices: ['SF', 'Novel', 'Philosophy']}
	];
		
	new I.widget.dtInPlaceEdit({
		parentEl: parentEl, 
		fields: myFields,
		datasource: myDataSource
	});
  }},{
		title:"InPlaceEditing Advanced",
		description:"Use the following code to create a basic inputEx DataTable",
		fn:function(parentEl,I){
		var YAHOO = Y.YUI2;
	// Example 2 (test for color field)
	var myDataSource = new YAHOO.util.DataSource([
        {id:"po-0167", date:new Date(1980, 2, 24), quantity:1, amount:4, title:"A Book About Nothing", category: "SF", color: "#993300"},
        {id:"po-0783", date:new Date("January 3, 1983"), quantity:null, amount:12.12345, title:"The Meaning of Life", category: "Novel", color: "#333300"},
        {id:"po-0297", date:new Date(1978, 11, 12), quantity:12, amount:1.25, title:"This Book Was Meant to Be Read Aloud", category: "SF", color: "#003300"},
        {id:"po-1482", date:new Date("March 11, 1985"), quantity:6, amount:3.5, title:"Read Me Twice", category: "Philosophy", color: "#003366"}
  ]);
  myDataSource.responseType = YAHOO.util.DataSource.TYPE_JSARRAY;
  myDataSource.responseSchema = { fields: ["id","date","quantity","amount","title", "category","color"] };

	var myFields = [
		{type: 'hidden', label: 'Id', name: 'id' },
		{type: 'date', label: 'Date', name: 'date' },
		{type: 'integer', label: 'Quantity', name: 'quantity', size:4 },
		{type: 'number', label: 'Amount', name: 'amount', size:4, showMsg:true, required:true },
		{type: 'string', label: 'Title', name: 'title', required:true },
		{type: 'select', label: 'Category', name: 'category', choices: ['SF','Novel','Philosophy']},
		{type: 'color', label: 'Couleur', name: 'color' }
	];
	
	var myDatatable = new I.widget.dtInPlaceEdit({
		parentEl: parentEl, 
		fields: myFields,
		datasource: myDataSource,		
		showHideColumnsDlg: true,
		
		columnDefs: [
			{"key": "id", "label": "Id", resizeable: true, sortable: true, editor: null },
			{"key": "date", "label": "Date", resizeable: true, sortable: true, formatter: YAHOO.widget.DataTable.formatDate},
			{"key": "quantity", "label": "Quantity", resizeable: true, sortable: true, hidden: true},
			{"key": "amount", "label": "Amount", resizeable: true, sortable: true},
			{"key": "title", "label": "Title", resizeable: true, sortable: true},
			{"key": "category", "label": "Category", "hidden": true, resizeable: true, sortable: true},
			{"key": "color", "label": "Color", sortable: true, formatter: function(elCell, record) {
		      var color = record.getData().color;
		      elCell.innerHTML = String.fromCharCode(60)+"div style='background-color: "+color+";'"+String.fromCharCode(62)+"    "+String.fromCharCode(60)+"/div"+String.fromCharCode(62);
		   }}
		]
		
	});
	
	myDatatable.itemAddedEvt.subscribe(function(event,args){
		var rec = args[0];
		var data = rec.getData();
		
		// We add an id
		data.id = 'my-id-12345';

		// We send back the record and the updated data
		this.onAddSuccess(rec,data);
		
		alert("Item added with id : "+rec.getData('id'));
	});
	
	myDatatable.itemRemovedEvt.subscribe(function(event,args){
		var rec = args[0];
		
		// We send back the record to really delete the item in the datatable
		this.onRemoveSuccess(rec);
		
		alert("Item deleted : "+rec.getData('id'));
	});
	
	myDatatable.itemModifiedEvt.subscribe(function(event,args){
		var rec = args[0];
		
		this.onModifySuccess(rec);
		alert("Item updated : "+rec.getData('id'));
	});
	
	/* Subscribe to this event to handle the non-filled required fields */
	myDatatable.requiredFieldsEvt.subscribe(function(event,args){
		var reqFields = args[0],
		rlength = reqFields.length;
		
		var error = 'You need to complete the following field(s) : \n';
		for(var i=0; i != rlength; i++){
			error += ' - '+reqFields[i]+'\n';
		}
		alert(error);
	});
	
  }},{
		title:"Add with a dialog",
		description:"Use the following code to add items through a dialog",
		fn:function(parentEl,I){
	  
		var YAHOO = Y.YUI2;
	var myDialogDataSource = new YAHOO.util.DataSource([
        {id:"po-0167", date:new Date(1980, 2, 24), quantity:1, amount:4, title:"A Book About Nothing", category: "SF", color: "#993300"},
        {id:"po-0783", date:new Date("January 3, 1983"), quantity:null, amount:12.12345, title:"The Meaning of Life", category: "Novel", color: "#333300"},
        {id:"po-0297", date:new Date(1978, 11, 12), quantity:12, amount:1.25, title:"This Book Was Meant to Be Read Aloud", category: "SF", color: "#003300"},
        {id:"po-1482", date:new Date("March 11, 1985"), quantity:6, amount:3.5, title:"Read Me Twice", category: "Philosophy", color: "#003366"}
  ]);
  myDialogDataSource.responseType = YAHOO.util.DataSource.TYPE_JSARRAY;
  myDialogDataSource.responseSchema = { fields: ["id","date","quantity","amount","title", "category","color"] };
	
	var myFields = [
		{type: 'hidden', label: 'Id', name: 'id' },
		{type: 'date', label: 'Date', name: 'date' },
		{type: 'integer', label: 'Quantity', name: 'quantity', size:4 },
		{type: 'number', label: 'Amount', name: 'amount', size:4, showMsg:true, required:true },
		{type: 'string', label: 'Title', name: 'title', required:true },
		{type: 'select', label: 'Category', name: 'category', choices: ['SF','Novel','Philosophy']},
		{type: 'color', label: 'Couleur', name: 'color' }
	];
	
	var myDialogDatatable = new I.widget.dtInPlaceEdit({
		parentEl: parentEl, 
		fields: myFields,
		datasource: myDialogDataSource,
		insertWithDialog: true
	});
	
	
	myDialogDatatable.itemAddedEvt.subscribe(function(event,args){
		var rec = args[0];
		var data = rec.getData();
		
		// We add an id
		data.id = 'my-id-12345';
		
		// We send back the record and the updated data
		this.onAddSuccess(rec,data);
		
		alert("Item added with id : "+rec.getData('id'));
	});
	
	myDialogDatatable.itemRemovedEvt.subscribe(function(event,args){
		var rec = args[0];
		
		// We send back the record to really delete the item in the datatable
		this.onRemoveSuccess(rec);
		
		alert("Item deleted : "+rec.getData('id'));
	});
	
	myDialogDatatable.itemModifiedEvt.subscribe(function(event,args){
		var rec = args[0];
		
		this.onModifySuccess(rec);
		alert("Item updated : "+rec.getData('id'));
	});
	
	/* Subscribe to this event to handle the non-filled required fields */
	myDialogDatatable.requiredFieldsEvt.subscribe(function(event,args){
		var reqFields = args[0],
		rlength = reqFields.length;
		
		var error = 'You need to complete the following field(s) : \n';
		for(var i=0; i != rlength; i++){
			error += ' - '+reqFields[i]+'\n';
		}
		alert(error);
	});
	
  }}]});

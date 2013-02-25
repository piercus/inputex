gI.addExamples("inputex-datatable", {
              keyObject: "",list:[{
		title:"Listening to the Custom Events",
		description:"",
		fn:function(parentEl,I){ 
		
    // Creates a Columnset with 3 Columns. "cost" is not rendered.
    var cols = [
        { key: "id", sortable: true },
        { key: "date", sortable: true, formatter: function(o){ return Y.DataType.Date.format(o.data.date,{format: "%m/%d/%Y"});} },
        { key: "quantity", sortable: true },
        { key: "price", sortable: true },
        { key: "title", sortable: true },
        { key: "category", sortable: true }
    ];

    // Columns must match data parameter names
    var data = [
		      {id:"po-0167", date:new Date(1980, 2, 24), quantity:1, price:4, title:"A Book About Nothing", category: "SF"},
		      {id:"po-0783", date:new Date("January 3, 1983"), quantity:null, price:12.12345, title:"The Meaning of Life", category: "Novel"},
		      {id:"po-0297", date:new Date(1978, 11, 12), quantity:12, price:1.25, title:"This Book Was Meant to Be Read Aloud", category: "SF"},
		      {id:"po-1482", date:new Date("March 11, 1985"), quantity:6, price:3.5, title:"Read Me Twice", category: "Philosophy"}
		];

    // Creates a DataTable with 3 columns and 3 rows
    var table = new Y.DataTable.Base({
        columnset: cols,
        recordset: data,
        plugins: [ Y.Plugin.DataTableSort ]
    });
    
    // Plug the I extensions to the DataTable
    table.plug(Y.Plugin.DatatableInputex,{
      I: {
               type: "group",
               fields: [  
                  {type: 'uneditable', label: 'Id', name: 'id' },
            			{type: 'datepicker', label: 'Date', name: 'date' },
            			{type: 'integer', label: 'Quantity', name: 'quantity' },
            			{type: 'number', label: 'Amount', name: 'price'},
            			{type: 'string', label: 'Title', name: 'title', required: true, showMsg: true },
            			{type: 'select', label: 'Category', name: 'category', choices: ['SF','Novel','Philosophy'] }
               ]
           }
    });
    
    
    table.inputex.on('deleteRow', function(e){

      // previousEvent MUST be returned to confirm the deletion of the row
      var previousEvent = e.details[0];
      
      // You have access to the record and its data 
      var record = previousEvent.currentTarget.record;
      //console.log(record, record.get('data') );
      
      // may be called later... or in a callback
      setTimeout(function() {
        table.inputex.confirmDelete(previousEvent);
      },10);
      
    });
    
    
    table.inputex.on('addRow', function(e) {
     
      var data = e.details[0].data;
      
      // let's simulate id: generation
      data.id = Math.floor(Math.random()*8999)+1000;
      
      setTimeout(function() {
        table.inputex.addRow(data);
      },10);
      
    });
    
    
    table.inputex.on('modifyRow', function(e) {
        var data = e.details[0].data;

        data.price = '$0.99';

        setTimeout(function() {
          table.inputex.modifyRow(data,e.details);
        },10);
      
    });
    
    
    table.render("#container2");
    
  }}]});

var buildDataTable = function(){
    YUI().use("oop",function(Y){
DataTable = function(options){
    DataTable.superclass.constructor.call(this);
    this.addColumn("string","Country");
    this.addColumn("date","Date");
    this.countries = {};
    this.options = {};
    this.options.indicators = options.indicators || [];
    this.options.data = options.data;
    this.indicatorsColumn = {};
    for (var i = 0; i < this.options.indicators; i++){
        this.getColumnId(this.options.indicators[i]);  
    }
    this.parseDatas();
};
Y.extend(DataTable,google.visualization.DataTable,{
   parseDatas: function(){
       var a = this.options.data;
       for(var i = 0; i< a.length; i++){
           this.addData(a[i]);
       }
   },
   addData: function(data){
       if(!data.value) return 
       var country = data.country;
       var date = parseFloat(data.date);
       var indicator = data.indicator;
       var rowId = this.getRowId(country,date);
       var colId = this.getColumnId(data.indicator);
       this.setValue(rowId,colId,parseFloat(data.value));
   },
   getRowId: function(country,date){
       if(this.countries[country.id] && this.countries[country.id][date.toString()]){
           return this.countries[country.id][date.toString()];
       } 
       var rowId = this.addRow();
       if(!this.countries[country.id]){
           this.countries[country.id] = {};
       }
       this.countries[country.id][date.toString()] = rowId;
       this.setValue(rowId,0,country.value);
       this.setValue(rowId,1,new Date(date,0,1));
       return rowId;
   },
   getColumnId: function(indicator){
       var r = this.indicatorsColumn[indicator.id];
       if(!r) {
           this.indicatorsColumn[indicator.id] =  this.addColumn("number",indicator.value); 
           r = this.indicatorsColumn[indicator.id];
       };
       return r;
   }
});
WB.dataFromJSON = function(json){
    var motionchart = new google.visualization.MotionChart(document.getElementById('visualization'));
    var data = new DataTable(json)
    motionchart.draw(data, {'width': 800, 'height': 400});
}
});
};
var WB = {};
google.load('visualization', '1', {'packages':['motionchart']});
google.setOnLoadCallback(buildDataTable);
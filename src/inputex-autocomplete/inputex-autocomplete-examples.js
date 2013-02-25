gI.addExamples("inputex-autocomplete", {
              keyObject: "",list:[{
		title:"Basic Autocomplete creation",
		description:"Use the following code to create a basic inputEx Autocomplete.",
		fn:function(parentEl,I){
		  
			var field = I({
				type: "autocomplete",
				parentEl: parentEl, 
				label: 'Search US state',

				// Format the hidden value (value returned by the form)
				returnValue: function(oResultItem) {
					return oResultItem.value;
				},
				autoComp: {// options of the YUI3 autocompleter (see http://developer.yahoo.com/yui/3/autocomplete/#config)
					minQueryLength: 2,
					maxResults: 50,
					resultTextLocator: 'label',
					source:
				    [{label: "Massachusets", value: "MA"},
				    {label: "state2", value: 2},
				    {label: "state3", value:3}]
					
				}
			});

      Y.Node.create("<button>Get Value</button>").appendTo('#container1').on( 'click', function() {
				alert( field.getValue() );
			});

			field.on("updated", function(value) {
			  document.getElementById(parentEl);
			});
		}},{
		title:"Delicious Autocompleter",
		description:"Uses the <a href='http://del.icio.us/help/json/posts'>del.icio.us json API</a> to search within posts",
		fn:function(parentEl,I){
			
			// Example 2: Delicious autocompleter

			// Delicious DataSource using a JSFunction
			// Delicious.posts is set by the http://feeds.delicious.com/feeds/json/neyric?count=100 script included in the page
			
			var deliciousAC = new I.AutoComplete({
			  
				label: 'Search my delicious bookmarks',
				description: 'Try "javascript" or "rails"',
				parentEl: parentEl, 
				name: 'chosen_url',
			
				// Format the hidden value (value returned by the form)
				returnValue: function(oResultItem) {
					var post = oResultItem[1];
					return post.u;
				},
				// Autocompleter options
				autoComp: {
			  	source: new Y.DataSource.Function({
			  	  source: function(sQuery) {
			  	    if (!sQuery || sQuery.length == 0) {
  						  return false;
  					  }
  					  var query = sQuery.toLowerCase();
  				    var aResults = [];
  					  for(var i = 0 ; i != Delicious.posts.length-1 ; i++) {
  					    var post = Delicious.posts[i];
  						  var desc = post.d.toLowerCase();
  						  if( desc.indexOf(query) != -1) {
  							  aResults.push(post);
  						  }
  					  }
  					  return aResults;
			  	  }
		  	  }),
			  	
					forceSelection: true,
					minQueryLength: 2,
					maxResultsDisplayed: 50,
					
					resultFormatter: function(sQuery, results) {
					  return Y.Array.map(results, function (result) {
					    console.log("format", result);
  						var post = result.raw;

  						// NOTE: we use String.fromCharCode(60) and String.fromCharCode(62) for tags
         			return String.fromCharCode(60)+'a href="'+post.u+'" target="_new"'+
         			          String.fromCharCode(62)+'visit'+String.fromCharCode(60)+'/a'+String.fromCharCode(62)+
         			          ' '+String.fromCharCode(60)+'span target="_new"'+String.fromCharCode(62)+post.d+
         			          String.fromCharCode(60)+'/span'+String.fromCharCode(62);
         			
       			});
          }
          
				}
			});
			
			Y.Node.create("<button>GetValue</button>").appendTo('#container2').on('click', function() {
				alert( deliciousAC.getValue() );
			});
			
		}}]});

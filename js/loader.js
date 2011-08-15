YUI().use(function(Y) {

	/**
 	 * YUI 3 module metadata
	 */
	var CONFIG = {
		groups: {
			'inputex': {
				base: 'inputex/',
				combine: false,
				modules: {
					
					'cssinputex': {
						type: 'css',
						path: 'css/inputEx.css',
						requires: ['cssreset', 'cssfonts']
					},
				   'inputex': {
				   	path: 'js/inputex.js',
				      requires: ['cssinputex', 'node']
				   },
				
				   // Examples
				   'cssdpSyntaxHighlighter': {
						type: 'css',
						path: 'res/dpSyntaxHighlighter.css'
			      },
				   'dpSyntaxHighlighter': {
				      path: 'res/js/dpSyntaxHighlighter.js',
				      requires: ['cssdpSyntaxHighlighter']
				   },
				   'cssInputex-examples': {
				      path: 'res/demo.css',
				      type: 'css'
				   },
				   'inputex-examples': {
				   	path: 'js/inputex-examples.js',
				      requires: ['inputex','dpSyntaxHighlighter','cssInputex-examples']
				   },
				
					// inputEx base
					'inputex-field': {
						path: 'js/Field.js',
						requires: ['inputex']
					},
					'inputex-visus': {
					  	path: 'js/Visus.js',
						requires: ['inputex','dump']
					},
					'inputex-jsonschema': {
						path: 'js/json-schema.js',
						requires: ['inputex']
					},
					// RPC
					'inputex-rpc': {
						path: 'js/rpc/inputex-rpc.js',
						requires: ['json','inputex','yui2-connection','inputex-jsonschema']
					},
					'inputex-smdtester': {
						path: 'js/rpc/smdTester.js',
						requires: ['inputex-rpc', 'inputex-jsontreeinspector']
					},
					// Mixins
					'inputex-choice': {
						path: 'js/mixins/choice.js',
						requires: ['inputex']
					},
					// Widgets
					'inputex-ddlist': {
						path: 'js/widgets/ddlist.js',
						requires: ['inputex', 'dd','event-custom']
					},
					'inputex-dialog': {
						path: 'js/widgets/Dialog.js',
						requires: ['inputex-form', 'yui2-dragdrop', 'yui2-container']
					},
					'inputex-datatable': {
						path: 'js/widgets/DataTable.js',
						requires: ['yui2-datatable', 'yui2-button','inputex', 'inputex-dialog']
					},
					'inputex-dtinplaceedit': {
						path: 'js/widgets/dtInPlaceEdit.js',
						requires: ['inputex-datatable']
					},
					'inputex-jsontreeinspector': {
					  	path: 'js/widgets/json-tree-inspector.js',
					  	requires: ['inputex']
					},
					'inputex-button': {
					  	path: 'js/widgets/Button.js',
					   requires: ['inputex']
					},
					// MetaFields
					'inputex-group': {
						path: 'js/Group.js',
						requires: ['inputex-field']
					},
					'inputex-form': {
						path: 'js/Form.js',
						requires: ['inputex-group','inputex-button']
					},
					'inputex-list': {
						path: 'js/fields/ListField.js',
						requires: ['inputex-field','anim']
					},
					'inputex-tree': {
						path: 'js/fields/TreeField.js',
						requires: ['inputex-string', 'inputex-list','inputex-inplaceedit']
					},
					'inputex-combine': {
						path: 'js/fields/CombineField.js',
						requires: ['inputex-group']
					},
					'inputex-inplaceedit': {
						path: 'js/fields/InPlaceEdit.js',
						requires: ['inputex-field', 'inputex-button', 'anim','inputex-visus']
					},
					'inputex-lens': {
						path: 'js/fields/Lens-beta.js',
						requires: ['inputex-group','inputex-inplaceedit']
					},
					'inputex-serialize': {
					   path: 'js/fields/SerializeField-beta.js',
					   requires: ['inputex-string','json']
					},
					// Fields
					'inputex-string': {
						path: 'js/fields/StringField.js',
						requires: ['inputex-field','event-key']
					},
					'inputex-uppercase': {
						path: 'js/fields/UpperCaseField.js',
						requires: ['inputex-string']
					},
					'inputex-autocomplete': {
						path: 'js/fields/AutoComplete.js',
						requires: ['inputex-string','autocomplete', 'autocomplete-filters', 'autocomplete-highlighters']
					},
					'inputex-checkbox': {
						path: 'js/fields/CheckBox.js',
						requires: ['inputex-field']
					},
					'inputex-color': {
						path: 'js/fields/ColorField.js',
						requires: ['inputex-field','yui2-container','yui2-button']
					},
					'inputex-colorpicker': {
						path: 'js/fields/ColorPickerField.js',
						requires: ['inputex-field','yui2-colorpicker','yui2-container','yui2-menu','yui2-button']
					},
					'inputex-date': {
						path: 'js/fields/DateField.js',
						requires: ['inputex-string']
					},
					'inputex-datepicker': {
						path: 'js/fields/DatePickerField.js',
						requires: ['yui2-calendar', 'yui2-button', 'inputex-date', 'yui2-container']
					},
					'inputex-dateselectmonth': {
						path: 'js/fields/DateSelectMonthField.js',
						requires: ['inputex-combine']
					},
					'inputex-integer': {
						path: 'js/fields/IntegerField.js',
						requires: ['inputex-string']
					},
					'inputex-datesplit': {
						path: 'js/fields/DateSplitField.js',
						requires: ['inputex-combine', 'inputex-integer']
					},
					'inputex-select': {
						path: 'js/fields/SelectField.js',
						requires: ['inputex-field','inputex-choice']
					},
					'inputex-time': {
						path: 'js/fields/TimeField.js',
						requires: ['inputex-combine', 'inputex-select']
					},
					'inputex-datetime': {
						path: 'js/fields/DateTimeField.js',
						requires: ['inputex-datepicker', 'inputex-combine', 'inputex-time']
					},
					'inputex-timeinterval': {
						path: 'js/fields/TimeIntervalField.js',
						requires: ['inputex-combine', 'inputex-select']
					},
					'inputex-dsselect': {
						path: 'js/fields/DSSelectField.js',
						requires: ['inputex-select', 'yui2-datasource']
					},
					'inputex-email': {
						path: 'js/fields/EmailField.js',
						requires: ['inputex-string']
					},
					'inputex-hidden': {
						path: 'js/fields/HiddenField.js',
						requires: ['inputex-field']
					},
					'inputex-keyvalue': {
						path: 'js/fields/KeyValueField-beta.js',
						requires: ['inputex-combine']
					},
					'inputex-keyopvalue': {
						path: 'js/fields/KeyOpValueField-beta.js',
						requires: ['inputex-keyvalue']
					},
					'inputex-multiautocomplete': {
						path: 'js/fields/MultiAutoComplete.js',
						requires: ['inputex-autocomplete','json','inputex-ddlist']
					},
					'inputex-multiselect': {
						path: 'js/fields/MultiSelectField.js',
						requires: ['inputex-select', 'inputex-ddlist']
					},
					'inputex-number': {
						path: 'js/fields/NumberField.js',
						requires: ['inputex-string']
					},
					'inputex-password': {
						path: 'js/fields/PasswordField.js',
						requires: ['inputex-string']
					},
					'inputex-radio': {
						path: 'js/fields/RadioField.js',
						requires: ['selector','event-delegate','inputex-field','inputex-choice','inputex-string']
					},
					'inputex-rte': {
						path: 'js/fields/RTEField.js',
						requires: ['inputex-field', 'yui2-editor']
					},
					'inputex-slider': {
						path: 'js/fields/SliderField.js',
						requires: ['inputex-field', 'yui2-slider']
					},
					'inputex-textarea': {
						path: 'js/fields/Textarea.js',
						requires: ['inputex-string']
					},
					'inputex-type': {
						path: 'js/fields/TypeField.js',
						requires: ['inputex-field','inputex-group','inputex-select', 'inputex-list','inputex-string','inputex-checkbox','inputex-integer']
					},
					'inputex-uneditable': {
						path: 'js/fields/UneditableField.js',
						requires: ['inputex-field', 'inputex-visus']
					},
					'inputex-url': {
						path: 'js/fields/UrlField.js',
						requires: ['inputex-string']
					},
					'inputex-dateselectmonth': {
					  	path: 'js/fields/DateSelectMonthField.js',
						requires: ['inputex-combine', 'inputex-string', 'inputex-select']
					},
					'inputex-ipv4': {
					  	path: 'js/fields/IPv4Field.js',
						requires: ['inputex-string']
					},
					'inputex-vector': {
					  	path: 'js/fields/VectorField.js',
						requires: ['inputex-combine']
					},
					'inputex-map': {
					  	path: 'js/fields/MapField.js',
						requires: ['inputex-field']
					},
					'inputex-ratingstars': {
					  	path: 'js/fields/RatingStars.js',
						requires: ['inputex-field']
					},
					'inputex-ratingstarsform': {
					  	path: 'js/fields/RatingStarsForm.js',
                  requires: ['inputex-ratingstars','inputex-form']
					},
					'inputex-menu': {
					  	path: 'js/fields/MenuField.js',
					   requires: ['inputex-field','yui2-menu']
					},
					'inputex-file': {
					 	path: 'js/fields/FileField.js',
					   requires: ['inputex-field']
					},
					'inputex-tinymce': {
					   path: 'js/fields/TinyMCEField.js',
					   requires: ['inputex-field']
					},
					// Locals
					'inputex-lang-fr': {
					  	path: 'js/locals/fr.js',
						requires: ['inputex']
					},
					'inputex-lang-it': {
					  	path: 'js/locals/it.js',
					   requires: ['inputex']
					},
					'inputex-lang-nl': {
						path: 'js/locals/nl.js',
					   requires: ['inputex']
					},
					'inputex-lang-es': {
						path: 'js/locals/es.js',
					   requires: ['inputex']
					},
					'inputex-lang-de': {
						path: 'js/locals/de.js',
					   requires: ['inputex']
					}/*,
					// Piercus widgets
					'inputex-pie-listcustom': {
						path: 'js/widgets/listCustom.js',
						requires: ['inputex-ddlist','yui2-json']
					},
					'inputex-pie-multiselect':{
						path: 'js/fields/MultiSelectFieldCustom.js',
						requires: ['inputex-multiselect', 'inputex-pie-listcustom']
					},
					'inputex-pie-multiautocomplete':{
						path: 'js/fields/MultiAutoCompleteCustom.js',
						requires: ['inputex-multiautocomplete', 'inputex-pie-listcustom']
					}*/
				}
			}
		}
	};

	if(typeof YUI_config === 'undefined') { YUI_config = {groups: {}}; }
	Y.mix(YUI_config.groups, CONFIG.groups);

   // Build a list of all inputEx modules except '-lang-' modules
   var modules = YUI_config.groups.inputex.modules,
       modulesToLoad = [];
   for(var moduleName in modules) {
     if (modules.hasOwnProperty(moduleName) && !moduleName.match(/\-lang\-/) ) {
       modulesToLoad.push(moduleName);
     }
   }
   YUI_config.groups.inputex.allModules = modulesToLoad;

});

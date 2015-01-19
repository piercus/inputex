
<!DOCTYPE html>
<html>
 <head>
  <title>inputEx - Examples</title>

<link rel="stylesheet" href="http://yui.yahooapis.com/combo?3.4.0/build/cssreset/reset-min.css&3.4.0/build/cssfonts/fonts-min.css">
<link rel="stylesheet" href="../../src/inputex/assets/skins/sam/inputex.css">
<link rel="stylesheet" href="../../res/demo.css">
<link rel="stylesheet" href="../../res/syntaxhighlighter/styles/shCore.css">
<link rel="stylesheet" href="../../res/syntaxhighlighter/styles/shThemeDefault.css">
<script src="../../res/syntaxhighlighter/scripts/shCore.js"  type='text/javascript'></script>
<script src="../../res/syntaxhighlighter/scripts/shBrushJScript.js"  type='text/javascript'></script>

 </head>
 <body>
 <style>
   #selects{
       margin: 20px;
       padding: 15px;
       border: 1px solid #99F;
   }
   #selects select{
       margin:10px;
   }
 </style>
<script src="libManager.js"  type='text/javascript'></script>
<script src="examples.js"  type='text/javascript'></script>
<script>
    var require = {
        baseUrl : "../../../",
        paths : {"jquery" : "inputex/lib/jquery"},
        waitSeconds: 15,
        urlArgs: "bustt=" +  (new Date()).getTime()
    };
</script>

<h1>InputEx Examples</h1>
<div id="selects" class="demoContainer">
<?php
   // ?librairy=yui2&field=inputex-string
   parse_str($_SERVER['QUERY_STRING']);
   $librairies = array(
       -1 => '--',
    	1 => 'yui2',
    	2 => 'yui3',
      3 => 'requirejs'
    );
    $fields = array(
        -1 => '--',
    	1 => 'inputex-string',
    	2 => 'inputex-url',
    	3 => 'inputex-email',
    	4 => 'inputex-group',
    	5 => 'inputex-form',
    	6 => 'inputex-list',  
    	7 => 'inputex-select',
    	8 => 'inputex-radio',
    	9 => 'inputex-multi'
    );
	function generateSelect($name, $options, $selected,$title) {
    	$html = '<h3>'.$title.'</h3><select id="'.$name.'" name="'.$name.'">';
    	foreach ($options as $option => $value) {
    	    if($value == $selected){
    	        $html .= '<option value='.$option.' selected="selected">'.$value.'</option>';    	        
    	    } else {
    	        $html .= '<option value='.$option.'>'.$value.'</option>';    	        
    	    }
    	}
    	$html .= '</select>';
    	return $html;
    };
    echo generateSelect('librairy', $librairies,$librairy,"Choose a librairy");
    echo generateSelect('field', $fields,$field,"Choose a field") ;

?>
</div>



<div id="examples"></div>
 </body>
</html>

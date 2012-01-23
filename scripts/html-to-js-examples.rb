
require "nokogiri"
require "json"

Dir['examples/*.html'].each{|p| 
  puts p
  exs = []
  f = File.open p
  Nokogiri::HTML(f.read).css("div.exampleDiv").each{|e|
    if(e.elements[0] && e.elements[1] && e.elements.css("pre"))
      exs.push({
        :title => e.elements[0].inner_html,
        :description => e.elements[1].inner_html.gsub("\"","'"),
        :fn => "function(parentEl,I){"+
                    e.elements.css("pre").inner_html
                    .gsub(/('|\")container[0-9]+('|\")/,"parentEl")
                    .gsub("Y.inputEx","I")
                    .gsub("inputEx","I")               
                    .gsub(/Y\.one\((\"|')(#.*)(\"|')\)/,"document.getElementById(parentEl)")+"}"
      })
    end
  }
  r = p.match(/examples\/([a-zA-Z]*)(_field)?\.html/)
  if(r && exs.length > 0)
    field = "inputex-"+r[1]
    dir = "src/"+field
    to_field = dir+"/"+field+"-examples.js"
    if(File.exist?(dir))
      File.open(to_field, "w"){|f2|
        p "writing"
        f2.write("gI.addExamples(\""+field+"\", {
              keyObject: \"\",list:["+exs.collect{|e| "{\n\t\ttitle:\""+e[:title]+"\",\n\t\tdescription:\""+e[:description]+"\",\n\t\tfn:"+e[:fn]+"}"}.join(",")+"]});")
      }
    end
  end
}
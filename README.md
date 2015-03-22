# dGraph

dGraph is a tool to build dependency graphs for AMD modules.

It will receive the entry file as a parameter. Optionally it will accept a requirejs config file for the module ID => file map.

##Example output
```
/usr/local/bin/dtrack test/support/sampleAppConfig/app.js test/support/sampleAppConfig/config.js

digraph dependencies { "app.js" -> "jquery";"app.js" -> "Router";"app.js" -> "PageController";"app.js" -> "BasePage";"Router" -> "Backbone";"PageController" -> "Pages";"PageController" -> "BasePage";"PageController" -> "Repository";"BasePage" -> "PageCommon";"BasePage" -> "Providers";"PageCommon" -> "jquery";"PageCommon" -> "underscore";"Providers" -> "jquery";"Providers" -> "Repository"; }
```
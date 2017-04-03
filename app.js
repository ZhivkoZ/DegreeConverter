var express = require("express");
var app = express();
var path = require("path");

app.use("/", express.static(path.join(__dirname, "/node_modules/")))
app.use("/default.css", express.static(path.join(__dirname, "/static/default.css")))
app.use("/controller.js", express.static(path.join(__dirname, "/static/controller.js")))

app.get("/:method?/:value?/", function (req, res) {
  console.log( "//[" + new Date() + "]" + req.connection.remoteAddress + " requested" );
  console.log(req.params);
  var method = req.params.method;
  var value = parseFloat(req.params.value);

  if(!method) {
    res.sendFile(path.join(__dirname + "/static/index.html"));
    return;
  } else if(isNaN(value)) {
    res.status(405).json({details:"Method not allowed"});
    return;
  }

  switch(method) {
    case "c2f":
      res.json({fahrenheit: parseFloat((value * 9 / 5 + 32).toFixed(2))});
      break;
    case "f2c":
      res.json({celsius: parseFloat(((value - 32) * 5 / 9).toFixed(2))});
      break;
    default:
  }
})

app.listen(3000, function () {
  console.log('DegreeConverter listening on port 3000')
})

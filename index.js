"use strict";

const express = require("express");
const bodyParser = require("body-parser");

const restService = express();

restService.use(
  bodyParser.urlencoded({
    extended: true
  })
);

restService.use(bodyParser.json());

restService.post("/", function (req, res) {
    var speech = "";
    if (req.body.result &&
        req.body.result.parameters)
    {
        //if (req.body.result.parameters.Widget && req.body.result.parameters.WidgetProperty) {
        //    speech = "here is the code snippet. \n " + req.body.result.parameters.Widget + "." + req.body.result.parameters.WidgetProperty + " = <some value>;";
        //}
        //else {
        //    speech = "You are trying to get help on " + req.body.result.parameters.Widget;
        //}
        speech = speech + "\n" + JSON.stringify(req.body.result.parameters);
    }
    else
    {
        speech = "Did you Speak? Seems like some problem. Speak again.";
    } 
  return res.json({
    speech: speech,
    displayText: speech,
    source: "KonyIQ"
  });
});

restService.get("/", function (req, res) {
    return res.json({
        speech:
        'dummy GET implementation',
        displayText:
        'dummy GET implementation',
        source: "KonyIQ Help"
    });
});

restService.listen(process.env.PORT || 8000, function() {
    console.log("Server up and listening at http://localhost:5000/");
});

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
        //speech = speech + "\n" + JSON.stringify(req.body.result.parameters);
        //return res.json({
        //    speech: speech,
        //    displayText: speech,
        //    source: "KonyIQ"
        //});

        speech = JSON.stringify(req.body.result.parameters);
        var accessTocken = 'xx2b18016f-7c73-418e-a61e-02d06be87d74';
        var request = require('request');
        var requesturl = 'https://platform.cloud.coveo.com/rest/search/v2/?aq=';
        requesturl += encodeURI(speech);
        requesturl += '&access_token=' + accessTocken;
        requesturl += '&organizationId=konycommunitycloud';
        request(requesturl, function (error, response, body) {
            return res.json({
                speech: speech,
                displayText: response.body,
                source: "KonyIQ"
            });
        }.bind(this)
        );
    }
    else
    {
        speech = "Did you Speak? Seems like some problem. Speak again.";

        return res.json({
            speech: speech,
            displayText: speech,
            source: "KonyIQ"
        });
    } 
 
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

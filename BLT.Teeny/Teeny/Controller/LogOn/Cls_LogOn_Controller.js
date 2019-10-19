
let Cls_LogOn_Models = require("../../Models/LogOn/Cls_LogOn_Models.js");

myGlobal.App.post('/LogOn/GetWindowUser', function (req, res) {
     
      var path = require('path');
      var userName = req.body.enUser;
      
     if(userName === "")
     {
        try
        {
           userName = process.env['USERPROFILE'].split(path.sep)[2];
           
           var item = {
               "Value": userName,
               "Text": userName
            };
           
           var jsonStr = JSON.stringify(item);
           
           res.end(jsonStr);

        }
        catch(err)
        {
            var item = {
               "Value": "Error",
               "Text": err
            };
           
           var jsonStr = JSON.stringify(item);
           
           res.end(jsonStr);
        }
    }
    else
    {
        var item = {
               "Value": userName,
               "Text": userName
            };
           
           var jsonStr = JSON.stringify(item);
           
           res.end(jsonStr);
    }
      
 });
 
myGlobal.App.post('/LogOn/GetGroup', function (req, res) {

    let model = new Cls_LogOn_Models();

    switch (req.body.modeRun) {

        case "Internal":

            model.Fn_GetGroup(req.body, function (result) {

                res.end(result);
            });

            break;

        case "External":
            
            //console.log("xxx");

            var item = {
                res: res,
                token: Date.now(),
                STORY: "SecurityControl"               
            };

            myGlobal.ListResponse.push(item);

            let dataItem = {
                TOKEN: item.token,
                STORY: item.STORY,
                ACTION: "GetGroup",
                ACTION_RETURN: "Return/GetGroup",
                WEBAPI_ACTION: "/LogOn/GetGroup",
                TOPPIC_RETURN: myGlobal.ItemConfig.MY_TOPPIC[0].TOPPIC_NAME,
                FORM: {
                    data: JSON.stringify(req.body)
                }
            };

            let toppicPublicDataGateway = myGlobal.ItemConfig.TOPPIC_PUBLIC_DATAGATEWAY.TOPPIC1;

            let jsonStr = JSON.stringify(dataItem);

            //=== Send To External DataGateway ===//
            //myGlobal.BrokerPublic.publish(toppicPublicDataGateway , jsonStr, myGlobal.Options);

            model.Fn_SendMqttPublish(toppicPublicDataGateway, jsonStr);

            break;
    }

});
    
myGlobal.App.post('/LogOn/GetMenu', function (req, res) {

    switch (req.body.modeRun) {

        case "Internal":

            let model = new Cls_LogOn_Models();

            model.Fn_GetMenu(req.body, function (result) {

                res.end(result);
            });

            break;

        case "External":
            
            var item = {
                res: res,
                token: Date.now(),
                STORY: "SecurityControl"
            };

            myGlobal.ListResponse.push(item);


            let dataItem = {
                TOKEN: item.token,
                STORY: item.STORY,
                ACTION: "GetMenu",
                ACTION_RETURN: "Return/GetMenu",
                WEBAPI_ACTION: "/LogOn/GetMenu",
                TOPPIC_RETURN: myGlobal.ItemConfig.MY_TOPPIC[0].TOPPIC_NAME,
                FORM: {
                    data: JSON.stringify(req.body)
                }
            };

             let toppicPublicDataGateway = myGlobal.ItemConfig.TOPPIC_PUBLIC_DATAGATEWAY.TOPPIC1;

            let jsonStr = JSON.stringify(dataItem);

            //=== Send To External DataGateway ===//
            myGlobal.BrokerPublic.publish(toppicPublicDataGateway , jsonStr, myGlobal.Options);

           
            break;

    }

});


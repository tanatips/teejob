
let Cls_Shipment_Models = require("../../../Models/Worker/Shipment/Cls_Shipment_Models.js");

myGlobal.App.post('/Shipment/Search', function (req, res) {

    try {

        let dataItem = req.body;

        dataItem.Start = req.body.start;
        dataItem.Limit = req.body.limit;

        let model = new Cls_Shipment_Models();

        switch (dataItem.ModeRun) {

            case "Internal":

                let urlWebApi = myGlobal.ItemConfig.WEB_API.URL + "/Shipment/Search";

                model.Fn_CallInternalWebApi(urlWebApi, dataItem, function (result) {

                    let resultData = JSON.parse(result);

                    if (resultData.StatusOnDb === true) {

                        res.end(JSON.stringify(resultData.ResultList));
                    }
                    else {
                        resultList = [{
                            No: 1,
                            SHIPMENT_NO: "Error",
                            DESCRIPTION: resultData.MessageOnDb
                        }];

                        res.end(JSON.stringify({ data: resultList, totalCount: 1 }));
                    }
                });

                break;

            case "External":

                var item = {
                    res: res,
                    token: Date.now(),
                    STORY: "DataAccess"
                };

                myGlobal.ListResponse.push(item);

                dataItem = {
                    TOKEN: item.token,
                    STORY: item.STORY,
                    ACTION: "Shipment/Search",
                    ACTION_RETURN: "Return/Shipment/Search",
                    WEBAPI_ACTION: "/Shipment/Search",
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

    }
    catch (err) {

        //console.log("Error From Web Api Controller : " + err + "\n");

        let resultList = [{
            No: 1,
            SHIPMENT_NO: "Error",
            DESCRIPTION: 'Error When Call WebApi: ' + err.message
        }];

        res.end(JSON.stringify({ data: resultList, totalCount: 1 }));
    }
});

myGlobal.App.post('/Shipment/Insert', function (req, res) {

    try {

        let dataItem = req.body;
        let model = new Cls_Shipment_Models();

        switch (dataItem.ModeRun) {

            case "Internal":
                
                let urlWebApi = myGlobal.ItemConfig.WEB_API.URL + "/Shipment/Insert";

                model.Fn_CallInternalWebApi(urlWebApi, dataItem, function (result) {

                    let resultData = JSON.parse(result);

                    if (resultData.StatusOnDb === true) {

                         resultData = {
                            StatusOnDb: true,
                             MessageOnDb: "Success"
                        };

                        res.end(JSON.stringify(resultData));
                    }
                    else {

                        resultData = {
                            StatusOnDb: false,
                            MessageOnDb: resultData.MessageOnDb
                        };

                        res.end(JSON.stringify(resultData));
                    }
                });

                break;

            case "External":

                var item = {
                    res: res,
                    token: Date.now(),
                    STORY: "DataAccess"
                };

                myGlobal.ListResponse.push(item);

                dataItem = {
                    TOKEN: item.token,
                    STORY: item.STORY,
                    ACTION: "Shipment/Insert",
                    ACTION_RETURN: "Return/Shipment/Insert",
                    WEBAPI_ACTION: "/Shipment/Insert",
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
        
    }
    catch (err) {

        //console.log("Error From Web Api Controller : " + err + "\n");

        let resultData = {
            StatusOnDb: false,
            MessageOnDb: err.message                       
        };

        res.end(JSON.stringify(resultData));
    }
});

myGlobal.App.post('/Shipment/Update', function (req, res) {

    try {

        let dataItem = req.body;
        let model = new Cls_Shipment_Models();

        switch (dataItem.ModeRun) {

            case "Internal":

                let urlWebApi = myGlobal.ItemConfig.WEB_API.URL + "/Shipment/Update";

                model.Fn_CallInternalWebApi(urlWebApi, dataItem, function (result) {

                    let resultData = JSON.parse(result);

                    if (resultData.StatusOnDb === true) {

                        resultData = {
                            StatusOnDb: true,
                            MessageOnDb: "Success"
                        };

                        res.end(JSON.stringify(resultData));
                    }
                    else {

                        resultData = {
                            StatusOnDb: false,
                            MessageOnDb: resultData.MessageOnDb
                        };

                        res.end(JSON.stringify(resultData));
                    }
                });

                break;

            case "External":

                var item = {
                    res: res,
                    token: Date.now(),
                    STORY: "DataAccess"
                };

                myGlobal.ListResponse.push(item);

                dataItem = {
                    TOKEN: item.token,
                    STORY: item.STORY,
                    ACTION: "Shipment/Update",
                    ACTION_RETURN: "Return/Shipment/Update",
                    WEBAPI_ACTION: "/Shipment/Update",
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

    }
    catch (err) {

        //console.log("Error From Web Api Controller : " + err + "\n");

        let resultData = {
            StatusOnDb: false,
            MessageOnDb: err.message
        };

        res.end(JSON.stringify(resultData));
    }
});

myGlobal.App.post('/Shipment/Delete', function (req, res) {

    try {

        let dataItem = req.body;
        let model = new Cls_Shipment_Models();

        switch (dataItem.ModeRun) {

            case "Internal":

                let urlWebApi = myGlobal.ItemConfig.WEB_API.URL + "/Shipment/Delete";

                model.Fn_CallInternalWebApi(urlWebApi, dataItem, function (result) {

                    let resultData = JSON.parse(result);

                    if (resultData.StatusOnDb === true) {

                        resultData = {
                            StatusOnDb: true,
                            MessageOnDb: "Success"
                        };

                        res.end(JSON.stringify(resultData));
                    }
                    else {

                        resultData = {
                            StatusOnDb: false,
                            MessageOnDb: resultData.MessageOnDb
                        };

                        res.end(JSON.stringify(resultData));
                    }
                });

                break;

            case "External":

                var item = {
                    res: res,
                    token: Date.now(),
                    STORY: "DataAccess"
                };

                myGlobal.ListResponse.push(item);

                dataItem = {
                    TOKEN: item.token,
                    STORY: item.STORY,
                    ACTION: "Shipment/Delete",
                    ACTION_RETURN: "Return/Shipment/Delete",
                    WEBAPI_ACTION: "/Shipment/Delete",
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

    }
    catch (err) {

        //console.log("Error From Web Api Controller : " + err + "\n");

        let resultData = {
            StatusOnDb: false,
            MessageOnDb: err.message
        };

        res.end(JSON.stringify(resultData));
    }
});


myGlobal.App.post('/Shipment/GetShipmentByOrder', function (req, res) {

    try {

        let dataItem = req.body;
        let model = new Cls_Shipment_Models();

        switch (dataItem.ModeRun) {

            case "Internal":

                let urlWebApi = myGlobal.ItemConfig.WEB_API.URL + "/Shipment/GetShipmentByOrder";

                model.Fn_CallInternalWebApi(urlWebApi, dataItem, function (result) {

                    let resultData = JSON.parse(result);

                    if (resultData.StatusOnDb === true) {

                        res.end(JSON.stringify(resultData.ResultList));
                    }
                    else {

                        resultData = {
                            StatusOnDb: false,
                            MessageOnDb: resultData.MessageOnDb
                        };

                        res.end(JSON.stringify(resultData));
                    }
                });

                break;

            case "External":

                var item = {
                    res: res,
                    token: Date.now(),
                    STORY: "DataAccess"
                };

                myGlobal.ListResponse.push(item);

                dataItem = {
                    TOKEN: item.token,
                    STORY: item.STORY,
                    ACTION: "Shipment/GetShipmentByOrder",
                    ACTION_RETURN: "Return/Shipment/GetShipmentByOrder",
                    WEBAPI_ACTION: "/Shipment/GetShipmentByOrder",
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

    }
    catch (err) {

        //console.log("Error From Web Api Controller : " + err + "\n");

        let resultData = {
            StatusOnDb: false,
            MessageOnDb: err.message
        };

        res.end(JSON.stringify(resultData));
    }

});


myGlobal.App.post('/Shipment/SendDataToMachine', function (req, res) {

    try {

        let dataItem = req.body;
        let model = new Cls_Shipment_Models();

        switch (dataItem.ModeRun) {

            case "Internal":               
            case "External":

                var item = {
                    res: res,
                    token: Date.now(),
                    STORY: "DataAccess"
                };

                myGlobal.ListResponse.push(item);

                dataItem = {
                    TOKEN: item.token,
                    STORY: item.STORY,
                    ACTION: "Shipment/SendDataToMachine",
                    ACTION_RETURN: "Return/Shipment/SendDataToMachine",
                    WEBAPI_ACTION: "/Shipment/SendDataToMachine",
                    TOPPIC_RETURN: myGlobal.ItemConfig.MY_TOPPIC[1].TOPPIC_NAME,
                    FORM: {
                        data: JSON.stringify(req.body)
                    }
                };

                let toppicPrivateDataGateway = myGlobal.ItemConfig.TOPPIC_PRIVATE_DATAGATEWAY.TOPPIC1;

                let jsonStr = JSON.stringify(dataItem);

                //=== Send To External DataGateway ===//
                //myGlobal.BrokerPublic.publish(toppicPublicDataGateway , jsonStr, myGlobal.Options);
                model.Fn_SendMqttPrivate(toppicPrivateDataGateway, jsonStr);

                break;
        }

    }
    catch (err) {

        //console.log("Error From Web Api Controller : " + err + "\n");

        let resultData = {
            StatusOnDb: false,
            MessageOnDb: err.message
        };

        res.end(JSON.stringify(resultData));
    }

});

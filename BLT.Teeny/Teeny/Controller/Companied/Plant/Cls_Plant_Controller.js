
let Cls_Plant_Models = require("../../../Models/Companied/Plant/Cls_Plant_Models.js");

myGlobal.App.post('/Plant/Search', function (req, res) {

    try {

        let dataItem = req.body;

        dataItem.Start = req.body.start;
        dataItem.Limit = req.body.limit;

        let model = new Cls_Plant_Models();

        switch (dataItem.ModeRun) {

            case "Internal":

                let urlWebApi = myGlobal.ItemConfig.WEB_API.URL + "/Plant/Search";

                model.Fn_CallInternalWebApi(urlWebApi, dataItem, function (result) {

                    let resultData = JSON.parse(result);

                    if (resultData.StatusOnDb === true) {

                        res.end(JSON.stringify(resultData.ResultList));
                    }
                    else {
                        resultList = [{
                            No: 1,
                            PLANT_NAME: "Error",
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
                    ACTION: "Plant/Search",
                    ACTION_RETURN: "Return/Plant/Search",
                    WEBAPI_ACTION: "/Plant/Search",
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
            PLANT_NAME: "Error",
            DESCRIPTION: 'Error When Call WebApi: ' + err.message 
        }];

        res.end(JSON.stringify({ data: resultList, totalCount: 1 }));
    }
});

myGlobal.App.post('/Plant/Insert', function (req, res) {

    try {

        let dataItem = req.body;
        let model = new Cls_Plant_Models();

        switch (dataItem.ModeRun) {

            case "Internal":
                
                let urlWebApi = myGlobal.ItemConfig.WEB_API.URL + "/Plant/Insert";

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
                    ACTION: "Plant/Insert",
                    ACTION_RETURN: "Return/Plant/Insert",
                    WEBAPI_ACTION: "/Plant/Insert",
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

myGlobal.App.post('/Plant/Update', function (req, res) {

    try {

        let dataItem = req.body;
        let model = new Cls_Plant_Models();

        switch (dataItem.ModeRun) {

            case "Internal":

                let urlWebApi = myGlobal.ItemConfig.WEB_API.URL + "/Plant/Update";

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
                    ACTION: "Plant/Update",
                    ACTION_RETURN: "Return/Plant/Update",
                    WEBAPI_ACTION: "/Plant/Update",
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

myGlobal.App.post('/Plant/Delete', function (req, res) {

    try {

        let dataItem = req.body;
        let model = new Cls_Plant_Models();

        switch (dataItem.ModeRun) {

            case "Internal":

                let urlWebApi = myGlobal.ItemConfig.WEB_API.URL + "/Plant/Delete";

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
                    ACTION: "Plant/Delete",
                    ACTION_RETURN: "Return/Plant/Delete",
                    WEBAPI_ACTION: "/Plant/Delete",
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

myGlobal.App.post('/Plant/GetPlantAll', function (req, res) {

    try {

        let dataItem = req.body;
        let model = new Cls_Plant_Models();

        switch (dataItem.ModeRun) {

            case "Internal":
               
                let urlWebApi = myGlobal.ItemConfig.WEB_API.URL + "/Plant/GetPlantAll";

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
                    ACTION: "Plant/GetPlantAll",
                    ACTION_RETURN: "Return/Plant/GetPlantAll",
                    WEBAPI_ACTION: "/Plant/GetPlantAll",
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


myGlobal.App.post('/Plant/GetPlantByCompany', function (req, res) {

    try {

        let dataItem = req.body;
        let model = new Cls_Plant_Models();

        switch (dataItem.ModeRun) {

            case "Internal":

                let urlWebApi = myGlobal.ItemConfig.WEB_API.URL + "/Plant/GetPlantByCompany";

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
                    ACTION: "Plant/GetPlantByCompany",
                    ACTION_RETURN: "Return/Plant/GetPlantByCompany",
                    WEBAPI_ACTION: "/Plant/GetPlantByCompany",
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


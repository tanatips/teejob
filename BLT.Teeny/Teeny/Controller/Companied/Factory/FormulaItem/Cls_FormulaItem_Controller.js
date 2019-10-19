
let Cls_FormulaItem_Models = require("../../../../Models/Companied/Factory/FormulaItem/Cls_FormulaItem_Models.js");

myGlobal.App.post('/FormulaItem/Search', function (req, res) {

    try {

        let dataItem = req.body;

        dataItem.Start = req.body.start;
        dataItem.Limit = req.body.limit;

        let model = new Cls_FormulaItem_Models();

        switch (dataItem.ModeRun) {

            case "Internal":

                let urlWebApi = myGlobal.ItemConfig.WEB_API.URL + "/FormulaItem/Search";

                model.Fn_CallInternalWebApi(urlWebApi, dataItem, function (result) {

                    let resultData = JSON.parse(result);

                    if (resultData.StatusOnDb === true) {

                        res.end(JSON.stringify(resultData.ResultList));
                    }
                    else {
                        resultList = [{
                            No: 1,                            
                            QUNTITY: "Error",
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
                    ACTION: "FormulaItem/Search",
                    ACTION_RETURN: "Return/FormulaItem/Search",
                    WEBAPI_ACTION: "/FormulaItem/Search",
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
            QUNTITY: 'Error When Call WebApi: ' + err.message,
            DESCRIPTION: resultData.MessageOnDb
        }];

        res.end(JSON.stringify({ data: resultList, totalCount: 1 }));
    }
});

myGlobal.App.post('/FormulaItem/Insert', function (req, res) {

    try {

        let dataItem = req.body;
        let model = new Cls_FormulaItem_Models();

        switch (dataItem.ModeRun) {

            case "Internal":
                
                let urlWebApi = myGlobal.ItemConfig.WEB_API.URL + "/FormulaItem/Insert";

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
                    ACTION: "FormulaItem/Insert",
                    ACTION_RETURN: "Return/FormulaItem/Insert",
                    WEBAPI_ACTION: "/FormulaItem/Insert",
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

myGlobal.App.post('/FormulaItem/Update', function (req, res) {

    try {

        let dataItem = req.body;
        let model = new Cls_FormulaItem_Models();

        switch (dataItem.ModeRun) {

            case "Internal":

                let urlWebApi = myGlobal.ItemConfig.WEB_API.URL + "/FormulaItem/Update";

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
                    ACTION: "FormulaItem/Update",
                    ACTION_RETURN: "Return/FormulaItem/Update",
                    WEBAPI_ACTION: "/FormulaItem/Update",
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

myGlobal.App.post('/FormulaItem/Delete', function (req, res) {

    try {

        let dataItem = req.body;
        let model = new Cls_FormulaItem_Models();

        switch (dataItem.ModeRun) {

            case "Internal":

                let urlWebApi = myGlobal.ItemConfig.WEB_API.URL + "/FormulaItem/Delete";

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
                    ACTION: "FormulaItem/Delete",
                    ACTION_RETURN: "Return/FormulaItem/Delete",
                    WEBAPI_ACTION: "/FormulaItem/Delete",
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

myGlobal.App.post('/FormulaItem/GetFormulaItemAll', function (req, res) {

    try {

        let dataItem = req.body;
        let model = new Cls_FormulaItem_Models();

        switch (dataItem.ModeRun) {

            case "Internal":
               
                let urlWebApi = myGlobal.ItemConfig.WEB_API.URL + "/FormulaItem/GetFormulaItemAll";

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
                    ACTION: "FormulaItem/GetFormulaItemAll",
                    ACTION_RETURN: "Return/FormulaItem/GetFormulaItemAll",
                    WEBAPI_ACTION: "/FormulaItem/GetFormulaItemAll",
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


myGlobal.App.post('/FormulaItem/GetFormulaItemByCompany', function (req, res) {

    try {

        let dataItem = req.body;
        let model = new Cls_FormulaItem_Models();

        switch (dataItem.ModeRun) {

            case "Internal":

                let urlWebApi = myGlobal.ItemConfig.WEB_API.URL + "/FormulaItem/GetFormulaItemByCompany";

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
                    ACTION: "FormulaItem/GetFormulaItemByCompany",
                    ACTION_RETURN: "Return/FormulaItem/GetFormulaItemByCompany",
                    WEBAPI_ACTION: "/FormulaItem/GetFormulaItemByCompany",
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


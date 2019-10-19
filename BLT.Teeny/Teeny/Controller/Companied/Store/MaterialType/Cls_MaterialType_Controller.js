
let Cls_MaterialType_Models = require("../../../../Models/Companied/Store/MaterialType/Cls_MaterialType_Models.js");

myGlobal.App.post('/MaterialType/Search', function (req, res) {

    try {

        let dataItem = req.body;

        dataItem.Start = req.body.start;
        dataItem.Limit = req.body.limit;

        let model = new Cls_MaterialType_Models();

        switch (dataItem.ModeRun) {

            case "Internal":

                let urlWebApi = myGlobal.ItemConfig.WEB_API.URL + "/MaterialType/Search";

                model.Fn_CallInternalWebApi(urlWebApi, dataItem, function (result) {

                    let resultData = JSON.parse(result);

                    if (resultData.StatusOnDb === true) {

                        res.end(JSON.stringify(resultData.ResultList));
                    }
                    else {

                        resultList = [{
                            No: 1,
                            MATERIAL_TYPE_NAME: "Error",
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
                    ACTION: "MaterialType/Search",
                    ACTION_RETURN: "Return/MaterialType/Search",
                    WEBAPI_ACTION: "/MaterialType/Search",
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
            MATERIAL_TYPE_NAME: "Error",
            DESCRIPTION: 'Error When Call WebApi: ' + err.message 
        }];

        res.end(JSON.stringify({ data: resultList, totalCount: 1 }));
    }
});

myGlobal.App.post('/MaterialType/Insert', function (req, res) {

    try {

        let dataItem = req.body;
        let model = new Cls_MaterialType_Models();

        switch (dataItem.ModeRun) {

            case "Internal":
                
                let urlWebApi = myGlobal.ItemConfig.WEB_API.URL + "/MaterialType/Insert";

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
                    ACTION: "MaterialType/Insert",
                    ACTION_RETURN: "Return/MaterialType/Insert",
                    WEBAPI_ACTION: "/MaterialType/Insert",
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

myGlobal.App.post('/MaterialType/Update', function (req, res) {

    try {

        let dataItem = req.body;
        let model = new Cls_MaterialType_Models();

        switch (dataItem.ModeRun) {

            case "Internal":

                let urlWebApi = myGlobal.ItemConfig.WEB_API.URL + "/MaterialType/Update";

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
                    ACTION: "MaterialType/Update",
                    ACTION_RETURN: "Return/MaterialType/Update",
                    WEBAPI_ACTION: "/MaterialType/Update",
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

myGlobal.App.post('/MaterialType/Delete', function (req, res) {

    try {

        let dataItem = req.body;
        let model = new Cls_MaterialType_Models();

        switch (dataItem.ModeRun) {

            case "Internal":

                let urlWebApi = myGlobal.ItemConfig.WEB_API.URL + "/MaterialType/Delete";

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
                    ACTION: "MaterialType/Delete",
                    ACTION_RETURN: "Return/MaterialType/Delete",
                    WEBAPI_ACTION: "/MaterialType/Delete",
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

myGlobal.App.post('/MaterialType/GetMaterialTypeAll', function (req, res) {

    try {

        let dataItem = req.body;
        let model = new Cls_MaterialType_Models();

        switch (dataItem.ModeRun) {

            case "Internal":
               
                let urlWebApi = myGlobal.ItemConfig.WEB_API.URL + "/MaterialType/GetMaterialTypeAll";

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
                    ACTION: "MaterialType/GetMaterialTypeAll",
                    ACTION_RETURN: "Return/MaterialType/GetMaterialTypeAll",
                    WEBAPI_ACTION: "/MaterialType/GetMaterialTypeAll",
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


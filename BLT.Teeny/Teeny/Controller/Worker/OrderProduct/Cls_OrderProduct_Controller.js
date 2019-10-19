
let Cls_OrderProduct_Models = require("../../../Models/Worker/OrderProduct/Cls_OrderProduct_Models.js");

myGlobal.App.post('/OrderProduct/Insert', function (req, res) {

    try {

        let dataItem = req.body;
        let model = new Cls_OrderProduct_Models();

        switch (dataItem.ModeRun) {

            case "Internal":
                
                let urlWebApi = myGlobal.ItemConfig.WEB_API.URL + "/OrderProduct/Insert";

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
                    ACTION: "OrderProduct/Insert",
                    ACTION_RETURN: "Return/OrderProduct/Insert",
                    WEBAPI_ACTION: "/OrderProduct/Insert",
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

myGlobal.App.post('/OrderProduct/Update', function (req, res) {

    try {

        let dataItem = req.body;
        let model = new Cls_OrderProduct_Models();

        switch (dataItem.ModeRun) {

            case "Internal":

                let urlWebApi = myGlobal.ItemConfig.WEB_API.URL + "/OrderProduct/Update";

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
                    ACTION: "OrderProduct/Update",
                    ACTION_RETURN: "Return/OrderProduct/Update",
                    WEBAPI_ACTION: "/OrderProduct/Update",
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

myGlobal.App.post('/OrderProduct/Delete', function (req, res) {

    try {

        let dataItem = req.body;
        let model = new Cls_OrderProduct_Models();

        switch (dataItem.ModeRun) {

            case "Internal":

                let urlWebApi = myGlobal.ItemConfig.WEB_API.URL + "/OrderProduct/Delete";

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
                    ACTION: "OrderProduct/Delete",
                    ACTION_RETURN: "Return/OrderProduct/Delete",
                    WEBAPI_ACTION: "/OrderProduct/Delete",
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


myGlobal.App.post('/OrderProduct/GetOrderProductDetail', function (req, res) {

    try {

        let dataItem = req.body;

        let model = new Cls_OrderProduct_Models();

        switch (dataItem.ModeRun) {

            case "Internal":

                let urlWebApi = myGlobal.ItemConfig.WEB_API.URL + "/OrderProduct/GetOrderProductDetail";

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
                    ACTION: "OrderProduct/GetOrderProductDetail",
                    ACTION_RETURN: "Return/OrderProduct/GetOrderProductDetail",
                    WEBAPI_ACTION: "/OrderProduct/GetOrderProductDetail",
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

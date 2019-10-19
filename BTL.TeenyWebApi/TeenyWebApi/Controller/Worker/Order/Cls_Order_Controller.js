
let Cls_Order_Models = require("../../../Models/Worker/Order/Cls_Order_Models.js");


myGlobal.App.post('/Order/Search', function (req, res) {

    try {

        let dataItem = JSON.parse(req.body.data);

        dataItem.Limit = (parseInt(dataItem.Start) + parseInt(dataItem.Limit)).toString();

        let model = new Cls_Order_Models();

        model.Fn_Search(dataItem, function (resultData) {

            //res.end(JSON.stringify(resultData));

            if (resultData.StatusOnDb === true) {

                var list = [];

                for (var i = 0; i < resultData.ResultOnDb.length; i++) {

                    var item = {
                        No: (i + 1).toString(),    
                        ORDER_ID: resultData.ResultOnDb[i].ORDER_ID,
                        ORDER_NO: resultData.ResultOnDb[i].ORDER_NO,
                        STATUS_GROUP_ID: resultData.ResultOnDb[i].STATUS_GROUP_ID,
                        STATUS_GROUP_NAME: resultData.ResultOnDb[i].STATUS_GROUP_NAME,
                        STATUS_ID: resultData.ResultOnDb[i].STATUS_ID,
                        STATUS_NAME: resultData.ResultOnDb[i].STATUS_NAME,                     
                        CUSTOMER_ID: resultData.ResultOnDb[i].CUSTOMER_ID,
                        CUSTOMER_NAME: resultData.ResultOnDb[i].CUSTOMER_NAME,
                        CUSTOMER_TYPE_ID: resultData.ResultOnDb[i].CUSTOMER_TYPE_ID,
                        CUSTOMER_TYPE_NAME: resultData.ResultOnDb[i].CUSTOMER_TYPE_NAME,
                        ORDER_PAYMENT_ID: resultData.ResultOnDb[i].ORDER_PAYMENT_ID,
                        ORDER_PAYMENT_NAME: resultData.ResultOnDb[i].ORDER_PAYMENT_NAME,
                        PROJECT_ID: resultData.ResultOnDb[i].PROJECT_ID,
                        PROJECT_NAME: resultData.ResultOnDb[i].PROJECT_NAME,
                        SHIP_TO_ADDRESS: resultData.ResultOnDb[i].SHIP_TO_ADDRESS,
                        DISTANCE: resultData.ResultOnDb[i].DISTANCE,
                        DESCRIPTION: resultData.ResultOnDb[i].DESCRIPTION,
                        CREATE_USER: resultData.ResultOnDb[i].CREATE_USER,
                        LAST_USER: resultData.ResultOnDb[i].LAST_USER,
                        CREATE_DATE: resultData.ResultOnDb[i].CREATE_DATE,
                        LAST_DATE: resultData.ResultOnDb[i].LAST_DATE
                    };

                    list.push(item);
                }

                //res.end(JSON.stringify({ data: list , totalCount: resultData.TotalCountOnDb }));

                resultData.ResultList = {
                    data: list,
                    totalCount: resultData.TotalCountOnDb
                };

                res.end(JSON.stringify(resultData));

            }
            else {

                list = [{
                    No: 1,
                    ORDER_ON: "Error",
                    DESCRIPTION: resultData.MessageOnDb
                }];

                //res.end(JSON.stringify({ data: list, totalCount: 1 }));

                resultData.ResultList = {
                    data: list,
                    totalCount: resultData.TotalCountOnDb
                };

                res.end(JSON.stringify(resultData));

            }

        });
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

myGlobal.App.post('/Order/Insert', function (req, res) {

    try {

        let dataItem = JSON.parse(req.body.data);

        let model = new Cls_Order_Models();

        model.Fn_Insert(dataItem, function (resultData) {

            //res.end(JSON.stringify(resultData));

            let list = "";

            if (resultData.StatusOnDb === true) {

                list = {
                    StatusOnDb: true,
                    MessageOnDb: "Success"
                };
            }
            else {

                list = {
                    StatusOnDb: false,
                    MessageOnDb: resultData.MessageOnDb
                };
            }

            resultData.ResultList = list;
            res.end(JSON.stringify(resultData));

        });
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

myGlobal.App.post('/Order/Update', function (req, res) {

    try {

        let dataItem = JSON.parse(req.body.data);

        let model = new Cls_Order_Models();

        model.Fn_Update(dataItem, function (resultData) {

            //res.end(JSON.stringify(resultData));

            let list = "";

            if (resultData.StatusOnDb === true) {

                list = {
                    StatusOnDb: true,
                    MessageOnDb: "Success"
                };
            }
            else {

                list = {
                    StatusOnDb: false,
                    MessageOnDb: resultData.MessageOnDb
                };
            }

            resultData.ResultList = list;
            res.end(JSON.stringify(resultData));

        });
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

myGlobal.App.post('/Order/Delete', function (req, res) {

    try {

        let dataItem = JSON.parse(req.body.data);

        let model = new Cls_Order_Models();

        model.Fn_Delete(dataItem, function (resultData) {

            //res.end(JSON.stringify(resultData));

            let list = "";

            if (resultData.StatusOnDb === true) {

                list = {
                    StatusOnDb: true,
                    MessageOnDb: "Success"
                };
            }
            else {

                list = {
                    StatusOnDb: false,
                    MessageOnDb: resultData.MessageOnDb
                };
            }

            resultData.ResultList = list;
            res.end(JSON.stringify(resultData));

        });
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

myGlobal.App.post('/Order/GetOrderAll', function (req, res) {

    try {

        let model = new Cls_Order_Models();

        model.Fn_GetOrderAll(function (resultData) {

            //res.end(JSON.stringify(resultData));

            if (resultData.StatusOnDb === true) {

                var list = [];

                list.push({
                    Value: "",
                    Text: "---selected---"
                });

                for (var i = 0; i < resultData.ResultOnDb.length; i++) {

                    var item = {
                        Value:resultData.ResultOnDb[i].ORDER_NO,
                        Text:resultData.ResultOnDb[i].ORDER_NO,
                        ORDER_ID: resultData.ResultOnDb[i].ORDER_ID,
                        ORDER_NO: resultData.ResultOnDb[i].ORDER_NO
                     };

                     list.push(item);
                }

                //res.end(JSON.stringify({ data: list , totalCount: resultData.TotalCountOnDb }));
                
                resultData.ResultList = list;

                res.end(JSON.stringify(resultData));

              }
              else {

                  list = [{
                      Value: "",
                      Text: "Error"
                  }];

                 //res.end(JSON.stringify({ data: list, totalCount: 1 }));
                 
                resultData.ResultList = list;

                res.end(JSON.stringify(resultData));

              }

        });
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

myGlobal.App.post('/Order/GetOrderByCustomer', function (req, res) {

    try {

        let dataItem = JSON.parse(req.body.data);

        let model = new Cls_Order_Models();

        model.Fn_GetOrderByCustomer(dataItem, function (resultData) {

            //res.end(JSON.stringify(resultData));

            if (resultData.StatusOnDb === true) {

                var list = [];

                list.push({
                    Value: "",
                    Text: "---selected---"
                });

                for (var i = 0; i < resultData.ResultOnDb.length; i++) {

                    var item = {
                        Value:resultData.ResultOnDb[i].ORDER_NO,
                        Text:resultData.ResultOnDb[i].ORDER_NO,
                        ORDER_ID: resultData.ResultOnDb[i].ORDER_ID,
                        ORDER_NO: resultData.ResultOnDb[i].ORDER_NO
                     };

                     list.push(item);
                }

                //res.end(JSON.stringify({ data: list , totalCount: resultData.TotalCountOnDb }));
                
                resultData.ResultList = list;

                res.end(JSON.stringify(resultData));

              }
              else {

                  list = [{
                      Value: "",
                      Text: "Error"
                  }];

                 //res.end(JSON.stringify({ data: list, totalCount: 1 }));
                 
                resultData.ResultList = list;

                res.end(JSON.stringify(resultData));

              }

        });
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

myGlobal.App.post('/Order/GetOrderByUnit', function (req, res) {

    try {

        let dataItem = JSON.parse(req.body.data);

        let model = new Cls_Order_Models();

        model.Fn_GetOrderByUnit(dataItem, function (resultData) {

            //res.end(JSON.stringify(resultData));

            if (resultData.StatusOnDb === true) {

                var list = [];

                list.push({
                    Value: "",
                    Text: "---selected---"
                });

                for (var i = 0; i < resultData.ResultOnDb.length; i++) {

                    var item = {
                        Value:resultData.ResultOnDb[i].ORDER_NO,
                        Text:resultData.ResultOnDb[i].ORDER_NO,
                        ORDER_ID: resultData.ResultOnDb[i].ORDER_ID,
                        ORDER_NO: resultData.ResultOnDb[i].ORDER_NO
                     };

                     list.push(item);
                }

                //res.end(JSON.stringify({ data: list , totalCount: resultData.TotalCountOnDb }));
                
                resultData.ResultList = list;

                res.end(JSON.stringify(resultData));

              }
              else {

                  list = [{
                      Value: "",
                      Text: "Error"
                  }];

                 //res.end(JSON.stringify({ data: list, totalCount: 1 }));
                 
                resultData.ResultList = list;

                res.end(JSON.stringify(resultData));

              }

        });
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

myGlobal.App.post('/Order/GetOrderByCondition', function (req, res) {

    try {

        let dataItem = JSON.parse(req.body.data);

        let model = new Cls_Order_Models();

        model.Fn_GetOrderByCondition(dataItem, function (resultData) {

            //res.end(JSON.stringify(resultData));

            if (resultData.StatusOnDb === true) {

                var list = [];

                list.push({
                    Value: "",
                    Text: "---selected---"
                });

                for (var i = 0; i < resultData.ResultOnDb.length; i++) {

                    var item = {
                        Value:resultData.ResultOnDb[i].ORDER_NO,
                        Text:resultData.ResultOnDb[i].ORDER_NO,
                        ORDER_ID: resultData.ResultOnDb[i].ORDER_ID,
                        ORDER_NO: resultData.ResultOnDb[i].ORDER_NO
                     };

                     list.push(item);
                }

                //res.end(JSON.stringify({ data: list , totalCount: resultData.TotalCountOnDb }));
                
                resultData.ResultList = list;

                res.end(JSON.stringify(resultData));

              }
              else {

                  list = [{
                      Value: "",
                      Text: "Error"
                  }];

                 //res.end(JSON.stringify({ data: list, totalCount: 1 }));
                 
                resultData.ResultList = list;

                res.end(JSON.stringify(resultData));

              }

        });
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
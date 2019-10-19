
let Cls_Shipment_Models = require("../../../Models/Worker/Shipment/Cls_Shipment_Models.js");


myGlobal.App.post('/Shipment/Search', function (req, res) {

    try {

        let dataItem = JSON.parse(req.body.data);

        dataItem.Limit = (parseInt(dataItem.Start) + parseInt(dataItem.Limit)).toString();

        let model = new Cls_Shipment_Models();

        model.Fn_Search(dataItem, function (resultData) {

            //res.end(JSON.stringify(resultData));

            if (resultData.StatusOnDb === true) {

                var list = [];

                for (var i = 0; i < resultData.ResultOnDb.length; i++) {

                    var item = {
                        No: (i + 1).toString(),

                        CUSTOMER_ID: resultData.ResultOnDb[i].CUSTOMER_ID,
                        CUSTOMER_NAME: resultData.ResultOnDb[i].CUSTOMER_NAME,
                        ORDER_ID: resultData.ResultOnDb[i].ORDER_ID,
                        ORDER_NO: resultData.ResultOnDb[i].ORDER_NO,
                        SHIPMENT_ID: resultData.ResultOnDb[i].SHIPMENT_ID,
                        SHIPMENT_NO: resultData.ResultOnDb[i].SHIPMENT_NO,
                        SHIPMENT_DATE: resultData.ResultOnDb[i].SHIPMENT_DATE,
                        SHIP_TO_ADDRESS: resultData.ResultOnDb[i].SHIP_TO_ADDRESS,
                        STATUS_GROUP_ID: resultData.ResultOnDb[i].STATUS_GROUP_ID,
                        STATUS_GROUP_NAME: resultData.ResultOnDb[i].STATUS_GROUP_NAME,
                        STATUS_ID: resultData.ResultOnDb[i].STATUS_ID,
                        STATUS_NAME: resultData.ResultOnDb[i].STATUS_NAME,
                        EMPLOYEE_ID: resultData.ResultOnDb[i].EMPLOYEE_ID,
                        EMPLOYEE_NAME: resultData.ResultOnDb[i].EMPLOYEE_NAME,
                        POSITION_ID: resultData.ResultOnDb[i].POSITION_ID,
                        POSITION_NAME: resultData.ResultOnDb[i].POSITION_NAME,
                        JOBSITE_ID: resultData.ResultOnDb[i].JOBSITE_ID,
                        JOBSITE_NAME: resultData.ResultOnDb[i].JOBSITE_NAME,
                        TRUCK_ID: resultData.ResultOnDb[i].TRUCK_ID,
                        TRUCK_NO: resultData.ResultOnDb[i].TRUCK_NO,                 

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
                    SHIPMENT_NO: "Error",
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

myGlobal.App.post('/Shipment/Insert', function (req, res) {

    try {

        let dataItem = JSON.parse(req.body.data);

        let model = new Cls_Shipment_Models();

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

myGlobal.App.post('/Shipment/Update', function (req, res) {

    try {

        let dataItem = JSON.parse(req.body.data);

        let model = new Cls_Shipment_Models();

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

myGlobal.App.post('/Shipment/Delete', function (req, res) {

    try {

        let dataItem = JSON.parse(req.body.data);

        let model = new Cls_Shipment_Models();

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

myGlobal.App.post('/Shipment/GetShipmentAll', function (req, res) {

    try {

        let model = new Cls_Shipment_Models();

        model.Fn_GetShipmentAll(function (resultData) {

            //res.end(JSON.stringify(resultData));

            if (resultData.StatusOnDb === true) {

                var list = [];

                list.push({
                    Value: "",
                    Text: "---selected---"
                });

                for (var i = 0; i < resultData.ResultOnDb.length; i++) {

                    var item = {
                        Value:resultData.ResultOnDb[i].SHIPMENT_NO,
                        Text:resultData.ResultOnDb[i].SHIPMENT_NO,
                        SHIPMENT_ID: resultData.ResultOnDb[i].SHIPMENT_ID,
                        SHIPMENT_NO: resultData.ResultOnDb[i].SHIPMENT_NO
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

myGlobal.App.post('/Shipment/GetShipmentByCondition', function (req, res) {

    try {

        let dataItem = JSON.parse(req.body.data);

        let model = new Cls_Shipment_Models();

        model.Fn_GetShipmentByCondition(dataItem, function (resultData) {

            //res.end(JSON.stringify(resultData));

            if (resultData.StatusOnDb === true) {

                var list = [];

                list.push({
                    Value: "",
                    Text: "---selected---"
                });

                for (var i = 0; i < resultData.ResultOnDb.length; i++) {

                    var item = {
                        Value:resultData.ResultOnDb[i].SHIPMENT_NO,
                        Text:resultData.ResultOnDb[i].SHIPMENT_NO,
                        SHIPMENT_ID: resultData.ResultOnDb[i].SHIPMENT_ID,
                        SHIPMENT_NO: resultData.ResultOnDb[i].SHIPMENT_NO
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

myGlobal.App.post('/Shipment/GetShipmentByOrder', function (req, res) {

    try {

        let dataItem = JSON.parse(req.body.data);

        let model = new Cls_Shipment_Models();

        model.Fn_GetShipmentByOrder(dataItem, function (resultData) {

            //res.end(JSON.stringify(resultData));

            if (resultData.StatusOnDb === true) {

                var list = [];

                list.push({
                    Value: "",
                    Text: "---selected---"
                });

                for (var i = 0; i < resultData.ResultOnDb.length; i++) {

                    var item = {
                        Value:resultData.ResultOnDb[i].SHIPMENT_NO,
                        Text:resultData.ResultOnDb[i].SHIPMENT_NO,
                        SHIPMENT_ID: resultData.ResultOnDb[i].SHIPMENT_ID,
                        SHIPMENT_NO: resultData.ResultOnDb[i].SHIPMENT_NO
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

myGlobal.App.post('/Shipment/GetShipmentByTruck', function (req, res) {

    try {

        let dataItem = JSON.parse(req.body.data);

        let model = new Cls_Shipment_Models();

        model.Fn_GetShipmentByTruck(dataItem, function (resultData) {

            //res.end(JSON.stringify(resultData));

            if (resultData.StatusOnDb === true) {

                var list = [];

                list.push({
                    Value: "",
                    Text: "---selected---"
                });

                for (var i = 0; i < resultData.ResultOnDb.length; i++) {

                    var item = {
                        Value:resultData.ResultOnDb[i].SHIPMENT_NO,
                        Text:resultData.ResultOnDb[i].SHIPMENT_NO,
                        SHIPMENT_ID: resultData.ResultOnDb[i].SHIPMENT_ID,
                        SHIPMENT_NO: resultData.ResultOnDb[i].SHIPMENT_NO
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

myGlobal.App.post('/Shipment/GetShipmentByEmployee', function (req, res) {

    try {

        let dataItem = JSON.parse(req.body.data);

        let model = new Cls_Shipment_Models();

        model.Fn_GetShipmentByEmployee(dataItem, function (resultData) {

            //res.end(JSON.stringify(resultData));

            if (resultData.StatusOnDb === true) {

                var list = [];

                list.push({
                    Value: "",
                    Text: "---selected---"
                });

                for (var i = 0; i < resultData.ResultOnDb.length; i++) {

                    var item = {
                        Value:resultData.ResultOnDb[i].SHIPMENT_NO,
                        Text:resultData.ResultOnDb[i].SHIPMENT_NO,
                        SHIPMENT_ID: resultData.ResultOnDb[i].SHIPMENT_ID,
                        SHIPMENT_NO: resultData.ResultOnDb[i].SHIPMENT_NO
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






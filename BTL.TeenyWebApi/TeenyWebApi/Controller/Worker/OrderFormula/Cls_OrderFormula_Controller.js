
let Cls_OrderFormula_Models = require("../../../Models/Worker/OrderFormula/Cls_OrderFormula_Models.js");

myGlobal.App.post('/OrderFormula/Insert', function (req, res) {

    try {

        let dataItem = JSON.parse(req.body.data);

        let model = new Cls_OrderFormula_Models();

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

myGlobal.App.post('/OrderFormula/Update', function (req, res) {

    try {

        let dataItem = JSON.parse(req.body.data);

        let model = new Cls_OrderFormula_Models();

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

myGlobal.App.post('/OrderFormula/Delete', function (req, res) {

    try {

        let dataItem = JSON.parse(req.body.data);

        let model = new Cls_OrderFormula_Models();

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


myGlobal.App.post('/OrderFormula/OrderHaveFormula', function (req, res) {

    try {

        let dataItem = JSON.parse(req.body.data);

        let model = new Cls_OrderFormula_Models();

        model.Fn_GetOrderHaveFormula(dataItem, function (resultData) {
                       
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
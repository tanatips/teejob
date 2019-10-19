
let Cls_FormulaItem_Models = require("../../../../../Models/Profile/Companied/Factory/FormulaItem/Cls_FormulaItem_Models.js");


myGlobal.App.post('/FormulaItem/Search', function (req, res) {

    try {

        let dataItem = JSON.parse(req.body.data);

        dataItem.Limit = (parseInt(dataItem.Start) + parseInt(dataItem.Limit)).toString();

        let model = new Cls_FormulaItem_Models();

        model.Fn_Search(dataItem, function (resultData) {

            //res.end(JSON.stringify(resultData));

            if (resultData.StatusOnDb === true) {

                var list = [];

                for (var i = 0; i < resultData.ResultOnDb.length; i++) {

                    var item = {
                        No: (i + 1).toString(),
                        FORMULA_ITEM_ID: resultData.ResultOnDb[i].FORMULA_ITEM_ID,
                        FORMULA_ID: resultData.ResultOnDb[i].FORMULA_ID,
                        FORMULA_NAME: resultData.ResultOnDb[i].FORMULA_NAME,
                        CONCEATE_NAME: resultData.ResultOnDb[i].CONCEATE_NAME,
                        MATERIAL_ID: resultData.ResultOnDb[i].MATERIAL_ID,
                        MATERIAL_NAME: resultData.ResultOnDb[i].MATERIAL_NAME,
                        MATERIAL_SIZE: resultData.ResultOnDb[i].MATERIAL_SIZE,
                        MATERIAL_TYPE_ID: resultData.ResultOnDb[i].MATERIAL_TYPE_ID,
                        MATERIAL_TYPE_NAME: resultData.ResultOnDb[i].MATERIAL_TYPE_NAME,
                        UNIT_ID: resultData.ResultOnDb[i].UNIT_ID,
                        UNIT_NAME: resultData.ResultOnDb[i].UNIT_NAME,
                        QUNTITY: resultData.ResultOnDb[i].QUNTITY,
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
                    FORMULA_NAME: "Error",
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

myGlobal.App.post('/FormulaItem/Insert', function (req, res) {

    try {

        let dataItem = JSON.parse(req.body.data);

        let model = new Cls_FormulaItem_Models();

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

myGlobal.App.post('/FormulaItem/Update', function (req, res) {

    try {

        let dataItem = JSON.parse(req.body.data);

        let model = new Cls_FormulaItem_Models();

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

myGlobal.App.post('/FormulaItem/Delete', function (req, res) {

    try {

        let dataItem = JSON.parse(req.body.data);

        let model = new Cls_FormulaItem_Models();

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

myGlobal.App.post('/FormulaItem/GetFormulaItemDetailByFormulaName', function (req, res) {

    // {"CUSTOMER_NAME": "CUSTOMER_NAME1", "PROJECT_NAME": "PROJECT_NAME2"}
    try {

        let dataItem = JSON.parse(req.body.data);

        let model = new Cls_FormulaItem_Models();

        model.Fn_GetFormulaItemDetailByFormulaName(dataItem, function (resultData) {

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


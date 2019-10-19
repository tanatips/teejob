
let Cls_DaylyReport_Models = require("../../../Models/Report/DaylyReport/Cls_DaylyReport_Models.js");

myGlobal.App.post('/DaylyReport/PrintPDF', function (req, res) {

    try {

        let dataItem = JSON.parse(req.body.data);

        let model = new Cls_DaylyReport_Models();

        model.Fn_PrintPDF(dataItem, function (resultData) {

            res.sendFile(resultData);

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
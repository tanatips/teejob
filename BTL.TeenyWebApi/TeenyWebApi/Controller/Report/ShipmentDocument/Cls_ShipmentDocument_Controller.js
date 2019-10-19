
let Cls_ShipmentDocument_Models = require("../../../Models/Report/ShipmentDocument/Cls_ShipmentDocument_Models.js");

myGlobal.App.post('/ShipmentDocument/PrintPDF', function (req, res) {

    try {

        let dataItem = JSON.parse(req.body.data);

        let model = new Cls_ShipmentDocument_Models();

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
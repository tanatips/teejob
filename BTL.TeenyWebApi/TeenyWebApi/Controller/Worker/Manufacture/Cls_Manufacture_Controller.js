
let Cls_Manufacture_Models = require("../../../Models/Worker/Manufacture/Cls_Manufacture_Models.js");


myGlobal.App.post('/Manufacture/Search', function (req, res) {

    try {

        let dataItem = JSON.parse(req.body.data);

        let model = new Cls_Manufacture_Models();

        model.Fn_Search(dataItem, function (resultData) {

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

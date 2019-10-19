
let Cls_ActualReport_Models = require("../../../Models/Report/ActualReport/Cls_ActualReport_Models.js");

myGlobal.App.get('/ActualReport/PrintPDF', function (req, res) {

    try {

        //let dataItem = JSON.parse(req.body.data);
        let dataItem = "";
        let model = new Cls_ActualReport_Models();

        model.Fn_PrintPDF(dataItem, function (resultData) {
            /*
            let filePath = resultData;

            let stat = myGlobal.Fs.statSync(filePath);
        
            res.writeHead(200, {
                'Content-Type': 'audio/mpeg',
                'Content-Length': stat.size
            });
        
            let readStream = myGlobal.Fs.createReadStream(filePath);
            // We replaced all the event handlers with a simple call to readStream.pipe()
            readStream.pipe(res);
            */
            res.end(resultData);

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
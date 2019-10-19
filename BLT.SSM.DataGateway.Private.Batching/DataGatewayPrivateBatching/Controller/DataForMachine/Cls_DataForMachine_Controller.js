
let Cls_DataForMachine_Models = require("../../Models/DataForMachine/Cls_DataForMachine_Models.js");

class Cls_DataForMachine_Controller {

    Fn_Insert(dataItem) {

        try {

           let model = new Cls_DataForMachine_Models();

            let urlWebApi = myGlobal.ItemConfig.WEB_API.URL + "/Customer/Insert";

            model.Fn_CallInternalWebApi(urlWebApi, dataItem, function (result) {

                let resultData = JSON.parse(result);

                if (resultData.StatusOnDb === true) {

                    dataItem.Data = {
                        ResultList: {
                            StatusOnDb: true,
                            MessageOnDb: "Sent data completed"
                        }
                    };
                }
                else {

                    dataItem.Data = {
                        ResultList: {
                            StatusOnDb: false,
                            MessageOnDb: resultData.MessageOnDb
                        }
                    };
                }

                let jsonStr = JSON.stringify(dataItem);
                
                myGlobal.BrokerPublic.publish(dataItem.TOPPIC_RETURN, jsonStr, myGlobal.Options);
               
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
    }

};

module.exports = Cls_DataForMachine_Controller;

let Cls_Plant_Models = require("../../../../Models/Profile/Companied/Plant/Cls_Plant_Models.js");


myGlobal.App.post('/Plant/Search', function (req, res) {

    try {

        let dataItem = JSON.parse(req.body.data);

        dataItem.Limit = (parseInt(dataItem.Start) + parseInt(dataItem.Limit)).toString();

        let model = new Cls_Plant_Models();

        model.Fn_Search(dataItem, function (resultData) {

            //res.end(JSON.stringify(resultData));

            if (resultData.StatusOnDb === true) {

                var list = [];

                for (var i = 0; i < resultData.ResultOnDb.length; i++) {

                    var item = {
                        No: (i + 1).toString(),
                        PLANT_ID: resultData.ResultOnDb[i].PLANT_ID,
                        PLANT_NAME: resultData.ResultOnDb[i].PLANT_NAME,
                        COMPANY_ID: resultData.ResultOnDb[i].COMPANY_ID,
                        COMPANY_NAME: resultData.ResultOnDb[i].COMPANY_NAME,
                        SHORT_NAME: resultData.ResultOnDb[i].SHORT_NAME,
                        ADDRESS: resultData.ResultOnDb[i].ADDRESS,
                        PHONE_NO: resultData.ResultOnDb[i].PHONE_NO,
                        MOBILE_NO: resultData.ResultOnDb[i].MOBILE_NO,
                        FAX_NO: resultData.ResultOnDb[i].FAX_NO,
                        DESCRIPTION: resultData.ResultOnDb[i].DESCRIPTION,
                        CREATE_USER: resultData.ResultOnDb[i].CREATE_USER,
                        LAST_USER: resultData.ResultOnDb[i].LAST_USER,
                        CREATE_DATE: resultData.ResultOnDb[i].CREATE_DATE,
                        LAST_DATE: resultData.ResultOnDb[i].LAST_DATE
                     };

                     list .push(item);
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
                      PLANT_NAME: "Error",
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

myGlobal.App.post('/Plant/Insert', function (req, res) {

    try {

        let dataItem = JSON.parse(req.body.data);

        let model = new Cls_Plant_Models();

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

myGlobal.App.post('/Plant/Update', function (req, res) {

    try {

        let dataItem = JSON.parse(req.body.data);

        let model = new Cls_Plant_Models();

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

myGlobal.App.post('/Plant/Delete', function (req, res) {

    try {

        let dataItem = JSON.parse(req.body.data);

        let model = new Cls_Plant_Models();

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

myGlobal.App.post('/Plant/GetPlantAll', function (req, res) {

    try {

        let model = new Cls_Plant_Models();

        model.Fn_GetPlantAll(function (resultData) {

            //res.end(JSON.stringify(resultData));
 
            if (resultData.StatusOnDb === true) {

                var list = [];

                list.push({
                    Value: "",
                    Text: "---selected---"
                });

                for (var i = 0; i < resultData.ResultOnDb.length; i++) {

                    var item = {
                        Value:resultData.ResultOnDb[i].PLANT_NAME,
                        Text:resultData.ResultOnDb[i].PLANT_NAME,
                        PLANT_ID: resultData.ResultOnDb[i].PLANT_ID,
                        PLANT_NAME: resultData.ResultOnDb[i].PLANT_NAME
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


myGlobal.App.post('/Plant/GetPlantByCompany', function (req, res) {

    try {
         
        let dataItem = JSON.parse(req.body.data);

        let model = new Cls_Plant_Models();

        model.Fn_GetPlantByCompany(dataItem, function (resultData) {

            //res.end(JSON.stringify(resultData));
 
            if (resultData.StatusOnDb === true) {

                var list = [];

                list.push({
                    Value: "",
                    Text: "---selected---"
                });

                for (var i = 0; i < resultData.ResultOnDb.length; i++) {

                    var item = {
                        Value:resultData.ResultOnDb[i].PLANT_NAME,
                        Text:resultData.ResultOnDb[i].PLANT_NAME,
                        PLANT_ID: resultData.ResultOnDb[i].PLANT_ID,
                        PLANT_NAME: resultData.ResultOnDb[i].PLANT_NAME
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



let Cls_Employee_Models = require("../../../../../Models/Profile/Companied/Employees/Employee/Cls_Employee_Models.js");

myGlobal.App.post('/Employee/Search', function (req, res) {

    try {

        let dataItem = JSON.parse(req.body.data);

        dataItem.Limit = (parseInt(dataItem.Start) + parseInt(dataItem.Limit)).toString();

        let model = new Cls_Employee_Models();

        model.Fn_Search(dataItem, function (resultData) {

            //res.end(JSON.stringify(resultData));

            if (resultData.StatusOnDb === true) {

                var list = [];

                for (var i = 0; i < resultData.ResultOnDb.length; i++) {

                    var item = {
                        No: (i + 1).toString(),
                        EMPLOYEE_ID: resultData.ResultOnDb[i].EMPLOYEE_ID,
                        EMPLOYEE_NAME: resultData.ResultOnDb[i].EMPLOYEE_NAME,
                        POSITION_ID: resultData.ResultOnDb[i].POSITION_ID,
                        POSITION_NAME: resultData.ResultOnDb[i].POSITION_NAME,
                        DEPARTMENT_ID: resultData.ResultOnDb[i].DEPARTMENT_ID,
                        DEPARTMENT_NAME: resultData.ResultOnDb[i].DEPARTMENT_NAME,
                        PLANT_ID: resultData.ResultOnDb[i].PLANT_ID,
                        PLANT_NAME: resultData.ResultOnDb[i].PLANT_NAME,
                        COMPANY_ID: resultData.ResultOnDb[i].COMPANY_ID,
                        COMPANY_NAME: resultData.ResultOnDb[i].COMPANY_NAME,
                        SHORT_NAME: resultData.ResultOnDb[i].SHORT_NAME,
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
                    EMPLOYEE_NAME: "Error",
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

myGlobal.App.post('/Employee/Insert', function (req, res) {

    try {

        let dataItem = JSON.parse(req.body.data);

        let model = new Cls_Employee_Models();

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

myGlobal.App.post('/Employee/Update', function (req, res) {

    try {

        let dataItem = JSON.parse(req.body.data);

        let model = new Cls_Employee_Models();

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

myGlobal.App.post('/Employee/Delete', function (req, res) {

    try {

        let dataItem = JSON.parse(req.body.data);

        let model = new Cls_Employee_Models();

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

myGlobal.App.post('/Employee/GetEmployeeAll', function (req, res) {

    try {

        let model = new Cls_Employee_Models();

        model.Fn_GetEmployeeAll(function (resultData) {

            //res.end(JSON.stringify(resultData));

            if (resultData.StatusOnDb === true) {

                var list = [];

                list.push({
                    Value: "",
                    Text: "---selected---"
                });

                for (var i = 0; i < resultData.ResultOnDb.length; i++) {

                    var item = {
                        Value:resultData.ResultOnDb[i].EMPLOYEE_NAME,
                        Text:resultData.ResultOnDb[i].EMPLOYEE_NAME,
                        EMPLOYEE_ID: resultData.ResultOnDb[i].EMPLOYEE_ID,
                        EMPLOYEE_NAME: resultData.ResultOnDb[i].EMPLOYEE_NAME
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

myGlobal.App.post('/Employee/GetEmployeeByPlant', function (req, res) {

    try {

        let dataItem = JSON.parse(req.body.data);

        let model = new Cls_Employee_Models();

        model.Fn_GetEmployeeByPlant(dataItem, function (resultData) {

            //res.end(JSON.stringify(resultData));

            if (resultData.StatusOnDb === true) {

                var list = [];

                list.push({
                    Value: "",
                    Text: "---selected---"
                });

                for (var i = 0; i < resultData.ResultOnDb.length; i++) {

                    var item = {
                        Value:resultData.ResultOnDb[i].EMPLOYEE_NAME,
                        Text:resultData.ResultOnDb[i].EMPLOYEE_NAME,
                        EMPLOYEE_ID: resultData.ResultOnDb[i].EMPLOYEE_ID,
                        EMPLOYEE_NAME: resultData.ResultOnDb[i].EMPLOYEE_NAME
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

myGlobal.App.post('/Employee/GetEmployeeByPosition', function (req, res) {

    try {

        let dataItem = JSON.parse(req.body.data);

        let model = new Cls_Employee_Models();

        model.Fn_GetEmployeeByPosition(dataItem, function (resultData) {

            //res.end(JSON.stringify(resultData));

            if (resultData.StatusOnDb === true) {

                var list = [];

                list.push({
                    Value: "",
                    Text: "---selected---"
                });

                for (var i = 0; i < resultData.ResultOnDb.length; i++) {

                    var item = {
                        Value:resultData.ResultOnDb[i].EMPLOYEE_NAME,
                        Text:resultData.ResultOnDb[i].EMPLOYEE_NAME,
                        EMPLOYEE_ID: resultData.ResultOnDb[i].EMPLOYEE_ID,
                        EMPLOYEE_NAME: resultData.ResultOnDb[i].EMPLOYEE_NAME
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

myGlobal.App.post('/Employee/GetEmployeeByCondition', function (req, res) {

    try {

        let dataItem = JSON.parse(req.body.data);

        let model = new Cls_Employee_Models();

        model.Fn_GetEmployeeByCondition(dataItem, function (resultData) {

            //res.end(JSON.stringify(resultData));

            if (resultData.StatusOnDb === true) {

                var list = [];

                list.push({
                    Value: "",
                    Text: "---selected---"
                });

                for (var i = 0; i < resultData.ResultOnDb.length; i++) {

                    var item = {
                        Value:resultData.ResultOnDb[i].EMPLOYEE_NAME,
                        Text:resultData.ResultOnDb[i].EMPLOYEE_NAME,
                        EMPLOYEE_ID: resultData.ResultOnDb[i].EMPLOYEE_ID,
                        EMPLOYEE_NAME: resultData.ResultOnDb[i].EMPLOYEE_NAME
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
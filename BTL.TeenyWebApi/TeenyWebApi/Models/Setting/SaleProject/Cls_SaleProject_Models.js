
let mySqlExecute = require('../../../BusinessData/Execute/File_MySQL_Execute.js');

let Cls_SaleProject_SQL = require('../../../SQLFactory/Setting/SaleProject/Cls_SaleProject_SQL.js');


class Cls_SaleProject_Models {

    constructor() {

        this.sqlFactory = new Cls_SaleProject_SQL();
    }

    Fn_Insert(dataItem, callback) {

        let sql = this.sqlFactory.Fn_Insert(dataItem);

        mySqlExecute.Insert(sql, function (resultData) {

            callback(resultData);
        });
    }

    Fn_Update(dataItem, callback) {

        let sql = this.sqlFactory.Fn_Update(dataItem);

        mySqlExecute.Update(sql, function (resultData) {

            callback(resultData);
        });
    }

    Fn_Delete(dataItem, callback) {

        let sql = this.sqlFactory.Fn_Delete(dataItem);

        mySqlExecute.Delete(sql, function (resultData) {

            callback(resultData);
        });
    }

    Fn_GetSaleHaveProject(dataItem, callback) {

        let sql = this.sqlFactory.Fn_GetSaleHaveProject(dataItem);

        let rootNode = [];

        mySqlExecute.Select(sql, function (resultData) {

            if (resultData.ResultOnDb.length > 0) {

                let list = [];

                var jsonGroupBy = function (data, key) {

                    let resultGroupBy = data.reduce(function (item, x) {

                        (item[x[key]] = item[x[key]] || []).push(x);

                        return item;

                    }, {});

                    return Object.keys(resultGroupBy);
                };

                var listEmployee = jsonGroupBy(resultData.ResultOnDb, 'EMPLOYEE_NAME')
           

                for (let i = 0; i < listEmployee.length; i++) {

                    let rootIndex = (i + 1).toString();
                    let mmployeeName = listEmployee[i];

                    let childNode = {
                        expanded: true,
                        id:  rootIndex,
                        text: "Employee >: " + mmployeeName,
                        leaf: false,                       
                        children: new Cls_SaleProject_Models().Fn_GetProjectName(rootIndex, mmployeeName, resultData)
                    };

                    rootNode.push(childNode);
                }

                resultData.ResultList = rootNode;

                callback(resultData);
            }
            else {

                let childNode = {
                    expanded: true,
                    id: "1",
                    text: "No Data",
                    leaf: false,
                    children: null
                };

                rootNode.push(childNode);

                resultData.ResultList = rootNode;

                callback(resultData);
            }

        });
    }


    Fn_GetProjectName(rootIndex, mmployeeName, resultData) {
        
        let listChild = [];

        for (let i = 0; i < resultData.ResultOnDb.length; i++) {

            if (mmployeeName === resultData.ResultOnDb[i].EMPLOYEE_NAME) {

                let item = {
                    expanded: true,
                    id: rootIndex + "" + resultData.ResultOnDb[i].PROJECT_ID,
                    text: "Project >: " + resultData.ResultOnDb[i].PROJECT_NAME,
                    leaf: true,                   
                    children: null,
                    EMPLOYEE_ID: resultData.ResultOnDb[i].EMPLOYEE_ID,
                    EMPLOYEE_NAME: resultData.ResultOnDb[i].EMPLOYEE_NAME,
                    PROJECT_ID: resultData.ResultOnDb[i].PROJECT_ID,
                    PROJECT_NAME: resultData.ResultOnDb[i].PROJECT_NAME
                };

                listChild.push(item);
            }
        }

        return listChild;
    }

};

module.exports = Cls_SaleProject_Models;


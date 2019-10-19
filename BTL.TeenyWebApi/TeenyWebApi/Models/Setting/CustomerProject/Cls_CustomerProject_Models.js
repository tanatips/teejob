
let mySqlExecute = require('../../../BusinessData/Execute/File_MySQL_Execute.js');

let Cls_CustomerProject_SQL = require('../../../SQLFactory/Setting/CustomerProject/Cls_CustomerProject_SQL.js');


class Cls_CustomerProject_Models {

    constructor() {

        this.sqlFactory = new Cls_CustomerProject_SQL();
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

    Fn_GetCustomerHaveProject(dataItem, callback) {

        let sql = this.sqlFactory.Fn_GetCustomerHaveProject(dataItem);

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

                var listCustomer = jsonGroupBy(resultData.ResultOnDb, 'CUSTOMER_NAME')
           

                for (let i = 0; i < listCustomer.length; i++) {

                    let rootIndex = (i + 1).toString();
                    let customerName = listCustomer[i];

                    let childNode = {
                        expanded: true,
                        id:  rootIndex,
                        text: "Customer >: " + customerName,
                        leaf: false,                       
                        children: new Cls_CustomerProject_Models().Fn_GetProjectName(rootIndex, customerName, resultData)
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


    Fn_GetProjectName(rootIndex, customerName, resultData) {
        
        let listChild = [];

        for (let i = 0; i < resultData.ResultOnDb.length; i++) {

            if (customerName === resultData.ResultOnDb[i].CUSTOMER_NAME) {

                let item = {
                    expanded: true,
                    id: rootIndex + "" + resultData.ResultOnDb[i].PROJECT_ID,
                    text: "Project >: " + resultData.ResultOnDb[i].PROJECT_NAME,
                    leaf: true,                   
                    children: null,
                    CUSTOMER_ID: resultData.ResultOnDb[i].CUSTOMER_ID,
                    CUSTOMER_NAME: resultData.ResultOnDb[i].CUSTOMER_NAME,
                    PROJECT_ID: resultData.ResultOnDb[i].PROJECT_ID,
                    PROJECT_NAME: resultData.ResultOnDb[i].PROJECT_NAME
                };

                listChild.push(item);
            }
        }

        return listChild;
    }

};

module.exports = Cls_CustomerProject_Models;


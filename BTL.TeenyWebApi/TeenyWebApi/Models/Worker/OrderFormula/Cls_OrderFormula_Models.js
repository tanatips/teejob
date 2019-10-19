
let mySqlExecute = require('../../../BusinessData/Execute/File_MySQL_Execute.js');

let Cls_OrderFormula_SQL = require('../../../SQLFactory/Worker/OrderFormula/Cls_OrderFormula_SQL.js');


class Cls_OrderFormula_Models {

    constructor() {

        this.sqlFactory = new Cls_OrderFormula_SQL();
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

    Fn_GetOrderHaveFormula(dataItem, callback) {

        let sql = this.sqlFactory.Fn_GetOrderHaveFormula(dataItem);

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

                var listOrder = jsonGroupBy(resultData.ResultOnDb, 'ORDER_NO')
           

                for (let i = 0; i < listOrder.length; i++) {

                    let rootIndex = (i + 1).toString();
                    let orderNo = listOrder[i];

                    let childNode = {
                        expanded: true,
                        id:  rootIndex,
                        text: "Order No >: " + orderNo,
                        leaf: false,                       
                        children: new Cls_OrderFormula_Models().Fn_GetFormulaName(rootIndex, orderNo, resultData)
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


    Fn_GetFormulaName(rootIndex, orderNo, resultData) {
        
        let listChild = [];

        for (let i = 0; i < resultData.ResultOnDb.length; i++) {

            if (orderNo === resultData.ResultOnDb[i].ORDER_NO) {

                let item = {
                    expanded: true,
                    id: rootIndex + "" + resultData.ResultOnDb[i].FORMULA_ID,
                    text: "Formula >: " + resultData.ResultOnDb[i].FORMULA_NAME,
                    leaf: true,                   
                    children: null,
                    ORDER_ID: resultData.ResultOnDb[i].ORDER_ID,
                    ORDER_NO: resultData.ResultOnDb[i].ORDER_NO,
                    FORMULA_ID: resultData.ResultOnDb[i].FORMULA_ID,
                    FORMULA_NAME: resultData.ResultOnDb[i].FORMULA_NAME
                };

                listChild.push(item);
            }
        }

        return listChild;
    }

};

module.exports = Cls_OrderFormula_Models;


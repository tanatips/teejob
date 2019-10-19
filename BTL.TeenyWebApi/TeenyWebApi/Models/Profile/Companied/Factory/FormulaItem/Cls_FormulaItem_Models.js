
let mySqlExecute = require('../../../../../BusinessData/Execute/File_MySQL_Execute.js');

let Cls_FormulaItem_SQL = require('../../../../../SQLFactory/Profile/Companied/Factory/FormulaItem/Cls_FormulaItem_SQL.js');


class Cls_FormulaItem_Models {

    constructor() {

        this.sqlFactory = new Cls_FormulaItem_SQL();
    }

    Fn_Search(dataItem, callback) {

        let sql = this.sqlFactory.Fn_Search(dataItem);

        mySqlExecute.SelectList(sql, function (resultData) {

            callback(resultData);
        });
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

    Fn_GetFormulaItemDetailByFormulaName(dataItem, callback) {

        let sql = this.sqlFactory.Fn_GetFormulaItemDetailByFormulaName(dataItem);

        mySqlExecute.Select(sql, function (resultData) {

            let rootIndex = "1";
            
            if (resultData.ResultOnDb.length > 0) {

                let rootNode = [{
                    expanded: true,
                    id: rootIndex,
                    text: resultData.ResultOnDb[0].FORMULA_NAME,
                    leaf: false,
                    children: ""
                }];

                let childNode = [];

                for (let i = 0; i < resultData.ResultOnDb.length; i++) {

                    let nodeIndex = rootIndex + (i + 1)

                    let list = {
                        expanded: true,
                        id: nodeIndex,
                        text: resultData.ResultOnDb[i].FORMULA_ITEM_DETAIL,
                        leaf: true,
                        children: null
                    };

                    childNode.push(list);
                }

                rootNode[0].children = childNode;
                resultData.ResultList = rootNode;
            }

            callback(resultData);

        });
    }
};

module.exports = Cls_FormulaItem_Models;


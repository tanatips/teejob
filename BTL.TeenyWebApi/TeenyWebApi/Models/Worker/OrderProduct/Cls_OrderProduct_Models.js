
let mySqlExecute = require('../../../BusinessData/Execute/File_MySQL_Execute.js');

let Cls_OrderProduct_SQL = require('../../../SQLFactory/Worker/OrderProduct/Cls_OrderProduct_SQL.js');


class Cls_OrderProduct_Models {

    constructor() {

        this.sqlFactory = new Cls_OrderProduct_SQL();
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


    Fn_GetOrderProductDetail(dataItem, callback) {

        let sql = this.sqlFactory.Fn_GetOrderProductDetail(dataItem);

        let rootIndex = "1";

        let rootNode = [{
            expanded: true,
            id: rootIndex,
            text: "Order No :: " + dataItem.ORDER_NO,
            leaf: false,
            children: []
        }];
               

        mySqlExecute.Select(sql, function (resultData) {
                        
            if (resultData.ResultOnDb.length > 0) {
                                
                let list = [];

                for (let i = 0; i < resultData.ResultOnDb.length; i++) {

                    rootIndex = rootIndex + (i + 1).toString();

                    resultData.ResultOnDb[i].ORDER_NO = dataItem.ORDER_NO;

                    let childNode = {
                        expanded: true,
                        id: rootIndex,
                        text: "Product Code :: " + resultData.ResultOnDb[i].PRODUCT_CODE + " | Revision :: " + resultData.ResultOnDb[i].REVISION,
                        leaf: false,                       
                        children: new Cls_OrderProduct_Models().Fn_OrderDetail(resultData.ResultOnDb[i], rootIndex)
                    };

                    list.push(childNode);
                }
                
                rootNode[0].children = list;

                resultData.ResultList = rootNode;

                callback(resultData);
            }
            else
            {
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

    Fn_OrderDetail(rec, rootIndex) {

        let list = [];

        //let childNode = {
        //    expanded: true,
        //    id: "Revision" + rootIndex,
        //    text: "Revision :: " + rec.REVISION,
        //    leaf: true,
        //    children: null
        //};
        //list.push(childNode);

       let childNode = {
            expanded: true,
            id: "ProductName" + rootIndex,
            text: "Product Name :: " + rec.PRODUCT_NAME,
            leaf: true,
            children: null
        };
        list.push(childNode);

        childNode = {
            expanded: true,
            id: "Status" + rootIndex,
            text: "MFG Status :: " + rec.STATUS_NAME,
            leaf: true,
            children: null
        };
        list.push(childNode);

        childNode = {
            expanded: true,
            id: "Quntity" + rootIndex,
            text: "Quntity :: " + rec.QUNTITY + " " + rec.UNIT_NAME,
            leaf: true,
            children: null
        };
        list.push(childNode);

        childNode = {
            expanded: true,
            id: "PriceUnit" + rootIndex,
            text: "Price/Unit :: " + rec.PRICE_PER_UNIT + " Bath",
            leaf: true,
            children: null
        };
        list.push(childNode);

        childNode = {
            expanded: true,
            id: "Formula" + rootIndex,
            text: "Formula :: " + rec.FORMULA_NAME,
            leaf: true,
            children: null,           
            FORMULA_ID: rec.FORMULA_ID
        };
        list.push(childNode);

        childNode = {
            expanded: true,
            id: "NextCmd" + rootIndex,
            text: "Next Command :: Double Click",
            leaf: false,
            children: [{
                expanded: true,
                id: "Edit" + rootIndex,
                text: "Edit/Delete",
                leaf: true,
                children: null,           
                ORDER_ID: rec.ORDER_ID,
                ORDER_NO: rec.ORDER_NO,
                PRODUCT_SPEC_ID: rec.PRODUCT_SPEC_ID,
                STATUS_GROUP_NAME: rec.STATUS_GROUP_NAME,
                STATUS_NAME: rec.STATUS_NAME,
                UNIT_NAME: rec.UNIT_NAME,
                PRODUCT_GROUP_NAME: rec.PRODUCT_GROUP_NAME,
                PRODUCT_NAME: rec.PRODUCT_NAME,
                PRODUCT_CODE: rec.PRODUCT_CODE,
                REVISION: rec.REVISION,
                QUNTITY: rec.QUNTITY,
                FORMULA_ID: rec.FORMULA_ID

            //}, {
            //    expanded: true,
            //    id: "Manufacture" + rootIndex,
            //    text: "Manufacture",
            //    leaf: true,
            //    children: null,
            //    PRODUCT_SPEC_ID: rec.PRODUCT_SPEC_ID,
            //    ORDER_ID: rec.ORDER_ID
            }]
        };
        list.push(childNode);

        return list;
    }
};

module.exports = Cls_OrderProduct_Models;


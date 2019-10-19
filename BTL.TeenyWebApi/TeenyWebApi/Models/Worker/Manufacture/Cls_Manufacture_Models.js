
let mySqlExecute = require('../../../BusinessData/Execute/File_MySQL_Execute.js');

let Cls_Manufacture_SQL = require('../../../SQLFactory/Worker/Manufacture/Cls_Manufacture_SQL.js');

class Cls_Manufacture_Models {

    constructor() {

        this.sqlFactory = new Cls_Manufacture_SQL();
    }

    Fn_Search(dataItem, callback) {

        let sql = this.sqlFactory.Fn_GetOrderCustomer(dataItem);

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

                let childNode = {
                    expanded: true,
                    id: "Status" + rootIndex,
                    text: "Order Status :: " + resultData.ResultOnDb[0].STATUS_NAME,
                    leaf: true,
                    children: null
                };
                list.push(childNode);

                childNode = {
                    expanded: true,
                    id: "Customer" + rootIndex,
                    text: "Customer Name :: " + resultData.ResultOnDb[0].CUSTOMER_NAME,
                    leaf: true,
                    children: null
                };
                list.push(childNode);

                childNode = {
                    expanded: true,
                    id: "ShipToAdd" + rootIndex,
                    text: "Ship to address :: " + resultData.ResultOnDb[0].SHIP_TO_ADDRESS,
                    leaf: true,
                    children: null
                };
                list.push(childNode);

                childNode = {
                    expanded: true,
                    id: "Distance" + rootIndex,
                    text: "Distance :: " + resultData.ResultOnDb[0].DISTANCE,
                    leaf: true,
                    children: null
                };
                list.push(childNode);

                childNode = {
                    expanded: true,
                    id: "Distance" + rootIndex,
                    text: "Distance :: " + resultData.ResultOnDb[0].DISTANCE,
                    leaf: true,
                    children: null
                };
                list.push(childNode);

                //--------------- Order Product ------------------//

                new Cls_Manufacture_Models().Fn_GetOrderProduct(resultData.ResultOnDb[0], function (lisrOrderProduct) {

                    for (let i = 0; i < lisrOrderProduct.length; i++) {

                        list.push(lisrOrderProduct[i]);
                    }
                   

                    //------------------------------------------------//

                    rootNode[0].children = list;

                    resultData.ResultList = rootNode;

                    callback(resultData);
                    
                });
                                

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


    Fn_GetOrderProduct(dataItem, callback) {

        let sql = this.sqlFactory.Fn_GetOrderProduct(dataItem);

        mySqlExecute.Select(sql, function (resultData) {

            if (resultData.ResultOnDb.length > 0) {

                let list = [];

                for (let i = 0; i < resultData.ResultOnDb.length; i++) {

                    let childNode = {
                        expanded: true,
                        id: "ProductCode" + (i + 1),
                        text: "Product Code :: " + new Cls_Manufacture_Models().Fn_CheckNull(resultData.ResultOnDb[i].PRODUCT_CODE) + " | Revision :: " + new Cls_Manufacture_Models().Fn_CheckNull(resultData.ResultOnDb[i].REVISION),
                        leaf: false,
                        children: [{                           
                            expanded: true,
                            id: "ProductName" + (i + 1),
                            text: "Product Name :: " + new Cls_Manufacture_Models().Fn_CheckNull(resultData.ResultOnDb[i].PRODUCT_NAME),
                            leaf: true,
                            FORMULA_ID: resultData.ResultOnDb[i].FORMULA_ID
                        }, {
                            expanded: true,
                            id: "MfgStatus" + (i + 1),
                            text: "MFG Status :: " + new Cls_Manufacture_Models().Fn_CheckNull(resultData.ResultOnDb[i].STATUS_NAME),
                            leaf: true
                        }, {
                            expanded: true,
                            id: "Quntity" + (i + 1),
                            text: "Quntity :: " + new Cls_Manufacture_Models().Fn_CheckNull(resultData.ResultOnDb[i].QUNTITY) + " " + new Cls_Manufacture_Models().Fn_CheckNull(resultData.ResultOnDb[i].UNIT_NAME),
                            leaf: true
                        }, {
                            expanded: true,
                            id: "TotalPrice" + (i + 1),
                            text: "Total Price :: " + new Cls_Manufacture_Models().Fn_CheckNull(resultData.ResultOnDb[i].TOTAL_PRICE) + " Bath",
                            leaf: true
                        }, {
                            expanded: true,
                            id: "PricePerUnit" + (i + 1),
                            text: "Price/Unit :: " + new Cls_Manufacture_Models().Fn_CheckNull(resultData.ResultOnDb[i].PRICE_PER_UNIT) + " Bath",
                            leaf: true
                        }]
                    };


                    new Cls_Manufacture_Models().Fn_Fn_GetManufactureBathShipment(resultData.ResultOnDb[i], i, function (listBatch) {

                        childNode.children.push(listBatch);

                        list.push(childNode);

                        if (i === resultData.ResultOnDb.length - 1) {

                            callback(list);
                        }

                    });

                }


            }
            else {
                let childNode = {
                    expanded: true,
                    id: "1",
                    text: "No Data",
                    leaf: false,
                    children: null
                };

                callback(childNode);
            }

        });
    }


    
    Fn_Fn_GetManufactureBathShipment(dataItem,index, callback) {

        let sql = this.sqlFactory.Fn_GetManufactureBathShipment(dataItem);

        mySqlExecute.Select(sql, function (resultData) {

            if (resultData.ResultOnDb.length > 0) {

                let list = [];

                let rootNode = {
                    expanded: true,
                    id: "MfgNo" + index,
                    text: "MFG NO. :: " + resultData.ResultOnDb[0].MFG_NO,
                    leaf: false,
                    children: []
                };

                for (let i = 0; i < resultData.ResultOnDb.length; i++) {

                    let childNode = {
                        expanded: true,
                        id: "BatchSeq" + index + (i + 1),
                        text: "Batch SEQ. :: " + new Cls_Manufacture_Models().Fn_CheckNull(resultData.ResultOnDb[i].BATCH_SEQ_NO),
                        leaf: true,
                        children: null
                    };
                    list.push(childNode);

                    childNode = {
                        expanded: true,
                        id: "BatchSeq" + index + (i + 1),
                        text: "Batch SEQ. :: " + new Cls_Manufacture_Models().Fn_CheckNull(resultData.ResultOnDb[i].BATCH_SEQ_NO),
                        leaf: false,
                        children: [{
                            expanded: true,
                            id: "Plant" + index + (i + 1),
                            text: "Plant :: " + new Cls_Manufacture_Models().Fn_CheckNull(resultData.ResultOnDb[i].PLANT_NAME),
                            leaf: true,
                            children: null
                        }, {
                            expanded: true,
                            id: "Quntity" + index + (i + 1),
                            text: "Quntity :: " + new Cls_Manufacture_Models().Fn_CheckNull(resultData.ResultOnDb[i].QUANTITY) + " " + new Cls_Manufacture_Models().Fn_CheckNull(resultData.ResultOnDb[i].UNIT_NAME),
                            leaf: true,
                            children: null
                        }, {
                            expanded: true,
                            id: "ShipmentNo" + index + (i + 1),
                            text: "Shipment No :: " + new Cls_Manufacture_Models().Fn_CheckNull(resultData.ResultOnDb[i].SHIPMENT_NO),
                            leaf: false,
                            children: [{
                                expanded: true,
                                id: "ShipmentStatus" + index + (i + 1),
                                text: "Shipment Status :: " + new Cls_Manufacture_Models().Fn_CheckNull(resultData.ResultOnDb[i].STATUS_NAME),
                                leaf: true,
                                children: null
                            }, {
                                expanded: true,
                                id: "TruckNo" + index + (i + 1),
                                text: "Truck No :: " + new Cls_Manufacture_Models().Fn_CheckNull(resultData.ResultOnDb[i].TRUCK_NO),
                                leaf: true,
                                children: null
                            }, {
                                expanded: true,
                                id: "TruckName" + index + (i + 1),
                                text: "Truck Name :: " + new Cls_Manufacture_Models().Fn_CheckNull(resultData.ResultOnDb[i].TRUCK_NAME),
                                leaf: true,
                                children: null
                            }, {
                                expanded: true,
                                id: "Driver" + index + (i + 1),
                                text: "Driver Name :: " + new Cls_Manufacture_Models().Fn_CheckNull(resultData.ResultOnDb[i].EMPLOYEE_NAME),
                                leaf: true,
                                children: null
                            }]
                        }]
                    };
                    list.push(childNode);
                }

                rootNode.children = list;

                callback(rootNode);

            }
            else {
                let childNode = {
                    expanded: true,
                    id: "1",
                    text: "No Data",
                    leaf: false,
                    children: null
                };

                callback(childNode);
            }

        });
    }

    Fn_CheckNull(item) {

        if (item === null) {

            return "None";
        }
        else {

            return item;
        }

    }


};

module.exports = Cls_Manufacture_Models;
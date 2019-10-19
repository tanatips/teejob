
let mySqlExecute = require('../../../BusinessData/Execute/File_MySQL_Execute.js');

let Cls_ShipmentDocument_SQL = require('../../../SQLFactory/Report/ShipmentDocument/Cls_ShipmentDocument_SQL.js');

class Cls_ShipmentDocument_Models {

    constructor() {

        this.sqlFactory = new Cls_ShipmentDocument_SQL();
    }

    Fn_PrintPDF(dataItem, callback) {

        let sql = this.sqlFactory.Fn_PrintPDF(dataItem);

    }
};

module.exports = Cls_ShipmentDocument_Models;


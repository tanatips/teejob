
let sqlFormat = require('mstring');
let sql = "";

class Cls_Manufacture_SQL {

    Fn_GetOrderCustomer(dataItem) {

        sql = sqlFormat(function () {
            /***
                SELECT
                    OD.ORDER_ID,
                    OD.ORDER_NO,
                    ST.STATUS_ID,
                    ST.STATUS_NAME,
                    CS.CUSTOMER_ID,
                    CS.CUSTOMER_NAME,
                    OD.SHIP_TO_ADDRESS,
                    OD.DISTANCE
                FROM BATCH_ORDER OD
                INNER JOIN BATCH_CUSTOMER CS ON OD.CUSTOMER_ID = CS.CUSTOMER_ID
                INNER JOIN BATCH_STATUS ST ON OD.STATUS_ID = ST.STATUS_ID
                WHERE OD.ORDER_NO = 'dataItem.ORDER_NO'
            ***/
        });

        sql = sql.replace('dataItem.ORDER_NO', dataItem.ORDER_NO);

        return sql;
    }


    Fn_GetOrderProduct(dataItem) {

        sql = sqlFormat(function () {
            /***
                SELECT
                      PS.REVISION,
                      PS.PRODUCT_CODE,
                      PR.PRODUCT_NAME,
                      ST.STATUS_NAME,
                      ODP.QUNTITY,
                      UN.UNIT_NAME,
                      PS.PRICE_PER_UNIT,
                      (ODP.QUNTITY * PS.PRICE_PER_UNIT ) AS 'TOTAL_PRICE',
                      ODP.ORDER_ID,
                      ODP.PRODUCT_SPEC_ID,
                      FMU.FORMULA_ID,
                      FMU.FORMULA_NAME

                FROM BATCH_ORDER_PRODUCT ODP
                INNER JOIN BATCH_STATUS ST ON ODP.STATUS_ID = ST.STATUS_ID
                INNER JOIN BATCH_PRODUCT_SPEC PS ON ODP.PRODUCT_SPEC_ID = PS.PRODUCT_SPEC_ID
                INNER JOIN BATCH_PRODUCT PR ON PS.PRODUCT_ID = PR.PRODUCT_ID
                INNER JOIN BATCH_UNIT UN ON ODP.UNIT_ID = UN.UNIT_ID
                INNER JOIN BATCH_FORMULA FMU ON PS.FORMULA_ID = FMU.FORMULA_ID
                WHERE ODP.ORDER_ID = 'dataItem.ORDER_ID'
                ORDER BY PS.PRODUCT_CODE, PS.REVISION
            ***/
        });

        sql = sql.replace('dataItem.ORDER_ID', dataItem.ORDER_ID);

        return sql;
    }

    Fn_GetManufactureBathShipment(dataItem) {

        sql = sqlFormat(function () {
            /***
                SELECT
                        MNFB.MANUFACTURE_BATCH_ID,
                        MNF.MANUFACTURE_ID,
                        MNF.MFG_NO,
                        MNFB.BATCH_SEQ_NO,
                        MNFB.QUANTITY,
                        UN.UNIT_NAME,
                        PL.PLANT_NAME,
                        SHM.SHIPMENT_ID,
                        SHM.SHIPMENT_NO,
                        ST.STATUS_NAME,
                        TRK.TRUCK_NO,
                        TRK.TRUCK_NAME,
                        EMP.EMPLOYEE_NAME

                FROM BATCH_MANUFACTURE MNF
                LEFT JOIN BATCH_MANUFACTURE_BATCH MNFB ON MNF.MANUFACTURE_ID = MNFB.MANUFACTURE_ID
                LEFT JOIN BATCH_PLANT PL ON MNFB.PLANT_ID = PL.PLANT_ID
                LEFT JOIN BATCH_UNIT UN ON MNFB.UNIT_ID = UN.UNIT_ID
                LEFT JOIN BATCH_SHIPMENT SHM ON MNFB.MANUFACTURE_BATCH_ID = SHM.MANUFACTURE_BATCH_ID
                LEFT JOIN BATCH_STATUS ST ON SHM.STATUS_ID = ST.STATUS_ID
                LEFT JOIN BATCH_TRUCK TRK ON SHM.TRUCK_ID = TRK.TRUCK_ID
                LEFT JOIN BATCH_EMPLOYEE EMP ON SHM.EMPLOYEE_ID = EMP.EMPLOYEE_ID
                WHERE MNF.ORDER_ID = 'dataItem.ORDER_ID'
                AND MNF.PRODUCT_SPEC_ID = 'dataItem.PRODUCT_SPEC_ID'
                ORDER BY MNF.MFG_NO, MNFB.BATCH_SEQ_NO

            ***/
        });

        sql = sql.replace('dataItem.ORDER_ID', dataItem.ORDER_ID);
        sql = sql.replace('dataItem.PRODUCT_SPEC_ID', dataItem.PRODUCT_SPEC_ID);

        return sql;
    }


    Fn_GetFormulaMaterial(dataItem) {

        sql = sqlFormat(function () {
            /***
                SELECT
                      FM.FORMULA_ID,
                      FM.FORMULA_NAME,
                      FM.REVISION,
                      MAT.MATERIAL_NAME,
                      FMI.QUNTITY,
                      UN.UNIT_NAME
                FROM BATCH_FORMULA FM
                INNER JOIN BATCH_FORMULA_ITEM FMI ON FM.FORMULA_ID = FMI.FORMULA_ID
                INNER JOIN BATCH_MATERIAL MAT ON FMI.MATERIAL_ID = MAT.MATERIAL_ID
                INNER JOIN BATCH_UNIT UN ON FMI.UNIT_ID = UN.UNIT_ID
                WHERE FM.FORMULA_ID = 'dataItem.FORMULA_ID'

            ***/
        });

        sql = sql.replace('dataItem.FORMULA_ID', dataItem.FORMULA_ID);
       
        return sql;
    }

};

module.exports = Cls_Manufacture_SQL;
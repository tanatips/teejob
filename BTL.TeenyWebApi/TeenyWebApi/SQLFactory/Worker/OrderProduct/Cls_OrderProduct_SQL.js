
let sqlFormat = require('mstring');
let sql = "";

class Cls_OrderProduct_SQL {

    Fn_Insert(dataItem) {
        
        sql = sqlFormat(function () {
            /***
                INSERT INTO BATCH_ORDER_PRODUCT
	            (
                    STATUS_ID, 
                    UNIT_ID, 
                    ORDER_ID, 
                    PRODUCT_SPEC_ID, 
                    QUNTITY
	            )
	            VALUES
                (
                  'dataItem.STATUS_ID',
                  'dataItem.UNIT_ID',
                  'dataItem.ORDER_ID',
                  'dataItem.PRODUCT_SPEC_ID',
	              'dataItem.QUNTITY'
	           )
            ***/
        });

        sql = sql.replace('dataItem.STATUS_ID', dataItem.STATUS_ID);
        sql = sql.replace('dataItem.UNIT_ID', dataItem.UNIT_ID);
        sql = sql.replace('dataItem.ORDER_ID', dataItem.ORDER_ID);
        sql = sql.replace('dataItem.PRODUCT_SPEC_ID', dataItem.PRODUCT_SPEC_ID);
        sql = sql.replace('dataItem.QUNTITY', dataItem.QUNTITY);

        return sql;
    }

    Fn_Update(dataItem) {

        sql = sqlFormat(function () {

            /***
                UPDATE BATCH_ORDER_PRODUCT SET                          
                    STATUS_ID = 'dataItem.STATUS_ID',
                    UNIT_ID = 'dataItem.UNIT_ID',
                    QUNTITY = 'dataItem.QUNTITY'
                WHERE ORDER_ID = 'dataItem.ORDER_ID'
                AND PRODUCT_SPEC_ID = 'dataItem.PRODUCT_SPEC_ID'
            ***/
        });

        sql = sql.replace('dataItem.STATUS_ID', dataItem.STATUS_ID);
        sql = sql.replace('dataItem.UNIT_ID', dataItem.UNIT_ID);
        sql = sql.replace('dataItem.ORDER_ID', dataItem.ORDER_ID);
        sql = sql.replace('dataItem.PRODUCT_SPEC_ID', dataItem.PRODUCT_SPEC_ID);
        sql = sql.replace('dataItem.QUNTITY', dataItem.QUNTITY);
      
        return sql;
    }

    Fn_Delete(dataItem) {

        sql = sqlFormat(function () {
            /***
                DELETE FROM BATCH_ORDER_PRODUCT
                WHERE ORDER_ID = 'dataItem.ORDER_ID'
                AND PRODUCT_SPEC_ID = 'dataItem.PRODUCT_SPEC_ID'
            ***/
        });
  
        sql = sql.replace('dataItem.ORDER_ID', dataItem.ORDER_ID);
        sql = sql.replace('dataItem.PRODUCT_SPEC_ID', dataItem.PRODUCT_SPEC_ID);

        return sql;
    }

    Fn_GetOrderProductDetail(dataItem) {

        sql = sqlFormat(function () {
            /***
               SELECT 
                     STG.STATUS_GROUP_NAME,
                     ST.STATUS_ID,
                     ST.STATUS_NAME,
                     PS.REVISION,
                     PDG.PRODUCT_GROUP_NAME,
                     PD.PRODUCT_NAME,
                     PS.PRODUCT_CODE,
                     OP.ORDER_ID,
                     OP.QUNTITY,
                     PS.PRICE_PER_UNIT,
                     (OP.QUNTITY * PS.PRICE_PER_UNIT) AS 'TOTAL_PRICE',
                     UN.UNIT_ID,
                     UN.UNIT_NAME,
                     PS.PRODUCT_SPEC_ID,
                     PS.FORMULA_ID,
                     FM.FORMULA_NAME

              FROM BATCH_ORDER_PRODUCT OP
              INNER JOIN BATCH_PRODUCT_SPEC PS ON OP.PRODUCT_SPEC_ID = PS.PRODUCT_SPEC_ID
              INNER JOIN BATCH_PRODUCT PD ON PS.PRODUCT_ID = PD.PRODUCT_ID
              INNER JOIN BATCH_PRODUCT_GROUP PDG ON PD.PRODUCT_GROUP_ID = PDG.PRODUCT_GROUP_ID
              INNER JOIN BATCH_STATUS ST ON OP.STATUS_ID = ST.STATUS_ID
              INNER JOIN BATCH_STATUS_GROUP STG ON ST.STATUS_GROUP_ID = STG.STATUS_GROUP_ID
              INNER JOIN BATCH_UNIT UN ON OP.UNIT_ID = UN.UNIT_ID
              INNER JOIN BATCH_FORMULA FM ON PS.FORMULA_ID = FM.FORMULA_ID
              WHERE OP.ORDER_ID  = 'dataItem.ORDER_ID'
              AND   PS.REVISION  LIKE 'dataItem.REVISION%'
              ORDER BY PS.PRODUCT_CODE
           ***/
        });

        sql = sql.replace('dataItem.ORDER_ID', dataItem.ORDER_ID);
        sql = sql.replace('dataItem.REVISION', dataItem.REVISION);
       
        return sql;
    }


};

module.exports = Cls_OrderProduct_SQL;


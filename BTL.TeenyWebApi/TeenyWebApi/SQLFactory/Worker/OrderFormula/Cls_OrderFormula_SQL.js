
let sqlFormat = require('mstring');
let sql = "";

class Cls_OrderFormula_SQL {

    Fn_Insert(dataItem) {

        sql = sqlFormat(function () {
            /***
                INSERT INTO BATCH_ORDER_FORMULA
	            (
                   ORDER_ID,
                   FORMULA_ID
	            )
	            VALUES
                (                
                  'dataItem.ORDER_ID',
                  'dataItem.FORMULA_ID'
	            )
            ***/
        });

        sql = sql.replace('dataItem.ORDER_ID', dataItem.ORDER_ID);
        sql = sql.replace('dataItem.FORMULA_ID', dataItem.FORMULA_ID);        

        return sql;
    }


    Fn_Update(dataItem) {

        sql = sqlFormat(function () {

            /***
                UPDATE BATCH_ORDER_FORMULA SET                
                     ORDER_ID = 'dataItem.ORDER_ID',
                     FORMULA_ID = 'dataItem.FORMULA_ID'
                WHERE ORDER_ID = 'dataItem.OLD_ORDER_ID'
                AND  FORMULA_ID = 'dataItem.OLD_FORMULA_ID'
            ***/
        });

        sql = sql.replace('dataItem.OLD_ORDER_ID', dataItem.OLD_ORDER_ID);
        sql = sql.replace('dataItem.OLD_FORMULA_ID', dataItem.OLD_FORMULA_ID);
        sql = sql.replace('dataItem.ORDER_ID', dataItem.ORDER_ID);
        sql = sql.replace('dataItem.FORMULA_ID', dataItem.FORMULA_ID);
       
        return sql;
    }

    Fn_Delete(dataItem) {

        sql = sqlFormat(function () {
            /***
                DELETE FROM BATCH_ORDER_FORMULA
                WHERE ORDER_ID = 'dataItem.ORDER_ID'
                AND   FORMULA_ID = 'dataItem.FORMULA_ID'
            ***/
        });

        sql = sql.replace('dataItem.ORDER_ID', dataItem.ORDER_ID);
        sql = sql.replace('dataItem.FORMULA_ID', dataItem.FORMULA_ID);

        return sql;
    }

    Fn_GetOrderHaveFormula(dataItem) {

        sql = sqlFormat(function () {
            /***
                 SELECT
                        B.ORDER_ID,
                        B.ORDER_NO,                      
                        C.FORMULA_ID,
                        C.FORMULA_NAME
                 FROM BATCH_ORDER_FORMULA A
                 INNER JOIN BATCH_ORDER B ON A.ORDER_ID = B.ORDER_ID
                 INNER JOIN BATCH_FORMULA C ON A.FORMULA_ID = C.FORMULA_ID
                 WHERE B.ORDER_NO = 'dataItem.ORDER_NO'
                 AND   C.FORMULA_NAME LIKE 'dataItem.FORMULA_NAME%'
                 ORDER BY C.FORMULA_NAME
            ***/
        });

        sql = sql.replace('dataItem.ORDER_NO', dataItem.ORDER_NO);        
        sql = sql.replace('dataItem.FORMULA_NAME', dataItem.FORMULA_NAME);

        return sql;
    }

};

module.exports = Cls_OrderFormula_SQL;


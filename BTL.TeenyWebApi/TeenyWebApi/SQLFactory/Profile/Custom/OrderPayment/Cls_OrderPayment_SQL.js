
let sqlFormat = require('mstring');
let sql = "";

class Cls_OrderPayment_SQL {

    Fn_Search(dataItem) {

        let sqlList = [];

        sql = sqlFormat(function () {
            /***
                SELECT COUNT(*) AS TOTAL_COUNT 
                FROM BATCH_ORDER_PAYMENT
                WHERE ORDER_PAYMENT_NAME LIKE 'dataItem.ORDER_PAYMENT_NAME%'
            ***/
        });

        sql = sql.replace('dataItem.ORDER_PAYMENT_NAME', dataItem.ORDER_PAYMENT_NAME);

        sqlList.push(sql);


        sql = sqlFormat(function () {
            /***
                SET @rank=0;
                SELECT * FROM
                (
                    SELECT
                        @rank:=@rank+1 AS RN,
                        ORDER_PAYMENT_ID, 
                        ORDER_PAYMENT_NAME, 
                        DESCRIPTION,
                        CREATE_USER,
                        LAST_USER,
                        DATE_FORMAT(CREATE_DATE,' %d/%m/%Y') AS CREATE_DATE,
                        DATE_FORMAT(LAST_DATE,' %d/%m/%Y') AS LAST_DATE
                    FROM BATCH_ORDER_PAYMENT
                    WHERE ORDER_PAYMENT_NAME LIKE 'dataItem.ORDER_PAYMENT_NAME%'
                    ORDER BY ORDER_PAYMENT_NAME
                ) TB
                WHERE RN > 'dataItem.Start' AND RN <= 'dataItem.Limit'  
            ***/
        });

        sql = sql.replace('dataItem.ORDER_PAYMENT_NAME', dataItem.ORDER_PAYMENT_NAME);

        sql = sql.replace('dataItem.Start', dataItem.Start);
        sql = sql.replace('dataItem.Limit', dataItem.Limit);

        sqlList.push(sql);

        return sqlList;
    }

    Fn_Insert(dataItem) {

        sql = sqlFormat(function () {
            /***
                INSERT INTO BATCH_ORDER_PAYMENT
	            (
                    ORDER_PAYMENT_ID, 
                    ORDER_PAYMENT_NAME, 
                    DESCRIPTION,
	                CREATE_USER,	              
	                CREATE_DATE
	              
	            )
	            VALUES
                (
                  (SELECT IFNULL( MAX(ORDER_PAYMENT_ID), 0) +1 FROM BATCH_ORDER_PAYMENT MAX_ID),
                  'dataItem.ORDER_PAYMENT_NAME',
	              'dataItem.DESCRIPTION',
	              'dataItem.CREATE_USER',
                  CURRENT_DATE()
	           )
            ***/
        });

        sql = sql.replace('dataItem.ORDER_PAYMENT_NAME', dataItem.ORDER_PAYMENT_NAME);

        sql = sql.replace('dataItem.DESCRIPTION', dataItem.DESCRIPTION);
        sql = sql.replace('dataItem.CREATE_USER', dataItem.CREATE_USER);

        return sql;
    }

    Fn_Update(dataItem) {

        sql = sqlFormat(function () {
            /***
                UPDATE BATCH_ORDER_PAYMENT SET  
                
                    ORDER_PAYMENT_NAME = 'dataItem.ORDER_PAYMENT_NAME',
                    
	                DESCRIPTION = 'dataItem.DESCRIPTION',

                    LAST_USER = 'dataItem.LAST_USER',
                    LAST_DATE =  CURRENT_DATE()

                WHERE ORDER_PAYMENT_ID = 'dataItem.ORDER_PAYMENT_ID'

            ***/
        });

        sql = sql.replace('dataItem.ORDER_PAYMENT_NAME', dataItem.ORDER_PAYMENT_NAME);

        sql = sql.replace('dataItem.DESCRIPTION', dataItem.DESCRIPTION);
        sql = sql.replace('dataItem.LAST_USER', dataItem.LAST_USER);

        sql = sql.replace('dataItem.ORDER_PAYMENT_ID', dataItem.ORDER_PAYMENT_ID);

        return sql;
    }

    Fn_Delete(dataItem) {

        sql = sqlFormat(function () {
            /***
                DELETE FROM BATCH_ORDER_PAYMENT
                WHERE ORDER_PAYMENT_ID = 'dataItem.ORDER_PAYMENT_ID'
            ***/
        });

        sql = sql.replace('dataItem.ORDER_PAYMENT_ID', dataItem.ORDER_PAYMENT_ID);

        return sql;
    }
    
    Fn_GetOrderPaymentAll() {

        sql = sqlFormat(function () {
            /***
                 SELECT ORDER_PAYMENT_ID,
                        ORDER_PAYMENT_NAME
                 FROM BATCH_ORDER_PAYMENT
                 ORDER BY ORDER_PAYMENT_NAME
            ***/
        });

        return sql;
    }

};

module.exports = Cls_OrderPayment_SQL;

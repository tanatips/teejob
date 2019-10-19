
let sqlFormat = require('mstring');
let sql = "";

class Cls_Order_SQL {

    Fn_Search_old(dataItem) {

        let sqlList = [];

        sql = sqlFormat(function () {
            /***
                SELECT COUNT(*) AS TOTAL_COUNT 
                FROM BATCH_ORDER A
                LEFT  JOIN BATCH_ORDER_PRODUCT B ON A.ORDER_ID = B.ORDER_ID
                LEFT  JOIN BATCH_PRODUCT_SPEC C ON B.PRODUCT_SPEC_ID = C.PRODUCT_SPEC_ID
                LEFT  JOIN BATCH_PRODUCT H ON C.PRODUCT_ID = H.PRODUCT_ID
                LEFT  JOIN BATCH_UNIT I ON B.UNIT_ID = I.UNIT_ID
                LEFT  JOIN BATCH_STATUS K ON B.STATUS_ID = K.STATUS_ID
                INNER JOIN BATCH_CUSTOMER D ON A.CUSTOMER_ID = D.CUSTOMER_ID
                INNER JOIN BATCH_PROJECT E ON A.PROJECT_ID = E.PROJECT_ID
                INNER JOIN BATCH_CUSTOMER_TYPE F ON A.CUSTOMER_TYPE_ID = F.CUSTOMER_TYPE_ID
                INNER JOIN BATCH_ORDER_PAYMENT G ON A.ORDER_PAYMENT_ID = G.ORDER_PAYMENT_ID
                INNER JOIN BATCH_STATUS J ON A.STATUS_ID = J.STATUS_ID
                WHERE A.ORDER_NO LIKE 'dataItem.ORDER_NO%'
                AND   D.CUSTOMER_NAME LIKE 'dataItem.CUSTOMER_NAME%'
                AND   J.STATUS_NAME LIKE 'dataItem.STATUS_NAME%'
            ***/
        });

        sql = sql.replace('dataItem.ORDER_NO', dataItem.ORDER_NO);
        sql = sql.replace('dataItem.CUSTOMER_NAME', dataItem.CUSTOMER_NAME);
        sql = sql.replace('dataItem.STATUS_NAME', dataItem.STATUS_NAME);

        sqlList.push(sql);

       
        sql = sqlFormat(function () {
            /***
                SET @rank=0;
                SELECT * FROM
                (
                    SELECT
                        @rank:=@rank+1 AS RN,
                        A.ORDER_ID,
                        A.ORDER_NO,
                        D.CUSTOMER_ID,
                        D.CUSTOMER_NAME,
                        H.PRODUCT_ID,
                        H.PRODUCT_NAME,
                        C.PRODUCT_CODE,
                        K.STATUS_ID   AS 'MFG_STATUS_ID',
                        K.STATUS_NAME AS 'MFG_STATUS_NAME',
                        B.QUNTITY,
                        I.UNIT_ID,
                        I.UNIT_NAME,
                        C.PRICE_PER_UNIT,                       
                        ( C.PRICE_PER_UNIT *  B.QUNTITY) AS 'TOTAL_PRICE',
                        J.STATUS_ID   AS 'ORDER_STATUS_ID',
                        J.STATUS_NAME AS 'ORDER_STATUS_NAME',
                        C.REVISION,
                        J.STATUS_ID,
                        J.STATUS_NAME,
                        F.CUSTOMER_TYPE_ID,
                        F.CUSTOMER_TYPE_NAME,
                        G.ORDER_PAYMENT_ID,
                        G.ORDER_PAYMENT_NAME,
                        E.PROJECT_ID,
                        E.PROJECT_NAME,
                        C.PRODUCT_SPEC_ID,
                        C.FORMULA_ID,
                        A.DESCRIPTION,
                        A.CREATE_USER,
                        A.LAST_USER,
                        DATE_FORMAT(A.CREATE_DATE,' %d/%m/%Y') AS CREATE_DATE,
                        DATE_FORMAT(A.LAST_DATE,' %d/%m/%Y') AS LAST_DATE
                    FROM BATCH_ORDER A
                    LEFT  JOIN BATCH_ORDER_PRODUCT B ON A.ORDER_ID = B.ORDER_ID
                    LEFT  JOIN BATCH_PRODUCT_SPEC C ON B.PRODUCT_SPEC_ID = C.PRODUCT_SPEC_ID
                    LEFT  JOIN BATCH_PRODUCT H ON C.PRODUCT_ID = H.PRODUCT_ID
                    LEFT  JOIN BATCH_UNIT I ON B.UNIT_ID = I.UNIT_ID
                    LEFT  JOIN BATCH_STATUS K ON B.STATUS_ID = K.STATUS_ID
                    INNER JOIN BATCH_CUSTOMER D ON A.CUSTOMER_ID = D.CUSTOMER_ID
                    INNER JOIN BATCH_PROJECT E ON A.PROJECT_ID = E.PROJECT_ID
                    INNER JOIN BATCH_CUSTOMER_TYPE F ON A.CUSTOMER_TYPE_ID = F.CUSTOMER_TYPE_ID
                    INNER JOIN BATCH_ORDER_PAYMENT G ON A.ORDER_PAYMENT_ID = G.ORDER_PAYMENT_ID
                    INNER JOIN BATCH_STATUS J ON A.STATUS_ID = J.STATUS_ID
                    WHERE A.ORDER_NO LIKE 'dataItem.ORDER_NO%'
                    AND   D.CUSTOMER_NAME LIKE 'dataItem.CUSTOMER_NAME%'                   
                    AND   J.STATUS_NAME LIKE 'dataItem.STATUS_NAME%'
                    ORDER BY A.ORDER_NO, D.CUSTOMER_NAME, H.PRODUCT_NAME, C.PRODUCT_CODE
                ) TB
                WHERE RN > 'dataItem.Start' AND RN <= 'dataItem.Limit'  
            ***/
        });

        sql = sql.replace('dataItem.ORDER_NO', dataItem.ORDER_NO);
        sql = sql.replace('dataItem.CUSTOMER_NAME', dataItem.CUSTOMER_NAME);     
        sql = sql.replace('dataItem.STATUS_NAME', dataItem.STATUS_NAME);

        sql = sql.replace('dataItem.Start', dataItem.Start);
        sql = sql.replace('dataItem.Limit', dataItem.Limit);

        sqlList.push(sql);

        return sqlList;
    }

    Fn_Search(dataItem) {

        let sqlList = [];

        sql = sqlFormat(function () {
            /***
                SELECT COUNT(*) AS TOTAL_COUNT 
                FROM BATCH_ORDER A
                INNER JOIN BATCH_CUSTOMER_TYPE B ON A.CUSTOMER_TYPE_ID = B.CUSTOMER_TYPE_ID
                INNER JOIN BATCH_ORDER_PAYMENT C ON A.ORDER_PAYMENT_ID = C.ORDER_PAYMENT_ID
                INNER JOIN BATCH_CUSTOMER D ON A.CUSTOMER_ID = D.CUSTOMER_ID
                INNER JOIN BATCH_STATUS E ON A.STATUS_ID = E.STATUS_ID
                INNER JOIN BATCH_PROJECT F ON A.PROJECT_ID = F.PROJECT_ID
                INNER JOIN BATCH_STATUS_GROUP G ON E.STATUS_GROUP_ID = G.STATUS_GROUP_ID
                WHERE A.ORDER_NO LIKE 'dataItem.ORDER_NO%'
                AND   D.CUSTOMER_NAME LIKE 'dataItem.CUSTOMER_NAME%'
                AND   E.STATUS_NAME LIKE 'dataItem.STATUS_NAME%'
            ***/
        });

        sql = sql.replace('dataItem.ORDER_NO', dataItem.ORDER_NO);
        sql = sql.replace('dataItem.CUSTOMER_NAME', dataItem.CUSTOMER_NAME);
        sql = sql.replace('dataItem.STATUS_NAME', dataItem.STATUS_NAME);

        sqlList.push(sql);


        sql = sqlFormat(function () {
            /***
                SET @rank=0;
                SELECT * FROM
                (
                    SELECT
                           @rank:=@rank+1 AS RN,
                           A.ORDER_ID,
                           A.ORDER_NO,
                           G.STATUS_GROUP_ID,
                           G.STATUS_GROUP_NAME,
                           E.STATUS_ID,
                           E.STATUS_NAME,                          
                           D.CUSTOMER_ID,
                           D.CUSTOMER_NAME,
                           B.CUSTOMER_TYPE_ID,
                           B.CUSTOMER_TYPE_NAME,
                           C.ORDER_PAYMENT_ID,
                           C.ORDER_PAYMENT_NAME,
                           F.PROJECT_ID,
                           F.PROJECT_NAME,
                           A.SHIP_TO_ADDRESS,
                           A.DISTANCE,
                           A.DESCRIPTION,
                           A.CREATE_USER,
                           A.LAST_USER,
                           DATE_FORMAT(A.CREATE_DATE,' %d/%m/%Y') AS CREATE_DATE,
                           DATE_FORMAT(A.LAST_DATE,' %d/%m/%Y') AS LAST_DATE
                    FROM BATCH_ORDER A
                    INNER JOIN BATCH_CUSTOMER_TYPE B ON A.CUSTOMER_TYPE_ID = B.CUSTOMER_TYPE_ID
                    INNER JOIN BATCH_ORDER_PAYMENT C ON A.ORDER_PAYMENT_ID = C.ORDER_PAYMENT_ID
                    INNER JOIN BATCH_CUSTOMER D ON A.CUSTOMER_ID = D.CUSTOMER_ID
                    INNER JOIN BATCH_STATUS E ON A.STATUS_ID = E.STATUS_ID
                    INNER JOIN BATCH_PROJECT F ON A.PROJECT_ID = F.PROJECT_ID
                    INNER JOIN BATCH_STATUS_GROUP G ON E.STATUS_GROUP_ID = G.STATUS_GROUP_ID
                    WHERE A.ORDER_NO LIKE 'dataItem.ORDER_NO%'
                    AND   D.CUSTOMER_NAME LIKE 'dataItem.CUSTOMER_NAME%'
                    AND   E.STATUS_NAME LIKE 'dataItem.STATUS_NAME%'
                    ORDER BY A.ORDER_NO,  E.STATUS_NAME
                ) TB
                WHERE RN > 'dataItem.Start' AND RN <= 'dataItem.Limit'  
            ***/
        });

        sql = sql.replace('dataItem.ORDER_NO', dataItem.ORDER_NO);
        sql = sql.replace('dataItem.CUSTOMER_NAME', dataItem.CUSTOMER_NAME);
        sql = sql.replace('dataItem.STATUS_NAME', dataItem.STATUS_NAME);

        sql = sql.replace('dataItem.Start', dataItem.Start);
        sql = sql.replace('dataItem.Limit', dataItem.Limit);

        sqlList.push(sql);

        return sqlList;
    }

    Fn_Insert(dataItem) {

        sql = sqlFormat(function () {
            /***
                INSERT INTO BATCH_ORDER
	            (
                    STATUS_ID,
                    CUSTOMER_ID,
                    CUSTOMER_TYPE_ID,
                    ORDER_PAYMENT_ID,
                    PROJECT_ID,
                    ORDER_ID, 
                    ORDER_NO, 
                    SHIP_TO_ADDRESS,
                    DISTANCE,
                    DESCRIPTION,
	                CREATE_USER,	              
	                CREATE_DATE
	              
	            )
	            VALUES
                (
                  'dataItem.STATUS_ID',
                  'dataItem.CUSTOMER_ID',
                  'dataItem.CUSTOMER_TYPE_ID',
                  'dataItem.ORDER_PAYMENT_ID',
                  'dataItem.PROJECT_ID',                 
                  (SELECT IFNULL( MAX(ORDER_ID), 0) +1 FROM BATCH_ORDER MAX_ID),
                  'dataItem.ORDER_NO',
                  'dataItem.SHIP_TO_ADDRESS',
                  'dataItem.DISTANCE',
	              'dataItem.DESCRIPTION',
	              'dataItem.CREATE_USER',
                  CURRENT_DATE()
	           )
            ***/
        });

        sql = sql.replace('dataItem.STATUS_ID', dataItem.STATUS_ID);
        sql = sql.replace('dataItem.CUSTOMER_ID', dataItem.CUSTOMER_ID);
        sql = sql.replace('dataItem.CUSTOMER_TYPE_ID', dataItem.CUSTOMER_TYPE_ID);
        sql = sql.replace('dataItem.ORDER_PAYMENT_ID', dataItem.ORDER_PAYMENT_ID);
        sql = sql.replace('dataItem.PROJECT_ID', dataItem.PROJECT_ID);
        sql = sql.replace('dataItem.ORDER_NO', dataItem.ORDER_NO);
        sql = sql.replace('dataItem.SHIP_TO_ADDRESS', dataItem.SHIP_TO_ADDRESS);
        sql = sql.replace('dataItem.DISTANCE', dataItem.DISTANCE);

        sql = sql.replace('dataItem.DESCRIPTION', dataItem.DESCRIPTION);
        sql = sql.replace('dataItem.CREATE_USER', dataItem.CREATE_USER);

        return sql;
    }

    Fn_Update(dataItem) {

        sql = sqlFormat(function () {
            /***
                UPDATE BATCH_ORDER SET                  
                    STATUS_ID = 'dataItem.STATUS_ID',
                    CUSTOMER_ID = 'dataItem.CUSTOMER_ID',
                    CUSTOMER_TYPE_ID = 'dataItem.CUSTOMER_TYPE_ID',
                    ORDER_PAYMENT_ID = 'dataItem.ORDER_PAYMENT_ID',
                    PROJECT_ID = 'dataItem.PROJECT_ID',
                    ORDER_NO = 'dataItem.ORDER_NO',
                    SHIP_TO_ADDRESS = 'dataItem.SHIP_TO_ADDRESS',
                    DISTANCE = 'dataItem.DISTANCE',
	                DESCRIPTION = 'dataItem.DESCRIPTION',

                    LAST_USER = 'dataItem.LAST_USER',
                    LAST_DATE =  CURRENT_DATE()

                WHERE ORDER_ID = 'dataItem.ORDER_ID'

            ***/
        });
  
        sql = sql.replace('dataItem.STATUS_ID', dataItem.STATUS_ID);
        sql = sql.replace('dataItem.CUSTOMER_ID', dataItem.CUSTOMER_ID);
        sql = sql.replace('dataItem.CUSTOMER_TYPE_ID', dataItem.CUSTOMER_TYPE_ID);
        sql = sql.replace('dataItem.ORDER_PAYMENT_ID', dataItem.ORDER_PAYMENT_ID);
        sql = sql.replace('dataItem.PROJECT_ID', dataItem.PROJECT_ID);
        sql = sql.replace('dataItem.ORDER_NO', dataItem.ORDER_NO);
        sql = sql.replace('dataItem.SHIP_TO_ADDRESS', dataItem.SHIP_TO_ADDRESS);
        sql = sql.replace('dataItem.DISTANCE', dataItem.DISTANCE);
        sql = sql.replace('dataItem.DESCRIPTION', dataItem.DESCRIPTION);
        sql = sql.replace('dataItem.LAST_USER', dataItem.LAST_USER);

        sql = sql.replace('dataItem.ORDER_ID', dataItem.ORDER_ID);

        return sql;
    }

    Fn_Delete(dataItem) {

        sql = sqlFormat(function () {
            /***
                DELETE FROM BATCH_ORDER
                WHERE ORDER_ID = 'dataItem.ORDER_ID'
            ***/
        });

        sql = sql.replace('dataItem.ORDER_ID', dataItem.ORDER_ID);

        return sql;
    }

    Fn_GetOrderAll() {

        sql = sqlFormat(function () {
            /***
                SELECT 
                    ORDER_ID,
                    ORDER_NO
                FROM BATCH_ORDER
                ORDER BY ORDER_NO
            ***/
        });

        return sql;
    }
       

    Fn_GetOrderByCustomer(dataItem) {

        sql = sqlFormat(function () {
            /***
                SELECT 
                    ORDER_ID,
                    ORDER_NO
                FROM BATCH_ORDER
                WHERE CUSTOMER_ID = 'dataItem.CUSTOMER_ID' 
                ORDER BY ORDER_NO
            ***/
        });

        sql = sql.replace('dataItem.CUSTOMER_ID', dataItem.CUSTOMER_ID);

        return sql;
    }

    Fn_GetOrderByUnit(dataItem) {

        sql = sqlFormat(function () {
            /***
                SELECT 
                    ORDER_ID,
                    ORDER_NO
                FROM BATCH_ORDER
                WHERE UNIT_ID = 'dataItem.UNIT_ID' 
                ORDER BY ORDER_NO
            ***/
        });

        sql = sql.replace('dataItem.UNIT_ID', dataItem.UNIT_ID);

        return sql;
    }

    Fn_GetOrderByCondition(dataItem) {

        sql = sqlFormat(function () {
            /***
                SELECT 
                    ORDER_ID,
                    ORDER_NO
                FROM BATCH_ORDER
                WHERE CUSTOMER_ID = 'dataItem.CUSTOMER_ID' 
                AND UNIT_ID = 'dataItem.UNIT_ID' 
                ORDER BY ORDER_NO
            ***/
        });

        sql = sql.replace('dataItem.CUSTOMER_ID', dataItem.CUSTOMER_ID);
        sql = sql.replace('dataItem.UNIT_ID', dataItem.UNIT_ID);

        return sql;
    }

    Fn_GetListOfMaterialFormOrder(dataItem) {

        sql = sqlFormat(function () {
            /***
                SELECT A.FORMULA_ID,
                       A.FORMULA_NAME,
                       B.FORMULA_ITEM_ID,
                       C.MATERIAL_ID,
                       C.MATERIAL_NAME,
                       C.MATERIAL_SIZE,
                       B.QUNTITY,
                       D.UNIT_ID,
                       D.UNIT_NAME
                FROM BATCH_FORMULA A
                INNER JOIN BATCH_FORMULA_ITEM B ON A.FORMULA_ID = B.FORMULA_ID
                INNER JOIN BATCH_MATERIAL C ON B.MATERIAL_ID = C.MATERIAL_ID
                INNER JOIN BATCH_UNIT D ON B.UNIT_ID = D.UNIT_ID
                WHERE B.FORMULA_ID = 'dataItem.FORMULA_ID'
                ORDER BY C.MATERIAL_NAME
            ***/
        });

        sql = sql.replace('dataItem.FORMULA_ID', dataItem.FORMULA_ID);
       
        return sql;
    }
};

module.exports = Cls_Order_SQL;



let sqlFormat = require('mstring');
let sql = "";

class Cls_Shipment_SQL {

    Fn_Search(dataItem) {

        let sqlList = [];

        sql = sqlFormat(function () {
            /***
                SELECT COUNT(*) AS TOTAL_COUNT 
                FROM BATCH_SHIPMENT A
                INNER JOIN BATCH_ORDER B ON A.ORDER_ID = B.ORDER_ID
                INNER JOIN BATCH_CUSTOMER C ON B.CUSTOMER_ID = C.CUSTOMER_ID
                INNER JOIN BATCH_EMPLOYEE D ON A.EMPLOYEE_ID = D.EMPLOYEE_ID
                INNER JOIN BATCH_POSITION E ON D.POSITION_ID = E.POSITION_ID
                INNER JOIN BATCH_STATUS F ON A.STATUS_ID = F.STATUS_ID
                INNER JOIN BATCH_STATUS_GROUP G ON F.STATUS_GROUP_ID = G.STATUS_GROUP_ID
                INNER JOIN BATCH_JOBSITE H ON A.JOBSITE_ID = H.JOBSITE_ID
                INNER JOIN BATCH_TRUCK I ON A.TRUCK_ID = I.TRUCK_ID
                WHERE C.CUSTOMER_NAME LIKE 'dataItem.CUSTOMER_NAME%'
                AND B.ORDER_NO LIKE 'dataItem.ORDER_NO%'
                AND D.EMPLOYEE_NAME LIKE 'dataItem.EMPLOYEE_NAME%'
                AND F.STATUS_NAME LIKE 'dataItem.STATUS_NAME%'
                AND H.JOBSITE_NAME LIKE 'dataItem.JOBSITE_NAME%'
                AND I.TRUCK_NO LIKE 'dataItem.TRUCK_NO%'
                AND A.SHIPMENT_NO LIKE 'dataItem.SHIPMENT_NO%'
                AND DATE_FORMAT(A.SHIPMENT_DATE, '%d/%m/%Y') >= 'dataItem.StartShipmentDate'
                AND DATE_FORMAT(A.SHIPMENT_DATE, '%d/%m/%Y') <= 'dataItem.EndShipmentDate'
            ***/
        });

        sql = sql.replace('dataItem.CUSTOMER_NAME', dataItem.CUSTOMER_NAME);
        sql = sql.replace('dataItem.ORDER_NO', dataItem.ORDER_NO);
        sql = sql.replace('dataItem.EMPLOYEE_NAME', dataItem.EMPLOYEE_NAME);
        sql = sql.replace('dataItem.STATUS_NAME', dataItem.STATUS_NAME);
        sql = sql.replace('dataItem.JOBSITE_NAME', dataItem.JOBSITE_NAME);
        sql = sql.replace('dataItem.TRUCK_NO', dataItem.TRUCK_NO);
        sql = sql.replace('dataItem.SHIPMENT_NO', dataItem.SHIPMENT_NO);
        sql = sql.replace('dataItem.StartShipmentDate', dataItem.StartShipmentDate);
        sql = sql.replace('dataItem.EndShipmentDate', dataItem.EndShipmentDate);

        sqlList.push(sql);


        sql = sqlFormat(function () {
            /***
                SET @rank=0;
                SELECT * FROM
                (
                    SELECT
                          @rank:=@rank+1 AS RN,                       
                           C.CUSTOMER_ID,
                           C.CUSTOMER_NAME,
                           B.ORDER_ID,
                           B.ORDER_NO,
                           A.SHIPMENT_ID,
                           A.SHIPMENT_NO,                          
                           DATE_FORMAT(A.SHIPMENT_DATE,'%d/%m/%Y') AS SHIPMENT_DATE,
                           A.SHIP_TO_ADDRESS,
                           G.STATUS_GROUP_ID,
                           G.STATUS_GROUP_NAME,
                           F.STATUS_ID,
                           F.STATUS_NAME,
                           D.EMPLOYEE_ID,
                           D.EMPLOYEE_NAME,                            
                           E.POSITION_ID,
                           E.POSITION_NAME,
                           H.JOBSITE_ID,
                           H.JOBSITE_NAME,
                           I.TRUCK_ID,
                           I.TRUCK_NO,
                           A.DESCRIPTION,
                           DATE_FORMAT(A.CREATE_DATE,'%d/%m/%Y') AS CREATE_DATE,
                           DATE_FORMAT(A.LAST_DATE,'%d/%m/%Y') AS LAST_DATE                        
                    FROM BATCH_SHIPMENT A
                    INNER JOIN BATCH_ORDER B ON A.ORDER_ID = B.ORDER_ID
                    INNER JOIN BATCH_CUSTOMER C ON B.CUSTOMER_ID = C.CUSTOMER_ID
                    INNER JOIN BATCH_EMPLOYEE D ON A.EMPLOYEE_ID = D.EMPLOYEE_ID
                    INNER JOIN BATCH_POSITION E ON D.POSITION_ID = E.POSITION_ID
                    INNER JOIN BATCH_STATUS F ON A.STATUS_ID = F.STATUS_ID
                    INNER JOIN BATCH_STATUS_GROUP G ON F.STATUS_GROUP_ID = G.STATUS_GROUP_ID
                    INNER JOIN BATCH_JOBSITE H ON A.JOBSITE_ID = H.JOBSITE_ID
                    INNER JOIN BATCH_TRUCK I ON A.TRUCK_ID = I.TRUCK_ID
                    WHERE C.CUSTOMER_NAME LIKE 'dataItem.CUSTOMER_NAME%'
                    AND B.ORDER_NO LIKE 'dataItem.ORDER_NO%'
                    AND D.EMPLOYEE_NAME LIKE 'dataItem.EMPLOYEE_NAME%'
                    AND F.STATUS_NAME LIKE 'dataItem.STATUS_NAME%'
                    AND H.JOBSITE_NAME LIKE 'dataItem.JOBSITE_NAME%'
                    AND I.TRUCK_NO LIKE 'dataItem.TRUCK_NO%'
                    AND A.SHIPMENT_NO LIKE 'dataItem.SHIPMENT_NO%'
                    AND DATE_FORMAT(A.SHIPMENT_DATE, '%d/%m/%Y') >= 'dataItem.StartShipmentDate'
                    AND DATE_FORMAT(A.SHIPMENT_DATE, '%d/%m/%Y') <= 'dataItem.EndShipmentDate'
                    ORDER BY C.CUSTOMER_NAME, B.ORDER_NO, A.SHIPMENT_NO

                ) TB
                WHERE RN > dataItem.Start AND RN <= dataItem.Limit  
            ***/
        });

        sql = sql.replace('dataItem.CUSTOMER_NAME', dataItem.CUSTOMER_NAME);
        sql = sql.replace('dataItem.ORDER_NO', dataItem.ORDER_NO);
        sql = sql.replace('dataItem.EMPLOYEE_NAME', dataItem.EMPLOYEE_NAME);
        sql = sql.replace('dataItem.STATUS_NAME', dataItem.STATUS_NAME);
        sql = sql.replace('dataItem.JOBSITE_NAME', dataItem.JOBSITE_NAME);
        sql = sql.replace('dataItem.TRUCK_NO', dataItem.TRUCK_NO);
        sql = sql.replace('dataItem.SHIPMENT_NO', dataItem.SHIPMENT_NO);
        sql = sql.replace('dataItem.StartShipmentDate', dataItem.StartShipmentDate);
        sql = sql.replace('dataItem.EndShipmentDate', dataItem.EndShipmentDate);
              
        sql = sql.replace('dataItem.Start', dataItem.Start);
        sql = sql.replace('dataItem.Limit', dataItem.Limit);

        sqlList.push(sql);

        return sqlList;
    }

    Fn_Insert(dataItem) {

        sql = sqlFormat(function () {
            /***
                INSERT INTO BATCH_SHIPMENT
                (
                   ORDER_ID,
                   EMPLOYEE_ID,
                   TRUCK_ID,
                   STATUS_ID,
                   JOBSITE_ID,
                   SHIPMENT_ID,
                   SHIPMENT_NO,
                   SHIPMENT_DATE,
                   SHIP_TO_ADDRESS,
                   DESCRIPTION,
                   CREATE_USER,
                   CREATE_DATE
                )
                VALUES
                (
                  'dataItem.ORDER_ID',
                  'dataItem.EMPLOYEE_ID',
                  'dataItem.TRUCK_ID',
                  'dataItem.STATUS_ID',
                  'dataItem.JOBSITE_ID',
                  (SELECT IFNULL( MAX(SHIPMENT_ID), 0) +1 FROM BATCH_SHIPMENT MAX_ID),
                  'dataItem.SHIPMENT_NO',
                   STR_TO_DATE('dataItem.SHIPMENT_DATE', '%d/%m/%Y'),
                  'dataItem.SHIP_TO_ADDRESS',
                  'dataItem.DESCRIPTION',
                  'dataItem.CREATE_USER',
                   CURRENT_DATE()
                )
            ***/
        });
      
        sql = sql.replace('dataItem.ORDER_ID', dataItem.ORDER_ID);
        sql = sql.replace('dataItem.EMPLOYEE_ID', dataItem.EMPLOYEE_ID);
        sql = sql.replace('dataItem.TRUCK_ID', dataItem.TRUCK_ID);
        sql = sql.replace('dataItem.STATUS_ID', dataItem.STATUS_ID);
        sql = sql.replace('dataItem.JOBSITE_ID', dataItem.JOBSITE_ID);          
        sql = sql.replace('dataItem.SHIPMENT_NO', dataItem.SHIPMENT_NO);
        sql = sql.replace('dataItem.SHIPMENT_DATE', dataItem.SHIPMENT_DATE);
        sql = sql.replace('dataItem.SHIP_TO_ADDRESS', dataItem.SHIP_TO_ADDRESS);
        sql = sql.replace('dataItem.DESCRIPTION', dataItem.DESCRIPTION);
        sql = sql.replace('dataItem.CREATE_USER', dataItem.CREATE_USER);

        return sql;
    }

    Fn_Update(dataItem) {

        sql = sqlFormat(function () {
            /***
                UPDATE BATCH_SHIPMENT SET  
                
                   ORDER_ID = 'dataItem.ORDER_ID',
                   EMPLOYEE_ID = 'dataItem.EMPLOYEE_ID',
                   TRUCK_ID = 'dataItem.TRUCK_ID',
                   STATUS_ID = 'dataItem.STATUS_ID',
                   JOBSITE_ID = 'dataItem.JOBSITE_ID',                  
                   SHIPMENT_NO = 'dataItem.SHIPMENT_NO',
                   SHIPMENT_DATE = STR_TO_DATE('dataItem.SHIPMENT_DATE', '%d/%m/%Y'),
                   SHIP_TO_ADDRESS = 'dataItem.SHIP_TO_ADDRESS',
                   DESCRIPTION = 'dataItem.DESCRIPTION',

                    LAST_USER = 'dataItem.LAST_USER',
                    LAST_DATE =  CURRENT_DATE()

                WHERE SHIPMENT_ID = 'dataItem.SHIPMENT_ID'

            ***/
        });

        sql = sql.replace('dataItem.ORDER_ID', dataItem.ORDER_ID);
        sql = sql.replace('dataItem.EMPLOYEE_ID', dataItem.EMPLOYEE_ID);
        sql = sql.replace('dataItem.TRUCK_ID', dataItem.TRUCK_ID);
        sql = sql.replace('dataItem.STATUS_ID', dataItem.STATUS_ID);
        sql = sql.replace('dataItem.JOBSITE_ID', dataItem.JOBSITE_ID);
        sql = sql.replace('dataItem.SHIPMENT_NO', dataItem.SHIPMENT_NO);
        sql = sql.replace('dataItem.SHIPMENT_DATE', dataItem.SHIPMENT_DATE);
        sql = sql.replace('dataItem.SHIP_TO_ADDRESS', dataItem.SHIP_TO_ADDRESS);
        sql = sql.replace('dataItem.DESCRIPTION', dataItem.DESCRIPTION);
       
        sql = sql.replace('dataItem.LAST_USER', dataItem.LAST_USER);

        sql = sql.replace('dataItem.SHIPMENT_ID', dataItem.SHIPMENT_ID);

        return sql;
    }

    Fn_Delete(dataItem) {

        sql = sqlFormat(function () {
            /***
                DELETE FROM BATCH_SHIPMENT
                WHERE SHIPMENT_ID = 'dataItem.SHIPMENT_ID'
            ***/
        });

        sql = sql.replace('dataItem.SHIPMENT_ID', dataItem.SHIPMENT_ID);

        return sql;
    }

    Fn_GetShipmentAll() {

        sql = sqlFormat(function () {
            /***
                SELECT 
                    SHIPMENT_ID,
                    SHIPMENT_NO
                FROM BATCH_SHIPMENT
                ORDER BY SHIPMENT_NO
            ***/
        });

        return sql;
    }
   
  
   Fn_GetShipmentByCondition(dataItem) {

        sql = sqlFormat(function () {
            /***
                SELECT 
                    SHIPMENT_ID,
                    SHIPMENT_NO
                FROM BATCH_SHIPMENT
                WHERE ORDER_ID = 'dataItem.ORDER_ID'
                AND TRUCK_ID = 'dataItem.TRUCK_ID'
                AND EMPLOYEE_ID = 'dataItem.EMPLOYEE_ID'
                ORDER BY SHIPMENT_NO
            ***/
        });

        sql = sql.replace('dataItem.ORDER_ID', dataItem.ORDER_ID);
        sql = sql.replace('dataItem.TRUCK_ID', dataItem.TRUCK_ID);
        sql = sql.replace('dataItem.EMPLOYEE_ID', dataItem.EMPLOYEE_ID);

        return sql;
    }

    Fn_GetShipmentByOrder(dataItem) {

        sql = sqlFormat(function () {
            /***
                SELECT 
                    SHIPMENT_ID,
                    SHIPMENT_NO
                FROM BATCH_SHIPMENT
                WHERE ORDER_ID = 'dataItem.ORDER_ID'
                ORDER BY SHIPMENT_NO
            ***/
        });

        sql = sql.replace('dataItem.ORDER_ID', dataItem.ORDER_ID);

        return sql;
    }

    Fn_GetShipmentByTruck(dataItem) {

        sql = sqlFormat(function () {
            /***
                SELECT 
                    SHIPMENT_ID,
                    SHIPMENT_NO
                FROM BATCH_SHIPMENT
                WHERE TRUCK_ID = 'dataItem.TRUCK_ID'
                ORDER BY SHIPMENT_NO
            ***/
        });

        sql = sql.replace('dataItem.TRUCK_ID', dataItem.TRUCK_ID);

        return sql;
    }

    Fn_GetShipmentByEmployee(dataItem) {

        sql = sqlFormat(function () {
            /***
                SELECT 
                    SHIPMENT_ID,
                    SHIPMENT_NO
                FROM BATCH_SHIPMENT
                WHERE EMPLOYEE_ID = 'dataItem.EMPLOYEE_ID'
                ORDER BY SHIPMENT_NO
            ***/
        });

        sql = sql.replace('dataItem.EMPLOYEE_ID', dataItem.EMPLOYEE_ID);

        return sql;
    }
};

module.exports = Cls_Shipment_SQL;


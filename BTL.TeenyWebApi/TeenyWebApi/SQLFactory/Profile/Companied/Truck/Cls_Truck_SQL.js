
let sqlFormat = require('mstring');
let sql = "";

class Cls_Truck_SQL {

    Fn_Search(dataItem) {

        let sqlList = [];

        sql = sqlFormat(function () {
            /***
                SELECT COUNT(*) AS TOTAL_COUNT                      
                FROM BATCH_TRUCK AS T
                INNER JOIN BATCH_PLANT AS PN ON PN.PLANT_ID = T.PLANT_ID
                INNER JOIN BATCH_COMPANY AS C ON C.COMPANY_ID = PN.COMPANY_ID
                WHERE T.TRUCK_NO LIKE 'dataItem.TRUCK_NO%' 
                AND T.TRUCK_NAME LIKE 'dataItem.TRUCK_NAME%' 
                AND PN.PLANT_NAME LIKE 'dataItem.PLANT_NAME%'
                AND C.COMPANY_NAME LIKE 'dataItem.COMPANY_NAME%' 
                AND C.SHORT_NAME LIKE 'dataItem.SHORT_NAME%'
            ***/
        });

        sql = sql.replace('dataItem.TRUCK_NO', dataItem.TRUCK_NO);
        sql = sql.replace('dataItem.TRUCK_NAME', dataItem.TRUCK_NAME);

        sql = sql.replace('dataItem.PLANT_NAME', dataItem.PLANT_NAME);

        sql = sql.replace('dataItem.COMPANY_NAME', dataItem.COMPANY_NAME);
        sql = sql.replace('dataItem.SHORT_NAME', dataItem.SHORT_NAME);

        sqlList.push(sql);

        sql = sqlFormat(function () {
            /***
                SET @rank=0;
                SELECT * FROM
                (
                    SELECT
                        @rank:=@rank+1 AS RN,
                        T.TRUCK_ID,
                        T.TRUCK_NO,   
                        T.TRUCK_NAME,
                        T.TRUCK_SIZE,
                        T.TRUCK_CAPACITY,
                        T.CAPACITY_UNIT,
                        PN.PLANT_ID,
                        PN.PLANT_NAME,
                        C.COMPANY_ID,
                        C.COMPANY_NAME,
                        C.SHORT_NAME,
                        T.DESCRIPTION,
                        T.CREATE_USER,
                        T.LAST_USER,
                        DATE_FORMAT(T.CREATE_DATE,' %d/%m/%Y') AS CREATE_DATE,
                        DATE_FORMAT(T.LAST_DATE,' %d/%m/%Y') AS LAST_DATE
                    FROM BATCH_TRUCK AS T
                    INNER JOIN BATCH_PLANT AS PN ON PN.PLANT_ID = T.PLANT_ID
                    INNER JOIN BATCH_COMPANY AS C ON C.COMPANY_ID = PN.COMPANY_ID
                    WHERE T.TRUCK_NO LIKE 'dataItem.TRUCK_NO%' 
                    AND T.TRUCK_NAME LIKE 'dataItem.TRUCK_NAME%' 
                    AND PN.PLANT_NAME LIKE 'dataItem.PLANT_NAME%'
                    AND C.COMPANY_NAME LIKE 'dataItem.COMPANY_NAME%' 
                    AND C.SHORT_NAME LIKE 'dataItem.SHORT_NAME%'
                    ORDER BY T.TRUCK_NO,T.TRUCK_NAME,PN.PLANT_NAME,C.COMPANY_NAME,C.SHORT_NAME
                ) TB
                WHERE RN > 'dataItem.Start' AND RN <= 'dataItem.Limit' 
            ***/
        });

        sql = sql.replace('dataItem.TRUCK_NO', dataItem.TRUCK_NO);
        sql = sql.replace('dataItem.TRUCK_NAME', dataItem.TRUCK_NAME);

        sql = sql.replace('dataItem.PLANT_NAME', dataItem.PLANT_NAME);

        sql = sql.replace('dataItem.COMPANY_NAME', dataItem.COMPANY_NAME);
        sql = sql.replace('dataItem.SHORT_NAME', dataItem.SHORT_NAME);

        sql = sql.replace('dataItem.Start', dataItem.Start);
        sql = sql.replace('dataItem.Limit', dataItem.Limit);

        sqlList.push(sql);

        return sqlList;
    }

    Fn_Insert(dataItem) {

        sql = sqlFormat(function () {
            /***
                INSERT INTO BATCH_TRUCK
	            (
                    PLANT_ID,
                    TRUCK_ID, 
                    TRUCK_NO, 
                    TRUCK_NAME, 
                    TRUCK_SIZE, 
                    TRUCK_CAPACITY, 
                    CAPACITY_UNIT,
                    DESCRIPTION,
	                CREATE_USER,	              
	                CREATE_DATE
	            )
	            VALUES
                (
                  'dataItem.PLANT_ID',
                  (SELECT IFNULL( MAX(TRUCK_ID), 0) +1 FROM BATCH_TRUCK MAX_ID),
                  'dataItem.TRUCK_NO',
                  'dataItem.TRUCK_NAME',
                  'dataItem.TRUCK_SIZE',
                  'dataItem.TRUCK_CAPACITY',
                  'dataItem.CAPACITY_UNIT',
	              'dataItem.DESCRIPTION',
	              'dataItem.CREATE_USER',
                  CURRENT_DATE()
	           )
            ***/
        });

        sql = sql.replace('dataItem.PLANT_ID', dataItem.PLANT_ID);

        sql = sql.replace('dataItem.TRUCK_NO', dataItem.TRUCK_NO);
        sql = sql.replace('dataItem.TRUCK_NAME', dataItem.TRUCK_NAME);
        sql = sql.replace('dataItem.TRUCK_SIZE', dataItem.TRUCK_SIZE);
        sql = sql.replace('dataItem.TRUCK_CAPACITY', dataItem.TRUCK_CAPACITY);
        sql = sql.replace('dataItem.CAPACITY_UNIT', dataItem.CAPACITY_UNIT);

        sql = sql.replace('dataItem.DESCRIPTION', dataItem.DESCRIPTION);
        sql = sql.replace('dataItem.CREATE_USER', dataItem.CREATE_USER);

        return sql;
    }

    Fn_Update(dataItem) {

        sql = sqlFormat(function () {
            /***
                UPDATE BATCH_TRUCK SET  

                    PLANT_ID = 'dataItem.PLANT_ID',
                    TRUCK_NO = 'dataItem.TRUCK_NO',
                    TRUCK_NAME = 'dataItem.TRUCK_NAME',
                    TRUCK_SIZE = 'dataItem.TRUCK_SIZE',
                    TRUCK_CAPACITY = 'dataItem.TRUCK_CAPACITY',
                    CAPACITY_UNIT = 'dataItem.CAPACITY_UNIT',
	                DESCRIPTION = 'dataItem.DESCRIPTION',
                    LAST_USER = 'dataItem.LAST_USER',
                    LAST_DATE =  CURRENT_DATE()

                WHERE TRUCK_ID = 'dataItem.TRUCK_ID'

            ***/
        });

        sql = sql.replace('dataItem.PLANT_ID', dataItem.PLANT_ID);

        sql = sql.replace('dataItem.TRUCK_NO', dataItem.TRUCK_NO);
        sql = sql.replace('dataItem.TRUCK_NAME', dataItem.TRUCK_NAME);
        sql = sql.replace('dataItem.TRUCK_SIZE', dataItem.TRUCK_SIZE);
        sql = sql.replace('dataItem.TRUCK_CAPACITY', dataItem.TRUCK_CAPACITY);
        sql = sql.replace('dataItem.CAPACITY_UNIT', dataItem.CAPACITY_UNIT);
        
        sql = sql.replace('dataItem.DESCRIPTION', dataItem.DESCRIPTION);
        sql = sql.replace('dataItem.LAST_USER', dataItem.LAST_USER);

        sql = sql.replace('dataItem.TRUCK_ID', dataItem.TRUCK_ID);

        return sql;
    }

    Fn_Delete(dataItem) {

        sql = sqlFormat(function () {
            /***
                DELETE FROM BATCH_TRUCK
                WHERE TRUCK_ID = 'dataItem.TRUCK_ID'
            ***/
        });

        sql = sql.replace('dataItem.TRUCK_ID', dataItem.TRUCK_ID);

        return sql;
    }

    Fn_GetTruckAll() {

        sql = sqlFormat(function () {
            /***
                SELECT 
                    TRUCK_ID,
                    TRUCK_NO,
                    TRUCK_NAME
                FROM BATCH_TRUCK
                ORDER BY TRUCK_NO,TRUCK_NAME
            ***/
        });

        return sql;
    }

    Fn_GetTruckByPlant(dataItem) {

        sql = sqlFormat(function () {
            /***
                SELECT 
                    TRUCK_ID,
                    TRUCK_NO,
                    TRUCK_NAME
                FROM BATCH_TRUCK
                WHERE PLANT_ID = 'dataItem.PLANT_ID'
                ORDER BY TRUCK_NO,TRUCK_NAME
            ***/
        });

        sql = sql.replace('dataItem.PLANT_ID', dataItem.PLANT_ID);

        return sql;
    }
};

module.exports = Cls_Truck_SQL;


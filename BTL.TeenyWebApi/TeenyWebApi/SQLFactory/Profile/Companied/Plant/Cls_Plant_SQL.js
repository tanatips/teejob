
let sqlFormat = require('mstring');
let sql = "";

class Cls_Plant_SQL {

    Fn_Search(dataItem) {

        let sqlList = [];

        sql = sqlFormat(function () {
            /***
                SELECT COUNT(*) AS TOTAL_COUNT                      
                FROM BATCH_PLANT AS P
                INNER JOIN BATCH_COMPANY AS C ON C.COMPANY_ID = P.COMPANY_ID
                WHERE P.PLANT_NAME LIKE 'dataItem.PLANT_NAME%'
                AND C.COMPANY_NAME LIKE 'dataItem.COMPANY_NAME%' 
                AND C.SHORT_NAME LIKE 'dataItem.SHORT_NAME%'
            ***/
        });

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
                        P.PLANT_ID,
                        P.PLANT_NAME,
                        C.COMPANY_ID,
                        C.COMPANY_NAME,
                        C.SHORT_NAME,
                        P.ADDRESS,
                        P.PHONE_NO,
                        P.MOBILE_NO,
                        P.FAX_NO,
                        P.DESCRIPTION,
                        P.CREATE_USER,
                        P.LAST_USER,
                        DATE_FORMAT(P.CREATE_DATE,' %d/%m/%Y') AS CREATE_DATE,
                        DATE_FORMAT(P.LAST_DATE,' %d/%m/%Y') AS LAST_DATE
                    FROM BATCH_PLANT AS P
                    INNER JOIN BATCH_COMPANY AS C ON C.COMPANY_ID = P.COMPANY_ID
                    WHERE P.PLANT_NAME LIKE 'dataItem.PLANT_NAME%'
                    AND C.COMPANY_NAME LIKE 'dataItem.COMPANY_NAME%' 
                    AND C.SHORT_NAME LIKE 'dataItem.SHORT_NAME%'
                    ORDER BY P.PLANT_NAME,C.COMPANY_NAME,C.SHORT_NAME
                ) TB
                WHERE RN > 'dataItem.Start' AND RN <= 'dataItem.Limit'  
            ***/
        });

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
                INSERT INTO BATCH_PLANT
	            (
                    COMPANY_ID,
                    PLANT_ID,
                    PLANT_NAME,
                    ADDRESS,
                    PHONE_NO,
	                MOBILE_NO,
	                FAX_NO,
	                DESCRIPTION,
	                CREATE_USER,	              
	                CREATE_DATE
	              
	            )
	            VALUES
                (
                  'dataItem.COMPANY_ID',
                  (SELECT IFNULL( MAX(PLANT_ID), 0) +1 FROM BATCH_PLANT MAX_ID),
                  'dataItem.PLANT_NAME',
                  'dataItem.ADDRESS',
                  'dataItem.PHONE_NO',
	              'dataItem.MOBILE_NO',
	              'dataItem.FAX_NO',
	              'dataItem.DESCRIPTION',
	              'dataItem.CREATE_USER',
                  CURRENT_DATE()
	           )
            ***/
        });

        sql = sql.replace('dataItem.COMPANY_ID', dataItem.COMPANY_ID);
        sql = sql.replace('dataItem.PLANT_NAME', dataItem.PLANT_NAME);
        sql = sql.replace('dataItem.ADDRESS', dataItem.ADDRESS);
        sql = sql.replace('dataItem.PHONE_NO', dataItem.PHONE_NO);
        sql = sql.replace('dataItem.MOBILE_NO', dataItem.MOBILE_NO);
        sql = sql.replace('dataItem.FAX_NO', dataItem.FAX_NO);
        sql = sql.replace('dataItem.DESCRIPTION', dataItem.DESCRIPTION);
        sql = sql.replace('dataItem.CREATE_USER', dataItem.CREATE_USER);

        return sql;
    }

    Fn_Update(dataItem) {

        sql = sqlFormat(function () {
            /***
                UPDATE BATCH_PLANT SET  

                    COMPANY_ID = 'dataItem.COMPANY_ID',
                    PLANT_NAME = 'dataItem.PLANT_NAME',
                    ADDRESS = 'dataItem.ADDRESS',
                    PHONE_NO = 'dataItem.PHONE_NO',
	                MOBILE_NO = 'dataItem.MOBILE_NO',
	                FAX_NO = 'dataItem.FAX_NO',
	                DESCRIPTION = 'dataItem.DESCRIPTION',

                    LAST_USER = 'dataItem.LAST_USER',
                    LAST_DATE =  CURRENT_DATE()

                WHERE PLANT_ID = 'dataItem.PLANT_ID'

            ***/
        });

        sql = sql.replace('dataItem.COMPANY_ID', dataItem.COMPANY_ID);
        sql = sql.replace('dataItem.PLANT_NAME', dataItem.PLANT_NAME);
        sql = sql.replace('dataItem.ADDRESS', dataItem.ADDRESS);
        sql = sql.replace('dataItem.PHONE_NO', dataItem.PHONE_NO);
        sql = sql.replace('dataItem.MOBILE_NO', dataItem.MOBILE_NO);
        sql = sql.replace('dataItem.FAX_NO', dataItem.FAX_NO);
        sql = sql.replace('dataItem.DESCRIPTION', dataItem.DESCRIPTION);
        sql = sql.replace('dataItem.LAST_USER', dataItem.LAST_USER);

        sql = sql.replace('dataItem.PLANT_ID', dataItem.PLANT_ID);

        return sql;
    }

    Fn_Delete(dataItem) {

        sql = sqlFormat(function () {
            /***
                DELETE FROM BATCH_PLANT
                WHERE PLANT_ID = 'dataItem.PLANT_ID'
            ***/
        });

        sql = sql.replace('dataItem.PLANT_ID', dataItem.PLANT_ID);

        return sql;
    }

    Fn_GetPlantAll() {

        sql = sqlFormat(function () {
            /***
                SELECT 
                    PLANT_ID,
                    PLANT_NAME
                FROM BATCH_PLANT
                ORDER BY PLANT_NAME
            ***/
        });

        return sql;
    }
   
  
   Fn_GetPlantByCompany(dataItem) {

        sql = sqlFormat(function () {
            /***
                SELECT 
                    PLANT_ID,
                    PLANT_NAME
               FROM BATCH_PLANT
               WHERE COMPANY_ID = 'dataItem.COMPANY_ID'
               ORDER BY PLANT_NAME
            ***/
        });

        sql = sql.replace('dataItem.COMPANY_ID', dataItem.COMPANY_ID);

        return sql;
    }
  

};

module.exports = Cls_Plant_SQL;


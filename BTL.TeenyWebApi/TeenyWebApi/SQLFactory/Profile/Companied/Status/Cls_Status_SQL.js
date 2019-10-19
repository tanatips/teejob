
let sqlFormat = require('mstring');
let sql = "";

class Cls_Status_SQL {

    Fn_Search(dataItem) {

        let sqlList = [];

        sql = sqlFormat(function () {
            /***
                SELECT COUNT(*) AS TOTAL_COUNT 
                FROM BATCH_STATUS
                WHERE STATUS_NAME LIKE 'dataItem.STATUS_NAME%'
            ***/
        });

        sql = sql.replace('dataItem.STATUS_NAME', dataItem.STATUS_NAME);

        sqlList.push(sql);


        sql = sqlFormat(function () {
            /***
                SET @rank=0;
                SELECT * FROM
                (
                    SELECT
                        @rank:=@rank+1 AS RN,
                        STATUS_GROUP_ID
                        STATUS_GROUP_NAME,
                        STATUS_ID, 
                        STATUS_NAME,                        
                        DESCRIPTION,
                        CREATE_USER,
                        LAST_USER,
                        DATE_FORMAT(CREATE_DATE,' %d/%m/%Y') AS CREATE_DATE,
                        DATE_FORMAT(LAST_DATE,' %d/%m/%Y') AS LAST_DATE
                    FROM BATCH_STATUS A
                    INNER JOIN BATCH_STATUS_GROUP B ON A.STATUS_GROUP_ID = B.STATUS_GROUP_ID
                    WHERE STATUS_GROUP_NAME LIKE 'dataItem.STATUS_GROUP_NAME%'
                    AND STATUS_NAME LIKE 'dataItem.STATUS_NAME%'
                    ORDER BY STATUS_NAME
                ) TB
                WHERE RN > 'dataItem.Start' AND RN <= 'dataItem.Limit'  
            ***/
        });

        sql = sql.replace('dataItem.STATUS_GROUP_NAME', dataItem.STATUS_GROUP_NAME);
        sql = sql.replace('dataItem.STATUS_NAME', dataItem.STATUS_NAME);
        sql = sql.replace('dataItem.Start', dataItem.Start);
        sql = sql.replace('dataItem.Limit', dataItem.Limit);

        sqlList.push(sql);

        return sqlList;
    }

    Fn_Insert(dataItem) {

        sql = sqlFormat(function () {
            /***
                INSERT INTO BATCH_STATUS
	            (
                    STATUS_GROUP_ID,
                    STATUS_ID, 
                    STATUS_NAME,                     
                    DESCRIPTION,
	                CREATE_USER,	              
	                CREATE_DATE
	              
	            )
	            VALUES
                (
                  'dataItem.STATUS_GROUP_ID',
                  (SELECT IFNULL( MAX(STATUS_ID), 0) +1 FROM BATCH_STATUS MAX_ID),
                  'dataItem.STATUS_NAME',                 
	              'dataItem.DESCRIPTION',
	              'dataItem.CREATE_USER',
                  CURRENT_DATE()
	           )
            ***/
        });

        sql = sql.replace('dataItem.STATUS_GROUP_ID', dataItem.STATUS_GROUP_ID);
        sql = sql.replace('dataItem.STATUS_NAME', dataItem.STATUS_NAME);      
        sql = sql.replace('dataItem.DESCRIPTION', dataItem.DESCRIPTION);
        sql = sql.replace('dataItem.CREATE_USER', dataItem.CREATE_USER);

        return sql;
    }

    Fn_Update(dataItem) {

        sql = sqlFormat(function () {
            /***
                UPDATE BATCH_STATUS SET  
                
                    STATUS_GROUP_ID = 'dataItem.STATUS_GROUP_ID',
                    STATUS_NAME = 'dataItem.STATUS_NAME',
	                DESCRIPTION = 'dataItem.DESCRIPTION',

                    LAST_USER = 'dataItem.LAST_USER',
                    LAST_DATE =  CURRENT_DATE()

                WHERE STATUS_ID = 'dataItem.STATUS_ID'

            ***/
        });

        sql = sql.replace('dataItem.STATUS_GROUP_ID', dataItem.STATUS_GROUP_ID);    
        sql = sql.replace('dataItem.STATUS_ID', dataItem.STATUS_ID);
        sql = sql.replace('dataItem.STATUS_NAME', dataItem.STATUS_NAME);
        sql = sql.replace('dataItem.DESCRIPTION', dataItem.DESCRIPTION);
        sql = sql.replace('dataItem.LAST_USER', dataItem.LAST_USER);


        return sql;
    }

    Fn_Delete(dataItem) {

        sql = sqlFormat(function () {
            /***
                DELETE FROM BATCH_STATUS
                WHERE STATUS_ID = 'dataItem.STATUS_ID'
            ***/
        });

        sql = sql.replace('dataItem.STATUS_ID', dataItem.STATUS_ID);

        return sql;
    }

    Fn_GetStatusAll() {

        sql = sqlFormat(function () {
            /***
                SELECT 
                    STATUS_ID,
                    STATUS_NAME
                FROM BATCH_STATUS
                ORDER BY STATUS_NAME
            ***/
        });

        return sql;
    }

    Fn_GetStatusByGroup(dataItem) {

        sql = sqlFormat(function () {
            /***
                SELECT 
                    STATUS_ID,
                    STATUS_NAME
                FROM BATCH_STATUS
                WHERE STATUS_GROUP_ID = 'dataItem.STATUS_GROUP_ID'
                ORDER BY STATUS_NAME
            ***/
        });

        sql = sql.replace('dataItem.STATUS_GROUP_ID', dataItem.STATUS_GROUP_ID);  

        return sql;
    }
};

module.exports = Cls_Status_SQL;


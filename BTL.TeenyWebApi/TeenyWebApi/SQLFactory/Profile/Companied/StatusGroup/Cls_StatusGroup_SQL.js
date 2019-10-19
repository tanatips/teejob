
let sqlFormat = require('mstring');
let sql = "";

class Cls_StatusGroup_SQL {

    Fn_Search(dataItem) {

        let sqlList = [];

        sql = sqlFormat(function () {
            /***
                SELECT COUNT(*) AS TOTAL_COUNT 
                FROM BATCH_STATUS_GROUP
                WHERE STATUS_GROUP_NAME LIKE 'dataItem.STATUS_GROUP_NAME%'
            ***/
        });

        sql = sql.replace('dataItem.STATUS_GROUP_NAME', dataItem.STATUS_GROUP_NAME);

        sqlList.push(sql);


        sql = sqlFormat(function () {
            /***
                SET @rank=0;
                SELECT * FROM
                (
                    SELECT
                        @rank:=@rank+1 AS RN,
                        STATUS_GROUP_ID, 
                        STATUS_GROUP_NAME,                        
                        DESCRIPTION,
                        CREATE_USER,
                        LAST_USER,
                        DATE_FORMAT(CREATE_DATE,' %d/%m/%Y') AS CREATE_DATE,
                        DATE_FORMAT(LAST_DATE,' %d/%m/%Y') AS LAST_DATE
                    FROM BATCH_STATUS_GROUP
                    WHERE STATUS_GROUP_NAME LIKE 'dataItem.STATUS_GROUP_NAME%'
                    ORDER BY STATUS_GROUP_NAME
                ) TB
                WHERE RN > 'dataItem.Start' AND RN <= 'dataItem.Limit'  
            ***/
        });

        sql = sql.replace('dataItem.STATUS_GROUP_NAME', dataItem.STATUS_GROUP_NAME);
        sql = sql.replace('dataItem.Start', dataItem.Start);
        sql = sql.replace('dataItem.Limit', dataItem.Limit);

        sqlList.push(sql);

        return sqlList;
    }

    Fn_Insert(dataItem) {

        sql = sqlFormat(function () {
            /***
                INSERT INTO BATCH_STATUS_GROUP
	            (
                    STATUS_GROUP_ID, 
                    STATUS_GROUP_NAME,                     
                    DESCRIPTION,
	                CREATE_USER,	              
	                CREATE_DATE
	              
	            )
	            VALUES
                (
                  (SELECT IFNULL( MAX(STATUS_GROUP_ID), 0) +1 FROM BATCH_STATUS_GROUP MAX_ID),
                  'dataItem.STATUS_GROUP_NAME',                 
	              'dataItem.DESCRIPTION',
	              'dataItem.CREATE_USER',
                  CURRENT_DATE()
	           )
            ***/
        });

        sql = sql.replace('dataItem.STATUS_GROUP_NAME', dataItem.STATUS_GROUP_NAME);      
        sql = sql.replace('dataItem.DESCRIPTION', dataItem.DESCRIPTION);
        sql = sql.replace('dataItem.CREATE_USER', dataItem.CREATE_USER);

        return sql;
    }

    Fn_Update(dataItem) {

        sql = sqlFormat(function () {
            /***
                UPDATE BATCH_STATUS_GROUP SET  
                
                    STATUS_GROUP_NAME = 'dataItem.STATUS_GROUP_NAME',                   
	                DESCRIPTION = 'dataItem.DESCRIPTION',

                    LAST_USER = 'dataItem.LAST_USER',
                    LAST_DATE =  CURRENT_DATE()

                WHERE STATUS_GROUP_ID = 'dataItem.STATUS_GROUP_ID'

            ***/
        });

        sql = sql.replace('dataItem.STATUS_GROUP_NAME', dataItem.STATUS_GROUP_NAME);       
        sql = sql.replace('dataItem.DESCRIPTION', dataItem.DESCRIPTION);
        sql = sql.replace('dataItem.LAST_USER', dataItem.LAST_USER);

        sql = sql.replace('dataItem.STATUS_GROUP_ID', dataItem.STATUS_GROUP_ID);

        return sql;
    }

    Fn_Delete(dataItem) {

        sql = sqlFormat(function () {
            /***
                DELETE FROM BATCH_STATUS_GROUP
                WHERE STATUS_GROUP_ID = 'dataItem.STATUS_GROUP_ID'
            ***/
        });

        sql = sql.replace('dataItem.STATUS_GROUP_ID', dataItem.STATUS_GROUP_ID);

        return sql;
    }

    Fn_GetStatusGroupAll() {

        sql = sqlFormat(function () {
            /***
                SELECT 
                    STATUS_GROUP_ID,
                    STATUS_GROUP_NAME
                FROM BATCH_STATUS_GROUP
                ORDER BY STATUS_GROUP_NAME
            ***/
        });

        return sql;
    }
};

module.exports = Cls_StatusGroup_SQL;



let sqlFormat = require('mstring');
let sql = "";

class Cls_Project_SQL {

    Fn_Search(dataItem) {

        let sqlList = [];

        sql = sqlFormat(function () {
            /***
                SELECT COUNT(*) AS TOTAL_COUNT 
                FROM BATCH_PROJECT
                WHERE PROJECT_NAME LIKE 'dataItem.PROJECT_NAME%'
            ***/
        });

        sql = sql.replace('dataItem.PROJECT_NAME', dataItem.PROJECT_NAME);

        sqlList.push(sql);


        sql = sqlFormat(function () {
            /***
                SET @rank=0;
                SELECT * FROM
                (
                    SELECT
                        @rank:=@rank+1 AS RN,
                        PROJECT_ID, 
                        PROJECT_NAME, 
                        DESCRIPTION,
                        CREATE_USER,
                        LAST_USER,
                        DATE_FORMAT(CREATE_DATE,' %d/%m/%Y') AS CREATE_DATE,
                        DATE_FORMAT(LAST_DATE,' %d/%m/%Y') AS LAST_DATE
                    FROM BATCH_PROJECT
                    WHERE PROJECT_NAME LIKE 'dataItem.PROJECT_NAME%'
                    ORDER BY PROJECT_NAME
                ) TB
                WHERE RN > 'dataItem.Start' AND RN <= 'dataItem.Limit'  
            ***/
        });

        sql = sql.replace('dataItem.PROJECT_NAME', dataItem.PROJECT_NAME);
        sql = sql.replace('dataItem.Start', dataItem.Start);
        sql = sql.replace('dataItem.Limit', dataItem.Limit);

        sqlList.push(sql);

        return sqlList;
    }

    Fn_Insert(dataItem) {

        sql = sqlFormat(function () {
            /***
                INSERT INTO BATCH_PROJECT
	            (
                    PROJECT_ID, 
                    PROJECT_NAME, 
                    DESCRIPTION,
	                CREATE_USER,	              
	                CREATE_DATE
	              
	            )
	            VALUES
                (
                  (SELECT IFNULL( MAX(PROJECT_ID), 0) +1 FROM BATCH_PROJECT MAX_ID),
                  'dataItem.PROJECT_NAME',
	              'dataItem.DESCRIPTION',
	              'dataItem.CREATE_USER',
                  CURRENT_DATE()
	           )
            ***/
        });

        sql = sql.replace('dataItem.PROJECT_NAME', dataItem.PROJECT_NAME);
        sql = sql.replace('dataItem.DESCRIPTION', dataItem.DESCRIPTION);
        sql = sql.replace('dataItem.CREATE_USER', dataItem.CREATE_USER);

        return sql;
    }

    Fn_Update(dataItem) {

        sql = sqlFormat(function () {
            /***
                UPDATE BATCH_PROJECT SET  
                
                    PROJECT_NAME = 'dataItem.PROJECT_NAME',
	                DESCRIPTION = 'dataItem.DESCRIPTION',

                    LAST_USER = 'dataItem.LAST_USER',
                    LAST_DATE =  CURRENT_DATE()

                WHERE PROJECT_ID = 'dataItem.PROJECT_ID'

            ***/
        });

        sql = sql.replace('dataItem.PROJECT_NAME', dataItem.PROJECT_NAME);

        sql = sql.replace('dataItem.DESCRIPTION', dataItem.DESCRIPTION);
        sql = sql.replace('dataItem.LAST_USER', dataItem.LAST_USER);

        sql = sql.replace('dataItem.PROJECT_ID', dataItem.PROJECT_ID);

        return sql;
    }

    Fn_Delete(dataItem) {

        sql = sqlFormat(function () {
            /***
                DELETE FROM BATCH_PROJECT
                WHERE PROJECT_ID = 'dataItem.PROJECT_ID'
            ***/
        });

        sql = sql.replace('dataItem.PROJECT_ID', dataItem.PROJECT_ID);

        return sql;
    }

    Fn_GetProjectAll() {

        sql = sqlFormat(function () {
            /***
                SELECT 
                    PROJECT_ID,
                    PROJECT_NAME
                FROM BATCH_PROJECT
                ORDER BY PROJECT_NAME
            ***/
        });

        return sql;
    }
};

module.exports = Cls_Project_SQL;


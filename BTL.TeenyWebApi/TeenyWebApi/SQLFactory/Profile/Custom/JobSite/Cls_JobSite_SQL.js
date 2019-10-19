
let sqlFormat = require('mstring');
let sql = "";

class Cls_JobSite_SQL {

    Fn_Search(dataItem) {

        let sqlList = [];

        sql = sqlFormat(function () {
            /***
                SELECT COUNT(*) AS TOTAL_COUNT 
                FROM BATCH_JOBSITE
                WHERE JOBSITE_NAME LIKE 'dataItem.JOBSITE_NAME%'
            ***/
        });

        sql = sql.replace('dataItem.JOBSITE_NAME', dataItem.JOBSITE_NAME);

        sqlList.push(sql);


        sql = sqlFormat(function () {
            /***
                SET @rank=0;
                SELECT * FROM
                (
                    SELECT
                        @rank:=@rank+1 AS RN,
                        JOBSITE_ID, 
                        JOBSITE_NAME, 
                        DESCRIPTION,
                        CREATE_USER,
                        LAST_USER,
                        DATE_FORMAT(CREATE_DATE,' %d/%m/%Y') AS CREATE_DATE,
                        DATE_FORMAT(LAST_DATE,' %d/%m/%Y') AS LAST_DATE
                    FROM BATCH_JOBSITE
                    WHERE JOBSITE_NAME LIKE 'dataItem.JOBSITE_NAME%'
                    ORDER BY JOBSITE_NAME
                ) TB
                WHERE RN > 'dataItem.Start' AND RN <= 'dataItem.Limit'  
            ***/
        });

        sql = sql.replace('dataItem.JOBSITE_NAME', dataItem.JOBSITE_NAME);
        sql = sql.replace('dataItem.Start', dataItem.Start);
        sql = sql.replace('dataItem.Limit', dataItem.Limit);

        sqlList.push(sql);

        return sqlList;
    }

    Fn_Insert(dataItem) {

        sql = sqlFormat(function () {
            /***
                INSERT INTO BATCH_JOBSITE
	            (
                    JOBSITE_ID, 
                    JOBSITE_NAME, 
                    DESCRIPTION,
	                CREATE_USER,	              
	                CREATE_DATE
	              
	            )
	            VALUES
                (
                  (SELECT IFNULL( MAX(JOBSITE_ID), 0) +1 FROM BATCH_JOBSITE MAX_ID),
                  'dataItem.JOBSITE_NAME',
	              'dataItem.DESCRIPTION',
	              'dataItem.CREATE_USER',
                  CURRENT_DATE()
	           )
            ***/
        });

        sql = sql.replace('dataItem.JOBSITE_NAME', dataItem.JOBSITE_NAME);
        sql = sql.replace('dataItem.DESCRIPTION', dataItem.DESCRIPTION);
        sql = sql.replace('dataItem.CREATE_USER', dataItem.CREATE_USER);

        return sql;
    }

    Fn_Update(dataItem) {

        sql = sqlFormat(function () {
            /***
                UPDATE BATCH_JOBSITE SET  
                
                    JOBSITE_NAME = 'dataItem.JOBSITE_NAME',
	                DESCRIPTION = 'dataItem.DESCRIPTION',

                    LAST_USER = 'dataItem.LAST_USER',
                    LAST_DATE =  CURRENT_DATE()

                WHERE JOBSITE_ID = 'dataItem.JOBSITE_ID'

            ***/
        });

        sql = sql.replace('dataItem.JOBSITE_NAME', dataItem.JOBSITE_NAME);

        sql = sql.replace('dataItem.DESCRIPTION', dataItem.DESCRIPTION);
        sql = sql.replace('dataItem.LAST_USER', dataItem.LAST_USER);

        sql = sql.replace('dataItem.JOBSITE_ID', dataItem.JOBSITE_ID);

        return sql;
    }

    Fn_Delete(dataItem) {

        sql = sqlFormat(function () {
            /***
                DELETE FROM BATCH_JOBSITE
                WHERE JOBSITE_ID = 'dataItem.JOBSITE_ID'
            ***/
        });

        sql = sql.replace('dataItem.JOBSITE_ID', dataItem.JOBSITE_ID);

        return sql;
    }

    Fn_GetJobSiteAll() {

        sql = sqlFormat(function () {
            /***
                SELECT 
                    JOBSITE_ID,
                    JOBSITE_NAME
                FROM BATCH_JOBSITE
                ORDER BY JOBSITE_NAME
            ***/
        });

        return sql;
    }
};

module.exports = Cls_JobSite_SQL;


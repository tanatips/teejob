
let sqlFormat = require('mstring');
let sql = "";

class Cls_Position_SQL {

    Fn_Search(dataItem) {

        let sqlList = [];

        sql = sqlFormat(function () {
            /***
                SELECT COUNT(*) AS TOTAL_COUNT                      
                FROM BATCH_POSITION AS P
                INNER JOIN BATCH_DEPARTMENT AS D ON D.DEPARTMENT_ID = P.DEPARTMENT_ID
                WHERE P.POSITION_NAME LIKE 'dataItem.POSITION_NAME%'
                AND D.DEPARTMENT_NAME LIKE 'dataItem.DEPARTMENT_NAME%'
            ***/
        });

        sql = sql.replace('dataItem.POSITION_NAME', dataItem.POSITION_NAME);
        sql = sql.replace('dataItem.DEPARTMENT_NAME', dataItem.DEPARTMENT_NAME);

        sqlList.push(sql);

        sql = sqlFormat(function () {
            /***
                SET @rank=0;
                SELECT * FROM
                (
                    SELECT
                        @rank:=@rank+1 AS RN,
                        P.POSITION_ID, 
                        P.POSITION_NAME,
                        D.DEPARTMENT_ID, 
                        D.DEPARTMENT_NAME, 
                        P.DESCRIPTION,
                        P.CREATE_USER,
                        P.LAST_USER,
                        DATE_FORMAT(P.CREATE_DATE,' %d/%m/%Y') AS CREATE_DATE,
                        DATE_FORMAT(P.LAST_DATE,' %d/%m/%Y') AS LAST_DATE
                    FROM BATCH_POSITION AS P
                    INNER JOIN BATCH_DEPARTMENT AS D ON D.DEPARTMENT_ID = P.DEPARTMENT_ID
                    WHERE P.POSITION_NAME LIKE 'dataItem.POSITION_NAME%'
                    AND D.DEPARTMENT_NAME LIKE 'dataItem.DEPARTMENT_NAME%'
                    ORDER BY P.POSITION_NAME,D.DEPARTMENT_NAME
                ) TB
                WHERE RN > 'dataItem.Start' AND RN <= 'dataItem.Limit'  
            ***/
        });

        sql = sql.replace('dataItem.POSITION_NAME', dataItem.POSITION_NAME);
        sql = sql.replace('dataItem.DEPARTMENT_NAME', dataItem.DEPARTMENT_NAME);
        sql = sql.replace('dataItem.Start', dataItem.Start);
        sql = sql.replace('dataItem.Limit', dataItem.Limit);

        sqlList.push(sql);

        return sqlList;
    }

    Fn_Insert(dataItem) {

        sql = sqlFormat(function () {
            /***
                INSERT INTO BATCH_POSITION
	            (
                    DEPARTMENT_ID, 
                    POSITION_ID, 
                    POSITION_NAME,
                    DESCRIPTION,
	                CREATE_USER,	              
	                CREATE_DATE
	            )
	            VALUES
                (
                  'dataItem.DEPARTMENT_ID',
                  (SELECT IFNULL( MAX(POSITION_ID), 0) +1 FROM BATCH_POSITION MAX_ID),
                  'dataItem.POSITION_NAME',
	              'dataItem.DESCRIPTION',
	              'dataItem.CREATE_USER',
                  CURRENT_DATE()
	           )
            ***/
        });

        sql = sql.replace('dataItem.DEPARTMENT_ID', dataItem.DEPARTMENT_ID);
        sql = sql.replace('dataItem.POSITION_NAME', dataItem.POSITION_NAME);
        sql = sql.replace('dataItem.DESCRIPTION', dataItem.DESCRIPTION);
        sql = sql.replace('dataItem.CREATE_USER', dataItem.CREATE_USER);

        return sql;
    }

    Fn_Update(dataItem) {

        sql = sqlFormat(function () {
            /***
                UPDATE BATCH_POSITION SET  

                    DEPARTMENT_ID = 'dataItem.DEPARTMENT_ID',
                    POSITION_NAME = 'dataItem.POSITION_NAME',
	                DESCRIPTION = 'dataItem.DESCRIPTION',
                    LAST_USER = 'dataItem.LAST_USER',
                    LAST_DATE =  CURRENT_DATE()

                WHERE POSITION_ID = 'dataItem.POSITION_ID'

            ***/
        });

        sql = sql.replace('dataItem.DEPARTMENT_ID', dataItem.DEPARTMENT_ID);
        sql = sql.replace('dataItem.POSITION_NAME', dataItem.POSITION_NAME);
        sql = sql.replace('dataItem.DESCRIPTION', dataItem.DESCRIPTION);
        sql = sql.replace('dataItem.LAST_USER', dataItem.LAST_USER);

        sql = sql.replace('dataItem.POSITION_ID', dataItem.POSITION_ID);

        return sql;
    }

    Fn_Delete(dataItem) {

        sql = sqlFormat(function () {
            /***
                DELETE FROM BATCH_POSITION
                WHERE POSITION_ID = 'dataItem.POSITION_ID'
            ***/
        });

        sql = sql.replace('dataItem.POSITION_ID', dataItem.POSITION_ID);

        return sql;
    }

    Fn_GetPositionAll() {

        sql = sqlFormat(function () {
            /***
                SELECT 
                    POSITION_ID,
                    POSITION_NAME
                FROM BATCH_POSITION
                ORDER BY POSITION_NAME
            ***/
        });

        return sql;
    }

    Fn_GetPositionByDepartment(dataItem) {

        sql = sqlFormat(function () {
            /***
                SELECT 
                    POSITION_ID,
                    POSITION_NAME
                FROM BATCH_POSITION
                WHERE DEPARTMENT_ID = 'dataItem.DEPARTMENT_ID'
                ORDER BY POSITION_NAME
            ***/
        });

        sql = sql.replace('dataItem.DEPARTMENT_ID', dataItem.DEPARTMENT_ID);

        return sql;
    }
};

module.exports = Cls_Position_SQL;


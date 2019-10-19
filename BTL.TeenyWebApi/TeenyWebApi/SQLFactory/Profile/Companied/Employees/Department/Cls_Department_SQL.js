
let sqlFormat = require('mstring');
let sql = "";

class Cls_Department_SQL {

    Fn_Search(dataItem) {

        let sqlList = [];

        sql = sqlFormat(function () {
            /***
                SELECT COUNT(*) AS TOTAL_COUNT 
                FROM BATCH_DEPARTMENT
                WHERE DEPARTMENT_NAME LIKE 'dataItem.DEPARTMENT_NAME%'
            ***/
        });

        sql = sql.replace('dataItem.DEPARTMENT_NAME', dataItem.DEPARTMENT_NAME);

        sqlList.push(sql);


        sql = sqlFormat(function () {
            /***
                SET @rank=0;
                SELECT * FROM
                (
                    SELECT
                        @rank:=@rank+1 AS RN,
                        DEPARTMENT_ID, 
                        DEPARTMENT_NAME, 
                        PHONE_NO, 
                        MOBILE_NO, 
                        FAX_NO, 
                        EXT_NO, 
                        DESCRIPTION,
                        CREATE_USER,
                        LAST_USER,
                        DATE_FORMAT(CREATE_DATE,' %d/%m/%Y') AS CREATE_DATE,
                        DATE_FORMAT(LAST_DATE,' %d/%m/%Y') AS LAST_DATE
                    FROM BATCH_DEPARTMENT
                    WHERE DEPARTMENT_NAME LIKE 'dataItem.DEPARTMENT_NAME%'
                    ORDER BY DEPARTMENT_NAME
                ) TB
                WHERE RN > 'dataItem.Start' AND RN <= 'dataItem.Limit'  
            ***/
        });

        sql = sql.replace('dataItem.DEPARTMENT_NAME', dataItem.DEPARTMENT_NAME);
        sql = sql.replace('dataItem.Start', dataItem.Start);
        sql = sql.replace('dataItem.Limit', dataItem.Limit);

        sqlList.push(sql);

        return sqlList;
    }

    Fn_Insert(dataItem) {

        sql = sqlFormat(function () {
            /***
                INSERT INTO BATCH_DEPARTMENT
	            (
                    DEPARTMENT_ID, 
                    DEPARTMENT_NAME, 
                    PHONE_NO, 
                    MOBILE_NO, 
                    FAX_NO, 
                    EXT_NO, 
                    DESCRIPTION,
	                CREATE_USER,	              
	                CREATE_DATE
	              
	            )
	            VALUES
                (
                  (SELECT IFNULL( MAX(DEPARTMENT_ID), 0) +1 FROM BATCH_DEPARTMENT MAX_ID),
                  'dataItem.DEPARTMENT_NAME',
                  'dataItem.PHONE_NO',
                  'dataItem.MOBILE_NO',
                  'dataItem.FAX_NO',
	              'dataItem.EXT_NO',
	              'dataItem.DESCRIPTION',
	              'dataItem.CREATE_USER',
                  CURRENT_DATE()
	           )
            ***/
        });

        sql = sql.replace('dataItem.DEPARTMENT_NAME', dataItem.DEPARTMENT_NAME);
        sql = sql.replace('dataItem.PHONE_NO', dataItem.PHONE_NO);
        sql = sql.replace('dataItem.MOBILE_NO', dataItem.MOBILE_NO);
        sql = sql.replace('dataItem.FAX_NO', dataItem.FAX_NO);
        sql = sql.replace('dataItem.EXT_NO', dataItem.EXT_NO);
        sql = sql.replace('dataItem.DESCRIPTION', dataItem.DESCRIPTION);
        sql = sql.replace('dataItem.CREATE_USER', dataItem.CREATE_USER);

        return sql;
    }

    Fn_Update(dataItem) {

        sql = sqlFormat(function () {
            /***
                UPDATE BATCH_DEPARTMENT SET  
                
                    DEPARTMENT_NAME = 'dataItem.DEPARTMENT_NAME',
                    PHONE_NO = 'dataItem.PHONE_NO',
                    MOBILE_NO = 'dataItem.MOBILE_NO',
                    FAX_NO = 'dataItem.FAX_NO',
	                EXT_NO = 'dataItem.EXT_NO',
	                DESCRIPTION = 'dataItem.DESCRIPTION',

                    LAST_USER = 'dataItem.LAST_USER',
                    LAST_DATE =  CURRENT_DATE()

                WHERE DEPARTMENT_ID = 'dataItem.DEPARTMENT_ID'

            ***/
        });

        sql = sql.replace('dataItem.DEPARTMENT_NAME', dataItem.DEPARTMENT_NAME);
        sql = sql.replace('dataItem.PHONE_NO', dataItem.PHONE_NO);
        sql = sql.replace('dataItem.MOBILE_NO', dataItem.MOBILE_NO);
        sql = sql.replace('dataItem.FAX_NO', dataItem.FAX_NO);
        sql = sql.replace('dataItem.EXT_NO', dataItem.EXT_NO);
        sql = sql.replace('dataItem.DESCRIPTION', dataItem.DESCRIPTION);
        sql = sql.replace('dataItem.LAST_USER', dataItem.LAST_USER);

        sql = sql.replace('dataItem.DEPARTMENT_ID', dataItem.DEPARTMENT_ID);

        return sql;
    }

    Fn_Delete(dataItem) {

        sql = sqlFormat(function () {
            /***
                DELETE FROM BATCH_DEPARTMENT
                WHERE DEPARTMENT_ID = 'dataItem.DEPARTMENT_ID'
            ***/
        });

        sql = sql.replace('dataItem.DEPARTMENT_ID', dataItem.DEPARTMENT_ID);

        return sql;
    }

    Fn_GetDepartmentAll() {

        sql = sqlFormat(function () {
            /***
                SELECT 
                    DEPARTMENT_ID,
                    DEPARTMENT_NAME
                FROM BATCH_DEPARTMENT
                ORDER BY DEPARTMENT_NAME
            ***/
        });

        return sql;
    }
};

module.exports = Cls_Department_SQL;


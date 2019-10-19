
let sqlFormat = require('mstring');
let sql = "";

class Cls_Company_SQL {

    Fn_Search(dataItem) {

        let sqlList = [];

        sql = sqlFormat(function () {
            /***
                SELECT COUNT(*) AS TOTAL_COUNT 
                FROM BATCH_COMPANY
                WHERE COMPANY_NAME LIKE 'dataItem.COMPANY_NAME%'
                AND SHORT_NAME LIKE 'dataItem.SHORT_NAME%'
            ***/
        });

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
                        COMPANY_ID,
                        COMPANY_NAME,
                        SHORT_NAME,
                        ADDRESS,
                        PHONE_NO,
                        MOBILE_NO,
                        FAX_NO,
                        DESCRIPTION,
                        CREATE_USER,
                        LAST_USER,
                        DATE_FORMAT(CREATE_DATE,' %d/%m/%Y') AS CREATE_DATE,
                        DATE_FORMAT(LAST_DATE,' %d/%m/%Y') AS LAST_DATE
                    FROM BATCH_COMPANY
                    WHERE COMPANY_NAME LIKE 'dataItem.COMPANY_NAME%'
                    AND SHORT_NAME LIKE 'dataItem.SHORT_NAME%'
                    ORDER BY COMPANY_NAME,SHORT_NAME
                ) TB
                WHERE RN > 'dataItem.Start' AND RN <= 'dataItem.Limit'  
            ***/
        });

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
                INSERT INTO BATCH_COMPANY
	            (
                    COMPANY_ID,
                    COMPANY_NAME,
                    SHORT_NAME,
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
                  (SELECT IFNULL( MAX(COMPANY_ID), 0) +1 FROM BATCH_COMPANY MAX_ID),
                  'dataItem.COMPANY_NAME',
                  'dataItem.SHORT_NAME',
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

        sql = sql.replace('dataItem.COMPANY_NAME', dataItem.COMPANY_NAME);
        sql = sql.replace('dataItem.SHORT_NAME', dataItem.SHORT_NAME);
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
                UPDATE BATCH_COMPANY SET  
                
                    COMPANY_NAME = 'dataItem.COMPANY_NAME',
                    SHORT_NAME = 'dataItem.SHORT_NAME',
                    ADDRESS = 'dataItem.ADDRESS',
                    PHONE_NO = 'dataItem.PHONE_NO',
	                MOBILE_NO = 'dataItem.MOBILE_NO',
	                FAX_NO = 'dataItem.FAX_NO',
	                DESCRIPTION = 'dataItem.DESCRIPTION',

                    LAST_USER = 'dataItem.LAST_USER',
                    LAST_DATE =  CURRENT_DATE()

                WHERE COMPANY_ID = 'dataItem.COMPANY_ID'

            ***/
        });

        sql = sql.replace('dataItem.COMPANY_NAME', dataItem.COMPANY_NAME);
        sql = sql.replace('dataItem.SHORT_NAME', dataItem.SHORT_NAME);
        sql = sql.replace('dataItem.ADDRESS', dataItem.ADDRESS);
        sql = sql.replace('dataItem.PHONE_NO', dataItem.PHONE_NO);
        sql = sql.replace('dataItem.MOBILE_NO', dataItem.MOBILE_NO);
        sql = sql.replace('dataItem.FAX_NO', dataItem.FAX_NO);
        sql = sql.replace('dataItem.DESCRIPTION', dataItem.DESCRIPTION);
        sql = sql.replace('dataItem.LAST_USER', dataItem.LAST_USER);

        sql = sql.replace('dataItem.COMPANY_ID', dataItem.COMPANY_ID);

        return sql;
    }

    Fn_Delete(dataItem) {

        sql = sqlFormat(function () {
            /***
                DELETE FROM BATCH_COMPANY
                WHERE COMPANY_ID = 'dataItem.COMPANY_ID'
            ***/
        });

        sql = sql.replace('dataItem.COMPANY_ID', dataItem.COMPANY_ID);

        return sql;
    }

    Fn_GetCompanyAll() {

        sql = sqlFormat(function () {
            /***
                SELECT 
                    COMPANY_ID,
                    COMPANY_NAME,
                    SHORT_NAME
                FROM BATCH_COMPANY
                ORDER BY COMPANY_NAME,SHORT_NAME
            ***/
        });

        return sql;
    }
};

module.exports = Cls_Company_SQL;


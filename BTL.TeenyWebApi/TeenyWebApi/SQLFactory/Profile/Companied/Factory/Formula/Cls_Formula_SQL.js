
let sqlFormat = require('mstring');
let sql = "";

class Cls_Formula_SQL {

    Fn_Search(dataItem) {

        let sqlList = [];

        sql = sqlFormat(function () {
            /***
                SELECT COUNT(*) AS TOTAL_COUNT 
                FROM BATCH_FORMULA
                WHERE FORMULA_NAME LIKE 'dataItem.FORMULA_NAME%'
            ***/
        });

        sql = sql.replace('dataItem.FORMULA_NAME', dataItem.FORMULA_NAME);

        sqlList.push(sql);


        sql = sqlFormat(function () {
            /***
                SET @rank=0;
                SELECT * FROM
                (
                    SELECT
                        @rank:=@rank+1 AS RN,
                        FORMULA_ID, 
                        FORMULA_NAME, 
                        REVISION,
                        DESCRIPTION,
                        CREATE_USER,
                        LAST_USER,
                        DATE_FORMAT(CREATE_DATE,' %d/%m/%Y') AS CREATE_DATE,
                        DATE_FORMAT(LAST_DATE,' %d/%m/%Y') AS LAST_DATE
                    FROM BATCH_FORMULA
                    WHERE FORMULA_NAME LIKE 'dataItem.FORMULA_NAME%'
                    ORDER BY FORMULA_NAME, REVISION
                ) TB
                WHERE RN > 'dataItem.Start' AND RN <= 'dataItem.Limit'  
            ***/
        });

        sql = sql.replace('dataItem.FORMULA_NAME', dataItem.FORMULA_NAME);

        sql = sql.replace('dataItem.Start', dataItem.Start);
        sql = sql.replace('dataItem.Limit', dataItem.Limit);

        sqlList.push(sql);

        return sqlList;
    }

    Fn_Insert(dataItem) {

        sql = sqlFormat(function () {
            /***
                INSERT INTO BATCH_FORMULA
	            (
                    FORMULA_ID, 
                    FORMULA_NAME, 
                    REVISION,
                    DESCRIPTION,
	                CREATE_USER,	              
	                CREATE_DATE
	              
	            )
	            VALUES
                (
                  (SELECT IFNULL( MAX(FORMULA_ID), 0) +1 FROM BATCH_FORMULA MAX_ID),
                  'dataItem.FORMULA_NAME',
                  'dataItem.REVISION',
	              'dataItem.DESCRIPTION',
	              'dataItem.CREATE_USER',
                  CURRENT_DATE()
	           )
            ***/
        });

        sql = sql.replace('dataItem.FORMULA_NAME', dataItem.FORMULA_NAME);
        sql = sql.replace('dataItem.REVISION', dataItem.REVISION);
        sql = sql.replace('dataItem.DESCRIPTION', dataItem.DESCRIPTION);
        sql = sql.replace('dataItem.CREATE_USER', dataItem.CREATE_USER);

        return sql;
    }

    Fn_Update(dataItem) {

        sql = sqlFormat(function () {
            /***
                UPDATE BATCH_FORMULA SET  
                
                    FORMULA_NAME = 'dataItem.FORMULA_NAME',
                    REVISION = 'dataItem.REVISION',

	                DESCRIPTION = 'dataItem.DESCRIPTION',

                    LAST_USER = 'dataItem.LAST_USER',
                    LAST_DATE =  CURRENT_DATE()

                WHERE FORMULA_ID = 'dataItem.FORMULA_ID'

            ***/
        });

        sql = sql.replace('dataItem.FORMULA_NAME', dataItem.FORMULA_NAME);
        sql = sql.replace('dataItem.REVISION', dataItem.REVISION);

        sql = sql.replace('dataItem.DESCRIPTION', dataItem.DESCRIPTION);
        sql = sql.replace('dataItem.LAST_USER', dataItem.LAST_USER);

        sql = sql.replace('dataItem.FORMULA_ID', dataItem.FORMULA_ID);

        return sql;
    }

    Fn_Delete(dataItem) {

        sql = sqlFormat(function () {
            /***
                DELETE FROM BATCH_FORMULA
                WHERE FORMULA_ID = 'dataItem.FORMULA_ID'
            ***/
        });

        sql = sql.replace('dataItem.FORMULA_ID', dataItem.FORMULA_ID);

        return sql;
    }

    Fn_GetFormulaAll() {

        sql = sqlFormat(function () {
            /***
                SELECT 
                    FORMULA_ID,
                    FORMULA_NAME
                FROM BATCH_FORMULA
                ORDER BY FORMULA_NAME
            ***/
        });

        return sql;
    }
};

module.exports = Cls_Formula_SQL;



let sqlFormat = require('mstring');
let sql = "";

class Cls_ProductSpec_SQL {

    Fn_Search(dataItem) {

        let sqlList = [];

        sql = sqlFormat(function () {
            /***
                SELECT COUNT(*) AS TOTAL_COUNT                      
                FROM BATCH_PRODUCT_SPEC AS PS
                INNER JOIN BATCH_PRODUCT AS P ON P.PRODUCT_ID = PS.PRODUCT_ID
                INNER JOIN BATCH_PRODUCT_GROUP AS PG ON PG.PRODUCT_GROUP_ID = P.PRODUCT_GROUP_ID
                INNER JOIN BATCH_FORMULA AS F ON F.FORMULA_ID = PS.FORMULA_ID
                WHERE PS.PRODUCT_SPEC_NAME LIKE 'dataItem.PRODUCT_SPEC_NAME%'
                AND PS.PRODUCT_CODE LIKE 'dataItem.PRODUCT_CODE%'
                AND PS.REVISION LIKE 'dataItem.REVISION%'

            ***/
        });

        sql = sql.replace('dataItem.PRODUCT_SPEC_NAME', dataItem.PRODUCT_SPEC_NAME);
        sql = sql.replace('dataItem.PRODUCT_CODE', dataItem.PRODUCT_CODE);
        sql = sql.replace('dataItem.REVISION', dataItem.REVISION);

        sqlList.push(sql);

        sql = sqlFormat(function () {
            /***
                SET @rank=0;
                SELECT * FROM
                (
                    SELECT
                        @rank:=@rank+1 AS RN,
                        PS.PRODUCT_SPEC_ID,
                        PS.PRODUCT_SPEC_NAME,
                        PS.PRODUCT_CODE,
                        PS.PRICE_PER_UNIT, 
                        PS.CUBE, 
                        PS.CYLINDER, 
                        PS.SLUMP, 
                        PS.REVISION,
                        P.PRODUCT_ID, 
                        P.PRODUCT_NAME,
                        PG.PRODUCT_GROUP_ID, 
                        PG.PRODUCT_GROUP_NAME, 
                        F.FORMULA_ID,
                        F.FORMULA_NAME,
                        PS.DESCRIPTION,
                        PS.CREATE_USER,
                        PS.LAST_USER,
                        DATE_FORMAT(PS.CREATE_DATE,' %d/%m/%Y') AS CREATE_DATE,
                        DATE_FORMAT(PS.LAST_DATE,' %d/%m/%Y') AS LAST_DATE
                    FROM BATCH_PRODUCT_SPEC AS PS
                    INNER JOIN BATCH_PRODUCT AS P ON P.PRODUCT_ID = PS.PRODUCT_ID
                    INNER JOIN BATCH_PRODUCT_GROUP AS PG ON PG.PRODUCT_GROUP_ID = P.PRODUCT_GROUP_ID
                    INNER JOIN BATCH_FORMULA AS F ON F.FORMULA_ID = PS.FORMULA_ID
                    WHERE PS.PRODUCT_SPEC_NAME LIKE 'dataItem.PRODUCT_SPEC_NAME%'
                    AND PS.PRODUCT_CODE LIKE 'dataItem.PRODUCT_CODE%'
                    AND PS.REVISION LIKE 'dataItem.REVISION%'
                    ORDER BY 
                        PS.PRODUCT_SPEC_NAME,
                        PS.PRODUCT_CODE,
                        PS.REVISION,
                        P.PRODUCT_NAME,
                        PG.PRODUCT_GROUP_NAME,
                        F.FORMULA_NAME
                ) TB
                WHERE RN > 'dataItem.Start' AND RN <= 'dataItem.Limit'  
            ***/
        });

        sql = sql.replace('dataItem.PRODUCT_SPEC_NAME', dataItem.PRODUCT_SPEC_NAME);
        sql = sql.replace('dataItem.PRODUCT_CODE', dataItem.PRODUCT_CODE);
        sql = sql.replace('dataItem.REVISION', dataItem.REVISION);

        sql = sql.replace('dataItem.Start', dataItem.Start);
        sql = sql.replace('dataItem.Limit', dataItem.Limit);

        sqlList.push(sql);

        return sqlList;
    }

    Fn_Insert(dataItem) {

        sql = sqlFormat(function () {
            /***
                INSERT INTO BATCH_PRODUCT_SPEC
	            (
                    PRODUCT_ID, 
                    FORMULA_ID, 
                    PRODUCT_SPEC_ID, 
                    PRODUCT_CODE, 
                    PRODUCT_SPEC_NAME,
                    PRICE_PER_UNIT, 
                    CUBE, 
                    CYLINDER, 
                    SLUMP, 
                    REVISION,
                    DESCRIPTION,
	                CREATE_USER,	              
	                CREATE_DATE
	            )
	            VALUES
                (
                  'dataItem.PRODUCT_ID',
                  'dataItem.FORMULA_ID',
                  (SELECT IFNULL( MAX(PRODUCT_SPEC_ID), 0) +1 FROM BATCH_PRODUCT_SPEC MAX_ID),
                  'dataItem.PRODUCT_CODE',
                  'dataItem.PRODUCT_SPEC_NAME',
                  'dataItem.PRICE_PER_UNIT',
                  'dataItem.CUBE',
                  'dataItem.CYLINDER',
                  'dataItem.SLUMP',
                  'dataItem.REVISION',
	              'dataItem.DESCRIPTION',
	              'dataItem.CREATE_USER',
                  CURRENT_DATE()
	           )
            ***/
        });

        sql = sql.replace('dataItem.PRODUCT_ID', dataItem.PRODUCT_ID);
        sql = sql.replace('dataItem.FORMULA_ID', dataItem.FORMULA_ID);
        sql = sql.replace('dataItem.PRODUCT_CODE', dataItem.PRODUCT_CODE);
        sql = sql.replace('dataItem.PRODUCT_SPEC_NAME', dataItem.PRODUCT_SPEC_NAME);
        sql = sql.replace('dataItem.PRICE_PER_UNIT', dataItem.PRICE_PER_UNIT);
        sql = sql.replace('dataItem.CUBE', dataItem.CUBE);
        sql = sql.replace('dataItem.CYLINDER', dataItem.CYLINDER);
        sql = sql.replace('dataItem.SLUMP', dataItem.SLUMP);
        sql = sql.replace('dataItem.REVISION', dataItem.REVISION);

        sql = sql.replace('dataItem.DESCRIPTION', dataItem.DESCRIPTION);
        sql = sql.replace('dataItem.CREATE_USER', dataItem.CREATE_USER);

        return sql;
    }

    Fn_Update(dataItem) {

        sql = sqlFormat(function () {
            /***
                UPDATE BATCH_PRODUCT_SPEC SET  

                    PRODUCT_ID = 'dataItem.PRODUCT_ID',
                    FORMULA_ID = 'dataItem.FORMULA_ID',
                    PRODUCT_CODE = 'dataItem.PRODUCT_CODE',
                    PRODUCT_SPEC_NAME = 'dataItem.PRODUCT_SPEC_NAME',
                    PRICE_PER_UNIT = 'dataItem.PRICE_PER_UNIT',
                    CUBE = 'dataItem.CUBE',
                    CYLINDER = 'dataItem.CYLINDER',
                    SLUMP = 'dataItem.SLUMP',
                    REVISION = 'dataItem.REVISION',

	                DESCRIPTION = 'dataItem.DESCRIPTION',
                    LAST_USER = 'dataItem.LAST_USER',
                    LAST_DATE =  CURRENT_DATE()

                WHERE PRODUCT_SPEC_ID = 'dataItem.PRODUCT_SPEC_ID'

            ***/
        });

        sql = sql.replace('dataItem.PRODUCT_ID', dataItem.PRODUCT_ID);
        sql = sql.replace('dataItem.FORMULA_ID', dataItem.FORMULA_ID);
        sql = sql.replace('dataItem.PRODUCT_CODE', dataItem.PRODUCT_CODE);
        sql = sql.replace('dataItem.PRODUCT_SPEC_NAME', dataItem.PRODUCT_SPEC_NAME);
        sql = sql.replace('dataItem.PRICE_PER_UNIT', dataItem.PRICE_PER_UNIT);
        sql = sql.replace('dataItem.CUBE', dataItem.CUBE);
        sql = sql.replace('dataItem.CYLINDER', dataItem.CYLINDER);
        sql = sql.replace('dataItem.SLUMP', dataItem.SLUMP);
        sql = sql.replace('dataItem.REVISION', dataItem.REVISION);

        sql = sql.replace('dataItem.DESCRIPTION', dataItem.DESCRIPTION);
        sql = sql.replace('dataItem.LAST_USER', dataItem.LAST_USER);

        sql = sql.replace('dataItem.PRODUCT_SPEC_ID', dataItem.PRODUCT_SPEC_ID);

        return sql;
    }

    Fn_Delete(dataItem) {

        sql = sqlFormat(function () {
            /***
                DELETE FROM BATCH_PRODUCT_SPEC
                WHERE PRODUCT_SPEC_ID = 'dataItem.PRODUCT_SPEC_ID'
            ***/
        });

        sql = sql.replace('dataItem.PRODUCT_SPEC_ID', dataItem.PRODUCT_SPEC_ID);

        return sql;
    }
  

    Fn_GetProductCodeByProduct(dataItem) {

        sql = sqlFormat(function () {
            /***
               SELECT                     
                    PRODUCT_SPEC_NAME,
                    PRODUCT_CODE
                FROM BATCH_PRODUCT_SPEC
                WHERE PRODUCT_ID = 'dataItem.PRODUCT_ID'
                GROUP BY PRODUCT_SPEC_NAME,
                         PRODUCT_CODE
                ORDER BY PRODUCT_CODE
            ***/
        });

        sql = sql.replace('dataItem.PRODUCT_ID', dataItem.PRODUCT_ID);

        return sql;
    }

  Fn_GetRevisionByProductCode(dataItem) {

        sql = sqlFormat(function () {
            /***
                SELECT 
                    PRODUCT_SPEC_ID,
                    REVISION
                FROM BATCH_PRODUCT_SPEC
                WHERE PRODUCT_CODE = 'dataItem.PRODUCT_CODE'
                ORDER BY REVISION
            ***/
        });
  
        sql = sql.replace('dataItem.PRODUCT_CODE', dataItem.PRODUCT_CODE);

        return sql;
    }

};

module.exports = Cls_ProductSpec_SQL;


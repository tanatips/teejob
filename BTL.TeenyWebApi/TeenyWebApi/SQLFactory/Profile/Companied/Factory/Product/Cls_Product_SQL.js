
let sqlFormat = require('mstring');
let sql = "";

class Cls_Productn_SQL {

    Fn_Search(dataItem) {

        let sqlList = [];

        sql = sqlFormat(function () {
            /***
                SELECT COUNT(*) AS TOTAL_COUNT                      
                FROM BATCH_PRODUCT AS P
                INNER JOIN BATCH_PRODUCT_GROUP AS PG ON PG.PRODUCT_GROUP_ID = P.PRODUCT_GROUP_ID
                WHERE P.PRODUCT_NAME LIKE 'dataItem.PRODUCT_NAME%'
                AND PG.PRODUCT_GROUP_NAME LIKE 'dataItem.PRODUCT_GROUP_NAME%'
            ***/
        });

        sql = sql.replace('dataItem.PRODUCT_NAME', dataItem.PRODUCT_NAME);
        sql = sql.replace('dataItem.PRODUCT_GROUP_NAME', dataItem.PRODUCT_GROUP_NAME);

        sqlList.push(sql);

        sql = sqlFormat(function () {
            /***
                SET @rank=0;
                SELECT * FROM
                (
                    SELECT
                        @rank:=@rank+1 AS RN,
                        P.PRODUCT_ID, 
                        P.PRODUCT_NAME,
                        PG.PRODUCT_GROUP_ID, 
                        PG.PRODUCT_GROUP_NAME, 
                        P.DESCRIPTION,
                        P.CREATE_USER,
                        P.LAST_USER,
                        DATE_FORMAT(P.CREATE_DATE,' %d/%m/%Y') AS CREATE_DATE,
                        DATE_FORMAT(P.LAST_DATE,' %d/%m/%Y') AS LAST_DATE
                    FROM BATCH_PRODUCT AS P
                    INNER JOIN BATCH_PRODUCT_GROUP AS PG ON PG.PRODUCT_GROUP_ID = P.PRODUCT_GROUP_ID
                    WHERE P.PRODUCT_NAME LIKE 'dataItem.PRODUCT_NAME%'
                    AND PG.PRODUCT_GROUP_NAME LIKE 'dataItem.PRODUCT_GROUP_NAME%'
                    ORDER BY P.PRODUCT_NAME,PG.PRODUCT_GROUP_NAME
                ) TB
                WHERE RN > 'dataItem.Start' AND RN <= 'dataItem.Limit'  
            ***/
        });

        sql = sql.replace('dataItem.PRODUCT_NAME', dataItem.PRODUCT_NAME);
        sql = sql.replace('dataItem.PRODUCT_GROUP_NAME', dataItem.PRODUCT_GROUP_NAME);
        sql = sql.replace('dataItem.Start', dataItem.Start);
        sql = sql.replace('dataItem.Limit', dataItem.Limit);

        sqlList.push(sql);

        return sqlList;
    }

    Fn_Insert(dataItem) {

        sql = sqlFormat(function () {
            /***
                INSERT INTO BATCH_PRODUCT
	            (
                    PRODUCT_GROUP_ID, 
                    PRODUCT_ID, 
                    PRODUCT_NAME,
                    DESCRIPTION,
	                CREATE_USER,	              
	                CREATE_DATE
	            )
	            VALUES
                (
                  'dataItem.PRODUCT_GROUP_ID',
                  (SELECT IFNULL( MAX(PRODUCT_ID), 0) +1 FROM BATCH_PRODUCT MAX_ID),
                  'dataItem.PRODUCT_NAME',
	              'dataItem.DESCRIPTION',
	              'dataItem.CREATE_USER',
                  CURRENT_DATE()
	           )
            ***/
        });

        sql = sql.replace('dataItem.PRODUCT_GROUP_ID', dataItem.PRODUCT_GROUP_ID);
        sql = sql.replace('dataItem.PRODUCT_NAME', dataItem.PRODUCT_NAME);
        sql = sql.replace('dataItem.DESCRIPTION', dataItem.DESCRIPTION);
        sql = sql.replace('dataItem.CREATE_USER', dataItem.CREATE_USER);

        return sql;
    }

    Fn_Update(dataItem) {

        sql = sqlFormat(function () {
            /***
                UPDATE BATCH_PRODUCT SET  

                    PRODUCT_GROUP_ID = 'dataItem.PRODUCT_GROUP_ID',
                    PRODUCT_NAME = 'dataItem.PRODUCT_NAME',
	                DESCRIPTION = 'dataItem.DESCRIPTION',
                    LAST_USER = 'dataItem.LAST_USER',
                    LAST_DATE =  CURRENT_DATE()

                WHERE PRODUCT_ID = 'dataItem.PRODUCT_ID'

            ***/
        });

        sql = sql.replace('dataItem.PRODUCT_GROUP_ID', dataItem.PRODUCT_GROUP_ID);
        sql = sql.replace('dataItem.PRODUCT_NAME', dataItem.PRODUCT_NAME);
        sql = sql.replace('dataItem.DESCRIPTION', dataItem.DESCRIPTION);
        sql = sql.replace('dataItem.LAST_USER', dataItem.LAST_USER);

        sql = sql.replace('dataItem.PRODUCT_ID', dataItem.PRODUCT_ID);

        return sql;
    }

    Fn_Delete(dataItem) {

        sql = sqlFormat(function () {
            /***
                DELETE FROM BATCH_PRODUCT
                WHERE PRODUCT_ID = 'dataItem.PRODUCT_ID'
            ***/
        });

        sql = sql.replace('dataItem.PRODUCT_ID', dataItem.PRODUCT_ID);

        return sql;
    }

    Fn_GetProductnAll() {

        sql = sqlFormat(function () {
            /***
                SELECT 
                    PRODUCT_ID,
                    PRODUCT_NAME
                FROM BATCH_PRODUCT
                ORDER BY PRODUCT_NAME
            ***/
        });

        return sql;
    }

    Fn_GetProductnByProductGroup(dataItem) {

        sql = sqlFormat(function () {
            /***
                SELECT 
                    PRODUCT_ID,
                    PRODUCT_NAME
                FROM BATCH_PRODUCT
                WHERE PRODUCT_GROUP_ID = 'dataItem.PRODUCT_GROUP_ID'
                ORDER BY PRODUCT_NAME
            ***/
        });

        sql = sql.replace('dataItem.PRODUCT_GROUP_ID', dataItem.PRODUCT_GROUP_ID);

        return sql;
    }
};

module.exports = Cls_Productn_SQL;


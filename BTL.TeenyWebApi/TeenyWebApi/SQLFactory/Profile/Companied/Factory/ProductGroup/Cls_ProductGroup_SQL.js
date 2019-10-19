
let sqlFormat = require('mstring');
let sql = "";

class Cls_ProductGroup_SQL {

    Fn_Search(dataItem) {

        let sqlList = [];

        sql = sqlFormat(function () {
            /***
                SELECT COUNT(*) AS TOTAL_COUNT 
                FROM BATCH_PRODUCT_GROUP
                WHERE PRODUCT_GROUP_NAME LIKE 'dataItem.PRODUCT_GROUP_NAME%'
            ***/
        });

        sql = sql.replace('dataItem.PRODUCT_GROUP_NAME', dataItem.PRODUCT_GROUP_NAME);

        sqlList.push(sql);


        sql = sqlFormat(function () {
            /***
                SET @rank=0;
                SELECT * FROM
                (
                    SELECT
                        @rank:=@rank+1 AS RN,
                        PRODUCT_GROUP_ID, 
                        PRODUCT_GROUP_NAME, 
                        DESCRIPTION,
                        CREATE_USER,
                        LAST_USER,
                        DATE_FORMAT(CREATE_DATE,' %d/%m/%Y') AS CREATE_DATE,
                        DATE_FORMAT(LAST_DATE,' %d/%m/%Y') AS LAST_DATE
                    FROM BATCH_PRODUCT_GROUP
                    WHERE PRODUCT_GROUP_NAME LIKE 'dataItem.PRODUCT_GROUP_NAME%'
                    ORDER BY PRODUCT_GROUP_NAME
                ) TB
                WHERE RN > 'dataItem.Start' AND RN <= 'dataItem.Limit'  
            ***/
        });

        sql = sql.replace('dataItem.PRODUCT_GROUP_NAME', dataItem.PRODUCT_GROUP_NAME);

        sql = sql.replace('dataItem.Start', dataItem.Start);
        sql = sql.replace('dataItem.Limit', dataItem.Limit);

        sqlList.push(sql);

        return sqlList;
    }

    Fn_Insert(dataItem) {

        sql = sqlFormat(function () {
            /***
                INSERT INTO BATCH_PRODUCT_GROUP
	            (
                    PRODUCT_GROUP_ID, 
                    PRODUCT_GROUP_NAME, 
                    DESCRIPTION,
	                CREATE_USER,	              
	                CREATE_DATE
	              
	            )
	            VALUES
                (
                  (SELECT IFNULL( MAX(PRODUCT_GROUP_ID), 0) +1 FROM BATCH_PRODUCT_GROUP MAX_ID),
                  'dataItem.PRODUCT_GROUP_NAME',
	              'dataItem.DESCRIPTION',
	              'dataItem.CREATE_USER',
                  CURRENT_DATE()
	           )
            ***/
        });

        sql = sql.replace('dataItem.PRODUCT_GROUP_NAME', dataItem.PRODUCT_GROUP_NAME);

        sql = sql.replace('dataItem.DESCRIPTION', dataItem.DESCRIPTION);
        sql = sql.replace('dataItem.CREATE_USER', dataItem.CREATE_USER);

        return sql;
    }

    Fn_Update(dataItem) {

        sql = sqlFormat(function () {
            /***
                UPDATE BATCH_PRODUCT_GROUP SET  
                
                    PRODUCT_GROUP_NAME = 'dataItem.PRODUCT_GROUP_NAME',

	                DESCRIPTION = 'dataItem.DESCRIPTION',

                    LAST_USER = 'dataItem.LAST_USER',
                    LAST_DATE =  CURRENT_DATE()

                WHERE PRODUCT_GROUP_ID = 'dataItem.PRODUCT_GROUP_ID'

            ***/
        });

        sql = sql.replace('dataItem.PRODUCT_GROUP_NAME', dataItem.PRODUCT_GROUP_NAME);

        sql = sql.replace('dataItem.DESCRIPTION', dataItem.DESCRIPTION);
        sql = sql.replace('dataItem.LAST_USER', dataItem.LAST_USER);

        sql = sql.replace('dataItem.PRODUCT_GROUP_ID', dataItem.PRODUCT_GROUP_ID);

        return sql;
    }

    Fn_Delete(dataItem) {

        sql = sqlFormat(function () {
            /***
                DELETE FROM BATCH_PRODUCT_GROUP
                WHERE PRODUCT_GROUP_ID = 'dataItem.PRODUCT_GROUP_ID'
            ***/
        });

        sql = sql.replace('dataItem.PRODUCT_GROUP_ID', dataItem.PRODUCT_GROUP_ID);

        return sql;
    }

    Fn_GetProductGroupAll() {

        sql = sqlFormat(function () {
            /***
                SELECT 
                    PRODUCT_GROUP_ID,
                    PRODUCT_GROUP_NAME
                FROM BATCH_PRODUCT_GROUP
                ORDER BY PRODUCT_GROUP_NAME
            ***/
        });

        return sql;
    }
};

module.exports = Cls_ProductGroup_SQL;



let sqlFormat = require('mstring');
let sql = "";

class Cls_CustomerType_SQL {

    Fn_Search(dataItem) {

        let sqlList = [];

        sql = sqlFormat(function () {
            /***
                SELECT COUNT(*) AS TOTAL_COUNT 
                FROM BATCH_CUSTOMER_TYPE
                WHERE CUSTOMER_TYPE_NAME LIKE 'dataItem.CUSTOMER_TYPE_NAME%'
            ***/
        });

        sql = sql.replace('dataItem.CUSTOMER_TYPE_NAME', dataItem.CUSTOMER_TYPE_NAME);

        sqlList.push(sql);


        sql = sqlFormat(function () {
            /***
                SET @rank=0;
                SELECT * FROM
                (
                    SELECT
                        @rank:=@rank+1 AS RN,
                        CUSTOMER_TYPE_ID, 
                        CUSTOMER_TYPE_NAME, 
                        DESCRIPTION,
                        CREATE_USER,
                        LAST_USER,
                        DATE_FORMAT(CREATE_DATE,' %d/%m/%Y') AS CREATE_DATE,
                        DATE_FORMAT(LAST_DATE,' %d/%m/%Y') AS LAST_DATE
                    FROM BATCH_CUSTOMER_TYPE
                    WHERE CUSTOMER_TYPE_NAME LIKE 'dataItem.CUSTOMER_TYPE_NAME%'
                    ORDER BY CUSTOMER_TYPE_NAME
                ) TB
                WHERE RN > 'dataItem.Start' AND RN <= 'dataItem.Limit'  
            ***/
        });

        sql = sql.replace('dataItem.CUSTOMER_TYPE_NAME', dataItem.CUSTOMER_TYPE_NAME);

        sql = sql.replace('dataItem.Start', dataItem.Start);
        sql = sql.replace('dataItem.Limit', dataItem.Limit);

        sqlList.push(sql);

        return sqlList;
    }

    Fn_Insert(dataItem) {

        sql = sqlFormat(function () {
            /***
                INSERT INTO BATCH_CUSTOMER_TYPE
	            (
                    CUSTOMER_TYPE_ID, 
                    CUSTOMER_TYPE_NAME, 
                    DESCRIPTION,
	                CREATE_USER,	              
	                CREATE_DATE
	              
	            )
	            VALUES
                (
                  (SELECT IFNULL( MAX(CUSTOMER_TYPE_ID), 0) +1 FROM BATCH_CUSTOMER_TYPE MAX_ID),
                  'dataItem.CUSTOMER_TYPE_NAME',
	              'dataItem.DESCRIPTION',
	              'dataItem.CREATE_USER',
                  CURRENT_DATE()
	           )
            ***/
        });

        sql = sql.replace('dataItem.CUSTOMER_TYPE_NAME', dataItem.CUSTOMER_TYPE_NAME);

        sql = sql.replace('dataItem.DESCRIPTION', dataItem.DESCRIPTION);
        sql = sql.replace('dataItem.CREATE_USER', dataItem.CREATE_USER);

        return sql;
    }

    Fn_Update(dataItem) {

        sql = sqlFormat(function () {
            /***
                UPDATE BATCH_CUSTOMER_TYPE SET  
                
                    CUSTOMER_TYPE_NAME = 'dataItem.CUSTOMER_TYPE_NAME',
                    
	                DESCRIPTION = 'dataItem.DESCRIPTION',

                    LAST_USER = 'dataItem.LAST_USER',
                    LAST_DATE =  CURRENT_DATE()

                WHERE CUSTOMER_TYPE_ID = 'dataItem.CUSTOMER_TYPE_ID'

            ***/
        });

        sql = sql.replace('dataItem.CUSTOMER_TYPE_NAME', dataItem.CUSTOMER_TYPE_NAME);

        sql = sql.replace('dataItem.DESCRIPTION', dataItem.DESCRIPTION);
        sql = sql.replace('dataItem.LAST_USER', dataItem.LAST_USER);

        sql = sql.replace('dataItem.CUSTOMER_TYPE_ID', dataItem.CUSTOMER_TYPE_ID);

        return sql;
    }

    Fn_Delete(dataItem) {

        sql = sqlFormat(function () {
            /***
                DELETE FROM BATCH_CUSTOMER_TYPE
                WHERE CUSTOMER_TYPE_ID = 'dataItem.CUSTOMER_TYPE_ID'
            ***/
        });

        sql = sql.replace('dataItem.CUSTOMER_TYPE_ID', dataItem.CUSTOMER_TYPE_ID);

        return sql;
    }

    Fn_GetCustomerTypeAll() {

        sql = sqlFormat(function () {
            /***
                 SELECT CUSTOMER_TYPE_ID,
                        CUSTOMER_TYPE_NAME
                 FROM BATCH_CUSTOMER_TYPE
                 ORDER BY CUSTOMER_TYPE_NAME
            ***/
        });

        return sql;
    }
};

module.exports = Cls_CustomerType_SQL;

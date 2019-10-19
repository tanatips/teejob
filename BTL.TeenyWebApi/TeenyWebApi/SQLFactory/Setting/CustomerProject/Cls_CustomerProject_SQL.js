
let sqlFormat = require('mstring');
let sql = "";

class Cls_CustomerProject_SQL {

    Fn_Insert(dataItem) {

        sql = sqlFormat(function () {
            /***
                INSERT INTO BATCH_CUSTOMER_PROJECT
	            (
                   CUSTOMER_ID,                 
                   PROJECT_ID
	            )
	            VALUES
                (                
                  'dataItem.CUSTOMER_ID',
                  'dataItem.PROJECT_ID'
	            )
            ***/
        });

        sql = sql.replace('dataItem.CUSTOMER_ID', dataItem.CUSTOMER_ID);
        sql = sql.replace('dataItem.PROJECT_ID', dataItem.PROJECT_ID);        

        return sql;
    }


    Fn_Update(dataItem) {

        sql = sqlFormat(function () {

            /***
                UPDATE BATCH_CUSTOMER_PROJECT SET                
                    CUSTOMER_ID = 'dataItem.CUSTOMER_ID',
                    PROJECT_ID = 'dataItem.PROJECT_ID'
                WHERE CUSTOMER_ID = 'dataItem.OLD_CUSTOMER_ID'
                AND   PROJECT_ID = 'dataItem.OLD_PROJECT_ID'
            ***/
        });

        sql = sql.replace('dataItem.OLD_CUSTOMER_ID', dataItem.OLD_CUSTOMER_ID);
        sql = sql.replace('dataItem.OLD_PROJECT_ID', dataItem.OLD_PROJECT_ID);
        sql = sql.replace('dataItem.CUSTOMER_ID', dataItem.CUSTOMER_ID);
        sql = sql.replace('dataItem.PROJECT_ID', dataItem.PROJECT_ID);
       
        return sql;
    }

    Fn_Delete(dataItem) {

        sql = sqlFormat(function () {
            /***
                DELETE FROM BATCH_CUSTOMER_PROJECT
                WHERE CUSTOMER_ID = 'dataItem.CUSTOMER_ID'
                AND   PROJECT_ID = 'dataItem.PROJECT_ID'
            ***/
        });

        sql = sql.replace('dataItem.CUSTOMER_ID', dataItem.CUSTOMER_ID);
        sql = sql.replace('dataItem.PROJECT_ID', dataItem.PROJECT_ID);

        return sql;
    }

    Fn_GetCustomerHaveProject(dataItem) {

        sql = sqlFormat(function () {
            /***
                 SELECT
                        B.CUSTOMER_ID,
                        B.CUSTOMER_NAME,
                        C.PROJECT_ID,
                        C.PROJECT_NAME
                 FROM BATCH_CUSTOMER_PROJECT A
                 INNER JOIN BATCH_CUSTOMER B ON A.CUSTOMER_ID = B.CUSTOMER_ID
                 INNER JOIN BATCH_PROJECT C ON A.PROJECT_ID = C.PROJECT_ID
                 WHERE B.CUSTOMER_NAME LIKE 'dataItem.CUSTOMER_NAME%'
                 AND   C.PROJECT_NAME LIKE 'dataItem.PROJECT_NAME%'
                 ORDER BY  B.CUSTOMER_NAME, C.PROJECT_NAME
            ***/
        });

        sql = sql.replace('dataItem.CUSTOMER_NAME', dataItem.CUSTOMER_NAME);
        sql = sql.replace('dataItem.PROJECT_NAME', dataItem.PROJECT_NAME);

        return sql;
    }

};

module.exports = Cls_CustomerProject_SQL;


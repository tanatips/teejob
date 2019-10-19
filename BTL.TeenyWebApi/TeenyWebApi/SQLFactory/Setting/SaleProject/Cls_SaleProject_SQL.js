
let sqlFormat = require('mstring');
let sql = "";

class Cls_SaleProject_SQL {

    Fn_Insert(dataItem) {

        sql = sqlFormat(function () {
            /***
                INSERT INTO BATCH_PROJECT_SALE
	            (
                   EMPLOYEE_ID,                 
                   PROJECT_ID
	            )
	            VALUES
                (                
                  'dataItem.EMPLOYEE_ID',
                  'dataItem.PROJECT_ID'
	            )
            ***/
        });

        sql = sql.replace('dataItem.EMPLOYEE_ID', dataItem.EMPLOYEE_ID);
        sql = sql.replace('dataItem.PROJECT_ID', dataItem.PROJECT_ID);        

        return sql;
    }


    Fn_Update(dataItem) {

        sql = sqlFormat(function () {

            /***
                UPDATE BATCH_PROJECT_SALE SET                
                     EMPLOYEE_ID = 'dataItem.EMPLOYEE_ID',
                     PROJECT_ID = 'dataItem.PROJECT_ID'
                WHERE EMPLOYEE_ID = 'dataItem.OLD_EMPLOYEE_ID'
                AND   PROJECT_ID = 'dataItem.OLD_PROJECT_ID'
            ***/
        });

        sql = sql.replace('dataItem.OLD_EMPLOYEE_ID', dataItem.OLD_EMPLOYEE_ID);
        sql = sql.replace('dataItem.OLD_PROJECT_ID', dataItem.OLD_PROJECT_ID);
        sql = sql.replace('dataItem.EMPLOYEE_ID', dataItem.EMPLOYEE_ID);
        sql = sql.replace('dataItem.PROJECT_ID', dataItem.PROJECT_ID);
       
        return sql;
    }

    Fn_Delete(dataItem) {

        sql = sqlFormat(function () {
            /***
                DELETE FROM BATCH_PROJECT_SALE
                WHERE EMPLOYEE_ID = 'dataItem.EMPLOYEE_ID'
                AND   PROJECT_ID = 'dataItem.PROJECT_ID'
            ***/
        });

        sql = sql.replace('dataItem.EMPLOYEE_ID', dataItem.EMPLOYEE_ID);
        sql = sql.replace('dataItem.PROJECT_ID', dataItem.PROJECT_ID);

        return sql;
    }

    Fn_GetSaleHaveProject(dataItem) {

        sql = sqlFormat(function () {
            /***
                 SELECT
                        B.EMPLOYEE_ID,
                        B.EMPLOYEE_NAME,
                        C.PROJECT_ID,
                        C.PROJECT_NAME
                 FROM BATCH_PROJECT_SALE A
                 INNER JOIN BATCH_EMPLOYEE B ON A.EMPLOYEE_ID = B.EMPLOYEE_ID
                 INNER JOIN BATCH_PROJECT C ON A.PROJECT_ID = C.PROJECT_ID
                 WHERE B.EMPLOYEE_NAME LIKE 'dataItem.EMPLOYEE_NAME%'
                 AND   C.PROJECT_NAME LIKE 'dataItem.PROJECT_NAME%'
                 ORDER BY  B.EMPLOYEE_NAME, C.PROJECT_NAME
            ***/
        });

        sql = sql.replace('dataItem.EMPLOYEE_NAME', dataItem.EMPLOYEE_NAME);
        sql = sql.replace('dataItem.PROJECT_NAME', dataItem.PROJECT_NAME);

        return sql;
    }

};

module.exports = Cls_SaleProject_SQL;



let sqlFormat = require('mstring');
let sql = "";

class Cls_Employee_SQL {

    Fn_Search(dataItem) {

        let sqlList = [];

        sql = sqlFormat(function () {
            /***
                SELECT COUNT(*) AS TOTAL_COUNT                      
                FROM BATCH_EMPLOYEE AS E
                INNER JOIN BATCH_POSITION AS P ON P.POSITION_ID = E.POSITION_ID
                INNER JOIN BATCH_DEPARTMENT AS D ON D.DEPARTMENT_ID = P.DEPARTMENT_ID
                INNER JOIN BATCH_PLANT AS PN ON PN.PLANT_ID = E.PLANT_ID
                INNER JOIN BATCH_COMPANY AS C ON C.COMPANY_ID = PN.COMPANY_ID
                WHERE E.EMPLOYEE_NAME LIKE 'dataItem.EMPLOYEE_NAME%'
                AND P.POSITION_NAME LIKE 'dataItem.POSITION_NAME%'
                AND D.DEPARTMENT_NAME LIKE 'dataItem.DEPARTMENT_NAME%'
                AND PN.PLANT_NAME LIKE 'dataItem.PLANT_NAME%'
                AND C.COMPANY_NAME LIKE 'dataItem.COMPANY_NAME%' 
                AND C.SHORT_NAME LIKE 'dataItem.SHORT_NAME%'
            ***/
        });

        sql = sql.replace('dataItem.EMPLOYEE_NAME', dataItem.EMPLOYEE_NAME);
        sql = sql.replace('dataItem.POSITION_NAME', dataItem.POSITION_NAME);
        sql = sql.replace('dataItem.DEPARTMENT_NAME', dataItem.DEPARTMENT_NAME);
        sql = sql.replace('dataItem.PLANT_NAME', dataItem.PLANT_NAME);
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
                        E.EMPLOYEE_ID,
                        E.EMPLOYEE_NAME,
                        P.POSITION_ID,
                        P.POSITION_NAME,
                        D.DEPARTMENT_ID,
                        D.DEPARTMENT_NAME,
                        PN.PLANT_ID,
                        PN.PLANT_NAME,
                        C.COMPANY_ID,
                        C.COMPANY_NAME,
                        C.SHORT_NAME,
                        E.DESCRIPTION,
                        E.CREATE_USER,
                        E.LAST_USER,
                        DATE_FORMAT(E.CREATE_DATE,' %d/%m/%Y') AS CREATE_DATE,
                        DATE_FORMAT(E.LAST_DATE,' %d/%m/%Y') AS LAST_DATE
                    FROM BATCH_EMPLOYEE AS E
                    INNER JOIN BATCH_POSITION AS P ON P.POSITION_ID = E.POSITION_ID
                    INNER JOIN BATCH_DEPARTMENT AS D ON D.DEPARTMENT_ID = P.DEPARTMENT_ID
                    INNER JOIN BATCH_PLANT AS PN ON PN.PLANT_ID = E.PLANT_ID
                    INNER JOIN BATCH_COMPANY AS C ON C.COMPANY_ID = PN.COMPANY_ID
                    WHERE E.EMPLOYEE_NAME LIKE 'dataItem.EMPLOYEE_NAME%'
                    AND P.POSITION_NAME LIKE 'dataItem.POSITION_NAME%'
                    AND D.DEPARTMENT_NAME LIKE 'dataItem.DEPARTMENT_NAME%'
                    AND PN.PLANT_NAME LIKE 'dataItem.PLANT_NAME%'
                    AND C.COMPANY_NAME LIKE 'dataItem.COMPANY_NAME%' 
                    AND C.SHORT_NAME LIKE 'dataItem.SHORT_NAME%'
                    ORDER BY E.EMPLOYEE_NAME,P.POSITION_NAME,D.DEPARTMENT_NAME,PN.PLANT_NAME,C.COMPANY_NAME,C.SHORT_NAME
                ) TB
                WHERE RN > 'dataItem.Start' AND RN <= 'dataItem.Limit' 
            ***/
        });

        sql = sql.replace('dataItem.EMPLOYEE_NAME', dataItem.EMPLOYEE_NAME);
        sql = sql.replace('dataItem.POSITION_NAME', dataItem.POSITION_NAME);
        sql = sql.replace('dataItem.DEPARTMENT_NAME', dataItem.DEPARTMENT_NAME);
        sql = sql.replace('dataItem.PLANT_NAME', dataItem.PLANT_NAME);
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
                INSERT INTO BATCH_EMPLOYEE
	            (
                    PLANT_ID, 
                    POSITION_ID, 
                    EMPLOYEE_ID, 
                    EMPLOYEE_NAME,
                    DESCRIPTION,
	                CREATE_USER,	              
	                CREATE_DATE
	            )
	            VALUES
                (
                  'dataItem.PLANT_ID',
                  'dataItem.POSITION_ID',
                  (SELECT IFNULL( MAX(EMPLOYEE_ID), 0) +1 FROM BATCH_EMPLOYEE MAX_ID),
                  'dataItem.EMPLOYEE_NAME',
	              'dataItem.DESCRIPTION',
	              'dataItem.CREATE_USER',
                  CURRENT_DATE()
	           )
            ***/
        });

        sql = sql.replace('dataItem.PLANT_ID', dataItem.PLANT_ID);
        sql = sql.replace('dataItem.POSITION_ID', dataItem.POSITION_ID);

        sql = sql.replace('dataItem.EMPLOYEE_NAME', dataItem.EMPLOYEE_NAME);
        sql = sql.replace('dataItem.DESCRIPTION', dataItem.DESCRIPTION);
        sql = sql.replace('dataItem.CREATE_USER', dataItem.CREATE_USER);

        return sql;
    }

    Fn_Update(dataItem) {

        sql = sqlFormat(function () {
            /***
                UPDATE BATCH_EMPLOYEE SET  

                    PLANT_ID = 'dataItem.PLANT_ID',
                    POSITION_ID = 'dataItem.POSITION_ID',
                    EMPLOYEE_NAME = 'dataItem.EMPLOYEE_NAME',
	                DESCRIPTION = 'dataItem.DESCRIPTION',
                    LAST_USER = 'dataItem.LAST_USER',
                    LAST_DATE =  CURRENT_DATE()

                WHERE EMPLOYEE_ID = 'dataItem.EMPLOYEE_ID'

            ***/
        });

        sql = sql.replace('dataItem.PLANT_ID', dataItem.PLANT_ID);
        sql = sql.replace('dataItem.POSITION_ID', dataItem.POSITION_ID);

        sql = sql.replace('dataItem.EMPLOYEE_NAME', dataItem.EMPLOYEE_NAME);
        sql = sql.replace('dataItem.DESCRIPTION', dataItem.DESCRIPTION);
        sql = sql.replace('dataItem.LAST_USER', dataItem.LAST_USER);

        sql = sql.replace('dataItem.EMPLOYEE_ID', dataItem.EMPLOYEE_ID);

        return sql;
    }

    Fn_Delete(dataItem) {

        sql = sqlFormat(function () {
            /***
                DELETE FROM BATCH_EMPLOYEE
                WHERE EMPLOYEE_ID = 'dataItem.EMPLOYEE_ID'
            ***/
        });

        sql = sql.replace('dataItem.EMPLOYEE_ID', dataItem.EMPLOYEE_ID);

        return sql;
    }

    Fn_GetEmployeeAll() {

        sql = sqlFormat(function () {
            /***
                SELECT 
                    EMPLOYEE_ID,
                    EMPLOYEE_NAME
                FROM BATCH_EMPLOYEE
                ORDER BY EMPLOYEE_NAME
            ***/
        });

        return sql;
    }

    Fn_GetEmployeeByPlant(dataItem) {

        sql = sqlFormat(function () {
            /***
                SELECT 
                    EMPLOYEE_ID,
                    EMPLOYEE_NAME
                FROM BATCH_EMPLOYEE
                WHERE PLANT_ID = 'dataItem.PLANT_ID'
                ORDER BY EMPLOYEE_NAME
            ***/
        });

        sql = sql.replace('dataItem.PLANT_ID', dataItem.PLANT_ID);

        return sql;
    }

    Fn_GetEmployeeByPosition(dataItem) {

        sql = sqlFormat(function () {
            /***
                SELECT 
                    EMPLOYEE_ID,
                    EMPLOYEE_NAME
                FROM BATCH_EMPLOYEE
                WHERE POSITION_ID = 'dataItem.POSITION_ID'
                ORDER BY EMPLOYEE_NAME
            ***/
        });

        sql = sql.replace('dataItem.POSITION_ID', dataItem.POSITION_ID);

        return sql;
    }

    Fn_GetEmployeeByCondition(dataItem) {

        sql = sqlFormat(function () {
            /***
                SELECT 
                    EMPLOYEE_ID,
                    EMPLOYEE_NAME
                FROM BATCH_EMPLOYEE
                WHERE PLANT_ID = 'dataItem.PLANT_ID'
                AND POSITION_ID = 'dataItem.POSITION_ID'
                ORDER BY EMPLOYEE_NAME
            ***/
        });

        sql = sql.replace('dataItem.PLANT', dataItem.PLANT);
        sql = sql.replace('dataItem.POSITION_ID', dataItem.POSITION_ID);

        return sql;
    }
};

module.exports = Cls_Employee_SQL;


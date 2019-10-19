﻿
let sqlFormat = require('mstring');
let sql = "";

class Cls_Unit_SQL {

    Fn_Search(dataItem) {

        let sqlList = [];

        sql = sqlFormat(function () {
            /***
                SELECT COUNT(*) AS TOTAL_COUNT 
                FROM BATCH_UNIT
                WHERE UNIT_NAME LIKE 'dataItem.UNIT_NAME%'
            ***/
        });

        sql = sql.replace('dataItem.UNIT_NAME', dataItem.UNIT_NAME);

        sqlList.push(sql);


        sql = sqlFormat(function () {
            /***
                SET @rank=0;
                SELECT * FROM
                (
                    SELECT
                        @rank:=@rank+1 AS RN,
                        UNIT_ID, 
                        UNIT_NAME, 
                        DESCRIPTION,
                        CREATE_USER,
                        LAST_USER,
                        DATE_FORMAT(CREATE_DATE,' %d/%m/%Y') AS CREATE_DATE,
                        DATE_FORMAT(LAST_DATE,' %d/%m/%Y') AS LAST_DATE
                    FROM BATCH_UNIT
                    WHERE UNIT_NAME LIKE 'dataItem.UNIT_NAME%'
                    ORDER BY UNIT_NAME
                ) TB
                WHERE RN > 'dataItem.Start' AND RN <= 'dataItem.Limit'  
            ***/
        });

        sql = sql.replace('dataItem.UNIT_NAME', dataItem.UNIT_NAME);
        sql = sql.replace('dataItem.Start', dataItem.Start);
        sql = sql.replace('dataItem.Limit', dataItem.Limit);

        sqlList.push(sql);

        return sqlList;
    }

    Fn_Insert(dataItem) {

        sql = sqlFormat(function () {
            /***
                INSERT INTO BATCH_UNIT
	            (
                    UNIT_ID, 
                    UNIT_NAME, 
                    DESCRIPTION,
	                CREATE_USER,	              
	                CREATE_DATE
	              
	            )
	            VALUES
                (
                  (SELECT IFNULL( MAX(UNIT_ID), 0) +1 FROM BATCH_UNIT MAX_ID),
                  'dataItem.UNIT_NAME',
	              'dataItem.DESCRIPTION',
	              'dataItem.CREATE_USER',
                  CURRENT_DATE()
	           )
            ***/
        });

        sql = sql.replace('dataItem.UNIT_NAME', dataItem.UNIT_NAME);
        sql = sql.replace('dataItem.DESCRIPTION', dataItem.DESCRIPTION);
        sql = sql.replace('dataItem.CREATE_USER', dataItem.CREATE_USER);

        return sql;
    }

    Fn_Update(dataItem) {

        sql = sqlFormat(function () {
            /***
                UPDATE BATCH_UNIT SET  
                
                    UNIT_NAME = 'dataItem.UNIT_NAME',
	                DESCRIPTION = 'dataItem.DESCRIPTION',

                    LAST_USER = 'dataItem.LAST_USER',
                    LAST_DATE =  CURRENT_DATE()

                WHERE UNIT_ID = 'dataItem.UNIT_ID'

            ***/
        });

        sql = sql.replace('dataItem.UNIT_NAME', dataItem.UNIT_NAME);

        sql = sql.replace('dataItem.DESCRIPTION', dataItem.DESCRIPTION);
        sql = sql.replace('dataItem.LAST_USER', dataItem.LAST_USER);

        sql = sql.replace('dataItem.UNIT_ID', dataItem.UNIT_ID);

        return sql;
    }

    Fn_Delete(dataItem) {

        sql = sqlFormat(function () {
            /***
                DELETE FROM BATCH_UNIT
                WHERE UNIT_ID = 'dataItem.UNIT_ID'
            ***/
        });

        sql = sql.replace('dataItem.UNIT_ID', dataItem.UNIT_ID);

        return sql;
    }

    Fn_GetUnitAll() {

        sql = sqlFormat(function () {
            /***
                SELECT 
                    UNIT_ID,
                    UNIT_NAME
                FROM BATCH_UNIT
                ORDER BY UNIT_NAME
            ***/
        });

        return sql;
    }
};

module.exports = Cls_Unit_SQL;

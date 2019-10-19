
let sqlFormat = require('mstring');
let sql = "";

class Cls_MaterialType_SQL {

    Fn_Search(dataItem) {

        let sqlList = [];

        sql = sqlFormat(function () {
            /***
                SELECT COUNT(*) AS TOTAL_COUNT 
                FROM BATCH_MATERIAL_TYPE
                WHERE MATERIAL_TYPE_NAME LIKE 'dataItem.MATERIAL_TYPE_NAME%'
            ***/
        });

        sql = sql.replace('dataItem.MATERIAL_TYPE_NAME', dataItem.MATERIAL_TYPE_NAME);

        sqlList.push(sql);


        sql = sqlFormat(function () {
            /***
                SET @rank=0;
                SELECT * FROM
                (
                    SELECT
                        @rank:=@rank+1 AS RN,
                        MATERIAL_TYPE_ID, 
                        MATERIAL_TYPE_NAME, 
                        DESCRIPTION,
                        CREATE_USER,
                        LAST_USER,
                        DATE_FORMAT(CREATE_DATE,' %d/%m/%Y') AS CREATE_DATE,
                        DATE_FORMAT(LAST_DATE,' %d/%m/%Y') AS LAST_DATE
                    FROM BATCH_MATERIAL_TYPE
                    WHERE MATERIAL_TYPE_NAME LIKE 'dataItem.MATERIAL_TYPE_NAME%'
                    ORDER BY MATERIAL_TYPE_NAME
                ) TB
                WHERE RN > 'dataItem.Start' AND RN <= 'dataItem.Limit'  
            ***/
        });

        sql = sql.replace('dataItem.MATERIAL_TYPE_NAME', dataItem.MATERIAL_TYPE_NAME);
        sql = sql.replace('dataItem.Start', dataItem.Start);
        sql = sql.replace('dataItem.Limit', dataItem.Limit);

        sqlList.push(sql);

        return sqlList;
    }

    Fn_Insert(dataItem) {

        sql = sqlFormat(function () {
            /***
                INSERT INTO BATCH_MATERIAL_TYPE
	            (
                    MATERIAL_TYPE_ID, 
                    MATERIAL_TYPE_NAME, 
                    DESCRIPTION,
	                CREATE_USER,	              
	                CREATE_DATE
	              
	            )
	            VALUES
                (
                  (SELECT IFNULL( MAX(MATERIAL_TYPE_ID), 0) +1 FROM BATCH_MATERIAL_TYPE MAX_ID),
                  'dataItem.MATERIAL_TYPE_NAME',
	              'dataItem.DESCRIPTION',
	              'dataItem.CREATE_USER',
                  CURRENT_DATE()
	           )
            ***/
        });

        sql = sql.replace('dataItem.MATERIAL_TYPE_NAME', dataItem.MATERIAL_TYPE_NAME);
        sql = sql.replace('dataItem.DESCRIPTION', dataItem.DESCRIPTION);
        sql = sql.replace('dataItem.CREATE_USER', dataItem.CREATE_USER);

        return sql;
    }

    Fn_Update(dataItem) {

        sql = sqlFormat(function () {
            /***
                UPDATE BATCH_MATERIAL_TYPE SET  
                
                    MATERIAL_TYPE_NAME = 'dataItem.MATERIAL_TYPE_NAME',
	                DESCRIPTION = 'dataItem.DESCRIPTION',

                    LAST_USER = 'dataItem.LAST_USER',
                    LAST_DATE =  CURRENT_DATE()

                WHERE MATERIAL_TYPE_ID = 'dataItem.MATERIAL_TYPE_ID'

            ***/
        });

        sql = sql.replace('dataItem.MATERIAL_TYPE_NAME', dataItem.MATERIAL_TYPE_NAME);

        sql = sql.replace('dataItem.DESCRIPTION', dataItem.DESCRIPTION);
        sql = sql.replace('dataItem.LAST_USER', dataItem.LAST_USER);

        sql = sql.replace('dataItem.MATERIAL_TYPE_ID', dataItem.MATERIAL_TYPE_ID);

        return sql;
    }

    Fn_Delete(dataItem) {

        sql = sqlFormat(function () {
            /***
                DELETE FROM BATCH_MATERIAL_TYPE
                WHERE MATERIAL_TYPE_ID = 'dataItem.MATERIAL_TYPE_ID'
            ***/
        });

        sql = sql.replace('dataItem.MATERIAL_TYPE_ID', dataItem.MATERIAL_TYPE_ID);

        return sql;
    }

    Fn_GetMaterialTypeAll() {

        sql = sqlFormat(function () {
            /***
                SELECT 
                    MATERIAL_TYPE_ID,
                    MATERIAL_TYPE_NAME
                FROM BATCH_MATERIAL_TYPE
                ORDER BY MATERIAL_TYPE_NAME
            ***/
        });

        return sql;
    }
};

module.exports = Cls_MaterialType_SQL;



let sqlFormat = require('mstring');
let sql = "";

class Cls_Material_SQL {

    Fn_Search(dataItem) {

        let sqlList = [];

        sql = sqlFormat(function () {
            /***
                SELECT COUNT(*) AS TOTAL_COUNT                      
                FROM BATCH_MATERIAL AS M
                INNER JOIN BATCH_MATERIAL_TYPE AS MT ON M.MATERIAL_TYPE_ID = MT.MATERIAL_TYPE_ID
                WHERE M.MATERIAL_NAME LIKE 'dataItem.MATERIAL_NAME%' 
                AND M.MATERIAL_SIZE LIKE 'dataItem.MATERIAL_SIZE%'
                AND MT.MATERIAL_TYPE_NAME LIKE 'dataItem.MATERIAL_TYPE_NAME%'
            ***/
        });

        sql = sql.replace('dataItem.MATERIAL_NAME', dataItem.MATERIAL_NAME);
        sql = sql.replace('dataItem.MATERIAL_SIZE', dataItem.MATERIAL_SIZE);
        sql = sql.replace('dataItem.MATERIAL_TYPE_NAME', dataItem.MATERIAL_TYPE_NAME);

        sqlList.push(sql);


        sql = sqlFormat(function () {
            /***
                SET @rank=0;
                SELECT * FROM
                (
                    SELECT
                        @rank:=@rank+1 AS RN,
                        M.MATERIAL_ID, 
                        M.MATERIAL_NAME, 
                        M.MATERIAL_KEY,
                        MT.MATERIAL_TYPE_ID, 
                        MT.MATERIAL_TYPE_NAME, 
                        M.MATERIAL_SIZE,
                        M.DESCRIPTION,
                        M.CREATE_USER,
                        M.LAST_USER,
                        DATE_FORMAT(M.CREATE_DATE,' %d/%m/%Y') AS CREATE_DATE,
                        DATE_FORMAT(M.LAST_DATE,' %d/%m/%Y') AS LAST_DATE
                    FROM BATCH_MATERIAL AS M
                    INNER JOIN BATCH_MATERIAL_TYPE AS MT ON M.MATERIAL_TYPE_ID = MT.MATERIAL_TYPE_ID
                    WHERE M.MATERIAL_NAME LIKE 'dataItem.MATERIAL_NAME%' 
                    AND M.MATERIAL_SIZE LIKE 'dataItem.MATERIAL_SIZE%'
                    AND MT.MATERIAL_TYPE_NAME LIKE 'dataItem.MATERIAL_TYPE_NAME%'
                    ORDER BY M.MATERIAL_NAME,M.MATERIAL_SIZE,M.MATERIAL_KEY,MT.MATERIAL_TYPE_NAME
                ) TB
                WHERE RN > 'dataItem.Start' AND RN <= 'dataItem.Limit'  
            ***/
        });

        sql = sql.replace('dataItem.MATERIAL_NAME', dataItem.MATERIAL_NAME);
        sql = sql.replace('dataItem.MATERIAL_SIZE', dataItem.MATERIAL_SIZE);
        sql = sql.replace('dataItem.MATERIAL_TYPE_NAME', dataItem.MATERIAL_TYPE_NAME);

        sql = sql.replace('dataItem.Start', dataItem.Start);
        sql = sql.replace('dataItem.Limit', dataItem.Limit);

        sqlList.push(sql);

        return sqlList;
    }

    Fn_Insert(dataItem) {

        sql = sqlFormat(function () {
            /***
                INSERT INTO BATCH_MATERIAL
	            (
                    MATERIAL_TYPE_ID, 
                    MATERIAL_ID,
                    MATERIAL_NAME, 
                    MATERIAL_SIZE,
                    MATERIAL_KEY,
                    DESCRIPTION,
	                CREATE_USER,	              
	                CREATE_DATE
	              
	            )
	            VALUES
                (
                  'dataItem.MATERIAL_TYPE_ID',    
                  (SELECT IFNULL( MAX(MATERIAL_ID), 0) +1 FROM BATCH_MATERIAL MAX_ID),
                  'dataItem.MATERIAL_NAME',
                  'dataItem.MATERIAL_SIZE',
                  'dataItem.MATERIAL_KEY',
	              'dataItem.DESCRIPTION',
	              'dataItem.CREATE_USER',
                  CURRENT_DATE()
	           )
            ***/
        });

        sql = sql.replace('dataItem.MATERIAL_TYPE_ID', dataItem.MATERIAL_TYPE_ID);

        sql = sql.replace('dataItem.MATERIAL_NAME', dataItem.MATERIAL_NAME);
        sql = sql.replace('dataItem.MATERIAL_SIZE', dataItem.MATERIAL_SIZE);
        sql = sql.replace('dataItem.MATERIAL_KEY', dataItem.MATERIAL_KEY);

        sql = sql.replace('dataItem.DESCRIPTION', dataItem.DESCRIPTION);
        sql = sql.replace('dataItem.CREATE_USER', dataItem.CREATE_USER);

        return sql;
    }

    Fn_Update(dataItem) {

        sql = sqlFormat(function () {
            /***
                UPDATE BATCH_MATERIAL SET  

                    MATERIAL_TYPE_ID = 'dataItem.MATERIAL_TYPE_ID',
                    MATERIAL_NAME = 'dataItem.MATERIAL_NAME',
                    MATERIAL_SIZE = 'dataItem.MATERIAL_SIZE',
                    MATERIAL_KEY = 'dataItem.MATERIAL_KEY',
                    
	                DESCRIPTION = 'dataItem.DESCRIPTION',

                    LAST_USER = 'dataItem.LAST_USER',
                    LAST_DATE =  CURRENT_DATE()

                WHERE MATERIAL_ID = 'dataItem.MATERIAL_ID'

            ***/
        });

        sql = sql.replace('dataItem.MATERIAL_TYPE_ID', dataItem.MATERIAL_TYPE_ID);
        sql = sql.replace('dataItem.MATERIAL_NAME', dataItem.MATERIAL_NAME);
        sql = sql.replace('dataItem.MATERIAL_SIZE', dataItem.MATERIAL_SIZE);
        sql = sql.replace('dataItem.MATERIAL_KEY', dataItem.MATERIAL_KEY);
        
        sql = sql.replace('dataItem.DESCRIPTION', dataItem.DESCRIPTION);

        sql = sql.replace('dataItem.LAST_USER', dataItem.LAST_USER);

        sql = sql.replace('dataItem.MATERIAL_ID', dataItem.MATERIAL_ID);

        return sql;
    }

    Fn_Delete(dataItem) {

        sql = sqlFormat(function () {
            /***
                DELETE FROM BATCH_MATERIAL
                WHERE MATERIAL_ID = 'dataItem.MATERIAL_ID'
            ***/
        });

        sql = sql.replace('dataItem.MATERIAL_ID', dataItem.MATERIAL_ID);

        return sql;
    }

    Fn_GetMaterialAll() {

        sql = sqlFormat(function () {
            /***
                SELECT 
                    MATERIAL_ID,
                    MATERIAL_NAME,
                    MATERIAL_SIZE
                FROM BATCH_MATERIAL
                ORDER BY MATERIAL_NAME,MATERIAL_SIZE
            ***/
        });

        return sql;
    }

    Fn_GetMaterialByMaterialType(dataItem) {

        sql = sqlFormat(function () {
            /***
                SELECT 
                    MATERIAL_ID,
                    MATERIAL_NAME,
                    MATERIAL_SIZE
                FROM BATCH_MATERIAL
                WHERE MATERIAL_TYPE_ID = 'dataItem.MATERIAL_TYPE_ID'
                ORDER BY MATERIAL_NAME,MATERIAL_SIZE
            ***/
        });

        sql = sql.replace('dataItem.MATERIAL_TYPE_ID', dataItem.MATERIAL_TYPE_ID);

        return sql;
    }
};

module.exports = Cls_Material_SQL;


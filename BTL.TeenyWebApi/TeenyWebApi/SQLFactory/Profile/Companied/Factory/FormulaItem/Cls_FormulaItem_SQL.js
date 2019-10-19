
let sqlFormat = require('mstring');
let sql = "";

class Cls_Formula_SQL {

    Fn_Search(dataItem) {

        let sqlList = [];

        sql = sqlFormat(function () {
            /***
                SELECT COUNT(*) AS TOTAL_COUNT 
                FROM BATCH_FORMULA_ITEM AS FI
                INNER JOIN BATCH_FORMULA AS F ON F.FORMULA_ID = FI.FORMULA_ID
                INNER JOIN BATCH_UNIT AS U ON U.UNIT_ID = FI.UNIT_ID
                INNER JOIN BATCH_MATERIAL AS M ON M.MATERIAL_ID = FI.MATERIAL_ID
                INNER JOIN BATCH_MATERIAL_TYPE AS MT ON MT.MATERIAL_TYPE_ID = M.MATERIAL_TYPE_ID
                WHERE F.FORMULA_NAME LIKE 'dataItem.FORMULA_NAME%' 
                AND F.CONCEATE_NAME LIKE 'dataItem.CONCEATE_NAME%'
                AND M.MATERIAL_NAME LIKE 'dataItem.MATERIAL_NAME%' 
                AND M.MATERIAL_SIZE LIKE 'dataItem.MATERIAL_SIZE%'
                AND MT.MATERIAL_TYPE_NAME LIKE 'dataItem.MATERIAL_TYPE_NAME%'
                AND U.UNIT_NAME LIKE 'dataItem.UNIT_NAME%'
            ***/
        });

        sql = sql.replace('dataItem.FORMULA_NAME', dataItem.FORMULA_NAME);
        sql = sql.replace('dataItem.CONCEATE_NAME', dataItem.CONCEATE_NAME);
        sql = sql.replace('dataItem.MATERIAL_NAME', dataItem.MATERIAL_NAME);
        sql = sql.replace('dataItem.MATERIAL_SIZE', dataItem.MATERIAL_SIZE);
        sql = sql.replace('dataItem.MATERIAL_TYPE_NAME', dataItem.MATERIAL_TYPE_NAME);
        sql = sql.replace('dataItem.UNIT_NAME', dataItem.UNIT_NAME);

        sqlList.push(sql);


        sql = sqlFormat(function () {
            /***
                SET @rank=0;
                SELECT * FROM
                (
                    SELECT
                        @rank:=@rank+1 AS RN,
                        FI.FORMULA_ITEM_ID,
                        F.FORMULA_ID, 
                        F.FORMULA_NAME, 
                        M.MATERIAL_ID,
                        M.MATERIAL_NAME,
                        M.MATERIAL_SIZE,
                        MT.MATERIAL_TYPE_ID,
                        MT.MATERIAL_TYPE_NAME,
                        U.UNIT_ID,
                        U.UNIT_NAME,
                        FI.QUNTITY,
                        FI.DESCRIPTION,
                        FI.CREATE_USER,
                        FI.LAST_USER,
                        DATE_FORMAT(FI.CREATE_DATE,' %d/%m/%Y') AS CREATE_DATE,
                        DATE_FORMAT(FI.LAST_DATE,' %d/%m/%Y') AS LAST_DATE
                    FROM BATCH_FORMULA_ITEM AS FI
                    INNER JOIN BATCH_FORMULA AS F ON F.FORMULA_ID = FI.FORMULA_ID
                    INNER JOIN BATCH_UNIT AS U ON U.UNIT_ID = FI.UNIT_ID
                    INNER JOIN BATCH_MATERIAL AS M ON M.MATERIAL_ID = FI.MATERIAL_ID
                    INNER JOIN BATCH_MATERIAL_TYPE AS MT ON MT.MATERIAL_TYPE_ID = M.MATERIAL_TYPE_ID
                    WHERE F.FORMULA_NAME LIKE 'dataItem.FORMULA_NAME%' 
                    AND F.CONCEATE_NAME LIKE 'dataItem.CONCEATE_NAME%'
                    AND M.MATERIAL_NAME LIKE 'dataItem.MATERIAL_NAME%' 
                    AND M.MATERIAL_SIZE LIKE 'dataItem.MATERIAL_SIZE%'
                    AND MT.MATERIAL_TYPE_NAME LIKE 'dataItem.MATERIAL_TYPE_NAME%'
                    AND U.UNIT_NAME LIKE 'dataItem.UNIT_NAME%'
                    ORDER BY F.FORMULA_NAME,F.CONCEATE_NAME,M.MATERIAL_NAME,M.MATERIAL_SIZE,MT.MATERIAL_TYPE_NAME,U.UNIT_NAME
                ) TB
                WHERE RN > 'dataItem.Start' AND RN <= 'dataItem.Limit'  
            ***/
        });

        sql = sql.replace('dataItem.FORMULA_NAME', dataItem.FORMULA_NAME);
        sql = sql.replace('dataItem.CONCEATE_NAME', dataItem.CONCEATE_NAME);
        sql = sql.replace('dataItem.MATERIAL_NAME', dataItem.MATERIAL_NAME);
        sql = sql.replace('dataItem.MATERIAL_SIZE', dataItem.MATERIAL_SIZE);
        sql = sql.replace('dataItem.MATERIAL_TYPE_NAME', dataItem.MATERIAL_TYPE_NAME);
        sql = sql.replace('dataItem.UNIT_NAME', dataItem.UNIT_NAME);

        sql = sql.replace('dataItem.Start', dataItem.Start);
        sql = sql.replace('dataItem.Limit', dataItem.Limit);

        sqlList.push(sql);

        return sqlList;
    }

    Fn_Insert(dataItem) {

        sql = sqlFormat(function () {
            /***
                INSERT INTO BATCH_FORMULA_ITEM
	            (
                    FORMULA_ID, 
                    MATERIAL_ID, 
                    UNIT_ID,
                    FORMULA_ITEM_ID,
                    QUNTITY,
                    DESCRIPTION,
	                CREATE_USER,	              
	                CREATE_DATE
	              
	            )
	            VALUES
                (
                    'dataItem.FORMULA_ID',
                    'dataItem.MATERIAL_ID',
                    'dataItem.UNIT_ID',
                    (SELECT IFNULL( MAX(FORMULA_ITEM_ID), 0) +1 FROM BATCH_FORMULA_ITEM MAX_ID),
                    'dataItem.QUNTITY',
                    'dataItem.DESCRIPTION',
                    'dataItem.CREATE_USER',
                    CURRENT_DATE()
	           )
            ***/
        });

        sql = sql.replace('dataItem.FORMULA_ID', dataItem.FORMULA_ID);
        sql = sql.replace('dataItem.MATERIAL_ID', dataItem.MATERIAL_ID);
        sql = sql.replace('dataItem.UNIT_ID', dataItem.UNIT_ID);
        sql = sql.replace('dataItem.QUNTITY', dataItem.QUNTITY);

        sql = sql.replace('dataItem.DESCRIPTION', dataItem.DESCRIPTION);
        sql = sql.replace('dataItem.CREATE_USER', dataItem.CREATE_USER);

        return sql;
    }

    Fn_Update(dataItem) {

        sql = sqlFormat(function () {
            /***
                UPDATE BATCH_FORMULA_ITEM SET  
                
                    FORMULA_ID = 'dataItem.FORMULA_ID',
                    MATERIAL_ID = 'dataItem.MATERIAL_ID',
                    UNIT_ID = 'dataItem.UNIT_ID',
                    QUNTITY = 'dataItem.QUNTITY',

	                DESCRIPTION = 'dataItem.DESCRIPTION',

                    LAST_USER = 'dataItem.LAST_USER',
                    LAST_DATE =  CURRENT_DATE()

                WHERE FORMULA_ITEM_ID = 'dataItem.FORMULA_ITEM_ID'

            ***/
        });

        sql = sql.replace('dataItem.FORMULA_ID', dataItem.FORMULA_ID);
        sql = sql.replace('dataItem.MATERIAL_ID', dataItem.MATERIAL_ID);
        sql = sql.replace('dataItem.UNIT_ID', dataItem.UNIT_ID);
        sql = sql.replace('dataItem.QUNTITY', dataItem.QUNTITY);

        sql = sql.replace('dataItem.DESCRIPTION', dataItem.DESCRIPTION);
        sql = sql.replace('dataItem.LAST_USER', dataItem.LAST_USER);

        sql = sql.replace('dataItem.FORMULA_ITEM_ID', dataItem.FORMULA_ITEM_ID);

        return sql;
    }

    Fn_Delete(dataItem) {

        sql = sqlFormat(function () {
            /***
                DELETE FROM BATCH_FORMULA_ITEM
                WHERE FORMULA_ITEM_ID = 'dataItem.FORMULA_ITEM_ID'
            ***/
        });

        sql = sql.replace('dataItem.FORMULA_ITEM_ID', dataItem.FORMULA_ITEM_ID);

        return sql;
    }

    Fn_GetFormulaItemDetailByFormulaName(dataItem) {

        sql = sqlFormat(function () {
            /***
                 SELECT  B.FORMULA_NAME,
                         CONCAT(C.MATERIAL_NAME, ' ', A.QUNTITY, ' ', D.UNIT_NAME ) AS FORMULA_ITEM_DETAIL
                 FROM BATCH_FORMULA_ITEM A
                 INNER JOIN BATCH_FORMULA B ON A.FORMULA_ID = B.FORMULA_ID
                 INNER JOIN BATCH_MATERIAL C ON A.MATERIAL_ID = C.MATERIAL_ID
                 INNER JOIN BATCH_UNIT D ON A.UNIT_ID = D.UNIT_ID
                 WHERE B.FORMULA_NAME = 'dataItem.FORMULA_NAME'
                 ORDER BY C.MATERIAL_NAME
            ***/
        });

        sql = sql.replace('dataItem.FORMULA_NAME', dataItem.FORMULA_NAME);

        return sql;
    }
};

module.exports = Cls_Formula_SQL;


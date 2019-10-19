
let sqlFormat = require('mstring');
let sql = "";

class Cls_ProjectJobSite_SQL {

    Fn_Insert(dataItem) {

        sql = sqlFormat(function () {
            /***
                INSERT INTO BATCH_PROJECT_JOBSITE
	            (
                   PROJECT_ID,
                   JOBSITE_ID                   
	            )
	            VALUES
                (                
                  'dataItem.PROJECT_ID',
                  'dataItem.JOBSITE_ID'
	            )
            ***/
        });

        sql = sql.replace('dataItem.PROJECT_ID', dataItem.PROJECT_ID);
        sql = sql.replace('dataItem.JOBSITE_ID', dataItem.JOBSITE_ID);

        return sql;
    }


    Fn_Update(dataItem) {

        sql = sqlFormat(function () {

            /***
                UPDATE BATCH_PROJECT_JOBSITE SET
                    JOBSITE_ID = 'dataItem.JOBSITE_ID',
                    PROJECT_ID = 'dataItem.PROJECT_ID'
                WHERE JOBSITE_ID = 'dataItem.OLD_JOBSITE_ID'
                AND   PROJECT_ID = 'dataItem.OLD_PROJECT_ID'
            ***/
        });

        sql = sql.replace('dataItem.OLD_JOBSITE_ID', dataItem.OLD_JOBSITE_ID);
        sql = sql.replace('dataItem.OLD_PROJECT_ID', dataItem.OLD_PROJECT_ID);
        sql = sql.replace('dataItem.JOBSITE_ID', dataItem.JOBSITE_ID);
        sql = sql.replace('dataItem.PROJECT_ID', dataItem.PROJECT_ID);

        return sql;
    }

    Fn_Delete(dataItem) {

        sql = sqlFormat(function () {
            /***
                DELETE FROM BATCH_PROJECT_JOBSITE
                WHERE JOBSITE_ID = 'dataItem.JOBSITE_ID'
                AND   PROJECT_ID = 'dataItem.PROJECT_ID'
            ***/
        });

        sql = sql.replace('dataItem.JOBSITE_ID', dataItem.JOBSITE_ID);
        sql = sql.replace('dataItem.PROJECT_ID', dataItem.PROJECT_ID);

        return sql;
    }

    Fn_GetProjectHaveJobSite(dataItem) {

        sql = sqlFormat(function () {
            /***
                 SELECT
                        B.PROJECT_ID,
                        B.PROJECT_NAME,
                        C.JOBSITE_ID,
                        C.JOBSITE_NAME
                 FROM BATCH_PROJECT_JOBSITE A
                 INNER JOIN BATCH_PROJECT  B ON A.PROJECT_ID = B.PROJECT_ID
                 INNER JOIN BATCH_JOBSITE  C ON A.JOBSITE_ID = C.JOBSITE_ID
                 WHERE B.PROJECT_NAME LIKE 'dataItem.PROJECT_NAME%'
                 AND   C.JOBSITE_NAME LIKE 'dataItem.JOBSITE_NAME%'
                 ORDER BY  B.PROJECT_NAME, C.JOBSITE_NAME
            ***/
        });

        sql = sql.replace('dataItem.PROJECT_NAME', dataItem.PROJECT_NAME);
        sql = sql.replace('dataItem.JOBSITE_NAME', dataItem.JOBSITE_NAME);

        return sql;
    }

};

module.exports = Cls_ProjectJobSite_SQL;


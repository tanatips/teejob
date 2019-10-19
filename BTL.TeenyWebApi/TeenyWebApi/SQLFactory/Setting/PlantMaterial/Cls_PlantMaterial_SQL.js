
let sqlFormat = require('mstring');
let sql = "";

class Cls_PlantMaterial_SQL {

    Fn_Insert(dataItem) {

        sql = sqlFormat(function () {
            /***
                INSERT INTO BATCH_PLANT_MATERIAL
	            (
                   PLANT_ID,                 
                   MATERIAL_ID
	            )
	            VALUES
                (                
                  'dataItem.PLANT_ID',
                  'dataItem.MATERIAL_ID'
	            )
            ***/
        });

        sql = sql.replace('dataItem.PLANT_ID', dataItem.PLANT_ID);
        sql = sql.replace('dataItem.MATERIAL_ID', dataItem.MATERIAL_ID);        

        return sql;
    }


    Fn_Update(dataItem) {

        sql = sqlFormat(function () {

            /***
                UPDATE BATCH_PLANT_MATERIAL SET                
                    PLANT_ID = 'dataItem.PLANT_ID',
                    MATERIAL_ID = 'dataItem.MATERIAL_ID'
                WHERE PLANT_ID = 'dataItem.OLD_PLANT_ID'
                AND   MATERIAL_ID = 'dataItem.OLD_MATERIAL_ID'
            ***/
        });

        sql = sql.replace('dataItem.OLD_PLANT_ID', dataItem.OLD_PLANT_ID);
        sql = sql.replace('dataItem.OLD_MATERIAL_ID', dataItem.OLD_MATERIAL_ID);
        sql = sql.replace('dataItem.PLANT_ID', dataItem.PLANT_ID);
        sql = sql.replace('dataItem.MATERIAL_ID', dataItem.MATERIAL_ID);
       
        return sql;
    }

    Fn_Delete(dataItem) {

        sql = sqlFormat(function () {
            /***
                DELETE FROM BATCH_PLANT_MATERIAL
                WHERE PLANT_ID = 'dataItem.PLANT_ID'
                AND   MATERIAL_ID = 'dataItem.MATERIAL_ID'
            ***/
        });

        sql = sql.replace('dataItem.PLANT_ID', dataItem.PLANT_ID);
        sql = sql.replace('dataItem.MATERIAL_ID', dataItem.MATERIAL_ID);

        return sql;
    }

    Fn_GetPlantHaveMaterial(dataItem) {

        sql = sqlFormat(function () {
            /***
                 SELECT
                        P.PLANT_ID,
                        P.PLANT_NAME,
                        M.MATERIAL_ID,
                        M.MATERIAL_NAME
                 FROM BATCH_PLANT_MATERIAL AS PM
                 INNER JOIN BATCH_PLANT AS P ON P.PLANT_ID = PM.PLANT_ID
                 INNER JOIN BATCH_MATERIAL AS M ON M.MATERIAL_ID = PM.MATERIAL_ID
                 WHERE P.PLANT_NAME LIKE 'dataItem.PLANT_NAME%'
                 AND   M.MATERIAL_NAME LIKE 'dataItem.MATERIAL_NAME%'
                 ORDER BY  P.PLANT_NAME, M.MATERIAL_NAME
            ***/
        });

        sql = sql.replace('dataItem.PLANT_NAME', dataItem.PLANT_NAME);
        sql = sql.replace('dataItem.MATERIAL_NAME', dataItem.MATERIAL_NAME);

        return sql;
    }

};

module.exports = Cls_PlantMaterial_SQL;


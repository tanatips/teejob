
let mySqlExecute = require('../../../BusinessData/Execute/File_MySQL_Execute.js');

let Cls_PlantMaterial_SQL = require('../../../SQLFactory/Setting/PlantMaterial/Cls_PlantMaterial_SQL.js');


class Cls_PlantMaterial_Models {

    constructor() {

        this.sqlFactory = new Cls_PlantMaterial_SQL();
    }

    Fn_Insert(dataItem, callback) {

        let sql = this.sqlFactory.Fn_Insert(dataItem);

        mySqlExecute.Insert(sql, function (resultData) {

            callback(resultData);
        });
    }

    Fn_Update(dataItem, callback) {

        let sql = this.sqlFactory.Fn_Update(dataItem);

        mySqlExecute.Update(sql, function (resultData) {

            callback(resultData);
        });
    }

    Fn_Delete(dataItem, callback) {

        let sql = this.sqlFactory.Fn_Delete(dataItem);

        mySqlExecute.Delete(sql, function (resultData) {

            callback(resultData);
        });
    }

    Fn_GetPlantHaveMaterial(dataItem, callback) {

        let sql = this.sqlFactory.Fn_GetPlantHaveMaterial(dataItem);

        let rootNode = [];

        mySqlExecute.Select(sql, function (resultData) {

            if (resultData.ResultOnDb.length > 0) {

                let list = [];

                var jsonGroupBy = function (data, key) {

                    let resultGroupBy = data.reduce(function (item, x) {

                        (item[x[key]] = item[x[key]] || []).push(x);

                        return item;

                    }, {});

                    return Object.keys(resultGroupBy);
                };

                var listPlant = jsonGroupBy(resultData.ResultOnDb, 'PLANT_NAME')
           

                for (let i = 0; i < listPlant.length; i++) {

                    let rootIndex = (i + 1).toString();
                    let plantName = listPlant[i];

                    let childNode = {
                        expanded: true,
                        id:  rootIndex,
                        text: "Plant >: " + plantName,
                        leaf: false,                       
                        children: new Cls_PlantMaterial_Models().Fn_GetMaterialName(rootIndex, plantName, resultData)
                    };

                    rootNode.push(childNode);
                }

                resultData.ResultList = rootNode;

                callback(resultData);
            }
            else {

                let childNode = {
                    expanded: true,
                    id: "1",
                    text: "No Data",
                    leaf: false,
                    children: null
                };

                rootNode.push(childNode);

                resultData.ResultList = rootNode;

                callback(resultData);
            }

        });
    }


    Fn_GetMaterialName(rootIndex, plantName, resultData) {
        
        let listChild = [];

        for (let i = 0; i < resultData.ResultOnDb.length; i++) {

            if (plantName === resultData.ResultOnDb[i].PLANT_NAME) {

                let item = {
                    expanded: true,
                    id: rootIndex + "" + resultData.ResultOnDb[i].MATERIAL_ID,
                    text: "Material >: " + resultData.ResultOnDb[i].MATERIAL_NAME,
                    leaf: true,                   
                    children: null,
                    PLANT_ID: resultData.ResultOnDb[i].PLANT_ID,
                    PLANT_NAME: resultData.ResultOnDb[i].PLANT_NAME,
                    MATERIAL_ID: resultData.ResultOnDb[i].MATERIAL_ID,
                    MATERIAL_NAME: resultData.ResultOnDb[i].MATERIAL_NAME
                };

                listChild.push(item);
            }
        }

        return listChild;
    }

};

module.exports = Cls_PlantMaterial_Models;


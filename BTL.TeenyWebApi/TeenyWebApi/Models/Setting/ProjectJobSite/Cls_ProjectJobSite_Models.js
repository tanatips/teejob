
let mySqlExecute = require('../../../BusinessData/Execute/File_MySQL_Execute.js');

let Cls_ProjectJobSite_SQL = require('../../../SQLFactory/Setting/ProjectJobSite/Cls_ProjectJobSite_SQL.js');


class Cls_ProjectJobSite_Models {

    constructor() {

        this.sqlFactory = new Cls_ProjectJobSite_SQL();
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

    Fn_GetProjectHaveJobSite(dataItem, callback) {

        let sql = this.sqlFactory.Fn_GetProjectHaveJobSite(dataItem);

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

                var listProject = jsonGroupBy(resultData.ResultOnDb, 'PROJECT_NAME')
           

                for (let i = 0; i < listProject.length; i++) {

                    let rootIndex = (i + 1).toString();
                    let projectName = listProject[i];

                    let childNode = {
                        expanded: true,
                        id:  rootIndex,
                        text: "Project >: " + projectName,
                        leaf: false,                       
                        children: new Cls_ProjectJobSite_Models().Fn_GetJobSiteName(rootIndex, projectName, resultData)
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


    Fn_GetJobSiteName(rootIndex, projectName, resultData) {
        
        let listChild = [];

        for (let i = 0; i < resultData.ResultOnDb.length; i++) {

            if (projectName === resultData.ResultOnDb[i].PROJECT_NAME) {

                let item = {
                    expanded: true,
                    id: rootIndex + "" + resultData.ResultOnDb[i].JOBSITE_ID,
                    text: "JobSite >: " + resultData.ResultOnDb[i].JOBSITE_NAME,
                    leaf: true,                    
                    children: null,
                    JOBSITE_ID: resultData.ResultOnDb[i].JOBSITE_ID,
                    JOBSITE_NAME: resultData.ResultOnDb[i].JOBSITE_NAME,
                    PROJECT_ID: resultData.ResultOnDb[i].PROJECT_ID,
                    PROJECT_NAME: resultData.ResultOnDb[i].PROJECT_NAME
                };

                listChild.push(item);
            }
        }

        return listChild;
    }

};

module.exports = Cls_ProjectJobSite_Models;


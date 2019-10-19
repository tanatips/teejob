
function Cls_PlantMaterialAction_Views(urlRoot) {
        
    var msgBox= new Cls_MessageBox_Views();
    
    //--- 1.Search -----------------------------------------------------//

    this.Fn_LoadPlantMaterial = function () {

        Fn_LoadTreePlantMaterial();
    };

    var Fn_LoadTreePlantMaterial = function () {

        Ext.getCmp('id-TreePlantMaterial-PlantMaterialPage').store.load({
            url: urlRoot + "/PlantMaterial/PlantHaveMaterial",
            params: {
                PLANT_NAME: Ext.getCmp('id-ComboPlantName-PlantMaterialPage').getValue(),
                MATERIAL_NAME: Ext.getCmp('id-ComboMaterialName-PlantMaterialPage').getValue(),
                ModeRun: modeRun
            },
            callback: function () {

                //Ext.getCmp("id-PanelRenderChartSelect-PlantMaterialPage").removeAll();

                //Fn_GetChartConfigBySystem();
            }
        });
    };
       

    //--------2 Insert --------------------------------//
    this.Fn_Insert = function (myWin) {
               
        var ajaxObj = $.ajax({
            url: urlRoot + "/PlantMaterial/Insert",
            data: {    
                ModeRun: modeRun,
                PLANT_ID: Ext.getCmp('id-ComboPlantName-NewEdit-PlantMaterialPage').selection.data.PLANT_ID,
                MATERIAL_ID: Ext.getCmp('id-ComboMaterialName-NewEdit-PlantMaterialPage').selection.data.MATERIAL_ID
            },
            dataType: "json",
            type: "POST",
            success: function (result) {

                if (result.StatusOnDb === true) 
                {                    
                    msgBox.Fn_SuccessMessageBox(result.MessageOnDb);
                    
                    Fn_LoadTreePlantMaterial();
    
                    myWin.close();
                }
                else 
                {                  
                    msgBox.Fn_ErrorMessageBox(result.MessageOnDb);
                }
            },
            complete: function () {
                ajaxObj.onreadystatechange = null;
                ajaxObj.abort = null;
            },
            error: function (req, status, error) {
                msgBox.Fn_ErrorMessageBox('Connect server not found !!!');
            }
        });
    };
    
    //--------3 Update --------------------------------//
    this.Fn_Update = function (myWin, rec) {

        var ajaxObj = $.ajax({
            url: urlRoot + "/PlantMaterial/Update",
            data: {
                ModeRun: modeRun,
                OLD_PLANT_ID: rec.OLD_PLANT_ID,
                OLD_MATERIAL_ID: rec.OLD_MATERIAL_ID,
                PLANT_ID: Ext.getCmp('id-ComboPlantName-NewEdit-PlantMaterialPage').selection.data.PLANT_ID,
                MATERIAL_ID: Ext.getCmp('id-ComboMaterialName-NewEdit-PlantMaterialPage').selection.data.MATERIAL_ID
            },
            dataType: "json",
            type: "POST",
            success: function (result) {

                if (result.StatusOnDb === true) {

                    msgBox.Fn_SuccessMessageBox(result.MessageOnDb);

                    Fn_LoadTreePlantMaterial();

                    myWin.close();
                }
                else {
                    msgBox.Fn_ErrorMessageBox(result.MessageOnDb);
                }
            },
            complete: function () {
                ajaxObj.onreadystatechange = null;
                ajaxObj.abort = null;
            },
            error: function (req, status, error) {
                msgBox.Fn_ErrorMessageBox('Connect server not found !!!');
            }
        });
    };
    
    //--------4 Delete --------------------------------//
    this.Fn_Delete = function (myWin, rec) {

        var ajaxObj = $.ajax({
            url: urlRoot + "/PlantMaterial/Delete",
            data: {
                ModeRun: modeRun,
                PLANT_ID: rec.data.PLANT_ID,
                MATERIAL_ID: rec.data.MATERIAL_ID
            },
            dataType: "json",
            type: "POST",
            success: function (result) {

                if (result.StatusOnDb === true) {

                    msgBox.Fn_SuccessMessageBox(result.MessageOnDb);

                    Fn_LoadTreePlantMaterial();

                    myWin.close();
                }
                else {
                    msgBox.Fn_ErrorMessageBox(result.MessageOnDb);
                }
            },
            complete: function () {
                ajaxObj.onreadystatechange = null;
                ajaxObj.abort = null;
            },
            error: function (req, status, error) {
                msgBox.Fn_ErrorMessageBox('Connect server not found !!!');
            }
        });
    };   
    
}




function Cls_PlantAction_Views(urlRoot) {
        
    var msgBox= new Cls_MessageBox_Views();
    
    //--- 1.Search -----------------------------------------------------//
    this.Fn_Search = function () {                         
        Fn_ReloadGrid();
    };

    var Fn_ReloadGrid = function () {

        Ext.getCmp('id-GridPlant-PlantPage').store.reload({
            url: urlRoot + "/Plant/Search",
            params: {
                COMPANY_NAME: Ext.getCmp('id-ComboCompanyName-PlantPage').getValue(),
                SHORT_NAME: '', //Ext.getCmp('id-ComboCompanyShortName-PlantPage').getValue(),
                PLANT_NAME: Ext.getCmp('id-txtPlantName-PlantPage').getValue(),
                ModeRun: modeRun
            },
            callback: function (result, option, evt) {        

            }
        });        

        //=============================================================//
       // Ext.getCmp('id-Pagingbar-PlantPage').moveFirst();
    };

    //--------2 Insert --------------------------------//
    this.Fn_Insert = function (myWin) {

        var ajaxObj = $.ajax({
            url: urlRoot + "/Plant/Insert",
            data: {    
                ModeRun: modeRun,
                COMPANY_ID: Ext.getCmp('id-ComboCompanyName-NewEdit-PlantPage').selection.data.COMPANY_ID,
                PLANT_NAME: Ext.getCmp('id-txtPlantName-NewEdit-PlantPage').getValue(),
                ADDRESS: Ext.getCmp('id-txtPlantAddress-NewEdit-PlantPage').getValue(),
                PHONE_NO: Ext.getCmp('id-txtPlantPhone-NewEdit-PlantPage').getValue(),
                MOBILE_NO: Ext.getCmp('id-txtPlantMobileNo-NewEdit-PlantPage').getValue(),
                FAX_NO: Ext.getCmp('id-txtPlantFaxNo-NewEdit-PlantPage').getValue(),                
                DESCRIPTION: Ext.getCmp('id-txtDescription-NewEdit-PlantPage').getValue(),
                CREATE_USER: Ext.get('lblUserLogOn-HomePage').dom.innerHTML                
            },
            dataType: "json",
            type: "POST",
            success: function (result) {

                if (result.StatusOnDb === true) 
                {                    
                    msgBox.Fn_SuccessMessageBox(result.MessageOnDb);
                    
                    Fn_ReloadGrid();
    
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
            url: urlRoot + "/Plant/Update",
            data: {
                ModeRun: modeRun,
                PLANT_ID: rec.data.PLANT_ID,
                COMPANY_ID: Ext.getCmp('id-ComboCompanyName-NewEdit-PlantPage').selection.data.COMPANY_ID,
                PLANT_NAME: Ext.getCmp('id-txtPlantName-NewEdit-PlantPage').getValue(),
                ADDRESS: Ext.getCmp('id-txtPlantAddress-NewEdit-PlantPage').getValue(),
                PHONE_NO: Ext.getCmp('id-txtPlantPhone-NewEdit-PlantPage').getValue(),
                MOBILE_NO: Ext.getCmp('id-txtPlantMobileNo-NewEdit-PlantPage').getValue(),
                FAX_NO: Ext.getCmp('id-txtPlantFaxNo-NewEdit-PlantPage').getValue(),
                DESCRIPTION: Ext.getCmp('id-txtDescription-NewEdit-PlantPage').getValue(),
                LAST_USER: Ext.get('lblUserLogOn-HomePage').dom.innerHTML
            },
            dataType: "json",
            type: "POST",
            success: function (result) {

                if (result.StatusOnDb === true) {

                    msgBox.Fn_SuccessMessageBox(result.MessageOnDb);

                    Fn_ReloadGrid();

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
    this.Fn_Delete = function (rec) {

        var ajaxObj = $.ajax({
            url: urlRoot + "/Plant/Delete",
            data: {
                ModeRun: modeRun,
                PLANT_ID: rec.data.PLANT_ID               
            },
            dataType: "json",
            type: "POST",
            success: function (result) {

                if (result.StatusOnDb === true) {

                    msgBox.Fn_SuccessMessageBox(result.MessageOnDb);

                    Fn_ReloadGrid();

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



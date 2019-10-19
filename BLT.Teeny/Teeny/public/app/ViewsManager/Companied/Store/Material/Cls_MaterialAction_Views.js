
function Cls_MaterialAction_Views(urlRoot) {
        
    var msgBox= new Cls_MessageBox_Views();
    
    //--- 1.Search -----------------------------------------------------//
    this.Fn_Search = function () {                         
        Fn_ReloadGrid();
    };

    var Fn_ReloadGrid = function () {

        Ext.getCmp('id-GridMaterial-MaterialPage').store.reload({
            url: urlRoot + "/Material/Search",
            params: {
                MATERIAL_TYPE_NAME: Ext.getCmp('id-ComboMaterialTypeName-MaterialPage').getValue(),               
                MATERIAL_NAME: Ext.getCmp('id-txtMaterialName-MaterialPage').getValue(),
                MATERIAL_SIZE: Ext.getCmp('id-txtMaterialSize-MaterialPage').getValue(),
                ModeRun: modeRun
            },
            callback: function (result, option, evt) {        

            }
        });        

        //=============================================================//
       // Ext.getCmp('id-Pagingbar-MaterialPage').moveFirst();
    };

    //--------2 Insert --------------------------------//
    this.Fn_Insert = function (myWin) {

        var ajaxObj = $.ajax({
            url: urlRoot + "/Material/Insert",
            data: {    
                ModeRun: modeRun,
                MATERIAL_TYPE_ID: Ext.getCmp('id-ComboMaterialTypeName-NewEdit-MaterialPage').selection.data.MATERIAL_TYPE_ID,
                MATERIAL_NAME: Ext.getCmp('id-txtMaterialName-NewEdit-MaterialPage').getValue(),
                MATERIAL_SIZE: Ext.getCmp('id-txtMaterialSize-NewEdit-MaterialPage').getValue(),                           
                DESCRIPTION: Ext.getCmp('id-txtDescription-NewEdit-MaterialPage').getValue(),
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
            url: urlRoot + "/Material/Update",
            data: {
                ModeRun: modeRun,
                MATERIAL_ID: rec.data.MATERIAL_ID,
                MATERIAL_TYPE_ID: Ext.getCmp('id-ComboMaterialTypeName-NewEdit-MaterialPage').selection.data.MATERIAL_TYPE_ID,
                MATERIAL_NAME: Ext.getCmp('id-txtMaterialName-NewEdit-MaterialPage').getValue(),
                MATERIAL_SIZE: Ext.getCmp('id-txtMaterialSize-NewEdit-MaterialPage').getValue(),
                DESCRIPTION: Ext.getCmp('id-txtDescription-NewEdit-MaterialPage').getValue(),
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
            url: urlRoot + "/Material/Delete",
            data: {
                ModeRun: modeRun,
                MATERIAL_ID: rec.data.MATERIAL_ID               
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



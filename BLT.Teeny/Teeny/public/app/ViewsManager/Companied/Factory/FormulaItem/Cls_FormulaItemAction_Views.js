
function Cls_FormulaItemAction_Views(urlRoot) {
        
    var msgBox= new Cls_MessageBox_Views();
    
    //--- 1.Search -----------------------------------------------------//
    this.Fn_Search = function () {                         
        Fn_ReloadGrid();
    };

    var Fn_ReloadGrid = function () {

        Ext.getCmp('id-GridFormulaItem-FormulaItemPage').store.reload({
            url: urlRoot + "/FormulaItem/Search",
            params: {       
                FORMULA_NAME: Ext.getCmp('id-ComboFormulaName-FormulaItemPage').getValue(),
                CONCEATE_NAME: Ext.getCmp('id-txtConceateName-FormulaItemPage').getValue(),
                UNIT_NAME: Ext.getCmp('id-ComboUnitName-FormulaItemPage').getValue(), 
                MATERIAL_TYPE_NAME: Ext.getCmp('id-ComboMaterialTypeName-FormulaItemPage').getValue(),
                MATERIAL_NAME: Ext.getCmp('id-ComboMaterialName-FormulaItemPage').getValue(),
                MATERIAL_SIZE: Ext.getCmp('id-txtMaterialSizeName-FormulaItemPage').getValue(),   
                ModeRun: modeRun
            },
            callback: function (result, option, evt) {        

            }
        });        

        //=============================================================//
       // Ext.getCmp('id-Pagingbar-FormulaItemPage').moveFirst();
    };

    //--------2 Insert --------------------------------//
    this.Fn_Insert = function (myWin) {

        var ajaxObj = $.ajax({
            url: urlRoot + "/FormulaItem/Insert",
            data: {    
                ModeRun: modeRun, 
                FORMULA_ID: Ext.getCmp('id-ComboFormulaName-NewEdit-FormulaItemPage').selection.data.FORMULA_ID,
                MATERIAL_ID: Ext.getCmp('id-ComboMaterialName-NewEdit-FormulaItemPage').selection.data.MATERIAL_ID,
                UNIT_ID: Ext.getCmp('id-ComboUnitName-NewEdit-FormulaItemPage').selection.data.UNIT_ID,               
                QUNTITY: Ext.getCmp('id-txtQuntity-NewEdit-FormulaItemPage').getValue(),
                DESCRIPTION: Ext.getCmp('id-txtDescription-NewEdit-FormulaItemPage').getValue(),
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
            url: urlRoot + "/FormulaItem/Update",
            data: {
                ModeRun: modeRun,
                FORMULA_ITEM_ID: rec.data.FORMULA_ITEM_ID,
                FORMULA_ID: Ext.getCmp('id-ComboFormulaName-NewEdit-FormulaItemPage').selection.data.FORMULA_ID,
                MATERIAL_ID: Ext.getCmp('id-ComboMaterialName-NewEdit-FormulaItemPage').selection.data.MATERIAL_ID,
                UNIT_ID: Ext.getCmp('id-ComboUnitName-NewEdit-FormulaItemPage').selection.data.UNIT_ID,
                QUNTITY: Ext.getCmp('id-txtQuntity-NewEdit-FormulaItemPage').getValue(),
                DESCRIPTION: Ext.getCmp('id-txtDescription-NewEdit-FormulaItemPage').getValue(),
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
            url: urlRoot + "/FormulaItem/Delete",
            data: {
                ModeRun: modeRun,
                FORMULA_ITEM_ID: rec.data.FORMULA_ITEM_ID               
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



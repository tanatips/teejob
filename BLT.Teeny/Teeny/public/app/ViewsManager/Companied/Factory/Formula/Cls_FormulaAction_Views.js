
function Cls_FormulaAction_Views(urlRoot) {
        
    var msgBox= new Cls_MessageBox_Views();
    
    //--- 1.Search -----------------------------------------------------//
    this.Fn_Search = function () {                         
        Fn_ReloadGrid();
    };

    var Fn_ReloadGrid = function () {

        Ext.getCmp('id-GridFormula-FormulaPage').store.reload({
            url: urlRoot + "/Formula/Search",
            params: {       
                FORMULA_NAME: Ext.getCmp('id-txtFormulaName-FormulaPage').getValue(),    
                CONCEATE_NAME: Ext.getCmp('id-txtConceateName-FormulaPage').getValue(), 
                ModeRun: modeRun
            },
            callback: function (result, option, evt) {        

            }
        });        

        //=============================================================//
       // Ext.getCmp('id-Pagingbar-FormulaPage').moveFirst();
    };

    //--------2 Insert --------------------------------//
    this.Fn_Insert = function (myWin) {

        var ajaxObj = $.ajax({
            url: urlRoot + "/Formula/Insert",
            data: {    
                ModeRun: modeRun, 
                FORMULA_NAME: Ext.getCmp('id-txtFormulaName-NewEdit-FormulaPage').getValue(),  
                CONCEATE_NAME: Ext.getCmp('id-txtConceateName-NewEdit-FormulaPage').getValue(),
                DESCRIPTION: Ext.getCmp('id-txtDescription-NewEdit-FormulaPage').getValue(),
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
            url: urlRoot + "/Formula/Update",
            data: {
                ModeRun: modeRun,
                FORMULA_ID: rec.data.FORMULA_ID,
                FORMULA_NAME: Ext.getCmp('id-txtFormulaName-NewEdit-FormulaPage').getValue(),
                CONCEATE_NAME: Ext.getCmp('id-txtConceateName-NewEdit-FormulaPage').getValue(),
                DESCRIPTION: Ext.getCmp('id-txtDescription-NewEdit-FormulaPage').getValue(),
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
            url: urlRoot + "/Formula/Delete",
            data: {
                ModeRun: modeRun,
                FORMULA_ID: rec.data.FORMULA_ID               
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



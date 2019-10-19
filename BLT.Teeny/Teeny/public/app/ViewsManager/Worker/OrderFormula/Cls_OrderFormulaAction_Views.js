
function Cls_OrderFormulaAction_Views(urlRoot) {
        
    var msgBox= new Cls_MessageBox_Views();
    
    //--- 1.Search -----------------------------------------------------//

    this.Fn_LoadOrderFormula = function () {

        Fn_LoadTreeOrderFormula();
    };

    var Fn_LoadTreeOrderFormula = function () {

        Ext.getCmp('id-TreeOrderFormula-OrderFormulaPage').store.load({
            url: urlRoot + "/OrderFormula/OrderHaveFormula",
            params: {
                ORDER_NO: Ext.getCmp('id-txtOrderNo-OrderFormulaPage').getValue(),
                FORMULA_NAME: Ext.getCmp('id-ComboFormulaName-OrderFormulaPage').getValue(),
                ModeRun: modeRun
            },
            callback: function () {

                //Ext.getCmp("id-PanelRenderChartSelect-OrderFormulaPage").removeAll();

                //Fn_GetChartConfigBySystem();
            }
        });
    };

    this.Fn_LoadTreeFormulaItemDetail = function (formulaName) {

        Ext.getCmp('id-TreeOrderFormulaItem-OrderFormulaPage').store.load({
            url: urlRoot + "/OrderFormula/GetFormulaItemDetailByFormulaName",
            params: {               
                FORMULA_NAME: formulaName,
                ModeRun: modeRun
            },
            callback: function () {

                //Ext.getCmp("id-PanelRenderChartSelect-OrderFormulaPage").removeAll();

                //Fn_GetChartConfigBySystem();
            }
        });
    };

    //--------2 Insert --------------------------------//
    this.Fn_Insert = function (myWin, rec) {
               
        var ajaxObj = $.ajax({
            url: urlRoot + "/OrderFormula/Insert",
            data: {    
                ModeRun: modeRun,
                ORDER_ID: rec.data.ORDER_ID,
                FORMULA_ID: Ext.getCmp('id-ComboFormulaName-NewEdit-OrderFormulaPage').selection.data.FORMULA_ID
            },
            dataType: "json",
            type: "POST",
            success: function (result) {

                if (result.StatusOnDb === true) 
                {                    
                    msgBox.Fn_SuccessMessageBox(result.MessageOnDb);
                    
                    Fn_LoadTreeOrderFormula();
    
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
            url: urlRoot + "/OrderFormula/Update",
            data: {
                ModeRun: modeRun,
                OLD_ORDER_ID: rec.OLD_ORDER_ID,
                OLD_FORMULA_ID: rec.OLD_FORMULA_ID,
                ORDER_ID: rec.data.ORDER_ID,
                FORMULA_ID: Ext.getCmp('id-ComboFormulaName-NewEdit-OrderFormulaPage').selection.data.FORMULA_ID
            },
            dataType: "json",
            type: "POST",
            success: function (result) {

                if (result.StatusOnDb === true) {

                    msgBox.Fn_SuccessMessageBox(result.MessageOnDb);

                    Fn_LoadTreeOrderFormula();

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
            url: urlRoot + "/OrderFormula/Delete",
            data: {
                ModeRun: modeRun,
                ORDER_ID: rec.data.ORDER_ID,
                FORMULA_ID: rec.data.FORMULA_ID
            },
            dataType: "json",
            type: "POST",
            success: function (result) {

                if (result.StatusOnDb === true) {

                    msgBox.Fn_SuccessMessageBox(result.MessageOnDb);

                    Fn_LoadTreeOrderFormula();

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




function Cls_OrderProductAction_Views(urlRoot) {
        
    var msgBox= new Cls_MessageBox_Views();
    var recOrder = "";

    //--- 1.Search -----------------------------------------------------//

    this.Fn_LoadOrderProduct = function (rec) {

        recOrder = rec;
        Fn_LoadTreeOrderProduct();
    };

    var Fn_LoadTreeOrderProduct = function () {

        Ext.getCmp('id-TreeOrderProduct-OrderProductPage').store.load({
            url: urlRoot + "/OrderProduct/GetOrderProductDetail",
            params: {
                ORDER_NO: Ext.getCmp('id-txtOrderNo-OrderProductPage').getValue(), 
                ORDER_ID: recOrder.data.ORDER_ID,
                REVISION: Ext.getCmp('id-txtRevision-OrderProductPage').getValue(), 
                ModeRun: modeRun
            },
            callback: function () {

                //Ext.getCmp("id-PanelRenderChartSelect-OrderFormulaPage").removeAll();

                //Fn_GetChartConfigBySystem();
            }
        });
    };

    this.Fn_LoadTreeFormulaItemDetail = function (formulaName) {

        Ext.getCmp('id-TreeFormulaItem-OrderProductPage').store.load({
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
            url: urlRoot + "/OrderProduct/Insert",
            data: {    
                ModeRun: modeRun,
                ORDER_ID: rec.data.ORDER_ID,
                PRODUCT_SPEC_ID: Ext.getCmp('id-ComboRevision-NewEdit-OrderProductPage').selection.data.PRODUCT_SPEC_ID,
                STATUS_ID: Ext.getCmp('id-ComboStatusName-NewEdit-OrderProductPage').selection.data.STATUS_ID,
                UNIT_ID: Ext.getCmp('id-ComboUnitName-NewEdit-OrderProductPage').selection.data.UNIT_ID,
                QUNTITY: Ext.getCmp('id-txtQuntity-NewEdit-OrderProductPage').getValue()

            },
            dataType: "json",
            type: "POST",
            success: function (result) {

                if (result.StatusOnDb === true) 
                {                    
                    msgBox.Fn_SuccessMessageBox(result.MessageOnDb);
                    
                    Fn_LoadTreeOrderProduct();
    
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
            url: urlRoot + "/OrderProduct/Update",
            data: {
                ModeRun: modeRun,
                ORDER_ID: recOrder.data.ORDER_ID,
                PRODUCT_SPEC_ID: rec.PRODUCT_SPEC_ID,
                PRODUCT_SPEC_ID: Ext.getCmp('id-ComboRevision-NewEdit-OrderProductPage').selection.data.PRODUCT_SPEC_ID,
                STATUS_ID: Ext.getCmp('id-ComboStatusName-NewEdit-OrderProductPage').selection.data.STATUS_ID,
                UNIT_ID: Ext.getCmp('id-ComboUnitName-NewEdit-OrderProductPage').selection.data.UNIT_ID,
                QUNTITY: Ext.getCmp('id-txtQuntity-NewEdit-OrderProductPage').getValue()

            },
            dataType: "json",
            type: "POST",
            success: function (result) {

                if (result.StatusOnDb === true) {

                    msgBox.Fn_SuccessMessageBox(result.MessageOnDb);

                    Fn_LoadTreeOrderProduct();

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
            url: urlRoot + "/OrderProduct/Delete",
            data: {
                ModeRun: modeRun,
                ORDER_ID: rec.ORDER_ID,
                PRODUCT_SPEC_ID: Ext.getCmp('id-ComboRevision-NewEdit-OrderProductPage').selection.data.PRODUCT_SPEC_ID
            },
            dataType: "json",
            type: "POST",
            success: function (result) {

                if (result.StatusOnDb === true) {

                    msgBox.Fn_SuccessMessageBox(result.MessageOnDb);

                    Fn_LoadTreeOrderProduct();

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



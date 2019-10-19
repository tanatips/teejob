
function Cls_OrderAction_Views(urlRoot) {
        
    var msgBox= new Cls_MessageBox_Views();
    
    //--- 1.Search -----------------------------------------------------//
    this.Fn_Search = function () {                         
        Fn_ReloadGrid();
    };

    var Fn_ReloadGrid = function () {

        Ext.getCmp('id-GridOrder-OrderPage').store.reload({
            url: urlRoot + "/Order/Search",
            params: {               
                CUSTOMER_NAME: Ext.getCmp('id-ComboCustomerName-OrderPage').getValue(),                
                ORDER_NO: Ext.getCmp('id-txtOrderNo-OrderPage').getValue(), 
                STATUS_NAME: Ext.getCmp('id-ComboStatusName-OrderPage').getValue(),    
                ModeRun: modeRun
            },
            callback: function (result, option, evt) {        

            }
        });        

        //=============================================================//
       // Ext.getCmp('id-Pagingbar-OrderPage').moveFirst();
    };

    //--------2 Insert --------------------------------//
    this.Fn_Insert = function (myWin) {

        var ajaxObj = $.ajax({
            url: urlRoot + "/Order/Insert",
            data: {
                ModeRun: modeRun,
                STATUS_ID: Ext.getCmp('id-ComboStatusName-NewEdit-OrderPage').selection.data.STATUS_ID,
                CUSTOMER_ID: Ext.getCmp('id-ComboCustomerName-NewEdit-OrderPage').selection.data.CUSTOMER_ID,
                CUSTOMER_TYPE_ID: Ext.getCmp('id-ComboCustomerType-NewEdit-OrderPage').selection.data.CUSTOMER_TYPE_ID,
                ORDER_PAYMENT_ID: Ext.getCmp('id-ComboOrderPayment-NewEdit-OrderPage').selection.data.ORDER_PAYMENT_ID,
                PROJECT_ID: Ext.getCmp('id-ComboProjectName-NewEdit-OrderPage').selection.data.PROJECT_ID,
                ORDER_NO: Ext.getCmp('id-txtOrderNo-NewEdit-OrderPage').getValue(),
                SHIP_TO_ADDRESS: Ext.getCmp('id-txtShipToAddress-NewEdit-OrderPage').getValue(),
                DISTANCE: Ext.getCmp('id-txtDistance-NewEdit-OrderPage').getValue(),
                DESCRIPTION: Ext.getCmp('id-txtDescription-NewEdit-OrderPage').getValue(),
                CREATE_USER: Ext.get('lblUserLogOn-HomePage').dom.innerHTML
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
    
    //--------3 Update --------------------------------//
    this.Fn_Update = function (myWin, rec) {

        var ajaxObj = $.ajax({
            url: urlRoot + "/Order/Update",
            data: {
                ModeRun: modeRun,
                ORDER_ID: rec.data.ORDER_ID,
                STATUS_ID: Ext.getCmp('id-ComboStatusName-NewEdit-OrderPage').selection.data.STATUS_ID,
                CUSTOMER_ID: Ext.getCmp('id-ComboCustomerName-NewEdit-OrderPage').selection.data.CUSTOMER_ID,
                CUSTOMER_TYPE_ID: Ext.getCmp('id-ComboCustomerType-NewEdit-OrderPage').selection.data.CUSTOMER_TYPE_ID,
                ORDER_PAYMENT_ID: Ext.getCmp('id-ComboOrderPayment-NewEdit-OrderPage').selection.data.ORDER_PAYMENT_ID,
                PROJECT_ID: Ext.getCmp('id-ComboProjectName-NewEdit-OrderPage').selection.data.PROJECT_ID,
                ORDER_NO: Ext.getCmp('id-txtOrderNo-NewEdit-OrderPage').getValue(),
                SHIP_TO_ADDRESS: Ext.getCmp('id-txtShipToAddress-NewEdit-OrderPage').getValue(),
                DISTANCE: Ext.getCmp('id-txtDistance-NewEdit-OrderPage').getValue(),
                DESCRIPTION: Ext.getCmp('id-txtDescription-NewEdit-OrderPage').getValue(),
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
            url: urlRoot + "/Order/Delete",
            data: {
                ModeRun: modeRun,
                ORDER_ID: rec.data.ORDER_ID              
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



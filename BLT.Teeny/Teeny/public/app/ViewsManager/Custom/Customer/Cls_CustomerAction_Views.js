
function Cls_CustomerAction_Views(urlRoot) {
        
    var msgBox= new Cls_MessageBox_Views();
    
    //--- 1.Search -----------------------------------------------------//
    this.Fn_Search = function () {                         
        Fn_ReloadGrid();
    };

    var Fn_ReloadGrid = function () {

        Ext.getCmp('id-GridCustomer-CustomerPage').store.reload({
            url: urlRoot + "/Customer/Search",
            params: {
                CUSTOMER_NAME: Ext.getCmp('id-txtCustomerName-CustomerPage').getValue(),
                SHORT_NAME: Ext.getCmp('id-txtCustomerShortName-CustomerPage').getValue(),
                ModeRun: modeRun
            },
            callback: function (result, option, evt) {        

                var xxx = "";
            }
        });        

        //=============================================================//
       // Ext.getCmp('id-Pagingbar-CustomerPage').moveFirst();
    };

    //--------2 Insert --------------------------------//
    this.Fn_Insert = function (myWin) {
               
        var ajaxObj = $.ajax({
            url: urlRoot + "/Customer/Insert",
            data: {    
                ModeRun: modeRun,
                CUSTOMER_NAME: Ext.getCmp('id-txtCustomerName-NewEdit-CustomerPage').getValue(),
                SHORT_NAME: Ext.getCmp('id-txtCustomerShortName-NewEdit-CustomerPage').getValue(),
                ADDRESS: Ext.getCmp('id-txtAddress-NewEdit-CustomerPage').getValue(),
                PHONE_NO: Ext.getCmp('id-txtPhoneNo-NewEdit-CustomerPage').getValue(),
                MOBILE_NO: Ext.getCmp('id-txtMobileNo-NewEdit-CustomerPage').getValue(),
                FAX_NO: Ext.getCmp('id-txtFaxNo-NewEdit-CustomerPage').getValue(),
                DESCRIPTION: Ext.getCmp('id-txtDescription-NewEdit-CustomerPage').getValue(),
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
            url: urlRoot + "/Customer/Update",
            data: {
                ModeRun: modeRun,
                CUSTOMER_ID: rec.data.CUSTOMER_ID,
                CUSTOMER_NAME: Ext.getCmp('id-txtCustomerName-NewEdit-CustomerPage').getValue(),
                SHORT_NAME: Ext.getCmp('id-txtCustomerShortName-NewEdit-CustomerPage').getValue(),
                ADDRESS: Ext.getCmp('id-txtAddress-NewEdit-CustomerPage').getValue(),
                PHONE_NO: Ext.getCmp('id-txtPhoneNo-NewEdit-CustomerPage').getValue(),
                MOBILE_NO: Ext.getCmp('id-txtMobileNo-NewEdit-CustomerPage').getValue(),
                FAX_NO: Ext.getCmp('id-txtFaxNo-NewEdit-CustomerPage').getValue(),
                DESCRIPTION: Ext.getCmp('id-txtDescription-NewEdit-CustomerPage').getValue(),
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
            url: urlRoot + "/Customer/Delete",
            data: {
                ModeRun: modeRun,
                CUSTOMER_ID: rec.data.CUSTOMER_ID               
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



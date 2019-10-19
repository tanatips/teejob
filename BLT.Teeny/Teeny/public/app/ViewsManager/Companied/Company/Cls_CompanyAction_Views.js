
function Cls_CompanyAction_Views(urlRoot) {
        
    var msgBox= new Cls_MessageBox_Views();
    
    //--- 1.Search -----------------------------------------------------//
    this.Fn_Search = function () {                         
        Fn_ReloadGrid();
    };

    var Fn_ReloadGrid = function () {

        Ext.getCmp('id-GridCompany-CompanyPage').store.reload({
            url: urlRoot + "/Company/Search",
            params: {
                COMPANY_NAME: Ext.getCmp('id-txtCompanyName-CompanyPage').getValue(),
                SHORT_NAME: Ext.getCmp('id-txtShortName-CompanyPage').getValue(),
                ModeRun: modeRun
            },
            callback: function (result, option, evt) {        

                var xxx = "";
            }
        });        

        //=============================================================//
       // Ext.getCmp('id-Pagingbar-CompanyPage').moveFirst();
    };

    //--------2 Insert --------------------------------//
    this.Fn_Insert = function (myWin) {
               
        var ajaxObj = $.ajax({
            url: urlRoot + "/Company/Insert",
            data: {    
                ModeRun: modeRun,
                COMPANY_NAME: Ext.getCmp('id-txtCompanyName-NewEdit-CompanyPage').getValue(),
                SHORT_NAME: Ext.getCmp('id-txtShortName-NewEdit-CompanyPage').getValue(),
                ADDRESS: Ext.getCmp('id-txtAddress-NewEdit-CompanyPage').getValue(),
                PHONE_NO: Ext.getCmp('id-txtPhoneNo-NewEdit-CompanyPage').getValue(),
                MOBILE_NO: Ext.getCmp('id-txtMobileNo-NewEdit-CompanyPage').getValue(),
                FAX_NO: Ext.getCmp('id-txtFaxNo-NewEdit-CompanyPage').getValue(),
                DESCRIPTION: Ext.getCmp('id-txtDescription-NewEdit-CompanyPage').getValue(),
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
            url: urlRoot + "/Company/Update",
            data: {
                ModeRun: modeRun,
                COMPANY_ID: rec.data.COMPANY_ID,
                COMPANY_NAME: Ext.getCmp('id-txtCompanyName-NewEdit-CompanyPage').getValue(),
                SHORT_NAME: Ext.getCmp('id-txtShortName-NewEdit-CompanyPage').getValue(),
                ADDRESS: Ext.getCmp('id-txtAddress-NewEdit-CompanyPage').getValue(),
                PHONE_NO: Ext.getCmp('id-txtPhoneNo-NewEdit-CompanyPage').getValue(),
                MOBILE_NO: Ext.getCmp('id-txtMobileNo-NewEdit-CompanyPage').getValue(),
                FAX_NO: Ext.getCmp('id-txtFaxNo-NewEdit-CompanyPage').getValue(),
                DESCRIPTION: Ext.getCmp('id-txtDescription-NewEdit-CompanyPage').getValue(),
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
            url: urlRoot + "/Company/Delete",
            data: {
                ModeRun: modeRun,
                COMPANY_ID: rec.data.COMPANY_ID               
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




function Cls_DepartmentAction_Views(urlRoot) {
        
    var msgBox= new Cls_MessageBox_Views();
    
    //--- 1.Search -----------------------------------------------------//
    this.Fn_Search = function () {                         
        Fn_ReloadGrid();
    };

    var Fn_ReloadGrid = function () {

        Ext.getCmp('id-GridDepartment-DepartmentPage').store.reload({
            url: urlRoot + "/Department/Search",
            params: {
                DEPARTMENT_NAME: Ext.getCmp('id-txtDepartmentName-DepartmentPage').getValue(),
                ModeRun: modeRun
            },
            callback: function (result, option, evt) {        

            }
        });        

        //=============================================================//
       // Ext.getCmp('id-Pagingbar-DepartmentPage').moveFirst();
    };

    //--------2 Insert --------------------------------//
    this.Fn_Insert = function (myWin) {
               
        var ajaxObj = $.ajax({
            url: urlRoot + "/Department/Insert",
            data: {    
                ModeRun: modeRun,
                DEPARTMENT_NAME: Ext.getCmp('id-txtDepartmentName-NewEdit-DepartmentPage').getValue(),
                PHONE_NO: Ext.getCmp('id-txtPhoneNo-NewEdit-DepartmentPage').getValue(),
                MOBILE_NO: Ext.getCmp('id-txtMobileNo-NewEdit-DepartmentPage').getValue(),
                FAX_NO: Ext.getCmp('id-txtFaxNo-NewEdit-DepartmentPage').getValue(),
                EXT_NO: Ext.getCmp('id-txtExtNo-NewEdit-DepartmentPage').getValue(),
                DESCRIPTION: Ext.getCmp('id-txtDescription-NewEdit-DepartmentPage').getValue(),
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
            url: urlRoot + "/Department/Update",
            data: {
                ModeRun: modeRun,
                DEPARTMENT_ID: rec.data.DEPARTMENT_ID,
                DEPARTMENT_NAME: Ext.getCmp('id-txtDepartmentName-NewEdit-DepartmentPage').getValue(),
                PHONE_NO: Ext.getCmp('id-txtPhoneNo-NewEdit-DepartmentPage').getValue(),
                MOBILE_NO: Ext.getCmp('id-txtMobileNo-NewEdit-DepartmentPage').getValue(),
                FAX_NO: Ext.getCmp('id-txtFaxNo-NewEdit-DepartmentPage').getValue(),
                EXT_NO: Ext.getCmp('id-txtExtNo-NewEdit-DepartmentPage').getValue(),
                DESCRIPTION: Ext.getCmp('id-txtDescription-NewEdit-DepartmentPage').getValue(),
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
            url: urlRoot + "/Department/Delete",
            data: {
                ModeRun: modeRun,
                DEPARTMENT_ID: rec.data.DEPARTMENT_ID               
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



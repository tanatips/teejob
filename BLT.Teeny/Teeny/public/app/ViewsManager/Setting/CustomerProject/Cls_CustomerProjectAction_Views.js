
function Cls_CustomerProjectAction_Views(urlRoot) {
        
    var msgBox= new Cls_MessageBox_Views();
    
    //--- 1.Search -----------------------------------------------------//

    this.Fn_LoadCustomerProject = function () {

        Fn_LoadTreeCustomerProject();
    };

    var Fn_LoadTreeCustomerProject = function () {

        Ext.getCmp('id-TreeCustomerProject-CustomerProjectPage').store.load({
            url: urlRoot + "/CustomerProject/CustomerHaveProject",
            params: {
                CUSTOMER_NAME: Ext.getCmp('id-ComboCustomerName-CustomerProjectPage').getValue(),
                PROJECT_NAME: Ext.getCmp('id-ComboProjectName-CustomerProjectPage').getValue(),
                ModeRun: modeRun
            },
            callback: function () {

                //Ext.getCmp("id-PanelRenderChartSelect-CustomerProjectPage").removeAll();

                //Fn_GetChartConfigBySystem();
            }
        });
    };
       

    //--------2 Insert --------------------------------//
    this.Fn_Insert = function (myWin) {
               
        var ajaxObj = $.ajax({
            url: urlRoot + "/CustomerProject/Insert",
            data: {    
                ModeRun: modeRun,
                CUSTOMER_ID: Ext.getCmp('id-ComboCustomerName-NewEdit-CustomerProjectPage').selection.data.CUSTOMER_ID,
                PROJECT_ID: Ext.getCmp('id-ComboProjectName-NewEdit-CustomerProjectPage').selection.data.PROJECT_ID
            },
            dataType: "json",
            type: "POST",
            success: function (result) {

                if (result.StatusOnDb === true) 
                {                    
                    msgBox.Fn_SuccessMessageBox(result.MessageOnDb);
                    
                    Fn_LoadTreeCustomerProject();
    
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
            url: urlRoot + "/CustomerProject/Update",
            data: {
                ModeRun: modeRun,
                OLD_CUSTOMER_ID: rec.OLD_CUSTOMER_ID,
                OLD_PROJECT_ID: rec.OLD_PROJECT_ID,
                CUSTOMER_ID: Ext.getCmp('id-ComboCustomerName-NewEdit-CustomerProjectPage').selection.data.CUSTOMER_ID,
                PROJECT_ID: Ext.getCmp('id-ComboProjectName-NewEdit-CustomerProjectPage').selection.data.PROJECT_ID
            },
            dataType: "json",
            type: "POST",
            success: function (result) {

                if (result.StatusOnDb === true) {

                    msgBox.Fn_SuccessMessageBox(result.MessageOnDb);

                    Fn_LoadTreeCustomerProject();

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
            url: urlRoot + "/CustomerProject/Delete",
            data: {
                ModeRun: modeRun,
                CUSTOMER_ID: rec.data.CUSTOMER_ID,
                PROJECT_ID: rec.data.PROJECT_ID
            },
            dataType: "json",
            type: "POST",
            success: function (result) {

                if (result.StatusOnDb === true) {

                    msgBox.Fn_SuccessMessageBox(result.MessageOnDb);

                    Fn_LoadTreeCustomerProject();

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



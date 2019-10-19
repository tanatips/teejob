
function Cls_SaleProjectAction_Views(urlRoot) {
        
    var msgBox= new Cls_MessageBox_Views();
    
    //--- 1.Search -----------------------------------------------------//

    this.Fn_LoadSaleProject = function () {

        Fn_LoadTreeSaleProject();
    };

    var Fn_LoadTreeSaleProject = function () {

        Ext.getCmp('id-TreeSaleProject-SaleProjectPage').store.load({
            url: urlRoot + "/SaleProject/SaleHaveProject",
            params: {
                EMPLOYEE_NAME: Ext.getCmp('id-ComboEmployeeName-SaleProjectPage').getValue(),
                PROJECT_NAME: Ext.getCmp('id-ComboProjectName-SaleProjectPage').getValue(),
                ModeRun: modeRun
            },
            callback: function () {

                //Ext.getCmp("id-PanelRenderChartSelect-SaleProjectPage").removeAll();

                //Fn_GetChartConfigBySystem();
            }
        });
    };
       

    //--------2 Insert --------------------------------//
    this.Fn_Insert = function (myWin) {
               
        var ajaxObj = $.ajax({
            url: urlRoot + "/SaleProject/Insert",
            data: {    
                ModeRun: modeRun,
                EMPLOYEE_ID: Ext.getCmp('id-ComboEmployeeName-NewEdit-SaleProjectPage').selection.data.EMPLOYEE_ID,
                PROJECT_ID: Ext.getCmp('id-ComboProjectName-NewEdit-SaleProjectPage').selection.data.PROJECT_ID
            },
            dataType: "json",
            type: "POST",
            success: function (result) {

                if (result.StatusOnDb === true) 
                {                    
                    msgBox.Fn_SuccessMessageBox(result.MessageOnDb);
                    
                    Fn_LoadTreeSaleProject();
    
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
            url: urlRoot + "/SaleProject/Update",
            data: {
                ModeRun: modeRun,
                OLD_EMPLOYEE_ID: rec.OLD_EMPLOYEE_ID,
                OLD_PROJECT_ID: rec.OLD_PROJECT_ID,
                EMPLOYEE_ID: Ext.getCmp('id-ComboEmployeeName-NewEdit-SaleProjectPage').selection.data.EMPLOYEE_ID,
                PROJECT_ID: Ext.getCmp('id-ComboProjectName-NewEdit-SaleProjectPage').selection.data.PROJECT_ID
            },
            dataType: "json",
            type: "POST",
            success: function (result) {

                if (result.StatusOnDb === true) {

                    msgBox.Fn_SuccessMessageBox(result.MessageOnDb);

                    Fn_LoadTreeSaleProject();

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
            url: urlRoot + "/SaleProject/Delete",
            data: {
                ModeRun: modeRun,
                EMPLOYEE_ID: rec.data.EMPLOYEE_ID,
                PROJECT_ID: rec.data.PROJECT_ID
            },
            dataType: "json",
            type: "POST",
            success: function (result) {

                if (result.StatusOnDb === true) {

                    msgBox.Fn_SuccessMessageBox(result.MessageOnDb);

                    Fn_LoadTreeSaleProject();

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



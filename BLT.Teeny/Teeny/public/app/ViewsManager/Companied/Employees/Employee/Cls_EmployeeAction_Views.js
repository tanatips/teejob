
function Cls_EmployeeAction_Views(urlRoot) {
        
    var msgBox= new Cls_MessageBox_Views();
    
    //--- 1.Search -----------------------------------------------------//
    this.Fn_Search = function () {                         
        Fn_ReloadGrid();
    };

    var Fn_ReloadGrid = function () {

        Ext.getCmp('id-GridEmployee-EmployeePage').store.reload({
            url: urlRoot + "/Employee/Search",
            params: {               
                COMPANY_NAME: Ext.getCmp('id-ComboCompanyName-EmployeePage').getValue(),
                SHORT_NAME: "",
                PLANT_NAME: Ext.getCmp('id-ComboPlantName-EmployeePage').getValue(),
                DEPARTMENT_NAME: Ext.getCmp('id-ComboDepartmentName-EmployeePage').getValue(),
                POSITION_NAME: Ext.getCmp('id-ComboPlantName-EmployeePage').getValue(),
                EMPLOYEE_NAME: Ext.getCmp('id-txtEmployeeName-EmployeePage').getValue(),             
                ModeRun: modeRun
            },
            callback: function (result, option, evt) {        

            }
        });        

        //=============================================================//
       // Ext.getCmp('id-Pagingbar-EmployeePage').moveFirst();
    };

    //--------2 Insert --------------------------------//
    this.Fn_Insert = function (myWin) {

        var ajaxObj = $.ajax({
            url: urlRoot + "/Employee/Insert",
            data: {    
                ModeRun: modeRun,               
                PLANT_ID: Ext.getCmp('id-ComboPlantName-NewEdit-EmployeePage').selection.data.PLANT_ID,
                POSITION_ID: Ext.getCmp('id-ComboPositionName-NewEdit-EmployeePage').selection.data.POSITION_ID,
                EMPLOYEE_NAME: Ext.getCmp('id-txtEmployeeName-NewEdit-EmployeePage').getValue(),
                DESCRIPTION: Ext.getCmp('id-txtDescription-NewEdit-EmployeePage').getValue(),
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
            url: urlRoot + "/Employee/Update",
            data: {
                ModeRun: modeRun,
                EMPLOYEE_ID: rec.data.EMPLOYEE_ID,
                PLANT_ID: Ext.getCmp('id-ComboPlantName-NewEdit-EmployeePage').selection.data.PLANT_ID,
                POSITION_ID: Ext.getCmp('id-ComboPositionName-NewEdit-EmployeePage').selection.data.POSITION_ID,
                EMPLOYEE_NAME: Ext.getCmp('id-txtEmployeeName-NewEdit-EmployeePage').getValue(),
                DESCRIPTION: Ext.getCmp('id-txtDescription-NewEdit-EmployeePage').getValue(),
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
            url: urlRoot + "/Employee/Delete",
            data: {
                ModeRun: modeRun,
                EMPLOYEE_ID: rec.data.EMPLOYEE_ID               
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



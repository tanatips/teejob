
function Cls_PositionAction_Views(urlRoot) {
        
    var msgBox= new Cls_MessageBox_Views();
    
    //--- 1.Search -----------------------------------------------------//
    this.Fn_Search = function () {                         
        Fn_ReloadGrid();
    };

    var Fn_ReloadGrid = function () {

        Ext.getCmp('id-GridPosition-PositionPage').store.reload({
            url: urlRoot + "/Position/Search",
            params: {
                DEPARTMENT_NAME: Ext.getCmp('id-ComboDepartmentName-PositionPage').getValue(),
                POSITION_NAME: Ext.getCmp('id-txtPositionName-PositionPage').getValue(),
                ModeRun: modeRun
            },
            callback: function (result, option, evt) {        

            }
        });        

        //=============================================================//
       // Ext.getCmp('id-Pagingbar-PositionPage').moveFirst();
    };

    //--------2 Insert --------------------------------//
    this.Fn_Insert = function (myWin) {

        var ajaxObj = $.ajax({
            url: urlRoot + "/Position/Insert",
            data: {    
                ModeRun: modeRun,
                DEPARTMENT_ID: Ext.getCmp('id-ComboDepartmentName-NewEdit-PositionPage').selection.data.DEPARTMENT_ID,
                POSITION_NAME: Ext.getCmp('id-txtPositionName-NewEdit-PositionPage').getValue(),                
                DESCRIPTION: Ext.getCmp('id-txtDescription-NewEdit-PositionPage').getValue(),
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
            url: urlRoot + "/Position/Update",
            data: {
                ModeRun: modeRun,
                POSITION_ID: rec.data.POSITION_ID,
                DEPARTMENT_ID: Ext.getCmp('id-ComboDepartmentName-NewEdit-PositionPage').selection.data.DEPARTMENT_ID,
                POSITION_NAME: Ext.getCmp('id-txtPositionName-NewEdit-PositionPage').getValue(),
                DESCRIPTION: Ext.getCmp('id-txtDescription-NewEdit-PositionPage').getValue(),
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
            url: urlRoot + "/Position/Delete",
            data: {
                ModeRun: modeRun,
                POSITION_ID: rec.data.POSITION_ID               
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



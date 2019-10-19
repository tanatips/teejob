
function Cls_ProjectJobSiteAction_Views(urlRoot) {
        
    var msgBox= new Cls_MessageBox_Views();
    
    //--- 1.Search -----------------------------------------------------//

    this.Fn_LoadProjectJobSite = function () {

        Fn_LoadTreeProjectJobSite();
    };

    var Fn_LoadTreeProjectJobSite = function () {

        Ext.getCmp('id-TreeProjectJobSite-ProjectJobSitePage').store.load({
            url: urlRoot + "/ProjectJobSite/ProjectHaveJobSite",
            params: {                
                PROJECT_NAME: Ext.getCmp('id-ComboProjectName-ProjectJobSitePage').getValue(),
                JOBSITE_NAME: Ext.getCmp('id-ComboJobSiteName-ProjectJobSitePage').getValue(),
                ModeRun: modeRun
            },
            callback: function () {

                //Ext.getCmp("id-PanelRenderChartSelect-ProjectJobSitePage").removeAll();

                //Fn_GetChartConfigBySystem();
            }
        });
    };
       

    //--------2 Insert --------------------------------//
    this.Fn_Insert = function (myWin) {
               
        var ajaxObj = $.ajax({
            url: urlRoot + "/ProjectJobSite/Insert",
            data: {    
                ModeRun: modeRun,               
                PROJECT_ID: Ext.getCmp('id-ComboProjectName-NewEdit-ProjectJobSitePage').selection.data.PROJECT_ID,
                JOBSITE_ID: Ext.getCmp('id-ComboJobSiteName-NewEdit-ProjectJobSitePage').selection.data.JOBSITE_ID
            },
            dataType: "json",
            type: "POST",
            success: function (result) {

                if (result.StatusOnDb === true) 
                {                    
                    msgBox.Fn_SuccessMessageBox(result.MessageOnDb);
                    
                    Fn_LoadTreeProjectJobSite();
    
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
            url: urlRoot + "/ProjectJobSite/Update",
            data: {
                ModeRun: modeRun,
                OLD_PROJECT_ID: rec.OLD_PROJECT_ID,
                OLD_JOBSITE_ID: rec.OLD_JOBSITE_ID,                              
                PROJECT_ID: Ext.getCmp('id-ComboProjectName-NewEdit-ProjectJobSitePage').selection.data.PROJECT_ID,
                JOBSITE_ID: Ext.getCmp('id-ComboJobSiteName-NewEdit-ProjectJobSitePage').selection.data.JOBSITE_ID
            
            },
            dataType: "json",
            type: "POST",
            success: function (result) {

                if (result.StatusOnDb === true) {

                    msgBox.Fn_SuccessMessageBox(result.MessageOnDb);

                    Fn_LoadTreeProjectJobSite();

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
            url: urlRoot + "/ProjectJobSite/Delete",
            data: {
                ModeRun: modeRun,
                JOBSITE_ID: rec.data.JOBSITE_ID,
                PROJECT_ID: rec.data.PROJECT_ID
            },
            dataType: "json",
            type: "POST",
            success: function (result) {

                if (result.StatusOnDb === true) {

                    msgBox.Fn_SuccessMessageBox(result.MessageOnDb);

                    Fn_LoadTreeProjectJobSite();

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




function Cls_TruckAction_Views(urlRoot) {
        
    var msgBox= new Cls_MessageBox_Views();
    
    //--- 1.Search -----------------------------------------------------//
    this.Fn_Search = function () {                         
        Fn_ReloadGrid();
    };

    var Fn_ReloadGrid = function () {

        Ext.getCmp('id-GridTruck-TruckPage').store.reload({
            url: urlRoot + "/Truck/Search",
            params: {               
                COMPANY_NAME: Ext.getCmp('id-ComboCompanyName-TruckPage').getValue(),
                SHORT_NAME: "",
                PLANT_NAME: Ext.getCmp('id-ComboPlantName-TruckPage').getValue(),                
                TRUCK_NAME: Ext.getCmp('id-txtTruckName-TruckPage').getValue(),  
                TRUCK_NO: Ext.getCmp('id-txtTruckNo-TruckPage').getValue(),
                ModeRun: modeRun
            },
            callback: function (result, option, evt) {        

            }
        });        

        //=============================================================//
       // Ext.getCmp('id-Pagingbar-TruckPage').moveFirst();
    };

    //--------2 Insert --------------------------------//
    this.Fn_Insert = function (myWin) {

        var ajaxObj = $.ajax({
            url: urlRoot + "/Truck/Insert",
            data: {    
                ModeRun: modeRun,      
                PLANT_ID: Ext.getCmp('id-ComboPlantName-NewEdit-TruckPage').selection.data.PLANT_ID,                
                TRUCK_NAME: Ext.getCmp('id-txtTruckName-NewEdit-TruckPage').getValue(),
                TRUCK_NO: Ext.getCmp('id-txtTruckNo-NewEdit-TruckPage').getValue(),
                TRUCK_SIZE: Ext.getCmp('id-txtTruckSize-NewEdit-TruckPage').getValue(),
                TRUCK_CAPACITY: Ext.getCmp('id-txtTruckCapacity-NewEdit-TruckPage').getValue(),
                CAPACITY_UNIT: Ext.getCmp('id-txtTruckCapacityUnit-NewEdit-TruckPage').getValue(),
                DESCRIPTION: Ext.getCmp('id-txtDescription-NewEdit-TruckPage').getValue(),
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
            url: urlRoot + "/Truck/Update",
            data: {
                ModeRun: modeRun,
                TRUCK_ID: rec.data.TRUCK_ID,
                PLANT_ID: Ext.getCmp('id-ComboPlantName-NewEdit-TruckPage').selection.data.PLANT_ID,
                TRUCK_NAME: Ext.getCmp('id-txtTruckName-NewEdit-TruckPage').getValue(),
                TRUCK_NO: Ext.getCmp('id-txtTruckNo-NewEdit-TruckPage').getValue(),
                TRUCK_SIZE: Ext.getCmp('id-txtTruckSize-NewEdit-TruckPage').getValue(),
                TRUCK_CAPACITY: Ext.getCmp('id-txtTruckCapacity-NewEdit-TruckPage').getValue(),
                CAPACITY_UNIT: Ext.getCmp('id-txtTruckCapacityUnit-NewEdit-TruckPage').getValue(),
                DESCRIPTION: Ext.getCmp('id-txtDescription-NewEdit-TruckPage').getValue(),
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
            url: urlRoot + "/Truck/Delete",
            data: {
                ModeRun: modeRun,
                TRUCK_ID: rec.data.TRUCK_ID               
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




function Cls_ShipmentAction_Views(urlRoot) {
        
    var msgBox= new Cls_MessageBox_Views();
    
    //--- 1.Search -----------------------------------------------------//
    this.Fn_Search = function () {                         
        Fn_ReloadGrid();
    };

    var Fn_ReloadGrid = function () {

        Ext.getCmp('id-GridShipment-ShipmentPage').store.reload({
            url: urlRoot + "/Shipment/Search",
            params: {               
                CUSTOMER_NAME: Ext.getCmp('id-ComboCustomerName-ShipmentPage').getValue(),   
                ORDER_NO: Ext.getCmp('id-ComboOrderNo-ShipmentPage').getValue(),  
                JOBSITE_NAME: Ext.getCmp('id-ComboJobSiteName-ShipmentPage').getValue(),
                STATUS_NAME: Ext.getCmp('id-ComboStatusName-ShipmentPage').getValue(),
                EMPLOYEE_NAME: Ext.getCmp('id-ComboEmployeeName-ShipmentPage').getValue(),
                TRUCK_NO: Ext.getCmp('id-ComboTruckNo-ShipmentPage').getValue(),
                SHIPMENT_NO: Ext.getCmp('id-txtShipmentNo-ShipmentPage').getValue(),               
                StartShipmentDate: Ext.getCmp('id-txtStartShipmentDate-ShipmentPage').getRawValue(),  
                EndShipmentDate: Ext.getCmp('id-txtEndShipmentDate-ShipmentPage').getRawValue(), 
                ModeRun: modeRun
            },
            callback: function (result, option, evt) {        

            }
        });        

        //=============================================================//
       // Ext.getCmp('id-Pagingbar-ShipmentPage').moveFirst();
    };

    //--------2 Insert --------------------------------//
    this.Fn_Insert = function (myWin) {

        var ajaxObj = $.ajax({
            url: urlRoot + "/Shipment/Insert",
            data: {    
                ModeRun: modeRun,    
                ORDER_ID: Ext.getCmp('id-ComboOrderNo-NewEdit-ShipmentPage').selection.data.ORDER_ID,
                JOBSITE_ID: Ext.getCmp('id-ComboJobSiteName-NewEdit-ShipmentPage').selection.data.JOBSITE_ID,
                STATUS_ID: Ext.getCmp('id-ComboStatusName-NewEdit-ShipmentPage').selection.data.STATUS_ID,
                EMPLOYEE_ID: Ext.getCmp('id-ComboEmployeeName-NewEdit-ShipmentPage').selection.data.EMPLOYEE_ID,
                TRUCK_ID: Ext.getCmp('id-ComboTruckNo-NewEdit-ShipmentPage').selection.data.TRUCK_ID,

                SHIPMENT_NO: Ext.getCmp('id-txtShipmentNo-NewEdit-ShipmentPage').getValue(),
                SHIPMENT_DATE: Ext.getCmp('id-txtShipmentDate-NewEdit-ShipmentPage').getRawValue(),
                SHIP_TO_ADDRESS: Ext.getCmp('id-txtShipToAddress-NewEdit-ShipmentPage').getValue(), 
                DESCRIPTION: Ext.getCmp('id-txtDescription-NewEdit-ShipmentPage').getValue(),

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
            url: urlRoot + "/Shipment/Update",
            data: {
                ModeRun: modeRun,
                SHIPMENT_ID: rec.data.SHIPMENT_ID,

                ORDER_ID: Ext.getCmp('id-ComboOrderNo-NewEdit-ShipmentPage').selection.data.ORDER_ID,
                JOBSITE_ID: Ext.getCmp('id-ComboJobSiteName-NewEdit-ShipmentPage').selection.data.JOBSITE_ID,
                STATUS_ID: Ext.getCmp('id-ComboStatusName-NewEdit-ShipmentPage').selection.data.STATUS_ID,
                EMPLOYEE_ID: Ext.getCmp('id-ComboEmployeeName-NewEdit-ShipmentPage').selection.data.EMPLOYEE_ID,
                TRUCK_ID: Ext.getCmp('id-ComboTruckNo-NewEdit-ShipmentPage').selection.data.TRUCK_ID,

                SHIPMENT_NO: Ext.getCmp('id-txtShipmentNo-NewEdit-ShipmentPage').getValue(),
                SHIPMENT_DATE: Ext.getCmp('id-txtShipmentDate-NewEdit-ShipmentPage').getRawValue(),
                SHIP_TO_ADDRESS: Ext.getCmp('id-txtShipToAddress-NewEdit-ShipmentPage').getValue(),
                DESCRIPTION: Ext.getCmp('id-txtDescription-NewEdit-ShipmentPage').getValue(),

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
            url: urlRoot + "/Shipment/Delete",
            data: {
                ModeRun: modeRun,
                SHIPMENT_ID: rec.data.SHIPMENT_ID              
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

    //--------5 Load Data To Machine --------------------------------//
    this.Fn_LoadDataToMachine = function () {

        var ajaxObj = $.ajax({
            url: urlRoot + "/Shipment/SendDataToMachine",
            data: {
                ModeRun: modeRun,
                CUSTOMER_NAME: Ext.getCmp("id-ComboCustomerName-LoadToMachine-ShipmentPage").getRawValue(),
                ORDER_NO: Ext.getCmp("id-ComboOrderNo-LoadToMachine-ShipmentPage").getRawValue(),
                FORMOLA_NAME: Ext.getCmp("id-ComboFormulaName-LoadToMachine-ShipmentPage").getRawValue(),
                DESCRIPTION: Ext.getCmp("id-txtDescription-LoadToMachine-ShipmentPage").getValue()
            },
            dataType: "json",
            type: "POST",
            success: function (result) {

                if (result.StatusOnDb === true) {

                    msgBox.Fn_SuccessMessageBox(result.MessageOnDb);

                   // myWin.close();
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



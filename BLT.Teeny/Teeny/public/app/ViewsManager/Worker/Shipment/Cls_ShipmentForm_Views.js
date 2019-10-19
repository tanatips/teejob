/// <reference path="../../../ViewsScript/MyLibary/Cls_MessageBox_Views.js" />

function Cls_ShipmentForm_Views(urlRoot) {
       
    var shipmentAction = new Cls_ShipmentAction_Views(urlRoot);

    var msgBox = new Cls_MessageBox_Views();
    var commonUI = new Cls_CommonUI_Views(urlRoot);
    
    //*******************//
    var panelContent;
    //*******************//

    //-----------------------------------------------------//
    var limitPage = 100;

    //----1. Render Content Search  -----------------------------------//
    this.Fn_RenderContentSearch = function () {

        var panel = Ext.create('Ext.form.Panel', {
            bodyStyle: 'background:#EAF2F8',
            //style: 'margin-top:5px;',
            border: false,
            frame: false,
            layout: 'column',
            //layout: 'anchor',    
            items: [{
                xtype: 'panel',
                // title: '1',
                bodyStyle: 'background:#EAF2F8',
                columnWidth: 0.333,
                border: false,
                frame: false,
                margin: '1 1 1 1',
                items: [{
                    xtype: 'panel',
                    bodyStyle: 'background:#EAF2F8',
                    border: false,
                    frame: false,
                    margin: '1 1 1 1',
                    //height: 35,  
                    layout: 'hbox',
                    items: commonUI.Fn_CreateComboBoxOnFormPanel(
                        '/Customer/GetCustomerAll',
                        'id-ComboCustomerName-ShipmentPage',
                        'Customer Name', 100, 420),
                    listeners: {
                        afterrender: function (myPanel, event) {

                            Ext.getCmp("id-ComboCustomerName-ShipmentPage").on("select", function () {

                                Ext.getCmp("id-ComboOrderNo-ShipmentPage").store.load({
                                    params: {
                                        CUSTOMER_ID: Ext.getCmp("id-ComboCustomerName-ShipmentPage").selection.data.CUSTOMER_ID,
                                        ModeRun: modeRun
                                    },
                                    callback: function () {
                                    }
                                });
                            });
                        }
                    }

                }, {
                    xtype: 'panel',
                    bodyStyle: 'background:#EAF2F8',
                    border: false,
                    frame: false,
                    margin: '1 1 1 1',
                    layout: 'hbox',
                    items: commonUI.Fn_CreateComboBoxOnFormPanelNotLoad(
                        '/Order/GetOrderByCustomer',
                        'id-ComboOrderNo-ShipmentPage',
                        'Order No', 100, 420),
                    listeners: {
                        afterrender: function (myPanel, event) {
                        }
                    }

                }, {
                    xtype: 'textfield',
                    id: 'id-txtShipmentNo-ShipmentPage',
                    margin: '1 1 1 1',
                    width: 420,
                    labelWidth: 100,
                    fieldLabel: 'Shipment No'

                }, {
                    xtype: 'datefield',
                    id: 'id-txtStartShipmentDate-ShipmentPage',
                    margin: '1 1 1 1',
                    width: '70%',
                    labelWidth: 100,
                    format: 'd/m/Y',
                    value: new Date(),
                    fieldLabel: 'Start Date'
                }]

            }, {
                xtype: 'panel',
                // title: '2',
                bodyStyle: 'background:#EAF2F8',
                columnWidth: 0.333,
                border: false,
                frame: false,
                margin: '1 1 1 1',
                items: [{
                    xtype: 'panel',
                    bodyStyle: 'background:#EAF2F8',
                    border: false,
                    frame: false,
                    margin: '1 1 1 1',
                    layout: 'hbox',
                    items: commonUI.Fn_CreateComboBoxOnFormPanel(
                        '/StatusGroup/GetStatusGroupAll',
                        'id-ComboStatusGroupName-ShipmentPage',
                        'Status Group', 100, 420),
                    listeners: {
                        afterrender: function (myPanel, event) {

                            Ext.getCmp("id-ComboStatusGroupName-ShipmentPage").on("select", function () {

                                Ext.getCmp("id-ComboStatusName-ShipmentPage").store.load({
                                    params: {
                                        STATUS_GROUP_ID: Ext.getCmp("id-ComboStatusGroupName-ShipmentPage").selection.data.STATUS_GROUP_ID,
                                        ModeRun: modeRun
                                    },
                                    callback: function () {
                                    }
                                });
                            });

                        }
                    }

                }, {
                    xtype: 'panel',
                    bodyStyle: 'background:#EAF2F8',
                    border: false,
                    frame: false,
                    margin: '1 1 1 1',
                    layout: 'hbox',
                    items: commonUI.Fn_CreateComboBoxOnFormPanelNotLoad(
                        '/Status/GetStatusByGroup',
                        'id-ComboStatusName-ShipmentPage',
                        'Shipment Status', 100, 420),
                    listeners: {
                        afterrender: function (myPanel, event) {
                        }
                    }

                }, {
                    xtype: 'panel',
                    bodyStyle: 'background:#EAF2F8',
                    border: false,
                    frame: false,
                    margin: '1 1 1 1',
                    layout: 'hbox',
                    items: commonUI.Fn_CreateComboBoxOnFormPanel(
                        '/JobSite/GetJobSiteAll',
                        'id-ComboJobSiteName-ShipmentPage',
                        'Job Site', 100, 420),
                    listeners: {
                        afterrender: function (myPanel, event) {
                        }
                    }

                }, {
                    xtype: 'datefield',
                    id: 'id-txtEndShipmentDate-ShipmentPage',
                    margin: '1 1 1 1',
                    width: '70%',
                    labelWidth: 100,
                    format: 'd/m/Y',
                    value: new Date(),
                    fieldLabel: 'End Date'
                }]

            }, {
                xtype: 'panel',
                // title: '3',
                bodyStyle: 'background:#EAF2F8',
                columnWidth: 0.333,
                border: false,
                frame: false,
                margin: '1 1 1 1',
                items: [{
                    xtype: 'panel',
                    bodyStyle: 'background:#EAF2F8',
                    border: false,
                    frame: false,
                    margin: '1 1 1 1',
                    layout: 'hbox',
                    items: commonUI.Fn_CreateComboBoxOnFormPanel(
                        '/Position/GetPositionAll',
                        'id-ComboPositionName-ShipmentPage',
                        'Position', 90, 420),
                    listeners: {
                        afterrender: function (myPanel, event) {

                            Ext.getCmp("id-ComboPositionName-ShipmentPage").on("select", function () {

                                Ext.getCmp("id-ComboEmployeeName-ShipmentPage").store.load({
                                    params: {
                                        POSITION_ID: Ext.getCmp("id-ComboPositionName-ShipmentPage").selection.data.POSITION_ID,
                                        ModeRun: modeRun
                                    },
                                    callback: function () {
                                    }
                                });
                            });
                        }
                    }

                }, {
                    xtype: 'panel',
                    bodyStyle: 'background:#EAF2F8',
                    border: false,
                    frame: false,
                    margin: '1 1 1 1',
                    layout: 'hbox',
                    items: commonUI.Fn_CreateComboBoxOnFormPanelNotLoad(
                        '/Employee/GetEmployeeByPosition',
                        'id-ComboEmployeeName-ShipmentPage',
                        'Driver Name', 90, 420),
                    listeners: {
                        afterrender: function (myPanel, event) {
                        }
                    }
                }, {

                    xtype: 'panel',
                    bodyStyle: 'background:#EAF2F8',
                    border: false,
                    frame: false,
                    margin: '1 1 1 1',
                    layout: 'hbox',
                    items: commonUI.Fn_CreateComboBoxOnFormPanel(
                        '/Truck/GetTruckAll',
                        'id-ComboTruckNo-ShipmentPage',
                        'Truck No', 90, 420),
                    listeners: {
                        afterrender: function (myPanel, event) {
                        }
                    }
                }]
            }]
        });

        return panel;
    };

    //----2. Set PanelContent ------------------------------------------//
    this.Fn_SetPanelContent = function (renderContent) {

        panelContent = renderContent;
    };

    //----3. Render Button Control  -----------------------------------//
    this.Fn_RenderButtonControl = function () {

        var toolBar = Ext.create('Ext.toolbar.Toolbar', {
            frame: true,
            style: 'background:#EAF2F8',
            items: [{
                xtype: 'button',
                text: 'Search',
                iconCls: 'search',
                cls: 'my-btn1',
                style: 'background:#D7DBDD;',
                //bodyStyle: 'background:red',
                frame: true,
                border: true,
                width: 90,
                // height: 27,
                handler: function () {

                    var startShipmentDate = Ext.getCmp('id-txtStartShipmentDate-ShipmentPage').getRawValue();
                    var endShipmentDate = Ext.getCmp('id-txtEndShipmentDate-ShipmentPage').getRawValue();

                    if (startShipmentDate !== "" && endShipmentDate !== "") {

                        shipmentAction.Fn_Search();
                    }
                    else {

                        msgBox.Fn_ErrorMessageBox("Please Enter Date");
                    }
                }

            }, '|', {
                xtype: 'button',
                text: 'New',
                iconCls: 'new',
                cls: 'my-btn1',
                style: 'background:#D7DBDD;',
                //bodyStyle: 'background:red',                    
                frame: true,
                border: true,
                width: 90,
                // height: 27,
                handler: function () {
                    Fn_PopupWindowNewEdit("New", "");
                }

                }, '|', {
                    xtype: 'button',
                    text: 'Loader',
                    iconCls: 'bookred',
                    cls: 'my-btn1',
                    style: 'background:#D7DBDD;',
                    //bodyStyle: 'background:red',                    
                    frame: true,
                    border: true,
                    width: 90,
                    // height: 27,
                    handler: function () {

                        Fn_PopupWindowLoadDataToMachine();
                    }

            }]
        });
        return toolBar;
    };

    //--- 4.Show Grid  -----------------------------------//
    this.Fn_ShowGrid = function () {

        //----- Create Store ------------//
        var myStore = Ext.create('Ext.data.Store', {
            id: 'id-storeOrder-OrderPage',
            pageSize: limitPage,
            autoLoad: false,
            autoDestory: true,
            fields: [
                { name: 'No' },      
                
                { name: 'CUSTOMER_ID' },
                { name: 'CUSTOMER_NAME' },

                { name: 'ORDER_ID' },
                { name: 'ORDER_NO' },

                { name: 'POSITION_ID' },
                { name: 'POSITION_NAME' },
                { name: 'EMPLOYEE_ID' },
                { name: 'EMPLOYEE_NAME' },

                { name: 'TRUCK_ID' },
                { name: 'TRUCK_NAME' },

                { name: 'JOBSITE_ID' },
                { name: 'JOBSITE_NAME' },

                { name: 'STATUS_GROUP_ID' },
                { name: 'STATUS_GROUP_NAME' },
                { name: 'STATUS_ID' },
                { name: 'STATUS_NAME' },

                { name: 'SHIPMENT_ID' },
                { name: 'SHIPMENT_NO' },
                { name: 'SHIPMENT_DATE' },  
                { name: 'SHIP_TO_ADDRESS' },
                { name: 'DESCRIPTION' },

                { name: 'CREATE_USER' },
                { name: 'LAST_USER' },
                { name: 'CREATE_DATE' },
                { name: 'LAST_DATE' }
            ],
            proxy: {
                type: 'ajax',
                url: urlRoot + "/Shipment/Search",
                actionMethods: {
                    create: 'POST',
                    read: 'POST',
                    update: 'POST',
                    destroy: 'POST'
                },
                reader: {
                    type: 'json',
                    root: 'data',
                    totalProperty: 'totalCount'
                }
            }
        });


        //----- Create Grid ------------//

        var myGrid = Ext.create('Ext.grid.Panel', {
            id: 'id-GridShipment-ShipmentPage',
            autoDestory: true,
            store: myStore,
            // title: 'Province List',
            height: Ext.getBody().getViewSize().height - 350,
            viewConfig: {
                forceFit: false,
                enableRowBody: false,
                showPreview: true,
                getRowClass: function (record, index, rowParams) {

                    //           if (record.data.EVENT_ON_STATION != "เหตุการณ์ปกติ" && record.data.EVENT_ON_STATION != "ปกติ") {
                    //                return 'row-yellow';
                    //            }

                }
            },
            plugins: [
                Ext.create('Ext.grid.plugin.CellEditing', {
                    clicksToEdit: 2
                })
            ],
            selModel: {
                selType: 'checkboxmodel',
                checkOnly: false,
                // mode: "single"
                mode: "multi"
                // selectByOrder: Ext.emptyFn
            },
            columns: [
                { header: 'No.', width: 50, sortable: true, dataIndex: 'No' },
                {
                    xtype: 'actioncolumn',
                    header: 'Edit',
                    align: 'center',
                    width: 70,
                    iconCls: 'edit',
                    tooltip: 'Edit',
                    handler: function (grid, rowIndex, colIndex) {
                        grid.getSelectionModel().select(rowIndex);
                        var rec = grid.store.getAt(rowIndex);
                        Fn_PopupWindowNewEdit("Edit", rec);
                    }
                },
                {
                    xtype: 'actioncolumn',
                    header: 'Delete',
                    align: 'center',
                    width: 70,
                    iconCls: 'delete',
                    tooltip: 'Delete',
                    handler: function (grid, rowIndex, colIndex) {

                        grid.getSelectionModel().select(rowIndex);
                        var rec = grid.store.getAt(rowIndex);

                        Ext.MessageBox.show({
                            title: 'Confirm',
                            icon: Ext.MessageBox.QUESTION,
                            msg: 'Do you want to Delete?',
                            buttons: Ext.MessageBox.YESNO,
                            fn: function (btn, text) {
                                if (btn === 'yes') {

                                    shipmentAction.Fn_Delete(rec);
                                }
                            }
                        });
                    }                
                },                  
                { header: 'Customer', width: 200, sortable: true, hidden: false, dataIndex: 'CUSTOMER_NAME' }, 
                { header: 'Order No', width: 200, sortable: true, hidden: false, dataIndex: 'ORDER_NO' },  
                { header: 'Shipment No', width: 200, sortable: true, hidden: false, dataIndex: 'SHIPMENT_NO' },                             
                { header: 'Shipment Status', width: 200, sortable: true, hidden: false, dataIndex: 'STATUS_NAME' },  
                { header: 'Shipment Date', width: 200, sortable: true, hidden: false, dataIndex: 'SHIPMENT_DATE' },
                { header: 'Ship To Address', width: 300, sortable: true, hidden: false, dataIndex: 'SHIP_TO_ADDRESS' },
                { header: 'Description', width: 600, sortable: true, hidden: false, dataIndex: 'DESCRIPTION' },

                { header: 'User Create', width: 100, sortable: true, hidden: false, dataIndex: 'CREATE_USER' },
                { header: 'User Update', width: 100, sortable: true, hidden: false, dataIndex: 'LAST_USER' },
                { header: 'Date Create', width: 100, sortable: true, hidden: false, dataIndex: 'CREATE_DATE' },
                { header: 'Date Update', width: 100, sortable: true, hidden: false, dataIndex: 'LAST_DATE' }
            ],
            listeners: {
                'beforerender': function (grid) {
                },
                'select': function (grid, rec, rowId, opt) {

                    /*
                    if (processSelection == false) {

                    if (rec.data.PROCESS_STATUS == "Waiting Review") {

                    Ext.getCmp('id-GridCandidateDetail-CandidatePage').getSelectionModel().deselect(rowId, true);

                    msgBox.Fn_ErrorMessageBox("คุณต้องเข้ากระบวนการทำ Process ก่อนถึงจะเลือกข้อมูลนี้ได้", "");
                    }
                    }

                    processSelection = false;
                    */

                }
            },
            bbar: Ext.create('Ext.PagingToolbar', {
                id: 'id-Pagingbar-OrderPage',
                store: myStore,
                pageSize: limitPage,
                displayInfo: true,
                listeners: {
                    beforechange: function (paging, params) {                      
                       // myStore.getProxy().getExtraParams().CUSTOMER_NAME = Ext.getCmp('id-ComboCustomerName-OrderPage').getValue();
                      //  myStore.getProxy().getExtraParams().STATUS_NAME = Ext.getCmp('id-ComboStatusName-OrderPage').getValue();
                       // myStore.getProxy().getExtraParams().UNUIT_NAME = Ext.getCmp('id-ComboUnitName-OrderPage').getValue();
                      //  myStore.getProxy().getExtraParams().ORDER_NO = Ext.getCmp('id-txtOrderNo-OrderPage').getValue();
                        myStore.getProxy().getExtraParams().ModeRun = modeRun;
                    }
                },
                displayMsg: 'Displaying topics {0} - {1} of {2}',
                emptyMsg: "No topics to display"
            })
        });

        return myGrid;
    };

    //----5. Popup Window For Edit --------//
    var Fn_PopupWindowNewEdit = function (event, rec) {
        var myWin = Ext.create('Ext.Window', {
            id: 'id-windowShipment-ShipmentPage',
            title: event + ' Shipment',
            region: 'center',
            width: Ext.getBody().getViewSize().width -490,
            height: Ext.getBody().getViewSize().height - 300,
            bodyStyle: 'background:#f1f1f1',
            bodyPadding: 5,
            autoScroll: true,
            autoDestroy: true,
            frame: true,
            modal: true,
            listeners: {
                afterrender: function (panel) {

                    if (event === "Edit") {

                        Ext.getCmp('id-ComboCustomerName-NewEdit-ShipmentPage').setValue(rec.data.CUSTOMER_NAME);
                        Ext.getCmp("id-ComboOrderNo-NewEdit-ShipmentPage").store.load({
                            params: {
                                CUSTOMER_ID: rec.data.CUSTOMER_ID,
                                ModeRun: modeRun
                            },
                            callback: function () {

                                Ext.getCmp('id-ComboOrderNo-NewEdit-ShipmentPage').setValue(rec.data.ORDER_NO);
                            }
                        });


                        Ext.getCmp("id-ComboStatusGroupName-NewEdit-ShipmentPage").setValue(rec.data.STATUS_GROUP_NAME);                        
                        Ext.getCmp("id-ComboStatusName-NewEdit-ShipmentPage").store.load({
                            params: {
                                STATUS_GROUP_ID: rec.data.STATUS_GROUP_ID,
                                ModeRun: modeRun
                            },
                            callback: function () {

                                Ext.getCmp('id-ComboStatusName-NewEdit-ShipmentPage').setValue(rec.data.STATUS_NAME);
                            }
                        });
                    


                        Ext.getCmp('id-ComboPositionName-NewEdit-ShipmentPage').setValue(rec.data.POSITION_NAME);
                        Ext.getCmp("id-ComboEmployeeName-NewEdit-ShipmentPage").store.load({
                            params: {
                                POSITION_ID: rec.data.POSITION_ID,
                                ModeRun: modeRun
                            },
                            callback: function () {
                              
                               Ext.getCmp('id-ComboEmployeeName-NewEdit-ShipmentPage').setValue(rec.data.EMPLOYEE_NAME);
                            }
                        });

                        Ext.getCmp('id-ComboJobSiteName-NewEdit-ShipmentPage').setValue(rec.data.JOBSITE_NAME);
                        Ext.getCmp('id-ComboTruckNo-NewEdit-ShipmentPage').setValue(rec.data.TRUCK_NO);
                        Ext.getCmp('id-txtShipmentNo-NewEdit-ShipmentPage').setValue(rec.data.SHIPMENT_NO);

                        Ext.getCmp('id-txtShipmentDate-NewEdit-ShipmentPage').setValue(rec.data.SHIPMENT_DATE);
                        Ext.getCmp('id-txtShipToAddress-NewEdit-ShipmentPage').setValue(rec.data.SHIP_TO_ADDRESS);
                        Ext.getCmp('id-txtDescription-NewEdit-ShipmentPage').setValue(rec.data.DESCRIPTION);

                  
                        //Ext.getCmp('id-ComboCustomerName-NewEdit-OrderPage').setValue(rec.data.CUSTOMER_NAME);

                        //Ext.getCmp('id-ComboStatusGroupName-NewEdit-OrderPage').setValue(rec.data.STATUS_GROUP_NAME);

                        //Ext.getCmp("id-ComboStatusName-NewEdit-OrderPage").store.load({
                        //    params: {
                        //        STATUS_GROUP_ID: rec.data.STATUS_GROUP_ID,
                        //        ModeRun: modeRun
                        //    },
                        //    callback: function (result) {
                        //        Ext.getCmp('id-ComboStatusName-NewEdit-OrderPage').setValue(rec.data.STATUS_NAME);
                        //    }
                        //});


                        //Ext.getCmp('id-ComboUnitName-NewEdit-OrderPage').setValue(rec.data.UNIT_NAME);

                        //Ext.getCmp('id-txtOrderNo-NewEdit-OrderPage').setValue(rec.data.ORDER_NO);
                        //Ext.getCmp('id-txtQuntity-NewEdit-OrderPage').setValue(rec.data.QUNTITY);                       
                        //Ext.getCmp('id-txtDescription-NewEdit-OrderPage').setValue(rec.data.DESCRIPTION);
                    }
                }
            },

            /*
                ORDER_ID: Ext.getCmp('id-ComboOrderNo-NewEdit-ShipmentPage').selection.data.ORDER_ID,
                JOBSITE_ID: Ext.getCmp('id-ComboJobSiteName-NewEdit-ShipmentPage').selection.data.JOBSITE_ID,
                STATUS_ID: Ext.getCmp('id-ComboStatusName-NewEdit-ShipmentPage').selection.data.STATUS_ID,
                EMPLOYEE_ID: Ext.getCmp('id-ComboEmployeeName-NewEdit-ShipmentPage').selection.data.EMPLOYEE_ID,
                TRUCK_ID: Ext.getCmp('id-ComboTruckNo-NewEdit-ShipmentPage').selection.data.TRUCK_ID,

                SHIPMENT_NO: Ext.getCmp('id-txtShipmentNo-NewEdit-ShipmentPage').getValue(),
                SHIPMENT_DATE: Ext.getCmp('id-txtShipmentDate-NewEdit-ShipmentPage').getRawValue(),
                SHIP_TO_ADDRESS: Ext.getCmp('id-txtShipToAddress-NewEdit-ShipmentPage').getValue(),
                DESCRIPTION: Ext.getCmp('id-txtDescription-NewEdit-ShipmentPage').getValue(),
             */

            items: [{
                xtype: 'panel',
                bodyStyle: 'background:#f1f1f1',
                border: false,
                frame: false,
                margin: '1 1 1 1',
                layout: 'column',
                items: [{
                    xtype: 'panel',
                    // title: '1',
                    bodyStyle: 'background:#EAF2F8',
                    columnWidth: 0.5,
                    border: false,
                    frame: false,
                    margin: '1 1 1 1',
                    items: [{
                        xtype: 'panel',
                        bodyStyle: 'background:#f1f1f1',
                        border: false,
                        frame: false,
                        margin: '1 1 1 1',
                        layout: 'hbox',
                        items: commonUI.Fn_CreateComboBoxOnFormPanel(
                            '/Customer/GetCustomerAll',
                            'id-ComboCustomerName-NewEdit-ShipmentPage',
                            'Customer Name', 100, 320),
                        listeners: {
                            afterrender: function (myPanel, event) {

                                Ext.getCmp("id-ComboCustomerName-NewEdit-ShipmentPage").on("select", function () {

                                    Ext.getCmp("id-ComboOrderNo-NewEdit-ShipmentPage").store.load({
                                        params: {
                                            CUSTOMER_ID: Ext.getCmp("id-ComboCustomerName-NewEdit-ShipmentPage").selection.data.CUSTOMER_ID,
                                            ModeRun: modeRun
                                        },
                                        callback: function () {
                                        }
                                    });
                                });
                            }
                        }

                    }, {
                        xtype: 'panel',
                        bodyStyle: 'background:#f1f1f1',
                        border: false,
                        frame: false,
                        margin: '1 1 1 1',
                        layout: 'hbox',
                        items: commonUI.Fn_CreateComboBoxOnFormPanel(
                            '/StatusGroup/GetStatusGroupAll',
                            'id-ComboStatusGroupName-NewEdit-ShipmentPage',
                            'Status Group', 100, 320),
                        listeners: {
                            afterrender: function (myPanel, event) {

                                Ext.getCmp("id-ComboStatusGroupName-NewEdit-ShipmentPage").on("select", function () {

                                    Ext.getCmp("id-ComboStatusName-NewEdit-ShipmentPage").store.load({
                                        params: {
                                            STATUS_GROUP_ID: Ext.getCmp("id-ComboStatusGroupName-NewEdit-ShipmentPage").selection.data.STATUS_GROUP_ID,
                                            ModeRun: modeRun
                                        },
                                        callback: function () {
                                        }
                                    });
                                });
                            }
                        }

                    }, {
                        xtype: 'panel',
                        bodyStyle: 'background:#EAF2F8',
                        border: false,
                        frame: false,
                        margin: '1 1 1 1',
                        layout: 'hbox',
                        items: commonUI.Fn_CreateComboBoxOnFormPanel(
                            '/Position/GetPositionAll',
                            'id-ComboPositionName-NewEdit-ShipmentPage',
                            'Position', 100, 320),
                        listeners: {
                            afterrender: function (myPanel, event) {

                                Ext.getCmp("id-ComboPositionName-NewEdit-ShipmentPage").on("select", function () {

                                    Ext.getCmp("id-ComboEmployeeName-NewEdit-ShipmentPage").store.load({
                                        params: {
                                            POSITION_ID: Ext.getCmp("id-ComboPositionName-NewEdit-ShipmentPage").selection.data.POSITION_ID,
                                            ModeRun: modeRun
                                        },
                                        callback: function () {
                                        }
                                    });
                                });
                            }
                        }

                    }, {
                        xtype: 'panel',
                        bodyStyle: 'background:#EAF2F8',
                        border: false,
                        frame: false,
                        margin: '1 1 1 1',
                        layout: 'hbox',
                        items: commonUI.Fn_CreateComboBoxOnFormPanel(
                            '/JobSite/GetJobSiteAll',
                            'id-ComboJobSiteName-NewEdit-ShipmentPage',
                            'Job Site', 100, 320),
                        listeners: {
                            afterrender: function (myPanel, event) {
                            }
                        }

                        }, {
                            xtype: 'textfield',
                            id: 'id-txtShipmentNo-NewEdit-ShipmentPage',
                            margin: '1 1 1 1',
                            width: 320,
                            labelWidth: 100,
                            fieldLabel: 'Shipment No'

                        }, {
                            xtype: 'textareafield',
                            id: 'id-txtShipToAddress-NewEdit-ShipmentPage',
                            maxRows: 3,
                            width: 380,
                            labelWidth: 100,
                            margin: '1 1 1 1',
                            fieldLabel: 'Ship To Address'
                            
                    }]

                }, {
                    xtype: 'panel',
                    // title: '2',
                    bodyStyle: 'background:#EAF2F8',
                    columnWidth: 0.5,
                    border: false,
                    frame: false,
                    margin: '1 1 1 1',
                        items: [{

                            xtype: 'panel',
                            bodyStyle: 'background:#EAF2F8',
                            border: false,
                            frame: false,
                            margin: '1 1 1 1',
                            layout: 'hbox',
                            items: commonUI.Fn_CreateComboBoxOnFormPanelNotLoad(
                                '/Order/GetOrderByCustomer',
                                'id-ComboOrderNo-NewEdit-ShipmentPage',
                                'Order No', 100, 320),
                            listeners: {
                                afterrender: function (myPanel, event) {
                                }
                            }

                        }, {

                                xtype: 'panel',
                                bodyStyle: 'background:#f1f1f1',
                                border: false,
                                frame: false,
                                margin: '1 1 1 1',
                                layout: 'hbox',
                                items: commonUI.Fn_CreateComboBoxOnFormPanelNotLoad(
                                    '/Status/GetStatusByGroup',
                                    'id-ComboStatusName-NewEdit-ShipmentPage',
                                    'Shipment Status', 100, 320),
                                listeners: {
                                    afterrender: function (myPanel, event) {
                                    }
                                }

                            }, {

                                xtype: 'panel',
                                bodyStyle: 'background:#EAF2F8',
                                border: false,
                                frame: false,
                                margin: '1 1 1 1',
                                layout: 'hbox',
                                items: commonUI.Fn_CreateComboBoxOnFormPanelNotLoad(
                                    '/Employee/GetEmployeeByPosition',
                                    'id-ComboEmployeeName-NewEdit-ShipmentPage',
                                    'Driver Name', 100, 320),
                                listeners: {
                                    afterrender: function (myPanel, event) {
                                    }
                                }
                            }, {

                                xtype: 'panel',
                                bodyStyle: 'background:#EAF2F8',
                                border: false,
                                frame: false,
                                margin: '1 1 1 1',
                                layout: 'hbox',
                                items: commonUI.Fn_CreateComboBoxOnFormPanel(
                                    '/Truck/GetTruckAll',
                                    'id-ComboTruckNo-NewEdit-ShipmentPage',
                                    'Truck No', 100, 320),
                                listeners: {
                                    afterrender: function (myPanel, event) {
                                    }
                                }

                            }, {
                                xtype: 'datefield',
                                id: 'id-txtShipmentDate-NewEdit-ShipmentPage',
                                margin: '1 1 1 1',
                                width: 320,
                                labelWidth: 100,
                                format: 'd/m/Y',
                                value: new Date(),
                                fieldLabel: 'Shipment Date'

                            }, {
                                xtype: 'textareafield',
                                id: 'id-txtDescription-NewEdit-ShipmentPage',
                                maxRows: 3,
                                width: 380,
                                labelWidth: 100,
                                margin: '1 1 1 1',
                                fieldLabel: 'Description'
                    }]
                }]

            }],
            buttonAlign: 'center',
            fbar: [{
                type: 'button',
                text: 'Save',
                iconCls: 'save',
                handler: function () {

                    Ext.MessageBox.show({
                        title: 'Confirm',
                        icon: Ext.MessageBox.QUESTION,
                        msg: 'Do you want to Save?',
                        buttons: Ext.MessageBox.YESNO,
                        fn: function (btn, text) {

                            if (btn === 'yes') {
                                if (event === "New") {

                                    shipmentAction.Fn_Insert(myWin);
                                }
                                else {
                                    shipmentAction.Fn_Update(myWin, rec);
                                }
                            }
                        }
                    });

                }

            }, '|', {
                type: 'button',
                text: 'Close',
                iconCls: 'close',
                handler: function () {
                    myWin.close();
                }
            }]

        }).show();
    };


    //---- Popup Window Load Data To Machine --------//
    var Fn_PopupWindowLoadDataToMachine = function () {
        var myWin = Ext.create('Ext.Window', {
            id: 'id-windowLoadDataToMachine-ShipmentPage',
            title: 'Send data to Machine',
            region: 'center',
            width: Ext.getBody().getViewSize().width - 590,
            height: Ext.getBody().getViewSize().height - 400,
            bodyStyle: 'background:#f1f1f1',
            bodyPadding: 5,
            autoScroll: true,
            autoDestroy: true,
            frame: true,
            modal: true,
            listeners: {
                afterrender: function (panel) {

                }
            },
            xtype: 'panel',
            bodyStyle: 'background:#f1f1f1',
            border: false,
            frame: false,
            margin: '1 1 1 1',
            layout: 'column',
            items: [{
                xtype: 'panel',
                // title: '1',
                bodyStyle: 'background:#EAF2F8',
                columnWidth: 0.5,
                border: false,
                frame: false,
                margin: '1 1 1 1',
                items: [{
                    xtype: 'panel',
                    bodyStyle: 'background:#f1f1f1',
                    border: false,
                    frame: false,
                    margin: '1 1 1 1',
                    layout: 'hbox',
                    items: commonUI.Fn_CreateComboBoxOnFormPanel(
                        '/Customer/GetCustomerAll',
                        'id-ComboCustomerName-LoadToMachine-ShipmentPage',
                        'Customer Name', 100, 320),
                    listeners: {
                        afterrender: function (myPanel, event) {

                            Ext.getCmp("id-ComboCustomerName-LoadToMachine-ShipmentPage").on("select", function () {

                                Ext.getCmp("id-ComboOrderNo-LoadToMachine-ShipmentPage").store.load({
                                    params: {
                                        CUSTOMER_ID: Ext.getCmp("id-ComboCustomerName-LoadToMachine-ShipmentPage").selection.data.CUSTOMER_ID,
                                        ModeRun: modeRun
                                    },
                                    callback: function () {
                                    }
                                });
                            });
                        }
                    }

                }, {
                    xtype: 'panel',
                    bodyStyle: 'background:#EAF2F8',
                    border: false,
                    frame: false,
                    margin: '1 1 1 1',
                    layout: 'hbox',
                    items: commonUI.Fn_CreateComboBoxOnFormPanelNotLoad(
                        '/Order/GetOrderByCustomer',
                        'id-ComboOrderNo-LoadToMachine-ShipmentPage',
                        'Order No', 100, 320),
                    listeners: {
                        afterrender: function (myPanel, event) {
                        }
                    }

                }]

            }, {
                xtype: 'panel',
                // title: '1',
                bodyStyle: 'background:#EAF2F8',
                columnWidth: 0.5,
                border: false,
                frame: false,
                margin: '1 1 1 1',
                items: [{
                    xtype: 'panel',
                    bodyStyle: 'background:#f1f1f1',
                    border: false,
                    frame: false,
                    margin: '1 1 1 1',
                    //height: 35,  
                    layout: 'hbox',
                    items: commonUI.Fn_CreateComboBoxOnFormPanel(
                        '/Formula/GetFormulaAll',
                        'id-ComboFormulaName-LoadToMachine-ShipmentPage',
                        'Formula Name', 100, 320),
                    listeners: {
                        afterrender: function (myPanel, event) {

                        }
                    }
                }, {
                    xtype: 'textareafield',
                    id: 'id-txtDescription-LoadToMachine-ShipmentPage',
                    maxRows: 3,
                    width: 320,
                    labelWidth: 100,
                    margin: '1 1 1 1',
                    fieldLabel: 'Description'
                }]

            }],
            buttonAlign: 'center',
            fbar: [{
                type: 'button',
                text: 'Send',
                iconCls: 'bookred',
                handler: function () {

                    Ext.MessageBox.show({
                        title: 'Confirm',
                        icon: Ext.MessageBox.QUESTION,
                        msg: 'Do you want to Send data to Machine?',
                        buttons: Ext.MessageBox.YESNO,
                        fn: function (btn, text) {

                            if (btn === 'yes') {

                                shipmentAction.Fn_LoadDataToMachine();
                            }
                        }
                    });

                }

            }, '|', {
                type: 'button',
                text: 'Close',
                iconCls: 'close',
                handler: function () {
                    myWin.close();
                }
            }]

        });

        myWin.show();
    };
    
}
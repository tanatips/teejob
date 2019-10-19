
function Cls_OrderForm_Views(urlRoot) {
       
    var orderAction = new Cls_OrderAction_Views(urlRoot);

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
                        'id-ComboCustomerName-OrderPage',
                        'Customer Name', 110, 420),
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
                        '/Unit/GetUnitAll',
                        'id-ComboUnitName-OrderPage',
                        'Unit Name', 110, 420),
                    listeners: {
                        afterrender: function (myPanel, event) {
                        }
                    }
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
                        'id-ComboStatusGroupName-OrderPage',
                        'Status Group', 110, 420),
                    listeners: {
                        afterrender: function (myPanel, event) {

                            Ext.getCmp("id-ComboStatusGroupName-OrderPage").on("select", function () {

                                Ext.getCmp("id-ComboStatusName-OrderPage").store.load({
                                    params: {
                                        STATUS_GROUP_ID: Ext.getCmp("id-ComboStatusGroupName-OrderPage").selection.data.STATUS_GROUP_ID,
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
                        'id-ComboStatusName-OrderPage',
                        'Order Status', 110, 420),
                    listeners: {
                        afterrender: function (myPanel, event) {
                        }
                    }
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
                    xtype: 'textfield',
                    id: 'id-txtOrderNo-OrderPage',
                    width: '70%',
                    labelWidth: 80,
                    fieldLabel: 'Order No'
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

                    orderAction.Fn_Search();

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
                { name: 'STATUS_GROUP_ID' },
                { name: 'STATUS_GROUP_NAME' },                
                { name: 'STATUS_GROUP_ID' },
                { name: 'STATUS_ID' },
                { name: 'STATUS_NAME' },
                { name: 'UNIT_ID' },
                { name: 'UNIT_NAME' },               
                { name: 'ORDER_NO' },
                { name: 'QUNTITY' },
                { name: 'DESCRIPTION' },
                { name: 'CREATE_USER' },
                { name: 'LAST_USER' },
                { name: 'CREATE_DATE' },
                { name: 'LAST_DATE' }
            ],
            proxy: {
                type: 'ajax',
                url: urlRoot + "/Order/Search",
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
            id: 'id-GridOrder-OrderPage',
            autoDestory: true,
            store: myStore,
            // title: 'Province List',
            height: Ext.getBody().getViewSize().height - 290,
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

                                    orderAction.Fn_Delete(rec);
                                }
                            }
                        });
                    }
                },    
                {
                    xtype: 'actioncolumn',
                    header: 'Formula',
                    align: 'center',
                    width: 80,
                    iconCls: 'add',
                    tooltip: 'Formula',
                    handler: function (grid, rowIndex, colIndex) {

                        grid.getSelectionModel().select(rowIndex);
                        var rec = grid.store.getAt(rowIndex);

                        var orderFormulaForm = new Cls_OrderFormulaForm_Views(urlRoot);

                        orderFormulaForm.Fn_PopupWindowOrderFormula(rec);

                    }
                },            
                { header: 'Order No', width: 200, sortable: true, hidden: false, dataIndex: 'ORDER_NO' },               
                { header: 'Quntity', width: 200, sortable: true, hidden: false, dataIndex: 'QUNTITY' },  
                { header: 'Unit', width: 100, sortable: true, hidden: false, dataIndex: 'UNIT_NAME' },
                { header: 'Order Status', width: 200, sortable: true, hidden: false, dataIndex: 'STATUS_NAME' },
                { header: 'Customer', width: 200, sortable: true, hidden: false, dataIndex: 'CUSTOMER_NAME' },
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
                        myStore.getProxy().getExtraParams().CUSTOMER_NAME = Ext.getCmp('id-ComboCustomerName-OrderPage').getValue();
                        myStore.getProxy().getExtraParams().STATUS_NAME = Ext.getCmp('id-ComboStatusName-OrderPage').getValue();
                        myStore.getProxy().getExtraParams().UNUIT_NAME = Ext.getCmp('id-ComboUnitName-OrderPage').getValue();
                        myStore.getProxy().getExtraParams().ORDER_NO = Ext.getCmp('id-txtOrderNo-OrderPage').getValue();
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
            id: 'id-windowOrder-OrderPage',
            title: event + ' Order',
            region: 'center',
            width: Ext.getBody().getViewSize().width - 690,
            height: Ext.getBody().getViewSize().height - 230,
            bodyStyle: 'background:#f1f1f1',
            bodyPadding: 5,
            autoScroll: true,
            autoDestroy: true,
            frame: true,
            modal: true,
            listeners: {
                afterrender: function (panel) {

                    if (event === "Edit") {

                        Ext.getCmp('id-ComboCustomerName-NewEdit-OrderPage').setValue(rec.data.CUSTOMER_NAME);

                        Ext.getCmp('id-ComboStatusGroupName-NewEdit-OrderPage').setValue(rec.data.STATUS_GROUP_NAME);

                        Ext.getCmp("id-ComboStatusName-NewEdit-OrderPage").store.load({
                            params: {
                                STATUS_GROUP_ID: rec.data.STATUS_GROUP_ID,
                                ModeRun: modeRun
                            },
                            callback: function (result) {
                                Ext.getCmp('id-ComboStatusName-NewEdit-OrderPage').setValue(rec.data.STATUS_NAME);
                            }
                        });

                        
                        Ext.getCmp('id-ComboUnitName-NewEdit-OrderPage').setValue(rec.data.UNIT_NAME);
         
                        Ext.getCmp('id-txtOrderNo-NewEdit-OrderPage').setValue(rec.data.ORDER_NO);
                        Ext.getCmp('id-txtQuntity-NewEdit-OrderPage').setValue(rec.data.QUNTITY);                       
                        Ext.getCmp('id-txtDescription-NewEdit-OrderPage').setValue(rec.data.DESCRIPTION);
                    }
                }
            },
            items: [{
                xtype: 'panel',
                bodyStyle: 'background:#f1f1f1',
                border: false,
                frame: false,
                margin: '1 1 1 1',
                layout: 'hbox',
                items: commonUI.Fn_CreateComboBoxOnFormPanel(
                    '/Customer/GetCustomerAll',
                    'id-ComboCustomerName-NewEdit-OrderPage',
                    'Customer Name', 110, 420),
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
                items: commonUI.Fn_CreateComboBoxOnFormPanel(
                    '/StatusGroup/GetStatusGroupAll',
                    'id-ComboStatusGroupName-NewEdit-OrderPage',
                    'Status Group', 110, 420),
                listeners: {
                    afterrender: function (myPanel, event) {

                        Ext.getCmp("id-ComboStatusGroupName-NewEdit-OrderPage").on("select", function () {

                            Ext.getCmp("id-ComboStatusName-NewEdit-OrderPage").store.load({
                                params: {
                                    STATUS_GROUP_ID: Ext.getCmp("id-ComboStatusGroupName-NewEdit-OrderPage").selection.data.STATUS_GROUP_ID,
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
                items: commonUI.Fn_CreateComboBoxOnFormPanelNotLoad(
                    '/Status/GetStatusByGroup',
                    'id-ComboStatusName-NewEdit-OrderPage',
                    'Order Status', 110, 420),
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
                items: commonUI.Fn_CreateComboBoxOnFormPanel(
                    '/Unit/GetUnitAll',
                    'id-ComboUnitName-NewEdit-OrderPage',
                    'Unit Name', 110, 420),
                listeners: {
                    afterrender: function (myPanel, event) {
                    }
                }

            }, {
                xtype: 'textfield',
                id: 'id-txtOrderNo-NewEdit-OrderPage',
                width: 300,
                labelWidth: 110,
                margin: '1 1 1 1',
                fieldLabel: 'Order No'
                //fieldStyle: 'background-color: #DCDCDC;'
                //readOnly: true     

                }, {
                    xtype: 'textfield',
                    id: 'id-txtQuntity-NewEdit-OrderPage',
                    width: 300,
                    labelWidth: 110,
                    margin: '1 1 1 1',
                    fieldLabel: 'Quntity'
                //fieldStyle: 'background-color: #DCDCDC;'
                //readOnly: true        

            }, {
                xtype: 'textareafield',
                id: 'id-txtDescription-NewEdit-OrderPage',
                maxRows: 3,
                width: 600,
                labelWidth: 110,
                margin: '1 1 1 1',
                fieldLabel: 'Description'
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

                                    orderAction.Fn_Insert(myWin);
                                }
                                else {
                                    orderAction.Fn_Update(myWin, rec);
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
    
}
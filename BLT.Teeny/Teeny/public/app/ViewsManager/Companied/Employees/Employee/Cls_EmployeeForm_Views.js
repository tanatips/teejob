/// <reference path="../../../../ViewsScript/MyLibary/Cls_CommonUI_Views.js" />

function Cls_EmployeeForm_Views(urlRoot) {
       
    var employeeAction = new Cls_EmployeeAction_Views(urlRoot);

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
                        '/Company/GetCompanyAll',
                        'id-ComboCompanyName-EmployeePage',
                        'Company Name', 110, 420),
                    listeners: {
                        afterrender: function (myPanel, event) {

                            Ext.getCmp("id-ComboCompanyName-EmployeePage").on("select", function () {

                                Ext.getCmp("id-ComboPlantName-EmployeePage").store.load({
                                    params: {
                                        COMPANY_ID: Ext.getCmp("id-ComboCompanyName-EmployeePage").selection.data.COMPANY_ID,
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
                        '/Department/GetDepartmentAll',
                        'id-ComboDepartmentName-EmployeePage',
                        'Departent Name', 110, 420),
                    listeners: {
                        afterrender: function (myPanel, event) {
                            Ext.getCmp("id-ComboDepartmentName-EmployeePage").on("select", function () {

                                Ext.getCmp("id-ComboPositionName-EmployeePage").store.load({
                                    params: {
                                        DEPARTMENT_ID: Ext.getCmp("id-ComboDepartmentName-EmployeePage").selection.data.DEPARTMENT_ID,
                                        ModeRun: modeRun
                                    },
                                    callback: function () {
                                    }
                                });
                            });

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
                    items: commonUI.Fn_CreateComboBoxOnFormPanelNotLoad(
                        '/Plant/GetPlantByCompany',
                        'id-ComboPlantName-EmployeePage',
                        'Plant Name', 100, 420),
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
                        '/Position/GetPositionByDepartment',
                        'id-ComboPositionName-EmployeePage',
                        'Position Name', 100, 420),
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
                    id: 'id-txtEmployeeName-EmployeePage',
                    width: '90%',
                    labelWidth: 100,
                    fieldLabel: 'Employee Name'
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

                    employeeAction.Fn_Search();

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
            id: 'id-storeEmployee-EmployeePage',
            pageSize: limitPage,
            autoLoad: false,
            autoDestory: true,
            fields: [
                { name: 'No' },               
                { name: 'EMPLOYEE_ID' },
                { name: 'EMPLOYEE_NAME' },
                { name: 'POSITION_ID' },
                { name: 'POSITION_NAME' },
                { name: 'DEPARTMENT_ID' },
                { name: 'DEPARTMENT_NAME' },
                { name: 'PLANT_ID' },
                { name: 'PLANT_NAME' },
                { name: 'COMPANY_ID' },
                { name: 'COMPANY_NAME' },
                { name: 'SHORT_NAME' },
                { name: 'DESCRIPTION' },
                { name: 'CREATE_USER' },
                { name: 'LAST_USER' },
                { name: 'CREATE_DATE' },
                { name: 'LAST_DATE' }
            ],
            proxy: {
                type: 'ajax',
                url: urlRoot + "/Employee/Search",
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
            id: 'id-GridEmployee-EmployeePage',
            autoDestory: true,
            store: myStore,
            // title: 'Province List',
            height: Ext.getBody().getViewSize().height - 261,
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
                // selectByEmployee: Ext.emptyFn
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

                                    employeeAction.Fn_Delete(rec);
                                }
                            }
                        });
                    }
                },               
                { header: 'Employee Name', width: 300, sortable: true, hidden: false, dataIndex: 'EMPLOYEE_NAME' },
                { header: 'Company', width: 300, sortable: true, hidden: false, dataIndex: 'COMPANY_NAME' },
                { header: 'Plant', width: 300, sortable: true, hidden: false, dataIndex: 'PLANT_NAME' },
                { header: 'Department', width: 300, sortable: true, hidden: false, dataIndex: 'DEPARTMENT_NAME' },
                { header: 'Position', width: 300, sortable: true, hidden: false, dataIndex: 'POSITION_NAME' },
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
                id: 'id-Pagingbar-EmployeePage',
                store: myStore,
                pageSize: limitPage,
                displayInfo: true,
                listeners: {
                    beforechange: function (paging, params) {                      
                        myStore.getProxy().getExtraParams().COMPANY_NAME = Ext.getCmp('id-ComboCompanyName-EmployeePage').getValue();
                        myStore.getProxy().getExtraParams().SHORT_NAME = "";
                        myStore.getProxy().getExtraParams().PLANT_NAME = Ext.getCmp('id-ComboPlantName-EmployeePage').getValue();
                        myStore.getProxy().getExtraParams().DEPARTMENT_NAME = Ext.getCmp('id-ComboDepartmentName-EmployeePage').getValue();
                        myStore.getProxy().getExtraParams().POSITION_NAME = Ext.getCmp('id-ComboPlantName-EmployeePage').getValue();
                        myStore.getProxy().getExtraParams().EMPLOYEE_NAME = Ext.getCmp('id-txtEmployeeName-EmployeePage').getValue();
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
            id: 'id-windowEmployee-EmployeePage',
            title: event + ' Employee',
            region: 'center',
            width: Ext.getBody().getViewSize().width - 690,
            height: Ext.getBody().getViewSize().height - 260,
            bodyStyle: 'background:#f1f1f1',
            bodyPadding: 5,
            autoScroll: true,
            autoDestroy: true,
            frame: true,
            modal: true,
            listeners: {
                afterrender: function (panel) {

                    if (event === "Edit") {

                        Ext.getCmp('id-ComboCompanyName-NewEdit-EmployeePage').setValue(rec.data.COMPANY_NAME);

                        Ext.getCmp("id-ComboPlantName-NewEdit-EmployeePage").store.load({
                            params: {
                                COMPANY_ID: rec.data.COMPANY_ID,
                                ModeRun: modeRun
                            },
                            callback: function (result) {
                                Ext.getCmp('id-ComboPlantName-NewEdit-EmployeePage').setValue(rec.data.PLANT_NAME);
                            }
                        });

                        
                        Ext.getCmp('id-ComboDepartmentName-NewEdit-EmployeePage').setValue(rec.data.DEPARTMENT_NAME);

                        Ext.getCmp("id-ComboPositionName-NewEdit-EmployeePage").store.load({
                            params: {
                                DEPARTMENT_ID: rec.data.DEPARTMENT_ID,
                                ModeRun: modeRun
                            },
                            callback: function (result) {
                                Ext.getCmp('id-ComboPositionName-NewEdit-EmployeePage').setValue(rec.data.POSITION_NAME);
                            }
                        });
                                                
                        Ext.getCmp('id-txtEmployeeName-NewEdit-EmployeePage').setValue(rec.data.EMPLOYEE_NAME);
                        Ext.getCmp('id-txtDescription-NewEdit-EmployeePage').setValue(rec.data.DESCRIPTION);
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
                    '/Company/GetCompanyAll',
                    'id-ComboCompanyName-NewEdit-EmployeePage',
                    'Company Name', 110, 420),
                listeners: {
                    afterrender: function (myPanel, event) {

                        Ext.getCmp("id-ComboCompanyName-NewEdit-EmployeePage").on("select", function () {

                            Ext.getCmp("id-ComboPlantName-NewEdit-EmployeePage").store.load({
                                params: {
                                    COMPANY_ID: Ext.getCmp("id-ComboCompanyName-NewEdit-EmployeePage").selection.data.COMPANY_ID,
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
                    '/Plant/GetPlantByCompany',
                    'id-ComboPlantName-NewEdit-EmployeePage',
                    'Plant Name', 110, 420),
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
                    '/Department/GetDepartmentAll',
                    'id-ComboDepartmentName-NewEdit-EmployeePage',
                    'Departent Name', 110, 420),
                listeners: {
                    afterrender: function (myPanel, event) {

                        Ext.getCmp("id-ComboDepartmentName-NewEdit-EmployeePage").on("select", function () {

                            Ext.getCmp("id-ComboPositionName-NewEdit-EmployeePage").store.load({
                                params: {
                                    DEPARTMENT_ID: Ext.getCmp("id-ComboDepartmentName-NewEdit-EmployeePage").selection.data.DEPARTMENT_ID,
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
                    '/Position/GetPositionByDepartment',
                    'id-ComboPositionName-NewEdit-EmployeePage',
                    'Position Name', 110, 420),
                listeners: {
                    afterrender: function (myPanel, event) {
                    }
                }
            }, {
                xtype: 'textfield',
                id: 'id-txtEmployeeName-NewEdit-EmployeePage',
                width: 600,
                labelWidth: 110,
                margin: '1 1 1 1',
                fieldLabel: 'Employee Name'
                //fieldStyle: 'background-color: #DCDCDC;'
                //readOnly: true           

            }, {
                xtype: 'textareafield',
                id: 'id-txtDescription-NewEdit-EmployeePage',
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

                                    employeeAction.Fn_Insert(myWin);
                                }
                                else {
                                    employeeAction.Fn_Update(myWin, rec);
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
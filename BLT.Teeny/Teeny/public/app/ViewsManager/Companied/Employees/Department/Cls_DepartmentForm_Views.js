
function Cls_DepartmentForm_Views(urlRoot) {
       
    var departmentAction = new Cls_DepartmentAction_Views(urlRoot);

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
            // layout: 'anchor',                
            items: [{
                xtype: 'panel',
                bodyStyle: 'background:#EAF2F8',
                columnWidth: 0.5,
                border: false,
                frame: false,
                margin: '2 1 1 10',
                height: 35,                
                items: [{
                    xtype: 'textfield',
                    id: 'id-txtDepartmentName-DepartmentPage',                    
                    width: '70%',
                    labelWidth: 120,
                    fieldLabel: 'Department Name'
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

                    departmentAction.Fn_Search();

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
            id: 'id-storeDepartment-DepartmentPage',
            pageSize: limitPage,
            autoLoad: false,
            autoDestory: true,
            fields: [
                { name: 'No' },
                { name: 'DEPARTMENT_ID' },
                { name: 'DEPARTMENT_NAME' },
                { name: 'PHONE_NO' },
                { name: 'MOBILE_NO' },
                { name: 'FAX_NO' },
                { name: 'EXT_NO' },
                { name: 'DESCRIPTION' },
                { name: 'CREATE_USER' },
                { name: 'LAST_USER' },
                { name: 'CREATE_DATE' },
                { name: 'LAST_DATE' }
            ],
            proxy: {
                type: 'ajax',
                url: urlRoot + "/Department/Search",
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
            id: 'id-GridDepartment-DepartmentPage',
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
                // selectByPosition: Ext.emptyFn
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

                                    departmentAction.Fn_Delete(rec);
                                }
                            }
                        });
                    }
                },
                { header: 'Department Name', width: 400, sortable: true, hidden: false, dataIndex: 'DEPARTMENT_NAME' },
                { header: 'Phone No', width: 200, sortable: true, hidden: false, dataIndex: 'PHONE_NO' },
                { header: 'Mobile No', width: 200, sortable: true, hidden: false, dataIndex: 'MOBILE_NO' },
                { header: 'Fax No', width: 200, sortable: true, hidden: false, dataIndex: 'FAX_NO' },
                { header: 'Ext No', width: 100, sortable: true, hidden: false, dataIndex: 'EXT_NO' },

                { header: 'Description', width: 500, sortable: true, hidden: false, dataIndex: 'DESCRIPTION' },
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
                id: 'id-Pagingbar-DepartmentPage',
                store: myStore,
                pageSize: limitPage,
                displayInfo: true,
                listeners: {
                    beforechange: function (paging, params) {

                        myStore.getProxy().getExtraParams().DEPARTMENT_NAME = Ext.getCmp('id-txtDepartmentName-DepartmentPage').getValue();

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
            id: 'id-windowDepartment-DepartmentPage',
            title: event + ' Department',
            region: 'center',
            width: Ext.getBody().getViewSize().width - 690,
            height: Ext.getBody().getViewSize().height - 280,
            bodyStyle: 'background:#f1f1f1',
            bodyPadding: 5,
            autoScroll: true,
            autoDestroy: true,
            frame: true,
            modal: true,
            listeners: {
                afterrender: function (panel) {

                    if (event === "Edit") {

                        Ext.getCmp('id-txtDepartmentName-NewEdit-DepartmentPage').setValue(rec.data.DEPARTMENT_NAME);
                        Ext.getCmp('id-txtPhoneNo-NewEdit-DepartmentPage').setValue(rec.data.PHONE_NO);
                        Ext.getCmp('id-txtMobileNo-NewEdit-DepartmentPage').setValue(rec.data.MOBILE_NO);
                        Ext.getCmp('id-txtFaxNo-NewEdit-DepartmentPage').setValue(rec.data.FAX_NO);
                        Ext.getCmp('id-txtExtNo-NewEdit-DepartmentPage').setValue(rec.data.EXT_NO);
                        Ext.getCmp('id-txtDescription-NewEdit-DepartmentPage').setValue(rec.data.DESCRIPTION);
                    }
                }
            },
            items: [{
                xtype: 'textfield',
                id: 'id-txtDepartmentName-NewEdit-DepartmentPage',
                width: 600,
                labelWidth: 120,
                margin: '1 1 1 1',
                fieldLabel: 'Department Name'
                //fieldStyle: 'background-color: #DCDCDC;'
                //readOnly: true           
            }, {
                xtype: 'textfield',
                id: 'id-txtPhoneNo-NewEdit-DepartmentPage',
                width: 400,
                labelWidth: 120,
                margin: '1 1 1 1',
                fieldLabel: 'Phone No'

            }, {
                xtype: 'textfield',
                id: 'id-txtMobileNo-NewEdit-DepartmentPage',
                width: 400,
                labelWidth: 120,
                margin: '1 1 1 1',
                fieldLabel: 'Mobile No'

            }, {
                xtype: 'textfield',
                id: 'id-txtFaxNo-NewEdit-DepartmentPage',
                width: 400,
                labelWidth: 120,
                margin: '1 1 1 1',
                fieldLabel: 'Fax No'

            }, {
                xtype: 'textfield',
                id: 'id-txtExtNo-NewEdit-DepartmentPage',
                width: 400,
                labelWidth: 120,
                margin: '1 1 1 1',
                fieldLabel: 'Ext No'

            }, {
                xtype: 'textareafield',
                id: 'id-txtDescription-NewEdit-DepartmentPage',
                maxRows: 3,
                width: 600,
                labelWidth: 120,
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

                                    departmentAction.Fn_Insert(myWin);
                                }
                                else {
                                    departmentAction.Fn_Update(myWin, rec);
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
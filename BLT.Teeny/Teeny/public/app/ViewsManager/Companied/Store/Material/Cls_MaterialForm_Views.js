

function Cls_MaterialForm_Views(urlRoot) {
       
    var materialAction = new Cls_MaterialAction_Views(urlRoot);

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
                columnWidth: 0.40,
                border: false,
                frame: false,
                margin: '1 1 1 1',
                height: 35,
                listeners: {
                    afterrender: function (myPanel, event) {
                        /*
                        Ext.getCmp("id-ComboSystemName-DetectorWithChartForm").on("select", function () {

                            Ext.getCmp("id-ComboEquipmentName-DetectorWithChartForm").store.load({
                                params: {
                                    SYSTEM_NAME: Ext.getCmp("id-ComboSystemName-DetectorWithChartForm").getRawValue(),
                                    ModeRun: modeRun
                                },
                                callback: function () {
                                }
                            });

                            Ext.getCmp("id-ComboUserChartName-DetectorWithChartForm").store.load({
                                params: {
                                    SYSTEM_NAME: Ext.getCmp("id-ComboSystemName-DetectorWithChartForm").getRawValue(),
                                    ModeRun: modeRun
                                },
                                callback: function () {
                                }
                            });

                        });
                        */
                    }
                },
                items: commonUI.Fn_CreateComboBoxOnFormPanel('/MaterialType/GetMaterialTypeAll', 'id-ComboMaterialTypeName-MaterialPage', 'Material Type', 120, 450)


            }, {
                xtype: 'panel',
                bodyStyle: 'background:#EAF2F8',
                columnWidth: 0.35,
                border: false,
                frame: false,
                margin: '1 1 1 1',
                height: 35,
                items: [{
                    xtype: 'textfield',
                    id: 'id-txtMaterialName-MaterialPage',
                    width: '80%',
                    labelWidth: 100,
                    fieldLabel: 'Material Name'
                }]

            }, {
                xtype: 'panel',
                bodyStyle: 'background:#EAF2F8',
                columnWidth: 0.25,
                border: false,
                frame: false,
                margin: '1 1 1 1',
                height: 35,
                items: [{
                    xtype: 'textfield',
                    id: 'id-txtMaterialSize-MaterialPage',
                    width: '80%',
                    labelWidth: 100,
                    fieldLabel: 'Material Size'
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

                    materialAction.Fn_Search();

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
            id: 'id-storeMaterial-MaterialPage',
            pageSize: limitPage,
            autoLoad: false,
            autoDestory: true,
            fields: [
                { name: 'No' },
                { name: 'MATERIAL_TYPE_ID' },
                { name: 'MATERIAL_TYPE_NAME' },              
                { name: 'MATERIAL_ID' },
                { name: 'MATERIAL_NAME' }, 
                { name: 'MATERIAL_SIZE' },                
                { name: 'DESCRIPTION' },
                { name: 'CREATE_USER' },
                { name: 'LAST_USER' },
                { name: 'CREATE_DATE' },
                { name: 'LAST_DATE' }

            ],
            proxy: {
                type: 'ajax',
                url: urlRoot + "/Material/Search",
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
            id: 'id-GridMaterial-MaterialPage',
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
                // selectByMaterial: Ext.emptyFn
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

                                    materialAction.Fn_Delete(rec);
                                }
                            }
                        });
                    }
                },           
                { header: 'Material Type', width: 300, sortable: true, hidden: false, dataIndex: 'MATERIAL_TYPE_NAME' },
                { header: 'Material Name', width: 300, sortable: true, hidden: false, dataIndex: 'MATERIAL_NAME' },                
                { header: 'Material Size', width: 200, sortable: true, hidden: false, dataIndex: 'MATERIAL_SIZE' },
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
                id: 'id-Pagingbar-MaterialPage',
                store: myStore,
                pageSize: limitPage,
                displayInfo: true,
                listeners: {
                    beforechange: function (paging, params) {
                        myStore.getProxy().getExtraParams().MATERIAL_TYPE_NAME = Ext.getCmp('id-ComboMaterialTypeName-MaterialPage').getValue();
                        myStore.getProxy().getExtraParams().MATERIAL_NAME = Ext.getCmp('id-txtMaterialName-MaterialPage').getValue();
                        myStore.getProxy().getExtraParams().MATERIAL_SIZE = Ext.getCmp('id-txtMaterialSize-MaterialPage').getValue();
                        
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
            id: 'id-windowMaterial-MaterialPage',
            title: event + ' Material',
            region: 'center',
            width: Ext.getBody().getViewSize().width - 690,
            height: Ext.getBody().getViewSize().height - 330,
            bodyStyle: 'background:#f1f1f1',
            bodyPadding: 5,
            autoScroll: true,
            autoDestroy: true,
            frame: true,
            modal: true,
            listeners: {
                afterrender: function (panel) {

                    if (event === "Edit") {

                        Ext.getCmp('id-ComboMaterialTypeName-NewEdit-MaterialPage').setValue(rec.data.MATERIAL_TYPE_NAME);
                        Ext.getCmp('id-txtMaterialName-NewEdit-MaterialPage').setValue(rec.data.MATERIAL_NAME);
                        Ext.getCmp('id-txtMaterialSize-NewEdit-MaterialPage').setValue(rec.data.MATERIAL_SIZE);
                        Ext.getCmp('id-txtDescription-NewEdit-MaterialPage').setValue(rec.data.DESCRIPTION);
                    }
                }
            },
            items: [{
                xtype: 'panel',
                bodyStyle: 'background:#f1f1f1',
                border: false,
                frame: false,
                margin: '1 1 1 1',
                height: 35,
                items: commonUI.Fn_CreateComboBoxOnFormPanel(
                    '/MaterialType/GetMaterialTypeAll',
                    'id-ComboMaterialTypeName-NewEdit-MaterialPage',
                    'Material Type', 120, 450),
                listeners: {
                    afterrender: function (myPanel, event) {
                    }
                }

            }, {
                xtype: 'textfield',
                id: 'id-txtMaterialName-NewEdit-MaterialPage',
                width: 600,
                labelWidth: 120,
                margin: '1 1 1 1',
                fieldLabel: 'Material Name'
                //fieldStyle: 'background-color: #DCDCDC;'
                //readOnly: true   

            }, {
                xtype: 'textfield',
                id: 'id-txtMaterialSize-NewEdit-MaterialPage',
                width: 500,
                labelWidth: 120,
                margin: '1 1 1 1',
                fieldLabel: 'Material Size'
                //fieldStyle: 'background-color: #DCDCDC;'
                //readOnly: true   

            }, {
                xtype: 'textareafield',
                id: 'id-txtDescription-NewEdit-MaterialPage',
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

                                    materialAction.Fn_Insert(myWin);
                                }
                                else {
                                    materialAction.Fn_Update(myWin, rec);
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


function Cls_PlantForm_Views(urlRoot) {
       
    var plantAction = new Cls_PlantAction_Views(urlRoot);

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
                items: commonUI.Fn_CreateComboBoxOnFormPanel('/Company/GetCompanyAll', 'id-ComboCompanyName-PlantPage', 'Company Name', 120, 450)


            }, {
                xtype: 'panel',
                bodyStyle: 'background:#EAF2F8',
                columnWidth: 0.5,
                border: false,
                frame: false,
                margin: '2 1 1 10',
                height: 35,                
                items: [{
                    xtype: 'textfield',
                    id: 'id-txtPlantName-PlantPage',                    
                    width: '70%',
                    labelWidth: 120,
                    fieldLabel: 'Plant Name'
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

                    plantAction.Fn_Search();

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
            id: 'id-storePlant-PlantPage',
            pageSize: limitPage,
            autoLoad: false,
            autoDestory: true,
            fields: [
                { name: 'No' },
                { name: 'COMPANY_ID' },
                { name: 'COMPANY_NAME' },
                { name: 'SHORT_NAME' },
                { name: 'PLANT_ID' },
                { name: 'PLANT_NAME' }, 
                { name: 'ADDRESS' },
                { name: 'PHONE_NO' },
                { name: 'MOBILE_NO' },
                { name: 'FAX_NO' },     
                { name: 'DESCRIPTION' },
                { name: 'CREATE_USER' },
                { name: 'LAST_USER' },
                { name: 'CREATE_DATE' },
                { name: 'LAST_DATE' }

            ],
            proxy: {
                type: 'ajax',
                url: urlRoot + "/Plant/Search",
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
            id: 'id-GridPlant-PlantPage',
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
                // selectByPlant: Ext.emptyFn
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

                                    plantAction.Fn_Delete(rec);
                                }
                            }
                        });
                    }
                },            
                { header: 'Company Name', width: 300, sortable: true, hidden: false, dataIndex: 'COMPANY_NAME' },
                { header: 'Plant Name', width: 300, sortable: true, hidden: false, dataIndex: 'PLANT_NAME' },
                { header: 'Short Name', width: 200, sortable: true, hidden: false, dataIndex: 'SHORT_NAME' },
                { header: 'Address', width: 400, sortable: true, hidden: false, dataIndex: 'ADDRESS' },
                { header: 'Phone No', width: 200, sortable: true, hidden: false, dataIndex: 'PHONE_NO' },
                { header: 'Mobile No', width: 200, sortable: true, hidden: false, dataIndex: 'MOBILE_NO' },
                { header: 'Fax No', width: 200, sortable: true, hidden: false, dataIndex: 'FAX_NO' },
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
                id: 'id-Pagingbar-PlantPage',
                store: myStore,
                pageSize: limitPage,
                displayInfo: true,
                listeners: {
                    beforechange: function (paging, params) {
                        myStore.getProxy().getExtraParams().DEPARTMENT_NAME = Ext.getCmp('id-ComboDepartmentName-PlantPage').getValue();
                        myStore.getProxy().getExtraParams().Plant_NAME = Ext.getCmp('id-txtPlantName-PlantPage').getValue();
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
            id: 'id-windowPlant-PlantPage',
            title: event + ' Plant',
            region: 'center',
            width: Ext.getBody().getViewSize().width - 690,
            height: Ext.getBody().getViewSize().height - 200,
            bodyStyle: 'background:#f1f1f1',
            bodyPadding: 5,
            autoScroll: true,
            autoDestroy: true,
            frame: true,
            modal: true,
            listeners: {
                afterrender: function (panel) {

                    if (event === "Edit") {

                        Ext.getCmp('id-ComboCompanyName-NewEdit-PlantPage').setValue(rec.data.COMPANY_NAME);
                        Ext.getCmp('id-txtPlantName-NewEdit-PlantPage').setValue(rec.data.PLANT_NAME);
                        Ext.getCmp('id-txtPlantAddress-NewEdit-PlantPage').setValue(rec.data.ADDRESS);
                        Ext.getCmp('id-txtPlantPhone-NewEdit-PlantPage').setValue(rec.data.PHONE_NO);
                        Ext.getCmp('id-txtPlantMobileNo-NewEdit-PlantPage').setValue(rec.data.MOBILE_NO);
                        Ext.getCmp('id-txtPlantFaxNo-NewEdit-PlantPage').setValue(rec.data.FAX_NO);
                        Ext.getCmp('id-txtDescription-NewEdit-PlantPage').setValue(rec.data.DESCRIPTION);
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
                listeners: {
                    afterrender: function (myPanel, event) {
                    }
                },
                items: commonUI.Fn_CreateComboBoxOnFormPanel('/Company/GetCompanyAll', 'id-ComboCompanyName-NewEdit-PlantPage', 'Company Name', 120, 450)

            }, {
                xtype: 'textfield',
                id: 'id-txtPlantName-NewEdit-PlantPage',
                width: 600,
                labelWidth: 120,
                margin: '1 1 1 1',
                fieldLabel: 'Plant Name'
                //fieldStyle: 'background-color: #DCDCDC;'
                //readOnly: true   

            }, {
                xtype: 'textfield',
                id: 'id-txtPlantPhone-NewEdit-PlantPage',
                width: 300,
                labelWidth: 120,
                margin: '1 1 1 1',
                fieldLabel: 'Phone No'
                //fieldStyle: 'background-color: #DCDCDC;'
                //readOnly: true   

            }, {
                xtype: 'textfield',
                id: 'id-txtPlantMobileNo-NewEdit-PlantPage',
                width: 300,
                labelWidth: 120,
                margin: '1 1 1 1',
                fieldLabel: 'Mobile No'
                //fieldStyle: 'background-color: #DCDCDC;'
                //readOnly: true  

            }, {
                xtype: 'textfield',
                id: 'id-txtPlantFaxNo-NewEdit-PlantPage',
                width: 300,
                labelWidth: 120,
                margin: '1 1 1 1',
                fieldLabel: 'Fax No'
                //fieldStyle: 'background-color: #DCDCDC;'
                //readOnly: true  

            }, {
                xtype: 'textareafield',
                id: 'id-txtPlantAddress-NewEdit-PlantPage',
                maxRows: 3,
                width: 600,
                labelWidth: 120,
                margin: '1 1 1 1',
                fieldLabel: 'Address'

            }, {
                xtype: 'textareafield',
                id: 'id-txtDescription-NewEdit-PlantPage',
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

                                    plantAction.Fn_Insert(myWin);
                                }
                                else {
                                    plantAction.Fn_Update(myWin, rec);
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
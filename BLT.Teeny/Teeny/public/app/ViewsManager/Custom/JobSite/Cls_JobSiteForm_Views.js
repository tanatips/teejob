
function Cls_JobSiteForm_Views(urlRoot) {
       
    var jobSiteAction = new Cls_JobSiteAction_Views(urlRoot);

    //var msgBox = new Cls_MessageBox_Views();
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
                    id: 'id-txtJobSiteName-JobSitePage',                    
                    width: '70%',
                    labelWidth: 120,
                    fieldLabel: 'Job Site'
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

                    jobSiteAction.Fn_Search();

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
            id: 'id-storeJobSite-JobSitePage',
            pageSize: limitPage,
            autoLoad: false,
            autoDestory: true,
            fields: [
                { name: 'No' },
                { name: 'JOBSITE_ID' },
                { name: 'JOBSITE_NAME' },               
                { name: 'DESCRIPTION' },                
                { name: 'CREATE_USER' },
                { name: 'LAST_USER' },                        
                { name: 'CREATE_DATE' },
                { name: 'LAST_DATE' }
            ],
            proxy: {
                type: 'ajax',
                url: urlRoot + "/JobSite/Search",
                actionMethods: {
                    create : 'POST',
                    read   : 'POST',
                    update : 'POST',
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
            id: 'id-GridJobSite-JobSitePage',
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
                                            
                                            jobSiteAction.Fn_Delete(rec);
                                        }
                                    }
                                });

                            }
                        },
                        
                { header: 'Job Site ', width: 400, sortable: true, hidden: false, dataIndex: 'JOBSITE_NAME' },
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
                id: 'id-Pagingbar-JobSitePage',
                store: myStore,
                pageSize: limitPage,
                displayInfo: true,
                listeners: {
                    beforechange: function (paging, params) {

                        myStore.getProxy().getExtraParams().JOBSITE_NAME = Ext.getCmp('id-txtJobSiteName-JobSitePage').getValue();
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
            id: 'id-windowJobSite-JobSitePage',
            title: event + ' Job Site',
            region: 'center',
            width: Ext.getBody().getViewSize().width - 700,
            height: Ext.getBody().getViewSize().height - 400,
            bodyStyle: 'background:#f1f1f1',
            bodyPadding: 5,
            autoScroll: true,
            autoDestroy: true,
            frame: true,
            modal: true,
            listeners: {
                afterrender: function (panel) {

                    if (event === "Edit") {
                        Ext.getCmp('id-txtJobSiteName-NewEdit-JobSitePage').setValue(rec.data.JOBSITE_NAME);
                        Ext.getCmp('id-txtDescription-NewEdit-JobSitePage').setValue(rec.data.DESCRIPTION);
                    }
                }
            },
            items: [{
                xtype: 'textfield',
                id: 'id-txtJobSiteName-NewEdit-JobSitePage',
                width: 600,
                labelWidth: 120,
                margin: '1 1 1 1',
                fieldLabel: 'Job Site'
                //fieldStyle: 'background-color: #DCDCDC;'
                //readOnly: true            
            }, {
                xtype: 'textareafield',
                id: 'id-txtDescription-NewEdit-JobSitePage',
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

                                    jobSiteAction.Fn_Insert(myWin);
                                }
                                else {
                                    jobSiteAction.Fn_Update(myWin, rec);
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

function Cls_CustomerProjectForm_Views(urlRoot) {
       
    var customerProjectAction = new Cls_CustomerProjectAction_Views(urlRoot);

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
                    xtype: 'panel',
                    bodyStyle: 'background:#EAF2F8',
                    border: false,
                    frame: false,
                    margin: '1 1 1 1',
                    //height: 35,  
                    layout: 'hbox',
                    items: commonUI.Fn_CreateComboBoxOnFormPanel(
                        '/Customer/GetCustomerAll',
                        'id-ComboCustomerName-CustomerProjectPage',
                        'Customer Name', 110, 420),
                    listeners: {
                        afterrender: function (myPanel, event) {

                            //Ext.getCmp("id-ComboCustomerName-CustomerProjectPage").on("select", function () {

                            //    Ext.getCmp("id-ComboProductName-CustomerProjectPage").store.load({
                            //        params: {
                            //            CUSTOMER_ID: Ext.getCmp("id-ComboCustomerName-CustomerProjectPage").selection.data.CUSTOMER_ID,
                            //            ModeRun: modeRun
                            //        },
                            //        callback: function () {
                            //        }
                            //    });
                            //});
                        }
                    }
                }]

            }, {
                xtype: 'panel',
                bodyStyle: 'background:#EAF2F8',
                columnWidth: 0.5,
                border: false,
                frame: false,
                margin: '2 1 1 10',
                height: 35,
                items: [{
                    xtype: 'panel',
                    bodyStyle: 'background:#EAF2F8',
                    border: false,
                    frame: false,
                    margin: '1 1 1 1',
                    //height: 35,  
                    layout: 'hbox',
                    items: commonUI.Fn_CreateComboBoxOnFormPanel(
                        '/Project/GetProjectAll',
                        'id-ComboProjectName-CustomerProjectPage',
                        'Project Name', 110, 420),
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

                    customerProjectAction.Fn_LoadCustomerProject();

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

    this.Fn_RenderCustomerProjectDetail = function () {

        var panel = Ext.create('Ext.form.Panel', {
            xtype: 'panel',
            bodyStyle: 'background:#f1f1f1',
            border: false,
            frame: false,
            layout: 'column',
            //layout: 'anchor',                
            items: [{
                xtype: 'panel',
                //title: 'Customer Has Project',
                bodyStyle: 'background:#f1f1f1',
                margin: '1 1 1 1',
                columnWidth: 0.33,
                border: false,
                frame: false,
                items: [{
                    xtype: 'panel',
                    items: Fn_CreateTreeBoardLayout()
                }]
            }]

        });

        return panel;
    };

    var Fn_CreateTreeBoardLayout = function () {

        var store = Ext.create('Ext.data.TreeStore', {
            proxy: {
                type: 'ajax',
                //url: urlRoot + '/LogOn/GetMenu',    
                actionMethods: {
                    create: 'POST',
                    read: 'POST',
                    update: 'POST',
                    destroy: 'POST'
                },
                reader: {
                    type: 'json'
                    //  rootProperty: 'users'
                }
            }
        });

        var myTree = Ext.create('Ext.tree.Panel', {
            id: 'id-TreeCustomerProject-CustomerProjectPage',
            store: store,
            //store: Fn_StaticMenuTree(),
            rootVisible: false,
            width: 450,
            bodyStyle: 'background:#D1E3DD',
            height: Ext.getBody().getViewSize().height - 280, // (screen.height - 300) + myLibary.Fn_HeightBrowserType(),
            listeners: {
                itemdblclick: function (tree, node, item, index, event) {

                    if (node.data.leaf === true) {

                        Fn_PopupWindowNewEdit("Edit", node);

                        //var menuText = node.get('text');
                        // var menuID = node.get('id');

                        //  Fn_SetMenuAction(menuText);

                        //  Ext.getCmp("id-MenuTree-HomePage").hide();
                        //  Ext.getCmp("id-MenuTree-HomePage").show();
                    }

                },
                afterrender: function () {

                    // Fn_LoadMenuTree();
                }
            }
        });

        return myTree;
    };

    //----5. Popup Window For Edit --------//
    var Fn_PopupWindowNewEdit = function (event, rec) {
        var myWin = Ext.create('Ext.Window', {
            id: 'id-windowCustomerProject-CustomerProjectPage',
            title: event + 'Customer Have Project',
            region: 'center',
            width: Ext.getBody().getViewSize().width - 850,
            height: Ext.getBody().getViewSize().height - 450,
            bodyStyle: 'background:#f1f1f1',
            bodyPadding: 5,
            autoScroll: true,
            autoDestroy: true,
            frame: true,
            modal: true,
            listeners: {
                afterrender: function (panel) {

                    if (event === "Edit") {
                        Ext.getCmp('id-ComboCustomerName-NewEdit-CustomerProjectPage').setValue(rec.data.CUSTOMER_NAME);
                        Ext.getCmp('id-ComboProjectName-NewEdit-CustomerProjectPage').setValue(rec.data.PROJECT_NAME);

                        rec.OLD_CUSTOMER_ID = rec.data.CUSTOMER_ID;
                        rec.OLD_PROJECT_ID = rec.data.PROJECT_ID;
                    }
                }
            },
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
                    'id-ComboCustomerName-NewEdit-CustomerProjectPage',
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
                //height: 35,  
                layout: 'hbox',
                items: commonUI.Fn_CreateComboBoxOnFormPanel(
                    '/Project/GetProjectAll',
                    'id-ComboProjectName-NewEdit-CustomerProjectPage',
                    'Project Name', 110, 420),
                listeners: {
                    afterrender: function (myPanel, event) {
                    }
                }

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

                                    customerProjectAction.Fn_Insert(myWin);
                                }
                                else {
                                    customerProjectAction.Fn_Update(myWin, rec);
                                }
                            }
                        }
                    });
                }

            }, '|', {
                type: 'button',
                text: 'Delete',
                iconCls: 'delete',
                handler: function () {

                    Ext.MessageBox.show({
                        title: 'Confirm',
                        icon: Ext.MessageBox.QUESTION,
                        msg: 'Do you want to Delete?',
                        buttons: Ext.MessageBox.YESNO,
                        fn: function (btn, text) {

                            if (btn === 'yes') {

                                customerProjectAction.Fn_Delete(myWin, rec);
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
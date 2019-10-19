
function Cls_ManufactureForm_Views(urlRoot) {
       
    var manufactureAction = new Cls_ManufactureAction_Views(urlRoot);

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
            bodyPadding: 2,
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
                    xtype: 'textfield',
                    id: 'id-txtOrderNo-ManufacturePage',
                    width: '95%',
                    labelWidth: 60,
                    fieldLabel: 'Order No'
                }]

            }, {
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
                    layout: 'hbox',
                    items: commonUI.Fn_CreateComboBoxOnFormPanel(
                        '/StatusGroup/GetStatusGroupAll',
                        'id-ComboStatusGroupName-ManufacturePage',
                        'Status Group', 90, '95%'),
                    listeners: {
                        afterrender: function (myPanel, event) {

                            Ext.getCmp("id-ComboStatusGroupName-ManufacturePage").on("select", function () {

                                Ext.getCmp("id-ComboStatusName-ManufacturePage").store.load({
                                    params: {
                                        STATUS_GROUP_ID: Ext.getCmp("id-ComboStatusGroupName-ManufacturePage").selection.data.STATUS_GROUP_ID,
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
                        '/Status/GetStatusByGroup',
                        'id-ComboStatusName-ManufacturePage',
                        'Order Status', 80, "95%"),
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

                    if (Ext.getCmp('id-txtOrderNo-ManufacturePage').getValue() !== "") {

                        manufactureAction.Fn_Search();
                    }
                    else {
                        msgBox.Fn_ErrorMessageBox("Please Input Order No");
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
                   // Fn_PopupWindowNewEdit("New", "");
                }

            }]
        });
        return toolBar;
    };

    //--- 4.Show Tree  -----------------------------------//
    this.Fn_ShowTree = function () {

        var panel = Ext.create('Ext.form.Panel', {
            bodyStyle: 'background:#f1f1f1',
            bodyPadding: 2,
            //autoScroll: true,           
            frame: true,
            border: false,
            layout: 'column',
            //layout: 'anchor',    
            items: [{
                xtype: 'panel',
                //title: '1',
                bodyStyle: 'background:#f1f1f1',
                columnWidth: 0.7,
                border: false,
                frame: true,
                margin: '1 1 1 1',
                items: Fn_CreateTreeOrderProduct()

            }, {
                xtype: 'panel',
                //title: '2',
                bodyStyle: 'background:#f1f1f1',
                columnWidth: 0.3,
                border: false,
                frame: true,
                margin: '1 1 1 1',
                items: Fn_CreateTreFormulaMaterial()
            }]

        });

        return panel;
    };

    var Fn_CreateTreeOrderProduct = function () {

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
            id: 'id-TreeOrderProduct-ManufacturePage',
            store: store,
            //store: Fn_StaticMenuTree(),
            rootVisible: false,
            width: "99%",
            bodyStyle: 'background:#D1E3DD',
            height: Ext.getBody().getViewSize().height - 285, // (screen.height - 300) + myLibary.Fn_HeightBrowserType(),
            listeners: {
                itemclick: function (tree, node, item, index, event) {

                    /*
                    var menuText = node.get('text');

                    menuText = menuText.replace(" :: ", ",");

                    var list = menuText.split(",");

                    if (list[0] === "Formula") {

                        // orderProductAction.Fn_LoadTreeFormulaItemDetail(list[1]);

                        Ext.getCmp("id-ComboFormulaName-OrderProductPage").setValue(list[1]);
                    }
                    */
                },
                itemdblclick: function (tree, node, item, index, event) {
                    /*
                    var menuText = node.get('text');

                    if (menuText === "Edit/Delete") {

                        var rec = {
                            ORDER_NO: Ext.getCmp('id-txtOrderNo-OrderProductPage').getValue(),
                            ORDER_ID: node.data.ORDER_ID,
                            STATUS_GROUP_NAME: node.data.STATUS_GROUP_NAME,
                            STATUS_NAME: node.data.STATUS_NAME,
                            PRODUCT_GROUP_NAME: node.data.PRODUCT_GROUP_NAME,
                            PRODUCT_NAME: node.data.PRODUCT_NAME,
                            PRODUCT_CODE: node.data.PRODUCT_CODE,
                            REVISION: node.data.REVISION,
                            QUNTITY: node.data.QUNTITY,
                            UNIT_NAME: node.data.UNIT_NAME,
                            PRODUCT_SPEC_ID: node.data.PRODUCT_SPEC_ID

                        };

                        Fn_PopupWindowNewEdit("Edit", rec);
                    }

                    //var menuText = node.get('text');
                    // var menuID = node.get('id');

                    //  Fn_SetMenuAction(menuText);

                    //  Ext.getCmp("id-MenuTree-HomePage").hide();
                    //  Ext.getCmp("id-MenuTree-HomePage").show();                    
                    */

                },
                afterrender: function () {
                }
            }
        });

        return myTree;
    };


    var Fn_CreateTreFormulaMaterial = function () {

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
            id: 'id-TreeFormulaMaterial-ManufacturePage',
            store: store,
            //store: Fn_StaticMenuTree(),
            rootVisible: false,
            width: "99%",
            bodyStyle: 'background:#D1E3DD',
            height: Ext.getBody().getViewSize().height - 285, // (screen.height - 300) + myLibary.Fn_HeightBrowserType(),
            listeners: {
                itemclick: function (tree, node, item, index, event) {
                },
                itemdblclick: function (tree, node, item, index, event) {
                }
            }

        });

        return myTree;
    };
    
}
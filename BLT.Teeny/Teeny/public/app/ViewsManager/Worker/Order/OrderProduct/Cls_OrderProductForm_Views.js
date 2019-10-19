
function Cls_OrderProductForm_Views(urlRoot) {
       
    var orderProductAction = new Cls_OrderProductAction_Views(urlRoot);

    //var msgBox = new Cls_MessageBox_Views();
    var commonUI = new Cls_CommonUI_Views(urlRoot);
   

    //---- Popup Window OrderProduct --------//
    this.Fn_PopupWindowOrderProduct = function (rec) {
        var myWin = Ext.create('Ext.Window', {
            id: 'id-windowOrderProduct-OrderProductPage',
            title: 'Order consider product ',
            region: 'center',
            width: Ext.getBody().getViewSize().width - 300,
            height: Ext.getBody().getViewSize().height - 50,
            bodyStyle: 'background:#f1f1f1',
            bodyPadding: 5,
            //autoScroll: true,
            autoDestroy: true,
            frame: true,
            modal: true,
            listeners: {
                afterrender: function () {                   
                }
            },
            items: [{
                xtype: 'panel',
                border: false,
                frame: false,
                layout: 'column',
                bodyStyle: 'background:#f1f1f1',
                items: [{
                 //----- Column1 -----------------------------//               
                    xtype: 'panel',
                    bodyStyle: 'background:#f1f1f1',
                    columnWidth: 0.40,
                    border: false,
                    frame: false,
                    margin: '1 1 1 1',
                    height: 35,
                    items: [{
                        xtype: 'textfield',
                        id: 'id-txtOrderNo-OrderProductPage',
                        width: '95%',
                        labelWidth: 60,
                        margin: '1 1 1 1',
                        fieldLabel: 'Order No',
                        fieldStyle: 'background-color: #DCDCDC;',
                        readOnly: true,
                        value: rec.data.ORDER_NO                        
                    }]
              //----- Column2 -----------------------------//

                }, {
                    xtype: 'panel',
                    bodyStyle: 'background:#f1f1f1',
                    columnWidth: 0.20,
                    border: false,
                    frame: false,
                    margin: '1 1 1 1',
                    height: 35,
                    items: [{
                        xtype: 'textfield',
                        id: 'id-txtRevision-OrderProductPage',
                        width: '90%',
                        labelWidth: 60,
                        margin: '1 1 1 1',
                        fieldLabel: 'Revision'
                    }]

                }, {
                    xtype: 'panel',
                    bodyStyle: 'background:#f1f1f1',
                    columnWidth: 0.40,
                    border: false,
                    frame: false,
                    margin: '1 1 1 1',
                    height: 35,
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
                            'id-ComboFormulaName-OrderProductPage',
                            'Formula Name', 100, "95%"),
                        listeners: {
                            afterrender: function (myPanel, event) {

                                Ext.getCmp("id-ComboFormulaName-OrderProductPage").on("change", function () {

                                    var formulaName = Ext.getCmp("id-ComboFormulaName-OrderProductPage").selection.data.FORMULA_NAME;

                                    orderProductAction.Fn_LoadTreeFormulaItemDetail(formulaName);
                                });
                            }
                        }
                    }]
                }]

            //----- End Top Panel ------------------------------------------//

            }, {
                xtype: 'panel',
                bodyStyle: 'background:#f1f1f1',
                border: false,
                frame: true,
                margin: '1 1 1 1',
                items: Fn_RenderButtonControl(rec)

            }, {
                xtype: 'panel',
                border: false,
                frame: false,
                layout: 'column',
                items: [{
                    xtype: 'panel',
                    bodyStyle: 'background:#f1f1f1',
                    columnWidth: 0.5,
                    border: false,
                    frame: true,
                    margin: '1 1 1 1',
                    items: Fn_CreateTreeOrderProduct(rec)
                }, {
                    xtype: 'panel',
                    bodyStyle: 'background:#f1f1f1',
                    columnWidth: 0.5,
                    border: false,
                    frame: true,
                    margin: '1 1 1 1',
                    items: Fn_CreateTreeFomulaItemDetail(rec)
                }]
            }],
            buttonAlign: 'center',
            fbar: [{
                type: 'button',
                text: 'Close',
                iconCls: 'close',
                handler: function () {
                    myWin.close();
                }
            }]

        }).show();
    };

    var Fn_RenderButtonControl = function (rec) {

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
                    orderProductAction.Fn_LoadOrderProduct(rec);
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
                    Fn_PopupWindowNewEdit("New", rec);
                }

            }]
        });
        return toolBar;
    };

    var Fn_CreateTreeOrderProduct = function (rec) {

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
            id: 'id-TreeOrderProduct-OrderProductPage',
            store: store,
            //store: Fn_StaticMenuTree(),
            rootVisible: false,
            width: "99%",
            bodyStyle: 'background:#D1E3DD',
            height: Ext.getBody().getViewSize().height - 245, // (screen.height - 300) + myLibary.Fn_HeightBrowserType(),
            listeners: {
                itemclick: function (tree, node, item, index, event) {

                    var menuText = node.get('text');

                    menuText = menuText.replace(" :: ", ",");

                    var list = menuText.split(",");

                    if (list[0] === "Formula") {

                       // orderProductAction.Fn_LoadTreeFormulaItemDetail(list[1]);

                        Ext.getCmp("id-ComboFormulaName-OrderProductPage").setValue(list[1]);
                    }

                },
                itemdblclick: function (tree, node, item, index, event) {

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

                },
                afterrender: function () {                   
                }
            }
        });

        return myTree;
    };

    var Fn_CreateTreeFomulaItemDetail = function () {

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
            id: 'id-TreeFormulaItem-OrderProductPage',
            store: store,
            //store: Fn_StaticMenuTree(),
            rootVisible: false,
            width: "99%",
            bodyStyle: 'background:#D1E3DD',
            height: Ext.getBody().getViewSize().height - 245, // (screen.height - 300) + myLibary.Fn_HeightBrowserType(),
            listeners: {                
                itemdblclick: function (tree, node, item, index, event) {

                    if (node.data.leaf === true) {

                        //Fn_PopupWindowNewEdit("Edit", node);

                        //var menuText = node.get('text');
                        // var menuID = node.get('id');

                        //  Fn_SetMenuAction(menuText);

                        //  Ext.getCmp("id-MenuTree-HomePage").hide();
                        //  Ext.getCmp("id-MenuTree-HomePage").show();
                    }

                },                
                afterrender: function () {
                }
            }
        });

        return myTree;
    };

    //----5. Popup Window For Edit --------//
    var Fn_PopupWindowNewEdit = function (event, rec) {
        var myWin = Ext.create('Ext.Window', {
            id: 'id-windowOrderProductNewEdit-OrderProductPage',
            title: event + ' Order product',
            region: 'center',
            width: Ext.getBody().getViewSize().width - 450,
            height: Ext.getBody().getViewSize().height - 350,
            bodyStyle: 'background:#f1f1f1',
            // bodyPadding: 5,
            autoScroll: true,
            autoDestroy: true,
            frame: true,
            modal: true,
            listeners: {
                afterrender: function (panel) {
                                       
                    if (event === "Edit") {

                        Ext.getCmp('id-txtOrderNo-NewEdit-OrderProductPage').setValue(rec.ORDER_NO);  
                        Ext.getCmp("id-txtQuntity-NewEdit-OrderProductPage").setValue(rec.QUNTITY);
                        Ext.getCmp("id-ComboUnitName-NewEdit-OrderProductPage").setValue(rec.UNIT_NAME);


                        //-------------------------------------------------------------------------------------------------------//
                        Ext.getCmp("id-ComboStatusGroupName-NewEdit-OrderProductPage").setValue(rec.STATUS_GROUP_NAME);

                        Ext.getCmp("id-ComboStatusGroupName-NewEdit-OrderProductPage").on("change", function () {

                            Ext.getCmp("id-ComboStatusName-NewEdit-OrderProductPage").store.load({
                                params: {
                                    STATUS_GROUP_ID: Ext.getCmp("id-ComboStatusGroupName-NewEdit-OrderProductPage").selection.data.STATUS_GROUP_ID,
                                    ModeRun: modeRun
                                },
                                callback: function () {

                                    Ext.getCmp("id-ComboStatusName-NewEdit-OrderProductPage").setValue(rec.STATUS_NAME);                                    
                                }
                            });
                        });

                        //-------------------------------------------------------------------------------------------------------//

                        Ext.getCmp("id-ComboProductGroup-NewEdit-OrderProductPage").setValue(rec.PRODUCT_GROUP_NAME);

                        Ext.getCmp("id-ComboProductGroup-NewEdit-OrderProductPage").on("change", function () {

                            Ext.getCmp("id-ComboProductName-NewEdit-OrderProductPage").store.load({
                                params: {
                                    PRODUCT_GROUP_ID: Ext.getCmp("id-ComboProductGroup-NewEdit-OrderProductPage").selection.data.PRODUCT_GROUP_ID,
                                    ModeRun: modeRun
                                },
                                callback: function () {

                                    Ext.getCmp("id-ComboProductName-NewEdit-OrderProductPage").setValue(rec.PRODUCT_NAME);

                                    Ext.getCmp("id-ComboProductGroup-NewEdit-OrderProductPage").disable();
                                    Ext.getCmp("id-ComboProductName-NewEdit-OrderProductPage").disable();
                                }
                            });
                        });
                        
                        //-------------------------------------------------------------------------------------------------------//
                       
                        Ext.getCmp("id-ComboProductName-NewEdit-OrderProductPage").on("change", function () {

                            Ext.getCmp("id-ComboProductCode-NewEdit-OrderProductPage").store.load({
                                params: {
                                    PRODUCT_ID: Ext.getCmp("id-ComboProductName-NewEdit-OrderProductPage").selection.data.PRODUCT_ID,
                                    ModeRun: modeRun
                                },
                                callback: function () {

                                    Ext.getCmp("id-ComboProductCode-NewEdit-OrderProductPage").setValue(rec.PRODUCT_CODE);
                                    Ext.getCmp("id-ComboProductCode-NewEdit-OrderProductPage").disable();
                                }
                            });
                        });

                        //-------------------------------------------------------------------------------------------------------//

                        Ext.getCmp("id-ComboProductCode-NewEdit-OrderProductPage").on("change", function () {

                            Ext.getCmp("id-ComboRevision-NewEdit-OrderProductPage").store.load({
                                params: {
                                    PRODUCT_CODE: Ext.getCmp("id-ComboProductCode-NewEdit-OrderProductPage").selection.data.PRODUCT_CODE,
                                    ModeRun: modeRun
                                },
                                callback: function () {

                                    Ext.getCmp("id-ComboRevision-NewEdit-OrderProductPage").setValue(rec.REVISION);
                                    Ext.getCmp("id-ComboRevision-NewEdit-OrderProductPage").disable();
                                }
                            });
                        });

                        //-------------------------------------------------------------------------------------------------------//
                    }
                    else {

                        Ext.getCmp('id-txtOrderNo-NewEdit-OrderProductPage').setValue(rec.data.ORDER_NO);

                        Ext.getCmp("id-btnDelete-NewEdit-OrderProductPage").disable();
                    }
                }
            },
            items: [{
                xtype: 'panel',
                border: false,
                frame: false,
                layout: 'column',
                bodyStyle: 'background:#EAF2F8',
                items: [{
                    xtype: 'panel',
                    //title: '1',
                    bodyStyle: 'background:#EAF2F8',
                    columnWidth: 0.5,
                    border: false,
                    frame: false,
                    margin: '1 1 1 1',
                    items: [{
                        xtype: 'textfield',
                        id: 'id-txtOrderNo-NewEdit-OrderProductPage',
                        width: '90%',
                        labelWidth: 100,
                        margin: '1 1 1 1',
                        fieldLabel: 'Order No',
                        fieldStyle: 'background-color: #DCDCDC;',
                        bodyStyle: 'background:#EAF2F8',
                        readOnly: true

                    }, {
                        xtype: 'panel',
                        bodyStyle: 'background:#EAF2F8',
                        border: false,
                        frame: false,
                        margin: '1 1 1 1',
                        layout: 'hbox',
                        items: commonUI.Fn_CreateComboBoxOnFormPanel(
                            '/StatusGroup/GetStatusGroupAll',
                            'id-ComboStatusGroupName-NewEdit-OrderProductPage',
                            'Status Group', 100, '90%'),
                        listeners: {
                            afterrender: function (myPanel, event) {

                                Ext.getCmp("id-ComboStatusGroupName-NewEdit-OrderProductPage").on("select", function () {

                                    Ext.getCmp("id-ComboStatusName-NewEdit-OrderProductPage").store.load({
                                        params: {
                                            STATUS_GROUP_ID: Ext.getCmp("id-ComboStatusGroupName-NewEdit-OrderProductPage").selection.data.STATUS_GROUP_ID,
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
                            'id-ComboStatusName-NewEdit-OrderProductPage',
                            'MFG Status', 100, '90%'),
                        listeners: {
                            afterrender: function (myPanel, event) {
                            }
                        }

                    }, {
                        xtype: 'textfield',
                        id: 'id-txtQuntity-NewEdit-OrderProductPage',
                        width: '50%',
                        labelWidth: 100,
                        margin: '1 1 1 1',
                        fieldLabel: 'Quntity'

                    }, {
                        xtype: 'panel',
                        bodyStyle: 'background:#EAF2F8',
                        border: false,
                        frame: false,
                        margin: '1 1 1 1',
                        layout: 'hbox',
                        items: commonUI.Fn_CreateComboBoxOnFormPanel(
                            '/Unit/GetUnitAll',
                            'id-ComboUnitName-NewEdit-OrderProductPage',
                            'Unit', 100, '50%'),
                        listeners: {
                            afterrender: function (myPanel, event) {
                            }
                        }
                    }]

                }, {
                    xtype: 'panel',
                    //title: '2',
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
                        items: commonUI.Fn_CreateComboBoxOnFormPanel(
                            '/ProductGroup/GetProductGroupAll',
                            'id-ComboProductGroup-NewEdit-OrderProductPage',
                            'Product Group', 100, '95%'),
                        listeners: {
                            afterrender: function (myPanel, event) {

                                Ext.getCmp("id-ComboProductName-NewEdit-OrderProductPage").setValue("");

                                Ext.getCmp("id-ComboProductGroup-NewEdit-OrderProductPage").on("select", function () {

                                    Ext.getCmp("id-ComboProductName-NewEdit-OrderProductPage").store.load({
                                        params: {
                                            PRODUCT_GROUP_ID: Ext.getCmp("id-ComboProductGroup-NewEdit-OrderProductPage").selection.data.PRODUCT_GROUP_ID,
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
                            '/Product/GetProductByProductGroup',
                            'id-ComboProductName-NewEdit-OrderProductPage',
                            'Product Name', 100, '95%'),
                        listeners: {
                            afterrender: function (myPanel, event) {

                                Ext.getCmp("id-ComboProductCode-NewEdit-OrderProductPage").setValue("");

                                Ext.getCmp("id-ComboProductName-NewEdit-OrderProductPage").on("select", function () {

                                    Ext.getCmp("id-ComboProductCode-NewEdit-OrderProductPage").store.load({
                                        params: {
                                            PRODUCT_ID: Ext.getCmp("id-ComboProductName-NewEdit-OrderProductPage").selection.data.PRODUCT_ID,
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
                            '/ProductSpec/GetProductCodeByProduct',
                            'id-ComboProductCode-NewEdit-OrderProductPage',
                            'Product Code', 100, '95%'),
                        listeners: {
                            afterrender: function (myPanel, event) {

                                Ext.getCmp("id-ComboRevision-NewEdit-OrderProductPage").setValue("");

                                Ext.getCmp("id-ComboProductCode-NewEdit-OrderProductPage").on("select", function () {

                                    Ext.getCmp("id-ComboRevision-NewEdit-OrderProductPage").store.load({
                                        params: {
                                            PRODUCT_CODE: Ext.getCmp("id-ComboProductCode-NewEdit-OrderProductPage").selection.data.PRODUCT_CODE,
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
                            '/ProductSpec/GetRevisionByProductCode',
                            'id-ComboRevision-NewEdit-OrderProductPage',
                            'Revision', 100, '50%'),
                        listeners: {
                            afterrender: function (myPanel, event) {
                            }
                        }

                    }]
                }]
            }],
            buttonAlign: 'center',
            fbar: [{
                type: 'button',
                id: 'id-btnSave-NewEdit-OrderProductPage',
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

                                    orderProductAction.Fn_Insert(myWin, rec);
                                }
                                else {
                                    orderProductAction.Fn_Update(myWin, rec);
                                }
                            }
                        }
                    });
                }

            }, '|', {
                type: 'button',
                id: 'id-btnDelete-NewEdit-OrderProductPage',
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

                                orderProductAction.Fn_Delete(myWin, rec);
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
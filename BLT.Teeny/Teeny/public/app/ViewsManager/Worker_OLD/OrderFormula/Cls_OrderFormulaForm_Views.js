
function Cls_OrderFormulaForm_Views(urlRoot) {
       
    var orderFormulaAction = new Cls_OrderFormulaAction_Views(urlRoot);

    //var msgBox = new Cls_MessageBox_Views();
    var commonUI = new Cls_CommonUI_Views(urlRoot);
   

    //---- Popup Window OrderFormula --------//
    this.Fn_PopupWindowOrderFormula = function (rec) {
        var myWin = Ext.create('Ext.Window', {
            id: 'id-windowOrderFormula-OrderFormulaPage',
            title: 'Order Have Formula',
            region: 'center',
            width: Ext.getBody().getViewSize().width - 450,
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
                items: [{
                    xtype: 'panel',
                    bodyStyle: 'background:#f1f1f1',
                    columnWidth: 0.4,
                    border: false,
                    frame: false,
                    margin: '1 1 1 1',
                    height: 35,
                    items: [{
                        xtype: 'textfield',
                        id: 'id-txtOrderNo-OrderFormulaPage',
                        width: 300,
                        labelWidth: 60,
                        margin: '1 1 1 1',
                        fieldLabel: 'Order No',
                        fieldStyle: 'background-color: #DCDCDC;',
                        readOnly: true,
                        value: rec.data.ORDER_NO
                    }]

                }, {
                    xtype: 'panel',
                    bodyStyle: 'background:#f1f1f1',
                    columnWidth: 0.6,
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
                            'id-ComboFormulaName-OrderFormulaPage',
                            'Formula Name', 100, 420),
                        listeners: {
                            afterrender: function (myPanel, event) {

                                Ext.getCmp("id-ComboFormulaName-OrderFormulaPage").on("select", function () {

                                    var formulaName = Ext.getCmp("id-ComboFormulaName-OrderFormulaPage").selection.data.FORMULA_NAME;

                                    orderFormulaAction.Fn_LoadTreeFormulaItemDetail(formulaName);
                                });
                            }
                        }
                    }]
                }]

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
                    items: Fn_CreateTreeOrderFomula(rec)
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
                    orderFormulaAction.Fn_LoadOrderFormula();
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

    var Fn_CreateTreeOrderFomula = function (rec) {

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
            id: 'id-TreeOrderFormula-OrderFormulaPage',
            store: store,
            //store: Fn_StaticMenuTree(),
            rootVisible: false,
            width: 445,
            bodyStyle: 'background:#D1E3DD',
            height: Ext.getBody().getViewSize().height - 245, // (screen.height - 300) + myLibary.Fn_HeightBrowserType(),
            listeners: {
                itemclick: function (tree, node, item, index, event) {

                    if (node.data.leaf === true) {
                    }
                },
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
            id: 'id-TreeOrderFormulaItem-OrderFormulaPage',
            store: store,
            //store: Fn_StaticMenuTree(),
            rootVisible: false,
            width: 445,
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
            id: 'id-windowOrderFormulaNewEdit-OrderFormulaPage',
            title: event + 'Order Have Formula',
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

                    Ext.getCmp('id-txtOrderNo-NewEdit-OrderFormulaPage').setValue(rec.data.ORDER_NO);

                    rec.OLD_ORDER_ID = rec.data.ORDER_ID;
                    rec.OLD_FORMULA_ID = rec.data.FORMULA_ID;

                    if (event === "Edit") {
                        
                        Ext.getCmp('id-ComboFormulaName-NewEdit-OrderFormulaPage').setValue(rec.data.FORMULA_NAME);
                                                
                        
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
                items: [{
                    xtype: 'textfield',
                    id: 'id-txtOrderNo-NewEdit-OrderFormulaPage',
                    width: 300,
                    labelWidth: 100,
                    margin: '1 1 1 1',
                    fieldLabel: 'Order No',
                    fieldStyle: 'background-color: #DCDCDC;',
                    readOnly: true,
                }]

            }, {
                xtype: 'panel',
                bodyStyle: 'background:#EAF2F8',
                border: false,
                frame: false,
                margin: '1 1 1 1',
                //height: 35,  
                layout: 'hbox',
                items: commonUI.Fn_CreateComboBoxOnFormPanel(
                    '/Formula/GetFormulaAll',
                    'id-ComboFormulaName-NewEdit-OrderFormulaPage',
                    'Formula Name', 100, 420),
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

                                    orderFormulaAction.Fn_Insert(myWin, rec);
                                }
                                else {
                                    orderFormulaAction.Fn_Update(myWin, rec);
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

                                orderFormulaAction.Fn_Delete(myWin, rec);
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
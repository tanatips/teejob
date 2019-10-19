

/// <reference path="../../ViewsScript/MyLibary/Cls_MyLibary_Views.js" />

/// <reference path="Cls_MenuTree_Views.js" />

function Cls_Home_Views(urlRoot) {

    var myLibary = new Cls_MyLibary_Views();

    var menuTree = new Cls_MenuTree_Views(urlRoot);

    this.Fn_DisplayViewport = function (internalRun, menuData) {

        Ext.create('Ext.container.Viewport', {
            layout: 'border',
            listeners: {
                afterrender: function () {

                }
            },
            items: [{
                region: 'north',
                border: false,
                margin: '0 0 5 0',
                height: 50,
                bodyStyle: 'background:#f1f1f1',
                contentEl: 'divHeader-HomePage'

            }, {
                region: 'center',
                xtype: 'panel',
                id: 'id-CenterViewport-HomePage',
                items: [{
                    xtype: 'toolbar',
                    border: false,
                    frame: true,
                    style: 'background:#C2D6D0',
                    items: [{
                        xtype: 'splitbutton',
                        margin: '1 1 1 1',
                        text: 'Menu',
                        iconCls: 'menu',                       
                        menu: new Ext.menu.Menu({                            
                            items: menuTree.Fn_DisplayMenu(internalRun, menuData)
                        }),

                        /*
                        menu: new Ext.menu.Menu({
                            items: [{
                                text: 'Chart Template',
                                iconCls: 'bookred',
                                handler: function () {
                                    alert("Item 1 clicked");
                                }

                            }, {
                                text: 'Chart Config',
                                iconCls: 'item',
                                handler: function () {
                                    alert("Item 2 clicked");
                                }

                            }, {
                                text: 'Dashboard',
                                iconCls: 'preview',
                                handler: function () {
                                    alert("Dashboard");
                                }
                            }]
                        })
                        */

                    }]

                }, {
                    xtype: 'tabpanel',
                    id: 'id-tabPanelCenterViewport-HomePage',
                    activeTab: 0,
                    bodyStyle: 'background:#f1f1f1',
                    layout: 'fit',
                    minTabWidth: 170,
                    height: screen.height - 150
                    // height: (screen.height - 235) + myLibary.Fn_HeightBrowserType()
                    // height: (Ext.getBody().getViewSize().height - 80) + myLibary.Fn_HeightBrowserType()

                }]

            }, {
                region: 'south',
                height: 20,
                minHeight: 20,
                bodyStyle: 'background:#f1f1f1; font-size:11px',
                html: "<center> Copyright © 2017 By Innovation Team</center>"
            }]

        });

    };

    this.PopupHomeWindow = function () {

        var myWin = Ext.create('Ext.Window', {
            title: 'Home Page',
            header: {
                titlePosition: 2,
                titleAlign: 'center'
            },
            closable: true,
            closeAction: 'hide',
            maximizable: true,
            headerPosition: 'top',
            animateTarget: Ext.get('lblWindowAnimateTarget-HomePage'),
            //  width: Ext.getBody().getViewSize().width + 20, 
            //  height: Ext.getBody().getViewSize().height, 

            width: screen.width - 100,
            height: screen.height - 200,
            minWidth: 350,
            tools: [{ type: 'pin'}],
            layout: {
                type: 'border',
                padding: 5
            }

        }).show();
    };
}

/// <reference path="../../ViewsScript/MyLibary/Cls_MyLibary_Views.js" />
/// <reference path="Cls_MenuTree_Views.js" />

function Cls_LogOn_Views(urlRoot) {

   // var msgBox = new Cls_MessageBox_Views();

    //var menuTree = new Cls_MenuTree_Views(urlRoot);

    this.Fn_WindowLogOn = function () {

        var userWindow = Ext.create('Ext.data.Store', {
            // model: 'MyModel',
            fields: ['Value', 'Text'],
            autoLoad: false,
            proxy: {
                url: urlRoot + '/LogOn/GetWindowUser',
                type: 'ajax',
                actionMethods: {
                    create: 'POST',
                    read: 'POST',
                    update: 'POST',
                    destroy: 'POST'
                },
                reader: {
                    type: 'json'
                }
            }
        });

        var storeGroup = Ext.create('Ext.data.Store', {
            // model: 'MyModel',
            fields: ['Group_ID', 'Group_Name'],
            autoLoad: false,
            proxy: {
                // url: urlRoot + 'LogOn/CheckLogOn?items=' + JSON.stringify(listItem),
                url: urlRoot + '/LogOn/GetGroup',
                type: 'ajax',
                actionMethods: {
                    create: 'POST',
                    read: 'POST',
                    update: 'POST',
                    destroy: 'POST'
                },
                reader: {
                    type: 'json'
                }
            }
        });

        var myWin = Ext.create('Ext.window.Window', {
            title: 'Your Logon',
            width: 400,
            height: 280,
            plain: true,
            modal: true,
            headerPosition: 'top',
            layout: 'fit',
            items: [{
                xtype: 'form',
                bodyPadding: 5,
                layout: 'form',
                items: [{
                    items: [{
                        xtype: 'textfield',
                        id: 'id-UserName-HomePage',
                        fieldLabel: 'User Name :',
                        width: 300,
                        value: ''

                    }, {
                        xtype: 'textfield',
                        id: 'id-UserPassword-HomePage',
                        fieldLabel: 'Password :',
                        inputType: 'password',
                        width: 300,
                        value: ''

                    }, {
                        xtype: 'combobox',
                        fieldLabel: 'Group :',
                        id: 'id-comboUserGroup-HomePage',
                        store: storeGroup,
                        valueField: 'Group_ID',
                        displayField: 'Group_Name',
                        queryMode: 'local',
                        width: 300,
                        emptyText: '---selected---'
                    }]
                }]
            }],
            listeners: {
                afterrender: function () {

                    // if (internalRun === true) {

                    /*
                    //=== For run on window server ===//
                    userWindow.load({
                        params: {
                            enUser: "" //Ext.get('lblUserLogOn-HomePage').dom.innerHTML
                        },
                        callback: function (result) {

                            Ext.getCmp("id-UserName-HomePage").setValue(result[0].data.Value);
                            Ext.getCmp("id-UserPassword-HomePage").setValue(result[0].data.Value);

                            storeGroup.load({
                                params: {
                                    enUser: result[0].data.Value
                                },
                                callback: function (result) {
                                    //var xx = "";
                                }
                            });
                        }
                    });
                    */

                    Ext.getCmp("id-UserName-HomePage").setValue(Ext.get('lblUserLogOn-HomePage').dom.innerHTML);
                    Ext.getCmp("id-UserPassword-HomePage").setValue(Ext.get('lblUserLogOn-HomePage').dom.innerHTML);

                    storeGroup.load({
                        params: {
                            USER_NAME: Ext.get('lblUserLogOn-HomePage').dom.innerHTML,
                            APP_NAME: Ext.get('lblProgramName-HomePage').dom.innerHTML,
                            modeRun: modeRun
                        },
                        callback: function (result) {
                            //var xx = "";
                        }
                    });
                                       
                    /*
                }
                else {

                    //=== For run from external  ===//

                    Ext.getCmp("id-UserName-HomePage").setValue(userName);
                    Ext.getCmp("id-UserPassword-HomePage").setValue(userName);
                    
                    var listGroup = JSON.parse(dataGroup);

                    Ext.getCmp("id-comboUserGroup-HomePage").store.add(listGroup);
                }
                */
                }
            },
            buttonAlign: 'center',
            buttons: [{
                text: 'Logon',
                id: 'id-btnLogon-HomePage',
                iconCls: 'logon',
                handler: function () {

                    // if (internalRun === true) {

                    Ext.get('lblUserLogOn-HomePage').dom.innerHTML = Ext.getCmp("id-UserName-HomePage").getValue();
                    Ext.get('lblUserGroup-HomePage').dom.innerHTML = Ext.getCmp("id-comboUserGroup-HomePage").getRawValue();

                    var home = new Cls_Home_Views(urlRoot);

                    home.Fn_DisplayViewport("");

                    myWin.close();

                    //   }
                    //   else {

                    //=== Get menu from external ===// 
                    //      Ext.get('lblUserGroup-HomePage').dom.innerHTML = Ext.getCmp("id-comboUserGroup-HomePage").getRawValue();

                    //      Fn_ExternalGetMenu();

                    //      socket.on("/McMonitorDashboard/View/ExternalReturnGetMenu", function (result) {

                    //          var home = new Cls_Home_Views(urlRoot);
                    //          home.Fn_DisplayViewport(internalRun, result);

                    //          myWin.close();

                    //      });
                    // }

                }
            }]

        });

        myWin.show().center();
    };

    
    this.Fn_ExternalGetGroup = function (userName) {

       var myStore = Ext.create('Ext.data.Store', {
            // model: 'MyModel',
           // fields: ['Value', 'Text'],
            autoLoad: false,
            proxy: {
                url: urlRoot + '/LogOn/ExternalGetGroup',
                type: 'ajax',
                actionMethods: {
                    create: 'POST',
                    read: 'POST',
                    update: 'POST',
                    destroy: 'POST'
                },
                reader: {
                    type: 'json'
                }
            }           
        });

        myStore.load({
            params: {
                enUser: userName
            },
            callback: function (result) {
                //var xx = "";
            }
        });
    };

    var Fn_ExternalGetMenu = function () {

        var myStore = Ext.create('Ext.data.Store', {
            // model: 'MyModel',
           // fields: ['Value', 'Text'],
            autoLoad: false,
            proxy: {
                url: urlRoot + '/LogOn/ExternalGetMenu',
                type: 'ajax',
                actionMethods: {
                    create: 'POST',
                    read: 'POST',
                    update: 'POST',
                    destroy: 'POST'
                },
                reader: {
                    type: 'json'
                }
            }
        });

        myStore.load({
            params: {
                userName: Ext.get('lblUserLogOn-HomePage').dom.innerHTML,
                groupName: Ext.get('lblUserGroup-HomePage').dom.innerHTML,
                appName: Ext.get('lblProgramName-HomePage').dom.innerHTML
            },
            callback: function (result) {
                //var xx = "";
            }
        });
    };
}
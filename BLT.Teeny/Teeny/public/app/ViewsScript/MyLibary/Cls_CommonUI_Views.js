

function Cls_CommonUI_Views(urlRoot) {

    this.Fn_CreateComboBoxOnHtml = function (myUrl, comboId, divComboRender, myWidth) {

        var myStore = Ext.create('Ext.data.Store', {
            fields: ['Value', 'Text'],
            proxy: {
                url: urlRoot + myUrl,
                type: 'ajax',
                reader: {
                    type: 'json'
                }
            }

        });

        var myComboBox = Ext.create('Ext.form.ComboBox', {
            store: myStore,
            id: comboId,
            valueField: 'Value',
            displayField: 'Text',
            queryMode: 'local',
            width: myWidth,
            renderTo: divComboRender,
            emptyText: '---selected---'

        });

     
        
        myStore.load({
            callback: function () {
            }
        });
        

       // return myComboBox;
    };


    //---------- Combobox On form panel ---------------------//

    this.Fn_CreateComboBoxOnFormPanel = function (comboUrl, comboId, comboLabel, labelWidth, comboWidth) {

        var myStore = Ext.create('Ext.data.Store', {
            fields: ['Value', 'Text'],
            proxy: {
                url: urlRoot + comboUrl,
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

        var myComboBox = Ext.create('Ext.form.ComboBox', {
            store: myStore,
            id: comboId,
            fieldLabel: comboLabel,
            valueField: 'Value',
            displayField: 'Text',
            queryMode: 'local',
            width: comboWidth,
            labelWidth: labelWidth,
            //labelCls: 'SetFont',
            emptyText: '---selected---'

        });

        myStore.reload({
            params: {
                ModeRun: modeRun
            },
            callback: function () {
            }
        });

        return myComboBox;
    };


    this.Fn_CreateComboBoxCallWebApi = function (urlWebApi, comboId, comboLabel, labelWidth, comboWidth) {

        var myStore = Ext.create('Ext.data.Store', {
            fields: ['Value', 'Text'],
            proxy: {
                url: urlWebApi,
                type: 'ajax',
                reader: {
                    type: 'json'
                }
            }

        });

        var myComboBox = Ext.create('Ext.form.ComboBox', {
            store: myStore,
            id: comboId,
            fieldLabel: comboLabel,
            valueField: 'Value',
            displayField: 'Text',
            queryMode: 'local',
            width: comboWidth,
            labelWidth: labelWidth,
            emptyText: '---selected---'

        });

        myStore.reload({
            callback: function () {
            }
        });

        return myComboBox;
    };

    this.Fn_CreateComboBoxOnFormPanelNotLoad = function (comboUrl, comboId, comboLabel, labelWidth, comboWidth) {

        var myStore = Ext.create('Ext.data.Store', {
            fields: ['Value', 'Text'],
            proxy: {
                url: urlRoot + comboUrl,
                type: 'ajax',
                actionMethods: {
                    create : 'POST',
                    read   : 'POST',
                    update : 'POST',
                    destroy: 'POST'
                },
                reader: {
                    type: 'json'
                }
            }

        });

        var myComboBox = Ext.create('Ext.form.ComboBox', {
            store: myStore,
            id: comboId,
            fieldLabel: comboLabel,
            valueField: 'Value',
            displayField: 'Text',
            queryMode: 'local',
            width: comboWidth,
            labelWidth: labelWidth,
            emptyText: '---selected---'

        });

        //myStore.reload({
        //    callback: function () {
        //    }
        //});

        return myComboBox;
    };

   

    //----- Create Window ----------//
    this.Fn_CreatePopupWindow = function (windowName, divDisplay) {

        var myWin = Ext.create('Ext.window.Window', {
            title: 'Hello ' + windowName,
            renderTo: divDisplay,
            id: "id-" + windowName,
            x: 50,
            y: 50,
            height: 400,
            width: 700,
            layout: 'fit',
            modal: true,
            autoScroll: true,
            // constrain: true,
            buttonAlign: 'right',
            listeners: {
                afterrender: function () {

                },
                afterclose: function () {

                }
            },
            items: {
                xtype: 'panel',
                layout: 'column',
                items: [{
                    xtype: 'panel',
                    title: 'HI',
                    height: 250,
                    columnWidth: 0.5,
                    collapsible: true,
                    collapseDirection: Ext.Component.DIRECTION_LEFT
                    //items: Fn_CreateFormNewEdit()

                }, {
                    xtype: 'panel',
                    title: 'Form from HTML',
                    height: 250,
                    columnWidth: 0.5,
                    collapsible: true,
                    collapseDirection: Ext.Component.DIRECTION_RIGHT
              
                }]
            },
            tbar: [{
                type: 'button',
                text: 'aaa',
                handler: function (win) {

                    alert();
                }
            }],
            fbar: [{
                type: 'button',
                text: 'Save',
                iconCls: 'save',
                handler: function () {


                }
            }, '-', {
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
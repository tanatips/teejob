

function Cls_TabPanel_Views(urlRoot) {

    this.Fn_AddTabPage = function (url, tabName, pageName, pageLayout) {

        var myTab = Ext.getCmp("id-tabPanelCenterViewport-HomePage");
        var tabId = "id-tab" + tabName + "-HomePage";
        var divId = "divDisplay" + tabName + "-HomePage";

        myTab.add({
            title: pageName,
            id: tabId,
            closable: true,
            bodyStyle: 'background:#f1f1f1',
            autoScroll: true,
            layout: 'fit',
            iconCls: 'preview',
            // html: "<div id = " + divId + "></div>",
            items: [{
                xtype: 'panel',
                listeners: {
                    afterrender: function (panel) {

                        panel.add(pageLayout);
                    }
                }
            }],
            listeners: {
                beforeclose: function () {
                },
                afterrender: function (tab) {
                },
                activate: function (tab, eOpts) {
                }
            }
        });

        myTab.setActiveTab(tabId);
    };

    this.Fn_CheckTabAlready = function (dynamicTabID) {

        var myTabId = "id-tab" + dynamicTabID + "-HomePage";

        var tabObj = Ext.getCmp(myTabId);

        if (tabObj === undefined) {

            return false;
        }
        else {

            var tabPanel = Ext.getCmp("id-tabPanelCenterViewport-HomePage");

            tabPanel.setActiveTab(myTabId);

            return true;
        }
    };

}
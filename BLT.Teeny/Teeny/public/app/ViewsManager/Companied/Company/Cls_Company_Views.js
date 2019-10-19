
function Cls_Company_Views(urlRoot) {

    var companyForm = new Cls_CompanyForm_Views(urlRoot);

    //*******************//
    var panelContent;
    //*******************//

    //--- 1.Show Content ----------------------------------------------------//

    this.Fn_ShowContent = function () {

        panelContent = Ext.create('Ext.panel.Panel', {
            //  id: 'id-ContentPanel-AreaPagePage',
            //bodyPadding: 2,
            bodyStyle: 'background:#f1f1f1',
            height: Ext.getBody().getViewSize().height - 100,
            autoScroll: true,
            autoDestroy: true,
            frame: true,
            listeners: {
                afterrender: function (panel) {

                    companyForm.Fn_SetPanelContent(panelContent);
                }
            },
            // layout: 'fit',
            items: [{
                xtype: 'panel',
                // title: 'Search',
                bodyStyle: 'background:#f1f1f1',
                //bodyPadding: 1,
                items: companyForm.Fn_RenderContentSearch()

            }, {

                xtype: 'panel',
                //frame: true,
                //bodyPadding: 2,
                style: 'background: #f1f1f1;',
                items: companyForm.Fn_RenderButtonControl()

            }, {
                xtype: 'panel',
                //title: 'Grid'
                items: companyForm.Fn_ShowGrid()

            }]

        });

        return panelContent;
    };


}



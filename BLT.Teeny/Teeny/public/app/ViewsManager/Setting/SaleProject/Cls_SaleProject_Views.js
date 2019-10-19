
function Cls_SaleProject_Views(urlRoot) {

    var saleProjectForm = new Cls_SaleProjectForm_Views(urlRoot);

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

                    saleProjectForm.Fn_SetPanelContent(panelContent);
                }
            },
            // layout: 'fit',
            items: [{
                xtype: 'panel',
                // title: 'Search',
                bodyStyle: 'background:#f1f1f1',
                //bodyPadding: 1,
                items: saleProjectForm.Fn_RenderContentSearch()

            }, {

                xtype: 'panel',
                //frame: true,
                //bodyPadding: 2,
                style: 'background: #f1f1f1;',
                    items: saleProjectForm.Fn_RenderButtonControl()

            }, {
                xtype: 'panel',
                //title: 'Grid'
                    items: saleProjectForm.Fn_RenderSaleProjectDetail()

            }]

        });

        return panelContent;
    };


}



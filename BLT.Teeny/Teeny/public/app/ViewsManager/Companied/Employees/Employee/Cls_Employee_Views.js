
function Cls_Employee_Views(urlRoot) {

    var employeeForm = new Cls_EmployeeForm_Views(urlRoot);

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

                    employeeForm.Fn_SetPanelContent(panelContent);
                }
            },
            // layout: 'fit',
            items: [{
                xtype: 'panel',
                // title: 'Search',
                bodyStyle: 'background:#f1f1f1',
                //bodyPadding: 1,
                items: employeeForm.Fn_RenderContentSearch()

            }, {

                xtype: 'panel',
                //frame: true,
                //bodyPadding: 2,
                style: 'background: #f1f1f1;',
                    items: employeeForm.Fn_RenderButtonControl()

            }, {
                xtype: 'panel',
                //title: 'Grid'
                    items: employeeForm.Fn_ShowGrid()

            }]

        });

        return panelContent;
    };


}




/// <reference path="../../ViewsScript/MyLibary/Cls_MyLibary_Views.js" />

/// <reference path="Cls_TabPanel_Views.js" />


function Cls_MenuTree_Views(urlRoot) {

    var myLibary = new Cls_MyLibary_Views();

    var tabPanel = new Cls_TabPanel_Views(urlRoot);

    var url = "";
    var pageName = "";
    var dynamicTabID = "";
   
    
    this.Fn_DisplayMenu = function () {

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

       // if (internalRun === true) {

            var myTree = Ext.create('Ext.tree.Panel', {
                id: 'id-MenuTree-HomePage',
                store: store,
                //store: Fn_StaticMenuTree(),
                rootVisible: false,
                width: 300,
                bodyStyle: 'background:#D1E3DD',
                height: Ext.getBody().getViewSize().height - 120, // (screen.height - 300) + myLibary.Fn_HeightBrowserType(),
                listeners: {
                    itemclick: function (tree, node, item, index, event) {

                        if (node.data.leaf === true) {

                            var menuText = node.get('text');
                            // var menuID = node.get('id');

                            Fn_SetMenuAction(menuText);

                            Ext.getCmp("id-MenuTree-HomePage").hide();
                            Ext.getCmp("id-MenuTree-HomePage").show();
                        }

                    },
                    afterrender: function () {

                        Fn_LoadMenuTree();
                    }
                }
            });

        return myTree;
        
    };


    //------- Load Menu Tree By SSO -------------------------//
    var Fn_LoadMenuTree = function () {
               
        Ext.getCmp('id-MenuTree-HomePage').store.load({
            url: urlRoot + '/LogOn/GetMenu',
            params: {
                USER_NAME: Ext.get('lblUserLogOn-HomePage').dom.innerHTML,
                GROUP_NAME: Ext.get('lblUserGroup-HomePage').dom.innerHTML,
                APP_NAME: Ext.get('lblProgramName-HomePage').dom.innerHTML,
                modeRun: modeRun 
            },
            callback: function () {
            }
        });

    };

   
    //------- Static Menu Tree แค่สร้างไว้ ยังไม่ได้ใช้ --------------//
    var Fn_StaticMenuTree = function () {

        var store = Ext.create('Ext.data.TreeStore', {
            root: {
                expanded: true,
                children: [{
                    text: "homework",
                    expanded: true,
                    children: [{
                        text: "book report",
                        leaf: true
                    }, {
                        text: "algebra",
                        leaf: true
                    }]
                }, {
                    text: "buy lottery tickets",
                    leaf: true
                }]
            }
        });

        return store;
    };

    //--- Dynamic Menu Tree แค่สร้างไว้ ยังไม่ได้ใช้ -----------//
    var Fn_DynamicMenuTree = function () {

        var store = Ext.create('Ext.data.TreeStore', {
            proxy: {
                type: 'ajax',
                url: urlRoot + '',
                extraParams: {
                    enNumber: '',
                    groupName: ''
                }
            },
            root: {
                expanded: true
            }

        });

        return store;
    };

   
    //------ Menu Action ---------------------------//
    var Fn_SetMenuAction = function (menuText) {

        switch (menuText) {

            case "Company":

                dynamicTabID = "CompanyPage";

                var tabAlready = tabPanel.Fn_CheckTabAlready(dynamicTabID);

                if (tabAlready === false) {

                    var company = new Cls_Company_Views(urlRoot);

                    var pageLayout = company.Fn_ShowContent();

                    pageName = menuText;

                    tabPanel.Fn_AddTabPage(url, dynamicTabID, pageName, pageLayout);
                }

                break;

            case "Department":

                dynamicTabID = "DepartmentPage";

                var tabAlready = tabPanel.Fn_CheckTabAlready(dynamicTabID);

                if (tabAlready === false) {

                    var department = new Cls_Department_Views(urlRoot);

                    var pageLayout = department.Fn_ShowContent();

                    pageName = menuText;

                    tabPanel.Fn_AddTabPage(url, dynamicTabID, pageName, pageLayout);
                }

                break;

            case "Position":

                dynamicTabID = "PositionPage";

                var tabAlready = tabPanel.Fn_CheckTabAlready(dynamicTabID);

                if (tabAlready === false) {

                    var position = new Cls_Position_Views(urlRoot);

                    var pageLayout = position.Fn_ShowContent();

                    pageName = menuText;

                    tabPanel.Fn_AddTabPage(url, dynamicTabID, pageName, pageLayout);
                }

                break;

            case "Plant":

                dynamicTabID = "PlantPage";

                var tabAlready = tabPanel.Fn_CheckTabAlready(dynamicTabID);

                if (tabAlready === false) {

                    var plant = new Cls_Plant_Views(urlRoot);

                    var pageLayout = plant.Fn_ShowContent();

                    pageName = menuText;

                    tabPanel.Fn_AddTabPage(url, dynamicTabID, pageName, pageLayout);
                }

                break;

            case "Employee":

                dynamicTabID = "EmployeePage";

                var tabAlready = tabPanel.Fn_CheckTabAlready(dynamicTabID);

                if (tabAlready === false) {

                    var employee = new Cls_Employee_Views(urlRoot);

                    var pageLayout = employee.Fn_ShowContent();

                    pageName = menuText;

                    tabPanel.Fn_AddTabPage(url, dynamicTabID, pageName, pageLayout);
                }

                break;

            case "Truck":

                dynamicTabID = "TruckPage";

                var tabAlready = tabPanel.Fn_CheckTabAlready(dynamicTabID);

                if (tabAlready === false) {

                    var truck = new Cls_Truck_Views(urlRoot);

                    var pageLayout = truck.Fn_ShowContent();

                    pageName = menuText;

                    tabPanel.Fn_AddTabPage(url, dynamicTabID, pageName, pageLayout);
                }

                break;

            case "Material Type":

                dynamicTabID = "MaterialTypePage";

                var tabAlready = tabPanel.Fn_CheckTabAlready(dynamicTabID);

                if (tabAlready === false) {

                    var materialType = new Cls_MaterialType_Views(urlRoot);

                    var pageLayout = materialType.Fn_ShowContent();

                    pageName = menuText;

                    tabPanel.Fn_AddTabPage(url, dynamicTabID, pageName, pageLayout);
                }

                break;

            case "Material":

                dynamicTabID = "MaterialPage";

                var tabAlready = tabPanel.Fn_CheckTabAlready(dynamicTabID);

                if (tabAlready === false) {

                    var material = new Cls_Material_Views(urlRoot);

                    var pageLayout = material.Fn_ShowContent();

                    pageName = menuText;

                    tabPanel.Fn_AddTabPage(url, dynamicTabID, pageName, pageLayout);
                }

                break;

            case "Unit":

                dynamicTabID = "UnitPage";

                var tabAlready = tabPanel.Fn_CheckTabAlready(dynamicTabID);

                if (tabAlready === false) {

                    var unit = new Cls_Unit_Views(urlRoot);

                    var pageLayout = unit.Fn_ShowContent();

                    pageName = menuText;

                    tabPanel.Fn_AddTabPage(url, dynamicTabID, pageName, pageLayout);
                }

                break;

            case "Formula":

                dynamicTabID = "FormulaPage";

                var tabAlready = tabPanel.Fn_CheckTabAlready(dynamicTabID);

                if (tabAlready === false) {

                    var formula = new Cls_Formula_Views(urlRoot);

                    var pageLayout = formula.Fn_ShowContent();

                    pageName = menuText;

                    tabPanel.Fn_AddTabPage(url, dynamicTabID, pageName, pageLayout);
                }

                break;

            case "Formula Item":

                dynamicTabID = "FormulaItemPage";

                var tabAlready = tabPanel.Fn_CheckTabAlready(dynamicTabID);

                if (tabAlready === false) {

                    var formulaItem = new Cls_FormulaItem_Views(urlRoot);

                    var pageLayout = formulaItem.Fn_ShowContent();

                    pageName = menuText;

                    tabPanel.Fn_AddTabPage(url, dynamicTabID, pageName, pageLayout);
                }

                break;

            case "Customer":

                dynamicTabID = "CustomerPage";

                var tabAlready = tabPanel.Fn_CheckTabAlready(dynamicTabID);

                if (tabAlready === false) {

                    var customer = new Cls_Customer_Views(urlRoot);

                    var pageLayout = customer.Fn_ShowContent();

                    pageName = menuText;

                    tabPanel.Fn_AddTabPage(url, dynamicTabID, pageName, pageLayout);
                }

                break;

            case "Project":

                dynamicTabID = "ProjectPage";

                var tabAlready = tabPanel.Fn_CheckTabAlready(dynamicTabID);

                if (tabAlready === false) {

                    var project = new Cls_Project_Views(urlRoot);

                    var pageLayout = project.Fn_ShowContent();

                    pageName = menuText;

                    tabPanel.Fn_AddTabPage(url, dynamicTabID, pageName, pageLayout);
                }

                break;

            case "Job Site":

                dynamicTabID = "JobSitePage";

                var tabAlready = tabPanel.Fn_CheckTabAlready(dynamicTabID);

                if (tabAlready === false) {

                    var jobSite = new Cls_JobSite_Views(urlRoot);

                    var pageLayout = jobSite.Fn_ShowContent();

                    pageName = menuText;

                    tabPanel.Fn_AddTabPage(url, dynamicTabID, pageName, pageLayout);
                }

                break;

            case "Customer Have Project":

                dynamicTabID = "CustomerProjectPage";

                var tabAlready = tabPanel.Fn_CheckTabAlready(dynamicTabID);

                if (tabAlready === false) {

                    var customerProject = new Cls_CustomerProject_Views(urlRoot);

                    var pageLayout = customerProject.Fn_ShowContent();

                    pageName = menuText;

                    tabPanel.Fn_AddTabPage(url, dynamicTabID, pageName, pageLayout);
                }

                break;

            case "Project Have Job Site":

                dynamicTabID = "ProjectJobSitePage";

                var tabAlready = tabPanel.Fn_CheckTabAlready(dynamicTabID);

                if (tabAlready === false) {

                    var projectJobSite = new Cls_ProjectJobSite_Views(urlRoot);

                    var pageLayout = projectJobSite.Fn_ShowContent();

                    pageName = menuText;

                    tabPanel.Fn_AddTabPage(url, dynamicTabID, pageName, pageLayout);
                }

                break;

            case "Sale Have Project":

                dynamicTabID = "SaleProjectPage";

                var tabAlready = tabPanel.Fn_CheckTabAlready(dynamicTabID);

                if (tabAlready === false) {

                    var saleProject = new Cls_SaleProject_Views(urlRoot);

                    var pageLayout = saleProject.Fn_ShowContent();

                    pageName = menuText;

                    tabPanel.Fn_AddTabPage(url, dynamicTabID, pageName, pageLayout);
                }

                break;

            case "Plant Have Material":

                dynamicTabID = "PlantMaterialPage";

                var tabAlready = tabPanel.Fn_CheckTabAlready(dynamicTabID);

                if (tabAlready === false) {

                    var plantMaterial = new Cls_PlantMaterial_Views(urlRoot);

                    var pageLayout = plantMaterial.Fn_ShowContent();

                    pageName = menuText;

                    tabPanel.Fn_AddTabPage(url, dynamicTabID, pageName, pageLayout);
                }

                break;

            case "Order":

                dynamicTabID = "OrderPage";

                var tabAlready = tabPanel.Fn_CheckTabAlready(dynamicTabID);

                if (tabAlready === false) {

                    var order = new Cls_Order_Views(urlRoot);

                    var pageLayout = order.Fn_ShowContent();

                    pageName = menuText;

                    tabPanel.Fn_AddTabPage(url, dynamicTabID, pageName, pageLayout);
                }

                break;

            case "Manufacture":

                dynamicTabID = "ManufacturePage";

                var tabAlready = tabPanel.Fn_CheckTabAlready(dynamicTabID);

                if (tabAlready === false) {

                    var manufacture = new Cls_Manufacture_Views(urlRoot);

                    var pageLayout = manufacture.Fn_ShowContent();

                    pageName = menuText;

                    tabPanel.Fn_AddTabPage(url, dynamicTabID, pageName, pageLayout);
                }

                break;

        }

    };
}
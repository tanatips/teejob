
let Cls_TeenyWebApi_Property = require("./Main/Property/TeenyWebApi/Cls_TeenyWebApi_Property.js");

//let Cls_Private_Subscriber = require("./Main/Mqtt/Private/Cls_Private_Subscriber.js");
//let Cls_Public_Subscriber = require("./Main/Mqtt/Public/Cls_Public_Subscriber.js");

global.myGlobal = new Cls_TeenyWebApi_Property();

//Cls_Private_Subscriber.Fn_OnConnect();
//Cls_Private_Subscriber.Fn_OnMessage();

//Cls_Public_Subscriber.Fn_OnConnect();
//Cls_Public_Subscriber.Fn_OnMessage();

//=== Response Home Page ===//
myGlobal.App.use(myGlobal.Express.static(myGlobal.Path.join(__dirname)));

//=== Create host ===//
server = myGlobal.App.listen(myGlobal.ItemConfig.WEB_APP.PORT, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log('Running Port No. at http://%s:%s', host, port);
});

//myGlobal.io = require('socket.io').listen(server);


//=== Using Controller ===//   

//============== Profile ============//
require('./Controller/Profile/Companied/Company/Cls_Company_Controller.js');
require('./Controller/Profile/Companied/Plant/Cls_Plant_Controller.js');
require('./Controller/Profile/Companied/Truck/Cls_Truck_Controller.js');

require('./Controller/Profile/Companied/Employees/Employee/Cls_Employee_Controller.js')
require('./Controller/Profile/Companied/Employees/Department/Cls_Department_Controller.js');
require('./Controller/Profile/Companied/Employees/Position/Cls_Position_Controller.js');

require('./Controller/Profile/Companied/Store/Material/Cls_Material_Controller.js');
require('./Controller/Profile/Companied/Store/MaterialType/Cls_MaterialType_Controller.js');

require('./Controller/Profile/Companied/Factory/Unit/Cls_Unit_Controller.js');
require('./Controller/Profile/Companied/Factory/Formula/Cls_Formula_Controller.js')
require('./Controller/Profile/Companied/Factory/FormulaItem/Cls_FormulaItem_Controller.js');

require('./Controller/Profile/Custom/Customer/Cls_Customer_Controller.js');
require('./Controller/Profile/Custom/CustomerType/Cls_CustomerType_Controller.js');

require('./Controller/Profile/Custom/Project/Cls_Project_Controller.js');
require('./Controller/Profile/Custom/JobSite/Cls_JobSite_Controller.js');

require('./Controller/Profile/Companied/Factory/Product/Cls_Product_Controller.js');
require('./Controller/Profile/Companied/Factory/ProductGroup/Cls_ProductGroup_Controller.js');
require('./Controller/Profile/Companied/Factory/ProductSpec/Cls_ProductSpec_Controller.js');

require('./Controller/Profile/Custom/OrderPayment/Cls_OrderPayment_Controller.js');
//============== Status ============//
require('./Controller/Profile/Companied/StatusGroup/Cls_StatusGroup_Controller.js');
require('./Controller/Profile/Companied/Status/Cls_Status_Controller.js');


//============== Setting ============//
require('./Controller/Setting/CustomerProject/Cls_CustomerProject_Controller.js');
require('./Controller/Setting/ProjectJobSite/Cls_ProjectJobSite_Controller.js');
require('./Controller/Setting/SaleProject/Cls_SaleProject_Controller.js');
require('./Controller/Setting/PlantMaterial/Cls_PlantMaterial_Controller.js');

//============== Order ============//
require('./Controller/Worker/Order/Cls_Order_Controller.js');
require('./Controller/Worker/OrderFormula/Cls_OrderFormula_Controller.js');
require('./Controller/Worker/OrderProduct/Cls_OrderProduct_Controller.js');

require('./Controller/Worker/Shipment/Cls_Shipment_Controller.js');

require('./Controller/Worker/Manufacture/Cls_Manufacture_Controller.js');

//============== Report ============//
require('./Controller/Report/ActualReport/Cls_ActualReport_Controller.js');
require('./Controller/Report/DaylyReport/Cls_DaylyReport_Controller.js');
require('./Controller/Report/ShipmentDocument/Cls_ShipmentDocument_Controller.js');
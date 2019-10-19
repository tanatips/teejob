
let Cls_Teeny_Property = require("./Main/Property/Teeny/Cls_Teeny_Property.js");

let Cls_Private_Subscriber = require("./Main/Subscriber/Private/Cls_Private_Subscriber.js");
let Cls_Public_Subscriber = require("./Main/Subscriber/Public/Cls_Public_Subscriber.js");

global.myGlobal = new Cls_Teeny_Property();

Cls_Private_Subscriber.Fn_OnConnect();
Cls_Private_Subscriber.Fn_OnMessage();

Cls_Public_Subscriber.Fn_OnConnect();
Cls_Public_Subscriber.Fn_OnMessage();

//----- Response Home Page ---------------//
myGlobal.App.use(myGlobal.ItemConfig.WEB_APP.WEB_NAME, myGlobal.Express.static(myGlobal.Path.join(__dirname + '/public/app')));

//-------- Create host -------------//
server = myGlobal.App.listen(myGlobal.ItemConfig.WEB_APP.PORT, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log('Running Port No. at http://%s:%s', host, port);
});

myGlobal.io = require('socket.io').listen(server);


//=== User Controller ===//
require("./Controller/LogOn/Cls_LogOn_Controller.js");
require("./Controller/Companied/Company/Cls_Company_Controller.js");
require("./Controller/Companied/Employees/Department/Cls_Department_Controller.js");
require("./Controller/Companied/Employees/Position/Cls_Position_Controller.js");
require("./Controller/Companied/Employees/Employee/Cls_Employee_Controller.js");
require("./Controller/Companied/Plant/Cls_Plant_Controller.js");
require("./Controller/Companied/Truck/Cls_Truck_Controller.js");
require("./Controller/Companied/Store/MaterialType/Cls_MaterialType_Controller.js");
require("./Controller/Companied/Store/Material/Cls_Material_Controller.js");
require("./Controller/Companied/Factory/Unit/Cls_Unit_Controller.js");
require("./Controller/Companied/Factory/Formula/Cls_Formula_Controller.js");
require("./Controller/Companied/Factory/FormulaItem/Cls_FormulaItem_Controller.js");
require("./Controller/Companied/Factory/ProductGroup/Cls_ProductGroup_Controller.js");
require("./Controller/Companied/Factory/Product/Cls_Product_Controller.js");
require("./Controller/Companied/Factory/ProductSpec/Cls_ProductSpec_Controller.js");


require("./Controller/Custom/Customer/Cls_Customer_Controller.js");
require("./Controller/Custom/JobSite/Cls_JobSite_Controller.js");
require("./Controller/Custom/Project/Cls_Project_Controller.js");
require("./Controller/Custom/CustomerType/Cls_CustomerType_Controller.js");
require("./Controller/Custom/OrderPayment/Cls_OrderPayment_Controller.js");

require("./Controller/Setting/CustomerProject/Cls_CustomerProject_Controller.js");
require("./Controller/Setting/ProjectJobSite/Cls_ProjectJobSite_Controller.js");
require("./Controller/Setting/SaleProject/Cls_SaleProject_Controller.js");
require("./Controller/Setting/PlantMaterial/Cls_PlantMaterial_Controller.js");

require('./Controller/Companied/StatusGroup/Cls_StatusGroup_Controller.js');
require('./Controller/Companied/Status/Cls_Status_Controller.js');

require("./Controller/Worker/Order/Cls_Order_Controller.js");
require("./Controller/Worker/OrderFormula/Cls_OrderFormula_Controller.js");
require("./Controller/Worker/OrderProduct/Cls_OrderProduct_Controller.js");

require("./Controller/Worker/Manufacture/Cls_Manufacture_Controller.js");



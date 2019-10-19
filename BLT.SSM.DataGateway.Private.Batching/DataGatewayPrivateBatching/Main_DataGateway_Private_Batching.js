

let Cls_DataGatewayPrivate_Property = require("./Main/Property/DataGatewayPrivate/Cls_DataGatewayPrivate_Property.js");

global.myGlobal = new Cls_DataGatewayPrivate_Property();


//let Cls_Private_Subscriber = require("./Main/Subscriber/Private/Cls_Private_Subscriber.js");
let Cls_Public_Subscriber = require("./Main/Subscriber/Public/Cls_Public_Subscriber.js");

//Cls_Private_Subscriber.Fn_OnConnect();
//Cls_Private_Subscriber.Fn_OnMessage();

Cls_Public_Subscriber.Fn_OnConnect();
Cls_Public_Subscriber.Fn_OnMessage();
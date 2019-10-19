
class Cls_Public_Subscriber {

    //=== Define Event Connected Broker Public ===//
    static Fn_OnConnect() {

        myGlobal.BrokerPublic.on('connect', function () {

            console.log('Connected Broker Cloud:' + myGlobal.ItemConfig.BROKER_PUBLIC.HOST + '  port:' + myGlobal.ItemConfig.BROKER_PUBLIC.PORT);

            //=== Define Toppic ===//            
            for (let i = 0; i < myGlobal.ItemConfig.MY_TOPPIC.length; i++) {

                myGlobal.BrokerPublic.subscribe(myGlobal.ItemConfig.MY_TOPPIC[i].TOPPIC_NAME);
            }

        });
    }

    //=== Message from Public ===//
    static Fn_OnMessage() {

        let Cls_DataForMachine_Controller = require("../../../Controller/DataForMachine/Cls_DataForMachine_Controller");

        myGlobal.BrokerPublic.on('message', function (topic, msg, packet) {

            try {

                //console.log('Receive Message : "' + msg.toString());
               
                let dataItem = JSON.parse(msg.toString());

                switch (topic) {

                    //=== /DataGatewayPrivate/ContactPrivateWebApi/SSMBatch ===//
                    case myGlobal.ItemConfig.MY_TOPPIC[0].TOPPIC_NAME:

                        let dataForMachine = new Cls_DataForMachine_Controller();

                        switch (dataItem.ACTION) {

                            case "Shipment/SendDataToMachine":

                                dataForMachine.Fn_Insert(dataItem);

                                break;
                        }

                        break;
                }
              
            }
            catch (err) {
                console.log("Error: " + err);
            }

             

        });        
    }

};

module.exports = Cls_Public_Subscriber;
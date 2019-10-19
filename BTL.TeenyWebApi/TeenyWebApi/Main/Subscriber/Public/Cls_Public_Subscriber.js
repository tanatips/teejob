
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
        
        myGlobal.BrokerPublic.on('message', function (topic, msg, packet) {

            try {

                //console.log('Receive Message : "' + msg.toString());

                let dataItem = JSON.parse(msg.toString());

                switch (topic) {

                    //=== /McMonitorDashboard/UTLCoolantC/DataGatewayAttach ===//
                    case myGlobal.ItemConfig.MY_TOPPIC[0].TOPPIC_NAME:

                        break;
                }
            }
            catch (err) {
                console.log("Error: " + err);
            }

        });

    }

};

module.exports = Cls_Public_Mqtt;
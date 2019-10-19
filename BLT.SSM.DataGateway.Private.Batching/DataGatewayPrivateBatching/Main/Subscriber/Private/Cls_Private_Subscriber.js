

class Cls_Private_Subscriber {
    
    //=== Define Event Connected Broker Private ===//
    static Fn_OnConnect() {

        myGlobal.BrokerPrivate.on('connect', function () {

            console.log('Connected Broker Local:' + myGlobal.ItemConfig.BROKER_PRIVATE.HOST + '  port:' + myGlobal.ItemConfig.BROKER_PRIVATE.PORT);

            //=== Define Toppic ===//            
            for (let i = 0; i < myGlobal.ItemConfig.MY_TOPPIC.length; i++) {

                myGlobal.BrokerPrivate.subscribe(myGlobal.ItemConfig.MY_TOPPIC[i].TOPPIC_NAME);
            }


        });
    }

    //=== Message from private ===//
    static Fn_OnMessage() {
              

        myGlobal.BrokerPrivate.on('message', function (topic, msg, packet) {

            try {

                //console.log('Receive Message : "' + msg.toString());

                let dataItem = JSON.parse(msg.toString());

                switch (topic) {

                    case myGlobal.ItemConfig.MY_TOPPIC[0].TOPPIC_NAME:

                        break;

                    case myGlobal.ItemConfig.MY_TOPPIC[1].TOPPIC_NAME:

                        break;
                }

            }
            catch (err) {
                console.log("Error: " + err);
            }

        });
            
    }

}

module.exports = Cls_Private_Subscriber;
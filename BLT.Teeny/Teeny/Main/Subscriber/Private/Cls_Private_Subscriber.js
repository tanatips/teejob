
class Cls_Private_Subscriber {
    
    //=== Define Event Connected Broker Private ===//
    static Fn_OnConnect() {

        myGlobal.BrokerPrivate.on('connect', function () {

            console.log('Connected Broker Local:' + myGlobal.ItemConfig.BROKER_PRIVATE.HOST + '  port:' + myGlobal.ItemConfig.BROKER_PRIVATE.PORT);

            //=== Define Toppic ===//            
            //for (let i = 0; i < myGlobal.ItemConfig.MY_TOPPIC.length; i++) {

                myGlobal.BrokerPrivate.subscribe(myGlobal.ItemConfig.MY_TOPPIC[1].TOPPIC_NAME);
           // }


        });
    }

    //=== Message from private ===//
    static Fn_OnMessage() {                

        myGlobal.BrokerPrivate.on('message', function (topic, msg, packet) {

            try {

                //console.log('Receive Message : "' + msg.toString());

                let dataItem = JSON.parse(msg.toString());

                switch (topic) {

                    //=== /TeenyWebApp/ContactDataGatewayPrivate/SSMBatch ===//
                    case myGlobal.ItemConfig.MY_TOPPIC[1].TOPPIC_NAME:

                        let res = "";
                        let story = "";

                        for (let i = 0; i < myGlobal.ListResponse.length; i++) {

                            if (myGlobal.ListResponse[i].token === dataItem.TOKEN) {

                                res = myGlobal.ListResponse[i].res;
                                story = myGlobal.ListResponse[i].STORY;

                                myGlobal.ListResponse.splice(i, 1);

                                i = myGlobal.ListResponse.length;
                            }
                        }

                        let jsonStr = "";

                        if (story === "DataAccess") {
                            jsonStr = JSON.stringify(dataItem.Data.ResultList);
                        }
                        else if (story === "SecurityControl") {
                            jsonStr = JSON.stringify(dataItem.Data);
                        }

                        res.end(jsonStr);

                        break;
                }

            }
            catch (err) {
                console.log("Error: " + err);
            }

        });
            
    }

};


module.exports = Cls_Private_Subscriber;
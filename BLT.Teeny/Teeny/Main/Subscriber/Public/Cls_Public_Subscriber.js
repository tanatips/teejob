
class Cls_Public_Subscriber {

    //=== Define Event Connected Broker Public ===//
    static Fn_OnConnect() {

        myGlobal.BrokerPublic.on('connect', function () {

            console.log('Connected Broker Cloud:' + myGlobal.ItemConfig.BROKER_PUBLIC.HOST + '  port:' + myGlobal.ItemConfig.BROKER_PUBLIC.PORT);

            //=== Define Toppic ===//            
           // for (let i = 0; i < myGlobal.ItemConfig.MY_TOPPIC.length; i++) {

                myGlobal.BrokerPublic.subscribe(myGlobal.ItemConfig.MY_TOPPIC[0].TOPPIC_NAME);
           // }

        });
    }

    //=== Message from Public ===//
    static Fn_OnMessage() {
        
        myGlobal.BrokerPublic.on('message', function (topic, msg, packet) {

            try {

                // console.log('Receive Message : "' + msg.toString());

                let dataItem = JSON.parse(msg.toString());

                switch (topic) {

                    //=== /TeenyWebApp/ContactDataGatewayPublic/SSMBatch ===//
                    case myGlobal.ItemConfig.MY_TOPPIC[0].TOPPIC_NAME:

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


module.exports = Cls_Public_Subscriber;
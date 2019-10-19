

class Cls_SaleProject_Models {

    //=== ---- Connect MQTT Broker ---- ===//
    Fn_SendMqttPublish(toppicRequest, jsonStr) {

        let brokerPublic = myGlobal.Mqtt.connect({
            host: myGlobal.ItemConfig.BROKER_PUBLIC.HOST,
            port: myGlobal.ItemConfig.BROKER_PUBLIC.PORT,
            username: myGlobal.ItemConfig.MQTT_AUTHEN_PUBLIC.USER_NAME,
            password: myGlobal.ItemConfig.MQTT_AUTHEN_PUBLIC.PASSWORD
        });

        brokerPublic.on('connect', function () {

            //console.log("Data from web API Ok, Return: " + dataItem.ACTION_RETURN);

            //=== publisher to Public ===//
            brokerPublic.publish(toppicRequest, Buffer.from(jsonStr, 'utf8'), myGlobal.Options, function (error) {

                if (error !== null) {
                    console.log("Public error: " + error);
                }
            });

            brokerPublic.end();

        });

    }


    Fn_CallInternalWebApi(urlWebApi, dataItem, callback) {
               
        var options = {
            url: urlWebApi,
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Accept-Charset': 'utf-8',
                'User-Agent': 'my-reddit-client'
            },
            form: {
                data: JSON.stringify(dataItem)
            }
        };


        myGlobal.Request(options, function (error, response, body) {

            if (!error && response.statusCode === 200) {

                //var item = JSON.parse(body);
                //var jsonStr = JSON.stringify(item);

                callback(body);
            }
            else {
                //console.log("Error: " + error);

                let resultData = {
                    StatusOnDb: false,
                    MessageOnDb: err.message
                };

                callback(resultData);
            }
        });

      
    }
};

module.exports = Cls_SaleProject_Models;

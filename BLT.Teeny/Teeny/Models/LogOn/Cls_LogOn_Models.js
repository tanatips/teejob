
class Cls_LogOn_Models {

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

    Fn_GetGroup(body, callback) {

        //======= Get Group From Web API ===============//           
        var options = {
            url: myGlobal.ItemConfig.WEB_API_SECURITY.URL + "/LogOn/GetGroup",
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Accept-Charset': 'utf-8',
                'User-Agent': 'my-reddit-client'
            },
            form: {
                data: JSON.stringify(body)
            }
        };

       // var xx = "";

        myGlobal.Request(options, function (error, response, body) {

            if (!error && response.statusCode === 200) {

                //var item = JSON.parse(body);

                //var jsonStr = JSON.stringify(item);

                callback(body);
            }
            else {
                console.log("Error: " + error);

                var resultData = {
                    "Group_ID": 1,
                    "Group_Name": "Error"
                };

                var jsonStr = JSON.stringify(resultData);

                res.end(jsonStr);
            }
        });

    }

    Fn_GetMenu(body, callback) {

        //======= Get Menu From Web API ===============//           
        var options = {
            url: myGlobal.ItemConfig.WEB_API_SECURITY.URL + "/LogOn/GetMenu",
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Accept-Charset': 'utf-8',
                'User-Agent': 'my-reddit-client'
            },
            form: {
                data: JSON.stringify(body)              
            }
        };

        myGlobal.Request(options, function (error, response, body) {

            if (!error && response.statusCode === 200) {

                //var item = JSON.parse(body);

                // var jsonStr = JSON.stringify(item);

                callback(body);
            }
            else {

            }
        });
    }
};


module.exports = Cls_LogOn_Models;
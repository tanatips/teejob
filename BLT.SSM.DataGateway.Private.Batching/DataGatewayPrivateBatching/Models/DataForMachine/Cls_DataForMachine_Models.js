
class Cls_DataForMachine_Models {

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
                data: JSON.stringify(dataItem.FORM.data)
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

module.exports = Cls_DataForMachine_Models;
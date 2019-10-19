
class Cls_Teeny_Property {
    
    constructor() {

        this.Express = require('express');
        this.App = this.Express();
        this.HttpServer = require('http').Server(this.App);
        this.io = require('socket.io')(this.HttpServer);

        this.Path = require("path");
        this.Fs = require("fs");
        this.Request = require('request');
        this.Mqtt = require('mqtt');
        this.Sleep = require('system-sleep');       

        this.BodyParser = require('body-parser');
        this.App.use(this.BodyParser.urlencoded({ extended: true }));
        this.App.use(this.BodyParser.json());


     //==========================================================================================//
        this.ItemConfig = this.Fn_ReadFileConfig();

        this.Options = {
            qos: 2,
            clientId: 'Teeny_WebApp' + Math.random().toString(16).substr(2, 10),
            clean: false,
            retain: false,
            keepalive: 60, // seconds, set to 0 to disable
            reconnectPeriod: 1000 // milliseconds        
        };

        this.ListResponse = [{
            res: "",
            token: "",
            STORY: ""
        }];

        //=== Connect broker private ===//
        this.BrokerPrivate = this.Mqtt.connect({
            host: this.ItemConfig.BROKER_PRIVATE.HOST,
            port: this.ItemConfig.BROKER_PRIVATE.PORT,
            username: this.ItemConfig.MQTT_AUTHEN_PRIVATE.USER_NAME,
            password: this.ItemConfig.MQTT_AUTHEN_PRIVATE.PASSWORD
        });

        //=== Connect broker public ===//
        this.BrokerPublic = this.Mqtt.connect({
            host: this.ItemConfig.BROKER_PUBLIC.HOST,
            port: this.ItemConfig.BROKER_PUBLIC.PORT,
            username: this.ItemConfig.MQTT_AUTHEN_PUBLIC.USER_NAME,
            password: this.ItemConfig.MQTT_AUTHEN_PUBLIC.PASSWORD
        });

     //==========================================================================================//
        //=== Define Variable ===//
        
        //this.RangeDM = 0;
        //this.ListDM = [];

       
    }

    Fn_ReadFileConfig() {

        //# Read File Configuration #//
        let dataConfig = this.Fs.readFileSync(this.Path.join(__dirname, "/../../../File_Config.json"), "utf8");

        let itemConfig = JSON.parse(dataConfig);

        return itemConfig
    }
   

}

module.exports = Cls_Teeny_Property;
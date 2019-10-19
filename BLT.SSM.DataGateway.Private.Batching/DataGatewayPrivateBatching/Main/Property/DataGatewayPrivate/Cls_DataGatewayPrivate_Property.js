
class Cls_DataGatewayPrivate_Property {
    
    constructor() {

        this.Express = require('express');
        this.App = this.Express();
        this.HttpServer = require('http').Server(this.App);
        this.Path = require("path");
        this.Fs = require("fs");
        this.Request = require('request');
        this.Mqtt = require('mqtt');
        this.Sleep = require('system-sleep');

        require('events').EventEmitter.defaultMaxListeners = 1000;

     //==========================================================================================//
        this.ItemConfig = this.Fn_ReadFileConfig();
            
        this.Options = {            
            qos: 2, //set to false to receive QoS 1 and 2
            clientId: 'SSM_Private_DataGateway' + Math.random().toString(16).substr(2, 10),
            clean: false,
            retain: false,
            keepalive: 60, // seconds, set to 0 to disable
            reconnectPeriod: 1000 // milliseconds
        };
        
        //# Connect broker private #//        
        this.BrokerPrivate = this.Mqtt.connect({
            host: this.ItemConfig.BROKER_PRIVATE.HOST,
            port: this.ItemConfig.BROKER_PRIVATE.PORT,
            username: this.ItemConfig.MQTT_AUTHEN_PRIVATE.USER_NAME,
            password: this.ItemConfig.MQTT_AUTHEN_PRIVATE.PASSWORD
        });

       //# Connect broker public #//        
        this.BrokerPublic = this.Mqtt.connect({
            host: this.ItemConfig.BROKER_PUBLIC.HOST,
            port: this.ItemConfig.BROKER_PUBLIC.PORT,
            username: this.ItemConfig.MQTT_AUTHEN_PUBLIC.USER_NAME,
            password: this.ItemConfig.MQTT_AUTHEN_PUBLIC.PASSWORD
        });        

        

        /*
        this.OptionPrivate = {
            host: "mqtt://" + this.ItemConfig.BROKER_PRIVATE.HOST,
            port: this.ItemConfig.BROKER_PRIVATE.PORT,
            username: this.ItemConfig.MQTT_AUTHEN_PRIVATE.USER_NAME,
            password: this.ItemConfig.MQTT_AUTHEN_PRIVATE.PASSWORD,
            clientId: 'CoolantC_' + Math.random().toString(16).substr(2, 8),
            keepalive: 60,
            reconnectPeriod: 1000,
            protocolId: 'MQIsdp',
            protocolVersion: 3,
            retain: false,
            qos: 1,
            clean: true,
            encoding: 'utf8'
        };

        this.OptionPublic = {
            host: "mqtt://" + this.ItemConfig.BROKER_PUBLIC.HOST,
            port: this.ItemConfig.BROKER_PUBLIC.PORT,
            username: this.ItemConfig.MQTT_AUTHEN_PUBLIC.USER_NAME,
            password: this.ItemConfig.MQTT_AUTHEN_PUBLIC.PASSWORD,
            clientId: 'CoolantC_' + Math.random().toString(16).substr(2, 8),
            keepalive: 60,
            reconnectPeriod: 3000,
            protocolId: 'MQIsdp',
            protocolVersion: 3,
            retain: false,
            qos: 1,
            clean: true,
            encoding: 'utf8'
        };

        this.BrokerPrivate = this.Mqtt.connect("mqtt://" + this.ItemConfig.BROKER_PRIVATE.HOST, this.OptionPrivate);
              
        this.BrokerPublic = this.Mqtt.connect("mqtt://" + this.ItemConfig.BROKER_PUBLIC.HOST, this.OptionPublic);
        */

     //==========================================================================================//
        //# Define Variable #//
        
        this.RangeDM = 0;
        this.ListDM = [];

        this.AmountCoil = 50;
        this.ListCommand = [];
        this.NextCommand = 0;
        this.ListResult = [];
        this.Timer = "";

        this.RecNo = 0;
        this.RecNoBefor = 0;
        this.CheckCount = 0;

        this.ListConditionCode = [];
        this.TimerDisconnect;
        
    }

    Fn_ReadFileConfig() {

        //# Read File Configuration #//
        let dataConfig = this.Fs.readFileSync(this.Path.join(__dirname, "/../../../File_Config.json"), "utf8");

        let itemConfig = JSON.parse(dataConfig);

        return itemConfig
    }
   

}

module.exports = Cls_DataGatewayPrivate_Property;

var mysql = require('mysql');

module.exports = {
    /*
    Connection : mysql.createConnection({
        
                //--------------- Server ------------//
                host: '150.95.80.156',
                user: 'iotadmin',
                password:'iotadmin',
                database: 'SecurityCenter',
                multipleStatements: true
    }), 
    */
    Connection: mysql.createConnection({
        //--------------- Server ------------//
        host: myGlobal.ItemConfig.DatabaseConfig.DB_HOST,
        user: myGlobal.ItemConfig.DatabaseConfig.DB_USER,
        password: myGlobal.ItemConfig.DatabaseConfig.PASSWORD,
        database: myGlobal.ItemConfig.DatabaseConfig.DB_NAME,
        multipleStatements: true
    }),
    SelectList: function (sqlList, callback) {
        this.Connection.query(sqlList[0] + ";" + sqlList[1], [], function (err, result) {

            if (!err) {

                var OutputOnDb = {
                    ClassOnDb: '',
                    MethodOnDb: 'SelectList',
                    StatusOnDb: true,
                    MessageOnDb: 'Search Data Success',
                    ResultOnDb: result[2],
                    TotalCountOnDb: result[0][0].TOTAL_COUNT
                };

                callback(OutputOnDb);
            }
            else {

                var OutputOnDb = {
                    StatusOnDb: false,
                    ClassOnDb: '',
                    MethodOnDb: 'Select',
                    ResultOnDb: '',
                    MessageOnDb: 'Execute SQL Fail : \n' + err + " \n" + sqlList[0],
                    TotalCountOnDb: ''
                };

                callback(OutputOnDb);
            }
        });
    },
    Select: function (sql, callback) {
        this.Connection.query(sql, function (err, result) {

            if (!err) {

                var OutputOnDb = {
                    StatusOnDb: true,
                    ClassOnDb: '',
                    MethodOnDb: 'Select',
                    ResultOnDb: result,
                    MessageOnDb: 'Search Data Success',
                    TotalCountOnDb: ''
                };

                callback(OutputOnDb);
            }
            else {

                var OutputOnDb = {
                    StatusOnDb: false,
                    ClassOnDb: '',
                    MethodOnDb: 'Select',
                    ResultOnDb: '',
                    MessageOnDb: 'Execute SQL Fail : \n' + err + " \n" + sql,
                    TotalCountOnDb: ''
                };

                callback(OutputOnDb);
            }
        });
    },
    Insert: function (sql, callback) {
        this.Connection.query(sql, function (err, result) {

            if (!err) {

                var OutputOnDb = {
                    StatusOnDb: true,
                    ClassOnDb: '',
                    MethodOnDb: 'Insert',
                    ResultOnDb: '',
                    MessageOnDb: 'Save Data Success',
                    TotalCountOnDb: ''
                };

                callback(OutputOnDb);
            }
            else {

                var OutputOnDb = {
                    StatusOnDb: false,
                    ClassOnDb: '',
                    MethodOnDb: 'Insert',
                    ResultOnDb: '',
                    MessageOnDb: 'Execute SQL Fail : \n' + err + " \n" + sql,
                    TotalCountOnDb: ''
                };

                callback(OutputOnDb);
            }
        });
    },
    Update: function (sql, callback) {
        this.Connection.query(sql, function (err, result) {

            if (!err) {

                var OutputOnDb = {
                    StatusOnDb: true,
                    ClassOnDb: '',
                    MethodOnDb: 'Update',
                    ResultOnDb: '',
                    MessageOnDb: 'Update Data Success',
                    TotalCountOnDb: ''
                };

                callback(OutputOnDb);
            }
            else {

                var OutputOnDb = {
                    StatusOnDb: false,
                    ClassOnDb: '',
                    MethodOnDb: 'Update',
                    ResultOnDb: '',
                    MessageOnDb: 'Execute SQL Fail : \n' + err + " \n" + sql,
                    TotalCountOnDb: ''
                };

                callback(OutputOnDb);
            }
        });
    },
    Delete: function (sql, callback) {
        this.Connection.query(sql, function (err, result) {

            if (!err) {

                var OutputOnDb = {
                    StatusOnDb: true,
                    ClassOnDb: '',
                    MethodOnDb: 'Delete',
                    ResultOnDb: '',
                    MessageOnDb: 'Delete Data Success',
                    TotalCountOnDb: ''
                };

                callback(OutputOnDb);
            }
            else {

                var OutputOnDb = {
                    StatusOnDb: false,
                    ClassOnDb: '',
                    MethodOnDb: 'Delete',
                    ResultOnDb: '',
                    MessageOnDb: 'Execute SQL Fail : \n' + err + " \n" + sql,
                    TotalCountOnDb: ''
                };

                callback(OutputOnDb);
            }
        });
    },
    TransactionConnect: function (callback) {
        this.Connection.beginTransaction(function (err) {

            if (!err) {

                var OutputOnDb = {
                    StatusOnDb: true,
                    ClassOnDb: '',
                    MethodOnDb: 'Transaction',
                    ResultOnDb: '',
                    MessageOnDb: '',
                    TotalCountOnDb: ''
                };

                callback(OutputOnDb);
            }
            else {

                var OutputOnDb = {
                    StatusOnDb: false,
                    ClassOnDb: '',
                    MethodOnDb: 'Transaction',
                    ResultOnDb: '',
                    MessageOnDb: 'Open Transaction Fail',
                    TotalCountOnDb: ''
                };

                callback(OutputOnDb);
            }
        });
    },
    Close: function () {
        this.Connection.end();
    },
    Commit: function (callback) {
        this.Connection.commit(function (err) {

            if (!err) {

                var OutputOnDb = {
                    StatusOnDb: true,
                    ClassOnDb: '',
                    MethodOnDb: 'Commit',
                    ResultOnDb: '',
                    MessageOnDb: '',
                    TotalCountOnDb: ''
                };

                callback(OutputOnDb);
            }
            else {

                var OutputOnDb = {
                    StatusOnDb: false,
                    ClassOnDb: '',
                    MethodOnDb: 'Commit',
                    ResultOnDb: '',
                    MessageOnDb: 'Commit Fail',
                    TotalCountOnDb: ''
                };

                callback(OutputOnDb);
            }
        });
    },
    Rollback: function () {
        this.Connection.rollback();
    }
};



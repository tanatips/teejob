

function Cls_MessageBox_Views() {

    //-------- Type MessageBox ------------    

    this.Fn_AlertMessageBox = function (textHeader, textDetail) {
        Ext.MessageBox.alert(textHeader, textDetail);
    };

    this.Fn_ErrorMessageBox = function (myText, myWidth) {
        Ext.MessageBox.show({
            title: 'Error',
            msg: myText,
            width: myWidth,
            modal: true,
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.ERROR
        });
    };

    this.Fn_SuccessMessageBox = function (myText, myWidth) {
        Ext.MessageBox.show({
            title: 'Success',
            msg: myText,
            width: myWidth,
            modal: true,
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.INFO
        });
    };

    this.Fn_WarningMessageBox = function (myText, myWidth) {
        Ext.MessageBox.show({
            title: 'Warning',
            msg: myText,
            modal: true,
            width: myWidth,
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.WARNING
        });
    };

    this.Fn_DetailMessageBox = function (myText, myWidth) {
        Ext.MessageBox.show({
            title: 'Detail',
            msg: myText,
            modal: true,
            width: myWidth,
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.QUESTION

        });
    };

}
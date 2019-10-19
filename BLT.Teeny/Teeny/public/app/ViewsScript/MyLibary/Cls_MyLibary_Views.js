

function Cls_MyLibary_Views() {

    this.Fn_HeightBrowserType = function () {

        var myHeight = "";

        switch (navigator.appName) {

            case "Microsoft Internet Explorer":

                myHeight = 0;

                break;

            case "Netscape":

                myHeight = 65;

                break;
        }


        return myHeight;
    };

}
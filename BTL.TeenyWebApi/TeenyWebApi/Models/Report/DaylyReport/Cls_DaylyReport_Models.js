
let mySqlExecute = require('../../../BusinessData/Execute/File_MySQL_Execute.js');

let Cls_DaylyReport_SQL = require('../../../SQLFactory/Report/DaylyReport/Cls_DaylyReport_SQL.js');

class Cls_DaylyReport_Models {

    constructor() {

        this.sqlFactory = new Cls_DaylyReport_SQL();
    }

    Fn_PrintPDF(dataItem, callback) {

        let sql = this.sqlFactory.Fn_PrintPDF(dataItem);

        try
        {
            //=================== Setting PDF Option ============================//
            let fileName = 'DaylyReport';

            let typeFile = '.pdf';

            let dirPath = myGlobal.Path.join(myGlobal.RootPath,'/File/Report/DaylyReport');

            let pathUrlFile = '/File/Report/DaylyReport/' + fileName + typeFile;

            let dirFontPath = myGlobal.Path.join(myGlobal.RootPath,'/File/Report/Fonts');

            //====================================================================//

            //=================== Create PDF Document ============================//
            let PDFDocument = require('pdfkit');

            let doc = new PDFDocument({
                //Title: 'Title Of File PDF',
                //Author: 'Someon',
                //CreationDate: '4/2/2018',
                autoFirstPage: false
            });

            doc.pipe(myGlobal.Fs.createWriteStream(dirPath + '/' + fileName + typeFile));

            //****************** Create Page **************************//
            // 1 inch per 72 point
            // A4 = 8.27 x 11.69 inch
            let page = {
                layout: 'landscape',//portrait,landscape
                width : 595.44,
                height : 841.68,
                margins: { top: 72 , bottom: 72, left: 72 , right: 72 },
                pendings: { top: 5 , bottom: 5, left: 5 , right: 5 }                            
            };
            
            doc.addPage({
                layout: page.layout,
                size: [page.width, page.height],
                margins: page.margins
            });
            
            //------------------- Hearder ----------------------//
            
            let hearder = {
                width : page.width - page.margins.left - page.margins.right, 
                height : (page.height - page.margins.top - page.margins.bottom) * 0.1, 
                xStart : page.margins.left + page.pendings.left,                            
                yStart : page.margins.top + page.pendings.top
            };
            
            doc.lineJoin('miter').rect(hearder.xStart - page.pendings.left, hearder.yStart - page.pendings.top, hearder.width, hearder.height).stroke();
            
            let yPosition = hearder.yStart;
            let xPosition = hearder.xStart;
            
            doc.y = yPosition; 
            doc.x = xPosition;
            doc.font(dirFontPath + '/THSarabun/THSarabunBold.ttf')
            .fontSize(16).text('ใบแจ้งหนี้', { /*align: 'left'*/ });
            yPosition = yPosition + 18;
            
            doc.y = yPosition; 
            doc.x = xPosition;
            doc.font(dirFontPath + '/THSarabun/THSarabunBold.ttf')
            .fontSize(14).text('คอนโด ' + item.NAME, { /*align: 'left'*/  });
            yPosition = yPosition + 16;
            
            doc.y = yPosition; 
            doc.x = xPosition;
            doc.font(dirFontPath + '/THSarabun/THSarabun.ttf')
            .fontSize(12).text(item.ADDRESS, { /*align: 'left'*/  });
            yPosition = yPosition + 14;
            
            doc.y = yPosition; 
            doc.x = xPosition;
            doc.font(dirFontPath + '/THSarabun/THSarabun.ttf')
            .fontSize(12).text('ติดต่อ โทร. ' + item.PHONE + ', ' + item.MOBILE, { /*align: 'left'*/  });
            yPosition = yPosition + 14;

            doc.end();
            //====================================================================//

            callback(dirPath + '/' + fileName + typeFile);  
        }
        catch(e) 
        {
            callback(dirPath + '/' + fileName + typeFile);
        }   
    }
};

module.exports = Cls_DaylyReport_Models;


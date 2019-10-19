
let mySqlExecute = require('../../../BusinessData/Execute/File_MySQL_Execute.js');

let Cls_ActualReport_SQL = require('../../../SQLFactory/Report/ActualReport/Cls_ActualReport_SQL.js');

class Cls_ActualReport_Models {

    constructor() {

        this.sqlFactory = new Cls_ActualReport_SQL();
    }

    Fn_PrintPDF(dataItem, callback) {

        //=============== use for test ====================//
        let randomNumber = function() {
            
            let max = 9999;

            let num = Math.floor(Math.random() * Math.floor(max));

            let result = convertNumToString(num);

            return result;
        };

        let convertNumToString = function(num) {

            let arNum = num.toString().split('');

            if(arNum.length === 4) {
                arNum.splice( 1, 0, ',');
            }

            let result = arNum.join('');

            return result;
        }

        let batchRec = function() {

            let result = {
                tarAgg1 : randomNumber(),
                tarAgg2 : randomNumber(),
                tarAgg3 : randomNumber(),
                tarAgg4 : randomNumber(),
                tarCemt1 : randomNumber(),
                tarCemt2 : randomNumber(),
                tarCemt3 : randomNumber(),
                tarCemt4 : randomNumber(),
                tarAdmix1 : randomNumber(),
                tarAdmix2 : randomNumber(),
                tarAdmix3 : randomNumber(),
                tarAdmix4 : randomNumber(),
                tarWater : randomNumber(),

                actAgg1 : randomNumber(),
                actAgg2 : randomNumber(),
                actAgg3 : randomNumber(),
                actAgg4 : randomNumber(),
                actCemt1 : randomNumber(),
                actCemt2 : randomNumber(),
                actCemt3 : randomNumber(),
                actCemt4 : randomNumber(),
                actAdmix1 : randomNumber(),
                actAdmix2 : randomNumber(),
                actAdmix3 : randomNumber(),
                actAdmix4 : randomNumber(),
                actWater : randomNumber(),

                counter : randomNumber()
            };

            return result;
        }

        //====================================================//

        //let sql = this.sqlFactory.Fn_PrintPDF(dataItem);

        try
        {
            //=================== Setting PDF Option ============================//
            let fileName = 'ActualReport';

            let typeFile = '.pdf';

            let dirPath = myGlobal.Path.join(myGlobal.RootPath,'/File/Report/ActualReport');

            let pathUrlFile = '/File/Report/ActualReport/' + fileName + typeFile;

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

            //****************** Layout Page **************************//
            // 1 inch per 72 point
            // A4 = 8.27 x 11.69 inch
            let page = {
                layout: 'portrait',//portrait,landscape
                width : 841.68,//595.44
                height : 595.44,//841.68
                margins: { top: 20 , bottom: 20, left: 20 , right: 20 },
                pendings: { top: 5 , bottom: 5, left: 5 , right: 5 }    
                //margins: { top: 72 , bottom: 72, left: 72 , right: 72 },
                //pendings: { top: 5 , bottom: 5, left: 5 , right: 5 }                        
            };
            
            let hearder = {
                width : page.width - page.margins.left - page.margins.right, 
                height : (page.height - page.margins.top - page.margins.bottom) * 0.15, 
                xStart : page.margins.left + page.pendings.left,                            
                yStart : page.margins.top + page.pendings.top
            };
            
            let body = {
                width : page.width - page.margins.left - page.margins.right, 
                height : (page.height - page.margins.top - page.margins.bottom) * 0.80, 
                xStart : page.margins.left + page.pendings.left,                            
                yStart : hearder.height + page.margins.top + page.pendings.top,
                index : 0,
                start : 0,
                limit : 11
            };

            let footer = {
                width : page.width - page.margins.left - page.margins.right, 
                height : (page.height - page.margins.top - page.margins.bottom) * 0.05, 
                xStart : page.margins.left + page.pendings.left,                            
                yStart : hearder.height + body.height + page.margins.top + page.pendings.top
            };

            let dataBody = [];

            for(let i = 0; i < 27; i++) {
                dataBody.push(batchRec());
            }

            let dataSummary = {
                
                tarAgg1 : 0,

                tarAgg2 : 0,
                tarAgg3 : 0,
                tarAgg4 : 0,

                tarCemt1 : 0,
                tarCemt2 : 0,
                tarCemt3 : 0,
                tarCemt4 : 0,

                tarAdmix1 : 0,
                tarAdmix2 : 0,
                tarAdmix3 : 0,
                tarAdmix4 : 0,

                tarWater : 0,

                actAgg1 : 0,
                actAgg2 : 0,
                actAgg3 : 0,
                actAgg4 : 0,

                actCemt1 : 0,
                actCemt2 : 0,
                actCemt3 : 0,
                actCemt4 : 0,

                actAdmix1 : 0,
                actAdmix2 : 0,
                actAdmix3 : 0,
                actAdmix4 : 0,

                actWater : 0,

                errAgg1 : 0,
                errAgg2 : 0,
                errAgg3 : 0,
                errAgg4 : 0,

                errCemt1 : 0,
                errCemt2 : 0,
                errCemt3 : 0,
                errCemt4 : 0,

                errAdmix1 : 0,
                errAdmix2 : 0,
                errAdmix3 : 0,
                errAdmix4 : 0,

                errWater  : 0,

                errPerAgg1 : 0,
                errPerAgg2 : 0,
                errPerAgg3 : 0,
                errPerAgg4 : 0,

                errPerCemt1 : 0,
                errPerCemt2 : 0,
                errPerCemt3 : 0,
                errPerCemt4 : 0,

                errPerAdmix1 : 0,
                errPerAdmix2 : 0,
                errPerAdmix3 : 0,
                errPerAdmix4 : 0,

                errPerWater : 0,
            }

            for(let i = 0; i < dataBody.length; i++) {
                
                dataSummary.tarAgg1 = dataSummary.tarAgg1 + parseInt(dataBody[i].tarAgg1);
                dataSummary.tarAgg2 = dataSummary.tarAgg2 + parseInt(dataBody[i].tarAgg2);
                dataSummary.tarAgg3 = dataSummary.tarAgg3 + parseInt(dataBody[i].tarAgg3);
                dataSummary.tarAgg4 = dataSummary.tarAgg4 + parseInt(dataBody[i].tarAgg4);

                dataSummary.tarCemt1 = dataSummary.tarCemt1 + parseInt(dataBody[i].tarCemt1);
                dataSummary.tarCemt2 = dataSummary.tarCemt2 + parseInt(dataBody[i].tarCemt2);
                dataSummary.tarCemt3 = dataSummary.tarCemt3 + parseInt(dataBody[i].tarCemt3);
                dataSummary.tarCemt4 = dataSummary.tarCemt4 + parseInt(dataBody[i].tarCemt4);

                dataSummary.tarAdmix1 = dataSummary.tarAdmix1 + parseInt(dataBody[i].tarAdmix1);
                dataSummary.tarAdmix2 = dataSummary.tarAdmix2 + parseInt(dataBody[i].tarAdmix2);
                dataSummary.tarAdmix3 = dataSummary.tarAdmix3 + parseInt(dataBody[i].tarAdmix3);
                dataSummary.tarAdmix4 = dataSummary.tarAdmix4 + parseInt(dataBody[i].tarAdmix4);

                dataSummary.tarWater = dataSummary.tarWater + parseInt(dataBody[i].tarWater);

                dataSummary.actAgg1 = dataSummary.actAgg1 + parseInt(dataBody[i].actAgg1);
                dataSummary.actAgg2 = dataSummary.actAgg2 + parseInt(dataBody[i].actAgg2);
                dataSummary.actAgg3 = dataSummary.actAgg3 + parseInt(dataBody[i].actAgg3);
                dataSummary.actAgg4 = dataSummary.actAgg4 + parseInt(dataBody[i].actAgg4);

                dataSummary.actCemt1 = dataSummary.actCemt1 + parseInt(dataBody[i].actCemt1);
                dataSummary.actCemt2 = dataSummary.actCemt2 + parseInt(dataBody[i].actCemt2);
                dataSummary.actCemt3 = dataSummary.actCemt3 + parseInt(dataBody[i].actCemt3);
                dataSummary.actCemt4 = dataSummary.actCemt4 + parseInt(dataBody[i].actCemt4);

                dataSummary.actAdmix1 = dataSummary.actAdmix1 + parseInt(dataBody[i].actAdmix1);
                dataSummary.actAdmix2 = dataSummary.actAdmix2 + parseInt(dataBody[i].actAdmix2);
                dataSummary.actAdmix3 = dataSummary.actAdmix3 + parseInt(dataBody[i].actAdmix3);
                dataSummary.actAdmix4 = dataSummary.actAdmix4 + parseInt(dataBody[i].actAdmix4);

                dataSummary.actWater = dataSummary.actWater + parseInt(dataBody[i].actWater);

                dataSummary.errAgg1 = dataSummary.actAgg1 - dataSummary.tarAgg1;
                dataSummary.errAgg2 = dataSummary.actAgg2 - dataSummary.tarAgg2;
                dataSummary.errAgg3 = dataSummary.actAgg3 - dataSummary.tarAgg3;
                dataSummary.errAgg4 = dataSummary.actAgg4 - dataSummary.tarAgg4;

                dataSummary.errCemt1 = dataSummary.actCemt1 - dataSummary.tarCemt1;
                dataSummary.errCemt2 = dataSummary.actCemt2 - dataSummary.tarCemt2;
                dataSummary.errCemt3 = dataSummary.actCemt3 - dataSummary.tarCemt3;
                dataSummary.errCemt4 = dataSummary.actCemt4 - dataSummary.tarCemt4;

                dataSummary.errAdmix1 = dataSummary.actAdmix1 - dataSummary.tarAdmix1;
                dataSummary.errAdmix2 = dataSummary.actAdmix2 - dataSummary.tarAdmix2;
                dataSummary.errAdmix3 = dataSummary.actAdmix3 - dataSummary.tarAdmix3;
                dataSummary.errAdmix4 = dataSummary.actAdmix4 - dataSummary.tarAdmix4;

                dataSummary.errWater = dataSummary.actWater - dataSummary.tarWater;

                dataSummary.errPerAgg1 = parseInt((dataSummary.actAgg1 - dataSummary.tarAgg1) / dataSummary.tarAgg1 * 100);
                dataSummary.errPerAgg2 = parseInt((dataSummary.actAgg2 - dataSummary.tarAgg2) / dataSummary.tarAgg2 * 100);
                dataSummary.errPerAgg3 = parseInt((dataSummary.actAgg3 - dataSummary.tarAgg3) / dataSummary.tarAgg3 * 100);
                dataSummary.errPerAgg4 = parseInt((dataSummary.actAgg4 - dataSummary.tarAgg4) / dataSummary.tarAgg4 * 100);

                dataSummary.errPerCemt1 = parseInt((dataSummary.actCemt1 - dataSummary.tarCemt1) / dataSummary.tarCemt1 * 100);
                dataSummary.errPerCemt2 = parseInt((dataSummary.actCemt2 - dataSummary.tarCemt2) / dataSummary.tarCemt2 * 100);
                dataSummary.errPerCemt3 = parseInt((dataSummary.actCemt3 - dataSummary.tarCemt3) / dataSummary.tarCemt3 * 100);
                dataSummary.errPerCemt4 = parseInt((dataSummary.actCemt4 - dataSummary.tarCemt4) / dataSummary.tarCemt4 * 100);

                dataSummary.errPerAdmix1 = parseInt((dataSummary.actAdmix1 - dataSummary.tarAdmix1) / dataSummary.tarAdmix1 * 100);
                dataSummary.errPerAdmix2 = parseInt((dataSummary.actAdmix2 - dataSummary.tarAdmix2) / dataSummary.tarAdmix2 * 100);
                dataSummary.errPerAdmix3 = parseInt((dataSummary.actAdmix3 - dataSummary.tarAdmix3) / dataSummary.tarAdmix3 * 100);
                dataSummary.errPerAdmix4 = parseInt((dataSummary.actAdmix4 - dataSummary.tarAdmix4) / dataSummary.tarAdmix4 * 100);

                dataSummary.errPerWater = parseInt((dataSummary.actWater - dataSummary.tarWater) / dataSummary.tarWater * 100);
            }

            let dataHeader = {
                docketId : "DV000015",
                dateBatch : "21/09/2019",
                formula : "BAJ01",
                quantity : "7.00",
                reportName : "รายงาน ทดสอบ",
                customerName : "ช่างมัน",
                jobSite : "ตลาดธรรมโฆคร"
            };
            
            let dataFooter = {
                printDate : myGlobal.Moment().format('DD/MM/YYYY'),
                printTime : myGlobal.Moment().format('HH:mm:SS'),
                user : 'Admin'
            };

            let paging = {
                pageIndex : 1,
                pageAmount : Math.ceil(dataBody.length / body.limit) + 1
            }

            let createPage = function() {

                doc.addPage({
                    layout: page.layout,
                    size: [page.width, page.height],
                    margins: page.margins
                });
            }

            let createHeader = function() {

                let yPosition = hearder.yStart;
                let xPosition = hearder.xStart;

                //doc.lineJoin('miter').rect(hearder.xStart - page.pendings.left, hearder.yStart - page.pendings.top, hearder.width, hearder.height).dash(5, {space: 10}).stroke();
                
                doc.y = yPosition; 
                doc.x = xPosition + (hearder.width * 0.35 );
                doc.font(dirFontPath + '/THSarabun/THSarabunBold.ttf')
                .fontSize(24).text('ค่าน้ำหนักจริงในการผลิต (Actual)');

                yPosition = yPosition + 30;

                doc.y = yPosition; 
                doc.x = xPosition;
                doc.font(dirFontPath + '/THSarabun/THSarabunBold.ttf')
                .fontSize(16).text('Docket ID :');

                doc.y = yPosition; 
                doc.x = xPosition + (hearder.width * 0.1 );
                doc.font(dirFontPath + '/THSarabun/THSarabun.ttf')
                .fontSize(16).text(dataHeader.docketId);

                doc.y = yPosition; 
                doc.x = xPosition + (hearder.width * 0.2 );
                doc.font(dirFontPath + '/THSarabun/THSarabunBold.ttf')
                .fontSize(16).text('Date Batch :');

                doc.y = yPosition; 
                doc.x = xPosition + (hearder.width * 0.3 );
                doc.font(dirFontPath + '/THSarabun/THSarabun.ttf')
                .fontSize(16).text(dataHeader.dateBatch);

                doc.y = yPosition; 
                doc.x = xPosition + (hearder.width * 0.4 );
                doc.font(dirFontPath + '/THSarabun/THSarabunBold.ttf')
                .fontSize(16).text('สูตร :');

                doc.y = yPosition; 
                doc.x = xPosition + (hearder.width * 0.5 );
                doc.font(dirFontPath + '/THSarabun/THSarabun.ttf')
                .fontSize(16).text(dataHeader.formula);
                
                doc.y = yPosition; 
                doc.x = xPosition + (hearder.width * 0.6 );
                doc.font(dirFontPath + '/THSarabun/THSarabunBold.ttf')
                .fontSize(16).text('จำนวน(คิว) :');

                doc.y = yPosition; 
                doc.x = xPosition + (hearder.width * 0.7 );
                doc.font(dirFontPath + '/THSarabun/THSarabun.ttf')
                .fontSize(16).text(dataHeader.quantity);

                doc.y = yPosition; 
                doc.x = xPosition + (hearder.width * 0.8 );
                doc.font(dirFontPath + '/THSarabun/THSarabunBold.ttf')
                .fontSize(16).text('พจส :');

                doc.y = yPosition; 
                doc.x = xPosition + (hearder.width * 0.9 );
                doc.font(dirFontPath + '/THSarabun/THSarabun.ttf')
                .fontSize(16).text(dataHeader.reportName);

                yPosition = yPosition + 18;

                doc.y = yPosition;
                doc.x = xPosition;
                doc.rect(hearder.xStart - page.pendings.left, yPosition, hearder.width, 0.1).lineWidth(0.1).dash(5, {space: 10}).stroke();
                yPosition = yPosition + 2;

                doc.y = yPosition; 
                doc.x = xPosition;
                doc.font(dirFontPath + '/THSarabun/THSarabunBold.ttf')
                .fontSize(16).text('CustomerName :');

                doc.y = yPosition; 
                doc.x = xPosition + (hearder.width * 0.2 );
                doc.font(dirFontPath + '/THSarabun/THSarabun.ttf')
                .fontSize(16).text(dataHeader.customerName);

                doc.y = yPosition; 
                doc.x = xPosition + (hearder.width * 0.4 );
                doc.font(dirFontPath + '/THSarabun/THSarabunBold.ttf')
                .fontSize(16).text('JobSite :');

                doc.y = yPosition; 
                doc.x = xPosition + (hearder.width * 0.6 );
                doc.font(dirFontPath + '/THSarabun/THSarabun.ttf')
                .fontSize(16).text(dataHeader.jobSite);

                yPosition = yPosition + 18; 
                
                doc.y = yPosition;
                doc.x = xPosition;
                doc.rect(hearder.xStart - page.pendings.left, yPosition, hearder.width, 0.1).lineWidth(0.1).dash(5, {space: 10}).stroke();
                yPosition = yPosition + 2;

            }

             
            let createBody = function() {

                let yPosition = body.yStart;
                let xPosition = body.xStart;
                
                //doc.lineJoin('miter').rect(body.xStart - page.pendings.left, body.yStart - page.pendings.top, body.width, body.height).dash(5, {space: 10}).stroke();
                
                doc.y = yPosition; 
                doc.x = xPosition;
                doc.font(dirFontPath + '/THSarabun/THSarabunBold.ttf')
                .fontSize(16).text('BatchRecID');

                doc.y = yPosition; 
                doc.x = xPosition + (body.width * (0.1 + 0.0625 * 0));
                doc.font(dirFontPath + '/THSarabun/THSarabunBold.ttf')
                .fontSize(16).text('Agg1');

                doc.y = yPosition; 
                doc.x = xPosition + (body.width * (0.1 + 0.0625 * 1));
                doc.font(dirFontPath + '/THSarabun/THSarabunBold.ttf')
                .fontSize(16).text('Agg2');

                doc.y = yPosition; 
                doc.x = xPosition + (body.width * (0.1 + 0.0625 * 2));
                doc.font(dirFontPath + '/THSarabun/THSarabunBold.ttf')
                .fontSize(16).text('Agg3');

                doc.y = yPosition; 
                doc.x = xPosition + (body.width * (0.1 + 0.0625 * 3));
                doc.font(dirFontPath + '/THSarabun/THSarabunBold.ttf')
                .fontSize(16).text('Agg4');

                doc.y = yPosition; 
                doc.x = xPosition + (body.width * (0.1 + 0.0625 * 4));
                doc.font(dirFontPath + '/THSarabun/THSarabunBold.ttf')
                .fontSize(16).text('Cemt1');

                doc.y = yPosition; 
                doc.x = xPosition + (body.width * (0.1 + 0.0625 * 5));
                doc.font(dirFontPath + '/THSarabun/THSarabunBold.ttf')
                .fontSize(16).text('Cemt2');

                doc.y = yPosition; 
                doc.x = xPosition + (body.width * (0.1 + 0.0625 * 6));
                doc.font(dirFontPath + '/THSarabun/THSarabunBold.ttf')
                .fontSize(16).text('Cemt3');

                doc.y = yPosition; 
                doc.x = xPosition + (body.width * (0.1 + 0.0625 * 7));
                doc.font(dirFontPath + '/THSarabun/THSarabunBold.ttf')
                .fontSize(16).text('Cemt4');

                doc.y = yPosition; 
                doc.x = xPosition + (body.width * (0.1 + 0.0625 * 8));
                doc.font(dirFontPath + '/THSarabun/THSarabunBold.ttf')
                .fontSize(16).text('Admix1');

                doc.y = yPosition; 
                doc.x = xPosition + (body.width * (0.1 + 0.0625 * 9));
                doc.font(dirFontPath + '/THSarabun/THSarabunBold.ttf')
                .fontSize(16).text('Admix2');

                doc.y = yPosition; 
                doc.x = xPosition + (body.width * (0.1 + 0.0625 * 10));
                doc.font(dirFontPath + '/THSarabun/THSarabunBold.ttf')
                .fontSize(16).text('Admix3');

                doc.y = yPosition; 
                doc.x = xPosition + (body.width * (0.1 + 0.0625 * 11));
                doc.font(dirFontPath + '/THSarabun/THSarabunBold.ttf')
                .fontSize(16).text('Admix4');

                doc.y = yPosition; 
                doc.x = xPosition + (body.width * (0.1 + 0.0625 * 12));
                doc.font(dirFontPath + '/THSarabun/THSarabunBold.ttf')
                .fontSize(16).text('Water');

                doc.y = yPosition; 
                doc.x = xPosition + (body.width * (0.1 + 0.0625 * 13));
                doc.font(dirFontPath + '/THSarabun/THSarabunBold.ttf')
                .fontSize(16).text('Counter');

                yPosition = yPosition + 18; 
                
                doc.y = yPosition;
                doc.x = xPosition;
                doc.rect(body.xStart - page.pendings.left, yPosition, body.width, 0.1).lineWidth(0.1).dash(5, {space: 10}).stroke();
                yPosition = yPosition + 2;

                for(let i = 0; i < body.limit; i++) {

                    yPosition = yPosition + 8; 

                    doc.y = yPosition; 
                    doc.x = xPosition + (body.width * 0.025);
                    doc.font(dirFontPath + '/THSarabun/THSarabunBold.ttf')
                    .fontSize(16).text(body.index + 1);
                    
                    yPosition = yPosition - 8; 

                    doc.y = yPosition; 
                    doc.x = xPosition + (body.width * (0.05));
                    doc.font(dirFontPath + '/THSarabun/THSarabunBold.ttf')
                    .fontSize(16).text('Tar:');

                    doc.y = yPosition; 
                    doc.x = xPosition + (body.width * (0.1 + 0.0625 * 0));
                    doc.font(dirFontPath + '/THSarabun/THSarabun.ttf')
                    .fontSize(16).text(dataBody[body.index].tarAgg1);
        
                    doc.y = yPosition; 
                    doc.x = xPosition + (body.width * (0.1 + 0.0625 * 1));
                    doc.font(dirFontPath + '/THSarabun/THSarabun.ttf')
                    .fontSize(16).text(dataBody[body.index].tarAgg2);
        
                    doc.y = yPosition; 
                    doc.x = xPosition + (body.width * (0.1 + 0.0625 * 2));
                    doc.font(dirFontPath + '/THSarabun/THSarabun.ttf')
                    .fontSize(16).text(dataBody[body.index].tarAgg3);
        
                    doc.y = yPosition; 
                    doc.x = xPosition + (body.width * (0.1 + 0.0625 * 3));
                    doc.font(dirFontPath + '/THSarabun/THSarabun.ttf')
                    .fontSize(16).text(dataBody[body.index].tarAgg4);
        
                    doc.y = yPosition; 
                    doc.x = xPosition + (body.width * (0.1 + 0.0625 * 4));
                    doc.font(dirFontPath + '/THSarabun/THSarabun.ttf')
                    .fontSize(16).text(dataBody[body.index].tarCemt1);
        
                    doc.y = yPosition; 
                    doc.x = xPosition + (body.width * (0.1 + 0.0625 * 5));
                    doc.font(dirFontPath + '/THSarabun/THSarabun.ttf')
                    .fontSize(16).text(dataBody[body.index].tarCemt2);
        
                    doc.y = yPosition; 
                    doc.x = xPosition + (body.width * (0.1 + 0.0625 * 6));
                    doc.font(dirFontPath + '/THSarabun/THSarabun.ttf')
                    .fontSize(16).text(dataBody[body.index].tarCemt3);
        
                    doc.y = yPosition; 
                    doc.x = xPosition + (body.width * (0.1 + 0.0625 * 7));
                    doc.font(dirFontPath + '/THSarabun/THSarabun.ttf')
                    .fontSize(16).text(dataBody[body.index].tarCemt4);
        
                    doc.y = yPosition; 
                    doc.x = xPosition + (body.width * (0.1 + 0.0625 * 8));
                    doc.font(dirFontPath + '/THSarabun/THSarabun.ttf')
                    .fontSize(16).text(dataBody[body.index].tarAdmix1);
        
                    doc.y = yPosition; 
                    doc.x = xPosition + (body.width * (0.1 + 0.0625 * 9));
                    doc.font(dirFontPath + '/THSarabun/THSarabun.ttf')
                    .fontSize(16).text(dataBody[body.index].tarAdmix2);
        
                    doc.y = yPosition; 
                    doc.x = xPosition + (body.width * (0.1 + 0.0625 * 10));
                    doc.font(dirFontPath + '/THSarabun/THSarabun.ttf')
                    .fontSize(16).text(dataBody[body.index].tarAdmix3);
        
                    doc.y = yPosition; 
                    doc.x = xPosition + (body.width * (0.1 + 0.0625 * 11));
                    doc.font(dirFontPath + '/THSarabun/THSarabun.ttf')
                    .fontSize(16).text(dataBody[body.index].tarAdmix4);
                    
                    doc.y = yPosition; 
                    doc.x = xPosition + (body.width * (0.1 + 0.0625 * 12));
                    doc.font(dirFontPath + '/THSarabun/THSarabun.ttf')
                    .fontSize(16).text(dataBody[body.index].tarWater);
        
                    yPosition = yPosition + 8; 

                    doc.y = yPosition; 
                    doc.x = xPosition + (body.width * (0.1 + 0.0625 * 13));
                    doc.font(dirFontPath + '/THSarabun/THSarabun.ttf')
                    .fontSize(16).text(dataBody[body.index].counter);
                    
                    yPosition = yPosition - 8; 

                    yPosition = yPosition + 18; 

                    doc.y = yPosition; 
                    doc.x = xPosition + (body.width * (0.05));
                    doc.font(dirFontPath + '/THSarabun/THSarabunBold.ttf')
                    .fontSize(16).text('Act:');

                    doc.y = yPosition; 
                    doc.x = xPosition + (body.width * (0.1 + 0.0625 * 0));
                    doc.font(dirFontPath + '/THSarabun/THSarabun.ttf')
                    .fontSize(16).text(dataBody[body.index].actAgg1);
        
                    doc.y = yPosition; 
                    doc.x = xPosition + (body.width * (0.1 + 0.0625 * 1));
                    doc.font(dirFontPath + '/THSarabun/THSarabun.ttf')
                    .fontSize(16).text(dataBody[body.index].actAgg2);
        
                    doc.y = yPosition; 
                    doc.x = xPosition + (body.width * (0.1 + 0.0625 * 2));
                    doc.font(dirFontPath + '/THSarabun/THSarabun.ttf')
                    .fontSize(16).text(dataBody[body.index].actAgg3);
        
                    doc.y = yPosition; 
                    doc.x = xPosition + (body.width * (0.1 + 0.0625 * 3));
                    doc.font(dirFontPath + '/THSarabun/THSarabun.ttf')
                    .fontSize(16).text(dataBody[body.index].actAgg4);
        
                    doc.y = yPosition; 
                    doc.x = xPosition + (body.width * (0.1 + 0.0625 * 4));
                    doc.font(dirFontPath + '/THSarabun/THSarabun.ttf')
                    .fontSize(16).text(dataBody[body.index].actCemt1);
        
                    doc.y = yPosition; 
                    doc.x = xPosition + (body.width * (0.1 + 0.0625 * 5));
                    doc.font(dirFontPath + '/THSarabun/THSarabun.ttf')
                    .fontSize(16).text(dataBody[body.index].actCemt2);
        
                    doc.y = yPosition; 
                    doc.x = xPosition + (body.width * (0.1 + 0.0625 * 6));
                    doc.font(dirFontPath + '/THSarabun/THSarabun.ttf')
                    .fontSize(16).text(dataBody[body.index].actCemt3);
        
                    doc.y = yPosition; 
                    doc.x = xPosition + (body.width * (0.1 + 0.0625 * 7));
                    doc.font(dirFontPath + '/THSarabun/THSarabun.ttf')
                    .fontSize(16).text(dataBody[body.index].actCemt4);
        
                    doc.y = yPosition; 
                    doc.x = xPosition + (body.width * (0.1 + 0.0625 * 8));
                    doc.font(dirFontPath + '/THSarabun/THSarabun.ttf')
                    .fontSize(16).text(dataBody[body.index].actAdmix1);
        
                    doc.y = yPosition; 
                    doc.x = xPosition + (body.width * (0.1 + 0.0625 * 9));
                    doc.font(dirFontPath + '/THSarabun/THSarabun.ttf')
                    .fontSize(16).text(dataBody[body.index].actAdmix2);
        
                    doc.y = yPosition; 
                    doc.x = xPosition + (body.width * (0.1 + 0.0625 * 10));
                    doc.font(dirFontPath + '/THSarabun/THSarabun.ttf')
                    .fontSize(16).text(dataBody[body.index].actAdmix3);
        
                    doc.y = yPosition; 
                    doc.x = xPosition + (body.width * (0.1 + 0.0625 * 11));
                    doc.font(dirFontPath + '/THSarabun/THSarabun.ttf')
                    .fontSize(16).text(dataBody[body.index].actAdmix4);
                    
                    doc.y = yPosition; 
                    doc.x = xPosition + (body.width * (0.1 + 0.0625 * 12));
                    doc.font(dirFontPath + '/THSarabun/THSarabun.ttf')
                    .fontSize(16).text(dataBody[body.index].actWater);

                    yPosition = yPosition + 18; 
                    
                    doc.y = yPosition;
                    doc.x = xPosition;
                    doc.rect(body.xStart - page.pendings.left, yPosition, body.width, 0.1).lineWidth(0.1).dash(5, {space: 10}).stroke();
                    yPosition = yPosition + 2;

                    body.index = body.index + 1;
                }
            }
            
            let createFooter = function() {
                
                let yPosition = footer.yStart;
                let xPosition = footer.xStart;
                
                //doc.lineJoin('miter').rect(footer.xStart - page.pendings.left, footer.yStart - page.pendings.top, footer.width, footer.height).dash(5, {space: 10}).stroke();
                
                doc.y = yPosition; 
                doc.x = xPosition + (footer.width * (0.12 * 0));
                doc.font(dirFontPath + '/THSarabun/THSarabunBold.ttf')
                .fontSize(16).text('หน้า :');

                doc.y = yPosition; 
                doc.x = xPosition + (footer.width * (0.12 * 1));
                doc.font(dirFontPath + '/THSarabun/THSarabun.ttf')
                .fontSize(16).text(paging.pageIndex + '/' + paging.pageAmount);

                doc.y = yPosition; 
                doc.x = xPosition + (footer.width * (0.12 * 2));
                doc.font(dirFontPath + '/THSarabun/THSarabunBold.ttf')
                .fontSize(16).text('วันที่พิมพ์ :');

                doc.y = yPosition; 
                doc.x = xPosition + (footer.width * (0.12 * 3));
                doc.font(dirFontPath + '/THSarabun/THSarabun.ttf')
                .fontSize(16).text(dataFooter.printDate);

                doc.y = yPosition; 
                doc.x = xPosition + (footer.width * (0.12 * 4));
                doc.font(dirFontPath + '/THSarabun/THSarabunBold.ttf')
                .fontSize(16).text('เวลา :');

                doc.y = yPosition; 
                doc.x = xPosition + (footer.width * (0.12 * 5));
                doc.font(dirFontPath + '/THSarabun/THSarabun.ttf')
                .fontSize(16).text(dataFooter.printTime);

                doc.y = yPosition; 
                doc.x = xPosition + (footer.width * (0.12 * 6));
                doc.font(dirFontPath + '/THSarabun/THSarabunBold.ttf')
                .fontSize(16).text('ผู้พิมพ์ :');

                doc.y = yPosition; 
                doc.x = xPosition + (footer.width * (0.12 * 7));
                doc.font(dirFontPath + '/THSarabun/THSarabun.ttf')
                .fontSize(16).text(dataFooter.user);

                yPosition = yPosition + 18; 
                    
                doc.y = yPosition;
                doc.x = xPosition;
                doc.rect(body.xStart - page.pendings.left, yPosition, body.width, 0.1).lineWidth(0.1).dash(5, {space: 10}).stroke();
                yPosition = yPosition + 2;
            }

            let createSummary = function() {

                let yPosition = body.yStart;
                let xPosition = body.xStart;
                
                //doc.lineJoin('miter').rect(body.xStart - page.pendings.left, body.yStart - page.pendings.top, body.width, body.height).dash(5, {space: 10}).stroke();
                
                doc.y = yPosition; 
                doc.x = xPosition;
                doc.font(dirFontPath + '/THSarabun/THSarabunBold.ttf')
                .fontSize(16).text('BatchRecID');

                doc.y = yPosition; 
                doc.x = xPosition + (body.width * (0.1 + 0.0625 * 0));
                doc.font(dirFontPath + '/THSarabun/THSarabunBold.ttf')
                .fontSize(16).text('Agg1');

                doc.y = yPosition; 
                doc.x = xPosition + (body.width * (0.1 + 0.0625 * 1));
                doc.font(dirFontPath + '/THSarabun/THSarabunBold.ttf')
                .fontSize(16).text('Agg2');

                doc.y = yPosition; 
                doc.x = xPosition + (body.width * (0.1 + 0.0625 * 2));
                doc.font(dirFontPath + '/THSarabun/THSarabunBold.ttf')
                .fontSize(16).text('Agg3');

                doc.y = yPosition; 
                doc.x = xPosition + (body.width * (0.1 + 0.0625 * 3));
                doc.font(dirFontPath + '/THSarabun/THSarabunBold.ttf')
                .fontSize(16).text('Agg4');

                doc.y = yPosition; 
                doc.x = xPosition + (body.width * (0.1 + 0.0625 * 4));
                doc.font(dirFontPath + '/THSarabun/THSarabunBold.ttf')
                .fontSize(16).text('Cemt1');

                doc.y = yPosition; 
                doc.x = xPosition + (body.width * (0.1 + 0.0625 * 5));
                doc.font(dirFontPath + '/THSarabun/THSarabunBold.ttf')
                .fontSize(16).text('Cemt2');

                doc.y = yPosition; 
                doc.x = xPosition + (body.width * (0.1 + 0.0625 * 6));
                doc.font(dirFontPath + '/THSarabun/THSarabunBold.ttf')
                .fontSize(16).text('Cemt3');

                doc.y = yPosition; 
                doc.x = xPosition + (body.width * (0.1 + 0.0625 * 7));
                doc.font(dirFontPath + '/THSarabun/THSarabunBold.ttf')
                .fontSize(16).text('Cemt4');

                doc.y = yPosition; 
                doc.x = xPosition + (body.width * (0.1 + 0.0625 * 8));
                doc.font(dirFontPath + '/THSarabun/THSarabunBold.ttf')
                .fontSize(16).text('Admix1');

                doc.y = yPosition; 
                doc.x = xPosition + (body.width * (0.1 + 0.0625 * 9));
                doc.font(dirFontPath + '/THSarabun/THSarabunBold.ttf')
                .fontSize(16).text('Admix2');

                doc.y = yPosition; 
                doc.x = xPosition + (body.width * (0.1 + 0.0625 * 10));
                doc.font(dirFontPath + '/THSarabun/THSarabunBold.ttf')
                .fontSize(16).text('Admix3');

                doc.y = yPosition; 
                doc.x = xPosition + (body.width * (0.1 + 0.0625 * 11));
                doc.font(dirFontPath + '/THSarabun/THSarabunBold.ttf')
                .fontSize(16).text('Admix4');

                doc.y = yPosition; 
                doc.x = xPosition + (body.width * (0.1 + 0.0625 * 12));
                doc.font(dirFontPath + '/THSarabun/THSarabunBold.ttf')
                .fontSize(16).text('Water');

                yPosition = yPosition + 18; 
                
                doc.y = yPosition;
                doc.x = xPosition;
                doc.rect(body.xStart - page.pendings.left, yPosition, body.width, 0.1).lineWidth(0.1).dash(5, {space: 10}).stroke();
                yPosition = yPosition + 2;

                doc.y = yPosition; 
                doc.x = xPosition + (body.width * 0.025);
                doc.font(dirFontPath + '/THSarabun/THSarabunBold.ttf')
                .fontSize(16).text('Sum Tar:');
                
                doc.y = yPosition; 
                doc.x = xPosition + (body.width * (0.1 + 0.0625 * 0));
                doc.font(dirFontPath + '/THSarabun/THSarabun.ttf')
                .fontSize(16).text(dataSummary.tarAgg1);

                doc.y = yPosition; 
                doc.x = xPosition + (body.width * (0.1 + 0.0625 * 1));
                doc.font(dirFontPath + '/THSarabun/THSarabun.ttf')
                .fontSize(16).text(dataSummary.tarAgg2);

                doc.y = yPosition; 
                doc.x = xPosition + (body.width * (0.1 + 0.0625 * 2));
                doc.font(dirFontPath + '/THSarabun/THSarabun.ttf')
                .fontSize(16).text(dataSummary.tarAgg3);

                doc.y = yPosition; 
                doc.x = xPosition + (body.width * (0.1 + 0.0625 * 3));
                doc.font(dirFontPath + '/THSarabun/THSarabun.ttf')
                .fontSize(16).text(dataSummary.tarAgg4);

                doc.y = yPosition; 
                doc.x = xPosition + (body.width * (0.1 + 0.0625 * 4));
                doc.font(dirFontPath + '/THSarabun/THSarabun.ttf')
                .fontSize(16).text(dataSummary.tarCemt1);

                doc.y = yPosition; 
                doc.x = xPosition + (body.width * (0.1 + 0.0625 * 5));
                doc.font(dirFontPath + '/THSarabun/THSarabun.ttf')
                .fontSize(16).text(dataSummary.tarCemt2);

                doc.y = yPosition; 
                doc.x = xPosition + (body.width * (0.1 + 0.0625 * 6));
                doc.font(dirFontPath + '/THSarabun/THSarabun.ttf')
                .fontSize(16).text(dataSummary.tarCemt3);

                doc.y = yPosition; 
                doc.x = xPosition + (body.width * (0.1 + 0.0625 * 7));
                doc.font(dirFontPath + '/THSarabun/THSarabun.ttf')
                .fontSize(16).text(dataSummary.tarCemt4);

                doc.y = yPosition; 
                doc.x = xPosition + (body.width * (0.1 + 0.0625 * 8));
                doc.font(dirFontPath + '/THSarabun/THSarabun.ttf')
                .fontSize(16).text(dataSummary.tarAdmix1);

                doc.y = yPosition; 
                doc.x = xPosition + (body.width * (0.1 + 0.0625 * 9));
                doc.font(dirFontPath + '/THSarabun/THSarabun.ttf')
                .fontSize(16).text(dataSummary.tarAdmix2);

                doc.y = yPosition; 
                doc.x = xPosition + (body.width * (0.1 + 0.0625 * 10));
                doc.font(dirFontPath + '/THSarabun/THSarabun.ttf')
                .fontSize(16).text(dataSummary.tarAdmix3);

                doc.y = yPosition; 
                doc.x = xPosition + (body.width * (0.1 + 0.0625 * 11));
                doc.font(dirFontPath + '/THSarabun/THSarabun.ttf')
                .fontSize(16).text(dataSummary.tarAdmix4);

                doc.y = yPosition; 
                doc.x = xPosition + (body.width * (0.1 + 0.0625 * 12));
                doc.font(dirFontPath + '/THSarabun/THSarabun.ttf')
                .fontSize(16).text(dataSummary.tarWater);

                yPosition = yPosition + 18; 
                
                doc.y = yPosition;
                doc.x = xPosition;
                doc.rect(body.xStart - page.pendings.left, yPosition, body.width, 0.1).lineWidth(0.1).dash(5, {space: 10}).stroke();
                yPosition = yPosition + 2;

                doc.y = yPosition; 
                doc.x = xPosition + (body.width * 0.025);
                doc.font(dirFontPath + '/THSarabun/THSarabunBold.ttf').fillColor('green')
                .fontSize(16).text('Sum Act:');
                
                doc.y = yPosition; 
                doc.x = xPosition + (body.width * (0.1 + 0.0625 * 0));
                doc.font(dirFontPath + '/THSarabun/THSarabun.ttf').fillColor('green')
                .fontSize(16).text(dataSummary.actAgg1);

                doc.y = yPosition; 
                doc.x = xPosition + (body.width * (0.1 + 0.0625 * 1));
                doc.font(dirFontPath + '/THSarabun/THSarabun.ttf').fillColor('green')
                .fontSize(16).text(dataSummary.actAgg2);

                doc.y = yPosition; 
                doc.x = xPosition + (body.width * (0.1 + 0.0625 * 2));
                doc.font(dirFontPath + '/THSarabun/THSarabun.ttf').fillColor('green')
                .fontSize(16).text(dataSummary.actAgg3);

                doc.y = yPosition; 
                doc.x = xPosition + (body.width * (0.1 + 0.0625 * 3));
                doc.font(dirFontPath + '/THSarabun/THSarabun.ttf').fillColor('green')
                .fontSize(16).text(dataSummary.actAgg4);

                doc.y = yPosition; 
                doc.x = xPosition + (body.width * (0.1 + 0.0625 * 4));
                doc.font(dirFontPath + '/THSarabun/THSarabun.ttf').fillColor('green')
                .fontSize(16).text(dataSummary.actCemt1);

                doc.y = yPosition; 
                doc.x = xPosition + (body.width * (0.1 + 0.0625 * 5));
                doc.font(dirFontPath + '/THSarabun/THSarabun.ttf').fillColor('green')
                .fontSize(16).text(dataSummary.actCemt2);

                doc.y = yPosition; 
                doc.x = xPosition + (body.width * (0.1 + 0.0625 * 6));
                doc.font(dirFontPath + '/THSarabun/THSarabun.ttf').fillColor('green')
                .fontSize(16).text(dataSummary.actCemt3);

                doc.y = yPosition; 
                doc.x = xPosition + (body.width * (0.1 + 0.0625 * 7));
                doc.font(dirFontPath + '/THSarabun/THSarabun.ttf').fillColor('green')
                .fontSize(16).text(dataSummary.actCemt4);

                doc.y = yPosition; 
                doc.x = xPosition + (body.width * (0.1 + 0.0625 * 8));
                doc.font(dirFontPath + '/THSarabun/THSarabun.ttf').fillColor('green')
                .fontSize(16).text(dataSummary.actAdmix1);

                doc.y = yPosition; 
                doc.x = xPosition + (body.width * (0.1 + 0.0625 * 9));
                doc.font(dirFontPath + '/THSarabun/THSarabun.ttf').fillColor('green')
                .fontSize(16).text(dataSummary.actAdmix2);

                doc.y = yPosition; 
                doc.x = xPosition + (body.width * (0.1 + 0.0625 * 10));
                doc.font(dirFontPath + '/THSarabun/THSarabun.ttf').fillColor('green')
                .fontSize(16).text(dataSummary.actAdmix3);

                doc.y = yPosition; 
                doc.x = xPosition + (body.width * (0.1 + 0.0625 * 11));
                doc.font(dirFontPath + '/THSarabun/THSarabun.ttf').fillColor('green')
                .fontSize(16).text(dataSummary.actAdmix4);

                doc.y = yPosition; 
                doc.x = xPosition + (body.width * (0.1 + 0.0625 * 12));
                doc.font(dirFontPath + '/THSarabun/THSarabun.ttf').fillColor('green')
                .fontSize(16).text(dataSummary.actWater);   
                
                yPosition = yPosition + 18; 
                
                doc.y = yPosition;
                doc.x = xPosition;
                doc.rect(body.xStart - page.pendings.left, yPosition, body.width, 0.1).lineWidth(0.1).dash(5, {space: 10}).stroke();
                yPosition = yPosition + 2;

                doc.y = yPosition; 
                doc.x = xPosition + (body.width * 0.025);
                doc.font(dirFontPath + '/THSarabun/THSarabunBold.ttf').fillColor('blue')
                .fontSize(16).text('Sum Err:');
                
                doc.y = yPosition; 
                doc.x = xPosition + (body.width * (0.1 + 0.0625 * 0));
                doc.font(dirFontPath + '/THSarabun/THSarabun.ttf').fillColor('blue')
                .fontSize(16).text(dataSummary.errAgg1);

                doc.y = yPosition; 
                doc.x = xPosition + (body.width * (0.1 + 0.0625 * 1));
                doc.font(dirFontPath + '/THSarabun/THSarabun.ttf').fillColor('blue')
                .fontSize(16).text(dataSummary.errAgg2);

                doc.y = yPosition; 
                doc.x = xPosition + (body.width * (0.1 + 0.0625 * 2));
                doc.font(dirFontPath + '/THSarabun/THSarabun.ttf').fillColor('blue')
                .fontSize(16).text(dataSummary.errAgg3);

                doc.y = yPosition; 
                doc.x = xPosition + (body.width * (0.1 + 0.0625 * 3));
                doc.font(dirFontPath + '/THSarabun/THSarabun.ttf').fillColor('blue')
                .fontSize(16).text(dataSummary.errAgg4);

                doc.y = yPosition; 
                doc.x = xPosition + (body.width * (0.1 + 0.0625 * 4));
                doc.font(dirFontPath + '/THSarabun/THSarabun.ttf').fillColor('blue')
                .fontSize(16).text(dataSummary.errCemt1);

                doc.y = yPosition; 
                doc.x = xPosition + (body.width * (0.1 + 0.0625 * 5));
                doc.font(dirFontPath + '/THSarabun/THSarabun.ttf').fillColor('blue')
                .fontSize(16).text(dataSummary.errCemt2);

                doc.y = yPosition; 
                doc.x = xPosition + (body.width * (0.1 + 0.0625 * 6));
                doc.font(dirFontPath + '/THSarabun/THSarabun.ttf').fillColor('blue')
                .fontSize(16).text(dataSummary.errCemt3);

                doc.y = yPosition; 
                doc.x = xPosition + (body.width * (0.1 + 0.0625 * 7));
                doc.font(dirFontPath + '/THSarabun/THSarabun.ttf').fillColor('blue')
                .fontSize(16).text(dataSummary.errCemt4);

                doc.y = yPosition; 
                doc.x = xPosition + (body.width * (0.1 + 0.0625 * 8));
                doc.font(dirFontPath + '/THSarabun/THSarabun.ttf').fillColor('blue')
                .fontSize(16).text(dataSummary.errAdmix1);

                doc.y = yPosition; 
                doc.x = xPosition + (body.width * (0.1 + 0.0625 * 9));
                doc.font(dirFontPath + '/THSarabun/THSarabun.ttf').fillColor('blue')
                .fontSize(16).text(dataSummary.errAdmix2);

                doc.y = yPosition; 
                doc.x = xPosition + (body.width * (0.1 + 0.0625 * 10));
                doc.font(dirFontPath + '/THSarabun/THSarabun.ttf').fillColor('blue')
                .fontSize(16).text(dataSummary.errAdmix3);

                doc.y = yPosition; 
                doc.x = xPosition + (body.width * (0.1 + 0.0625 * 11));
                doc.font(dirFontPath + '/THSarabun/THSarabun.ttf').fillColor('blue')
                .fontSize(16).text(dataSummary.errAdmix4);

                doc.y = yPosition; 
                doc.x = xPosition + (body.width * (0.1 + 0.0625 * 12));
                doc.font(dirFontPath + '/THSarabun/THSarabun.ttf').fillColor('blue')
                .fontSize(16).text(dataSummary.errWater);        

                yPosition = yPosition + 18; 
                
                doc.y = yPosition;
                doc.x = xPosition;
                doc.rect(body.xStart - page.pendings.left, yPosition, body.width, 0.1).lineWidth(0.1).dash(5, {space: 10}).stroke();
                yPosition = yPosition + 2;

                doc.y = yPosition; 
                doc.x = xPosition + (body.width * 0.025);
                doc.font(dirFontPath + '/THSarabun/THSarabunBold.ttf').fillColor('red')
                .fontSize(16).text('% Err:');
                
                doc.y = yPosition; 
                doc.x = xPosition + (body.width * (0.1 + 0.0625 * 0));
                doc.font(dirFontPath + '/THSarabun/THSarabun.ttf').fillColor('red')
                .fontSize(16).text(dataSummary.errPerAgg1);

                doc.y = yPosition; 
                doc.x = xPosition + (body.width * (0.1 + 0.0625 * 1));
                doc.font(dirFontPath + '/THSarabun/THSarabun.ttf').fillColor('red')
                .fontSize(16).text(dataSummary.errPerAgg2);

                doc.y = yPosition; 
                doc.x = xPosition + (body.width * (0.1 + 0.0625 * 2));
                doc.font(dirFontPath + '/THSarabun/THSarabun.ttf').fillColor('red')
                .fontSize(16).text(dataSummary.errPerAgg3);

                doc.y = yPosition; 
                doc.x = xPosition + (body.width * (0.1 + 0.0625 * 3));
                doc.font(dirFontPath + '/THSarabun/THSarabun.ttf').fillColor('red')
                .fontSize(16).text(dataSummary.errPerAgg4);

                doc.y = yPosition; 
                doc.x = xPosition + (body.width * (0.1 + 0.0625 * 4));
                doc.font(dirFontPath + '/THSarabun/THSarabun.ttf').fillColor('red')
                .fontSize(16).text(dataSummary.errPerCemt1);

                doc.y = yPosition; 
                doc.x = xPosition + (body.width * (0.1 + 0.0625 * 5));
                doc.font(dirFontPath + '/THSarabun/THSarabun.ttf').fillColor('red')
                .fontSize(16).text(dataSummary.errPerCemt2);

                doc.y = yPosition; 
                doc.x = xPosition + (body.width * (0.1 + 0.0625 * 6));
                doc.font(dirFontPath + '/THSarabun/THSarabun.ttf').fillColor('red')
                .fontSize(16).text(dataSummary.errPerCemt3);

                doc.y = yPosition; 
                doc.x = xPosition + (body.width * (0.1 + 0.0625 * 7));
                doc.font(dirFontPath + '/THSarabun/THSarabun.ttf').fillColor('red')
                .fontSize(16).text(dataSummary.errPerCemt4);

                doc.y = yPosition; 
                doc.x = xPosition + (body.width * (0.1 + 0.0625 * 8));
                doc.font(dirFontPath + '/THSarabun/THSarabun.ttf').fillColor('red')
                .fontSize(16).text(dataSummary.errPerAdmix1);

                doc.y = yPosition; 
                doc.x = xPosition + (body.width * (0.1 + 0.0625 * 9));
                doc.font(dirFontPath + '/THSarabun/THSarabun.ttf').fillColor('red')
                .fontSize(16).text(dataSummary.errPerAdmix2);

                doc.y = yPosition; 
                doc.x = xPosition + (body.width * (0.1 + 0.0625 * 10));
                doc.font(dirFontPath + '/THSarabun/THSarabun.ttf').fillColor('red')
                .fontSize(16).text(dataSummary.errPerAdmix3);

                doc.y = yPosition; 
                doc.x = xPosition + (body.width * (0.1 + 0.0625 * 11));
                doc.font(dirFontPath + '/THSarabun/THSarabun.ttf').fillColor('red')
                .fontSize(16).text(dataSummary.errPerAdmix4);

                doc.y = yPosition; 
                doc.x = xPosition + (body.width * (0.1 + 0.0625 * 12));
                doc.font(dirFontPath + '/THSarabun/THSarabun.ttf').fillColor('red')
                .fontSize(16).text(dataSummary.errPerWater);   
                
                yPosition = yPosition + 18; 
                
                doc.y = yPosition;
                doc.x = xPosition;
                doc.rect(body.xStart - page.pendings.left, yPosition, body.width, 0.1).lineWidth(0.1).dash(5, {space: 10}).stroke();
                yPosition = yPosition + 2;

                doc.font(dirFontPath + '/THSarabun/THSarabun.ttf').fillColor('black');
            }

            for(let i = 0; i < paging.pageAmount - 1; i++) {

                createPage();

                createHeader();

                createBody();

                body.start = body.start + body.limit;
                
                if(dataBody.length < body.start + body.limit) { 
                    body.limit = dataBody.length % body.limit;
                }

                //body.index = body.start;
                
                createFooter();

                paging.pageIndex = paging.pageIndex + 1;
            }

            //=================== Summary =============//
            createPage();

            createHeader();

            createSummary();

            createFooter();

            doc.end();
            //====================================================================//

            setTimeout(function() {
                callback(pathUrlFile);  
            }, 1000);

        }
        catch(e) 
        {
            callback(pathUrlFile);
        }   
    }
};

module.exports = Cls_ActualReport_Models;


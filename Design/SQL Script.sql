

	 CREATE TABLE  BATCH_COMPANY
	 (                                                                 
	    COMPANY_ID              INT(20)     NOT NULL,   	                                                       
	    COMPANY_NAME            varchar(50),   
            SHORT_NAME              varchar(10),
            ADDRESS                 varchar(200),
	    PHONE_NO		    varchar(50),
            MOBILE_NO		    varchar(50),
            FAX_NO		    varchar(50),

	    DESCRIPTION    varchar(300),			  					   
	    CREATE_USER    varchar(30)  NOT NULL DEFAULT 'N/A',                                                    
	    LAST_USER      varchar(30)  NOT NULL DEFAULT 'N/A',                                                        
	    CREATE_DATE    timestamp    NOT NULL DEFAULT CURRENT_TIMESTAMP,                                  
	    LAST_DATE      timestamp    NOT NULL DEFAULT '0000-00-00 00:00:00',    
                            
	    CONSTRAINT   BATCH_COMPANY_PK  PRIMARY KEY (COMPANY_ID) 
	 );

	 CREATE INDEX  BATCH_COMPANY_IDX1 ON BATCH_COMPANY (COMPANY_NAME);
	 CREATE INDEX  BATCH_COMPANY_IDX2 ON BATCH_COMPANY (SHORT_NAME);

         CREATE TABLE  BATCH_PLANT
	 (  
            COMPANY_ID              INT(20)     NOT NULL,                                                              
	    PLANT_ID                INT(20)     NOT NULL,   	                                                       
	    PLANT_NAME              varchar(50),              
            ADDRESS                 varchar(200),
	    PHONE_NO		    varchar(50),
            MOBILE_NO		    varchar(50),
            FAX_NO		    varchar(50),

	    DESCRIPTION    varchar(300),			  					   
	    CREATE_USER    varchar(30)  NOT NULL DEFAULT 'N/A',                                                    
	    LAST_USER      varchar(30)  NOT NULL DEFAULT 'N/A',                                                        
	    CREATE_DATE    timestamp    NOT NULL DEFAULT CURRENT_TIMESTAMP,                                  
	    LAST_DATE      timestamp    NOT NULL DEFAULT '0000-00-00 00:00:00',    
                            
	    CONSTRAINT   BATCH_PLANT_PK  PRIMARY KEY (PLANT_ID),
            CONSTRAINT   BATCH_PLANT_FK1   FOREIGN KEY (COMPANY_ID)   REFERENCES BATCH_COMPANY (COMPANY_ID) 
	 );

         CREATE INDEX  BATCH_PLANT_IDX1 ON BATCH_PLANT (PLANT_NAME);


         CREATE TABLE  BATCH_DEPARTMENT
	 (                                                                 
	    DEPARTMENT_ID           INT(20)     NOT NULL,   	                                                       
	    DEPARTMENT_NAME         varchar(50),              
	    PHONE_NO		    varchar(50),
            MOBILE_NO		    varchar(50),
            FAX_NO		    varchar(50),
            EXT_NO                  varchar(50),

	    DESCRIPTION   varchar(300),			  					   
	    CREATE_USER   varchar(30)  NOT NULL DEFAULT 'N/A',                                                    
	    LAST_USER     varchar(30)  NOT NULL DEFAULT 'N/A',                                                        
	    CREATE_DATE   timestamp    NOT NULL DEFAULT CURRENT_TIMESTAMP,                                  
	    LAST_DATE     timestamp    NOT NULL DEFAULT '0000-00-00 00:00:00',    
                            
	    CONSTRAINT   BATCH_DEPARTMENT_PK  PRIMARY KEY (DEPARTMENT_ID) 
	 );

	 CREATE INDEX  BATCH_DEPARTMENT_IDX1 ON BATCH_DEPARTMENT (DEPARTMENT_NAME);


         CREATE TABLE  BATCH_POSITION
	 (  
            DEPARTMENT_ID         INT(20)     NOT NULL,                                                                
	    POSITION_ID           INT(20)     NOT NULL,   	                                                       
	    POSITION_NAME         varchar(50),              
	   
	    DESCRIPTION   varchar(300),			  					   
	    CREATE_USER   varchar(30)  NOT NULL DEFAULT 'N/A',                                                    
	    LAST_USER     varchar(30)  NOT NULL DEFAULT 'N/A',                                                        
	    CREATE_DATE   timestamp    NOT NULL DEFAULT CURRENT_TIMESTAMP,                                  
	    LAST_DATE     timestamp    NOT NULL DEFAULT '0000-00-00 00:00:00',    
                            
	    CONSTRAINT   BATCH_POSITION_PK    PRIMARY KEY (POSITION_ID),
            CONSTRAINT   BATCH_POSITION_FK1   FOREIGN KEY (DEPARTMENT_ID)   REFERENCES BATCH_DEPARTMENT (DEPARTMENT_ID)  
	 );

	 CREATE INDEX  BATCH_POSITION_IDX1 ON BATCH_POSITION (POSITION_NAME);


         CREATE TABLE  BATCH_EMPLOYEE
	 (  
            PLANT_ID              INT(20)     NOT NULL,                                                                 
	    POSITION_ID           INT(20)     NOT NULL,  
            
            EMPLOYEE_ID           INT(20)     NOT NULL,  	                                                       
	    EMPLOYEE_NAME         varchar(50),              
	   
	    DESCRIPTION   varchar(300),			  					   
	    CREATE_USER   varchar(30)  NOT NULL DEFAULT 'N/A',                                                    
	    LAST_USER     varchar(30)  NOT NULL DEFAULT 'N/A',                                                        
	    CREATE_DATE   timestamp    NOT NULL DEFAULT CURRENT_TIMESTAMP,                                  
	    LAST_DATE     timestamp    NOT NULL DEFAULT '0000-00-00 00:00:00',    
                            
	    CONSTRAINT   BATCH_EMPLOYEE_PK    PRIMARY KEY (EMPLOYEE_ID),
            CONSTRAINT   BATCH_EMPLOYEE_FK1   FOREIGN KEY (PLANT_ID)      REFERENCES BATCH_PLANT    (PLANT_ID), 
            CONSTRAINT   BATCH_EMPLOYEE_FK2   FOREIGN KEY (POSITION_ID)   REFERENCES BATCH_POSITION (POSITION_ID) 
	 );

	 CREATE INDEX  BATCH_EMPLOYEE_IDX1 ON BATCH_EMPLOYEE (EMPLOYEE_NAME);
	

	 CREATE TABLE  BATCH_TRUCK
	 (  
            PLANT_ID           INT(20)     NOT NULL, 
                                                               
	    TRUCK_ID           INT(20)     NOT NULL,  
            TRUCK_NO 	       varchar(15),                                                
	    TRUCK_NAME         varchar(50),  
            TRUCK_SIZE         varchar(30),            
	    TRUCK_CAPACITY     varchar(30),  
            CAPACITY_UNIT      varchar(30),
           
	    DESCRIPTION   varchar(300),			  					   
	    CREATE_USER   varchar(30)  NOT NULL DEFAULT 'N/A',                                                    
	    LAST_USER     varchar(30)  NOT NULL DEFAULT 'N/A',                                                        
	    CREATE_DATE   timestamp    NOT NULL DEFAULT CURRENT_TIMESTAMP,                                  
	    LAST_DATE     timestamp    NOT NULL DEFAULT '0000-00-00 00:00:00',    
                            
	    CONSTRAINT   BATCH_TRUCK_PK    PRIMARY KEY (TRUCK_ID),
            CONSTRAINT   BATCH_TRUCK_FK1   FOREIGN KEY (PLANT_ID)   REFERENCES BATCH_PLANT (PLANT_ID)
	 );
         
         CREATE UNIQUE INDEX BATCH_TRUCK_UQIDX1 ON BATCH_TRUCK (TRUCK_NO);
	 CREATE INDEX  BATCH_TRUCK_IDX2 ON BATCH_TRUCK (TRUCK_NAME);
          
         CREATE TABLE  BATCH_MATERIAL_TYPE
	 (  
            MATERIAL_TYPE_ID       INT(20)     NOT NULL,            
	    MATERIAL_TYPE_NAME     varchar(50),   
           
	    DESCRIPTION    varchar(300),			  					   
	    CREATE_USER    varchar(30)  NOT NULL DEFAULT 'N/A',                                                    
	    LAST_USER      varchar(30)  NOT NULL DEFAULT 'N/A',                                                        
	    CREATE_DATE    timestamp    NOT NULL DEFAULT CURRENT_TIMESTAMP,                                  
	    LAST_DATE      timestamp    NOT NULL DEFAULT '0000-00-00 00:00:00',    
                            
	    CONSTRAINT   BATCH_MATERIAL_TYPE_PK    PRIMARY KEY  (MATERIAL_TYPE_ID)           
	 );
         
         CREATE INDEX  BATCH_MATERIAL_TYPE_IDX1 ON BATCH_MATERIAL_TYPE (MATERIAL_TYPE_NAME);

         CREATE TABLE  BATCH_MATERIAL
	 (  
            MATERIAL_TYPE_ID         INT(20)     NOT NULL,                                                               
	    MATERIAL_ID              INT(20)     NOT NULL,   	                                                       
	    MATERIAL_NAME            varchar(50) NOT NULL,   
            MATERIAL_SIZE            varchar(10) NOT NULL,  
	    MATERIAL_KEY             varchar(10) NOT NULL,
	   
	    DESCRIPTION    varchar(300),			  					   
	    CREATE_USER    varchar(30)  NOT NULL DEFAULT 'N/A',                                                    
	    LAST_USER      varchar(30)  NOT NULL DEFAULT 'N/A',                                                        
	    CREATE_DATE    timestamp    NOT NULL DEFAULT CURRENT_TIMESTAMP,                                  
	    LAST_DATE      timestamp    NOT NULL DEFAULT '0000-00-00 00:00:00',    
                            
	    CONSTRAINT   BATCH_MATERIAL_PK    PRIMARY KEY  (MATERIAL_ID),
            CONSTRAINT   BATCH_MATERIAL_FK1   FOREIGN KEY  (MATERIAL_TYPE_ID)  REFERENCES BATCH_MATERIAL_TYPE (MATERIAL_TYPE_ID) 
	 );

	 CREATE INDEX  BATCH_MATERIAL_IDX1 ON BATCH_MATERIAL (MATERIAL_NAME);
         CREATE INDEX  BATCH_MATERIAL_IDX2 ON BATCH_MATERIAL (MATERIAL_SIZE);

         CREATE TABLE  BATCH_PLANT_MATERIAL
	 (  
            PLANT_ID         INT(20)     NOT NULL,                                                               
	    MATERIAL_ID      INT(20)     NOT NULL,   	                                                       
	   
	    CONSTRAINT   BATCH_PLANT_MATERIAL_PK    PRIMARY KEY  (PLANT_ID, MATERIAL_ID),
            CONSTRAINT   BATCH_PLANT_MATERIAL_FK1   FOREIGN KEY  (PLANT_ID)  REFERENCES BATCH_PLANT (PLANT_ID),
            CONSTRAINT   BATCH_PLANT_MATERIAL_FK2   FOREIGN KEY  (MATERIAL_ID)  REFERENCES BATCH_MATERIAL (MATERIAL_ID) 
	 );

         
         CREATE TABLE  BATCH_UNIT
	 (  
            UNIT_ID       INT(20)     NOT NULL,            
	    UNIT_NAME     varchar(50),   
           
	    DESCRIPTION    varchar(300),			  					   
	    CREATE_USER    varchar(30)  NOT NULL DEFAULT 'N/A',                                                    
	    LAST_USER      varchar(30)  NOT NULL DEFAULT 'N/A',                                                        
	    CREATE_DATE    timestamp    NOT NULL DEFAULT CURRENT_TIMESTAMP,                                  
	    LAST_DATE      timestamp    NOT NULL DEFAULT '0000-00-00 00:00:00',    
                            
	    CONSTRAINT   BATCH_UNIT_PK    PRIMARY KEY  (UNIT_ID)           
	 );
         
         CREATE INDEX  BATCH_UNIT_IDX1 ON BATCH_UNIT (UNIT_NAME);


          CREATE TABLE  BATCH_STATUS_GROUP
	 (  
            STATUS_GROUP_ID      INT(20)      NOT NULL,            
	    STATUS_GROUP_NAME    varchar(50),   
           
	    DESCRIPTION    varchar(300),			  					   
	    CREATE_USER    varchar(30)  NOT NULL DEFAULT 'N/A',                                                    
	    LAST_USER      varchar(30)  NOT NULL DEFAULT 'N/A',                                                        
	    CREATE_DATE    timestamp    NOT NULL DEFAULT CURRENT_TIMESTAMP,                                  
	    LAST_DATE      timestamp    NOT NULL DEFAULT '0000-00-00 00:00:00',    
                            
 	    CONSTRAINT   STATUS_GROUP_PK    PRIMARY KEY  (STATUS_GROUP_ID)           
	 );
   
         CREATE INDEX  BATCH_STATUS_GROUP_IDX1 ON BATCH_STATUS_GROUP (STATUS_GROUP_NAME);

          CREATE TABLE  BATCH_STATUS
	 (  
            STATUS_GROUP_ID  INT(20)      NOT NULL,
            STATUS_ID        INT(20)      NOT NULL,            
	    STATUS_NAME      varchar(50),   
           
	    DESCRIPTION    varchar(300),			  					   
	    CREATE_USER    varchar(30)  NOT NULL DEFAULT 'N/A',                                                    
	    LAST_USER      varchar(30)  NOT NULL DEFAULT 'N/A',                                                        
	    CREATE_DATE    timestamp    NOT NULL DEFAULT CURRENT_TIMESTAMP,                                  
	    LAST_DATE      timestamp    NOT NULL DEFAULT '0000-00-00 00:00:00',    
                            
	    CONSTRAINT   BATCH_STATUS_PK    PRIMARY KEY  (STATUS_ID),
             CONSTRAINT   BATCH_STATUS_FK1   FOREIGN KEY  (STATUS_GROUP_ID) REFERENCES BATCH_STATUS_GROUP (STATUS_GROUP_ID)
	 );
         
   CREATE INDEX  BATCH_STATUS_IDX1 ON BATCH_STATUS (STATUS_NAME);


         CREATE TABLE  BATCH_FORMULA
	 (  
            FORMULA_ID       INT(20)     NOT NULL,            
	    FORMULA_NAME     varchar(50) NOT NULL,   
            REVISION         INT(3)      NOT NULL DEFAULT '1',

	    DESCRIPTION    varchar(300),			  					   
	    CREATE_USER    varchar(30)  NOT NULL DEFAULT 'N/A',                                                    
	    LAST_USER      varchar(30)  NOT NULL DEFAULT 'N/A',                                                        
	    CREATE_DATE    timestamp    NOT NULL DEFAULT CURRENT_TIMESTAMP,                                  
	    LAST_DATE      timestamp    NOT NULL DEFAULT '0000-00-00 00:00:00',    
                            
	    CONSTRAINT   BATCH_FORMULA_PK    PRIMARY KEY  (FORMULA_ID)           
	 );
         
         CREATE INDEX  BATCH_FORMULA_IDX1 ON BATCH_FORMULA (FORMULA_NAME);
         CREATE INDEX  BATCH_FORMULA_IDX2 ON BATCH_FORMULA (CONCEATE_NAME);


         CREATE TABLE  BATCH_FORMULA_ITEM
	 (  
            FORMULA_ID        INT(20)     NOT NULL,  
            MATERIAL_ID       INT(20)     NOT NULL, 
            UNIT_ID           INT(20)     NOT NULL, 
 
            FORMULA_ITEM_ID   INT(20)     NOT NULL,         
	    QUNTITY           INT(20)     NOT NULL,

	    DESCRIPTION    varchar(300),			  					   
	    CREATE_USER    varchar(30)  NOT NULL DEFAULT 'N/A',                                                    
	    LAST_USER      varchar(30)  NOT NULL DEFAULT 'N/A',                                                        
	    CREATE_DATE    timestamp    NOT NULL DEFAULT CURRENT_TIMESTAMP,                                  
	    LAST_DATE      timestamp    NOT NULL DEFAULT '0000-00-00 00:00:00',    
                            
	    CONSTRAINT   BATCH_FORMULA_ITEM_PK    PRIMARY KEY  (FORMULA_ITEM_ID),       
    
            CONSTRAINT   BATCH_FORMULA_ITEM_FK1   FOREIGN KEY  (FORMULA_ID)   REFERENCES BATCH_FORMULA (FORMULA_ID),
            CONSTRAINT   BATCH_FORMULA_ITEM_FK2   FOREIGN KEY  (MATERIAL_ID)  REFERENCES BATCH_MATERIAL (MATERIAL_ID),
            CONSTRAINT   BATCH_FORMULA_ITEM_FK3   FOREIGN KEY  (UNIT_ID)      REFERENCES BATCH_UNIT (UNIT_ID)
                       
	 );

         CREATE TABLE  BATCH_PRODUCT_GROUP
	 (                                                                 
	    PRODUCT_GROUP_ID       INT(20)     NOT NULL,   
	    PRODUCT_GROUP_NAME     varchar(50),  

	    DESCRIPTION    varchar(300),			  					   
	    CREATE_USER    varchar(30)  NOT NULL DEFAULT 'N/A',                                                    
	    LAST_USER      varchar(30)  NOT NULL DEFAULT 'N/A',                                                        
	    CREATE_DATE    timestamp    NOT NULL DEFAULT CURRENT_TIMESTAMP,                                  
	    LAST_DATE      timestamp    NOT NULL DEFAULT '0000-00-00 00:00:00',    

	    CONSTRAINT   BATCH_PRODUCT_GROUP_PK  PRIMARY KEY (PRODUCT_GROUP_ID) 
	 );

         CREATE INDEX  BATCH_PRODUCT_GROUP_IDX1 ON BATCH_PRODUCT_GROUP (PRODUCT_GROUP_NAME);


         CREATE TABLE  BATCH_CUSTOMER
	 (                                                                 
	    CUSTOMER_ID             INT(20)     NOT NULL,   	                                                       
	    CUSTOMER_NAME           varchar(50),   
            SHORT_NAME              varchar(10),
            ADDRESS                 varchar(200),
	    PHONE_NO		    varchar(50),
            MOBILE_NO		    varchar(50),
            FAX_NO		    varchar(50),

	    DESCRIPTION    varchar(300),			  					   
	    CREATE_USER    varchar(30)  NOT NULL DEFAULT 'N/A',                                                    
	    LAST_USER      varchar(30)  NOT NULL DEFAULT 'N/A',                                                        
	    CREATE_DATE    timestamp    NOT NULL DEFAULT CURRENT_TIMESTAMP,                                  
	    LAST_DATE      timestamp    NOT NULL DEFAULT '0000-00-00 00:00:00',    
                            
	    CONSTRAINT   BATCH_CUSTOMER_PK  PRIMARY KEY (CUSTOMER_ID) 
	 );

	 CREATE INDEX  BATCH_CUSTOMER_IDX1 ON BATCH_CUSTOMER (CUSTOMER_NAME);
	 CREATE INDEX  BATCH_CUSTOMER_IDX2 ON BATCH_CUSTOMER (SHORT_NAME);
       
         
         CREATE TABLE  BATCH_PRODUCT_GROUP
	 (                                                                 
	    PRODUCT_GROUP_ID       INT(20)      NOT NULL,   
	    PRODUCT_GROUP_NAME     varchar(50)  NOT NULL, 

	    DESCRIPTION    varchar(300),			  					   
	    CREATE_USER    varchar(30)  NOT NULL DEFAULT 'N/A',                                                    
	    LAST_USER      varchar(30)  NOT NULL DEFAULT 'N/A',                                                        
	    CREATE_DATE    timestamp    NOT NULL DEFAULT CURRENT_TIMESTAMP,                                  
	    LAST_DATE      timestamp    NOT NULL DEFAULT '0000-00-00 00:00:00',    

	    CONSTRAINT   BATCH_PRODUCT_GROUP_PK  PRIMARY KEY (PRODUCT_GROUP_ID) 
	 );
   
         CREATE INDEX  BATCH_PRODUCT_GROUP_IDX1 ON BATCH_PRODUCT_GROUP (PRODUCT_GROUP_NAME);
  
        CREATE TABLE  BATCH_PRODUCT
	(  
            PRODUCT_GROUP_ID  INT(20)     NOT NULL,
	    PRODUCT_ID        INT(20)     NOT NULL,   
	    PRODUCT_NAME      varchar(50) NOT NULL, 

	    DESCRIPTION    varchar(300),			  					   
	    CREATE_USER    varchar(30)  NOT NULL DEFAULT 'N/A',                                                    
	    LAST_USER      varchar(30)  NOT NULL DEFAULT 'N/A',                                                        
	    CREATE_DATE    timestamp    NOT NULL DEFAULT CURRENT_TIMESTAMP,                                  
	    LAST_DATE      timestamp    NOT NULL DEFAULT '0000-00-00 00:00:00',    

	    CONSTRAINT   BATCH_PRODUCT_PK  PRIMARY KEY (PRODUCT_ID),
            CONSTRAINT   BATCH_PRODUCT_FK1  FOREIGN KEY  (PRODUCT_GROUP_ID)   REFERENCES BATCH_PRODUCT_GROUP (PRODUCT_GROUP_ID)
	 );
   
           CREATE INDEX  BATCH_PRODUCT_IDX1 ON BATCH_PRODUCT (PRODUCT_NAME);
   
     
    CREATE TABLE  BATCH_PRODUCT_SPEC
	(                                                                 
	    PRODUCT_ID          INT(20)      NOT NULL,  
            FORMULA_ID          INT(20)      NOT NULL,
            PRODUCT_SPEC_ID     INT(20)      NOT NULL,
            PRODUCT_CODE        varchar(20)  NOT NULL,
	    PRODUCT_SPEC_NAME   varchar(100) NOT NULL,
		PRICE_PER_UNIT        FLOAT  NOT NULL DEFAULT '0',
	    CUBE                varchar(100) NULL,
            CYLINDER            varchar(100) NULL,
	    SLUMP               FLOAT   NULL DEFAULT '0',
         REVISION           INT(2)      NOT NULL DEFAULT '1',
	    DESCRIPTION    varchar(300),			  					   
	    CREATE_USER    varchar(30)  NOT NULL DEFAULT 'N/A',                                                    
	    LAST_USER      varchar(30)  NOT NULL DEFAULT 'N/A',                                                        
	    CREATE_DATE    timestamp    NOT NULL DEFAULT CURRENT_TIMESTAMP,                                  
	    LAST_DATE      timestamp    NOT NULL DEFAULT '0000-00-00 00:00:00',    

	    CONSTRAINT    BATCH_PRODUCT_SPEC_PK   PRIMARY KEY  (PRODUCT_SPEC_ID, PRODUCT_CODE, REVISION),
            CONSTRAINT    BATCH_PRODUCT_SPEC_FK1  FOREIGN KEY  (PRODUCT_ID) REFERENCES BATCH_PRODUCT (PRODUCT_ID),
            CONSTRAINT    BATCH_PRODUCT_SPEC_FK2  FOREIGN KEY  (FORMULA_ID) REFERENCES BATCH_FORMULA (FORMULA_ID)
	 );           
		
        CREATE INDEX   BATCH_PRODUCT_SPEC_IDX1 ON BATCH_PRODUCT_SPEC (PRODUCT_SPEC_NAME);

         
	 
         CREATE TABLE  BATCH_PROJECT
	 (  
            PROJECT_ID       INT(20)     NOT NULL,            
	    PROJECT_NAME     varchar(50),   

	    DESCRIPTION    varchar(300),			  					   
	    CREATE_USER    varchar(30)  NOT NULL DEFAULT 'N/A',                                                    
	    LAST_USER      varchar(30)  NOT NULL DEFAULT 'N/A',                                                        
	    CREATE_DATE    timestamp    NOT NULL DEFAULT CURRENT_TIMESTAMP,                                  
	    LAST_DATE      timestamp    NOT NULL DEFAULT '0000-00-00 00:00:00',    
                            
	    CONSTRAINT   BATCH_PROJECT_PK    PRIMARY KEY  (PROJECT_ID)           
	 );
         
         CREATE INDEX  BATCH_PROJECT_IDX1 ON BATCH_PROJECT (PROJECT_NAME);

         
         CREATE TABLE  BATCH_JOBSITE
	 (  
            JOBSITE_ID       INT(20)     NOT NULL,            
	    JOBSITE_NAME     varchar(50),   

	    DESCRIPTION    varchar(300),			  					   
	    CREATE_USER    varchar(30)  NOT NULL DEFAULT 'N/A',                                                    
	    LAST_USER      varchar(30)  NOT NULL DEFAULT 'N/A',                                                        
	    CREATE_DATE    timestamp    NOT NULL DEFAULT CURRENT_TIMESTAMP,                                  
	    LAST_DATE      timestamp    NOT NULL DEFAULT '0000-00-00 00:00:00',    
                            
	    CONSTRAINT   BATCH_JOBSITE_PK    PRIMARY KEY  (JOBSITE_ID)           
	 );
         
         CREATE INDEX  BATCH_JOBSITE_IDX1 ON BATCH_JOBSITE (JOBSITE_NAME);


         CREATE TABLE  BATCH_CUSTOMER_PROJECT
	 (  
            CUSTOMER_ID      INT(20)     NOT NULL,                                                               
	    PROJECT_ID       INT(20)     NOT NULL,   	                                                       
	   
	    CONSTRAINT   BATCH_CUSTOMER_PROJECT_PK    PRIMARY KEY  (CUSTOMER_ID, PROJECT_ID),

            CONSTRAINT   BATCH_CUSTOMER_PROJECT_FK1   FOREIGN KEY  (CUSTOMER_ID)  REFERENCES BATCH_CUSTOMER (CUSTOMER_ID),
            CONSTRAINT   BATCH_CUSTOMER_PROJECT_FK2   FOREIGN KEY  (PROJECT_ID)   REFERENCES BATCH_PROJECT  (PROJECT_ID) 
	 );

         
         CREATE TABLE  BATCH_PROJECT_JOBSITE
	 (  
            JOBSITE_ID       INT(20)     NOT NULL,                                                               
	    PROJECT_ID       INT(20)     NOT NULL,   	                                                       
	   
	    CONSTRAINT   BATCH_PROJECT_JOBSITE_PK    PRIMARY KEY  (JOBSITE_ID, PROJECT_ID),

            CONSTRAINT   BATCH_PROJECT_JOBSITE_FK1   FOREIGN KEY  (JOBSITE_ID)   REFERENCES BATCH_JOBSITE  (JOBSITE_ID),
            CONSTRAINT   BATCH_PROJECT_JOBSITE_FK2   FOREIGN KEY  (PROJECT_ID)   REFERENCES BATCH_PROJECT  (PROJECT_ID) 
	 );

         CREATE TABLE  BATCH_PROJECT_SALE
	 (  
            EMPLOYEE_ID      INT(20)     NOT NULL,                                                               
	    PROJECT_ID       INT(20)     NOT NULL,   	                                                       
	   
	    CONSTRAINT   BATCH_PROJECT_SALE_PK    PRIMARY KEY  (EMPLOYEE_ID, PROJECT_ID),

            CONSTRAINT   BATCH_PROJECT_SALE_FK1   FOREIGN KEY  (EMPLOYEE_ID)  REFERENCES BATCH_EMPLOYEE  (EMPLOYEE_ID),
            CONSTRAINT   BATCH_PROJECT_SALE_FK2   FOREIGN KEY  (PROJECT_ID)   REFERENCES BATCH_PROJECT   (PROJECT_ID) 
	 );


	 CREATE TABLE  BATCH_CUSTOMER_TYPE
	 (  
	    CUSTOMER_TYPE_ID     INT(20)     NOT NULL,   
            CUSTOMER_TYPE_NAME   varchar(30) NOT NULL,

	    DESCRIPTION    varchar(300),			  					   
	    CREATE_USER    varchar(30)  NOT NULL DEFAULT 'N/A',                                                    
	    LAST_USER      varchar(30)  NOT NULL DEFAULT 'N/A',                                                        
	    CREATE_DATE    timestamp    NOT NULL DEFAULT CURRENT_TIMESTAMP,                                  
	    LAST_DATE      timestamp    NOT NULL DEFAULT '0000-00-00 00:00:00',    
                            
	    CONSTRAINT   BATCH_CUSTOMER_TYPE_PK   PRIMARY KEY  (CUSTOMER_TYPE_ID)
	 );

         CREATE TABLE  BATCH_ORDER_PAYMENT
	 (  
	    ORDER_PAYMENT_ID     INT(20)     NOT NULL,   
            ORDER_PAYMENT_NAME   varchar(30) NOT NULL,

	    DESCRIPTION    varchar(300),			  					   
	    CREATE_USER    varchar(30)  NOT NULL DEFAULT 'N/A',                                                    
	    LAST_USER      varchar(30)  NOT NULL DEFAULT 'N/A',                                                        
	    CREATE_DATE    timestamp    NOT NULL DEFAULT CURRENT_TIMESTAMP,                                  
	    LAST_DATE      timestamp    NOT NULL DEFAULT '0000-00-00 00:00:00',    
                            
	    CONSTRAINT   BATCH_ORDER_PAYMENT_PK   PRIMARY KEY  (ORDER_PAYMENT_ID)
	 );

         CREATE TABLE  BATCH_ORDER
	 (  
	    CUSTOMER_TYPE_ID      INT(20)     NOT NULL,
	    ORDER_PAYMENT_ID      INT(20)     NOT NULL,
	    CUSTOMER_ID           INT(20)     NOT NULL,   
	    PROJECT_ID            INT(20)     NOT NULL,	   
            STATUS_ID             INT(20)     NOT NULL,
            UNIT_ID               INT(20)     NOT NULL,
            
            ORDER_ID              INT(20)      NOT NULL,   	                                                       
	    ORDER_NO              varchar(50)  NOT NULL,    
            
	    SHIP_TO_ADDRESS       varchar(300) NOT NULL,
	    DISTANCE              varchar(50)  NULL,        
	    
	    DESCRIPTION    varchar(300),			  					   
	    CREATE_USER    varchar(30)  NOT NULL DEFAULT 'N/A',                                                    
	    LAST_USER      varchar(30)  NOT NULL DEFAULT 'N/A',                                                        
	    CREATE_DATE    timestamp    NOT NULL DEFAULT CURRENT_TIMESTAMP,                                  
	    LAST_DATE      timestamp    NOT NULL DEFAULT '0000-00-00 00:00:00',    
                            
	    CONSTRAINT   BATCH_ORDER_PK   PRIMARY KEY  (ORDER_ID),
 
            CONSTRAINT   BATCH_ORDER_FK1  FOREIGN KEY  (CUSTOMER_TYPE_ID) REFERENCES BATCH_CUSTOMER_TYPE (CUSTOMER_TYPE_ID), 
	    CONSTRAINT   BATCH_ORDER_FK2  FOREIGN KEY  (ORDER_PAYMENT_ID) REFERENCES BATCH_ORDER_PAYMENT (ORDER_PAYMENT_ID),            
	    CONSTRAINT   BATCH_ORDER_FK3  FOREIGN KEY  (CUSTOMER_ID)      REFERENCES BATCH_CUSTOMER (CUSTOMER_ID), 
	    CONSTRAINT   BATCH_ORDER_FK4  FOREIGN KEY  (PROJECT_ID)       REFERENCES BATCH_PROJECT (PROJECT_ID),
	    CONSTRAINT   BATCH_ORDER_FK5  FOREIGN KEY  (STATUS_ID)    REFERENCES BATCH_STATUS (STATUS_ID),
            CONSTRAINT   BATCH_ORDER_FK6  FOREIGN KEY  (UNIT_ID)      REFERENCES BATCH_UNIT (UNIT_ID)
	 );

         CREATE UNIQUE INDEX BATCH_ORDER_UQIDX1 ON BATCH_ORDER (ORDER_NO);
	          

      CREATE TABLE  BATCH_ORDER_PRODUCT
	 (  
        ORDER_ID         INT(20)    NOT NULL,                                                               
	    PRODUCT_SPEC_ID  INT(20)    NOT NULL,		 
	    QUNTITY          INT(5)     NOT NULL,
	   
	    CONSTRAINT   BATCH_ORDER_PRODUCT_PK    PRIMARY KEY  (ORDER_ID, PRODUCT_SPEC_ID),
            CONSTRAINT   BATCH_ORDER_PRODUCT_FK1   FOREIGN KEY  (ORDER_ID)  REFERENCES BATCH_ORDER (ORDER_ID),
            CONSTRAINT   BATCH_ORDER_PRODUCT_FK2   FOREIGN KEY  (PRODUCT_SPEC_ID)  REFERENCES BATCH_PRODUCT_SPEC (PRODUCT_SPEC_ID) 
	 );
         
	 CREATE TABLE  BATCH_MANUFACTURE
	 ( 
	     ORDER_ID          INT(20)      NOT NULL, 
             PRODUCT_SPEC_ID   INT(20)      NOT NULL,

             MANUFACTURE_ID    INT(20)      NOT NULL,
	     MFG_NO            varchar(30)  NOT NULL,

	     DESCRIPTION    varchar(300),			  					   
	     CREATE_USER    varchar(30)  NOT NULL DEFAULT 'N/A',                                                    
	     LAST_USER      varchar(30)  NOT NULL DEFAULT 'N/A',                                                        
	     CREATE_DATE    timestamp    NOT NULL DEFAULT CURRENT_TIMESTAMP,                                  
	     LAST_DATE      timestamp    NOT NULL DEFAULT '0000-00-00 00:00:00',  
	   
	    CONSTRAINT   BATCH_MANUFACTURE_PK    PRIMARY KEY  (MANUFACTURE_ID),
            CONSTRAINT   BATCH_MANUFACTURE_FK1   FOREIGN KEY  (ORDER_ID)  REFERENCES BATCH_ORDER_PRODUCT (ORDER_ID),
            CONSTRAINT   BATCH_MANUFACTURE_FK2   FOREIGN KEY  (PRODUCT_SPEC_ID)  REFERENCES BATCH_ORDER_PRODUCT (PRODUCT_SPEC_ID) 
	 );

	 CREATE UNIQUE INDEX BATCH_ORDER_IDX1 ON BATCH_MANUFACTURE (MFG_NO);
	
	 CREATE TABLE  BATCH_MANUFACTURE_BATCH
	 ( 
	     MANUFACTURE_ID          INT(20)      NOT NULL,
             MANUFACTURE_BATCH_ID    INT(20)      NOT NULL,
	     PLANT_ID                INT(20)      NOT NULL,
            
	     BATCH_SEQ_NO           INT(5)       NOT NULL,
	     QUANTITY               varchar(20)  NOT NULL,

	     DESCRIPTION    varchar(300),			  					   
	     CREATE_USER    varchar(30)  NOT NULL DEFAULT 'N/A',                                                    
	     LAST_USER      varchar(30)  NOT NULL DEFAULT 'N/A',                                                        
	     CREATE_DATE    timestamp    NOT NULL DEFAULT CURRENT_TIMESTAMP,                                  
	     LAST_DATE      timestamp    NOT NULL DEFAULT '0000-00-00 00:00:00',  

	     CONSTRAINT   BATCH_MANUFACTURE_BATCH_PK    PRIMARY KEY  (MANUFACTURE_BATCH_ID),
             CONSTRAINT   BATCH_MANUFACTURE_BATCH_FK1   FOREIGN KEY  (MANUFACTURE_ID)  REFERENCES BATCH_MANUFACTURE (MANUFACTURE_ID),
	     CONSTRAINT   BATCH_MANUFACTURE_BATCH_FK2   FOREIGN KEY  (PLANT_ID)        REFERENCES BATCH_PLANT (PLANT_ID)            
	 );


      CREATE TABLE  BATCH_SHIPMENT
	 (                                                                 
	     MANUFACTURE_BATCH_ID    INT(20)   NOT NULL,
	     EMPLOYEE_ID             int(20)   NOT NULL,
	     TRUCK_ID                int(20)   NOT NULL,
	     STATUS_ID               int(20)   NOT NULL,	   
		 
	     SHIPMENT_ID             int(20)      NOT NULL,
	     SHIPMENT_NO             varchar(50)  NOT NULL,
	   
	     DESCRIPTION             varchar(300) NULL,		 
	     CREATE_USER    varchar(30)  NOT NULL DEFAULT 'N/A',                                                    
	     LAST_USER      varchar(30)  NOT NULL DEFAULT 'N/A',                                                        
	     CREATE_DATE    timestamp    NOT NULL DEFAULT CURRENT_TIMESTAMP,                                  
	     LAST_DATE      timestamp    NOT NULL DEFAULT '0000-00-00 00:00:00',    
                            
	     CONSTRAINT   BATCH_SHIPMENT_PK   PRIMARY KEY  (SHIPMENT_ID),

             CONSTRAINT   BATCH_SHIPMENT_FK1  FOREIGN KEY  (MANUFACTURE_BATCH_ID)   REFERENCES BATCH_MANUFACTURE_BATCH (MANUFACTURE_BATCH_ID),            
             CONSTRAINT   BATCH_SHIPMENT_FK2  FOREIGN KEY  (EMPLOYEE_ID)            REFERENCES BATCH_EMPLOYEE (EMPLOYEE_ID),
             CONSTRAINT   BATCH_SHIPMENT_FK3  FOREIGN KEY  (TRUCK_ID)               REFERENCES BATCH_TRUCK (TRUCK_ID),
             CONSTRAINT   BATCH_SHIPMENT_FK4  FOREIGN KEY  (STATUS_ID)              REFERENCES BATCH_STATUS (STATUS_ID)
	 );
         
        CREATE UNIQUE INDEX BATCH_SHIPMENT_UQIDX1 ON BATCH_SHIPMENT (SHIPMENT_NO);


	 CREATE TABLE  BATCH_CUSTOMER_PRODUCT
	 (  
            CUSTOMER_ID         INT(20)    NOT NULL,                                                               
	    PRODUCT_ID          INT(20)    NOT NULL,   	                                                       
	   
	    CONSTRAINT   BATCH_CUSTOMER_PRODUCT_PK    PRIMARY KEY  (CUSTOMER_ID, PRODUCT_ID),
            CONSTRAINT   BATCH_CUSTOMER_PRODUCT_FK1   FOREIGN KEY  (CUSTOMER_ID)  REFERENCES BATCH_CUSTOMER (CUSTOMER_ID),
            CONSTRAINT   BATCH_CUSTOMER_PRODUCT_FK2   FOREIGN KEY  (PRODUCT_ID)   REFERENCES BATCH_PRODUCT (PRODUCT_ID) 
	 );
      

	 
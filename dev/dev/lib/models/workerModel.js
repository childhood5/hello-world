//define model of  worker
exports.dbType = global.config.database_type.mysql;

var model = {
    identity: 'workers',
    connection: 'slaveMySql',
    schema: true,
    autoCreatedAt: false,
    autoUpdatedAt: false,
    migrate: 'safe',
    attributes: {
    	id: {
    		type: 'integer',
    		index: true,
            primaryKey: true,
            autoIncrement: true
    	},
    	
        frequency_id: {
        	model: 'frequencies'
        },
      
        area_id: {
        	model: 'areas'
    	},
    	
    	prefecture_id: {
    		model: 'prefectures',
    	},
    	
    	bank_branch_id: {
    		model: 'bank_branches',
    	},
    	
    	worker_stations:{
	        collection: 'worker_stations',
	        via: 'worker_id'
    	},
      
        
    	staff_code: {
    	      type: 'string',
    	      maxLength: 30
    	},
    	last_name: {
  	      type: 'string',
  	      required: false,
  	      maxLength: 30
    	},
    	first_name: {
    	      type: 'string',
    	      required: false,
    	      maxLength: 30
      	},      
      	last_name_kana: {
    	      type: 'string',
    	      required: false,
    	      maxLength: 30
      	},
      
      	first_name_kana: {
    	      type: 'string',
    	      required: false,
    	      maxLength: 30
      	},
      
      	nickname: {
    	      type: 'string',
    	      required: false,
    	      maxLength: 50,
    	      unique: true
      	},
      
      	profile_image_url: {
    	      type: 'string',
    	      required: false,
    	      maxLength: 500
      	},
      
      	birthday: {
    	      type: 'datetime',
    	      required: false
      	},
      
      	zip_code: {
    	      type: 'string',
    	      required: false,
    	      maxLength: 10
      	},
      
      	sex: {
    	      type: 'string',
    	      required: false,
    	      maxLength: 3
      	},
      
      	address1: {
    	      type: 'string',
    	      required: false,
    	      maxLength: 100
      	},
      
      	address2: {
    	      type: 'string',
    	      required: false,
    	      maxLength: 100
      	},
      
      	address3: {
    	      type: 'string',
    	      required: false,
    	      maxLength: 100
      	},
      
      	gps_data: {
    	      type: 'string',
    	      required: false,
    	      maxLength: 200
      	},
      
      	email_address: {
    	      type: 'string',
    	      required: true,
    	      maxLength: 50,
    	      unique: true
      	},
      
      	login_password: {
    	      type: 'string',
    	      required: true,
    	      maxLength: 50
      	},
      
      	tel: {
    	      type: 'string',
    	      required: true,
    	      maxLength: 20,
    	      unique: true
      	},

      	payee_type: {
    	      type: 'string',
    	      required: false,
    	      maxLength: 50
      	},

      	

      	

      	account_type: {
    	      type: 'string',
    	      required: false,
    	      maxLength: 50
      	},

      	account_number: {
    	      type: 'string',
    	      required: false,
    	      maxLength: 50
      	},
      
    	account_name: {
  	      type: 'string',
  	      required: false,
  	      maxLength: 50
    	},
    
    	demain: {
  	      type: 'string',
  	      required: false,
  	      maxLength: 1000
    	},
    
    	profile_comment: {
  	      type: 'string',
  	      required: false,
  	      maxLength: 500
    	},
    	
    	name_say: {
  	      type: 'string',
  	      required: false,
  	      maxLength: 30
    	},
    	name_mei: {
  	      type: 'string',
  	      required: false,
  	      maxLength: 30
    	},
      is_receive_notify: {
            type: 'integer',
            defaultsTo: 1,
            maxLength: 2
          },
          recover_password: {
              type: 'string',
              defaultsTo: '0'
            },
    	sort_order: {
          type: 'integer',
          defaultsTo: 0
        },
        create_date: {
          type: 'datetime',
          required: false
        },
        update_date: {
          type: 'datetime',
          required: false
        },
        update_by: {
          type: 'string',
          defaultsTo: 'anonymous',
          maxLength: 50
        },
        is_delete: {
          type: 'boolean',
          defaultsTo: false
        },
        is_hidden: {
          type: 'boolean',
          defaultsTo: false
        }
    },
    beforeValidate: function(data, next){
    	data.area_id = 1;
        next();
    },
    beforeCreate: function(data, next){  
      if(global.validator.isEmail(data.email_address)) {
        if(global.validator.isNumeric(data.tel)) {
          data.login_password = global.helpers.encrypt.getPasswordFromSha1(data.login_password);
          data.create_date = new Date().toLocaleString();
          data.update_date = new Date().toLocaleString();
          next();
        }
        else {
          next( new Error('Please check telephone format'));
        }
      }
      else {
        next( new Error('Please check email format'));
      }
    },
    beforeUpdate: function(data, next) {
      data.update_date = new Date().toLocaleString();
      next();
    }
};

exports.sModel = global.db.waterline.Collection.extend(model);

model.connection = 'masterMySql';
exports.mModel = global.db.waterline.Collection.extend(model);

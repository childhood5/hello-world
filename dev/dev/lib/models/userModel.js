//define model of  worker
exports.dbType = global.config.database_type.mysql;

var model = {
    identity: 'users',
    connection: 'slaveMySql',
    schema: true,
    migrate: 'safe',
    autoCreatedAt: false,
    autoUpdatedAt: false,
    attributes: {
        id: {
            type: 'integer',
            index: true,
            primaryKey: true,
            autoIncrement: true
        },
        company_id: {
            model: 'companies'
        },
        area_id: {
            model: 'areas'
        },
        house_id: {
          model: 'houses'
        },

        size_id: {
            model: 'room_sizes'
        },
        prefecture_id: {
            model: 'prefectures'
          },
        
        user_stations:{
            collection: 'user_stations',
            via: 'user_id'
        },
       
        user_tools:{
            collection: 'user_tools',
            via: 'user_id'
        },
        user_families:{
            collection: 'user_families',
            via: 'user_id'
        },
        last_name: {
          type: 'string',
          required: true,
          maxLength: 30
        },
        first_name: {
          type: 'string',
          required: true,
          maxLength: 30
        },  
        
        last_name_kana: {
          type: 'string',
          required: true,
          maxLength: 30
        },
    
        first_name_kana: {
          type: 'string',
          required: true,
          maxLength: 30
        },
        employee_no: {
            type: 'string',
            required: true,
            maxLength: 20
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

        sex: {
          type: 'string',
          required: false,
          maxLength: 3
        },

        zip_code: {
          type: 'string',
          required: false,
          maxLength: 10
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
        bus_stop: {
            type: 'string',
            required: false,
            maxLength: 50
        },
        customer_id: {
          type: 'string',
          required: false,
          maxLength: 50
        },

        building_type: {
          type: 'integer',
          required: false
        },

        is_auto_lock: {
          type: 'boolean',
          defaultsTo: false
        },

        is_exist_pet: {
            type: 'boolean',
            defaultsTo: false
          },

        is_receive_notify: {
            type: 'boolean',
            defaultsTo: true
          },

        is_detail_updated: {
              type: 'boolean',
              defaultsTo: false
            },   
        recover_password: {
            type: 'string',
            defaultsTo: '0'
          },
        demain: {
          type: 'string',
          size: 1000,
          required: false
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
    	delete data.confirm_password;		
      	if(data.company_id && parseInt(data.company_id, 10) > 0){
      		next();
      		return;
      	}
      	var path = require('path');
      	var company = require(path.join(global.base_root, 'lib/models/dao/company.js'));
        data.company_id = -1;
      	company.getByAuthId(data.company_auth_id, function(err, $data){
      		if(err){
      			console.log(err);
      			next( new Error('Your company code not existing'));
      			return;
      		}else if($data && parseInt($data.id, 10) > 0){
      			data.company_id = $data.id;			
      		}else{
      			next( new Error('Your company code not existing'));
      			return;
      		}
      		next();
      	});
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

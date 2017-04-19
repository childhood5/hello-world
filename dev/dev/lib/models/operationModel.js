//define model of  service_detail
exports.dbType = global.config.database_type.mysql;

var model = {
    identity: 'operations',
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
         operation_groups: {
            collection: 'operation_groups',
            via: 'group_id'
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
    	nickname: {
  	      type: 'string',
  	      required: true,
  	      maxLength: 50
    	},
    	profile_image_url: {
    	      type: 'string',
    	      required: true,
    	      maxLength: 500
      	},
      	birthday: {
  	      type: 'datetime',
  	      required: true
    	},
    	sex: {
  	      type: 'string',
  	      required: true,
  	      maxLength: 3
    	},
    	zip_code: {
    	      type: 'string',
    	      required: true,
    	      maxLength: 10
      	},
      	address: {
  	      type: 'string',
  	      required: true,
  	      maxLength: 100
    	},
    	email_address: {
    	      type: 'string',
    	      required: true,
    	      maxLength: 50
      	},
      	login_password: {
  	      type: 'string',
  	      required: true,
  	      maxLength: 50
    	},
    	tel: {
    	      type: 'string',
    	      required: true,
    	      maxLength: 20
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
    beforeUpdate: function(data, next) {
      data.update_date = new Date().toLocaleString();
      next();
    },   
    beforeCreate: function(data, next){
      data.create_date = new Date().toLocaleString();
      data.update_date = new Date().toLocaleString();
      next();
    }
};

exports.sModel = global.db.waterline.Collection.extend(model);

model.connection = 'masterMySql';
exports.mModel = global.db.waterline.Collection.extend(model);

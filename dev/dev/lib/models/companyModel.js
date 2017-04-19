//define model of  worker
exports.dbType = global.config.database_type.mysql;

var model = {
    identity: 'companies',
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
        users: {
            collection: 'users',
            via: 'company_id'
        },
        company_auth_id:{
        	type: 'string',
        	required: true,
            maxLength: 50,
            unique: true
        },
        prices: {
            collection: 'prices',
            via: 'company_id'
          },
        campaigns: {
            collection: 'campaigns',
            via: 'company_id'
          },
        status_id: {
            model: 'company_statuses'
          },
        prefecture_id: {
            model: 'prefectures'
          },
    	name: {
    		type: 'string',
    		required: true,
            maxLength: 50
    	},
      large_industry_type_id: {
            type: 'string',
            maxLength: 10
      },
      large_industry_type_name: {
            type: 'string',
            maxLength: 50
      },
      small_industry_type_id: {
            type: 'string',
            maxLength: 10
      },
      small_industry_type_name: {
            type: 'string',
            maxLength: 50
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

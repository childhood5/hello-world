//define model of  user
exports.dbType = global.config.database_type.mysql;

var model = {
    identity: 'campaigns',
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
        service_id: {
            model: 'service_details'
        },
    	start_date: {
    		type: 'datetime',
    		required: true
    	},
    	end_date: {
    		type: 'datetime',
    		required: true
    	},
    	price_off: {
    		type: 'float',
    		required: true
    	},
    	price_minus: {
    		type: 'float',
    		required: true
    	},
        service_detail_prices: {
            collection: 'service_detail_prices',
            via: 'campaign_id'
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

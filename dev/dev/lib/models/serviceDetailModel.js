//define model of  service_detail
exports.dbType = global.config.database_type.mysql;

var model = {
    identity: 'service_details',
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
        prices: {
            collection: 'prices',
            via: 'service_id'
        },
        campaigns: {
            collection: 'campaigns',
            via: 'service_id'
        },
    	service_category_id: {
    	      type: 'integer',
    	      required: true
    	},
    	service_name: {
    	      type: 'string',
    	      required: true,
    	      maxLength: 100
    	},
    	is_basic: {
    	      type: 'boolean',
    	      defaultsTo: false
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

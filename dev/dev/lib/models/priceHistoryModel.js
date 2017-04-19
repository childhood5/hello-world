//define model of  price_histories
exports.dbType = global.config.database_type.mongo;

var model = {
    identity: 'price_histories',
    connection: 'slaveMongo',
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
    	service_id: {
    	      type: 'integer',
    	      required: true
    	},    	
        company_id: {
            type: 'integer',
            required: true
        },
        offer_date: {
            type: 'datetime',
            required: true
        },
        price: {
            type: 'float',
            required: true
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

model.connection = 'masterMongo';
exports.mModel = global.db.waterline.Collection.extend(model);

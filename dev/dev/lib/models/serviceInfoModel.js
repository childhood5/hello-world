//define model of  service
exports.dbType = global.config.database_type.mongo;

var model = {
    identity: 'service_infos',
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
		user_id: {
    	      type: 'integer',
    	      required: true
    	},
		worker_id: {
    	      type: 'integer'
    	},
  	session_id: {
  	      type: 'string',
          maxLength: 50,
  	      required: true
  	},
		status_id: {
    	      type: 'integer',
    	      required: true
    	},
		user_payment_status_id: {
    	      type: 'string',
    	      required: true
    	},
		worker_payment_status_id: {
    	      type: 'string',
    	      required: true
    	},
    demain: {
            type: 'string',
            required: false
      },
		contract_date: {
    	      type: 'datetime'
      	},
		term_end_date: {
    	      type: 'datetime'
      	},
		price: {
    	      type: 'float',
    	      required: true
      	},
    ch_code: {
      type: 'string',
      maxLength: 50,
      required: true
    },
		coupon_code: {
    	      type: 'string'
      	},
		user_service_rating: {
    	      type: 'integer'
      	},
		user_price_rating: {
    	      type: 'integer'
      	},
		user_pursuer_rating: {
    	      type: 'integer'
      	},
		worker_satify_rating: {
    	      type: 'integer'
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

//define model of  users
exports.dbType = global.config.database_type.mongo;

var model = {
    identity: 'user_service_histories',
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
    	service_id: {
    	      type: 'integer',
    	      required: true
    	},    	
        room_id: {
            type: 'integer',
            required: true
        },
        term_start_day: {
            type: 'datetime',
            required: true
        },
        term_request_time: {
            type: 'string',
            required: true
        },
        offer_date: {
            type: 'datetime',
            required: true
        },
        session_id: {
            type: 'string',
            maxLength: 50,
            required: true
        },
    	status: {
    	      type: 'integer',
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

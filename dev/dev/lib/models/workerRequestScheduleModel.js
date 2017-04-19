//define model of  worker
exports.dbType = global.config.database_type.mongo;

var model = {
    identity: 'worker_request_schedules',
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
    	worker_id: {
    	      type: 'integer',
    	      required: true
    	},
    	day_of_week: {
    	      type: 'integer',
    	      required: true
    	},
    	time: {
			  type: 'time',
			  required: true
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

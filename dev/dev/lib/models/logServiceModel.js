//define model of  users
exports.dbType = global.config.database_type.mongo;

var model = {
    identity: 'log_services',
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
    	function_name: {
    	      type: 'string',
    	      required: true
    	},
    	component_name: {
    	      type: 'string',
    	      required: true
    	},    	
        log_type: {
            type: 'string',
            required: true
        },
        message_content: {
            type: 'string',
            required: true
        },
    	create_date: {
    	      type: 'datetime',
    	      required: true
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

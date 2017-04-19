//define model of  area
exports.dbType = global.config.database_type.mysql;

var model = {
    identity: 'areas',
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
            via: 'area_id'
        },
        workers: {
            collection: 'workers',
            via: 'area_id'
        },
        area_limits: {
            collection: 'area_limits',
            via: 'area_id'
        },      
		name: {
			type: 'string',
			required: true,
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

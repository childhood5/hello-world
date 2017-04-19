//define model of  service_detail
exports.dbType = global.config.database_type.mysql;

var model = {
    identity: 'group_screens',
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
    	group_id: {
    		model: 'groups'
    	},
    	screen_id: {
    		model: 'screens'
    	},
    	 can_view: {
             type: 'boolean',
             defaultsTo: false
         },
         can_insert: {
             type: 'boolean',
             defaultsTo: false
         },
         can_update: {
             type: 'boolean',
             defaultsTo: false
         },
         can_delete: {
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

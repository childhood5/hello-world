//define model of  user
exports.dbType = global.config.database_type.mysql;

var model = {
    identity: 'mail_configs',
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
      domain: {
        type: 'string',
        required: true,
        maxLength: 50
      },    
      port: {
        type: 'integer',
        required: true
      },  
      email_address: {
        type: 'string',
        required: true,
        maxLength: 50
      },  
      display_name: {
        type: 'string',
        required: true,
        maxLength: 50
      },  
      config_password: {
        type: 'string',
        required: true,
        maxLength: 50
      }, 
      type_id: {
        model: 'mail_types'
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

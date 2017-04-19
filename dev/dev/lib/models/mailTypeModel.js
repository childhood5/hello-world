//define model of  user
exports.dbType = global.config.database_type.mysql;

var model = {
    identity: 'mail_types',
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
      name: {
        type: 'string',
        required: true,
        maxLength: 50
      },     
      mail_templates: {
      	collection: 'mail_templates',
      	via: 'type_id'
      },
      mail_configs: {
        collection: 'mail_configs',
        via: 'type_id'
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

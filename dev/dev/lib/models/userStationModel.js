//define model of  worker
exports.dbType = global.config.database_type.mysql;

var model = {
    identity: 'user_stations',
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
        station_cd: {
          model: 'stations'

        },
        user_id: {
          model: 'users'
        },
        station_group_cd: {
          type: 'integer'
        },
        priority: {
            type: 'integer',
            defaultsTo: 1
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

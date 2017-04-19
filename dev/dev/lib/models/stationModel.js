//define model of  worker
exports.dbType = global.config.database_type.mysql;

var model = {
    identity: 'stations',
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
    	      type: 'integer',
    	      required: true ,
              unique: true
    	},
        line_cd: {
  	      model: 'station_lines'
    	}, 
         station_joins: {
            collection: 'station_joins',
            via: 'station_cd'
          },
    	station_group_cd: {
    	      type: 'integer',
    	      required: true  
    	},
    	station_name: {
  	      type: 'string',
  	      required: true,
  	      maxLength: 200
    	},

    	gref_cd: {
  	      type: 'integer',
  	      required: true  
    	},
    
    	post: {
  	      type: 'string',
  	      required: true,
  	      maxLength: 20
    	},
    
    	address: {
  	      type: 'string',
  	      required: true,
  	      maxLength: 500
    	},
    
    	lon: {
  	      type: 'float',
  	      required: true
    	},
    
    	lat: {
  	      type: 'float',
  	      required: true
    	},
    
    	open_date: {
  	      type: 'datetime',
  	      required: true
    	},
    
    	close_date: {
  	      type: 'datetime',
  	      required: true
    	},
    
    	status: {
  	      type: 'integer',
  	      required: true
    	},

      user_stations: {
        collection: 'stations',
        via: 'station_cd'
      },

      worker_stations: {
        collection: 'worker_stations',
        via: 'station_cd'
      },

      station_joins: {
        collection: 'station_joins',
        via: 'station_cd'
      },
    	
    	sort_order: {
          type: 'integer',
          defaultsTo: 0
        },
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

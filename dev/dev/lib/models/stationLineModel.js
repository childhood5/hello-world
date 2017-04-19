//define model of  worker
exports.dbType = global.config.database_type.mysql;

var model = {
    identity: 'station_lines',
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
    	company_cd: {
    	      model: 'station_companies'
    	},
    	line_cd: {
    	      type: 'integer',
    	      required: true,
              unique: true
    	},
         station_joins: {
            collection: 'station_joins',
            via: 'line_cd'
          },
         stations: {
            collection: 'stations',
            via: 'line_cd'
          },
        
    	line_name: {
  	      type: 'string',
  	      required: true,
  	      maxLength: 200
    	},
    	line_name_kana: {
    	      type: 'string',
    	      required: true,
    	      maxLength: 200
      	},      
      	line_name_official_name: {
    	      type: 'string',
    	      required: true,
    	      maxLength: 200
      	},      
      	line_color_color: {
    	      type: 'string',
    	      required: true,
    	      maxLength: 10
      	},     
      	line_color_name: {
    	      type: 'string',
    	      required: true,
    	      maxLength: 20
      	},      
      	lon: {
    	      type: 'float',
    	      required: true
      	},      
      	lat: {
    	      type: 'float',
    	      required: true
      	},      
      	zoom: {
    	      type: 'integer',
    	      required: true
      	},      
      	status: {
    	      type: 'integer',
    	      required: true
      	},    	
        stations: {
          collection: 'stations',
          via: 'line_cd'
        },
        station_joins: {
          collection: 'station_joins',
          via: 'line_cd'
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

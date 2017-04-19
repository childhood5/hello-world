//define model of  worker
exports.dbType = global.config.database_type.mysql;

var model = {
    identity: 'station_companies',
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
    	      type: 'integer',
    	      required: true,
              unique: true              
    	},
        station_lines: {
            collection: 'station_lines',
            via: 'company_cd'
          },
    	rail_cd: {
    	      type: 'integer',
    	      required: true  
    	},
    	company_name: {
  	      type: 'string',
  	      required: true,
  	      maxLength: 200
    	},
    	company_name_kana: {
  	      type: 'string',
  	      required: true,
  	      maxLength: 200
    	},      
    	company_name_official_name: {
  	      type: 'string',
  	      required: true,
  	      maxLength: 200
    	},      
    	company_name_abbreviation: {
  	      type: 'string',
  	      required: true,
  	      maxLength: 200
    	},     
    	company_url: {
  	      type: 'string',
  	      required: true,
  	      maxLength: 500
    	},      
    	company_type: {
  	      type: 'integer',
  	      required: true
    	},          	     
    	status: {
  	      type: 'integer',
  	      required: true
    	},    	
      station_lines: {
        collection: 'station_lines',
        via: 'company_cd'
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

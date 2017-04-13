//define model of employee

var model = {
	identity: 'employee',
    schema: true,
	connection: 'databaseSql',
    attributes: {
    	id: {
			type: 'integer',
			index: true,
            primaryKey: true,
            autoIncrement: true
    	},
    	name: {
          type: 'string',
          required: false
        }
    }
};
exports.employeeModel = global.db.waterline.Collection.extend(model);




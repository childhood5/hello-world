//define model of user

var model = {
	identity: 'user',
    schema: true,
	connection: 'databaseSql',
    attributes: {
    	id: {
			type: 'integer',
			index: true,
            primaryKey: true,
            autoIncrement: true
    	},
		idEmployee: {
			model: 'employee'
		},
    	name: {
			type: 'string',
			required: false
        },
		email: {
			type: 'string',
			required: false
		}
    }
};
exports.modelDto = global.db.waterline.Collection.extend(model);




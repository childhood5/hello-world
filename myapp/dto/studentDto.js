//define model of student

var model = {
	identity: 'student',
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
        },
		password: {
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




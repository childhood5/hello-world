module.exports.controller = function(app) {
	app.get('/gridview/get', gridview_controller.get_list);
	app.get('/gridview/get/:page', gridview_controller.get_list);
	app.get('/gridview/get/:page/:limit', gridview_controller.get_list);
	
	app.get('/gridview', gridview_controller.gridview);
	app.get('/gridview/:page', gridview_controller.gridview);
	app.get('/gridview/:page/:limit', gridview_controller.gridview);
};
var gridview_controller = {
		gridview: function(req, res){
			var paging = global.helpers.pagination.getParams(req.params.page, req.params.limit);
			paging.item_per_page = global.config.pagination.item_per_page;
			res.render('gridview/index', paging);
		},
		get_list: function(req, res){
			var countries =     [{ Name: "", Id: 0 },
						        { Name: "United States", Id: 1 },
						        { Name: "Canada", Id: 2 },
						        { Name: "United Kingdom", Id: 3 },
						        { Name: "France", Id: 4 },
						        { Name: "Brazil", Id: 5 },
						        { Name: "China", Id: 6 },
						        { Name: "Russia", Id: 7 }];
			
			//Make data example 
			var totals = 70;
			var paging = global.helpers.pagination.getFromTo(req.params.page, req.params.limit);
			var $data = [];
			
			for(i = paging.from; i < paging.to && i < totals; i++){
				$data.push({
					'id': i,
					'Name': i + '.' + 'name',
					'Age': i + '.' + 'age',
					'Address': i + '.' + 'address',
					'Country':  6,
					'Married': true,
					'action': '<a href="/operator/staff/detail/'+i+'">image</a>'
				});
			}
			var js_send = {
					//Columns will be show on gridview
					columns: [	{ name: "Name", type: "text", width: 150 },
					            { name: "Age", type: "number", width: 50 },
					            { name: "Address", type: "text" },
					            { name: "Country", type: "select", items: countries, valueField: "Id", textField: "Name" },
					            { name: "Married", type: "checkbox", title: "Is Married", sorting: false },
					            { name: "action", title: "Action", type: "html"}],
					data:$data,
					pagination: global.helpers.pagination.getPagination(req.params.page, req.params.limit, totals, '/operator/gridview/get')
			}
			
			res.send(js_send);
		}
}

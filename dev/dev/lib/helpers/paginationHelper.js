/**
 * viet.vo
 * 2015-07-24
 */
exports.getParams = function(page, limit){
	var page  = page  || 1;
	page = parseInt(page, 10);
	if(page <= 0){
		page = 1;
	}
	
	var limit = limit || global.config.pagination.limit_item;
	limit = parseInt(limit, 10);
	if(limit <= 0 ){
		limit = global.config.pagination.limit_item;
	}
	
	var cache = global.config.pagination.cache_page;
	
	return {'page': page, 'limit': limit, 'cache': cache}
}
exports.getFromTo = function(page, limit){
	var pr = global.helpers.pagination.getParams(page, limit);
	
	var from = Math.floor((pr.page-1)/pr.cache) * pr.cache * pr.limit;
	var to = from + pr.cache * pr.limit;
	return {'from': from, 'to' : to, 'limit': (to - from)}
}

exports.getPagination = function(page, limit, total, link){
	var pr = global.helpers.pagination.getParams(page, limit);
	var paginator = new global.pagination.SearchPaginator({
		'prelink':link, 
		'current': pr.page, 
		'rowsPerPage': pr.limit, 
		'totalResult': total});
	return paginator.getPaginationData();
}
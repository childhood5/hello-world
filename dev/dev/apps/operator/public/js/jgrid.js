var GRIDVIEW = {
		object: null,
		limit: 20,
		page: 1,
		total_page: 1,
		total_item: 0,
		cache: 5,
		link_url: '/',
		data: null,
		option: {
			    fields: [],
			    data: [],
			 
			    autoload: false,
			    controller: {
			        loadData: $.noop,
			        insertItem: $.noop,
			        updateItem: $.noop,
			        deleteItem: $.noop
			    },
			 
			    width: "80%",
			    height: "500",
			 
			    heading: true,
			    filtering: false,
			    inserting: false,
			    editing: false,
			    selecting: true,
			    sorting: false,
			    paging: false,
			    pageLoading: false,
			 
			    rowClass: function(item, itemIndex) {  },
			    rowClick: function(args) {  },
			    rowDoubleClick: function(args) {  },
			 
			    noDataContent: "Not found",
			 
			    confirmDeleting: true,
			    deleteConfirm: "Are you sure?",
			 
			    pagerContainer: null,
			    pageIndex: 1,
			    pageSize: 20,
			    pageButtonCount: 15,
			    pagerFormat: "Pages: {first} {prev} {pages} {next} {last}    {pageIndex} of {pageCount}",
			    pagePrevText: "Prev",
			    pageNextText: "Next",
			    pageFirstText: "First",
			    pageLastText: "Last",
			    pageNavigatorNextText: "...",
			    pageNavigatorPrevText: "...",
			 
			    loadIndication: true,
			    loadIndicationDelay: 500,
			    loadMessage: "Loading...",
			    loadShading: true,
			 
			    updateOnResize: true,
			 
			    rowRenderer: null,
			    headerRowRenderer: null,
			    filterRowRenderer: null,
			    insertRowRenderer: null,
			    editRowRenderer: null
		},
		reInit: function(){
			var $ob = GRIDVIEW.object;
			$ob.find('input[hk-jgrid=checkbox-all]').unbind('click').click(function(){
				var is_checked = true;
				$ob.find('input[hk-jgrid=checkbox]').each(function(){
					var $o = $(this);
					if(!$o.is(':checked')){
						is_checked = false;
					}
				});
				
				$ob.find('input[hk-jgrid=checkbox]').prop('checked', !is_checked);
				$(this).prop('checked', !is_checked);
				
			});
			$ob.find('input[hk-jgrid=checkbox]').unbind('click').click(function(){
				var is_checked = true;
				$ob.find('input[hk-jgrid=checkbox]').each(function(){
					var $o = $(this);
					if(!$o.is(':checked')){
						is_checked = false;
					}
				});
				$ob.find('input[hk-jgrid=checkbox-all]').prop('checked', is_checked);
			});
			
			var $pager = $('#' + GRIDVIEW.object.attr('ref-pagination'));
			$pager.find('select#sel-jgrid-limit').unbind('change').change(function(){
				var $ob = GRIDVIEW.object;
				var $this = $(this);
				$('#' + $ob.attr('ref-limit')).val($this.val());
				$('#' + $ob.attr('ref-page')).val('1');
				GRIDVIEW.reload();
			});
			$pager.find('select#sel-jgrid-pager').unbind('change').change(function(){
				var $ob = GRIDVIEW.object;
				var $this = $(this);
				$('#' + $ob.attr('ref-page')).val($this.val());
				if(GRIDVIEW.isCached($this.val())){
					GRIDVIEW.renderPage($this.val());
				}else{
					GRIDVIEW.reload();
				}
			});
			$pager.find('a#a-jgrid-first').unbind('click').click(function(){
				var $sel = $pager.find('select#sel-jgrid-pager');
				var $val = parseInt($sel.val(), 10);
				if($val > 1){
					$sel.val('1').trigger('change');
				}
				return false;
			});
			$pager.find('a#a-jgrid-last').unbind('click').click(function(){
				var $sel = $pager.find('select#sel-jgrid-pager');
				var $val = parseInt($sel.val(), 10);
				if($val < GRIDVIEW.total_page){
					$sel.val(GRIDVIEW.total_page + '').trigger('change');
				}
				return false;
			});
			$pager.find('a#a-jgrid-prev').unbind('click').click(function(){
				var $sel = $pager.find('select#sel-jgrid-pager');
				var $val = parseInt($sel.val(), 10);
				if($val > 1){
					$sel.val(($val - 1) + '').trigger('change');
				}
				return false;
			});
			$pager.find('a#a-jgrid-next').unbind('click').click(function(){
				var $sel = $pager.find('select#sel-jgrid-pager');
				var $val = parseInt($sel.val(), 10);
				if($val < GRIDVIEW.total_page){
					$sel.val(($val + 1) + '').trigger('change');
				}
				return false;
			});
		},
		reload: function(){
			var $ob = GRIDVIEW.object;
			var url = GRIDVIEW.link_url + '/'+$('#' + $ob.attr('ref-page')).val()+'/' + $('#' + $ob.attr('ref-limit')).val();
			$.ajax({
				'method': 'GET',
        		'url': url,
        		'dataType': 'json',
        		'data': {},
        		'success': function(data){
        			GRIDVIEW.render(data.columns, data.data, data.pagination, $ob);
        		}
			});
		},
		renderPage: function(new_page){
			GRIDVIEW.page = parseInt(new_page,10);
			var $ob = GRIDVIEW.object;
			var data_show = [];
			var from = ((GRIDVIEW.page-1) % GRIDVIEW.cache) * GRIDVIEW.limit;
			var to = from + GRIDVIEW.limit;
			if( to > GRIDVIEW.data.data.length){
				to = GRIDVIEW.data.data.length;
			}
			for(var i=from; i<to; i++){
				data_show.push(GRIDVIEW.data.data[i]);
			}
			
			GRIDVIEW.option.fields = GRIDVIEW.data.cols;
			GRIDVIEW.option.data = data_show;
			if($ob.attr('hk-width')){
				GRIDVIEW.option.width = $ob.attr('hk-width');
			}
			if($ob.attr('hk-height')){
				GRIDVIEW.option.height = $ob.attr('hk-height');
			}
			
			$ob.jsGrid(GRIDVIEW.option);
		},
		render: function(columns, data, pagination, $ob){
			GRIDVIEW.object = $ob;
			GRIDVIEW.limit = parseInt($('#' + $ob.attr('ref-limit')).val(), 10);
			GRIDVIEW.page = pagination.current;
			GRIDVIEW.total_page = pagination.pageCount;
			GRIDVIEW.link_url = pagination.prelink;
			GRIDVIEW.cache = parseInt($('#' + $ob.attr('ref-cache')).val(), 10);
			GRIDVIEW.total_item = pagination.totalResult;
			GRIDVIEW.data = {
					'cols': columns,
					'data': data
			}
			GRIDVIEW.data.cols.unshift({name: 'checkbox', title:'<input type="checkbox" hk-jgrid="checkbox-all" id="chk_list_all" value="0" title="check/uncheck all"/>', type: 'html', width: 20});
			
			for(var i=0; i<GRIDVIEW.data.data.length; i++){
				GRIDVIEW.data.data[i].checkbox= '<input type="checkbox" id="chk_'+data[i].id+'" value="'+data[i].id+'" hk-jgrid="checkbox"/>';
				
			}
			
			
			var data_show = [];
			var from = ((GRIDVIEW.page-1) % GRIDVIEW.cache) * GRIDVIEW.limit;
			var to = from + GRIDVIEW.limit;
			if( to > GRIDVIEW.data.data.length){
				to = GRIDVIEW.data.data.length;
			}
			for(var i=from; i<to; i++){
				data_show.push(GRIDVIEW.data.data[i]);
			}
			
			GRIDVIEW.option.fields = GRIDVIEW.data.cols;
			GRIDVIEW.option.data = data_show;
			if($ob.attr('hk-width')){
				GRIDVIEW.option.width = $ob.attr('hk-width');
			}
			if($ob.attr('hk-height')){
				GRIDVIEW.option.height = $ob.attr('hk-height');
			}
			
			$ob.jsGrid(GRIDVIEW.option);
			GRIDVIEW.renderPagination();
			GRIDVIEW.reInit();
		},
		getIds: function(){
			var $ob = GRIDVIEW.object;
			var ids = [];
			$ob.find('input[hk-jgrid=checkbox]').each(function(){
				var $o = $(this);
				if($o.is(':checked')){
					ids.push($o.attr('value'));
				}
			});
			return ids;
		},
		isCached: function(new_page){
			new_page = parseInt(new_page, 10);
			var from = Math.floor((GRIDVIEW.page-1)/GRIDVIEW.cache) * GRIDVIEW.cache * GRIDVIEW.limit;
			var to = from + GRIDVIEW.cache * GRIDVIEW.limit;
			
			
			var fromNow = ((new_page-1) % GRIDVIEW.cache) * GRIDVIEW.limit + Math.floor((new_page-1)/GRIDVIEW.cache) * GRIDVIEW.cache * GRIDVIEW.limit;
			
			return (fromNow >= from && fromNow < to);
		},
		renderPagination: function(){
			var $div = $('<div class="page-container"></div>');
			var str = '<div class="right"><a href="#" id="a-jgrid-first"> First </a> '
					+ '<a href="#"  id="a-jgrid-prev"> Prev </a>'
					+ '<select name="sel-jgrid-pager" id="sel-jgrid-pager">';
			for(var i=0; i < GRIDVIEW.total_page; i++){
				str += '<option value="'+(i+1)+'">'+(i+1)+'</option>';
			}
			
			str += '</select>'
				+  '<a href="#" id="a-jgrid-next"> Next </a>'
				+  '<a href="#" id="a-jgrid-last"> Last </a></div>'
				+  '<div class="left">View : <select name="sel-jgrid-limit" id="sel-jgrid-limit">';
			
			var item_per_page = GRIDVIEW.object.attr('hk-item-per-page').split(',');
			for(var i = 0; i< item_per_page.length; i++){
				str += '<option value="'+item_per_page[i]+'">'+item_per_page[i]+'</option>';
			}
				str += '</select> <span>Total pages: ' + GRIDVIEW.total_page +'</span></div>'
					+  '<div style="clear: both"></div>';
			$div.append(str);
			$('#' + GRIDVIEW.object.attr('ref-pagination')).html('').append($div);
			$div.css('width', GRIDVIEW.object.css('width'));
			$div.find('select#sel-jgrid-pager').val(GRIDVIEW.page);
			$div.find('select#sel-jgrid-limit').val(GRIDVIEW.limit);
		}
};
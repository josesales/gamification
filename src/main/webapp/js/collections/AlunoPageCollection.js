/* generated: 23/08/2016 08:32:11 */
define(function(require) {
	// Start "Import´s" Definition"
	var _ = require('adapters/underscore-adapter');
	var $ = require('adapters/jquery-adapter');
	var Backbone = require('adapters/backbone-adapter');
	var AlunoModel = require('models/AlunoModel');
	// End of "Import´s definition"
	
	var AlunosCollection = Backbone.PageableCollection.extend({

		model : AlunoModel,

		url : 'rs/crud/alunos',

		mode : 'server',

		state : {
			firstPage : 1,
			lastPage : null,
			currentPage : 1,
			pageSize :10,
			totalPages : null,
			totalRecords : null,
			sortKey : null,
			order : -1
		},

		queryParams : {
			totalPages : null,
			pageSize : "pageSize",
			totalRecords : null,
			sortKey : "orderBy",
			order : "direction",
			directions : {
				"-1" : "asc",
				"1" : "desc"
			}
		},
	});

	return AlunosCollection;
});
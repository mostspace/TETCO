"use strict";
var AdminDashboard = function() {

	var initTable1 = function() {
		var table = $('#priceLimitTable');

		// begin first table
		table.DataTable({
			responsive: true,
			searchDelay: 500,
			processing: true,
			serverSide: true,
			ajax: {
				url: '/school-price-limit',
				type: 'POST',
				data: {
					// parameters for custom backend script demo
					columnsDef: [
						'id', 'level_name', 'price_limit', 'Actions'],
				},
			},
			columns: [
				{data: 'level_name'},
				{data: 'price_limit'},
                // {data: 'Actions'},
			],
            columnDefs: [
                {
					targets: 1,
					data: "price_limit",
					render: function(data, type, row, meta) {
						if(type === 'display') {
							return '<input type="text" class="form-control edit_value" data-id="' + row.id + '" value="'+  row.price_limit +'"/>';
						} else if (type === 'sort' || type === 'type') {
							return row.price_limit;
						}
					}
				}
			],
		});
	};

    var initMain = function () {
        // Keydown event handler for elements with class 'edit_value'
        $("#priceLimitTable").on("keydown", ".edit_value", function(event) {
            if (event.keyCode === 13) {
                $.ajax({
                    type: "POST",
                    url: "/update-price-limit",
                    data: {
                        id: $(this).data('id'),
                        price_value: $(this).val(),
                    },
                    success: function (response) {
                        handleResponse(response);
                    },
                    error: function (error) {
                        handleAjaxError('Please enter the price accurately.');
                    }
                });
            }
        });
    };

	return {
		//main function to initiate the module
		init: function() {
			initTable1();
			initMain();
		},
	};
}();

jQuery(document).ready(function() {
	AdminDashboard.init();
});

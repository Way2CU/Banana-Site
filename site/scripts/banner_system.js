/**
 * Banner system JavaScript
 * Bsexy site
 *
 * Copyright (c) 2016. by Way2CU, http://way2cu.com
 * Authors: Tal Reznic
 */

// create or use existing site scope
var Site = Site || {};

Site.move_banners = function(items_selector, banners_selector, normal_per_row, priority_per_row) {
	var items = document.querySelectorAll(items_selector);
	var banners = document.querySelectorAll(banners_selector);

	// insert banners after two lines
	var score = 0;
	var max_rows = 2;
	var banner_index = 0;
	var banner_group = 4;  // number of banners in a group
	var container = items[0].parentNode;

	for(var i = 0; i < items.length; i++) {
		var item = items[i];

		// item value for scoring based on number of items in row (5 or 6)
		var value = item.dataset.priority > 5 ? 1/priority_per_row : 1/normal_per_row;

		// if total score if bigger than maximum (2 rows) insert banners
		if (score + value > max_rows) {
			score = 0;

			// insert specified number of banners before the item
			for(var j = 0; j < banner_group; j++) {
				var banner = banners[banner_index++];
				if (banner)
					container.insertBefore(banner, item);
			}

			// break when we run out of banners to insert
			if (banner_index > banners.length)
				break;

		// increase score and skip inserting banners
		} else {
			score += value;
		}
	}
}

$(function() {
	if(!Site.is_mobile()) {
		if (document.querySelectorAll('section.category_areas').length > 0)
			Site.move_banners('div.item', 'a.link', 6, 5);

	} else {
		if (window.location.pathname == "/")
			Site.move_banners('a.category', 'a.link', 2, 2); else
			Site.move_banners('div.item', 'a.link', 2, 2);
	}
})
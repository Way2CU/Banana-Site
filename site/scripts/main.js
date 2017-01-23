/**
 * Main JavaScript
 * Site Name
 *
 * Copyright (c) 2015. by Way2CU, http://way2cu.com
 * Authors:
 */

// create or use existing site scope
var Site = Site || {};

// make sure variable cache exists
Site.variable_cache = Site.variable_cache || {};


/**
 * Check if site is being displayed on mobile.
 * @return boolean
 */
Site.is_mobile = function() {
	var result = false;

	// check for cached value
	if ('mobile_version' in Site.variable_cache) {
		result = Site.variable_cache['mobile_version'];

	} else {
		// detect if site is mobile
		var elements = document.getElementsByName('viewport');

		// check all tags and find `meta`
		for (var i=0, count=elements.length; i<count; i++) {
			var tag = elements[i];

			if (tag.tagName == 'META') {
				result = true;
				break;
			}
		}

		// cache value so next time we are faster
		Site.variable_cache['mobile_version'] = result;
	}

	return result;
};

/**
 * Function called when document and images have been completely loaded.
 */
Site.on_load = function() {
	if (Site.is_mobile())
		Site.mobile_menu = new Caracal.MobileMenu();

	// Gallery controller for thumbnails
		Site.thumbnails = new Caracal.Gallery.Slider(3, true);
		Site.thumbnails
			.controls.attach_next($('div.controllers a.next'))
			.controls.attach_previous($('div.controllers a.prev'))
			.images.set_container('div.thumbnails')
			.images.set_step_size(1)
			.images.add('div.thumbnails img.thumbnail');
			Site.thumbnails.images.update();

		// Gallery controller for main image
		Site.main_image = new Caracal.Gallery.Slider(1, true);
		Site.main_image
			.controls.attach_next($('div.controllers a.next'))
			.controls.attach_previous($('div.controllers a.prev'))
			.images.set_container('div.main_image')
			.images.set_step_size(1)
			.images.add('div.main_image img.big_image');
		Site.main_image.images.update();
};


// connect document `load` event with handler function
$(Site.on_load);

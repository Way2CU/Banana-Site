/**
 * Main JavaScript
 * Site Name
 *
 * Copyright (c) 2015. by Way2CU, http://way2cu.com
 * Authors:
 */

// create or use existing site scope
var Site = Site || new Object();

// make sure variable cache exists
Site.variable_cache = Site.variable_cache || new Object();


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

Site.load_agreement = function() {
	var url = '/agreement';
	var path = document.querySelector('meta[property]').getAttribute('content');
	path += url;

	var element = document.createElement('div');
	element.classList.add('intro');

	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if(this.readyState == 4 && this.status == 200) {
			// Add content
			element.innerHTML = this.responseText;
			document.querySelector('body').appendChild(element);

			// Assign event listenr to close agreement message
			var button_close_agreement = document.querySelector('a.close');
			button_close_agreement.addEventListener('click', function() {
				document.querySelector('div.intro').remove();
			});
		}
	};

	xhttp.open("GET", path, true);
	xhttp.send();
}

/**
 * Function called when document and images have been completely loaded.
 */
Site.on_load = function() {
	if (Site.is_mobile())
		Site.mobile_menu = new Caracal.MobileMenu();

	// condition for showing agreement page
	if(!localStorage.getItem('agreement')) {
		localStorage.setItem('agreement', true);
		Site.load_agreement();
	}

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
	Site.main_image = new Caracal.Gallery.Slider(1, false);
	Site.main_image
		.controls.attach_next($('div.controllers a.next'))
		.controls.attach_previous($('div.controllers a.prev'))
		.images.set_container('div.main_image')
		.images.set_step_size(1)
		.images.add('div.main_image img.big_image');
	Site.main_image.images.update();

	// create slider for new items on site
	Site.new_items_gallery = null;
	if (document.querySelector('div#new_items') && !Site.is_mobile()) {
		Site.new_items_gallery = new Caracal.Gallery.Slider(9);
		Site.new_items_gallery
				.images.add('div#new_items div.item')
				.images.set_container('div#new_items')
				.images.set_center(true)
				.images.set_spacing(20)
				.controls.set_auto(3000)
				.controls.set_pause_on_hover(true)
				.images.update();
	}
};


// connect document `load` event with handler function
$(Site.on_load);

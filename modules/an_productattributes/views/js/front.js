
(function ($, window, undefined) {
	'use strict';

	$(document).on('change','.an_productattributes [data-product-attribute], .an_productattributes-select select', function() {

		var self = this;

		getData($(this).closest('.an_productattributesForm').serialize(), function(data){
			isAvailableForOrder($(self).closest('.an_productattributesForm').find('.js-an_productattributes-add-to-cart'), data);
			setMaxQty($(self).closest('.an_productattributesForm').find('.an_productattributes-qty'), data);
			setMinQty($(self).closest('.an_productattributesForm').find('.an_productattributes-qty'), data);
			setPrices($(self).closest(an_productattributes.config.product_price_and_shipping), $(self).closest(an_productattributes.config.product_price_and_shipping).find(an_productattributes.config.price), data);
			setImages($(self).closest(an_productattributes.config.thumbnail_container).find('img'), data);
			setVariants($(self).closest('.js-an_productattributes-standart'), data);
			setVariants($(self).closest('.js-an_productattributes-select'), data);

		});
	});

	$(document).on('click','.an_productattributes-dropdown-menu li', function() {

		var self = this;

		if (attributeGroups){
			generateInputs($(this).closest('.an_productattributesForm'), parseInt($(this).closest(an_productattributes.config.product_miniature).attr('data-id-product')), $(this).data('value'));
		}

		getData($(this).closest('.an_productattributesForm').serialize(), function(data){
			isAvailableForOrder($(self).closest('.an_productattributesForm').find('.js-an_productattributes-add-to-cart'), data);
			setMaxQty($(self).closest('.an_productattributesForm').find('.an_productattributes-qty'), data);
			setMinQty($(self).closest('.an_productattributesForm').find('.an_productattributes-qty'), data);
			setPrices($(self).closest(an_productattributes.config.product_price_and_shipping), $(self).closest(an_productattributes.config.product_price_and_shipping).find(an_productattributes.config.price), data);
			setImages($(self).closest(an_productattributes.config.thumbnail_container).find('img'), data);
		});
	});

	$(document).on('input','.an_productattributes-qty', function() {
		changeButInput(this);
	});

	function changeButInput(self){
		var val = parseInt($(self).val());
		var max = parseInt($(self).attr('data-max'));
		var addToCart = $(self).closest('.an_productattributesForm').find('.js-an_productattributes-add-to-cart');
		var addToCartStatus = parseInt(addToCart.attr('data-status'));

		if (max && val > max){
			addToCart.attr('disabled', 'disabled');
		} else if (addToCartStatus){
			addToCart.removeAttr('disabled');
		} else {
			addToCart.attr('disabled', 'disabled');
		}
	}

	function getData(dataUrl, callback){
		$.ajax({
			type: "POST",
			url: an_productattributes.controller,
			async: false,
			data: dataUrl + '&action=getProductAttributes',
			dataType: 'json',
		}).done(function(data){
			callback(data);
		});
	}

	function generateInputs(an_productattributesForm, productId, attrebuteID){
		$('.an_productattributes-hiddeninputs').remove();

		$.each(attributeGroups[productId][attrebuteID], function(index, value) {
			an_productattributesForm.append("<input name='group[" + value['id_attribute_group'] + "]' value='" + value['id_attribute'] + "' type='hidden' class='an_productattributes-hiddeninputs' />");
		});
	}

	function isAvailableForOrder(addToCart, data){
		if (!data.availableForOrder){
			addToCart.attr('disabled', 'disabled');
		} else {
			addToCart.removeAttr('disabled');
		}
		addToCart.attr('data-status', data.availableForOrder);
	}

	function setVariants(standart, data){
		if (data.variants){
			standart.html(data.variants);
		}
	}

	function setMaxQty(qty, data){
		if (data.order_out_of_stock){
			qty.attr('data-max', data.quantity);
		} else {
			qty.removeAttr('data-max');
		}
	}

	function setMinQty(qty, data){
		if (data.minimal_quantity){
			qty.attr('min', data.minimal_quantity).val(data.minimal_quantity);
		}
	}

	function setPrices(priceContainer, price, data){
		priceContainer.find(an_productattributes.config.regular_price).remove();
		price.html(data.prices.price);
		if (data.prices.regular_price){
			$('<span class="regular-price">'+data.prices.regular_price+'</span>').insertAfter(price);
		}
	}

	function setImages(img, data){
		if (data.images){
			if ($(img[0]).parents().hasClass('js-img-view-type')) {

				if ($(img[0]).parents().hasClass('type-standart')) {
					img.attr('src', data.images.home[data.cover_id]);
				}

				if ($(img[0]).parents().hasClass('type-hover')) {
					let keysArr = [],
						img_item = img[0],
						img_hover_container = img.parents('.product-thumbnail'),
						img_cover;
					for (var key in data.images.home) {
						keysArr.push(key);
					}
					console.log('atata');
					img_hover_container.empty();
					$.each(keysArr, function(index, value) {
						if(index == 0) {
							img_hover_container.append(img_item);
						} else {
							img_hover_container.find('img:first').removeClass('cover').clone().appendTo(img_hover_container);
						}
						img_hover_container.find('img').eq(index).attr('src', data.images.home[value]);
						if(value == data.cover_id) {
							img_cover = img_hover_container.find('img').eq(index);
						}
						if (keysArr.length < 2) {
							img_hover_container.find('img').eq(index).addClass('only_one_item');

						} else {
							img_hover_container.find('img').eq(index).removeClass('only_one_item');
						}
					});
					img_cover.addClass('cover');
				}

				if ($(img[0]).parents().hasClass('type-slider')) {
					slider_delete($(img[0]).parents('.slider_product-wrapper'));
					let keysArr = [],
						img_item = $(img[0]).parents('.slider-product-item').removeClass('slick-slide slick-cloned'),
						img_hover_container = img.parents('.slider_product-wrapper');
					for (var key in data.images.home) {
						keysArr.push(key);
					}
					img_hover_container.empty();
					$.each(keysArr, function(index, value) {
						if(index == 0) {
							img_hover_container.append(img_item);
						} else {
							img_hover_container.find('.slider-product-item:first').clone().appendTo(img_hover_container);
						}
						img_hover_container.find('.slider-product-item').eq(index).find('img').attr('src', data.images.home[value]);
					});
					slider_init_one($(img[0]).parents('.an_slick-slider'));
				}

				if ($(img[0]).parents().hasClass('type-hover-slider')) {
					let keysArr = [],
						img_item = $(img[0]).parents('li:first'),
						img_hover_container = img.parents('.product-thumbnail ul'),
						img_cover,
						only_one_img;
					for (var key in data.images.home) {
						keysArr.push(key);
					}
					img_hover_container.empty();
					$.each(keysArr, function(index, value) {
						if(index == 0) {
							img_hover_container.append(img_item);
						} else {
							img_hover_container.find('li:first').removeClass('cover-item').addClass('no-cover-item').clone().appendTo(img_hover_container);
						}
						img_hover_container.find('img').eq(index).attr('src', data.images.home[value]);
						if(value == data.cover_id) {
							img_cover = img_hover_container.find('img').eq(index);
						}
						if (keysArr.length < 2) {
							only_one_img = true;
						} else {
							only_one_img = false;
						}
					});
					if (only_one_img) {
						img_hover_container.addClass('only_one_item');
					} else {
						img_hover_container.removeClass('only_one_item');
					}
					img_cover.parents('li:first').removeClass('no-cover-item').addClass('cover-item');
				}

			} else {
				img.attr('src', data.images.home[data.cover_id]);
			}

		}
	}

})(jQuery, window);

$(document).ready(function () {
	$(document).on('click', '.an_productattributes-dropdown-toggler', function(){
		$(this).parents('.an_productattributes-dropdown').toggleClass('open');
	});
	$(document).on('click', '.an_productattributes-dropdown-menu', function(){
		$(this).parents('.an_productattributes-dropdown').toggleClass('open');
	});
	$(document).on('click', '.js-an_productattributes-product-selectbox li', function(){
		$(this).parents('.js-an_productattributes-product-selectbox').find('.js-an_productattributes-filter-option').text($(this).children('.js-an_productattributes-text').text());
		$(this).parents('.js-an_productattributes-select').find('option').removeAttr('selected');
		$(this).parents('.js-an_productattributes-select').find('option').eq($(this).index()).attr('selected','');
	});

	$('.js-an_productattributes-product-selectbox li:first-child').each(function() {
		let item = $(this).parents('.js-an_productattributes-product-selectbox').find('.js-an_productattributes-filter-option');
		if (!item.hasClass('selected')) {
			item.text($(this).children('.js-an_productattributes-text').text());
			item.addClass('selected');
		}
	});

	$(an_productattributes.config.product_miniature).hover(function(){}, function(){
		$('.an_productattributes-dropdown').removeClass('open');
	});

});
$( document ).ajaxStop(function() {
	$('.js-an_productattributes-product-selectbox li:first-child').each(function() {
		let item = $(this).parents('.js-an_productattributes-product-selectbox').find('.js-an_productattributes-filter-option');
		if (!item.hasClass('selected')) {
			item.text($(this).children('.js-an_productattributes-text').text());
			item.addClass('selected');
		}
	});
	$(an_productattributes.config.product_miniature).hover(function(){}, function(){
		$('.an_productattributes-dropdown').removeClass('open');
	});
});
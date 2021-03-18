/* global $ */
$(function () {
  const $searchWidget = $('#search_widget');
  const $searchBox = $searchWidget.find('input[type=text]');
  const searchURL = $searchWidget.attr('data-search-controller-url');
  const $searchSubmit = $searchWidget.find('button[type="submit"]');

  $.widget('prestashop.psBlockSearchAutocomplete', $.ui.autocomplete, {
    _renderItem: function (ul, product) {
      const meds = [];

      if (product.hasOwnProperty('manufacturer_name')) {
        meds.push(
          `<label class="label"><strong>Laboratorio</strong></label>: <span>${product.manufacturer_name}</span>`
        );
      }

      if (product.hasOwnProperty('active_ingredient')) {
        const api = product.active_ingredient.split(/\||\//g, 3).join(' | ');
        meds.push(
          `<label class="label"><strong>Ingrediente(s) Activo(s)</strong></label>: <span>${api}</span>`
        );
      }

      const med = `<div class="medicine-block"><p>${meds.join(
        ' - '
      )}</p></div>`;
      if (
        product.hasOwnProperty('cover') &&
        product.cover != null &&
        false != product.cover
      ) {
        if (product.has_discount) {
          return $('<li>')
            .append(
              $('<a>')
                .append(
                  $(
                    '<img src=' + product.cover.bySize.slider_photo.url + '>'
                  ).addClass('product-image')
                )
                .append(
                  $("<div class='product-desc'>")
                    .append($('<span>').html(product.name).addClass('product'))
                    .append(med)
                    .append(
                      $("<div class='prices-block'>")
                        .append(
                          $('<span>')
                            .html(product.price)
                            .addClass('product-price')
                        )
                        .append(
                          $('<span>')
                            .html(product.regular_price)
                            .addClass('regular-price')
                        )
                    )
                )
            )
            .appendTo(ul);
        } else {
          return $('<li>')
            .append(
              $('<a>')
                .append(
                  $(
                    '<img src=' + product.cover.bySize.slider_photo.url + '>'
                  ).addClass('product-image')
                )
                .append(
                  $("<div class='product-desc'>")
                    .append($('<span>').html(product.name).addClass('product'))
                    .append(med)
                    .append(
                      $("<div class='prices-block'>").append(
                        $('<span>')
                          .html(product.price)
                          .addClass('product-price')
                      )
                    )
                )
            )
            .appendTo(ul);
        }
      } else {
        if (product.has_discount) {
          return $("<li class='noimg-search'>")
            .append(
              $('<a>')
                .append(
                  $('<img src="/img/p/es-default-small_default.jpg">').addClass(
                    'product-image'
                  )
                )
                .append(
                  $("<div class='product-desc'>")
                    .append($('<span>').html(product.name).addClass('product'))
                    .append(med)
                    .append(
                      $("<div class='prices-block'>")
                        .append(
                          $('<span>')
                            .html(product.price)
                            .addClass('product-price')
                        )
                        .append(
                          $('<span>')
                            .html(product.regular_price)
                            .addClass('regular-price')
                        )
                    )
                )
            )
            .appendTo(ul);
        } else {
          return $("<li class='noimg-search'>")
            .append(
              $('<a>')
                .append(
                  $('<img src="/img/p/es-default-small_default.jpg">').addClass(
                    'product-image'
                  )
                )
                .append(
                  $("<div class='product-desc'>")
                    .append($('<span>').html(product.name).addClass('product'))
                    .append(med)
                    .append(
                      $("<div class='prices-block'>").append(
                        $('<span>')
                          .html(product.price)
                          .addClass('product-price')
                      )
                    )
                )
            )
            .appendTo(ul);
        }
      }
    },
  });
  jQuery.ui.autocomplete.prototype._resizeMenu = function () {
    const ul = this.menu.element;
    ul.outerWidth(this.element.outerWidth());
  };
  $searchBox.psBlockSearchAutocomplete({
    delay: 600,
    minLength: 2,
    source: function (query, response) {
      $searchSubmit.find('.search-icon-in').hide();
      $searchSubmit.find('.searching').show();
      $.post(
        searchURL,
        {
          s: query.term,
          resultsPerPage: 10,
        },
        null,
        'json'
      )
        .done(function (resp) {
          response(resp.products);
        })
        .fail(response)
        .always(function () {
          $searchSubmit.find('.search-icon-in').show();
          $searchSubmit.find('.searching').hide();
        });
    },
    select: function (event, ui) {
      const url = ui.item.url;
      window.location.href = url;
    },
  });
});

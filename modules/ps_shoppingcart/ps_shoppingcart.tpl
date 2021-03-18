{**
 * 2007-2017 PrestaShop
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Academic Free License 3.0 (AFL-3.0)
 * that is bundled with this package in the file LICENSE.txt.
 * It is also available through the world-wide-web at this URL:
 * https://opensource.org/licenses/AFL-3.0
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@prestashop.com so we can send you a copy immediately.
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade PrestaShop to newer
 * versions in the future. If you wish to customize PrestaShop for your
 * needs please refer to http://www.prestashop.com for more information.
 *
 * @author    PrestaShop SA <contact@prestashop.com>
 * @copyright 2007-2017 PrestaShop SA
 * @license   https://opensource.org/licenses/AFL-3.0 Academic Free License 3.0 (AFL-3.0)
 * International Registered Trademark & Property of PrestaShop SA
 *}
<div id="_desktop_cart">
  <div class="blockcart cart-preview js-sidebar-cart-trigger {if $cart.products_count > 0}active{else}inactive{/if}" data-refresh-url="{$refresh_url}">
    <div class="header">
        <a class="blockcart-link" rel="nofollow" href="{$cart_url}">
          <!--<svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 512 640" x="0px" y="0px"><title>Bolsa de Compras</title><path d="M408.5,135H339V96.264a80.5,80.5,0,1,0-161,0V135H103.505A11.33,11.33,0,0,0,92,146.7V443.581A52.094,52.094,0,0,0,144.17,496H367.83A52.094,52.094,0,0,0,420,443.581V146.7A11.33,11.33,0,0,0,408.5,135ZM202,96.264a56.5,56.5,0,1,1,113,0V135H202ZM396,443.581A28.069,28.069,0,0,1,367.83,472H144.17A28.069,28.069,0,0,1,116,443.581V159h62v96h24V159H315v96h24V159h57Z"/></svg>-->
          <i class="material-icons">shopping_bag</i>
          <div class="cart-products-block">
              <span class="cart-products-count">{$cart.products_count}{l s=' items' d='Shop.Theme.Checkout'}</span>
          <span class="cart-products-text">{l s='Shopping Cart' d='Shop.Theme.Checkout'}</span>
          </div>
        </a>
        
    </div>
    <div class="cart-dropdown js-cart-source hidden-xs-up">
      <div class="cart-dropdown-wrapper">
        <div class="cart-title">
          <h4 class="text-center">{l s='Shopping Cart' d='Shop.Theme.Checkout'}</h4>
        </div>
        {if $cart.products}
          <ul class="cart-items">
            {foreach from=$cart.products item=product}
              <li class="cart-product-line">{include 'module:ps_shoppingcart/ps_shoppingcart-product-line.tpl' product=$product}</li>
            {/foreach}
          </ul>
          <div class="cart-bottom">
            <div class="cart-subtotals">
              {foreach from=$cart.subtotals item="subtotal"}
                {if $subtotal}
                <div class="total-line {$subtotal.type}">
                  <span class="label">{$subtotal.label}</span>
                  <span class="value price">{$subtotal.value}</span>
                </div>
                {/if}
              {/foreach}
            </div>
            <hr>
            <div class="cart-total total-line">
              <span class="label">{$cart.totals.total.label}</span>
              <span class="value price price-total">{$cart.totals.total.value}</span>
            </div>
              
            <div class="cart-summary-line cart-total">
                <span class="label">{$cart.totals.total_including_tax.label}</span>
                <span class="value">{$cart.totals.total_including_tax.value}</span>
            </div>
              
            <div class="cart-action">
              <div class="text-center">
                <a href="{$cart_url}" class="btn btn-primary">{l s='Proceed to checkout' d='Shop.Theme.Actions'}<i class="caret-right"></i></a>
              </div>
            </div>
          </div>
        {else}
          <div class="no-items">
            {l s='There are no more items in your cart' d='Shop.Theme.Checkout'}
          </div>
        {/if}
      </div>
    </div>

  </div>
</div>

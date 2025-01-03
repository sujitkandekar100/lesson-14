import {cart, removeFromCart, updateQuantity} from '../data/cart.js';
import {products} from '../data/products.js';
import {formatCurrency} from './utils/money.js';

let cartSummaryHTML = '';

cart.forEach((cartItem) => {
  const productId = cartItem.productId;

  let matchingProduct;

  products.forEach((product) => {
    if (product.id === productId) {
      matchingProduct = product;
    }
  });

  cartSummaryHTML += `
    <div class="cart-item-container
      js-cart-item-container-${matchingProduct.id}">
      <div class="delivery-date">
        Delivery date: Tuesday, June 21
      </div>

      <div class="cart-item-details-grid">
        <img class="product-image"
          src="${matchingProduct.image}">

        <div class="cart-item-details">
          <div class="product-name">
            ${matchingProduct.name}
          </div>
          <div class="product-price">
            $${formatCurrency(matchingProduct.priceCents)}
          </div>
          <div class="product-quantity">
            <span>
              Quantity: <span class="quantity-label">${cartItem.quantity}</span>
            </span>
            <span class="update-quantity-link js-update-link link-primary js-update-${matchingProduct.id}" data-product-id="${matchingProduct.id}">
              Update
            </span>
            <span>
            <input class="js-quantity-input-${matchingProduct.id} link-primary is-save-quantity  "/>
            <span class=" js-save-link save-quantity-link link-primary is-save-quantity js-quantity-save-${matchingProduct.id} " data-product-id="${matchingProduct.id}">Save</span>
            </span>
            <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
              Delete
            </span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>
          <div class="delivery-option">
            <input type="radio" checked
              class="delivery-option-input"
              name="delivery-option-${matchingProduct.id}">
            <div>
              <div class="delivery-option-date">
                Tuesday, June 21
              </div>
              <div class="delivery-option-price">
                FREE Shipping
              </div>
            </div>
          </div>
          <div class="delivery-option">
            <input type="radio"
              class="delivery-option-input"
              name="delivery-option-${matchingProduct.id}">
            <div>
              <div class="delivery-option-date">
                Wednesday, June 15
              </div>
              <div class="delivery-option-price">
                $4.99 - Shipping
              </div>
            </div>
          </div>
          <div class="delivery-option">
            <input type="radio"
              class="delivery-option-input"
              name="delivery-option-${matchingProduct.id}">
            <div>
              <div class="delivery-option-date">
                Monday, June 13
              </div>
              <div class="delivery-option-price">
                $9.99 - Shipping
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
});

document.querySelector('.js-order-summary')
  .innerHTML = cartSummaryHTML;
  document.querySelector('.js-item-count').innerHTML=`${cart.length} items`;
document.querySelectorAll('.js-delete-link')
  .forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      removeFromCart(productId);
      document.querySelector('.js-item-count').innerHTML=`${cart.length} items`;
      const container = document.querySelector(
        `.js-cart-item-container-${productId}`
      );
      container.remove();
      
    });
  });

  document.querySelectorAll('.js-update-link')
  .forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      console.log(productId);

      const container = document.querySelector(
        `.js-cart-item-container-${productId}`
      );
      const inputText=document.querySelector(`.js-quantity-input-${productId}`);
      inputText.classList.remove('is-save-quantity');
      const saveText=document.querySelector(`.js-quantity-save-${productId}`);
      saveText.classList.remove('is-save-quantity');
      container.classList.add('is-editing-quantity');
      const updateButton=document.querySelector(`.js-update-${productId}`);
      updateButton.classList.add('is-save-quantity');
    });
  });

  document.querySelectorAll('.js-save-link')
  .forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      console.log(productId);

      const container = document.querySelector(
        `.js-cart-item-container-${productId}`
      );
      container.classList.add('is-editing-quantity');
      const inputText=document.querySelector(`.js-quantity-input-${productId}`);
      let inputValue=Number(inputText.value);
      console.log(inputValue);
      updateQuantity(productId,inputValue);
      inputText.classList.add('is-save-quantity');
      const saveText=document.querySelector(`.js-quantity-save-${productId}`);
      saveText.classList.add('is-save-quantity');
      const updateButton=document.querySelector(`.js-update-${productId}`);
      updateButton.classList.remove('is-save-quantity');
    });
  });
  
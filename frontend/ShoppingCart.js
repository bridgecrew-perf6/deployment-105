class ShoppingCart {

  orderRows = [];

  add(quantity, product) {

    // check if the product alread is in the cart
    let found = false;
    for (let orderRow of this.orderRows) {
      if (orderRow.product === product) {
        // add quantity
        orderRow.quantity += quantity;
        found = true;
      }
    }

    // if the product wasn't in the cart already
    if (!found) {
      // Add a new order row
      this.orderRows.push({
        quantity,
        product
      });
    }

    // for now render the shopping cart to the footer
    document.querySelector('footer').innerHTML =
      this.render();
  }

  formatSEK(number) {
    return new Intl.NumberFormat(
      'sv-SE',
      { style: 'currency', currency: 'SEK' }
    ).format(number);
  }

  render() {
    // create a html table where we display
    // the order rows of the shopping cart
    let html = '<div class="shoppingCart"><table>';
    let totalSum = 0;
    for (let orderRow of this.orderRows) {
      let rowSum =
        orderRow.quantity * orderRow.product.price;
      html += `
        <tr>
          <td>${orderRow.quantity}</td>
          <td>${orderRow.product.name}</td>
          <td>à ${this.formatSEK(orderRow.product.price)}</td>
          <td>${this.formatSEK(rowSum)}</td>
        </tr>
      `;
      totalSum += rowSum;
    }
    // add the totalSum
    html += `<tr>
      <td colspan="3">Total:</td>
      <td>${this.formatSEK(totalSum)}</td>
    </tr>`;
    html += '</table><button class="closeCart">X</button>';
    html += '<button class="checkout">Checkout</button></div>'
    return html;
  }

  async checkout() {

    let reqBody = [];
    for (let orderRow of this.orderRows) {
      reqBody.push({
        quantity: orderRow.quantity,
        productId: orderRow.product.id
      });
    }

    // Place the order by call /api/place-my-order
    await (await fetch('/api/place-my-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reqBody)
    })).json();

    // Empty the cart
    this.orderRows = [];
    document.querySelector('footer').innerHTML =
      this.render();
    alert('Thank you for your order!');
  }

}
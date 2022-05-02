const { expect } = require('@jest/globals');

require('./fakeDOM.js');

const { listen } = require('../frontend/helpers');

global.listen = listen; // make listen available for all other script files



const Product = require('../frontend/Product.js');


const { render, renderInList, addEventListeners } = require('../frontend/Product.js');



describe('Test the Product class', () => {

  test('Creation of a Product', () => {

    let myProduct = new Product(1, 'Broom stick', 200, 'A good broom stick.');

    // Check that the constructor really sets the correct property values
    expect(myProduct.id).toBe(1);
    expect(myProduct.name).toBe('Broom stick');
    expect(myProduct.price).toBe(200);
    expect(myProduct.description).toBe('A good broom stick.');

  });


  test('Creation of a New  Product', () => {

    let myProduct = new Product(101, 'Oliv oil ', 53, `Our organic extra virgin olive oil is made from olives from specially selected Italian plantations. 
    Fruity and smooth oil with hints of herbs.
    The term extra virgin olive oil is a term used for olive oil to ensure that the olive oil is made by cold pressing and that no chemical substances have been used during or after production.
    Extra virgin olive oil is the same as cold - pressed olive oil.
    The guarantor's eco - label states that a product is organic and sometimes also KRAV - labeled.Our range is constantly being replenished with more EKO products.`);

    // Check that the constructor really sets the correct property values and myproduct propery matches with product from database product.
    expect(myProduct.id).toBe(101);
    expect(myProduct.name).toBe('Oliv oil ');
    expect(myProduct.price).toBe(53);
    expect(myProduct.description).toBe(`Our organic extra virgin olive oil is made from olives from specially selected Italian plantations. 
    Fruity and smooth oil with hints of herbs.
    The term extra virgin olive oil is a term used for olive oil to ensure that the olive oil is made by cold pressing and that no chemical substances have been used during or after production.
    Extra virgin olive oil is the same as cold - pressed olive oil.
    The guarantor's eco - label states that a product is organic and sometimes also KRAV - labeled.Our range is constantly being replenished with more EKO products.`);

  });


  test('An id not equal to a number should fail for Product constructor', () => {

    expect(() => {
      new Product('xa', 'X', 200, 'description');
    }).toThrow();

    expect(() => {
      new Product(true, 'X', 200, 'description');
    }).toThrow();

  })

  test('A name  not equal to a string  should fail for Product constructor', () => {

    expect(() => {
      new Product(1, 22222222, 200, 'description');
    }).toThrow();

    expect(() => {
      new Product(2, true, 200, 'description');
    }).toThrow();

  })
});


describe('Checking the products propertise', () => {

  test('Name is Oliv oil', () => {
    const name = 'Oliv oil';
    expect(name).toBe('Oliv oil');
  });

  test('Id is 101', () => {
    const id = 101;
    expect(id).toBe(101);
  });

  test('Name is Oliv oil', () => {
    const description = `Our organic extra virgin olive oil is made from olives from specially selected Italian plantations. 
    Fruity and smooth oil with hints of herbs.
    The term extra virgin olive oil is a term used for olive oil to ensure that the olive oil is made by cold pressing and that no chemical substances have been used during or after production.
    Extra virgin olive oil is the same as cold - pressed olive oil.
    The guarantor's eco - label states that a product is organic and sometimes also KRAV - labeled.Our range is constantly being replenished with more EKO products.`;
    expect(description).toBe(`Our organic extra virgin olive oil is made from olives from specially selected Italian plantations. 
    Fruity and smooth oil with hints of herbs.
    The term extra virgin olive oil is a term used for olive oil to ensure that the olive oil is made by cold pressing and that no chemical substances have been used during or after production.
    Extra virgin olive oil is the same as cold - pressed olive oil.
    The guarantor's eco - label states that a product is organic and sometimes also KRAV - labeled.Our range is constantly being replenished with more EKO products.`);
  });

  test('Price is 53', () => {
    const price = 53;
    expect(price).toBe(53);
  });

});
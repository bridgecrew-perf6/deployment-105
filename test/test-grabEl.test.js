require('./fakeDOM.js');

const { grabEl, grabEls } = require('../frontend/helpers');

// Note replaceAll not working in Node 14 - a fairly new String method in JS
// mock it if it does not exist
String.prototype.replaceAll = String.prototype.replaceAll || function(x,y){
  return this.split(x).join(y);
}

describe('Test grabEl', () => {

  test('grabEL function exists', () => {
    expect(grabEl).toBeDefined();
  });

  test('Get the content of header tag is correct', () => {

    let content = grabEl('header').innerHTML.trim();

    expect(content.replaceAll(' ', '')).toBe(`<h1>Our grocery shop</h1>
    <div class="navButtons">
  <button class="showCart">Show cart</button>
  <button class="login">Login</button>
  <button class="register">Register</button>
  <button class="logout">Logout</button>
    </div>`.replaceAll(' ', ''));
  });

})
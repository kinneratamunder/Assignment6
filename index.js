const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3010;

let cart = [
  { productId: 1, name: 'Laptop', price: 50000, quantity: 1 },
  { productId: 2, name: 'Mobile', price: 20000, quantity: 2 },
];

function addToCart(cart, productId, name, price, quantity) {
  cart.push({ productId, name, price, quantity });
  return cart;
}

app.get('/cart/add', (req, res) => {
  let productId = parseInt(req.query.productId);
  let name = req.query.name;
  let price = parseFloat(req.query.price);
  let quantity = parseInt(req.query.quantity);

  let cartItems = addToCart(cart, productId, name, price, quantity);

  res.json({ cartItems });
});

function updatedQuantity(cart, productId, quantity) {
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].productId === productId) {
      cart[i].quantity = quantity;
    }
  }
  return cart;
}

app.get('/cart/edit', (req, res) => {
  let productId = parseInt(req.query.productId);
  let quantity = parseInt(req.query.quantity);

  let cartItems = updatedQuantity(cart, productId, quantity);

  res.json({ cartItems });
});

function removeAnItem(item, productId) {
  return item.productId != productId;
}

app.get('/cart/delete', (req, res) => {
  let productId = parseInt(req.query.productId);

  let cartItems = cart.filter((item) => removeAnItem(item, productId));

  res.json({ cartItems });
});

app.get('/cart', (req, res) => {
  let cartItems = cart;

  res.json({ cartItems });
});

function totalQuantity(cart) {
  let sum = 0;

  for (let i = 0; i < cart.length; i++) {
    sum = sum + cart[i].quantity;
  }
  
  return sum;
}

app.get('/cart/total-quantity', (req, res) => {
  let total = totalQuantity(cart);

  res.json({ totalQuantity: total });
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

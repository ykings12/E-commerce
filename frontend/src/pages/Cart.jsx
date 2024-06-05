import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaTrash } from 'react-icons/fa';
import { addToCart, removeFromCart } from '../redux/features/cart/cartSlice';

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate('/login?redirect=/shipping');
  };

  return (
    <div className="container mx-auto mt-8">
      {cartItems.length === 0 ? (
        <div className="text-center">
          Your cart is Empty <Link to="/shop" className="text-pink-500">Go to Shop</Link>
        </div>
      ) : (
        <>
          <h1 className="font-semibold text-2xl mb-4">Shopping Cart</h1>

          <div className="grid grid-cols-2 gap-4">
            {cartItems.map((item) => (
              <div key={item._id} className="flex items-center bg-white p-4 rounded-lg shadow-md">
                <div className="w-20 h-20 mr-4">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded" />
                </div>
                <div className="flex-1">
                  <Link to={`/product/${item._id}`} className="text-pink-500 block font-semibold mb-1">
                    {item.name}
                  </Link>
                  <p className="text-gray-600 mb-1">{item.brand}</p>
                  <p className="text-black font-bold mb-2">$ {item.price}</p>
                  <select
                    className="w-full p-1 border rounded text-black"
                    value={item.qty}
                    onChange={(e) => addToCartHandler(item, Number(e.target.value))}
                  >
                    {[...Array(item.countInStock).keys()].map((x) => (
                      <option value={x + 1} key={x + 1}>{x + 1}</option>
                    ))}
                  </select>
                </div>
                <button className="text-red-500 ml-auto" onClick={() => removeFromCartHandler(item._id)}>
                  <FaTrash className="ml-2" />
                </button>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-gray-200 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">
              Items ({cartItems.reduce((acc, item) => acc + item.qty, 0)} items)
            </h2>
            <div className="text-2xl font-bold mb-4">
              Total: ₹ {cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
            </div>
            <div className="flex justify-center">
              <button
                className="bg-pink-500 py-2 px-4 text-lg text-white rounded-full"
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;

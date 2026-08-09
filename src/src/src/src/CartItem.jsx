import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const parseCost = (costString) => parseFloat(costString.replace('$', ''));

  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => total + parseCost(item.cost) * item.quantity, 0).toFixed(2);
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem({ name: item.name }));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem({ name: item.name }));
  };

  const calculateTotalCost = (item) => {
    return (parseCost(item.cost) * item.quantity).toFixed(2);
  };

  const handleCheckoutShopping = () => {
    alert('Próximamente');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Total Carrito: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div key={item.name} style={{ display: 'flex', gap: '20px', marginBottom: '15px', alignItems: 'center', borderBottom: '1px solid #ddd', paddingBottom: '10px' }}>
            <img src={item.image} alt={item.name} style={{ width: '80px', height: '80px', objectFit: 'cover' }} />
            <div>
              <h3>{item.name}</h3>
              <p>Precio Unitario: {item.cost}</p>
              <p>Subtotal: ${calculateTotalCost(item)}</p>
              <div>
                <button onClick={() => handleDecrement(item)}>-</button>
                <span style={{ margin: '0 10px' }}>{item.quantity}</span>
                <button onClick={() => handleIncrement(item)}>+</button>
              </div>
              <button onClick={() => handleRemove(item)} style={{ marginTop: '10px', backgroundColor: 'red', color: 'white', border: 'none', padding: '5px 10px' }}>
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px' }}>
        <button onClick={onContinueShopping} style={{ marginRight: '10px', padding: '10px 15px' }}>
          Continuar Comprando
        </button>
        <button onClick={handleCheckoutShopping} style={{ backgroundColor: '#4CAF50', color: 'white', border: 'none', padding: '10px 15px' }}>
          Próximamente
        </button>
      </div>
    </div>
  );
};

export default CartItem;

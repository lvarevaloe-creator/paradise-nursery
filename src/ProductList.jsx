import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';

function ProductList() {
  const [showCart, setShowCart] = useState(false);
  const [addedToCart, setAddedToCart] = useState({});
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);

  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  const plantsArray = [
    {
      category: "Air Purifying Plants",
      plants: [
        { name: "Snake Plant", image: "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg", description: "Produces oxygen at night.", cost: "$15" },
        { name: "Spider Plant", image: "https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg", description: "Easy to grow and maintain.", cost: "$12" },
        { name: "Boston Fern", image: "https://cdn.pixabay.com/photo/2020/04/30/19/52/boston-fern-5114414_1280.jpg", description: "Removes air pollutants.", cost: "$14" },
        { name: "Rubber Plant", image: "https://cdn.pixabay.com/photo/2020/02/15/11/49/plant-4850669_1280.jpg", description: "Purifies indoor air naturally.", cost: "$18" },
        { name: "English Ivy", image: "https://cdn.pixabay.com/photo/2017/09/08/18/36/ivy-2729657_1280.jpg", description: "Filters airborne particles.", cost: "$13" },
        { name: "Bamboo Palm", image: "https://cdn.pixabay.com/photo/2016/11/21/16/06/bamboo-1846162_1280.jpg", description: "Adds moisture to indoor air.", cost: "$20" }
      ]
    },
    {
      category: "Aromatic Fragrant Plants",
      plants: [
        { name: "Lavender", image: "https://cdn.pixabay.com/photo/2015/07/02/10/22/lavender-828841_1280.jpg", description: "Calming scent for relaxation.", cost: "$18" },
        { name: "Jasmine", image: "https://cdn.pixabay.com/photo/2017/08/10/03/05/jasmine-2617722_1280.jpg", description: "Sweet, intoxicating aroma.", cost: "$20" },
        { name: "Rosemary", image: "https://cdn.pixabay.com/photo/2016/01/26/18/16/rosemary-1163013_1280.jpg", description: "Aromatic herb for cooking and scent.", cost: "$15" },
        { name: "Mint", image: "https://cdn.pixabay.com/photo/2016/03/05/19/02/abstract-1238247_1280.jpg", description: "Refreshing and fragrant leaves.", cost: "$10" },
        { name: "Lemon Balm", image: "https://cdn.pixabay.com/photo/2017/07/18/18/24/lemon-balm-2516629_1280.jpg", description: "Pleasant citrusy aroma.", cost: "$12" },
        { name: "Eucalyptus", image: "https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832_1280.jpg", description: "Strong and invigorating scent.", cost: "$16" }
      ]
    },
    {
      category: "Low Maintenance Plants",
      plants: [
        { name: "Aloe Vera", image: "https://cdn.pixabay.com/photo/2018/04/02/07/42/aloe-vera-3283112_1280.jpg", description: "Soothing medicinal qualities.", cost: "$10" },
        { name: "Peace Lily", image: "https://cdn.pixabay.com/photo/2019/06/12/14/14/peace-lily-4269365_1280.jpg", description: "Thrives in shade.", cost: "$22" },
        { name: "ZZ Plant", image: "https://cdn.pixabay.com/photo/2021/01/29/14/39/zz-plant-5961233_1280.jpg", description: "Tolerates low light and neglect.", cost: "$25" },
        { name: "Pothos", image: "https://cdn.pixabay.com/photo/2020/05/10/11/41/houseplant-5153673_1280.jpg", description: "Extremely easy to care for.", cost: "$11" },
        { name: "Cast Iron Plant", image: "https://cdn.pixabay.com/photo/2017/08/07/14/02/houseplant-2604149_1280.jpg", description: "Nearly indestructible.", cost: "$19" },
        { name: "Succulent Mix", image: "https://cdn.pixabay.com/photo/2016/11/21/16/05/cacti-1846147_1280.jpg", description: "Requires minimal watering.", cost: "$14" }
      ]
    }
  ];

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
    setAddedToCart((prevState) => ({
      ...prevState,
      [plant.name]: true,
    }));
  };

  return (
    <div>
      <nav style={{ backgroundColor: '#4CAF50', padding: '15px', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Paradise Nursery</h2>
        <div style={{ display: 'flex', gap: '20px' }}>
          <button onClick={() => setShowCart(false)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', fontSize: '16px' }}>Inicio / Plantas</button>
          <button onClick={() => setShowCart(true)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', fontSize: '18px' }}>
            🛒 Carrito ({totalQuantity})
          </button>
        </div>
      </nav>

      {!showCart ? (
        <div style={{ padding: '20px' }}>
          {plantsArray.map((categoryObj, index) => (
            <div key={index}>
              <h2>{categoryObj.category}</h2>
              <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                {categoryObj.plants.map((plant, pIndex) => (
                  <div key={pIndex} style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px', width: '200px' }}>
                    <img src={plant.image} alt={plant.name} style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
                    <h3>{plant.name}</h3>
                    <p>{plant.description}</p>
                    <p><strong>{plant.cost}</strong></p>
                    <button
                      onClick={() => handleAddToCart(plant)}
                      disabled={addedToCart[plant.name]}
                      style={{ backgroundColor: addedToCart[plant.name] ? '#ccc' : '#4CAF50', color: 'white', border: 'none', padding: '8px 12px', cursor: addedToCart[plant.name] ? 'not-allowed' : 'pointer' }}
                    >
                      {addedToCart[plant.name] ? 'Añadido' : 'Agregar al Carrito'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <CartItem onContinueShopping={() => setShowCart(false)} />
      )}
    </div>
  );
}

export default ProductList;

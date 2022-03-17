import React, { useMemo, useCallback } from 'react';
import { usePizzaPicker } from '../../state/pizza-picker';

import './styles.css';

const Cart = () => {
    const { cart, removePizzaFromCart } = usePizzaPicker();
    const total = useMemo(() => {
        return cart.pizzas.reduce((sum, pizza) => sum + pizza.total, 0);
    }, [cart]);

    const onRemove = useCallback((index) => () => {
        removePizzaFromCart(index);
    }, [removePizzaFromCart]);

    return (
        <>
            <div className="cart-row">Pizzas in your cart:</div>
            {
                cart.pizzas.map((pizza, index) => (
                    <div>
                        <span>{pizza.size}</span>
                        - <span>{pizza.toppings.map((t => <i className="cart-topping">{t.topping.name}</i>))}</span>
                        - <span>${pizza.total.toFixed(2)}</span>
                        - <span><button onClick={onRemove(index)}>Remove</button></span>
                    </div>
                ))
            }
            <div className="cart-row">Your total is: {total.toFixed(2)}</div>
        </>
    );
};

export default Cart;
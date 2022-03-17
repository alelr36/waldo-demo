import React from 'react';
import { GetPizzaSizes_pizzaSizes as PizzaType } from '../../hooks/pizza/__generated__/GetPizzaSizes';
import './styles.css';

interface Props extends PizzaType {
    selected: boolean;
    onClick: (pizza: PizzaType) => () => void;
}

const Pizza = (props: Props) => {
    const { onClick, ...rest } = props;
    const {name, maxToppings, basePrice, selected} = rest;

    return <div onClick={onClick(rest)} className={`pizza ${selected && 'selected'}`}>
        <div>{name}</div>
        <div>Max Toppings: {maxToppings || 'No limit :)'}</div>
        <div>Base Price: {basePrice}</div>
    </div>
};

export default Pizza;
import React from 'react';
import { GetPizzaSizes_pizzaSizes_toppings as Topping } from '../../hooks/pizza/__generated__/GetPizzaSizes';

import './styles.css';

interface Props {
    availableToppings: Topping[];
    selectedToppings: Topping[];
    maxToppings: number;
    onChange: (topping: Topping) => () => void;
};

const ToppingsPicker = (props: Props) => {
    const { availableToppings, selectedToppings, maxToppings, onChange } = props;
    return (
        <div>
            Toppings: 
            {
                availableToppings.map(
                    ({ topping: { name, price } }: Topping, index) => {
                        const selected = selectedToppings.some((t: Topping) => t.topping.name === name);
                        const disabled = selectedToppings.length === maxToppings && !selected;
                        return (
                            <label
                                key={name}  
                                htmlFor={`topping-${name.split(' ').join('-')}`}
                                className={`topping ${disabled && 'disabled'}`}>
                                    <input
                                        onChange={onChange(availableToppings[index])}
                                        disabled={disabled}
                                        type="checkbox"
                                        checked={selected}
                                        value={name}
                                        id={`topping-${name.split(' ').join('-')}`}/>
                                    {name} - ${price.toFixed(2)}
                            </label>
                        );
                    }
                )
            }
        </div>
    );
};

export default ToppingsPicker;
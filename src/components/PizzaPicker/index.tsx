import React, { useCallback, useEffect, useMemo } from 'react';
import Pizza from '../Pizza';
import ToppingsPicker from '../ToppingsPicker';
import { usePizzaSizes } from '../../hooks/pizza';
import { GetPizzaSizes_pizzaSizes as PizzaType, GetPizzaSizes_pizzaSizes_toppings as ToppingType } from '../../hooks/pizza/__generated__/GetPizzaSizes';
import { usePizzaPicker } from '../../state/pizza-picker';

const PizzaPicker = () => {
    const { loading, error, data } = usePizzaSizes();
    const { selectedPizza, setSelectedPizza, setSelectedToppings, addPizzaToCart } = usePizzaPicker();

    useEffect(() => {
        if (data?.pizzaSizes.length && data.pizzaSizes[0]) {
            setSelectedPizza(data.pizzaSizes[0]);
        }
    }, [data, setSelectedPizza]);

    const toppings = useMemo(() => {
        if (data?.pizzaSizes.length) {
            // @ts-ignore
            return data.pizzaSizes.find((size: PizzaType) => size.name === selectedPizza.size)?.toppings || [];
        }
        else {
            return [];
        }
    }, [selectedPizza, data]);

    const maxToppings = useMemo(() => {
        if (data?.pizzaSizes.length) {
            // @ts-ignore
            return data.pizzaSizes.find((size: PizzaType) => size.name === selectedPizza.size)?.maxToppings || 0;
        }
        else {
            return 0;
        }
    }, [selectedPizza, data]);

    const onPizzaClick = useCallback((pizza: PizzaType) => () => {
        setSelectedPizza(pizza);
    }, [setSelectedPizza]);

    const onToppingChange = useCallback((topping: ToppingType) => () => {
        setSelectedToppings(topping);
    }, [setSelectedToppings]);

    const onAddPizzaToCart = useCallback(() => {
        addPizzaToCart(selectedPizza);
    }, [addPizzaToCart, selectedPizza]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>ERROR!</div>;
    }

    return (
        <div>
            {data?.pizzaSizes.map((size: PizzaType | null) => size && <Pizza key={size.name} {...size} selected={selectedPizza.size === size?.name} onClick={onPizzaClick} />)}
            <div>
                {/** @ts-ignore */}
                <ToppingsPicker availableToppings={toppings} selectedToppings={selectedPizza.toppings} maxToppings={maxToppings} onChange={onToppingChange} />
            </div>
            <div><strong>Partial total: {selectedPizza.total.toFixed(2)}</strong></div>
            <button onClick={onAddPizzaToCart}>Add to Cart</button>
        </div>
    );
};

export default PizzaPicker;
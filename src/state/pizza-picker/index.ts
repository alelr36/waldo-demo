import { makeVar, useReactiveVar } from '@apollo/client';
import { GetPizzaSizes_pizzaSizes as Pizza, GetPizzaSizes_pizzaSizes_toppings as Topping } from '../../hooks/pizza/__generated__/GetPizzaSizes';
import { PIZZA_SIZES } from '../../general-types';

interface SelectedPizza {
    size: PIZZA_SIZES;
    toppings: Topping[];
    total: number;
};

interface PizzaCart {
    pizzas: SelectedPizza[];
}

interface Hook {
    selectedPizza: SelectedPizza;
    cart: PizzaCart;
    setSelectedPizza: (pizza: Pizza) => void;
    setSelectedToppings: (topping: Topping) => void;
    addPizzaToCart: (pizza: SelectedPizza) => void;
    removePizzaFromCart: (index: number) => void;
};

const selectedPizzaVar = makeVar<SelectedPizza>({size: PIZZA_SIZES.small, toppings: [], total: 0});
const pizzaCartVar = makeVar<PizzaCart>({ pizzas: [] });

const setSelectedPizza = (pizza: Pizza): void => {
    const size = pizza.name as PIZZA_SIZES;
    //@ts-ignore
    const toppings = pizza.toppings.filter((topping: Topping): Topping[] => topping.defaultSelected);
    const total = pizza.basePrice + toppings.reduce((sum, t) => sum + (t ? t.topping.price : 0), 0);
    //@ts-ignore
    selectedPizzaVar({ size, toppings, total });
};

const setSelectedToppings = (topping: Topping) => {
    const pizza = selectedPizzaVar();
    const toppingExists = pizza.toppings.some((t: Topping) => t.topping.name === topping.topping.name);
    const toppings = toppingExists
        ? pizza.toppings.filter((t: Topping) => t.topping.name !== topping.topping.name)
        : [...pizza.toppings, topping];
    const total = toppingExists
        ? pizza.total - topping.topping.price
        : pizza.total + topping.topping.price;

    selectedPizzaVar({
        ...pizza,
        total,
        toppings,
    });
};

const addPizzaToCart = (pizza: SelectedPizza) => {
    const cart = pizzaCartVar();

    pizzaCartVar({pizzas: [...cart.pizzas, pizza]});
};

const removePizzaFromCart = (index: number) => {
    const cart = pizzaCartVar();

    const pizzas = cart.pizzas;

    pizzas.splice(index, 1);

    pizzaCartVar({pizzas: pizzas});
};

export const usePizzaPicker = (): Hook => {
    const selectedPizza = useReactiveVar(selectedPizzaVar);
    const cart = useReactiveVar(pizzaCartVar);

    return { selectedPizza, cart, setSelectedPizza, setSelectedToppings, addPizzaToCart, removePizzaFromCart };
};
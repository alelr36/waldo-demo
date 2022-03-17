/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetPizzaSizes
// ====================================================

export interface GetPizzaSizes_pizzaSizes_toppings_topping {
  __typename: "topping";
  /**
   * The name of the topping
   */
  name: string;
  /**
   * How much this topping costs
   */
  price: number;
}

export interface GetPizzaSizes_pizzaSizes_toppings {
  __typename: "pizzaToppingConnection";
  /**
   * whether or not this topping should be selected by default for this pizza
   */
  defaultSelected: boolean;
  /**
   * The topping
   */
  topping: GetPizzaSizes_pizzaSizes_toppings_topping;
}

export interface GetPizzaSizes_pizzaSizes {
  __typename: "pizzaSize";
  /**
   * The size of the pizza
   */
  name: string;
  /**
   * Max number of allowable toppings.
   */
  maxToppings: number | null;
  /**
   * Base price of the pie - sans toppings
   */
  basePrice: number;
  /**
   * Toppings allowed on this pizza, and whether or not they're default selected
   */
  toppings: (GetPizzaSizes_pizzaSizes_toppings | null)[];
}

export interface GetPizzaSizes {
  /**
   * All available pizza sizes
   */
  pizzaSizes: (GetPizzaSizes_pizzaSizes | null)[];
}

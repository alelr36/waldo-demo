import { gql, useQuery, QueryResult } from '@apollo/client';
import { GetPizzaSizes as Query } from './__generated__/GetPizzaSizes';

const SIZES_QUERY = gql`
    query GetPizzaSizes {
        pizzaSizes {
            name
            maxToppings
            basePrice
            toppings {
                defaultSelected
                topping {
                    name
                    price
                }
            }
        }
    }
`;

export const usePizzaSizes = (): QueryResult<Query> => {
    return useQuery(SIZES_QUERY, {
        fetchPolicy: 'network-only',
    });
}
import { gql } from "apollo-boost";

export const GET_DATA = gql`
    query {
        data {
            id
            name
            email
            password
        }
    }
`;
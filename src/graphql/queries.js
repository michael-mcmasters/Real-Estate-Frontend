/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getLead = /* GraphQL */ `
  query GetLead($id: ID!) {
    getLead(id: $id) {
      id
      firstName
      lastName
      phone
      email
      house
      createdAt
      updatedAt
    }
  }
`;
export const listLeads = /* GraphQL */ `
  query ListLeads(
    $filter: ModelLeadFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listLeads(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        firstName
        lastName
        phone
        email
        house
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;

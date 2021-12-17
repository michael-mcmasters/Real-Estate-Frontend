/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createLead = /* GraphQL */ `
  mutation CreateLead(
    $input: CreateLeadInput!
    $condition: ModelLeadConditionInput
  ) {
    createLead(input: $input, condition: $condition) {
      id
      firstName
      lastName
      phone
      email
      createdAt
      updatedAt
    }
  }
`;
export const updateLead = /* GraphQL */ `
  mutation UpdateLead(
    $input: UpdateLeadInput!
    $condition: ModelLeadConditionInput
  ) {
    updateLead(input: $input, condition: $condition) {
      id
      firstName
      lastName
      phone
      email
      createdAt
      updatedAt
    }
  }
`;
export const deleteLead = /* GraphQL */ `
  mutation DeleteLead(
    $input: DeleteLeadInput!
    $condition: ModelLeadConditionInput
  ) {
    deleteLead(input: $input, condition: $condition) {
      id
      firstName
      lastName
      phone
      email
      createdAt
      updatedAt
    }
  }
`;

export const CreateUserValidation = {
  type: 'object',
  properties: {
    email: { type: 'string' },
    firstName: { type: 'string' },
    lastName: { type: 'string' },
  },
  required: ['email', 'firstName', 'lastName'],
  additionalProperties: false,
  errorMessage: {
    type: 'should be an object', // will not replace internal "type" error for the property "foo"
    required: {
      firstName: 'should have an integer property "foo"',
      lastName: 'should have a string property "bar"',
    },
  },
};

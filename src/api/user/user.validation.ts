export const UserValidation = {
  createUser: {
    body: {
      type: 'object',
      properties: {
        email: { type: 'string' },
        firstName: { type: 'string' },
        lastName: { type: 'string' },
      },
      required: ['email', 'firstName', 'lastName'],
      additionalProperties: false,
      errorMessage: {
        type: 'requiredObject', // will not replace internal "type" error for the property "foo"
        required: {
          firstName: 'should have an integer property "foo"',
          lastName: 'should have a string property "bar"',
        },
      },
    },
  },
};

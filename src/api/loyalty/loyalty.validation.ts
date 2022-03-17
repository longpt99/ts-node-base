export const LoyaltyValidation = {
  create: {
    body: {
      type: 'object',
      properties: {
        point: { type: 'number' },
        firstName: { type: 'string' },
        lastName: { type: 'string' },
      },
      required: ['point'],
      additionalProperties: false,
      errorMessage: {
        type: 'should be an object', // will not replace internal "type" error for the property "foo"
        required: {
          point: 'pointRequired',
        },
      },
    },
  },
};

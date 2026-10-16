
export const schemeValidation = {
  password: {
    min: 6,
    max: 20,
    key: 'password',
    type: 'string',
  },
  email: {
    regex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    type: 'string',
    key: 'email',

  },
  confirmPassword: {
    key: 'confirmPassword',
    type: 'string',
    min: 6,
    max: 20,
  },

}
const number = {
  regex: /^-?\d*\.?\d+$/,
  text: 'Only decimal numbers are allowed',
};
export default {
  address: {
    regex: /^(?!\s)[A-Za-z0-9\s]+$/,
    text: 'Please enter your valid address',
  },
  zipcode: {
    regex: /^\d{6}[-\s]?(?:\d{4})?$/,
    text: 'Please enter your ZipCode as Placeholder',
  },
  insurancenumber: {
    regex: /^-?\d*\.?\d+$/,
    text: 'Please enter your Insurance Policy Number as Placeholder',
  },
  insuranceadjuster: {
    regex: /^(?!\s)[A-Za-z0-9\s]+$/,
    text: 'Please enter your Insurance Adjuster as Placeholder',
  },
  tel: {
    regex: /^\(?([0-9]{4})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
    text: 'Please enter your tel as Placeholder',
  },
  fax: {
    regex: /[\+? *[1-9]+]?[0-9 ]+/,
    text: 'Please enter your fax as Placeholder',
  },
  password: {
    regex: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{7,20}$/,
    text: 'At least one lowercase, one uppercase, one digit and [8-20] long',
  },
  date: {
    regex: /^(0[1-9]|[12][0-9]|3[01])[- /.]/,
    text: 'Match a date in dd-mm-yyyy format',
  },
  description: {
    regex: /^/,
    text: 'Fill description.',
  },
  title: {
    regex: /^/,
    text: 'Write the note title.',
  },
  ssn: {
    regex: /^([0-9][0-9][0-9]|[0-9][0-9]|3[01])[- /.]/,
    text: 'Match a SSN in XXX-XX-XXXX format',
  },
  citystate: {
    regex: /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/,
    text: 'Provide City, State Format',
  },
  username: {
    regex: /^[a-zA-Z0-9]{5,}$/,
    text: 'The username should be at least 5 alphanumeric',
  },
  fullname: {
    // regex: /^\w{3,}(?:(?:,\s\w+)+|(?:\s\w{2,})+)$/,
    regex: /^([a-zA-Z]+[’'-.]?[a-zA-Z]+[ ]?)+$/,
    text: 'Provide your space-separated family and last name',
  },
  profilename: {
    // regex: /^\w{3,}(?:(?:,\s\w+)+|(?:\s\w{2,})+)$/,
    regex: /^([a-zA-Z]+[’'-.]?[a-zA-Z]+[ ]?)+$/,
    text: 'Provide your space-separated account name',
  },
  email: {
    // regex: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
    regex: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
    text: 'Provide your valid email',
  },
  answer: {
    regex: /^-?\d*\.?\d+$/,
    text: 'Only decimal numbers are allowed',
  },
  verify: {
    text: 'Should match the provided password',
  },
  answer: number,
  code: {
    regex: /^[0-9]{4}$/,
    text: '4 digit decimal numbers are allowed',
  },
  default: number,
};

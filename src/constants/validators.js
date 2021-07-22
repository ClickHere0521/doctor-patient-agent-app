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
    regex: /^-?\d*\.?\d+$/,
    text: 'Please enter your valid ZipCode',
  },
  insurancenumber: {
    regex: /^-?\d*\.?\d+$/,
    text: 'Please enter your valid Insurance Policy Number',
  },
  insuranceadjuster: {
    regex: /^(?!\s)[A-Za-z0-9\s]+$/,
    text: 'Please enter your valid Insurance Adjuster',
  },
  tel: {
    regex: /^\(\d{3}\)\s?\d{3}-\d{4}$/,
    text: 'Please enter your valid telephone number',
  },
  fax: {
    regex: /[\+? *[1-9]+]?[0-9 ]+/,
    text: 'Please enter your valid fax',
  },
  password: {
    regex: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{7,20}$/,
    text: 'At least one lowercase, one uppercase, one digit and [8-20] long',
  },
  date: {
    regex: /^((0?[1-9]|1[012])[- /.](0?[1-9]|[12][0-9]|3[01])[- /.](19|20)?[0-9]{2})*$/,
    text: 'Match a date in mm/dd/yyyy format',
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
    regex: /^/,
    text: '',
  },
  citystate: {
    regex: /^/,
    text: '',
  },
  username: {
    regex: /^/,
    text: 'The username should be at least 5 alphanumeric',
  },
  fullname: {
    regex: /^([a-zA-Z]+[’'-.]?[a-zA-Z]+[ ]?)+$/,
    text: 'Please enter a space-separated family and last name',
  },
  profilename: {
    regex: /^([a-zA-Z]+[’'-.]?[a-zA-Z]+[ ]?)+$/,
    text: 'Please enter a space-separated account name',
  },
  email: {
    // regex: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
    regex: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    text: 'Please enter your valid email',
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

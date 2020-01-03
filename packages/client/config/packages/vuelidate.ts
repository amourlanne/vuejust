import { templates } from 'vuelidate-error-extractor';

export default {
  template: templates.singleErrorExtractor.foundation6, // you can also pass your own custom template
  messages: { required: 'The {attribute} field is required' }, // error messages to use
  attributes: {
    // maps form keys to actual field names
    email: 'Email',
    first_name: 'First name',
    last_name: 'Last name',
  },
};

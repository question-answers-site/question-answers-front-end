/* eslint-disable */
import { required, email, max } from "vee-validate/dist/rules";
import { extend } from "vee-validate";

extend("name", {
  validate(value, args) {
    //let startsWith=value.match;
    return    isNaN(parseInt(value[0], 10))
    // return  value=== args.name;
  },
  message: "The name should not start with number"
});
extend("name2", {
  validate(value, args) {
    var format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

    //let startsWith=value.match;
    return    !format.test(value)
    // return  value=== args.name;
  },
  message: "The name should not contain special characters"
});

extend("required", {
  ...required,
  message: "This field is required"
});

extend("max", {
  ...max,
  message: "This field must be {length} characters or less"
});

extend("email", {
  ...email,
  message: "This field must be a valid email"
});
extend("confirmed", {
  validate(value, args) {
    return  value=== args.password;
  },
  params: ['password'],
  message: "This field confirmation does not match"
});
extend('min', {
  validate(value, args) {
    const length = value.length;

    return length >= args.min;
  },
  params: ['min'],
  message: "password length should be at least 10"
});

extend('upCase', {
  validate: value => value.match(/[A-Z]/g) !== null,
  message: "password must contain capital letter"
})
extend('number', {
  message: "password must contain number",
  validate: value => value.match(/[0-9]/g) !== null
})


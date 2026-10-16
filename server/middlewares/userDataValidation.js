import { schemeValidation } from "../validation/authValidationSchema.js";
import { getErrorReq } from "../utils/responseHelpers.js";



const isValid = (data, type, value) => {


  switch (type) {
    case "min":
      return data.length < value;

    case "max":
      return data.length > value; 

    case "type":
      return typeof data !== value; 
    case "regex":
      return !value.test(data); 

    default:
      return false; 
  }
};

export const authValidate = (req, res, next) => {
  const fieldsToValidate = Object.keys(req.body);
  const validateRulesArr = fieldsToValidate.map((key) => schemeValidation[key]);

  if (validateRulesArr.includes(undefined)) {
    return res.status(400).json(getErrorReq('data is not valid!'));
  }

  const hasErrors = checkData(req.body, validateRulesArr);

  if (hasErrors) {
    return res.status(400).json(getErrorReq('data is not valid!'));
  }

  next();
};

const checkData = (items, scheme) => {
  
  if (items.confirmPassword && items.confirmPassword !== items.password) {
    return true; 
  }
 
  const hasErrors = scheme.some((valid) => {
    const data = items[valid.key];
    const validArr = Object.keys(valid);

    return validArr.some((type) => {
      if (type === 'key') return false; 

      return isValid(data, type, valid[type]);
    });
  });

  return hasErrors;
};

// import * as Yup from "yup";

// const schema = Yup.object().shape({
//   email: Yup.string()
//     .email("Wrong Email")
//     .required("Required"),
//   password: Yup.string()
//     .min(6, "Password must be at least 6 characters")
//     .max(20, "Password cannot exceed 20 characters")
//     .required("Password is required"),
//   confirmPassword: Yup.string()
//     .oneOf([Yup.ref('password')], 'Passwords must match')
//     .required('Confirm password is required'),
// });






// const isValid = (data, type, value) => {
  
//   if (data === undefined || data === null) return true;
//   switch (type) {
//     case "min": return data?.length < value;

//     case "max": return data?.length > value;

//     case "type": return typeof data !== value;

//     case "todoStatus": return !value.includes(data)
      
      
//     default:
//       return false;
//   }

 
// }
// const checkData = (item, validations) => {
//   // validations = shemeValidation

//   const isResult = validations.some((valid) => { // { type: 'string',min: 1, max: 100, key : 'text' },
    
  
//     const data = item[valid.key];// hello
   
//     const validArr = Object.keys(valid) //[type, min, max, key];
//     const is = validArr.some((type) => { // type = type, min, max, key
//       const isRes = isValid(data, type, valid[type])
//       // const isRes = isValid(hello, min, valid[min])
//       // const isRes = isValid(hello, min, 1)
//       return isRes
//     })
//     return is;
//   })

//   return isResult

// }

// export const validate = (req, res, next) => {
//   const keysToValidate = Object.keys(req.body);
//   const schemaArr = keysToValidate.map((key) => shemeValidation[key])
//   if (schemaArr.includes(undefined)) return res.status(500).json({ data: null, e: 'data is not valid!' });

//   const hasErrors = checkData(req.body, schemaArr);
//   if (hasErrors) return res.status(500).json({ data: null, e: 'data is not valid!' });
//   next();
// }
// // [shemeValidation.text, shemeValidation.isDone, shemeValidation.status]


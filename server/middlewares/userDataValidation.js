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







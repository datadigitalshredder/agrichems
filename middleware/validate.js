// Node js validating data: https://blog.logrocket.com/handle-data-validation-node-js-validatorjs/

const validator = require('../helpers/validate');

const saveChem = (req, res, next) => {
  const validationRule = {
    pesticideGroup: 'required|string',
    tradeName: 'string',
    pesticideType: 'required|string',
    activeIngredient: 'required|string',
    formulationType: 'required|string',
    registrationNumber: 'required|string|min:5',
    description: 'required|string',
    price: 'required|string',
    supplier: 'string',
    targetCrops: 'required|string',
    targetPests: 'required|string'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

module.exports = {
  saveChem
};
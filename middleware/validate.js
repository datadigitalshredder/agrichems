// Node js validating data: https://blog.logrocket.com/handle-data-validation-node-js-validatorjs/

const validator = require('../helpers/validate');

const saveChem = (req, res, next) => {
  const validationRule = {
    user: {
      name: 'required|string',
      profession: 'required|string',
      location: 'required|string'
    },
    pesticideGroup: 'required|string',
    tradeName: 'string',
    pesticideType: 'required|string',
    activeIngredient: 'required|string',
    formulationType: 'required|string',
    registrationNumber: 'required|string|min:5|strict',
    description: 'required|string',
    price: 'required|string',
    supplier: 'string',
    targetCrops: 'required|string',
    targetPests: 'required|string',
    base64PestImage: 'string',
    base64PestImage2: 'string',
    base64PestImage3: 'string'
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
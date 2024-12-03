const Company = require('../models/companyModel');

exports.getAllCompanies = async () => Company.find();

exports.addCompany = async (data) => {
  const company = new Company(data);
  return company.save();
};

import { CompanyModel } from "../models";

export function getLatest3Companies() {
  return CompanyModel.find({}).limit(3).sort({ createdAt: -1 }).exec();
}

export function deleteACompany(id: string) {
  return CompanyModel.findByIdAndDelete(id).exec();
}

export function getCompanyById(id: string) {
  return CompanyModel.findById(id).exec();
}

export function getAllCompanies() {
  return CompanyModel.find({}).exec();
}

export function updateCompany(id: string, data: unknown) {
  return CompanyModel.updateOne({ _id: id }, data).exec();
}

export function createCompany(data: unknown) {
  return CompanyModel.create(data);
}

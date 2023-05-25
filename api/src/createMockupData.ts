import { connectToDb } from "./utils/db";
import { CompanyModel, ProductModel } from "./models";

const company1 = {
  company_name: "Apple",
  incorporation_country: "USA",
  website: "https://www.apple.com",
};

const company2 = {
  company_name: "Microsoft",
  incorporation_country: "USA",
  website: "https://www.microsoft.com",
};

const company3 = {
  company_name: "Dyson",
  incorporation_country: "UK",
  website: "https://www.dyson.com",
};

const company4 = {
  company_name: "Samsung",
  incorporation_country: "South Korea",
  website: "https://www.samsung.com",
};

const product1 = {
  product_name: "iPhone 12",
  product_category: "Smartphone",
  product_amount: 100,
  amount_unit: "pcs",
};

const product2 = {
  product_name: "MacBook Pro",
  product_category: "Laptop",
  product_amount: 50,
  amount_unit: "pcs",
};

const product3 = {
  product_name: "Galaxy S21",
  product_category: "Smartphone",
  product_amount: 100,
  amount_unit: "pcs",
};

const product4 = {
  product_name: "Galaxy Book",
  product_category: "Laptop",
  product_amount: 50,
  amount_unit: "pcs",
};

const product5 = {
  product_name: "Dyson V11",
  product_category: "Vacuum",
  product_amount: 100,
  amount_unit: "pcs",
};

const product6 = {
  product_name: "Surface Pro",
  product_category: "Laptop",
  product_amount: 50,
  amount_unit: "pcs",
};

const createMockupData = async () => {
  try {
    await connectToDb();

    const company1Doc = await CompanyModel.create(company1);
    const company2Doc = await CompanyModel.create(company2);
    const company3Doc = await CompanyModel.create(company3);
    const company4Doc = await CompanyModel.create(company4);

    await ProductModel.create({
      ...product1,
      company: company1Doc._id,
    });

    await ProductModel.create({
      ...product2,
      company: company1Doc._id,
    });

    await ProductModel.create({
      ...product3,
      company: company4Doc._id,
    });

    await ProductModel.create({
      ...product4,
      company: company4Doc._id,
    });

    await ProductModel.create({
      ...product5,
      company: company3Doc._id,
    });

    await ProductModel.create({
      ...product6,
      company: company2Doc._id,
    });

    console.log("Mockup data created successfully");
    process.exit(0);
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

createMockupData();

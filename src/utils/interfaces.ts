export interface IProduct {
  _id: string;
  product_name: string;
  product_amount: number;
  product_unit: string;
  company: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

export interface ICompany {
  _id: string;
  company_name: string;
  incorporation_country: string;
  company_legal_number: string;
  website: string;
  createdAt?: string;
  updatedAt?: string;
}

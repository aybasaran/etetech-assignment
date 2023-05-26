import { Space, Tooltip } from "antd";
import { PencilSquareIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { ICompany, IProduct } from "./interfaces";

export const companyColumns = [
  {
    title: "Company Name",
    dataIndex: "company_name",
    key: "company_name",
  },
  {
    title: "Company Legal Number",
    dataIndex: "company_legal_number",
    key: "company_legal_number",
  },
  {
    title: "Incorporation Country",
    dataIndex: "incorporation_country",
    key: "incorporation_country",
  },
  {
    title: "Website",
    dataIndex: "website",
    key: "website",
  },
  {
    title: "Action",
    key: "action",
    render: (_: unknown, record: ICompany) => (
      <Space size="middle">
        <Tooltip title="Edit Company">
          <Link to={`/company/${record._id}/edit`}>
            <PencilSquareIcon width={24} height={24} color="000" />
          </Link>
        </Tooltip>
        <Tooltip title="Delete Company">
          <Link to={`/company/${record._id}/delete`}>
            <XCircleIcon width={24} height={24} color="red" />
          </Link>
        </Tooltip>
      </Space>
    ),
  },
];

export const productColumns = [
  {
    title: "Product Name",
    dataIndex: "product_name",
    key: "product_name",
  },
  {
    title: "Product Category",
    dataIndex: "product_category",
    key: "product_category",
  },
  {
    title: "Product Amount",
    dataIndex: "product_amount",
    key: "product_amount",
  },
  {
    title: "Amount Unit",
    dataIndex: "amount_unit",
    key: "amount_unit",
  },
  {
    title: "Company",
    dataIndex: "company",
    key: "company",
    render: (company: ICompany) => company.company_name,
  },
  {
    title: "Action",
    key: "action",
    render: (_: unknown, record: IProduct) => (
      <Space size="middle">
        <Tooltip title="Edit Product">
          <Link to={`/product/${record._id}/edit`}>
            <PencilSquareIcon width={24} height={24} color="000" />
          </Link>
        </Tooltip>
        <Tooltip title="Delete Product">
          <Link to={`/product/${record._id}/delete`}>
            <XCircleIcon width={24} height={24} color="red" />
          </Link>
        </Tooltip>
      </Space>
    ),
  },
];

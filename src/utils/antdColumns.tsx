import { Space } from "antd";
import { PencilSquareIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

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
    render: (_: any, record: any) => (
      <Space size="middle">
        <Link to={`/company/${record._id}/edit`}>
          <PencilSquareIcon width={24} height={24} color="000" />
        </Link>
        <Link to={`/company/${record._id}/delete`}>
          <XCircleIcon width={24} height={24} color="red" />
        </Link>
      </Space>
    ),
  },
];

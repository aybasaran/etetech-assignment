import React from "react";
import Layout from "../components/Layout";

import { useQuery } from "@tanstack/react-query";
import api from "../api";

import { Table } from "antd";

import { companyColumns } from "../utils/antdColumns";

import { Link } from "react-router-dom";
import { PlusCircleIcon } from "@heroicons/react/24/outline";

const Company: React.FC = () => {
  const { data, isLoading, error } = useQuery(["companies", "all"], () =>
    api.get("/company").then((res) => res.data)
  );

  return (
    <Layout>
      <div>
        <div className="flex justify-end">
          <Link to="/company/create">
            <PlusCircleIcon className="h-10 w-10" />
          </Link>
        </div>
        <Table
          columns={companyColumns}
          dataSource={data}
          loading={isLoading}
          rowKey="_id"
          bordered
        />
      </div>
    </Layout>
  );
};

export default Company;

import React from "react";
import Layout from "../components/Layout";

import { useQuery } from "@tanstack/react-query";
import api from "../api";

import { Table } from "antd";

import { companyColumns } from "../utils/antdColumns";

const Company: React.FC = () => {
  const { data, isLoading, error } = useQuery(["companies", "all"], () =>
    api.get("/company").then((res) => res.data)
  );

  return (
    <Layout>
      <div>
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

import React from "react";
import Layout from "../components/Layout";
import { Table } from "antd";
import { companyColumns } from "../utils/antdColumns";

import { useQuery } from "@tanstack/react-query";
import api from "../api";

const Home: React.FC = () => {
  const { data, isLoading, error } = useQuery(["companies", "latest3"], () =>
    api.get("/company", { params: { lm: 3, str: -1 } }).then((res) => res.data)
  );

  return (
    <Layout>
      <div>
        <Table
          columns={companyColumns}
          dataSource={data}
          loading={isLoading}
          rowKey="_id"
          pagination={false}
          bordered
        />
      </div>
    </Layout>
  );
};

export default Home;

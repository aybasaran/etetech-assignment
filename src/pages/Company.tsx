import React, { useEffect } from "react";
import Layout from "../components/Layout";

import { useQuery } from "@tanstack/react-query";
import api from "../api";

import { Table, Tooltip } from "antd";

import { companyColumns } from "../utils/antdColumns";

import { Link, useNavigate } from "react-router-dom";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import useAuth from "../hooks/useAuth";

const Company: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const { data, isLoading } = useQuery(["companies", "all"], async () => {
    const res = await api.get("/company");
    return res.data;
  });

  return (
    <Layout>
      <div>
        <h1 className="text-lg font-semibold text-purple-600 text-center">
          Company List
        </h1>
        <div className="flex justify-end">
          <Tooltip title="Add Company">
            <Link to="/company/create">
              <PlusCircleIcon className="h-10 w-10" />
            </Link>
          </Tooltip>
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

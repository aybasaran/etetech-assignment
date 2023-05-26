import { FC, useEffect } from "react";
import { Table, Tooltip } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { PlusCircleIcon } from "@heroicons/react/24/outline";

import Layout from "../components/Layout";

import { productColumns } from "../utils/antdColumns";

import { useQuery } from "@tanstack/react-query";
import api from "../api";
import useAuth from "../hooks/useAuth";

const Product: FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const { data, isLoading } = useQuery(["products", "all"], async () => {
    const res = await api.get("/product");
    return res.data;
  });

  return (
    <Layout>
      <div>
        <h1 className="text-lg font-semibold text-purple-600 text-center">
          Product List
        </h1>
        <div className="flex justify-end">
          <Tooltip title="Add Product">
            <Link to="/product/create">
              <PlusCircleIcon className="h-10 w-10" />
            </Link>
          </Tooltip>
        </div>
        <Table
          columns={productColumns}
          dataSource={data}
          loading={isLoading}
          rowKey="_id"
          bordered
        />
      </div>
    </Layout>
  );
};

export default Product;

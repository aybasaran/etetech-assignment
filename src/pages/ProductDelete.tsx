import React, { useEffect } from "react";
import Layout from "../components/Layout";
import Button from "../components/Button";

import { ArrowPathIcon } from "@heroicons/react/24/solid";

import { useParams, useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../api";
import useAuth from "../hooks/useAuth";

const ProductDelete: React.FC = function () {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { id } = useParams<{ id: string }>();

  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const { data, isLoading } = useQuery(["product", id], () =>
    api.get(`/product/${id}`).then((res) => res.data)
  );

  const mutation = useMutation({
    mutationFn: async () => {
      const res = await api.delete(`/product/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["products", "all"]);
    },
  });

  const handleYesClick = () => {
    mutation.mutate();
    navigate("/product", { state: { deleted: true } });
  };

  const handleNoClick = () => {
    navigate("/product", { state: { deleted: false } });
  };

  return (
    <Layout>
      {isLoading ? (
        <div>
          <ArrowPathIcon className="animate-spin h-5 w-5 mr-3 ..." />
        </div>
      ) : (
        <div className="max-w-2xl mx-auto flex flex-col gap-6 h-full justify-center">
          <h1 className="text-2xl">
            Are you sure you want to delete this product -{" "}
            <span className="font-bold">({data.product_name})</span> ?
          </h1>
          <div className="flex gap-8">
            <Button
              text="Yes"
              className="bg-red-500 py-1 px-6 flex-1"
              onClick={handleYesClick}
              isLoading={mutation.isLoading}
            />
            <Button
              text="No"
              className="bg-green-500 py-1 px-6 flex-1"
              onClick={handleNoClick}
            />
          </div>
        </div>
      )}
    </Layout>
  );
};

export default ProductDelete;

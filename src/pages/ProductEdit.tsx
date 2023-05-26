import React, { useEffect } from "react";
import { ArrowPathIcon } from "@heroicons/react/24/solid";
import toast, { Toaster } from "react-hot-toast";
import { ICompany } from "../utils/interfaces";

import Layout from "../components/Layout";
import Button from "../components/Button";
import { Select } from "antd";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";

import sleep from "../utils/sleep";
import useAuth from "../hooks/useAuth";

const ProductEdit: React.FC = function () {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const [company, setCompany] = React.useState<string>(); // [
  const { id } = useParams<{ id: string }>();

  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery(["product", id], async () => {
    const res = await api.get(`/product/${id}`);
    return res.data;
  });

  const companyQuery = useQuery(["companies", "all"], async () => {
    const res = await api.get("/company");
    return res.data;
  });

  const mutation = useMutation({
    mutationFn: async (payload: unknown) => {
      toast.loading("Updating...");
      await sleep(1000);
      const res = await api.put(`/product/${id}`, payload);
      toast.remove();
      return res.data;
    },
    onSuccess: async () => {
      toast.success("Successfully updated, redirecting...");
      await queryClient.invalidateQueries(["products", "all"]);
      await queryClient.invalidateQueries(["product", id]);
      await sleep(1000);
      toast.remove();
      navigate("/product", { state: { updated: true } });
    },
    async onError() {
      toast.error("Failed to update");
      await sleep(1000);
      toast.remove();
    },
  });

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData.entries());
    if (company) {
      payload.company = company;
    } else {
      payload.company = data?.company._id;
    }
    mutation.mutate(payload);
  };

  return (
    <Layout>
      <Toaster />
      {isLoading ? (
        <div>
          <ArrowPathIcon className="animate-spin h-5 w-5" />
        </div>
      ) : (
        <div className="max-w-lg mx-auto">
          <form onSubmit={submitHandler} className="flex flex-col gap-3">
            <div className="inputGroup">
              <label htmlFor="product_name">Product Name</label>
              <input
                type="text"
                name="product_name"
                id="product_name"
                defaultValue={data?.product_name}
              />
            </div>
            <div className="inputGroup">
              <label htmlFor="product_category">Product Category</label>
              <input
                type="text"
                name="product_category"
                id="product_category"
                defaultValue={data?.product_category}
              />
            </div>
            <div className="inputGroup">
              <label htmlFor="product_amount">Product Amount</label>
              <input
                type="number"
                name="product_amount"
                id="product_amount"
                defaultValue={data?.product_amount}
              />
            </div>

            <div className="inputGroup">
              <label htmlFor="amount_unit"> Amount Unit</label>
              <input
                type="text"
                name="amount_unit"
                id="amount_unit"
                defaultValue={data?.amount_unit}
              />
            </div>

            <div className="inputGroup">
              <label htmlFor="company">Company</label>
              <Select
                onChange={(value) => setCompany(value)}
                defaultValue={data?.company.company_name}
                loading={companyQuery.isLoading}
                options={companyQuery.data?.map((company: ICompany) => ({
                  label: company.company_name,
                  value: company._id,
                }))}
              />
            </div>
            <Button
              text="Save"
              className="bg-orange-400 hover:bg-orange-500"
              isLoading={mutation.isLoading}
            />
          </form>
        </div>
      )}
    </Layout>
  );
};

export default ProductEdit;

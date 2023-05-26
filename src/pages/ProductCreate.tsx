import React from "react";
import toast, { Toaster } from "react-hot-toast";
import { IProduct, ICompany } from "../utils/interfaces";

import Layout from "../components/Layout";
import Button from "../components/Button";
import { Select } from "antd";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import api from "../api";

import sleep from "../utils/sleep";

const ProductCreate: React.FC = function () {
  const [company, setCompany] = React.useState<string>("");
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const companyQuery = useQuery(["companies", "all"], async () => {
    const res = await api.get("/company");
    return res.data;
  });

  const mutation = useMutation({
    mutationFn: async (payload: any) => {
      toast.loading("Creating...");
      await sleep(1000);
      const res = await api.post(`/product`, payload);
      toast.remove();
      return res.data;
    },
    onSuccess: async () => {
      toast.success("Successfully created!, redirecting...");
      await queryClient.invalidateQueries(["products", "all"]);
      await sleep(1000);
      toast.remove();
      navigate("/product", { state: { created: true } });
    },
    async onError() {
      toast.error("Failed to Create!");
      await sleep(1000);
      toast.remove();
    },
  });

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData.entries());
    payload.company = company;
    // console.log(payload);
    mutation.mutate(payload);
  };

  return (
    <Layout>
      <Toaster />

      <div className="max-w-lg mx-auto">
        <form onSubmit={submitHandler} className="flex flex-col gap-3">
          <div className="inputGroup">
            <label htmlFor="product_name">Product Name</label>
            <input type="text" name="product_name" id="product_name" />
          </div>
          <div className="inputGroup">
            <label htmlFor="product_category">Product Category</label>
            <input type="text" name="product_category" id="product_category" />
          </div>
          <div className="inputGroup">
            <label htmlFor="product_amount">Product Amount</label>
            <input type="number" name="product_amount" id="product_amount" />
          </div>

          <div className="inputGroup">
            <label htmlFor="amount_unit"> Amount Unit</label>
            <input type="text" name="amount_unit" id="amount_unit" />
          </div>

          <div className="inputGroup">
            <label htmlFor="company">Company</label>
            <Select
              onChange={(value) => setCompany(value)}
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
    </Layout>
  );
};

export default ProductCreate;

import React, { useEffect } from "react";
import Layout from "../components/Layout";
import Button from "../components/Button";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import api from "../api";
import { useNavigate } from "react-router-dom";
import sleep from "../utils/sleep";
import toast, { Toaster } from "react-hot-toast";
import useAuth from "../hooks/useAuth";

const CompanyCreate: React.FC = function () {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const mutation = useMutation({
    mutationFn: async (payload: unknown) => {
      toast.loading("Creating...");
      await sleep(1000);
      const res = await api.post("/company", payload);
      toast.remove();
      return res.data;
    },
    onSuccess: async () => {
      toast.success("Successfully created, redirecting...");
      await sleep(1000);
      queryClient.invalidateQueries(["companies", "all"]);
      queryClient.invalidateQueries(["companies", "latest3"]);
      toast.remove();
      navigate("/company", { state: { created: true } });
    },
    async onError() {
      toast.error("Failed to create ");
      await sleep(1000);
      toast.remove();
    },
  });

  const formSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    mutation.mutate(payload);
  };

  return (
    <Layout>
      <Toaster />
      <div className="max-w-2xl mx-auto">
        <form onSubmit={formSubmitHandler} className="flex flex-col gap-3">
          <div className="inputGroup">
            <label htmlFor="company_name">Name</label>
            <input type="text" name="company_name" id="company_name" />
          </div>
          <div className="inputGroup">
            <label htmlFor="incorporation_country">Incorporation Country</label>
            <input
              type="text"
              name="incorporation_country"
              id="incorporation_country"
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="website">Website</label>
            <input type="text" name="website" id="website" />
          </div>
          <Button
            text="Create"
            isLoading={mutation.isLoading}
            className="bg-blue-500 hover:bg-blue-600"
          />
        </form>
      </div>
    </Layout>
  );
};

export default CompanyCreate;

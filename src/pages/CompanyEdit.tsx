import React from "react";
import { ArrowPathIcon } from "@heroicons/react/24/solid";
import toast, { Toaster } from "react-hot-toast";

import Layout from "../components/Layout";
import Button from "../components/Button";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";

import api from "../api";

import sleep from "../utils/sleep";
import useAuth from "../hooks/useAuth";

const CompanyEdit: React.FC = function () {
  const { id } = useParams<{ id: string }>();

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { user } = useAuth();

  if (!user) {
    navigate("/login");
  }

  const { data, isLoading } = useQuery(["company", id], async () => {
    const res = await api.get(`/company/${id}`);
    return res.data;
  });

  const mutation = useMutation({
    mutationFn: async (payload: unknown) => {
      toast.loading("Updating...");
      await sleep(1000);
      const res = await api.put(`/company/${id}`, payload);
      toast.remove();
      return res.data;
    },
    onSuccess: async () => {
      queryClient.invalidateQueries(["companies", "all"]);
      queryClient.invalidateQueries(["companies", "latest3"]);
      queryClient.invalidateQueries(["company", id]);
      toast.success("Successfully updated, redirecting...");
      await sleep(1000);
      toast.remove();
      navigate("/company", { state: { updated: true } });
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
              <label htmlFor="companyName">Name</label>
              <input
                type="text"
                name="companyName"
                id="companyName"
                defaultValue={data?.company_name}
              />
            </div>
            <div className="inputGroup">
              <label htmlFor="incorporationCountry">
                Incorporation Country
              </label>
              <input
                type="text"
                name="incorporationCountry"
                id="incorporationCountry"
                defaultValue={data?.incorporation_country}
              />
            </div>
            <div className="inputGroup">
              <label htmlFor="website">Website</label>
              <input
                type="text"
                name="website"
                id="website"
                defaultValue={data?.website}
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

export default CompanyEdit;

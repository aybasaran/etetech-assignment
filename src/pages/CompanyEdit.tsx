import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import api from "../api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { ArrowPathIcon } from "@heroicons/react/24/solid";
import Button from "../components/Button";

const CompanyEdit: React.FC = function () {
  const { id } = useParams<{ id: string }>();

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery(["company", id], () =>
    api.get(`/company/${id}`).then((res) => res.data)
  );

  const mutation = useMutation({
    mutationFn: async (payload: unknown) => {
      const res = await api.put(`/company/${id}`, payload);
      return res.data;
    },
    onSuccess: () => {
      console.log("Successfully updated");
      queryClient.invalidateQueries(["companies", "all"]);
      queryClient.invalidateQueries(["companies", "latest3"]);
      queryClient.invalidateQueries(["company", id]);
      navigate("/company", { state: { updated: true } });
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
      {isLoading ? (
        <div>
          <ArrowPathIcon className="animate-spin h-5 w-5 mr-3 ..." />
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

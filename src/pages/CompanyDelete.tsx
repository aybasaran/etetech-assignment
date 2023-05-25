import React from "react";
import Layout from "../components/Layout";
import Button from "../components/Button";

import { ArrowPathIcon } from "@heroicons/react/24/solid";

import { useParams, useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../api";

const CompanyDelete: React.FC = function () {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { id } = useParams<{ id: string }>();

  const { data, isLoading } = useQuery(["company", id], () =>
    api.get(`/company/${id}`).then((res) => res.data)
  );

  const mutation = useMutation({
    mutationFn: async () => {
      const res = await api.delete(`/company/${id}`);
      return res.data;
    },
    onSuccess: () => {
      console.log("Successfully deleted");
      queryClient.invalidateQueries(["companies", "all"]);
      queryClient.invalidateQueries(["companies", "latest3"]);
    },
  });

  const handleYesClick = () => {
    mutation.mutate();
    navigate("/company", { state: { deleted: true } });
  };

  const handleNoClick = () => {
    navigate("/company", { state: { deleted: false } });
  };

  return (
    <Layout>
      {isLoading ? (
        <div>
          <ArrowPathIcon className="animate-spin h-5 w-5 mr-3 ..." />
        </div>
      ) : (
        <div className="max-w-2xl mx-auto flex flex-col gap-6">
          <h1 className="text-2xl">
            Are you sure you want to delete this company -{" "}
            <span className="font-bold">({data.company_name})</span> ?
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

export default CompanyDelete;

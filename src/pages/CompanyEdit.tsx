import React from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import api from "../api";
import { useQuery } from "@tanstack/react-query";

import { ArrowPathIcon } from "@heroicons/react/24/solid";

const CompanyEdit: React.FC = function () {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, error } = useQuery(["company", id], () =>
    api.get(`/company/${id}`).then((res) => res.data)
  );

  return (
    <Layout>
      {isLoading ? (
        <div>
          <ArrowPathIcon className="animate-spin h-5 w-5 mr-3 ..." />
        </div>
      ) : (
        <div>
          <a href={data.website}>
            <h1>{data.company_name}</h1>
          </a>
          <p>{data.incorporation_country}</p>
        </div>
      )}
    </Layout>
  );
};

export default CompanyEdit;

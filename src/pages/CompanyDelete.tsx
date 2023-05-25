import React from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";

const CompanyDelete: React.FC = function () {
  const { id } = useParams<{ id: string }>();
  return (
    <Layout>
      <div>
        <h1>CompanyDelete</h1>
        <p>{id}</p>
      </div>
    </Layout>
  );
};

export default CompanyDelete;

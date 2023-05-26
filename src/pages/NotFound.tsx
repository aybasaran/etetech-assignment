import { FC } from "react";
import Layout from "../components/Layout";

const NotFound: FC = () => {
  return (
    <Layout>
      <div className="flex justify-center items-center h-full">
        <h1 className="text-4xl text-center font-bold">
          Sorry, Page Not Found
        </h1>
      </div>
    </Layout>
  );
};

export default NotFound;

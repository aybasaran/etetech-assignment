import { FC, useEffect } from "react";
import Layout from "../components/Layout";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../api";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import sleep from "../utils/sleep";
import Button from "../components/Button";
import useAuth from "../hooks/useAuth";

const Profile: FC = () => {
  const navigate = useNavigate();
  const quertClient = useQueryClient();

  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const { data, isLoading } = useQuery(["profile"], {
    queryFn: async () => {
      const res = await api.get("/auth/me");
      if (res.status !== 200) {
        throw new Error("Authentication Failed");
      }
      return res.data;
    },
    onError: async () => {
      toast.error("Authentication expired, redirecting...");
      await sleep(1000);
      toast.remove();
      quertClient.invalidateQueries(["profile"]);
      navigate("/login");
    },
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      const res = await api.post("/auth/logout");
      return res.data;
    },
  });

  const logoutHandler = async () => {
    logoutMutation.mutate();
    toast.loading("Logging out...");
    await sleep(1000);
    toast.remove();
    navigate("/login");
  };

  return (
    <Layout>
      <Toaster />
      {isLoading ? (
        <div className="flex justify-center items-center h-full">
          <ArrowPathIcon className="animate-spin h-12 w-12" />
        </div>
      ) : (
        data && (
          <div className="flex flex-col justify-center items-center h-full gap-3">
            <h1 className="text-xl font-semibold">{data?.name}</h1>
            <p className="text-sm text-gray-500">{data?.email}</p>
            <Button
              text="logout"
              onClick={logoutHandler}
              isLoading={logoutMutation.isLoading}
              className="bg-red-400 font-light hover:bg-red-500"
            />
          </div>
        )
      )}
    </Layout>
  );
};

export default Profile;

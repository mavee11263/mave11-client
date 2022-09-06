import {
  CogIcon,
  TrendingUpIcon,
  UserGroupIcon,
  UserIcon,
  VideoCameraIcon,
} from "@heroicons/react/outline";
import React, { useState } from "react";
import DashboardCard from "../../components/DashboardCard/DashboardCard";
import { useFetch } from "../../hooks/useFetch";
import DashboardLayout from "../../layouts/DashboardLayout";
import { apiUrl } from "../../utils/apiUrl";

type Props = {};

const Dashboard = (props: Props) => {
  const url = `${apiUrl}/api/admin/info`;
  const state = useFetch(url);

  return (
    <DashboardLayout>
      <div className="mt-8">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-lg font-medium leading-6 text-gray-900">
            Overview
          </h2>
          <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {/* Card */}
            <DashboardCard
              name="Account balance"
              icon={
                <UserIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
              }
              location="dashboard/users"
              amount={0}
              loading={state.status === "fetching"}
              bg_color={"bg-red-200"}
            />
            <DashboardCard
              name="Page visits"
              icon={
                <VideoCameraIcon
                  className="h-6 w-6 text-green-600"
                  aria-hidden="true"
                />
              }
              location="/dashboard/videos"
              amount={state?.data?.data?.videos}
              loading={state.status === "fetching"}
              bg_color={"bg-green-200"}
            />
            <DashboardCard
              icon={
                <UserGroupIcon
                  className="h-6 w-6 text-blue-600"
                  aria-hidden="true"
                />
              }
              name="Total users"
              location="/dashboard/users"
              amount={state?.data?.data?.users}
              loading={state.status === "fetching"}
              bg_color="bg-blue-200"
            />
            <DashboardCard
              icon={
                <TrendingUpIcon
                  className="h-6 w-6 text-indigo-600"
                  aria-hidden="true"
                />
              }
              name="Reports"
              location="/dashboard/reports"
              amount={state?.data?.data?.reports}
              loading={state.status === "fetching"}
              bg_color="bg-indigo-200"
            />

            <DashboardCard
              icon={
                <CogIcon className="h-6 w-6 text-gray-600" aria-hidden="true" />
              }
              name="Settings"
              location="/dashboard/settings"
              amount={"site settings"}
              loading={state.status === "fetching"}
              bg_color="bg-gray-200"
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;

import React from "react";
import DashboardLayout from "../../../layouts/DashboardLayout";

type Props = {};

function Settings({}: Props) {
  return (
    <DashboardLayout>
      <div className="max-w-7xl w-full mx-auto">
        <div className="flex flex-col w-full ">
          <p className="text-center py-4 capitalize font-semibold text-3xl">
            Manage Site
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Settings;

import React from "react";
import DashboardLayout from "../../../layouts/DashboardLayout";

type Props = {};

function Reports({}: Props) {
  return (
    <DashboardLayout>
      <div className="flex max-w-7xl mx-auto px-2 flex-col">
        <div className="flex flex-col w-full ">
          <p className="text-center py-4 capitalize font-semibold text-3xl">
            Manage Reports
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Reports;

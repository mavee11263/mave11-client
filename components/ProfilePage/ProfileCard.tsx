import React, { ReactElement } from "react";

interface Props {
  name: string;
  amount: number | string;
  location: string;
  icon: any;
  loading: boolean;
  bg_color: string;
}

function ProfileCard({
  name,
  amount,
  location,
  icon,
  loading,
  bg_color,
}: Props): ReactElement {
  return (
    <>
      <div className="bg-white dark:bg-gray-700 overflow-hidden shadow rounded-lg">
        <div className="p-5">
          <div className="flex items-center">
            <div
              className={`flex-shrink-0 p-2 rounded-full ${
                bg_color ? bg_color : "bg-green-200"
              }`}
            >
              {icon}
              {/* {React.createElement(icon)} */}
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                  {loading ? "loading..." : name}
                </dt>
                <dd>
                  <div className="text-lg font-medium text-gray-900 dark:text-white">
                    {loading ? "loading..." : amount}
                  </div>
                </dd>
              </dl>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 dark:bg-gray-600 px-5 py-3 dark:text-gray-200 text-gray-800">
          <div className="text-sm">
            <a
              href={location}
              className="font-medium text-blue-primary hover:text-blue-secondary"
            >
              View all
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfileCard;

import { Spinner } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import Pagination from "../../../components/Pagination/Pagination";
import ManageUsersTable from "../../../components/Tables/ManageUsersTable";
import { Store } from "../../../Context/Store";
import { useFetch } from "../../../hooks/useFetch";
import DashboardLayout from "../../../layouts/DashboardLayout";
import { apiUrl } from "../../../utils/apiUrl";

const PER_PAGE = 10;

type Props = {};

function Users({}: Props) {
  const [page, setPage] = useState(1);
  const [all_userss, setAllUsers] = useState<any>();
  const url = `${apiUrl}/api/admin/users?perPage=${PER_PAGE}?page=${page}`;

  const state = useFetch(url);

  const { state: store_state } = useContext(Store);
  const { search_category, search_query, mavee_11_user } = store_state;
  const token = mavee_11_user?.token;

  // rerender whenever total video changes
  useEffect(() => {
    setAllUsers(state?.data?.users);
  }, [state]);

  const delete_item_from_table = (id: any) => {
    setAllUsers(all_userss?.filter((item: any) => item._id !== id));
  };

  console.log(state);

  return (
    <DashboardLayout>
      <div className="flex max-w-7xl mx-auto w-full px-2 flex-col">
        <div className="flex flex-col w-full ">
          <p className="text-center py-4 capitalize font-semibold text-3xl">
            Manage All Users And Channels
          </p>
        </div>
        {state?.status === "fetching" ? (
          <>
            <div className="h-96 mx-auto w-full grid items-center justify-center content-center">
              <Spinner size={"xl"} />
            </div>
          </>
        ) : (
          <>
            <ManageUsersTable
              delete_item_from_table={delete_item_from_table}
              setPage={setPage}
              page={page}
              data={state}
              auth_token={token}
              videos={all_userss}
            />
            <>
              <Pagination
                className="flex flex-1 py-8 mx-auto"
                currentPage={page}
                totalCount={state?.data.meta?.total}
                pageSize={PER_PAGE}
                onPageChange={(page: number) => setPage(page)}
              />
            </>
          </>
        )}
      </div>
    </DashboardLayout>
  );
}

export default Users;

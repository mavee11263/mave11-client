import {
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { SearchIcon } from "@heroicons/react/outline";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { ReactElement, useContext, useEffect, useState } from "react";
import { Store } from "../../Context/Store";
import { apiUrl } from "../../utils/apiUrl";

function NavSearch(): ReactElement {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [search_query, setSearchQuery] = useState<string>("");
  const history = useRouter();
  const { dispatch } = useContext(Store);
  const [searched_products, setSearchedProducts] = useState<any>();

  const search_handler = () => {
    history.push("/");
    dispatch({ type: "SET_SEARCH_QUERY", payload: search_query });
  };

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(
        `${apiUrl}/api/video/explore?page=${1}&keyword=${
          search_query ? search_query : ""
        }&perPage=${8}`
      );
      setSearchedProducts(data?.products);
    };

    const delayDebounceFn = setTimeout(() => {
      // Send Axios request here
      getData();
    }, 3000);

    return () => clearTimeout(delayDebounceFn);
  }, [search_query]);

  return (
    <>
      <div
        onClick={onOpen}
        className="flex p-2 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer rounded-full"
      >
        <SearchIcon
          height={20}
          width={20}
          className="text-gray-700 dark:text-gray-200"
        />
      </div>

      <Modal isOpen={isOpen} onClose={onClose} size={"lg"}>
        <ModalOverlay />
        <ModalContent className="dark:bg-gray-700 bg-white">
          <ModalBody className="dark:bg-gray-700 bg-white" rounded={"md"}>
            <div className="flex flex-col">
              <div className="flex flex-row items-center bg-white dark:bg-gray-700 rounded">
                <input
                  type="text"
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="md:p-4 p-2 rounded outline-none border-none w-full dark:bg-gray-700"
                  placeholder="Search name or category"
                />
                <div onClick={search_handler} className="cursor-pointer">
                  <SearchIcon
                    height={20}
                    width={20}
                    className="text-gray-500"
                  />
                </div>
              </div>
              <div className="flex flex-col">
                {search_query === "" ? (
                  <p className="py-3 text-center text-gray-400">
                    Nothing has been searched
                  </p>
                ) : (
                  <div className="flex flex-col">
                    {searched_products?.length < 1 ? (
                      <p className="py-3 text-center text-gray-400">
                        No results found
                      </p>
                    ) : (
                      <>
                        {searched_products?.map((item: any, index: number) => (
                          <div
                            onClick={() => history.push(`/video/${item._id}`)}
                            key={index}
                            className="flex cursor-pointer flex-col items-center p-2  hover:bg-gray-100"
                          >
                            {/* <Avatar src={item.picture}   rounded={"md"} /> */}
                            <p>{item.title}</p>
                          </div>
                        ))}
                        <div className="my-1"></div>
                        {searched_products?.length > 8 && (
                          <Link href={"/eplore"}>
                            <a className="pt-2capitalize flex cursor-pointer flex-col border-t border-gray-300 text-center text-gray-500">
                              View all results
                            </a>
                          </Link>
                        )}
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default NavSearch;

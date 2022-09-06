import { Fragment, useContext, ReactElement } from "react";
import { Menu, Transition } from "@headlessui/react";
import { BellIcon, MenuAlt1Icon } from "@heroicons/react/outline";
import { ChevronDownIcon, SearchIcon } from "@heroicons/react/solid";
import { useState } from "react";
import { useRouter } from "next/router";
import { Avatar } from "@chakra-ui/react";
import { Store } from "../../Context/Store";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

interface Props {
  setSidebarOpen: any;
}

function DashboardNavbar({ setSidebarOpen }: Props): ReactElement {
  const [query, setQuery] = useState<string>("");
  const { state, dispatch } = useContext(Store);
  const { mavee_11_user } = state;
  const history = useRouter();

  const search_items_handler = (e: any) => {
    e.preventDefault();
    console.log(query);
  };

  const logout_user = () => {
    dispatch({ type: "USER_LOGOUT" });
    history.push("/");
    // Cookies.remove('mavee_11_user')
    // window.location.reload()
  };

  return (
    <>
      <div className="relative z-10 flex-shrink-0 flex h-16 bg-white border-b border-gray-200 lg:border-none">
        <button
          type="button"
          className="px-4 border-r border-gray-200 text-gray-400 focus:outline-none lg:hidden"
          onClick={() => setSidebarOpen(true)}
        >
          <span className="sr-only">Open sidebar</span>
          <MenuAlt1Icon className="h-6 w-6" aria-hidden="true" />
        </button>
        {/* Search bar */}
        <div className="flex-1 px-4 flex justify-between sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">
          <div className="flex-1 flex">
            <form
              onSubmit={search_items_handler}
              className="w-full flex md:ml-0 "
              action="#"
              method="GET"
            >
              <label htmlFor="search-field" className="sr-only">
                Search
              </label>
              <div className="relative w-full text-gray-400 focus-within:text-gray-600 ">
                <div
                  className="absolute inset-y-0 left-0 flex items-center pointer-events-none"
                  aria-hidden="true"
                >
                  <SearchIcon className="h-5 w-5" aria-hidden="true" />
                </div>
                <input
                  id="search-field"
                  name="search-field"
                  onChange={(e) => setQuery(e.target.value)}
                  className="block w-full h-full pl-8 pr-3 py-2 border-transparent text-gray-900 placeholder-gray-500 outline-none sm:text-sm"
                  placeholder="Search items"
                  type="search"
                />
              </div>
            </form>
          </div>
          <div className="ml-4 flex items-center md:ml-6">
            <button
              type="button"
              className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none"
            >
              <span className="sr-only">View notifications</span>
              <BellIcon className="h-6 w-6" aria-hidden="true" />
            </button>

            {/* Profile dropdown */}
            <Menu as="div" className="ml-3 relative">
              <div>
                <Menu.Button className="max-w-xs bg-white rounded-full space-x-2 flex items-center text-sm focus:outline-none lg:p-2 lg:rounded-md lg:hover:bg-gray-50">
                  <Avatar
                    size="sm"
                    name={mavee_11_user?.name}
                    src={mavee_11_user?.photoURL}
                  />
                  <div className="hidden text-gray-700 text-sm font-medium lg:block">
                    <span className="sr-only">Open user menu for </span>
                    {/* <Username username={mavee_11_user?.name} /> */}
                    username
                  </div>
                  <ChevronDownIcon
                    className="hidden flex-shrink-0 ml-1 h-5 w-5 text-gray-400 lg:block"
                    aria-hidden="true"
                  />
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="/profile"
                        className={classNames(
                          active ? "bg-gray-100" : "",
                          "block px-4 py-2 text-sm text-gray-700"
                        )}
                      >
                        Your Profile
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="/dashboard/settings"
                        className={classNames(
                          active ? "bg-gray-100" : "",
                          "block px-4 py-2 text-sm text-gray-700"
                        )}
                      >
                        Settings
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="/"
                        className={classNames(
                          active ? "bg-gray-100" : "",
                          "block px-4 py-2 text-sm text-gray-700"
                        )}
                      >
                        Switch to buying
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <div
                        onClick={logout_user}
                        className={classNames(
                          active ? "bg-gray-100" : "",
                          "cursor-pointer block px-4 py-2 text-sm text-gray-700"
                        )}
                      >
                        Logout
                      </div>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
      </div>
    </>
  );
}

export default DashboardNavbar;

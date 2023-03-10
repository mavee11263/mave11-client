import React, { useContext } from "react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Avatar,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Store } from "../../Context/Store";
import Cookies from 'js-cookie'

function UserDropdown() {
  const history = useRouter();
  const { dispatch, state } = useContext(Store);
  const { mavee_11_user } = state;

  const logout_user = () => {
    dispatch({ type: "USER_LOGOUT" });
    Cookies.remove("mavee_11_user");
    history.push("/");
  };

  return (
    <Menu>
      <MenuButton>
        <div className="flex flex-row" onClick={logout_user}>
          <Avatar name={mavee_11_user?.name} src={mavee_11_user?.photoURL} size="sm" />
        </div>
      </MenuButton>
      <MenuList className="bg-white dark:bg-gray-800 border dark:border-gray-700 border-gray-200">
        <MenuItem></MenuItem>
        <MenuItem onClick={()=> history.push('/profile')} className="dark:hover:bg-gray-700 hover:bg-gray-200 focus:bg-none">
          <Link href={"/profile"}>
            <a className="flex dark:text-gray-200 items-center text-gray-700 flex-row space-x-2">
              <Avatar
                size="sm"
                src={mavee_11_user?.photoURL}
                name={mavee_11_user?.name}
              />
              <span>My Account</span>
            </a>
          </Link>
        </MenuItem>
        <MenuDivider />
      
        <MenuItem className="dark:hover:bg-gray-700 hover:bg-gray-200 focus:bg-none">
          <Link href={"/my-videos"}>
            <a className="font-semibold capitalize dark:text-gray-200 text-gray-700">
              My Videos
            </a>
          </Link>
        </MenuItem>
        <MenuDivider />
        <MenuItem className="dark:hover:bg-gray-700 hover:bg-gray-200 focus:bg-none">
          <Link href={"/chat/user"}>
            <a className="font-semibold capitalize dark:text-gray-200 text-gray-700">
             Chats
            </a>
          </Link>
        </MenuItem>
        <MenuDivider />
        <MenuItem className="dark:hover:bg-gray-700 hover:bg-gray-200 focus:bg-none" onClick={logout_user}>
          <div className="font-semibold capitalize dark:text-gray-200 text-gray-700">Logout</div>
        </MenuItem>
      </MenuList>
    </Menu>
  );
}

export default UserDropdown;

import { useLazyQuery } from "@apollo/client";
import { Dispatch, useState } from "react";

import { GET_USERS } from "../../lib/graphql/client/queries";
import { ImagesActionsTypes } from "../../useReducers/imagesReducer/imagesActionsTypes";
import { Action } from "../../useReducers/imagesReducer/imagesReducer";

const useSearchUsers = (
  users: Array<{ id: number; username: string }> | undefined,
  dispatchImages: Dispatch<Action>
) => {
  const [searchUsers, searchStatus] = useLazyQuery(GET_USERS, {
    onError: () => {},
  });
  const [search, setSearch] = useState<string>("");

  const handleOnSearch = (userName: string) => {
    setSearch(userName);
    if (userName.trim().length > 1) {
      searchUsers({
        variables: {
          userName,
        },
      });
    }
  };

  const handleOnTagUser = (user: { id: number; username: string }) => {
    setSearch("");
    const newUsers = [...users!];
    if (newUsers?.filter((u) => u.username === user.username).length! < 1) {
      newUsers?.push(user);
      dispatchImages({ type: ImagesActionsTypes.TAG_USERS, users: newUsers });
    }
  };

  const handleOnBlur = () => {
    setTimeout(() => {
      setSearch("");
    }, 100);
  };

  const handleOnUntagUser = (user: { id: number; username: string }) => {
    let newUsers = users;
    newUsers = newUsers?.filter((u) => u.username !== user.username);
    dispatchImages({ type: ImagesActionsTypes.TAG_USERS, users: newUsers });
  };

  return {
    handleOnSearch,
    searchStatus,
    search,
    handleOnTagUser,
    handleOnBlur,
    handleOnUntagUser,
  };
};

export default useSearchUsers;

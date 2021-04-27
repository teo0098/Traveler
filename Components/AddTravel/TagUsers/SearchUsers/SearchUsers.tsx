import { XCircle } from "react-feather";

import useSearchUsers from "../../../customHooks/useSearchUsers";
import { SearchUsersInput } from "../../../Inputs/Inputs";
import * as SC from "./styledSearchUsers";
import Loader from "../../../Loader/Loader";
import Error from "../../../Error/Error";
import { SearchUserType } from "../../../../types/SearchUserType";
import { SearchUsersProps } from "./searchUsersProps";

const SearchUsers: React.FC<SearchUsersProps> = ({ users, dispatchImages }) => {
  const {
    handleOnSearch,
    searchStatus: { loading, error, data, called },
    search,
    handleOnTagUser,
    handleOnBlur,
    handleOnUntagUser,
  } = useSearchUsers(users, dispatchImages);

  return (
    <SC.StyledSearchUsers>
      <SearchUsersInput handleOnBlur={handleOnBlur} search={handleOnSearch} />
      <SC.StyledResults>
        {loading ? (
          <SC.StyledUsers>
            <SC.StyledSpace>
              <Loader />
            </SC.StyledSpace>
          </SC.StyledUsers>
        ) : null}
        {error && search.trim().length > 2 ? (
          <SC.StyledUsers>
            <SC.StyledSpace>
              <Error> {error.message} </Error>
            </SC.StyledSpace>
          </SC.StyledUsers>
        ) : null}
        {!error &&
        !loading &&
        called &&
        data.users.length > 0 &&
        search.trim().length > 1 ? (
          <SC.StyledUsers>
            {(data.users as Array<SearchUserType>).map((user) => (
              <SC.StyledSection
                onClick={() => handleOnTagUser(user)}
                key={user.username}
              >
                {user.username}
              </SC.StyledSection>
            ))}
          </SC.StyledUsers>
        ) : null}
        <SC.StyledPickedUsers>
          {users?.map((user, index: number) => (
            <SC.StyledUser key={index}>
              <SC.StyledUserName> {user.username} </SC.StyledUserName>
              <XCircle
                style={{ cursor: "pointer" }}
                onClick={() => handleOnUntagUser(user)}
              />
            </SC.StyledUser>
          ))}
        </SC.StyledPickedUsers>
      </SC.StyledResults>
    </SC.StyledSearchUsers>
  );
};

export default SearchUsers;

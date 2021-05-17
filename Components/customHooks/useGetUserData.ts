import { useMutation } from "@apollo/client";

import { GET_DATA_USER } from "../../lib/graphql/client/mutations";

const useGetUserData = () => {
    const [getData, getDataStatus] = useMutation(GET_DATA_USER, {
        onError: () => {},
    });

    const loadData = ({ refreshToken }: { refreshToken: string | null }) =>
        getData({
            variables: {
                refreshToken,
            },
        });

    return { loadData, getDataStatus, getData };
};

export default useGetUserData;

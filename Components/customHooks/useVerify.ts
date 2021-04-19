import { useMutation } from "@apollo/client";

import { VERIFY_USER } from "../../lib/graphql/client/mutations";

const useVerify = () => {
  const [verifyUser, verifyStatus] = useMutation(VERIFY_USER, {
    onError: () => {},
  });

  const handleOnSubmit = ({ verifyHash }: { verifyHash: string }) =>
    verifyUser({
      variables: {
        verifyHash,
      },
    });

  return { handleOnSubmit, verifyStatus };
};

export default useVerify;

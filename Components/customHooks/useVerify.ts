import { useMutation } from "@apollo/client";

import { VERIFY_USER } from "../../lib/graphql/client/mutations";
import { useEffect } from "react";

const useVerify = () => {
  const [verifyUser, verifyStatus] = useMutation(VERIFY_USER, {
    onError: () => {},
  });

  useEffect(() => {
    if (verifyStatus.data) {
      console.log(verifyStatus.data);
    }
  }, [verifyStatus.data]);

  const handleOnSubmit = ({ verifyHash }: { verifyHash: string }) =>
    verifyUser({
      variables: {
        verifyHash,
      },
    });

  return { handleOnSubmit, verifyStatus, useVerify };
};

export default useVerify;

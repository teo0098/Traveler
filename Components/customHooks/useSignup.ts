import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { REGISTER_USER } from "../../lib/graphql/client/mutations";

const useSignup = () => {
  const [signup, signupStatus] = useMutation(REGISTER_USER, {
    onError: () => {},
  });
  const router = useRouter();

  useEffect(() => {
    if (signupStatus.data) {
      router.push("/");
    }
  }, [signupStatus.data]);

  const handleOnSubmit = ({
    email,
    password,
    username,
  }: {
    email: string;
    password: string;
    username: string;
  }) =>
    signup({
      variables: {
        email,
        password,
        username,
      },
    });

  return { handleOnSubmit, signupStatus };
};

export default useSignup;

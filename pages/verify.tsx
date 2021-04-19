import Head from "next/head";
import useVerify from "../Components/customHooks/useVerify";
import { useEffect } from "react";
import Error from "../Components/Error/Error";
import Loader from "../Components/Loader/Loader";

const Verify: React.FC = () => {
  const {
    handleOnSubmit,
    verifyStatus: { loading, error },
  } = useVerify();

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const code = urlParams.get("code");
    if (code !== null) {
      handleOnSubmit({ verifyHash: code });
    }
  }, []);
  return (
    <>
      <Head>
        <title>Traveler | Weryfikacja</title>
      </Head>
      {loading ? <Loader /> : null}
      {error ? <Error> {error.message} </Error> : null}
    </>
  );
};

export default Verify;

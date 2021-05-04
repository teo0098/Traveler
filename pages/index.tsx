import Head from "next/head";

import Travels from "../Components/Travels/Travels";

const Home: React.FC = () => {
  return (
    <>
      <Head>
        <title>Strona główna</title>
      </Head>
      <Travels />
    </>
  );
};

export default Home;

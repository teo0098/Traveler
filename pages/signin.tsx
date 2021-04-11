import Head from 'next/head'

import SigninComponent from '../Components/Signin/Signin'

const Signin : React.FC = () => (
    <>
        <Head>
            <title>Zaloguj się</title>
        </Head>
        <SigninComponent />
    </>
)

export default Signin
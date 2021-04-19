import Head from 'next/head'

import AddTravel from '../../../Components/AddTravel/AddTravel'

const Signin : React.FC = () => (
    <>
        <Head>
            <title>Dodaj nową podróż</title>
        </Head>
        <AddTravel />
    </>
)

export default Signin
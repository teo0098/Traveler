import Head from 'next/head'
import { useQuery } from '@apollo/client'

import { GET_BOOKS } from '../lib/graphql/client/queries';

const Home : React.FC = () => {

  const { loading, error, data } = useQuery(GET_BOOKS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <>
        <Head>
          <title>Strona główna</title>
        </Head>
        {(data.books as Array<{title : string, author : string}>).map(book => (
          <p key={book.title}> {book.title} - {book.author} </p>
        ))}
    </>
  )
}

export default Home
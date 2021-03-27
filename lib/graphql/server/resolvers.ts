import getBook from './resolversFunctions/getBook'
import getBooks from './resolversFunctions/getBooks'

const resolvers = {
    Query: {
      books: getBooks,
      book(_ : unknown, args : { item : number }) {
        return getBook(args.item)
      }
    }
}

export default resolvers
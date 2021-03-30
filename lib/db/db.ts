import mysql from 'serverless-mysql'

export const db = mysql({
  config: {
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD
  }
})

export async function query(q: string, values: (string | number)[] | string | number = []) {
  try {
    const results = await db.query(q, values)
    await db.end()
    return results
  } catch(err) {
    return err
  }
}
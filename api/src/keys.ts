import 'dotenv/config'

export const mongodb = {
    'URI': process.env.DATABASE_CONNECTION_URI as string
}
import dotenv from 'dotenv'

process.env.NODE_ENV = process.env.NODE_ENV || 'development'

const env = dotenv.config()

if(env.error) {
    throw new Error('No .env')
}

export const PORT = process.env.PORT || ""
export const mongoURL = process.env.MONGO_URL || ""
export const omdbKey = process.env.OMDB_KEY || ""
export const secretToken = process.env.SECRET_TOKEN || ""
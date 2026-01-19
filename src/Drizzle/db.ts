import "dotenv/config"
import { drizzle } from "drizzle-orm/node-postgres"
import { Client } from "pg"
import * as schema from "./schema"

// Create Postgres client using Neon URL from env
export const client = new Client({
    connectionString: process.env.DATABASE_URL as string,
    ssl: { rejectUnauthorized: false } // required for Neon
})

// Connect
const main = async () => {
    await client.connect()
    console.log("Connected to the database")
}
main().catch((error) => {
    console.error("Error connecting to the database:", error)
})

// Drizzle ORM instance
const db = drizzle(client, { schema, logger: true })
export default db

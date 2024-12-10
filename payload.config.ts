import sharp from 'sharp'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'

export default buildConfig({
  // If you'd like to use Rich Text, pass your editor here
  editor: lexicalEditor(),

  // Define and configure your collections in this array
  collections: [],

  // Your Payload secret - should be a complex and secure string, unguessable
  secret: process.env.PAYLOAD_SECRET || '',
  db: postgresAdapter({
    pool: {
      // connectionString: process.env.DATABASE_URI || '',
      connectionString:'postgresql://s15t6q:xau_8WRS8olHW20GG0naf7EVfFI4muA6ckUU0@us-east-1.sql.xata.sh/SchoolProject:main?sslmode=require',
    },
  }),
  sharp,
})
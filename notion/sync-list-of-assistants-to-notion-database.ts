import axios, { AxiosResponse } from 'axios';
import * as dotenv from 'dotenv';


dotenv.config();

// source
const DUST_API_KEY = process.env.DUST_API_KEY;
const DUST_WORKSPACE_ID = process.env.DUST_WORKSPACE_ID;

// destination
const NOTION_API_KEY = process.env.NOTION_API_KEY;
const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID;

const missingEnvVars = [
  ['DUST_API_KEY', DUST_API_KEY],
  ['DUST_WORKSPACE_ID', DUST_WORKSPACE_ID],
  ['NOTION_API_KEY', NOTION_API_KEY],
  ['NOTION_DATABASE_ID', NOTION_DATABASE_ID],
].filter(([name, value]) => !value).map(([name]) => name);

if (missingEnvVars.length > 0) {
  throw new Error(`Please provide values for the following environment variables in the .env file: ${missingEnvVars.join(', ')}`);
}

async function main() {
  console.log(`Syncing the list of Dust assistants from workspace ${DUST_WORKSPACE_ID} innto Notion database ${NOTION_DATABASE_ID}`);
}

main();

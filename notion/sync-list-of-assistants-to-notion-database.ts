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

interface DustAssistant {
  id: number;
  sId: string;
  scope: string;
  name: string;
  pictureUrl: string;
  description: string;
  instructions: string;
  model: {
    providerId: string;
    modelId: string;
    temperature: number;
  };
  status: string;
  maxStepsPerRun: number;
  visualizationEnabled: boolean;
  templateId: string;
}

const dustApi = axios.create({
  baseURL: 'https://dust.tt/api/v1',
  headers: {
    'Authorization': `Bearer ${DUST_API_KEY}`,
    'Content-Type': 'application/json'
  },
  maxContentLength: Infinity,
  maxBodyLength: Infinity,
});

async function getDustAssistants(): Promise<DustAssistant[]> {
  try {

    // Fetch list of assistants
    const response: AxiosResponse<{
      agentConfigurations: DustAssistant[];
    }> = await dustApi.get(`/w/${DUST_WORKSPACE_ID}/assistant/agent_configurations`);

    const assistants = response.data.agentConfigurations.map((assistant: DustAssistant) => ({
      id: assistant.id,
      sId: assistant.sId,
      scope: assistant.scope,
      name: assistant.name,
      pictureUrl: assistant.pictureUrl,
      description: assistant.description,
      instructions: assistant.instructions,
      model: assistant.model,
      status: assistant.status,
      maxStepsPerRun: assistant.maxStepsPerRun,
      visualizationEnabled: assistant.visualizationEnabled,
      templateId: assistant.templateId,
    }));

    return assistants;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error('Error fetching Dust assistants:', error.response.data);
    } else {
      console.error('Error fetching Dust assistants:', error);
    }
    throw error;
  }
}

async function main() {
  console.log(`Syncing the list of Dust assistants from workspace ${DUST_WORKSPACE_ID} innto Notion database ${NOTION_DATABASE_ID}`);
  try {
    console.log(`Fetching the list of Dust assistants.`);
    const assistants = await getDustAssistants();
    console.log(`Found ${assistants.length} assistants.`);
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

main();

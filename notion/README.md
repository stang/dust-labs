# Dust to Notion synchronisation

This script synchronises the list of Dust assistants in a Notion database.

## Installation

1. Ensure you have Node.js (version 14 or higher) and npm installed on your system.

2. Clone this repository:
   ```
   git clone git@github.com:dust-tt/dust-labs.git
   cd dust-labs/notion
   ```

3. Install the dependencies:
   ```
   npm install --include=dev
   ```

## Environment Setup

Create a `.env` file in the root directory of the project with the following variables:

```
# source
DUST_API_KEY=your_dust_api_key
DUST_WORKSPACE_ID=your_dust_workspace_id

# destination
NOTION_API_KEY=your_notion_api_key
NOTION_DATABASE_ID=your_notion_database_id
```

Replace the placeholder values with your actual Dust and Notion settings.

## Usage

To run the script:

*To synchronise the list of Dust assistants in a Notion database:*
```
npm run sync-list-of-assistants-to-notion-database
```

## Dependencies

- axios: For making HTTP requests to Zendesk and Dust APIs
- dotenv: For loading environment variables

## Dev Dependencies

- @types/node: TypeScript definitions for Node.js
- tsx: For running TypeScript files directly
- typescript: The TypeScript compiler

## License

This project is licensed under the ISC License.

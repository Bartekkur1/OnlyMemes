import { getConsoleLogger } from '../src/Util/logger';
import { readFileSync } from 'fs';
import SQLClient from '../src/Data/SQL/SQLClient';
import { argv } from 'bun';

enum COMMAND {
  CLEAR = 'clear',
  INIT = 'init',
  POPULATE = 'populate'
};

enum MIGRATION_FILE {
  STRUCTURE_DOWN = 'structure_down.sql',
  STRUCTURE_INIT = 'structure_init.sql',
  POPULATE = 'data_populate.sql'
};

const COMMAND_MAP = {
  [COMMAND.CLEAR]: MIGRATION_FILE.STRUCTURE_DOWN,
  [COMMAND.INIT]: MIGRATION_FILE.STRUCTURE_INIT,
  [COMMAND.POPULATE]: MIGRATION_FILE.POPULATE
};

const SUPPORTED_COMMANDS = Object.values(COMMAND).map(String);
const logger = getConsoleLogger('SQLRunner');

const extractCommand = (): COMMAND => {
  const commands = argv.filter(a => a.includes('--'));
  if (commands.length === 0) {
    throw new Error('Command not found!');
  }

  const command = commands[0].replace('--', '');
  if (!SUPPORTED_COMMANDS.includes(command)) {
    throw new Error('Invalid command!');
  }

  return command as COMMAND;
};

const createClient = async (): Promise<SQLClient> => {
  logger.info('Creating SQL client...');
  const client = new SQLClient();
  logger.info('Initializing SQL client...');
  await client.init();
  logger.info('SQL client initialized!');
  return client;
};

const readSQLFile = (fileName: MIGRATION_FILE): string => {
  logger.info(`Reading SQL file: ${fileName}`);
  return readFileSync(`./migration/${fileName}`, 'utf8');
};

const runMigration = async (client: SQLClient, command: COMMAND) => {
  const transactionId = await client.createTransaction();
  const transaction = await client.getTransaction(transactionId);
  try {
    logger.info(`Running migration command: ${command}`);
    const query = readSQLFile(COMMAND_MAP[command]);

    const queries = query.split('--');
    logger.info(`Executing ${queries.length} query...`);
    for (const q of queries) {
      await transaction.raw(q);
    }
    logger.info('Committing transaction...');
    await client.commitTransaction(transactionId);
  } catch (err) {
    logger.error(err.message);
    await client.rollbackTransaction(transactionId);
  }
};

try {
  const command = extractCommand();
  const client = await createClient();
  logger.info(`Running migration command: ${command}`);

  await runMigration(client, command);

  logger.info('Destroying SQL client...');
  await client.pepsi();
} catch (err) {
  logger.error(err.message);
}

import { Client, GatewayIntentBits, TextChannel } from 'discord.js';
import { loadConfig } from '../config';
import { ContentStore, ContentUploadResult, Image } from './types';
import { fileTypeFromBuffer } from 'file-type';

interface DiscordConfig {
  token: string;
  storageChannelId: string;
}

const connectAsync = (client): Promise<Client> => new Promise((res, rej) => {
  client.once('ready', (c) => {
    return res(c);
  });
  client.once('error', (err) => {
    return rej(err);
  });
});

const findStorageChannel = async (client: Client, storageChannelId: string): Promise<TextChannel> => {
  const storage = await client.channels.fetch(storageChannelId);
  if (!storage) throw new Error('Storage not found');
  else return storage as TextChannel;
};

class DiscordStore implements ContentStore {

  private config: DiscordConfig;
  private storageChannel?: TextChannel;

  constructor() {
    this.config = loadConfig<DiscordConfig>({
      token: 'DISCORD_TOKEN',
      storageChannelId: 'DISCORD_STORAGE_CHANNEL_ID'
    });
  }

  private async getStorageChannel(): Promise<TextChannel> {
    if (this.storageChannel === undefined) {
      const client = new Client({ intents: [GatewayIntentBits.Guilds] });
      await client.login(this.config.token);
      const connection = await connectAsync(client);
      this.storageChannel = await findStorageChannel(connection, this.config.storageChannelId);
    }
    if (this.storageChannel === undefined) throw new Error('Failed to initialize Discord');

    return this.storageChannel;
  }

  async uploadImage({ id, file }: Image): Promise<ContentUploadResult> {
    const storageChannel = await this.getStorageChannel();

    const mimeType = await fileTypeFromBuffer(file);
    if (!mimeType) throw new Error('Invalid file type');
    const message = await storageChannel.send({
      content: id,
      files: [{
        attachment: file,
        name: `file.${mimeType.ext}`
      }]
    });

    const messageId: string = message.id;
    const url = message.attachments.first()?.url;
    if (!url) throw new Error('Failed to upload image');
    return {
      externalId: messageId,
      url
    }
  }

  async deleteMeme(externalId: string): Promise<boolean> {
    const storageChannel = await this.getStorageChannel();
    const message = await storageChannel.messages.fetch(externalId);
    await message.delete();
    return true;
  }

}

export default DiscordStore;
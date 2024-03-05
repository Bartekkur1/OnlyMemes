import { config } from 'dotenv';

const requireEnv = (name: string, defaultVal?: string): string => {
  const envValue = process.env[name];
  if (!envValue) {
    if (defaultVal !== undefined) return defaultVal;
    throw new Error(`MISSING ENV VARIABLE: ${name}`);
  }
  return envValue;
}

const loadConfig = <T>(baseConfig: { [k in keyof T]: string }): T => {
  config({ path: '.env' });
  const newConfig: { [key: string]: string } = {};
  Object.keys(baseConfig).forEach(key => (newConfig[key] = requireEnv(baseConfig[key as keyof T])));
  return newConfig as T;
}

export {
  loadConfig
};
import { createClient } from "@libsql/client";
import { hash, verify } from "argon2";
import { drizzle } from "drizzle-orm/libsql";
import { H3Event } from "h3";
import { v4 as uuidv4 } from "uuid";

const generateUUID = () => {
  return uuidv4();
};

const hashPassword = async (password: string) => {
  return await hash(password);
};

const verifyPassword = async (hashedPassword: string, originalPassword: string) => {
  return await verify(hashedPassword, originalPassword);
};

const useDatabase = (event: H3Event) => {
  const { turso } = useRuntimeConfig(event);

  const client = createClient({
    url: turso.databaseUrl,
    authToken: turso.authToken,
  });

  return drizzle(client);
};

export { generateUUID, hashPassword, verifyPassword, useDatabase };

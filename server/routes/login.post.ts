import { eq } from "drizzle-orm";
import { UsersTable } from "../database/schema";
import { LoginSchema } from "~/schemas/auth";

export default defineEventHandler(async (event) => {
  const { success, data, error } = await readValidatedBody(event, LoginSchema.safeParse);

  if (!success) {
    throw createError({
      statusCode: 400,
      statusMessage: `Invalid request body: ${error.issues[0].message} ${error.issues[0].path}`,
    });
  }

  const user = await useDatabase(event)
    .select()
    .from(UsersTable)
    .where(eq(UsersTable.email, data.email))
    .get();

  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: "Your email address is not registered",
    });
  }

  const passwordMatch = await verifyPassword(user.password, data.password);

  if (!passwordMatch) {
    throw createError({
      statusCode: 401,
      statusMessage: "Your password is incorrect",
    });
  }

  setResponseStatus(event, 200);
});

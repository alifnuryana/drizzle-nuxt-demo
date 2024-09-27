import { RegisterSchema } from "~/schemas/auth";
import { UsersTable } from "../database/schema";

export default defineEventHandler(async (event) => {
  const { error, success, data } = await readValidatedBody(event, RegisterSchema.safeParse);

  if (!success) {
    throw createError({
      statusCode: 400,
      statusMessage: `Invalid request body: ${error.issues[0].message} ${error.issues[0].path}`,
    });
  }

  try {
    await useDatabase(event)
      .insert(UsersTable)
      .values({
        name: data.name,
        email: data.email,
        password: await hashPassword(data.password),
      });

    setResponseStatus(event, 201);
  } catch (e) {
    throw createError({
      statusCode: 409,
      statusMessage: "Email address already registered",
    });
  }
});

export default defineEventHandler(async (event) => {
  await requireUserSession(event, {
    message: "You are not logged in",
    statusCode: 401,
  });

  await clearUserSession(event);

  setResponseStatus(event, 204);
});

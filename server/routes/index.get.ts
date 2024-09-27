export default defineEventHandler(async (event) => {
  await sendRedirect(event, "/login", 302);
});

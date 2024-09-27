export default defineNuxtRouteMiddleware((to, _from) => {
  if (to.path === "/login" || to.path === "/register") {
    return;
  }

  const { loggedIn } = useUserSession();

  if (loggedIn.value) {
    return navigateTo("/dashboard");
  }
});

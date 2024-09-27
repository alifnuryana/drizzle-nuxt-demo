export default defineNuxtRouteMiddleware((to, _from) => {
  const { loggedIn } = useUserSession();

  if (loggedIn.value) {
    return navigateTo("/dashboard");
  }
});

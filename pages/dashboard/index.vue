<template>
  <div>
    <div>Dashbaord</div>
    <UiButton @click="handleLogout">Logout</UiButton>
  </div>
</template>

<script lang="ts" setup>
  import { FetchError } from "ofetch";

  const title = "Dashboard";
  const description = "Dashboard page";

  definePageMeta({
    middleware: "auth",
  });

  const { loggedIn, clear, ready } = useUserSession();
  const handleLogout = async () => {
    try {
      await $fetch("/logout", {
        method: "POST",
      });

      await clear();

      if (!loggedIn.value && ready.value) {
        await navigateTo("/login");
      }

      useSonner("Logged out successfully!", {
        description: "You have successfully logged out.",
      });
    } catch (e) {
      if (e instanceof FetchError) {
        useSonner["error"]("Failed to log out", {
          description: e.statusMessage,
        });
      }
    }
  };

  useSeoMeta({
    title,
    description,
  });
</script>

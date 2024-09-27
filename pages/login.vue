<template>
  <div class="relative flex h-screen items-center justify-center">
    <div
      class="absolute h-full w-full bg-[radial-gradient(theme(colors.border/90%)_1px,transparent_1px)] [background-size:20px_20px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)]"
    />

    <div class="relative w-full max-w-md px-5">
      <h1 class="text-2xl font-bold tracking-tight lg:text-3xl">{{ title }}</h1>
      <p class="mt-1 text-muted-foreground">{{ description }}</p>

      <form class="mt-10" @submit="submit">
        <fieldset :disabled="isSubmitting" class="grid gap-5">
          <div>
            <UiVeeInput label="Email" type="email" name="email" placeholder="john@example.com" />
          </div>
          <div>
            <UiVeeInput label="Password" type="password" name="password" />
          </div>
          <div>
            <UiButton class="w-full" type="submit" text="Log in" />
          </div>
        </fieldset>
      </form>

      <p class="mt-8 text-sm">
        <NuxtLink class="font-semibold text-primary underline-offset-2 hover:underline" to="#">
          Forgot password?
        </NuxtLink>
      </p>

      <p class="mt-4 text-sm text-muted-foreground">
        Don't have an account?
        <NuxtLink
          class="font-semibold text-primary underline-offset-2 hover:underline"
          to="/register"
        >
          Create account
        </NuxtLink>
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { FetchError } from "ofetch";
  import { LoginSchema } from "~/schemas/auth";

  const title = "Log in";
  const description = "Enter your email & password to log in.";

  useSeoMeta({ title, description });

  const { handleSubmit, isSubmitting, resetField } = useForm({
    validationSchema: toTypedSchema(LoginSchema),
  });

  const submit = handleSubmit(async (body) => {
    try {
      await $fetch("/login", {
        method: "POST",
        body,
      });

      await navigateTo("/dashboard");

      useSonner("Logged in successfully!", {
        description: "You have successfully logged in.",
      });
    } catch (e) {
      resetField("password");
      if (e instanceof FetchError) {
        useSonner["error"]("Failed to log in", {
          description: e.statusMessage,
        });
      }
    }
  });
</script>

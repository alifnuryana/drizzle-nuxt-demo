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
          <UiVeeInput required label="Name" name="name" placeholder="John Doe" />
          <UiVeeInput
            required
            label="Email"
            type="email"
            name="email"
            placeholder="john@example.com"
          />
          <div class="grid grid-cols-1 gap-5 md:grid-cols-2">
            <UiVeeInput required label="Password" type="password" name="password" />
            <UiVeeInput
              required
              label="Password Confirmation"
              type="password"
              name="passwordConfirmation"
            />
          </div>
          <UiButton class="w-full" type="submit" text="Create account" />
        </fieldset>
      </form>

      <p class="mt-8 text-sm text-muted-foreground">
        Already have an account?
        <NuxtLink class="font-semibold text-primary underline-offset-2 hover:underline" to="/login">
          Log in
        </NuxtLink>
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { RegisterSchema } from "~/schemas/auth";
  import { FetchError } from "ofetch";

  const title = "Sign Up";
  const description = "Create an account to get started.";

  useSeoMeta({ title, description });

  definePageMeta({
    middleware: ["guest"],
  });

  const { handleSubmit, isSubmitting, resetField } = useForm({
    validationSchema: toTypedSchema(RegisterSchema),
  });

  const submit = handleSubmit(async (body) => {
    try {
      await $fetch("/register", {
        method: "POST",
        body,
      });

      await navigateTo("/login");

      useSonner("Account created!", {
        description: "Your account has been created successfully.",
      });
    } catch (e) {
      if (e instanceof FetchError) {
        if (e.status === 409) {
          resetField("email");
          resetField("password");
          resetField("passwordConfirmation");

          useSonner["error"]("Email already in use!", {
            description: "The email you provided is already in use.",
          });
        } else {
          useSonner["error"]("An error occurred!", {
            description: "An error occurred while creating your account.",
          });
        }
      }
    }
  });
</script>

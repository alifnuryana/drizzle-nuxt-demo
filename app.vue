<script setup lang="ts"></script>

<template>
  <div>
    <NuxtLoadingIndicator />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <ClientOnly>
      <UiVueSonner />
    </ClientOnly>
  </div>
</template>

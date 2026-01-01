<script setup lang="ts">
import { stories, questions } from '~/data/content'

useSeoMeta({
  title: 'Rollercoaster.dev — Ride Yours',
  description: 'Progress tracking for minds that don\'t move in straight lines',
  ogTitle: 'Rollercoaster.dev — Ride Yours',
  ogDescription: 'Progress tracking for minds that don\'t move in straight lines',
  ogUrl: 'https://rollercoaster.dev',
  ogType: 'website',
  ogImage: 'https://rollercoaster.dev/og-image.png',
  ogImageAlt: 'Rollercoaster.dev — Progress tracking for minds that don\'t move in straight lines',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Rollercoaster.dev — Ride Yours',
  twitterDescription: 'Progress tracking for minds that don\'t move in straight lines',
  twitterImage: 'https://rollercoaster.dev/og-image.png',
  twitterImageAlt: 'Rollercoaster.dev — Progress tracking for minds that don\'t move in straight lines',
  themeColor: '#ffe50c',
})
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />

    <!-- Skip to main content (accessibility) -->
    <a
      href="#main"
      class="skip-link"
    >Skip to content</a>

    <!-- Hero Section -->
    <HeroSection />

    <!-- Drop Section -->
    <DropSection />

    <!-- Stories Section -->
    <section
      id="main"
      class="stories"
    >
      <h2 class="stories-header">
        Who we're building for
      </h2>

      <div class="story-question-grid">
        <template
          v-for="(story, i) in stories"
          :key="story.name"
        >
          <StoryBlock v-bind="story" />
          <QuestionBlock
            v-if="questions[i]"
            v-bind="questions[i]"
          />
        </template>
      </div>

      <p class="stories-note">
        Composite stories drawn from neurodivergent experiences.
      </p>
    </section>

    <!-- Relief Section -->
    <ReliefSection />

    <!-- Pause Section -->
    <PauseSection />

    <!-- Badge Collection (client-side only for interactivity) -->
    <ClientOnly>
      <BadgeCollection />
    </ClientOnly>

    <!-- Footer -->
    <AppFooter />
  </div>
</template>

<style>
/* Skip link for keyboard accessibility */
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: var(--color-climb-bg);
  color: var(--color-climb-text);
  padding: 8px 16px;
  text-decoration: none;
  font-family: var(--font-mono);
  font-size: 0.875rem;
  font-weight: 500;
  z-index: 100;
  border-radius: 0 0 4px 0;
}

.skip-link:focus {
  top: 0;
  outline: 2px solid var(--color-climb-text);
  outline-offset: 2px;
}

/* Stories section wrapper */
.stories {
  background: var(--color-stories-bg);
  padding: 8rem 2rem 10rem;
  position: relative;
  overflow: hidden;
}

.stories-header {
  font-family: var(--font-display);
  font-size: clamp(4rem, 15vw, 12rem);
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: -0.05em;
  color: var(--color-white);
  margin-bottom: 6rem;
  line-height: 0.85;
}

.stories-note {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  color: rgba(255, 255, 255, 0.5);
  margin-left: 0;
}

/* Story-Question Grid (desktop side-by-side) */
.story-question-grid {
  /* Mobile-first: stacked layout (no grid) */
  display: block;
}

/* Desktop: side-by-side grid */
@media (min-width: 1024px) {
  .story-question-grid {
    display: grid;
    grid-template-columns: 1fr 1fr; /* 50/50 split */
    gap: 4rem 6rem; /* vertical / horizontal gap */
    align-items: start;
    overflow: visible; /* Allow story watermarks to overflow left */
  }
}
</style>

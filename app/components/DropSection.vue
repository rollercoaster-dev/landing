<script setup lang="ts">
// DropSection - The Drop
// Dark gradient section with purple accent highlighting the drop

const { t, tm, rt } = useI18n()
const punishList = computed(() => {
  const messages = tm('drop.punishList') as unknown[]
  if (!Array.isArray(messages)) return []
  return messages.map((msg: unknown) => rt(msg as string))
})
</script>

<template>
  <section
           class="drop min-h-[90vh] bg-gradient-to-b from-[var(--color-drop-bg)] via-[var(--color-drop-bg)] to-[var(--color-drop-bg-end)] text-[var(--color-drop-text)] py-40 px-8 pb-48 relative">
    <div class="drop-content max-w-[800px] ml-0 md:ml-[10%]">
      <h2
          class="font-[family-name:var(--font-headline)] font-bold text-[clamp(2.5rem,8vw,6rem)] leading-[0.95] text-[var(--color-drop-accent)] mb-16 max-w-[600px]">
        {{ t('drop.headline') }}
      </h2>

      <p
         class="font-[family-name:var(--font-body)] font-normal text-[clamp(1.1rem,2vw,1.4rem)] leading-[2] text-white/80 mb-6">
        {{ t('drop.paragraphs.0') }}
      </p>

      <p
         class="font-[family-name:var(--font-body)] font-normal text-[clamp(1.1rem,2vw,1.4rem)] leading-[2] text-white/80 mb-6">
        {{ t('drop.paragraphs.1') }}
      </p>

      <div class="punish-list font-[family-name:var(--font-mono)] text-[1.1rem] my-8 flex flex-wrap gap-x-8 gap-y-2">
        <span class="whitespace-nowrap inline-block rotate-2">
          <span class="x text-[var(--color-drop-accent)] mr-1.5">×</span>
          <span
                class="text text-white/70 line-through decoration-[var(--color-drop-accent)] decoration-1">{{
                  punishList[0] }}</span>
        </span>
        <span class="whitespace-nowrap inline-block -rotate-1">
          <span class="x text-[var(--color-drop-accent)] mr-1.5">×</span>
          <span
                class="text text-white/70 line-through decoration-[var(--color-drop-accent)] decoration-1">{{
                  punishList[1] }}</span>
        </span>
        <span class="whitespace-nowrap inline-block rotate-1">
          <span class="x text-[var(--color-drop-accent)] mr-1.5">×</span>
          <span
                class="text text-white/70 line-through decoration-[var(--color-drop-accent)] decoration-1">{{
                  punishList[2] }}</span>
        </span>
      </div>

      <p
         class="we-know text-[clamp(1.2rem,2.5vw,1.6rem)] text-[var(--color-white)] mt-12">
        {{ t('drop.paragraphs.2') }}
      </p>

      <span
            class="aside font-[family-name:var(--font-mono)] text-[0.7rem] text-white/60 mt-16 inline-block">
        {{ t('drop.aside') }}
      </span>
    </div>
  </section>
</template>

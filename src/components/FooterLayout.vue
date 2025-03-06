<template lang="pug">
  div(class="flex flex-row justify-center items-center bg-current h-[150px] relative bottom-0")
    span(class=" text-white") Copyright ©{{ new Date().getFullYear() }} h2
</template>

<script>
export default {
  name: 'FooterLayout',
}
</script>

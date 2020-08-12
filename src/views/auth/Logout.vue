<template>
  <div>

  </div>
</template>

<script>/* eslint-disable */
export default {
        name: "Logout",
        created() {
          this.$store.dispatch('logout')
            .then(response=>{
              this.$router.replace({name:'home'})
              location.reload()
            })
        }
    }
</script>

<style scoped>

</style>

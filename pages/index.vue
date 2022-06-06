<script setup>
const router = useRouter()
const loginStatus = useLoginStatus()
const loginRefreshToken = useLoginRefreshToken()
const logoutDisabled = ref(false)

const onLogout = async () => {
  try {
    if (logoutDisabled.value) return

    logoutDisabled.value = true
    await $fetch("/api/login", {
      method: "DELETE",
    })

    loginStatus.value = "UNAUTHENTICATED"
    router.push("/login")
  } catch (e) {
    console.log("Error while logging out", e.message)
  } finally {
    logoutDisabled.value = false
  }
}
</script>

<template>
  <div class="grid min-h-screen px-6 py-4">
    <div class="max-w-sm m-auto w-full bg-white rounded-lg shadow-md">
      <div class="px-6 py-4">
        <div class="text-center mb-3 text-lg">Welcome, user!{{}}</div>
        <div class="text-center">
          <span v-if="loginRefreshToken" class="text-md italic"
            >Refreshing token ...</span
          >
          <button
            v-else
            type="button"
            class="text-white bg-gray-700 px-4 py-2 rounded-md transition duration-200 hover:bg-gray-600"
            :class="{
              'bg-gray-300': logoutDisabled,
              'pointer-events-none': logoutDisabled,
            }"
            @click="onLogout()"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

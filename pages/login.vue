<script setup>
import { getIdToken, signInWithEmailAndPassword, signOut } from "firebase/auth"

const { $firebaseAuth: auth } = useNuxtApp()
const userCredentials = reactive({
  email: "",
  password: "",
})

const signInDisabled = ref(false)
const loginStatus = useLoginStatus()
const router = useRouter()

const onSignIn = async () => {
  try {
    if (signInDisabled.value) return
    if (userCredentials.email === "") return
    if (userCredentials.password === "") return

    signInDisabled.value = true

    await signInWithEmailAndPassword(
      auth,
      userCredentials.email,
      userCredentials.password
    )

    const idToken = await getIdToken(auth.currentUser, true)

    await $fetch("/api/login", {
      method: "POST",
      body: {
        idToken,
      },
    })

    await signOut(auth)

    loginStatus.value = "AUTHENTICATED"

    router.push("/")
  } catch (e) {
    console.log("Error while logging in", e.message)
  } finally {
    signInDisabled.value = false
  }
}
</script>

<template>
  <div class="grid min-h-screen px-6 py-4">
    <div class="max-w-sm m-auto w-full bg-white rounded-lg shadow-md">
      <div class="px-6 py-4 w-full">
        <div class="text-3xl mb-3 text-center text-gray-700 font-bold">
          Login
        </div>

        <form>
          <div class="mb-4">
            <input
              type="text"
              placeholder="Email Address"
              class="w-full px-4 py-2 rounded-md border"
              v-model="userCredentials.email"
            />
          </div>
          <div class="mb-4">
            <input
              type="password"
              placeholder="Password"
              class="w-full px-4 py-2 rounded-md border"
              v-model="userCredentials.password"
            />
          </div>
          <div class="flex justify-end">
            <button
              type="button"
              class="text-white bg-gray-700 px-4 py-2 rounded-md transition duration-200 hover:bg-gray-600"
              :class="{
                'bg-gray-300': signInDisabled,
                'pointer-events-none': signInDisabled,
              }"
              @click="onSignIn()"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

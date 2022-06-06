import {
  setPersistence,
  inMemoryPersistence,
  signInWithCustomToken,
  getIdToken,
  signOut,
} from "firebase/auth"
import { app, auth } from "../firebase/client"

export default defineNuxtPlugin(async (nuxtApp) => {
  await setPersistence(auth, inMemoryPersistence)

  nuxtApp.hook("app:mounted", async () => {
    const loginStatus = useLoginStatus()
    const loginRefreshToken = useLoginRefreshToken()

    // Firebase Admin SDK does not implement server-side token refresh.
    // So let's manually refresh the user session here, using the custom
    // token generated on the server.
    if (loginStatus.value === "AUTHENTICATED" && loginRefreshToken.value) {
      try {
        const userCredential = await signInWithCustomToken(
          auth,
          loginRefreshToken.value
        )

        const idToken = await getIdToken(userCredential.user, true)

        await $fetch("/api/login", {
          method: "POST",
          body: {
            idToken,
          },
        })

        await signOut(auth)

        loginRefreshToken.value = null
        console.log("Session refreshed.")
      } catch (e) {
        console.log("Error while refreshing session:", e.message)
      }
    }
  })

  return {
    provide: {
      firebaseApp: app,
      firebaseAuth: auth,
    },
  }
})

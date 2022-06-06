import { auth } from "../firebase/admin"

export default defineNuxtPlugin(async () => {
  const sessionCookie = useCookie("firebase-login")
  const loginStatus = useLoginStatus()
  const loginRefreshToken = useLoginRefreshToken()

  if (!sessionCookie.value) {
    loginStatus.value = "UNAUTHENTICATED"
    return
  }

  try {
    const decodedClaims = await auth.verifySessionCookie(
      sessionCookie.value,
      true
    )
    const uid = decodedClaims.uid
    loginRefreshToken.value = await auth.createCustomToken(uid)
    loginStatus.value = "AUTHENTICATED"
  } catch (e) {
    console.log("Error while verifying session cookie:", e.message)
    loginStatus.value = "UNAUTHENTICATED"
  }
})

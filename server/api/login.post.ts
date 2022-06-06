export default defineEventHandler(async (event) => {
  const body = await useBody(event)
  const idToken = body.idToken
  const auth = event.context.firebaseAuth
  const cookieName = useRuntimeConfig().public.firebaseSessionCookies.name
  const expiresIn = useRuntimeConfig().public.firebaseSessionCookies.lifetime
  const sameSite = useRuntimeConfig().public.firebaseSessionCookies.sameSite
  const sessionCookie = await auth.createSessionCookie(idToken, {
    expiresIn,
  })

  setCookie(event, cookieName, sessionCookie, {
    maxAge: expiresIn / 1000,
    httpOnly: true,
    sameSite,
  })
  return "login success"
})

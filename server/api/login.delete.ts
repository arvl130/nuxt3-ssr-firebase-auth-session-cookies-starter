export default defineEventHandler(async (event) => {
  const cookieName = useRuntimeConfig().public.firebaseSessionCookies.name
  const sameSite = useRuntimeConfig().public.firebaseSessionCookies.sameSite

  setCookie(event, cookieName, "", {
    maxAge: 0,
    httpOnly: true,
    sameSite,
  })
  return "logout success"
})

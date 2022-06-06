export default defineNuxtPlugin(() => {
  const loginStatus = useLoginStatus()
  addRouteMiddleware(
    "route-guard",
    (to) => {
      if (loginStatus.value === "AUTHENTICATED" && to.path === "/login")
        return navigateTo("/")

      if (loginStatus.value === "UNAUTHENTICATED" && to.path === "/")
        return navigateTo("/login")
    },
    { global: true }
  )
})

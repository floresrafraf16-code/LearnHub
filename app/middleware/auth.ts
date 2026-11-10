
export default defineNuxtRouteMiddleware(() => {
  if (import.meta.server) return

  const { user, restoreUser } = useAuth()

  restoreUser()

  if (!user.value) {
    return navigateTo('/login')
  }
})

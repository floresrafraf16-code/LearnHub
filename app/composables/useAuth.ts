
interface GoogleUser {
  sub: string
  name: string
  email: string
  picture: string
}

export const useAuth = () => {
  const user = useState<GoogleUser | null>(
    'auth-user',
    () => null
  )

  const error = useState<string>(
    'auth-error',
    () => ''
  )

  const config = useRuntimeConfig()

  const loadGoogleScript = (): Promise<void> => {
    return new Promise((resolve, reject) => {
      if ((window as any).google?.accounts?.id) {
        resolve()
        return
      }

      const script = document.createElement('script')
      script.src = 'https://accounts.google.com/gsi/client'
      script.async = true
      script.defer = true

      script.onload = () => resolve()
      script.onerror = () =>
        reject(new Error('Unable to load Google Sign-In.'))

      document.head.appendChild(script)
    })
  }

  const initializeGoogleSignIn = async (
    elementId: string
  ) => {
    error.value = ''

    try {
      await loadGoogleScript()

      const google = (window as any).google

      google.accounts.id.initialize({
        client_id: config.public.googleClientId,

        callback: (response: any) => {
          try {
            const payload = response.credential.split('.')[1]
            const base64 = payload
              .replace(/-/g, '+')
              .replace(/_/g, '/')

            const profile = JSON.parse(atob(base64))

            user.value = {
              sub: profile.sub,
              name: profile.name,
              email: profile.email,
              picture: profile.picture
            }

            localStorage.setItem(
              'learnhub-user',
              JSON.stringify(user.value)
            )

            navigateTo('/')
          } catch {
            error.value = 'Unable to process Google account information.'
          }
        }
      })

      const container = document.getElementById(elementId)

      if (!container) {
        throw new Error('Google Sign-In container not found.')
      }

      google.accounts.id.renderButton(container, {
        theme: 'outline',
        size: 'large',
        text: 'continue_with',
        shape: 'rectangular',
        width: 350
      })

    } catch (err) {
      console.error(err)
      error.value = 'Google Sign-In could not be initialized.'
    }
  }

  const restoreUser = () => {
    if (!import.meta.client) return

    const savedUser = localStorage.getItem('learnhub-user')

    if (savedUser) {
      try {
        user.value = JSON.parse(savedUser)
      } catch {
        localStorage.removeItem('learnhub-user')
        user.value = null
      }
    }
  }

  const logout = () => {
    user.value = null

    if (import.meta.client) {
      localStorage.removeItem('learnhub-user')

      ;(window as any).google?.accounts?.id?.disableAutoSelect()
    }

    navigateTo('/login')
  }

  const isAuthenticated = computed(() => !!user.value)

  return {
    user,
    error,
    isAuthenticated,
    initializeGoogleSignIn,
    restoreUser,
    logout
  }
}

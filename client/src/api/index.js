export const auth = {
  logout: () =>
    fetch('/auth/logout', { mode: 'no-cors' })
      .then(() =>
        navigator.serviceWorker.getRegistrations().then(registrations => {
          for (let registration of registrations)
            registration.unregister()
          window.location = "/auth/login"
        })
      )
      .catch(err => console.error('Could not logout', err))
}
# Nuxt 3 SSR Firebase Auth Starter using Session Cookies

This project is a starter template for Nuxt 3 projects using Firebase Authentication.
It uses [session cookies](https://firebase.google.com/docs/auth/admin/manage-cookies)
provided by Firebase to handle server-side authentication and route protection.

This solves problems related to ID token expiration when
[using Firebase's client-side ID tokens](https://github.com/arvl130/nuxt3-ssr-firebase-auth-starter).

## Setup

1. Create a Firebase project: [console.firebase.google.com](https://console.firebase.google.com/)
2. Register a new Web app and copy the configuration to `firebase/client.ts`.
3. Generate a new service account key and save it as `firebase/secret-key.json`.
4. Enable Email/Password provider under Authentication -> Sign-in method.
5. Add a new user.
6. Start the project with the following command:

```sh
npm run dev
```

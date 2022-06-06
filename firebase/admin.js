import admin from "firebase-admin"
import serviceAccount from "./secret-key.json"

if (admin.apps.length === 0)
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  })

export const app = admin.app()
export const auth = admin.auth()

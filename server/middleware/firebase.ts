import { app, auth } from "../../firebase/admin"

export default defineEventHandler((event) => {
  event.context.firebaseApp = app
  event.context.firebaseAuth = auth
})

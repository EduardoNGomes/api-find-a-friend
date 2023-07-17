import { app } from '@/app'

app
  .listen({
    port: 3000,
  })
  .then(() => {
    console.log('server is lintening')
  })

import { FastifyRequest, FastifyReply } from 'fastify'

declare module 'fastify' {
  interface FastifyRequest {
    file: {
      filename: string
      path: string
    }
  }
  interface FastifyReply {
    sendFile: (string) => void
  }
}

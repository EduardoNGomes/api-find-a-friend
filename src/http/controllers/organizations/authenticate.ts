import { InvalidDataEntryError } from '@/services/@errors/invalid-data-entry-error'
import { makeAuthenticateOrganizationService } from '@/services/@factory/organization/authenticate'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticatedOrganizationBodySchema = z.object({
    email: z.string().email(),
    password: z.string(),
  })

  const { email, password } = authenticatedOrganizationBodySchema.parse(
    request.body,
  )

  const authenticated = makeAuthenticateOrganizationService()

  try {
    const { organization } = await authenticated.execute({
      email,
      password,
    })

    const token = await reply.jwtSign({
      sign: {
        sub: organization.id,
      },
    })

    const refreshToken = await reply.jwtSign({
      sign: {
        sub: organization.id,
        expiresIn: '7d',
      },
    })
    return reply
      .status(200)
      .setCookie('refreshToken', refreshToken, {
        path: '/',
        secure: true,
        sameSite: true,
        httpOnly: true,
      })
      .send({ token })
  } catch (error) {
    if (error instanceof InvalidDataEntryError) {
      return reply.status(409).send({ message: error.message })
    }
  }
}

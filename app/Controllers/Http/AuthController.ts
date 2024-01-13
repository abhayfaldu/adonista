import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { rules, schema } from '@ioc:Adonis/Core/Validator'

export default class AuthController {
  public async signup({ request }: HttpContextContract) {
    const newUserSchema = schema.create({
      name: schema.string(),
      email: schema.string({}, [rules.email()]),
      password: schema.string({}, [rules.confirmed()]),
    })

    const payload = await request.validate({
      schema: newUserSchema,
      messages: {
        required: 'The {{ field }} is required to create a new account',
      },
    })
    console.log(payload)

    return request.all()
  }
}

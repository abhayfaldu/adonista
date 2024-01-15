import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { rules, schema } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'

export default class AuthController {
  public async signup({ request, response }: HttpContextContract) {
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

    const user = new User()
    user.name = request.body().name
    user.email = request.body().email
    user.password = request.body().password
    await user.save()

    return response.redirect('/')
  }

  public async login({ request, auth, response }: HttpContextContract) {
    const loginSchema = schema.create({
      email: schema.string({}, [rules.email()]),
      password: schema.string({}, [rules.minLength(5)]),
    })

    const req = await request.validate({
      schema: loginSchema,
      messages: {
        required: 'The {{ field }} is required to login',
        minLength: 'The password must be minimum 5 characters',
      },
    })

    const email = req.email
    const password = req.password
    await auth.attempt(email, password)
    return response.redirect('/profile')
  }
}

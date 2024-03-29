/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'
import AuthController from 'App/Controllers/Http/AuthController'

Route.get('/', async ({ view }) => view.render('welcome'))
Route.get('/profile', async ({ view }) => view.render('profile')).middleware('auth')

Route.get('/signup', async ({ view }) => view.render('signup'))
Route.post('/signup', 'AuthController.signup')

Route.get('/login', async ({ view }) => view.render('login'))
Route.post('/login', 'AuthController.login')
Route.post('/logout', 'AuthController.logout')

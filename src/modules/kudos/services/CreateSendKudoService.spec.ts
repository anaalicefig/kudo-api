import FakeSendKudosRepository from '../repositories/fakes/FakeSendKudosRepository'
import CreateSendKudoService from './CreateSendKudoService'
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository'
import CreateUserService from '@modules/users/services/CreateUserService'
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider'
import AppError from '@shared/errors/AppError'

let fakeSendKudosRepository: FakeSendKudosRepository
let createSendKudo: CreateSendKudoService
let fakeUsersRepository: FakeUsersRepository
let fakeHashProvider: FakeHashProvider
let createUser: CreateUserService

describe('SendKudo', () => {
  beforeEach(() => {
    fakeSendKudosRepository = new FakeSendKudosRepository()
    fakeUsersRepository = new FakeUsersRepository()
    createSendKudo = new CreateSendKudoService(
      fakeSendKudosRepository,
      fakeUsersRepository,
    )
    fakeHashProvider = new FakeHashProvider()
    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider)
  })

  it('should be able to send a kudo', async () => {
    const gaveUser = await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    const receivedUser = await createUser.execute({
      name: 'Mary Doe',
      email: 'marydoe@example.com',
      password: '123456',
    })

    const updatedGaveKudoUser = await createSendKudo.execute({
      gave_user: gaveUser.id,
      received_user: receivedUser.id,
      type: 'was_awesome',
    })

    expect(updatedGaveKudoUser.was_awesome).toBe(1)
  })

  it('should not be able to send a kudo to a non-existing user', async () => {
    const gaveUser = await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    await expect(
      createSendKudo.execute({
        gave_user: gaveUser.id,
        received_user: 'non-existing-id',
        type: 'was_awesome',
      }),
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to send a kudo when the limit has been reached', async () => {
    const gaveUser = await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    gaveUser.was_awesome = 0

    const receivedUser = await createUser.execute({
      name: 'Mary Doe',
      email: 'marydoe@example.com',
      password: '123456',
    })

    await expect(
      createSendKudo.execute({
        gave_user: gaveUser.id,
        received_user: receivedUser.id,
        type: 'was_awesome',
      }),
    ).rejects.toBeInstanceOf(AppError)
  })
})

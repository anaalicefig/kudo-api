import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'
import ListBrothersService from './ListBrothersService'

let fakeUsersRepository: FakeUsersRepository
let listBrothers: ListBrothersService

describe('ListBrothers', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()

    listBrothers = new ListBrothersService(fakeUsersRepository)
  })

  it('should be able to list brothers', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      grateful: 2,
      learned: 2,
      was_awesome: 2,
    })

    const user2 = await fakeUsersRepository.create({
      name: 'Mary Doe',
      email: 'marydoe@example.com',
      password: '123456',
      grateful: 2,
      learned: 2,
      was_awesome: 2,
    })

    const loggedUser = await fakeUsersRepository.create({
      name: 'John Tre',
      email: 'johntre@example.com',
      password: '123456',
      grateful: 2,
      learned: 2,
      was_awesome: 2,
    })

    const brothers = await listBrothers.execute({
      user_id: loggedUser.id,
    })

    expect(brothers).toEqual([user1, user2])
  })
})

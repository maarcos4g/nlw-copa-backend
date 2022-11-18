import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: {
      name: 'Jhon Doe',
      email: 'jhon.doe@gmail.com',
      avatarUrl: 'https://github.com/maarcos4g.png',
    }
  });

  const pool = await prisma.pool.create({
    data: {
      title: 'Example Pool',
      code: 'BOL123',
      ownerId: user.id,

      partipants: {
        create: {
          userId: user.id
        }
      }
    }
  })

  await prisma.game.create({
    data: {
      date: '2022-11-16T13:00:00.792Z',
      firstTeamCountryCode: 'DE',
      secondTeamCountryCode: 'BR'
    }
  })

  await prisma.game.create({
    data: {
      date: '2022-11-17T13:00:00.792Z',
      firstTeamCountryCode: 'BR',
      secondTeamCountryCode: 'AR',

      guesses: {
        create: {
          firstTeamPoints: 2,
          secondTeamPoints: 1,

          participant: {
            connect: {
              userId_poolId: {
                userId: user.id,
                poolId: pool.id,
              }
            }
          }
        }
      }
    }
  })
}

main()
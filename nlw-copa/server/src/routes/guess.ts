import { FastifyInstance } from "fastify"
import { z } from "zod"
import { prisma } from "../lib/prisma"
import { authenticate } from "../plugins/authenticate"

export async function guessRoutes(fastify: FastifyInstance){
    fastify.get("/guesses/count", async () => {
        const count = await prisma.guess.count()
        return {count}
    })
    fastify.post("/pools/:poolId/games/:gameId/guesses", {onRequest: [authenticate]}, async (request, reply) => {
        const createGuessParams = z.object({
            poolId: z.string(),
            gameId: z.string(),
        })
        const createGuessBody = z.object({
            firstTeamPoints: z.number(),
            secondTeamPoints: z.number(),
        })
        const {firstTeamPoints, secondTeamPoints} = createGuessBody.parse(request.body)
        const {poolId, gameId} = createGuessParams.parse(request.params)
        console.log(poolId)

        const participant = await prisma.participant.findUnique({
            where: {
                userId_poolId: {
                    poolId,
                    userId: request.user.sub
                }
            }
        })

        if(!participant){
            return reply.status(400).send({
                message: "You're not allowed to create a guess inside a pool that you does not participate in."
            })
        }

        const guess = await prisma.guess.findUnique({
            where: {
                participantId_gameId: {
                    participantId: participant.id,
                    gameId,
                }
            }
        })

        if(guess){
            return reply.status(400).send({
                message: "You already made a guess to this game on this pool."
            })
        }
        const game = await prisma.game.findUnique({
            where: {
                id: gameId,
            }
        })

        if(!game){
            return reply.status(400).send({
                message: "Game not found."
            })
        }

        if(game.date < new Date()){
            return reply.status(400).send({
                message: "You cannot send guesses after the game date"
            })
        }

        await prisma.guess.create({
            data: {
                gameId,
                participantId: participant.id,
                firstTeamPoints,
                secondTeamPoints,
            }
        })

        return reply.status(201).send()
    }) 
}

// //ya29.a0AeTM1ic8JkTZHhfA8TaDbFpwf1K5JkXk5s7atfNrdQNxTdP4H1H37DtO2HZ2ttq7WFvridIAJ5Omi3GX15aC0Lc3mlgUxSm8impRfXX8mA0Yj5lBgK0Vs2iMKTOk9H3i-N8DsebyNCYJ6pmgDmBeIjWzUuVmQAaCgYKAdMSARMSFQHWtWOmbuIH8_ompMBdmaeQgHIt9g0165
import { FastifyInstance } from "fastify"
import { z } from "zod"
import { prisma } from "../lib/prisma"
import { authenticate } from "../plugins/authenticate"

export async function authRoutes(fastify: FastifyInstance){
    fastify.get("/me", {
        onRequest: [authenticate],
    }, async (request) => {
        return {user: request.user}
    })

    fastify.post("/users", async (request) => {
        const createUserBody = z.object({
            access_token: z.string(),
        })
        const {access_token} = createUserBody.parse(request.body)
        const userResponse = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        })
        const userData = await userResponse.json()

        const userInfoSchema = z.object({
            id: z.string(),
            email: z.string().email(),
            name: z.string(),
            picture: z.string().url(),
        })

        const userInfo = userInfoSchema.parse(userData);

        let user =  await prisma.user.findUnique({
            where: {
                googleId: userInfo.id,
            }
        })

        if(!user){
            user = await prisma.user.create({
                data: {
                    googleId: userInfo.id,
                    name: userInfo.name,
                    email: userInfo.email,
                    avatarUrl: userInfo.picture,
                }
            })
        }
        const token = fastify.jwt.sign({
            name: user.name,
            avatarUrl: user.avatarUrl,
        }, {
            sub: user.id,
            expiresIn: "7 days",
        })

        return {token}
    })
}

//ya29.a0AeTM1iejcub6z1xDDPCRZv_r8o7aDo4hMCm5jY6xfpo-tlLL4sevPQxT3Q903UNFDZHHRDjZIkv1PMp486M0mqrB_aLC5x08XNQif6c1v6CIu8O_3WVoLBQoBjcv0ilp9FFiVLX5aXs7oZlqj9UKtzxiHaVKVQaCgYKAWcSARMSFQHWtWOmEbsj7D-OacV1Rb8YdVckNw0165
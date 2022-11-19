import { FastifyInstance } from "fastify"
import { z } from "zod"
import { prisma } from "../lib/prisma"

export async function authRoutes(fastify: FastifyInstance){
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
        return {userInfo}
    })
}
// ya29.a0AeTM1if6hqpL5lcKlRGk12Hsww531TxdNCISAYiku8QCacKo9v-D--dFXP7QDKW8F8kML4ntkmfyYOF--2hfcdd7In5j3vinhJ4IhGl7OYS8o8nwPP2WTa43A0rDbaCXYLE__bzgWE607A8j6VhjK-DI3mG0wgaCgYKAW8SARMSFQHWtWOmkKOIrZIHyuO-kcYEXFNDtw0165
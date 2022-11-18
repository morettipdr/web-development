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
// ya29.a0AeTM1ie0fpUjsaevYxCDDEcpVcMUXPj-fIJ96b7Dt1yPIqpZZ-iS58frRk4XTsiX_DTZuH7Ock5MxTiOIZriDoauLVyd2UbkL1r9bpvc8IfbMEqx0Ukl80Hx7R-3_b_mNfJynY0Ucn31aTx5T7dpoaeqbwS2aCgYKAZwSARASFQHWtWOmBDLxtBCwuJ182WC5F-wvDw0163
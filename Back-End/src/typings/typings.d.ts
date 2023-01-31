import * as jwt from 'jsonwebtoken'

declare module 'jsonwebtoken' {
    export interface UserIDJwtPayload extends jwt.JwtPayload {
        userId: string
    }
}
export const userIdFromJWT = (jwtToken: string): string | undefined => {
    try {
        const { userId } = <jwt.UserIDJwtPayload>jwt.verify(jwtToken, 'secret')
        return userId
    } catch (error) {
        return undefined
    }
}
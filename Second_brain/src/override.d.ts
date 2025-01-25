//used this to avoid types error in jwt(imp as override the express)
export{};

declare global {
    namespace Express {
      export interface Request {
        userId?: string
      }
    }
    interface JwtPayLoad {
        id: string
    }
}
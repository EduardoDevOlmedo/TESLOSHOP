import jwt  from "jsonwebtoken"

export const signToken = (_id: string, email: string) => {
    
 
    if(!process.env.JWT_SEED){
        throw new Error('There is no JWT seed, check env vars.')
    }

    return jwt.sign(
        {_id, email},
        process.env.JWT_SEED!,
        {expiresIn: '30d'}
    )
}

export const isValidToken = (token: string):Promise<string> => {
    if(!process.env.JWT_SEED){
        throw new Error('There is no JWT seed, check env vars.')
    }

    if(token.length <= 10) {
        return Promise.reject('JWT not valid')
    }

    return new Promise((resolve, reject) => {
        try {
            jwt.verify(token, process.env.JWT_SEED || '', (err, payload) => {
                if(err) return reject('JWT not valid')

                const {_id} = payload as {_id: string};

                resolve(_id)
            })
        } catch (error) {
            reject('JWT not valid')
        }
    })
}
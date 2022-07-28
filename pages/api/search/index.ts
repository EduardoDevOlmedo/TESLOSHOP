import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    message: string
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {
        case 'GET':
            return loadError(req, res)            
        default:
            return res.status(400).json({
                message: "Bad request"
            })
    }
}

const loadError = async(req: NextApiRequest, res: NextApiResponse<Data>) => {

    return res.status(400).json({
        message: 'BAD REQUEST. SPECIFY A QUERY'
    })
}
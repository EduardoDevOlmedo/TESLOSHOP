import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database'
import { User } from '../../../models'
import bcrypt from "bcryptjs"
import {jwt} from "../../../utils"

type Data = 
|{message: string}
| {
    token : string;
    user: {
        email: string;
        name: string;
        role: string;
    }
}


export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    switch (req.method) {
        case 'POST':
            return loginUser(req, res)
        default:
            return res.status(404).json({
                message: 'Method not found'
            })
    }
}

const loginUser = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
    
    const {email = '', password = ''} = req.body

    await db.connect()

    const user = await User.findOne({email});

    await db.disconnect()

    if(!user){
        return res.status(404).json({message: 'e-mail or password not found - EMAIL'})
    }

    if(!bcrypt.compareSync(password, user.password!)){
        return res.status(404).json({message: 'e-mail or password not found - Password'})
    }

  

    const {role, name, _id} = user
 
    const token = jwt.signToken(_id, email)

    return res.status(200).json({
        token,
        user: {
            email, role, name
        }
    })
}

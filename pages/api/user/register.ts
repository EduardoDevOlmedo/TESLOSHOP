import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database'
import { User } from '../../../models'
import bcrypt from "bcryptjs"
import {jwt, validations} from "../../../utils"

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
            return registerUser(req, res)
        default:
            return res.status(404).json({
                message: 'Method not found'
            })
    }
}

const registerUser = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
    
    const {email = '', password = '', name = ''} = req.body as {email: string, password: string, name: string}

    await db.connect()

    const user = await User.findOne({email});

    await db.disconnect()


    if(password.length < 6) return res.status(401).json({message: 'Password cannot be shorther than 6 characters'})

    if(user){
        return res.status(404).json({message: 'e-mail or password already registered - EMAIL'})
    }

    if(name.length < 2) {
        return res.status(400).json({
            message: 'Name must be longer than 2 characters'
        })
    }

    if(!validations.isValidEmail(email)){
        return res.status(400).json({
            message: 'This email does not seem to be a proper email.'
        })
    }

    const newUser = new User({
        email: email.toLowerCase(),
        password: bcrypt.hashSync(password),
        role: 'client',
        name: name
    })

    try {
        await newUser.save({validateBeforeSave: true})
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'Check server logs'
        })
    }

    const { _id, role} = newUser

 
    const token = jwt.signToken(_id, email)

    return res.status(200).json({
        token,
        user: {
            email, role, name
        }
    })
}

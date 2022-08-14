import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database'
import { IPayPal } from '../../../interfaces'
import { Order } from '../../../models'

type Data = {
    message: string
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    
    switch (req.method) {
        case 'POST':
            return payOrder(req, res)            
        default:
            return res.status(400).json({ message: 'BAD REQUEST' })

    }    
}



const getPayPalBearerToken = async() => {
    const PAYPAL_CLIENT_ID= process!.env!.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
    const PAYPAL_SECRET=  process.env.PAYPAL_SECRET;

    const base64Token = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`, 'utf-8').toString('base64')

    const body =  new URLSearchParams('grant_type=client_credentials')

    try {

        const { data } = await axios.post(process.env.PAYPAL_OAUTH_URL || "",  body,
            {
                headers: { 
                    'Authorization': `Basic ${base64Token}`, 
                    'Content-Type': 'application/x-www-form-urlencoded'
                  }
            }
        )

        return data.access_token;

    } catch (error) {
        if(axios.isAxiosError(error)){
            console.log(error.response?.data)
        }
        else console.log(error.message)
    }
    


}

const payOrder = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    
    const PayPalBearerToken = await getPayPalBearerToken();

    if(!PayPalBearerToken){
        return res.status(400).json({ message: 'Paypal token was not found' })
    }

    const {transactionid = '', orderId = ''} = req.body

    const {data} = await axios.get<IPayPal.PayPalOrderStatusResponse>(`${process.env.PAYPAL_ORDERS_URL}/${transactionid}`, {
        headers: {
            'Authorization': `Bearer ${PayPalBearerToken}`
        }
    })

    if(data.status !== 'COMPLETED'){
        return res.status(401).json({message: 'Order not recognized'});
    }

    await db.connect();
    const dbOrder = await Order.findById(orderId);

    if(!dbOrder){
        await db.disconnect()
        return res.status(404).json({message: 'Order was not found'});
    }

    // if(dbOrder.total !== Number(data.purchase_units[0].amount.value)){
    //     await db.disconnect();
    //     return res.status(400).json({message: 'Total did not match.'});
    // }

    dbOrder.transactionId = transactionid;
    dbOrder.isPaid = true;

    dbOrder.save()

    await db.disconnect()
    
    return res.status(200).json({ message: 'Order successfully paid: '  +   dbOrder.isPaid})
}
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import GithubProvider from "next-auth/providers/github"
import { dbUsers } from "../../../database"

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    Credentials({
      name: 'Custom Login',
      credentials: {
        email: {label: 'Correo', type: 'email', placeholder: 'correo@mail.com'},
        password: {label: 'Contraseña', type: 'password', placeholder: 'Contraseña'},
      },
      async authorize(credentials){
        
       
        
        // TODO: VALIDAR CONTRA BASE DE DATOS
        
        return await dbUsers.checkUserEmailPassowrd(credentials!.email, credentials!.password)
      }
    })
  ],

  pages: {
    signIn:  '/auth/login',
    newUser: '/auth/register'
  },

  jwt: {

  },

  session: {
    maxAge: 2592000, //30d,
    strategy: 'jwt',
  },

  callbacks: {
    async jwt({token, account, user}){

      if(account){
        token.accessToken = account.access_token

        switch (account.type) {
          case 'oauth':
           token.user = await dbUsers.oAuthtoDbUser(user?.email!, user?.name!)
          //crear usuario o verificar en la DB

          break;
          case 'credentials':
            token.user = user;
            break;
          
        }

      }

      return token
    },
    async session({session, token, user}){

      session.accessToken = token.accessToken;
      session.user = token.user as any;
      
      return session
    }
  }
})
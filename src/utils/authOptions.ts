import { Session } from 'next-auth'
import { JWT } from 'next-auth/jwt'
import Credentials from 'next-auth/providers/credentials'
import Discord from 'next-auth/providers/discord'

export const authOptions = {
  providers: [
    Discord({
      clientId: process.env.NEXT_PUBLIC_DISCORD_ID ?? '',
      clientSecret: process.env.NEXT_PUBLIC_DISCORD_SECRET ?? ''
    }),
    Credentials({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' }
      },
      async authorize(credentials) {
        const user = {
          id: 'demo',
          name: 'demo',
          email: 'demo@example.com',
          image: 'https://cdn.discordapp.com/avatars/987693767488319558/ae25e031b533de765709610d2df9d70c.png'
        }

        if (credentials?.username === 'demo') {
          return user
        } else {
          return null
        }
      }
    })
  ],
  callbacks: {
    async session({ session, token }: { session: Session; token: JWT }) {
      if (session?.user) {
        session.user.id = token.sub
      }
      return session
    }
  }
}

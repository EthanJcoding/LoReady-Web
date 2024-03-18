import { JWT } from 'next-auth/jwt'
import NextAuth from 'next-auth/next'
import Discord from 'next-auth/providers/discord'
import { Session } from 'next-auth'

const authOptions = {
  providers: [
    Discord({
      clientId: process.env.NEXT_PUBLIC_DISCORD_ID ?? '',
      clientSecret: process.env.NEXT_PUBLIC_DISCORD_SECRET ?? ''
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

export const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }

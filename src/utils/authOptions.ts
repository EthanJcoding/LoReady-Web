import { Session } from 'next-auth'
import { JWT } from 'next-auth/jwt'
import Discord from 'next-auth/providers/discord'

export const authOptions = {
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

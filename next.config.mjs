/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.discordapp.com',
        pathname: '**'
      },
      {
        protocol: 'https',
        hostname: 'cdn-lostark.game.onstove.com',
        pathname: '**'
      }
    ]
  }
}

export default nextConfig;

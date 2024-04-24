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
      },
      {
        protocol: 'https',
        hostname: 'img.lostark.co.kr',
        pathname: '**'
      }
    ]
  }
}

export default nextConfig

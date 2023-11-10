/** @type {import('next').NextConfig} */
const nextConfig = {

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'omanzfbebeorixnqltmy.supabase.co',
        port: '',

      }
    ]
  }
}

module.exports = nextConfig

const isVercel = process.env.VERCEL === '1';
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  // Disable static export and sub-path prefixing on Vercel
  ...(isVercel ? {} : {
    output: 'export',
    basePath: isProd ? '/landing-page' : '',
    assetPrefix: isProd ? '/landing-page/' : '',
  }),
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
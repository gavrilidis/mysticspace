/** @type {import('next').NextConfig} */
const isGhPagesDeploy = process.env.DEPLOY_GH_PAGES === 'true';

const nextConfig = {
  output: 'export',
  basePath: isGhPagesDeploy ? '/mysticspace' : '',
  assetPrefix: isGhPagesDeploy ? '/mysticspace/' : '',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;

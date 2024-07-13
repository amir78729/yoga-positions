/** @type {import('next').NextConfig} */
import withPWA from 'next-pwa';
const nextConfig = {
    images: {
        domains: ['www.dropbox.com', 'dropboxusercontent.com'],
    },
};

const pwaConfig = {
    dest: "public", // Destination directory for the PWA files
    disable: process.env.NODE_ENV === "development", // Disable PWA in development mode
    register: true, // Register the PWA service worker
    skipWaiting: true, // Skip waiting for service worker activation
}
export default withPWA(pwaConfig)(nextConfig);

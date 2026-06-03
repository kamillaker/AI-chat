import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'My Chat App',
        short_name: 'ChatApp',
        start_url: '/chats',
        display: 'standalone',
        theme_color: '#000000',
        background_color: '#ffffff',
        icons: [
            { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
        ],
    };
}
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://svp.gl';

    return {
        rules: [
            {
                userAgent: '*',
                allow: ['/', '/impressum', '/datenschutz'],
                disallow: [
                    '/api/',
                    '/auth/',
                    '/profile/',
                    '/my-links/',
                ],
            },
            {
                userAgent: ['GPTBot', 'Google-Extended'],
                disallow: '/',
            }
        ],
        sitemap: `${baseUrl}/sitemap.xml`,
    };
}
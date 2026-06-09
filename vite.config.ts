import inertia from '@inertiajs/vite';
import { wayfinder } from '@laravel/vite-plugin-wayfinder';
import tailwindcss from '@tailwindcss/vite';
import vue from '@vitejs/plugin-vue';
import laravel from 'laravel-vite-plugin';
import { bunny } from 'laravel-vite-plugin/fonts';
import { defineConfig } from 'vite';

const disableRemoteFonts =
    process.env.VITE_DISABLE_REMOTE_FONTS !== undefined
        ? process.env.VITE_DISABLE_REMOTE_FONTS === 'true'
        : true;

const fontsConfig = disableRemoteFonts
    ? undefined
    : [
          bunny('Instrument Sans', {
              weights: [400, 500, 600],
          }),
      ];

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.ts'],
            refresh: true,
            ...(fontsConfig ? { fonts: fontsConfig } : {}),
        }),
        inertia(),
        tailwindcss(),
        vue({
            template: {
                transformAssetUrls: {
                    base: null,
                    includeAbsolute: false,
                },
            },
        }),
        wayfinder({
            formVariants: true,
        }),
    ],
});

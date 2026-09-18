import { vendureDashboardPlugin } from '@vendure/dashboard/vite';
import { LanguageCode } from '@vendure/common/lib/generated-types';
import { generateMessageId } from '@lingui/message-utils/generateMessageId';
import 'dotenv/config';
import { join, resolve } from 'path';
import { pathToFileURL } from 'url';
import { defineConfig, Plugin } from 'vite';

const vendureServerPort = Number(process.env.PORT || 2605);

const alvaChineseTranslations: Record<string, string> = {
    'Alva sales': 'Alva 销售',
    'Website inquiries': '网站询价',
    'Requests submitted through the B2B form and floating quote widget.': '通过 B2B 表单和浮动询价组件提交的请求。',
    inquiries: '条询价',
    'Email delivery state is shown separately from sales follow-up state.': '邮件送达状态与销售跟进状态分开显示。',
    'Search reference, company, contact or message': '搜索编号、公司、联系人或留言',
    'All statuses': '全部状态',
    Refresh: '刷新',
    'Loading inquiries…': '正在加载询价…',
    'Unable to load inquiries:': '无法加载询价：',
    Received: '接收时间',
    'Reference / source': '编号 / 来源',
    Contact: '联系人',
    Request: '请求内容',
    Email: '邮件',
    'Follow-up': '跟进状态',
    'Source page': '来源页面',
    'No inquiries found.': '未找到询价。',
    New: '新询价',
    Contacted: '已联系',
    Quoted: '已报价',
    Closed: '已关闭',
    Pending: '等待发送',
    Sent: '已发送',
    Skipped: '已跳过',
    Failed: '发送失败',
};

/**
 * Vendure 3.6 does not discover local plugin PO files on Windows because its
 * fast-glob pattern contains backslashes. Merge this small catalog into the
 * generated bundles so the same source build is bilingual on Windows and Linux.
 */
function alvaDashboardTranslationsPlugin(): Plugin {
    return {
        name: 'alva:dashboard-translations',
        enforce: 'post',
        generateBundle(_options, bundle) {
            for (const [locale, translations] of [
                ['en', Object.fromEntries(Object.keys(alvaChineseTranslations).map(message => [message, message]))],
                ['zh_Hans', alvaChineseTranslations],
            ] as const) {
                const asset = bundle[`assets/i18n/${locale}.js`];
                if (!asset || asset.type !== 'asset' || typeof asset.source !== 'string') {
                    this.error(`Unable to locate generated ${locale} Dashboard catalog.`);
                }
                const match = asset.source.match(/^\/\*eslint-disable\*\/export const messages=JSON\.parse\((.*)\);$/s);
                if (!match) {
                    this.error(`Unexpected ${locale} Dashboard catalog format.`);
                }
                const messages = JSON.parse(JSON.parse(match[1])) as Record<string, unknown>;
                for (const [message, translation] of Object.entries(translations)) {
                    messages[generateMessageId(message)] = [translation];
                }
                // Navigation strings are passed directly to i18n.t() rather than
                // through a Lingui macro, so they also need their literal IDs.
                messages['Alva sales'] = [translations['Alva sales']];
                messages['Website inquiries'] = [translations['Website inquiries']];
                asset.source = `/*eslint-disable*/export const messages=JSON.parse(${JSON.stringify(JSON.stringify(messages))});`;
            }
        },
    };
}

export default defineConfig({
    base: '/dashboard',
    build: {
        outDir: join(__dirname, 'dist/dashboard'),
    },
    plugins: [
        vendureDashboardPlugin({
            // The vendureDashboardPlugin will scan your configuration in order
            // to find any plugins which have dashboard extensions, as well as
            // to introspect the GraphQL schema based on any API extensions
            // and custom fields that are configured.
            vendureConfigPath: pathToFileURL('./src/vendure-config.ts'),
            // Points to the location of your Vendure server.
            // In production, 'auto' lets the dashboard derive the API URL from the
            // server that serves it. In development, we use explicit defaults so that
            // the Vite dev server can reach the Vendure backend.
            api: process.env.NODE_ENV === 'production'
                ? { host: 'auto', port: 'auto' }
                : { host: 'http://localhost', port: vendureServerPort },
            i18n: {
                defaultLanguage: LanguageCode.en,
                defaultLocale: 'en-GB',
                availableLanguages: [LanguageCode.en, LanguageCode.zh_Hans],
                availableLocales: ['en-GB', 'zh-CN'],
            },
            // When you start the Vite server, your Admin API schema will
            // be introspected and the types will be generated in this location.
            // These types can be used in your dashboard extensions to provide
            // type safety when writing queries and mutations.
            gqlOutputPath: './src/gql',
        }),
        alvaDashboardTranslationsPlugin(),
    ],
    resolve: {
        alias: {
            // This allows all plugins to reference a shared set of
            // GraphQL types.
            '@/gql': resolve(__dirname, './src/gql/graphql.ts'),
        },
    },
});

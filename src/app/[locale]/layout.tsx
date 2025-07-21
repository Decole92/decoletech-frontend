import initTranslations from "./i18n";
import TranslationsProvider from "../../components/TranslationProvider";
import { Geist, Geist_Mono } from "next/font/google";
// import { ThemeProvider } from "../../components/themes-provider";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata() {
  return {
    title: "Decole Tech | Full-Stack Developer & IT Solutions",

    description:
      "Decole Tech delivers cutting-edge AI-powered solutions tailored for websites and workflows, integrating mobile applications, web applications, DevOps, n8n workflows, and web translation services. Harness our expertise in JavaScript with modern frameworks, Databases, LLM, Microservices, Monolithic and cloud platforms to boost customer engagement and accelerate business growth.",
    keywords:
      "IT,   information technology, devlops, langchain, pinecone, ui/ux designing, n8n workflows, ai automation, github actions, web application development, mobile app development, AI solutions, cloud computing, DevOps services, API integration, database management, e-commerce solutions, payment gateway integration, UI/UX design, website localization, performance optimization, SEO services, React Native, Swift, Node.js, AWS, Azure, MongoDB, PostgreSQL, Shopify, Stripe, Figma, translation services, digital transformation, scalable solutions",

    icons: {
      icon: [{ url: "/favicon.png?v=4", sizes: "120x120", type: "image/png" }],
      apple: ["/favicon.ico?v=4"],
      shortcut: ["/favicon.ico"],
      sizes: ["32x32", "72x72", "96x96", "144x144", "192x192"],
    },

    twitter: {
      card: "summary_large_image",
    },
    facebook: {
      card: "summary_large_image",
    },
    instagram: {
      card: "summary_large_image",
    },
  };
}

const i18nNamespaces = ["common"];

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const locale = (await params)?.locale || "en"; // Fallback to 'en' if locale is undefined
  const { resources } = await initTranslations(locale, i18nNamespaces);

  return (
    <TranslationsProvider
      resources={resources}
      locale={locale}
      namespaces={i18nNamespaces}
    >
      <html lang={locale} suppressHydrationWarning>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-br from-slate-50 via-white to-teal-50`}
        >
          <link
            href='https://fonts.cdnfonts.com/css/theo-van-doesburg'
            rel='stylesheet'
          ></link>
          <link rel='icon' href='/favicon.png' sizes='any' />
          <Script
            id='google_analytic'
            async
            src={`https://www.googletagmanager.com/gtag/js?id=G-1XYBJQ5PY8`}
            strategy='beforeInteractive'
          />

          <Script
            id='google_analytic_inline'
            dangerouslySetInnerHTML={{
              __html: `window.dataLayer = window.dataLayer || [];
              function gtag() {
                dataLayer.push(arguments);
              }
              gtag("js", new Date());
              gtag("config", "G-1XYBJQ5PY8");`,
            }}
            strategy='beforeInteractive'
          />

          {/* <ThemeProvider
            attribute='class'
            defaultTheme='system'
            enableSystem
            disableTransitionOnChange
          > */}
          <Toaster position='bottom-center' />
          {children}
          {/* </ThemeProvider> */}
        </body>
      </html>
    </TranslationsProvider>
  );
}

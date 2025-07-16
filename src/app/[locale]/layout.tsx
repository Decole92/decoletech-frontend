import initTranslations from "./i18n";
import TranslationsProvider from "../../components/TranslationProvider";
import { Geist, Geist_Mono } from "next/font/google";
// import { ThemeProvider } from "../../components/themes-provider";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

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
    title: "Decole Tech | IT solution • Software Developement",

    description:
      "Decole Tech provides AI-powered chatbot solutions for websites and WhatsApp, seamlessly integrated with mobile apps, web applications, DevOps, n8n workflows, and web translation services. Leverage our expertise in Next.js, OpenAI, microservices, and cloud platforms to drive customer engagement and business growth.",
    keywords: "IT, DEVLOPS",

    icons: {
      icon: ["/favicon.ico?v=4"],
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
  params: { locale: string };
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

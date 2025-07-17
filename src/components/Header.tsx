"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Menu,
  X,
  ChevronDown,
  Languages,
  Code2,
  Smartphone,
  Globe,
  Database,
  Cloud,
  Bot,
  Zap,
  ShoppingCart,
  PenTool,
} from "lucide-react";
import Link from "next/link";

import { useTranslation } from "next-i18next";
import { usePathname, useRouter } from "next/navigation";
import i18nConfig from "../../i18nConfig";
import Logo from "./Logo";
import { Services } from "../../typing";
import { getServices } from "@/app/[locale]/actions/services";

const iconMap: Record<
  string,
  React.ComponentType<React.SVGProps<SVGSVGElement>>
> = {
  Web_Application_Development: Globe,
  Mobile_Application_Development: Smartphone,
  AI_Powered_Solutions: Bot,
  Website_Translation_and_Localization_n8n: Languages,
  E_Commerce_and_Payment_Integration: ShoppingCart,
  Cloud_and_DevOps_Solutions: Cloud,
  UIUX_Design_and_Prototyping: PenTool,
  Database_Design_and_Management: Database,
  API_Development_and_Integration: Code2, // Fixed invalid type
  Performance_Optimization_and_SEO: Zap,
};
export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { i18n, t } = useTranslation("common");
  const router = useRouter();
  const currentPathname = usePathname();
  const currentLocale = i18n.language;
  const [, setLang] = useState(currentLocale);
  const [services, setServices] = useState<Services[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const languages = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "cs", name: "Čeština", flag: "🇨🇿" },
    { code: "es", name: "Español", flag: "🇪🇸" },
    { code: "fr", name: "French", flag: "🇫🇷" },
    { code: "de", name: "German", flag: "🇩🇪" },
  ];

  const changeLanguage = (lang: string) => {
    setLang(lang);

    if (currentLocale === i18nConfig.defaultLocale) {
      const newPath = "/" + lang + currentPathname;
      console.log("Redirecting to:", newPath);
      router.push(newPath);
    } else {
      const newPath = currentPathname.replace(`/${currentLocale}`, `/${lang}`);
      console.log("Redirecting to:", newPath);
      router.push(newPath);
    }

    router.refresh();
  };

  useEffect(() => {
    async function fetchServices() {
      try {
        const data = await getServices();
        if (data?.statusCode === 404 || !Array.isArray(data)) {
          setServices([]);
        } else {
          setServices(data);
        }
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchServices();
  }, []);
  return (
    <nav className='w-full bg-white backdrop-blur-lg dark:bg-gray-900/95 fixed top-0 z-50  mb-2 border-b border-gray-200 dark:border-gray-700  '>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center h-16'>
          <Logo />
          {/* Desktop Navigation */}
          <div className='hidden lg:flex items-center space-x-8'>
            {/* Services Dropdown */}

            <Link
              href='/#whyus'
              className='text-gray-700 hover:text-teal-700 font-medium transition-colors'
            >
              {t("whyUs")}
            </Link>
            <Link
              href='/#testimonial'
              className='text-gray-700 hover:text-teal-700 font-medium transition-colors'
            >
              {t("testimonials")}
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant='ghost'
                  className='flex items-center space-x-1 text-gray-700 hover:text-teal-700'
                >
                  <span className='font-medium text-lg'>Services</span>
                  <ChevronDown className='w-4 h-4' />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent className='w-72'>
                {isLoading ? (
                  Array.from({ length: 3 }).map((_, i) => (
                    <DropdownMenuItem key={`loading-${i}`} disabled>
                      <div className='flex items-start space-x-3 w-full p-3 animate-pulse'>
                        <div className='w-5 h-5 bg-gray-300 rounded' />
                        <div className='flex flex-col space-y-1'>
                          <div className='w-32 h-3 bg-gray-300 rounded' />
                          <div className='w-44 h-2 bg-gray-200 rounded' />
                        </div>
                      </div>
                    </DropdownMenuItem>
                  ))
                ) : services.length === 0 ? (
                  <DropdownMenuItem>No services available</DropdownMenuItem>
                ) : (
                  services?.map((service) => {
                    const Icon = iconMap[service.category] || Globe; // Fallback to Globe
                    return (
                      <DropdownMenuItem key={service.title} asChild>
                        <Link
                          href={`/service/${service.id}`}
                          className='flex items-start space-x-3 w-full p-3'
                          target='_blank'
                        >
                          {React.createElement(Icon, {
                            className: "w-5 h-5  mt-0.5 text-teal-800",
                          })}
                          <div>
                            <div className='font-medium'>{service.title}</div>
                            <div className='text-sm text-gray-500 truncate w-44'>
                              {service.description}
                            </div>
                          </div>
                        </Link>
                      </DropdownMenuItem>
                    );
                  })
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            <Link
              href='/projects'
              className='text-gray-700 hover:text-teal-700 font-medium transition-colors'
            >
              {t("projects")}
            </Link>
          </div>

          <div className='hidden lg:flex items-center space-x-2'>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant='ghost'
                  size='lg'
                  className='flex items-center space-x-1'
                >
                  {/* Display the currently selected language */}
                  <span>
                    {
                      languages.find((lang) => lang.code === currentLocale)
                        ?.flag
                    }
                  </span>

                  <ChevronDown className='w-3 h-3' />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    className='flex items-center space-x-2'
                    onClick={() => changeLanguage(lang.code)}
                  >
                    <span>{lang.flag}</span>
                    <span>{lang.name}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <div className='inline-block bg-gradient-to-r from-cyan-600 to-blue-600 p-[2px] rounded-full group transition-all duration-300'>
              <Button
                asChild
                className='bg-white text-cyan-600 rounded-full px-6 py-2 font-medium shadow-lg transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-cyan-600 group-hover:to-blue-700 group-hover:text-white'
              >
                <Link href='/contact'>{t("contactUs")}</Link>
              </Button>
            </div>
            {/* <ModeToggle /> */}
          </div>

          <div className='lg:hidden'>
            <Button
              variant='ghost'
              size='lg'
              onClick={() => setIsOpen(!isOpen)}
              className='text-gray-700'
            >
              {isOpen ? (
                <X className='h-6 w-6 ' />
              ) : (
                <Menu className='w-6 h-6' />
              )}
            </Button>
          </div>
        </div>

        {isOpen && (
          <div className='lg:hidden py-4 border-t border-gray-200'>
            <div className='flex flex-col space-y-4'>
              {/* Services */}
              <div>
                <div className='text-gray-900 font-medium mb-2'>
                  {t("services")}
                </div>
                <div className='pl-4 space-y-2'>
                  {services && services?.length === 0 ? (
                    <span>No services available</span>
                  ) : (
                    services &&
                    services.map((service) => {
                      const Icon = iconMap[service.category] || Globe;

                      return (
                        <Link
                          key={service.id}
                          href={`/service/${service.id}`}
                          className='flex items-center space-x-2 text-gray-600 hover:text-teal-700 py-1'
                          onClick={() => setIsOpen(false)}
                        >
                          {React.createElement(Icon, {
                            className: "w-5 h-5 text-teal-600 mt-0.5",
                          })}
                          <span>{service.title}</span>
                        </Link>
                      );
                    })
                  )}
                </div>
              </div>

              <Link
                href='/#testimonial'
                className='text-gray-700 hover:text-teal-700 font-medium'
                onClick={() => setIsOpen(false)}
              >
                {t("testimonials")}
              </Link>
              <Link
                href='/projects'
                className='text-gray-700 hover:text-teal-700 font-medium'
                onClick={() => setIsOpen(false)}
              >
                {t("projects")}
              </Link>
              <Link
                href='/#whyus'
                className='text-gray-700 hover:text-teal-700 font-medium'
                onClick={() => setIsOpen(false)}
              >
                {t("whyUs")}
              </Link>

              {/* Language Selector Mobile */}
              <div>
                <div className='text-gray-900 font-medium mb-2'>
                  {t("languages")}
                </div>
                <div className='pl-4 space-y-2'>
                  {languages.map((lang) => (
                    <Button
                      variant={"ghost"}
                      onClick={() => changeLanguage(lang.code)}
                      key={lang.code}
                      className='flex items-center space-x-2 text-gray-600 hover:text-teal-700 py-1'
                    >
                      <span>{lang.flag}</span>
                      <span>{lang.name}</span>
                    </Button>
                  ))}
                </div>
              </div>

              <div className='inline-block bg-gradient-to-r from-cyan-600 to-blue-600 p-[2px] rounded-full group transition-all duration-300'>
                <Button
                  asChild
                  className='bg-white text-cyan-600 w-full rounded-full px-6 py-2 font-medium shadow-lg transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-cyan-600 group-hover:to-blue-700 group-hover:text-white'
                >
                  <Link href='/contact'>{t("contactUs")}</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

import { notFound } from "next/navigation";
import type { Metadata } from "next";
import logo from "../../../../../public/logo.png";
import ServiceClient from "@/components/PageComponent/ServiceClient";
import { getService } from "@/app/[locale]/actions/services";
import { Services } from "../../../../../typing";

interface PageProps {
  params: Promise<{ locale: string; id: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const service = await getService(id);
  if (!service) {
    return {
      title: "Service Not Found",
    };
  }

  return {
    title: `${service.title} | Decole Tech`,
    description: service.description,
    openGraph: {
      title: service.title,
      description: service.description,
      images: [
        {
          url: logo.src,
          width: logo.width,
          height: logo.height,
          alt: service.title,
        },
      ],
    },
  };
}

export default async function ServicePage({ params }: PageProps) {
  const { id } = await params;
  console.log("id", id);

  const service = await getService(id);
  console.log("service", service);

  if (!service) {
    notFound();
  }

  return <ServiceClient service={service as Services} />;
}

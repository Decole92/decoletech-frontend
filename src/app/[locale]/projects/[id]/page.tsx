import { notFound } from "next/navigation";
import { Metadata } from "next";

import { getProject } from "../../actions/projects";
import ProjectClientId from "@/components/PageComponent/ProjectClientId";

// Define the params type for the dynamic route [locale]/projects/[id]
interface PageProps {
  params: Promise<{ locale: string; id: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const project = await getProject(id);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.title} | Portfolio`,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      images: project.bgcover_src ? [project.bgcover_src] : [],
    },
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { id } = await params;
  const project = await getProject(id);

  if (!project) {
    notFound();
  }

  return <ProjectClientId project={project} />;
}

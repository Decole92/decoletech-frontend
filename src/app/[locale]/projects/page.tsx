import { notFound } from "next/navigation";

import { getProjects } from "../actions/projects";
import ProjectsClient from "@/components/PageComponent/ProjectClient";
import { Project } from "../../../../typing";

// export async function generateMetadata(): Promise<Metadata> {
//   return {
//     title: `Projects | PragueIT`,
//     description: "",
//     openGraph: {
//       title: "Projects | PragueIT",
//       description: "",
//       // images: project.bgcover_src ? [project.bgcover_src] : [],
//     },
//   };
// }

export default async function ProjectsPage() {
  const project = await getProjects();

  if (!project) {
    notFound();
  }

  return <ProjectsClient project={project as Project[]} />;
}

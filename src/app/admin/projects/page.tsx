import { getProjects, addProject, deleteProject } from "@/app/actions";
import { Trash2, Plus } from "lucide-react";
import Image from "next/image";

export const dynamic = "force-dynamic";

export default async function AdminProjectsPage() {
    const result = await getProjects();
    const projects = result.projects || [];

    return (
        <div>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
                <h2 className="text-2xl font-bold text-white">Project Catalog ({projects.length})</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                {/* Add Project Form */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 lg:col-span-1">
                    <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                        <Plus className="w-5 h-5 text-blue-400" /> Add New Project
                    </h3>
                    <form action={async (formData) => {
                        "use server";
                        await addProject(formData);
                    }} className="flex flex-col gap-4">
                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="title" className="text-sm font-medium text-gray-400">Project Title *</label>
                            <input type="text" id="title" name="title" required className="bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500" />
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="category" className="text-sm font-medium text-gray-400">Category *</label>
                            <input type="text" id="category" name="category" required placeholder="e.g. Web App, E-commerce..." className="bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500" />
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="imageUrl" className="text-sm font-medium text-gray-400">Image URL * (Absolute Path or /name.png)</label>
                            <input type="text" id="imageUrl" name="imageUrl" required placeholder="/project-1.png" className="bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500" />
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="link" className="text-sm font-medium text-gray-400">Live Link (Optional)</label>
                            <input type="url" id="link" name="link" placeholder="https://example.com" className="bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500" />
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="description" className="text-sm font-medium text-gray-400">Short Description *</label>
                            <textarea id="description" name="description" required rows={3} className="bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500 resize-none" />
                        </div>

                        <button type="submit" className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-lg transition-colors text-sm">
                            Save Project to Catalog
                        </button>
                    </form>
                </div>

                {/* Project List */}
                <div className="lg:col-span-2 grid gap-4">
                    {projects.length === 0 ? (
                        <div className="text-center py-20 text-gray-500 bg-white/5 border border-white/10 rounded-2xl">
                            <p>No projects in the catalog. Add some using the form.</p>
                        </div>
                    ) : (
                        projects.map((project) => (
                            <div key={project.id} className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col sm:flex-row gap-4 items-center">
                                <div className="w-32 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-gray-900 border border-white/10 relative">
                                    <Image
                                        src={project.imageUrl}
                                        alt={project.title}
                                        fill
                                        className="object-cover"
                                        sizes="128px"
                                    />
                                </div>
                                <div className="flex-grow min-w-0 text-center sm:text-left">
                                    <h4 className="font-bold text-lg text-white truncate">{project.title}</h4>
                                    <p className="text-sm text-blue-400 font-medium">{project.category}</p>
                                    <p className="text-xs text-gray-500 mt-1 line-clamp-1">{project.description}</p>
                                </div>
                                <div className="flex-shrink-0">
                                    <form action={async () => {
                                        "use server";
                                        await deleteProject(project.id);
                                    }}>
                                        <button type="submit" className="p-3 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-xl transition-colors" title="Delete Project">
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </form>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

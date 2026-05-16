import { getTechnologies, addTechnology, deleteTechnology } from "@/app/actions";
import { Trash2, Plus } from "lucide-react";
import Image from "next/image";

export const dynamic = "force-dynamic";

export default async function AdminTechnologiesPage() {
    const { technologies } = await getTechnologies();

    return (
        <div>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
                <h2 className="text-2xl font-bold text-white">Technology Stack Manager</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

                {/* Add Technology Form */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 lg:col-span-1">
                    <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                        <Plus className="w-5 h-5 text-blue-400" /> Add Technology
                    </h3>
                    <form action={async (formData) => {
                        "use server";
                        await addTechnology(formData);
                    }} className="flex flex-col gap-4">

                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="name" className="text-sm font-medium text-gray-400">Technology Name *</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                required
                                placeholder="e.g. Next.js"
                                className="bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500"
                            />
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="iconUrl" className="text-sm font-medium text-gray-400">Icon URL *</label>
                            <input
                                type="text"
                                id="iconUrl"
                                name="iconUrl"
                                required
                                placeholder="/nextjs-icon.svg or https://..."
                                className="bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500"
                            />
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="order" className="text-sm font-medium text-gray-400">Display Order</label>
                            <input
                                type="number"
                                id="order"
                                name="order"
                                defaultValue="0"
                                className="bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500"
                            />
                        </div>

                        <button type="submit" className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-lg transition-colors text-sm shadow-lg">
                            Add to Stack
                        </button>
                    </form>
                </div>

                {/* Technologies List */}
                <div className="lg:col-span-2 grid gap-4">
                    {!technologies || technologies.length === 0 ? (
                        <div className="text-center py-20 text-gray-500 bg-white/5 border border-white/10 rounded-2xl">
                            <p>No technologies added yet. Add some to display on the frontend.</p>
                        </div>
                    ) : (
                        technologies.map((tech: { id: string; name: string; iconUrl: string; order: number; }) => (
                            <div key={tech.id} className="bg-white/5 border border-white/10 rounded-2xl p-4 flex gap-4 items-center hover:bg-white/10 transition-colors">
                                <div className="w-16 h-16 flex-shrink-0 rounded-xl bg-black/50 border border-white/10 flex items-center justify-center p-3 relative">
                                    <Image
                                        src={tech.iconUrl}
                                        alt={tech.name}
                                        fill
                                        className="object-contain p-3"
                                        unoptimized
                                    />
                                </div>
                                <div className="flex-grow min-w-0">
                                    <h4 className="font-bold text-lg text-white truncate">{tech.name}</h4>
                                    <p className="text-xs text-gray-500 mt-1">Order: {tech.order}</p>
                                </div>
                                <div className="flex-shrink-0">
                                    <form action={async () => {
                                        "use server";
                                        await deleteTechnology(tech.id);
                                    }}>
                                        <button type="submit" className="p-3 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-xl transition-colors" title="Remove Technology">
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

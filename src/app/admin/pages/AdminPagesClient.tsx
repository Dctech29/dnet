"use client";

import { useState } from "react";
import { addPage, deletePage } from "@/app/actions";

interface Page {
    id: string;
    title: string;
    slug: string;
    content: string;
}

export default function AdminPagesClient({ initialPages }: { initialPages: Page[] }) {
    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");
    const [content, setContent] = useState("");
    const [isEditing, setIsEditing] = useState(false);

    const handleEdit = (page: Page) => {
        setTitle(page.title);
        setSlug(page.slug);
        setContent(page.content);
        setIsEditing(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleCancel = () => {
        setTitle("");
        setSlug("");
        setContent("");
        setIsEditing(false);
    };

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-white">Manage Pages</h1>
            
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h2 className="text-xl font-semibold text-white mb-4">
                    {isEditing ? "Edit Page" : "Create New Page"}
                </h2>
                <form action={async (formData) => {
                    await addPage(formData);
                    handleCancel();
                }} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Title</label>
                            <input 
                                type="text" 
                                name="title" 
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required 
                                className="w-full bg-black border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
                                placeholder="e.g. Privacy Policy"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Slug</label>
                            <input 
                                type="text" 
                                name="slug" 
                                value={slug}
                                onChange={(e) => setSlug(e.target.value)}
                                required 
                                readOnly={isEditing}
                                className={`w-full border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500 ${isEditing ? 'bg-white/10 text-gray-500 cursor-not-allowed' : 'bg-black'}`}
                                placeholder="e.g. privacy-policy"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Content (HTML)</label>
                        <textarea 
                            name="content" 
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            required 
                            rows={15}
                            className="w-full bg-black border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500 font-mono text-sm"
                            placeholder="Write your page content here..."
                        ></textarea>
                    </div>
                    <div className="flex gap-3">
                        <button type="submit" className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors">
                            {isEditing ? "Update Page" : "Save New Page"}
                        </button>
                        {isEditing && (
                            <button type="button" onClick={handleCancel} className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium transition-colors">
                                Cancel Edit
                            </button>
                        )}
                    </div>
                </form>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h2 className="text-xl font-semibold text-white mb-4">Existing Pages</h2>
                {initialPages && initialPages.length > 0 ? (
                    <div className="space-y-4">
                        {initialPages.map((page) => (
                            <div key={page.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-black border border-white/10 rounded-lg p-4 gap-4">
                                <div>
                                    <h3 className="font-semibold text-white">{page.title}</h3>
                                    <p className="text-sm text-gray-400">/{page.slug}</p>
                                </div>
                                <div className="flex gap-3">
                                    <button 
                                        onClick={() => handleEdit(page)}
                                        className="text-blue-400 hover:text-blue-300 text-sm font-medium px-3 py-1 bg-blue-400/10 rounded-lg"
                                    >
                                        Edit
                                    </button>
                                    <form action={async () => {
                                        if (confirm("Are you sure you want to delete this page?")) {
                                            await deletePage(page.id);
                                        }
                                    }}>
                                        <button type="submit" className="text-red-400 hover:text-red-300 text-sm font-medium px-3 py-1 bg-red-400/10 rounded-lg">
                                            Delete
                                        </button>
                                    </form>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-400">No pages found. Create one above.</p>
                )}
            </div>
        </div>
    );
}

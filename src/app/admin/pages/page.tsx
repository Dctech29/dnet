import { getPages } from "@/app/actions";
import AdminPagesClient from "./AdminPagesClient";

export default async function AdminPages() {
    const { pages } = await getPages();

    return <AdminPagesClient initialPages={pages || []} />;
}

import { getMessages } from "@/app/actions";
import AdminInbox from "./AdminInbox";

export const dynamic = "force-dynamic";

export default async function AdminMessagesPage() {
    const result = await getMessages();
    const messages = result.messages || [];

    return <AdminInbox initialMessages={messages} />;
}

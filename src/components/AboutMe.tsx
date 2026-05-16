import { getSiteSettings } from "@/app/actions";
import AboutMeClient from "./AboutMeClient";

export default async function AboutMe() {
    const { settings } = await getSiteSettings();
    const dPhone = settings?.phone || "+91 89504 96925";

    return <AboutMeClient phone={dPhone} />;
}

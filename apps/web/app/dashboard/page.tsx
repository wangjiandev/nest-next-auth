import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

const DashboardPage = async () => {
    const session = await getSession();
    if (!session || !session.user) {
        redirect("/auth/signin");
    }
    return <div>Dashboard</div>;
};

export default DashboardPage;

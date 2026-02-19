import { useForm, Link, usePage } from "@inertiajs/react";
import {
    Calendar,
    GraduationCap,
    LayoutDashboard,
    LogOut,
    History,
} from "lucide-react";


const Layout = ({ children }) => {
    const { post, processing } = useForm();
    const {url} = usePage()

    const handleLogout = () => {
        post("/logout");
    };

    return (
        <div className="flex min-h-screen bg-slate-50 font-sans">
            <aside className="w-64 bg-white border-r border-slate-200 flex flex-col fixed h-full transition-all">
                <div className="p-6 flex items-center gap-3 border-b border-slate-50">
                    <div className="bg-blue-600 p-2 rounded-lg text-white">
                        <GraduationCap size={24} />
                    </div>
                    <span className="font-bold text-lg tracking-tight text-blue-900">
                        PRESENSI
                    </span>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    <NavItem
                        icon={<LayoutDashboard size={20} />}
                        label="Dashboard"
                        active={url === "/dashboard"}
                        href="/dashboard"
                    />
                    <NavItem
                        icon={<Calendar size={20} />}
                        label="Jadwal Kuliah"
                        active={url === "/jadwal"}
                        href="/jadwal"
                    />
                    <NavItem
                        icon={<History size={20} />}
                        label="Riwayat"
                        active={url === "/riwayat"}
                        href="/riwayat"
                    />
                </nav>

                <div className="p-4 border-t border-slate-100">
                    <button
                        className="flex items-center gap-3 w-full px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors font-semibold text-sm"
                        onClick={() => handleLogout()}
                        disabled={processing}
                    >
                        <LogOut size={20} />
                        Keluar
                    </button>
                </div>
            </aside>
            {children}
        </div>
    );
};

const NavItem = ({ icon, label, active = false, href }) => (
    <Link
        href={href}
        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-medium ${
            active
                ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                : "text-slate-500 hover:bg-slate-100 hover:text-blue-600"
        }`}
    >
        {icon}
        {label}
    </Link>
);

export default Layout;

import React from "react";
import {
    LayoutDashboard,
    ClipboardCheck,
    Calendar,
    UserCircle,
    LogOut,
    GraduationCap,
    BookOpen,
    Clock,
    AlertCircle,
    FileText,
} from "lucide-react";
import { useForm, usePage } from "@inertiajs/react";

const Dashboard = () => {
    const { post } = useForm();
    const { auth, data } = usePage().props;

    const isMahasiswa = auth.mahasiswa ? true : false;
    const user = isMahasiswa ? auth.mahasiswa : auth.dosen;

    console.log(data);

    const handleLogout = () => {
        post("/logout");
    };

    return (
        <div className="flex min-h-screen bg-slate-50 font-sans">
            {/* --- SIDEBAR --- */}
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
                        active
                    />
                    <NavItem
                        icon={<ClipboardCheck size={20} />}
                        label="Presensi Saya"
                    />
                    <NavItem
                        icon={<Calendar size={20} />}
                        label="Jadwal Kuliah"
                    />
                    <NavItem icon={<UserCircle size={20} />} label="Profil" />
                </nav>

                <div className="p-4 border-t border-slate-100">
                    <button
                        className="flex items-center gap-3 w-full px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors font-semibold text-sm"
                        onClick={() => handleLogout()}
                    >
                        <LogOut size={20} />
                        Keluar
                    </button>
                </div>
            </aside>

            {/* --- MAIN CONTENT --- */}
            <main className="flex-1 ml-64 p-8">
                {/* Header Section */}
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-slate-800">
                        Dashboard
                    </h1>
                    <p className="text-slate-500 text-lg">
                        Selamat datang kembali di portal akademik Anda.
                    </p>
                </div>

                {/* Statistik Cards Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
                    <StatCard
                        icon={<BookOpen className="text-blue-600" />}
                        label="SKS"
                        value={data?.jumlah_sks}
                        color="bg-blue-100"
                    />
                    <StatCard
                        icon={<FileText className="text-purple-600" />}
                        label="Matakuliah"
                        value={data?.jumlah_mata_kuliah}
                        color="bg-purple-100"
                    />
                    <StatCard
                        icon={<Clock className="text-red-600" />}
                        label="Alpha"
                        value="0"
                        color="bg-red-100"
                    />
                    <StatCard
                        icon={<AlertCircle className="text-orange-600" />}
                        label="Sakit"
                        value="0"
                        color="bg-orange-100"
                    />
                    <StatCard
                        icon={<ClipboardCheck className="text-teal-600" />}
                        label="Izin"
                        value="0"
                        color="bg-teal-100"
                    />
                </div>

                {/* Identity Section (Inspired by Image) */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="p-6 border-b border-slate-100 flex items-center gap-4">
                        <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 border border-blue-100">
                            <UserCircle size={40} />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-slate-800 uppercase tracking-tight">
                                {user?.nama}
                            </h2>
                            <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded">
                                {isMahasiswa ? "MAHASISWA" : "DOSEN"}
                            </span>
                        </div>
                    </div>

                    <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
                        <InfoItem label="NIM" value={user?.nim} />
                        <InfoItem label="Semester" value={data?.semester} />
                        <InfoItem label="Prodi" value={user?.prodi} />
                        <InfoItem
                            label="Tahun Ajaran"
                            value={data?.tahun_ajaran}
                        />
                    </div>
                </div>
            </main>
        </div>
    );
};

// Sub-komponen agar kode rapi
const NavItem = ({ icon, label, active = false }) => (
    <a
        href="#"
        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-medium ${
            active
                ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                : "text-slate-500 hover:bg-slate-100 hover:text-blue-600"
        }`}
    >
        {icon}
        {label}
    </a>
);

const StatCard = ({ icon, label, value, color }) => (
    <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col gap-3">
        <div
            className={`w-10 h-10 ${color} rounded-lg flex items-center justify-center`}
        >
            {icon}
        </div>
        <div>
            <div className="text-2xl font-bold text-slate-800">{value}</div>
            <div className="text-sm font-medium text-slate-400 uppercase tracking-wider">
                {label}
            </div>
        </div>
    </div>
);

const InfoItem = ({ label, value }) => (
    <div className="flex flex-col gap-1 border-b border-slate-50 pb-2">
        <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">
            {label}
        </span>
        <span className="text-lg font-semibold text-slate-700">{value}</span>
    </div>
);

export default Dashboard;

import {
    ClipboardCheck,
    UserCircle,
    BookOpen,
    GraduationCap,
    Users,
} from "lucide-react";
import { usePage } from "@inertiajs/react";
import Layout from "../../Components/Layout";

const Dashboard = () => {
    const { auth, data } = usePage().props;

    return (
        <Layout>
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
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                    <StatCard
                        icon={<Users className="text-blue-600" />}
                        label="Kelas Diajar"
                        value={data?.kelas_diajar}
                        color="bg-blue-100"
                    />

                    <StatCard
                        icon={<BookOpen className="text-purple-600" />}
                        label="Mata Kuliah Diajar"
                        value={data?.mata_kuliah_diajar }
                        color="bg-purple-100"
                    />

                    <StatCard
                        icon={<GraduationCap className="text-emerald-600" />}
                        label="Mahasiswa Diajar"
                        value={data?.mahasiswa_diajar}
                        color="bg-emerald-100"
                    />

                    <StatCard
                        icon={<ClipboardCheck className="text-orange-600" />}
                        label="Absen dibuka"
                        value={data?.absen_dibuka }
                        color="bg-orange-100"
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
                                {auth?.dosen.nama}
                            </h2>
                            <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded">
                                DOSEN
                            </span>
                        </div>
                    </div>

                    <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
                        <InfoItem label="NIP" value={auth?.dosen.nip} />
                        <InfoItem label="Semester" value={data?.semester} />
                        <InfoItem label="Prodi" value={auth?.dosen.prodi} />
                        <InfoItem
                            label="Tahun Ajaran"
                            value={data?.tahun_ajaran}
                        />
                    </div>
                </div>
            </main>
        </Layout>
    );
};

// Sub-komponen agar kode rapi

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

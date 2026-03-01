import React from "react";
import { usePage } from "@inertiajs/react";
import {
    Clock,
    Calendar as CalendarIcon,
    CheckCircle2,
    XCircle,
    Clock8,
    Search,
    BookOpen,
    MapPin,
} from "lucide-react";
import Layout from "../../Components/Layout";

const RiwayatPresensiMahasiswa = () => {
    const { data = {} } = usePage().props;
    const { riwayat_presensi = [] } = data;
    console.log(riwayat_presensi);

    // Helper untuk styling status
    const getStatusStyle = (status) => {
        switch (status?.toLowerCase()) {
            case "hadir":
                return "bg-emerald-50 text-emerald-600 border-emerald-100";
            case "izin":
                return "bg-amber-50 text-amber-600 border-amber-100";
            default:
                return "bg-rose-50 text-rose-600 border-rose-100";
        }
    };

    return (
        <Layout>
            <main className="flex-1 ml-64 p-8 bg-slate-50 min-h-screen">
                {/* Header Section */}
                <div className="mb-8 flex justify-between items-end">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-800">
                            Riwayat Kehadiran
                        </h1>
                        <p className="text-slate-500">
                            Pantau absensi Anda di setiap sesi perkuliahan.
                        </p>
                    </div>

                    <div className="relative">
                        <Search
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                            size={18}
                        />
                        <input
                            type="text"
                            placeholder="Cari matkul..."
                            className="pl-10 pr-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 bg-white text-sm w-64"
                        />
                    </div>
                </div>

                {/* Table Section */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-100">
                                    <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
                                        Tanggal & Waktu
                                    </th>
                                    <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
                                        Mata Kuliah
                                    </th>
                                    <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
                                        Ruangan
                                    </th>
                                    <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-center">
                                        Status
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {riwayat_presensi.length > 0 ? (
                                    riwayat_presensi.map((row, idx) => (
                                        <tr
                                            key={idx}
                                            className="hover:bg-slate-50/50 transition-colors group"
                                        >
                                            <td className="p-4">
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-bold text-slate-700">
                                                        {row.tanggal}
                                                    </span>
                                                    <span className="text-xs text-slate-400 flex items-center gap-1">
                                                        <Clock size={12} />{" "}
                                                        {row.jam}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <div className="text-sm font-bold text-blue-900">
                                                    {row.mata_kuliah}
                                                </div>
                                               
                                            </td>
                                            <td className="p-4 text-sm text-slate-600">
                                                <div className="flex items-center gap-1.5">
                                                    <MapPin
                                                        size={14}
                                                        className="text-slate-400"
                                                    />
                                                    {row.ruangan}
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <div className="flex justify-center">
                                                    <span
                                                        className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusStyle(row.status_kehadiran)}`}
                                                    >
                                                        {row.status_kehadiran}
                                                    </span>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="4"
                                            className="p-16 text-center text-slate-400 italic"
                                        >
                                            Belum ada data kehadiran.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </Layout>
    );
};

export default RiwayatPresensiMahasiswa;

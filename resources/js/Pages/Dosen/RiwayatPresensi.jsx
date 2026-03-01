import React from "react";
import { usePage, Link } from "@inertiajs/react";
import {
    History,
    Search,
    Users,
    Calendar as CalendarIcon,
    BookOpen,
    MapPin,
    ArrowRight,
    CheckCircle2,
    Clock,
} from "lucide-react";
import Layout from "../../Components/Layout";

const RiwayatPresensi = () => {
    const { data = {} } = usePage().props;
    const { riwayat_presensi = [] } = data;
    console.log(riwayat_presensi);

    return (
        <Layout>
            <main className="flex-1 ml-64 p-8 bg-slate-50 min-h-screen">
                {/* Header Section */}
                <div className="mb-8 flex justify-between items-end">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-800">
                            Riwayat Presensi
                        </h1>
                        <p className="text-slate-500">
                            Laporan aktivitas perkuliahan dan kehadiran
                            mahasiswa yang telah dilaksanakan.
                        </p>
                    </div>

                    {/* Filter Sederhana (Opsional) */}
                    <div className="relative">
                        <Search
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                            size={18}
                        />
                        <input
                            type="text"
                            placeholder="Cari mata kuliah..."
                            className="pl-10 pr-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white text-sm w-64"
                        />
                    </div>
                </div>

                {/* Main Content */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-100">
                                    <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
                                        Waktu & Tanggal
                                    </th>
                                    <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
                                        Mata Kuliah
                                    </th>
                                    <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
                                        Kelas
                                    </th>
                                    <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-center">
                                        Kehadiran
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {riwayat_presensi.length > 0 ? (
                                    riwayat_presensi.map((row, idx) => (
                                        <tr
                                            key={idx}
                                            className="hover:bg-blue-50/30 transition-colors group"
                                        >
                                            {/* Waktu & Tanggal */}
                                            <td className="p-4">
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-bold text-slate-700">
                                                        {row?.tanggal ??
                                                            "00-00-0000"}
                                                    </span>
                                                    <span className="text-xs text-slate-400 flex items-center gap-1">
                                                        <Clock size={12} />
                                                        {row?.jam ?? "--:--"}
                                                    </span>
                                                </div>
                                            </td>

                                            {/* Mata Kuliah */}
                                            <td className="p-4">
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-bold text-blue-900 group-hover:text-blue-600 transition-colors">
                                                        {row?.mata_kuliah ??
                                                            "Mata Kuliah"}
                                                    </span>
                                                </div>
                                            </td>

                                            {/* Kelas */}
                                            <td className="p-4">
                                                <span className="text-sm font-bold text-slate-700">
                                                    {row?.kelas ?? ""}
                                                </span>
                                            </td>

                                            {/* Kehadiran */}
                                            <td className="p-4 text-sm text-slate-600 text-center">
                                                <span className="text-sm font-bold">
                                                    {row?.jumlah_hadir ?? 0}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="5"
                                            className="p-16 text-center"
                                        >
                                            <div className="flex flex-col items-center gap-2">
                                                <History
                                                    size={48}
                                                    className="text-slate-200"
                                                />
                                                <p className="text-slate-400 italic">
                                                    Belum ada riwayat presensi
                                                    yang tercatat.
                                                </p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Footer Tabel / Pagination (Placeholder) */}
                    <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-between items-center text-sm text-slate-500">
                        <span>
                            Menampilkan {riwayat_presensi.length} sesi
                            perkuliahan
                        </span>
                        <div className="flex gap-2">
                            {/* Tambahkan logika pagination di sini jika diperlukan */}
                        </div>
                    </div>
                </div>
            </main>
        </Layout>
    );
};

export default RiwayatPresensi;

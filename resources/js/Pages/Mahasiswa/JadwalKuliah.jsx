import { usePage } from "@inertiajs/react";
import {
    MapPin,
    User,
    Clock,
    Calendar as CalendarIcon,
    BookOpen,
    ScanLine,
} from "lucide-react";
import Layout from "../../Components/Layout";

const JadwalKuliah = () => {
    // Mengambil data dari props Inertia
    const { data } = usePage().props;
    const { jadwal_reguler, jadwal_hari_ini } = data;

    return (
        <Layout>
            <main className="flex-1 ml-64 p-8 bg-slate-50 min-h-screen">
                {/* Header Section */}
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-slate-800">
                        Jadwal Kuliah
                    </h1>
                    <p className="text-slate-500">
                        Lihat jadwal rutin dan agenda perkuliahan Anda.
                    </p>
                </div>

                {/* Section: Hari Ini (Dua Card) */}
                <section className="mb-10">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-bold text-slate-700 flex items-center gap-2">
                            <Clock size={20} className="text-blue-600" />
                            Hari Ini
                        </h2>
                        {/* <span className="text-sm font-medium text-slate-400 italic">
                            Minggu ke-12
                        </span> */}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {jadwal_hari_ini?.map((item, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-2xl shadow-sm border-l-4 border-l-blue-600 border border-slate-200 p-6 hover:shadow-md transition-shadow"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider">
                                        {`${item.jam_mulai?.slice(0, 5)} - ${item.jam_selesai?.slice(0, 5)}`}
                                    </div>
                                    <BookOpen
                                        size={20}
                                        className="text-slate-300"
                                    />
                                </div>
                                <h3 className="text-xl font-bold text-slate-800 mb-2 leading-tight">
                                    {item.mata_kuliah}
                                </h3>
                                <div className="space-y-2 mt-4">
                                    <div className="flex items-center gap-3 text-slate-500">
                                        <User size={16} />
                                        <span className="text-sm font-medium">
                                            {item.dosen}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-3 text-slate-500">
                                        <MapPin size={16} />
                                        <span className="text-sm font-medium">
                                            {item.ruangan}
                                        </span>
                                    </div>
                                </div>
                                <div className="mt-6 pt-4 border-t border-slate-50">
                                    <button className="flex items-center justify-center  gap-2 w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors font-bold text-sm shadow-sm shadow-blue-100">
                                        <ScanLine size={18} />
                                        Scan Kode Qr
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Section: Jadwal Reguler (Tabel) */}
                <section>
                    <div className="flex items-center gap-2 mb-4">
                        <CalendarIcon size={20} className="text-blue-600" />
                        <h2 className="text-lg font-bold text-slate-700">
                            Jadwal Reguler
                        </h2>
                    </div>

                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50 border-b border-slate-100">
                                        <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
                                            No
                                        </th>
                                        <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
                                            Hari
                                        </th>
                                        <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
                                            Mata Kuliah
                                        </th>
                                        <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
                                            Dosen
                                        </th>
                                        <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
                                            Ruangan
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {jadwal_reguler.length > 0 ? (
                                        jadwal_reguler.map((row, idx) => (
                                            <tr
                                                key={`${idx}`}
                                                className="hover:bg-blue-50/30 transition-colors"
                                            >
                                                <td className="p-4 text-sm text-slate-500">
                                                    {idx + 1}
                                                </td>
                                                <td className="p-4 text-sm font-bold text-slate-700">
                                                    {row.hari}
                                                </td>
                                                <td className="p-4">
                                                    <div className="text-sm font-bold text-blue-900">
                                                        {row.mata_kuliah}
                                                    </div>
                                                    <div className="text-xs text-slate-400 font-medium">
                                                        {`${row.jam_mulai?.slice(0, 5)} - ${row.jam_selesai?.slice(0, 5)}`}
                                                    </div>
                                                </td>
                                                <td className="p-4 text-sm text-slate-600">
                                                    {row.dosen}
                                                </td>
                                                <td className="p-4">
                                                    <span className="inline-flex items-center gap-1 text-xs font-semibold bg-slate-100 text-slate-500 px-2 py-1 rounded">
                                                        <MapPin size={12} />
                                                        {row.ruangan}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan="5"
                                                className="p-12 text-center text-slate-400 italic"
                                            >
                                                Tidak ada data jadwal reguler.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                        {/* Footer Tabel (Pagination Style) */}
                        <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex justify-end">
                            <div className="flex gap-2 items-center text-xs font-bold text-slate-400 uppercase">
                                Halaman 1 dari 1
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </Layout>
    );
};

export default JadwalKuliah;

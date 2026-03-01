import React, { useState, useEffect } from "react";
import { usePage, router } from "@inertiajs/react";
import {
    MapPin,
    User,
    Clock,
    Calendar as CalendarIcon,
    BookOpen,
    ScanLine,
    X,
    Menu,
    AlertCircle,
    CheckCircle2,
} from "lucide-react";
import { Html5QrcodeScanner } from "html5-qrcode";
import Layout from "../../Components/Layout";

const JadwalKuliah = () => {
    // 1. Ambil data dan flash message dari props Inertia
    const { data, flash } = usePage().props;
    const { jadwal_reguler, jadwal_hari_ini } = data;

    // State untuk kontrol tampilan flash message
    const [showFlash, setShowFlash] = useState(false);
    // State untuk mengontrol tampilan Modal Scanner
    const [isScanning, setIsScanning] = useState(false);

    // 2. Logic untuk Flash Message (Pop-up Error/Success)
    useEffect(() => {
        if (flash?.error || flash?.success) {
            setShowFlash(true);

            // Auto hide setelah 5 detik
            const timer = setTimeout(() => {
                setShowFlash(false);
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [flash]);

    // 3. Logic Scanner menggunakan useEffect
    useEffect(() => {
        let scanner = null;

        if (isScanning) {
            scanner = new Html5QrcodeScanner("reader", {
                fps: 10,
                qrbox: { width: 250, height: 250 },
                aspectRatio: 1.0,
            });

            scanner.render(
                (decodedText) => {
                    // Jika sukses scan
                    scanner.clear();
                    setIsScanning(false);

                    // Kirim request ke URL hasil scan
                    router.get(
                        decodedText,
                        {},
                        {
                            preserveScroll: true,
                            onError: () => {
                                // Opsional: handle jika router error
                            },
                        },
                    );
                },
                (error) => {
                    // Callback saat tidak ada QR terdeteksi di frame (diabaikan)
                },
            );
        }

        return () => {
            if (scanner) {
                scanner
                    .clear()
                    .catch((err) => console.error("Gagal stop scanner", err));
            }
        };
    }, [isScanning]);

    return (
        <Layout>
            <main className="flex-1 ml-64 p-8 bg-slate-50 min-h-screen relative">
                {/* --- POP UP FLASH NOTIFICATION --- */}
                {showFlash && (flash.error || flash.success) && (
                    <div className="fixed top-5 right-5 z-[110] transition-all duration-500 transform translate-y-0 opacity-100">
                        <div
                            className={`flex items-center gap-3 p-4 rounded-2xl shadow-2xl border min-w-[300px] ${
                                flash.error
                                    ? "bg-white border-l-4 border-l-red-500 border-red-100 text-red-800"
                                    : "bg-white border-l-4 border-l-emerald-500 border-emerald-100 text-emerald-800"
                            }`}
                        >
                            <div
                                className={`${flash.error ? "text-red-500" : "text-emerald-500"}`}
                            >
                                {flash.error ? (
                                    <AlertCircle size={24} />
                                ) : (
                                    <CheckCircle2 size={24} />
                                )}
                            </div>
                            <div className="flex-1">
                                <p className="font-bold text-sm">
                                    {flash.error
                                        ? "Ops! Ada Masalah"
                                        : "Berhasil"}
                                </p>
                                <p className="text-xs text-slate-600">
                                    {flash.error || flash.success}
                                </p>
                            </div>
                            <button
                                onClick={() => setShowFlash(false)}
                                className="text-slate-400 hover:text-slate-600 transition-colors"
                            >
                                <X size={18} />
                            </button>
                        </div>
                    </div>
                )}

                {/* --- MODAL SCANNER --- */}
                {isScanning && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                        <div className="bg-white rounded-2xl p-6 w-full max-w-md relative shadow-2xl border border-white/20">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-bold text-slate-800 flex items-center gap-2">
                                    <ScanLine
                                        size={20}
                                        className="text-blue-600"
                                    />
                                    Scan Presensi
                                </h3>
                                <button
                                    onClick={() => setIsScanning(false)}
                                    className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <div
                                id="reader"
                                className="overflow-hidden rounded-xl border-0 bg-slate-100 shadow-inner"
                            ></div>

                            <p className="mt-4 text-center text-xs text-slate-400">
                                Posisikan kode QR di tengah kotak untuk memindai
                                otomatis.
                            </p>
                        </div>
                    </div>
                )}

                {/* --- HEADER SECTION --- */}
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-slate-800">
                        Jadwal Kuliah
                    </h1>
                    <p className="text-slate-500">
                        Lihat jadwal rutin dan agenda perkuliahan Anda.
                    </p>
                </div>

                {/* --- SECTION: HARI INI --- */}
                <section className="mb-10">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-bold text-slate-700 flex items-center gap-2">
                            <Clock size={20} className="text-blue-600" />
                            Hari Ini
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {jadwal_hari_ini?.length > 0 ? (
                            jadwal_hari_ini.map((item, index) => (
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
                                        {item.scan_hari_ini ? (
                                            <button className="flex items-center justify-center gap-2 w-full py-3 bg-slate-100 text-slate-400 rounded-xl cursor-default font-bold text-sm">
                                                <CheckCircle2 size={18} />
                                                Sudah Presensi
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() =>
                                                    setIsScanning(true)
                                                }
                                                className="flex items-center justify-center gap-2 w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors font-bold text-sm shadow-sm shadow-blue-100"
                                            >
                                                <ScanLine size={18} />
                                                Scan Kode QR
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full bg-white p-8 rounded-2xl border border-dashed border-slate-300 text-center text-slate-500 text-sm">
                                Tidak ada jadwal kuliah untuk hari ini.
                            </div>
                        )}
                    </div>
                </section>

                {/* --- SECTION: JADWAL REGULER (TABEL) --- */}
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
                                                key={idx}
                                                className="hover:bg-blue-50/30 transition-colors"
                                            >
                                                <td className="p-4 text-sm text-slate-500">
                                                    {idx + 1}
                                                </td>
                                                <td className="p-4 text-sm font-bold text-slate-700">
                                                    {row.hari}
                                                </td>
                                                <td className="p-4 text-sm font-bold text-blue-900 leading-tight">
                                                    {row.mata_kuliah}
                                                    <div className="text-[10px] text-slate-400 font-medium uppercase mt-1">
                                                        {row.jam_mulai?.slice(
                                                            0,
                                                            5,
                                                        )}{" "}
                                                        -{" "}
                                                        {row.jam_selesai?.slice(
                                                            0,
                                                            5,
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="p-4 text-sm text-slate-600">
                                                    {row.dosen}
                                                </td>
                                                <td className="p-4 text-sm text-slate-500 font-medium">
                                                    <div className="inline-flex items-center gap-1 bg-slate-100 px-2 py-1 rounded">
                                                        <MapPin size={12} />
                                                        {row.ruangan}
                                                    </div>
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
                    </div>
                </section>
            </main>
        </Layout>
    );
};

export default JadwalKuliah;

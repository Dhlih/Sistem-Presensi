import React, { useState, useEffect } from "react";
import { usePage, router } from "@inertiajs/react";
import {
    QrCode as QrIcon,
    CheckCircle2,
    XCircle,
    Clock,
    UserCheck,
    RefreshCw,
    Timer,
} from "lucide-react";

import { QRCodeSVG } from "qrcode.react";
import Layout from "../../Components/Layout";

const Presensi = () => {
    const { data } = usePage().props;
    const { daftar_mahasiswa = [], sesi_aktif = {}, mata_kuliah, kelas } = data;
    const expires_at = "";
    console.log(daftar_mahasiswa);
    const [timeLeft, setTimeLeft] = useState(0);

    useEffect(() => {
        const calculateTimeLeft = () => {
            if (!expires_at) return 0;
            const difference = new Date(expires_at) - new Date();
            return difference > 0 ? Math.floor(difference / 1000) : 0;
        };

        setTimeLeft(calculateTimeLeft());
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, [expires_at]);

    const handleRegenerateQR = () => {
        // Menggunakan optional chaining untuk ID sesi
        if (sesi_aktif?.id) {
            router.post(
                route("presensi.regenerate-qr", sesi_aktif.id),
                {},
                {
                    preserveScroll: true,
                },
            );
        }
    };

    const updateStatus = (id, newStatus) => {
        if (!id) return;
        router.patch(
            route("presensi.update-status", id),
            {
                status: newStatus,
            },
            { preserveScroll: true },
        );
    };

    return (
        <Layout>
            <main className="flex-1 ml-64 p-8 bg-slate-50 min-h-screen">
                {/* Header & Stats Section */}
                <div className="mb-8 flex justify-between items-end">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-800">
                            Presensi Perkuliahan
                        </h1>
                        {/* Fallback jika nama matkul atau kelas kosong */}
                        <p className="text-slate-500">
                            {mata_kuliah} - {kelas}
                        </p>
                    </div>
                </div>

                {/* QR Code Section */}
                <section className="mb-10 flex justify-center">
                    <div className="bg-white p-10 rounded-[2rem] shadow-xl shadow-blue-100 border border-slate-200 flex flex-col items-center gap-6 w-full max-w-xl text-center">
                        <div className="flex items-center justify-between w-full mb-2">
                            <div className="flex items-center gap-2">
                                <QrIcon size={24} className="text-blue-600" />
                                <h2 className="text-xl font-bold text-slate-800">
                                    Scan Kode Qr
                                </h2>
                            </div>
                            <div
                                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-mono font-bold ${timeLeft < 30 ? "bg-red-50 text-red-600" : "bg-blue-50 text-blue-600"}`}
                            >
                                <Timer size={18} />
                                {Math.floor(timeLeft / 60)}:
                                {(timeLeft % 60).toString().padStart(2, "0")}
                            </div>
                        </div>

                        <div className="p-6 bg-white rounded-3xl border-8 border-slate-50 shadow-inner">
                            <QRCodeSVG
                                value={`/mahasiswa/presensi/token/${sesi_aktif?.qr_token}`}
                                size={320}
                                level="H"
                            />
                        </div>

                        <button
                            onClick={handleRegenerateQR}
                            className="flex items-center gap-2 px-6 py-3 bg-slate-800 hover:bg-black text-white rounded-xl transition-all font-bold text-sm shadow-lg active:scale-95 disabled:opacity-50"
                            disabled={!sesi_aktif?.id}
                        >
                            <RefreshCw size={18} />
                            Perbarui Kode QR
                        </button>
                    </div>
                </section>

                {/* Daftar Mahasiswa Table */}
                <section>
                    <div className="flex items-center gap-2 mb-4">
                        <UserCheck size={20} className="text-blue-600" />
                        <h2 className="text-lg font-bold text-slate-700">
                            Daftar Mahasiswa
                        </h2>
                    </div>

                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-100">
                                    <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
                                        Mahasiswa
                                    </th>
                                    <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
                                        Waktu Scan
                                    </th>
                                    <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
                                        Status
                                    </th>
                                    <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-center">
                                        Update Manual
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {daftar_mahasiswa.length > 0 ? (
                                    daftar_mahasiswa.map((row, idx) => (
                                        <tr
                                            key={idx}
                                            className="hover:bg-blue-50/20 transition-colors"
                                        >
                                            <td className="p-4 flex items-center gap-3">
                                                <div className="h-9 w-9 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-bold text-xs">
                                                    {(row?.nama ?? "??")
                                                        .substring(0, 2)
                                                        .toUpperCase()}
                                                </div>
                                                <div>
                                                    <div className="text-sm font-bold text-slate-700">
                                                        {row?.nama ??
                                                            "Tanpa Nama"}
                                                    </div>
                                                    <div className="text-[10px] text-slate-400 font-mono uppercase">
                                                        {row?.nim ?? "-"}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-4 text-sm text-slate-500 font-medium">
                                                {row?.waktu_presensi ? (
                                                    <span className="flex items-center gap-1.5">
                                                        <Clock size={14} />{" "}
                                                        {row.waktu_presensi}
                                                    </span>
                                                ) : (
                                                    "-"
                                                )}
                                            </td>
                                            <td className="p-4">
                                                <StatusBadge
                                                    status={
                                                        row?.status ?? "alfa"
                                                    }
                                                />
                                            </td>
                                            <td className="p-4 text-center">
                                                <div className="inline-flex p-1 bg-slate-100 rounded-xl gap-1">
                                                    <ActionButton
                                                        active={
                                                            row?.status ===
                                                            "hadir"
                                                        }
                                                        color="green"
                                                        icon={
                                                            <CheckCircle2
                                                                size={16}
                                                            />
                                                        }
                                                        onClick={() =>
                                                            updateStatus(
                                                                row.id,
                                                                "hadir",
                                                            )
                                                        }
                                                    />
                                                    <ActionButton
                                                        active={
                                                            row?.status ===
                                                            "izin"
                                                        }
                                                        color="amber"
                                                        icon={
                                                            <Clock size={16} />
                                                        }
                                                        onClick={() =>
                                                            updateStatus(
                                                                row.id,
                                                                "izin",
                                                            )
                                                        }
                                                    />
                                                    <ActionButton
                                                        active={
                                                            row?.status ===
                                                            "alfa"
                                                        }
                                                        color="red"
                                                        icon={
                                                            <XCircle
                                                                size={16}
                                                            />
                                                        }
                                                        onClick={() =>
                                                            updateStatus(
                                                                row.id,
                                                                "alfa",
                                                            )
                                                        }
                                                    />
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="4"
                                            className="p-10 text-center text-slate-400 italic"
                                        >
                                            Belum ada mahasiswa dalam daftar.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </section>
            </main>
        </Layout>
    );
};

// Helper Components tetap sama dengan tambahan pengecekan status
const StatusBadge = ({ status = "alfa" }) => {
    const styles = {
        hadir: "bg-green-50 text-green-600 border-green-200",
        izin: "bg-amber-50 text-amber-600 border-amber-200",
        alfa: "bg-red-50 text-red-600 border-red-200",
    };
    const currentStyle = styles[status] ?? styles.alfa;
    return (
        <span
            className={`px-3 py-1 rounded-full text-[10px] font-black border uppercase tracking-tighter ${currentStyle}`}
        >
            {status}
        </span>
    );
};

const ActionButton = ({ active, color, icon, onClick }) => {
    const colors = {
        green: "text-green-600 bg-white shadow-sm",
        amber: "text-amber-600 bg-white shadow-sm",
        red: "text-red-600 bg-white shadow-sm",
    };
    return (
        <button
            onClick={onClick}
            className={`p-2 rounded-lg transition-all ${active ? (colors[color] ?? "") : "text-slate-400 hover:text-slate-600"}`}
        >
            {icon}
        </button>
    );
};

export default Presensi;

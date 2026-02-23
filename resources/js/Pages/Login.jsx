import { User, Lock, ArrowRight, GraduationCap } from "lucide-react";
import { useForm, usePage } from "@inertiajs/react";

const Login = () => {
    const { data, setData, post, processing } = useForm({
        username: "",
        password: "",
    });
    const { flash } = usePage().props;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!data.username || !data.password) return;
        post("/login");
    };

    return (
        <div className="min-h-screen bg-white flex flex-col md:flex-row font-sans">
            {/* Sisi Kiri: Branding (Tersembunyi di Mobile) */}
            <div className="hidden md:flex md:w-1/2 bg-blue-600 items-center justify-center p-12">
                <div className="max-w-md text-white">
                    <GraduationCap size={64} className="mb-6 opacity-90" />
                    <h1 className="text-4xl font-bold mb-4 leading-tight">
                        Sistem Presensi Mahasiswa & Dosen
                    </h1>
                    <p className="text-blue-100 text-lg">
                        Akses cepat untuk pencatatan kehadiran akademik yang
                        akurat dan transparan.
                    </p>
                </div>
            </div>

            {/* Sisi Kanan: Form Login */}
            <div className="flex-1 flex items-center justify-center p-8 bg-slate-50 md:bg-white">
                <div className="w-full max-w-sm">
                    {/* Logo Mobile */}
                    <div className="md:hidden flex items-center gap-3 mb-10">
                        <div className="bg-blue-600 p-2 rounded-lg text-white">
                            <GraduationCap size={28} />
                        </div>
                        <span className="font-bold text-xl tracking-tight">
                            PRESENSI UNI
                        </span>
                    </div>

                    <div className="mb-10">
                        <h2 className="text-3xl font-extrabold text-slate-900 mb-2">
                            Selamat Datang
                        </h2>
                        <p className="text-slate-500">
                            Silakan masuk dengan kredensial Anda
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="text-xs uppercase tracking-widest font-bold text-slate-400 mb-2 block">
                                ID Pengguna
                            </label>
                            <div className="relative border-b-2 border-slate-200 focus-within:border-blue-600 transition-colors">
                                <span className="absolute left-0 top-1/2 -translate-y-1/2 text-slate-400">
                                    <User size={18} />
                                </span>
                                <input
                                    type="text"
                                    required
                                    placeholder="NIM / NIP / Username"
                                    className="w-full pl-8 py-3 bg-transparent outline-none text-slate-700"
                                    value={data.username}
                                    onChange={(e) =>
                                        setData("username", e.target.value)
                                    }
                                />
                            </div>
                        </div>

                        <div>
                            <label className="text-xs uppercase tracking-widest font-bold text-slate-400 mb-2 block">
                                Kata Sandi
                            </label>
                            <div className="relative border-b-2 border-slate-200 focus-within:border-blue-600 transition-colors">
                                <span className="absolute left-0 top-1/2 -translate-y-1/2 text-slate-400">
                                    <Lock size={18} />
                                </span>
                                <input
                                    type="password"
                                    required
                                    placeholder="••••••••"
                                    value={data.password}
                                    className="w-full pl-8 py-3 bg-transparent outline-none text-slate-700"
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                />
                            </div>
                        </div>

                        {flash.error && (
                            <p className="text-red-500">{flash.error}</p>
                        )}

                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-3"
                            >
                                MASUK
                                <ArrowRight size={18} />
                            </button>
                        </div>
                    </form>

                    <footer className="mt-12 text-center md:text-left text-sm text-slate-400">
                        <p>
                            &copy; 2026 Universitas Akademik.{" "}
                            <br className="md:hidden" /> Bagian TI Gedung
                            Rektorat.
                        </p>
                    </footer>
                </div>
            </div>
        </div>
    );
};

export default Login;

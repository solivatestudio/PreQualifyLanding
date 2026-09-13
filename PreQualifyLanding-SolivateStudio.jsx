import { useState, useRef, useEffect } from "react";
import { ArrowRight, ArrowLeft, Loader2, Check, Globe, Users, CalendarHeart, Cpu } from "lucide-react";

// ---------------------------------------------------------------------------
// Solivate Studio — Pre-Qualify Micro-Landing
// Tokens lifted directly from solivate.com (hero + "Mulai Proyek" form):
//  dark navy hero bg, lime CTA, cyan eyebrow labels, uppercase form labels,
//  pill buttons, dark card-on-light-page pattern, connected-dot "Peta Solusi"
//  motif reused here as the step progress indicator.
// Font assumed as Plus Jakarta Sans (closest match to the screenshots) —
// swap the @import + fontFamily below in one place if the real brand font differs.
// ---------------------------------------------------------------------------

const WA_NUMBER = "6281219118993";

const CATEGORIES = [
  {
    id: "umkm",
    label: "UMKM & Company Profile",
    desc: "Profil bisnis, katalog produk, landing page promosi",
    icon: Globe,
    accent: "var(--accent-blue)",
  },
  {
    id: "komunitas",
    label: "Komunitas & Sosial",
    desc: "Masjid, yayasan, panti asuhan, donasi transparan",
    icon: Users,
    accent: "var(--accent-cyan)",
  },
  {
    id: "event",
    label: "Event & Invitation",
    desc: "Registrasi acara, undangan digital, birthday site",
    icon: CalendarHeart,
    accent: "var(--accent-pink)",
  },
  {
    id: "custom",
    label: "Sistem Custom",
    desc: "Marketplace, booking, dashboard, integrasi API",
    icon: Cpu,
    accent: "var(--accent-lime)",
  },
];

const BUDGETS = [
  { id: "b1", label: "< Rp500rb" },
  { id: "b2", label: "Rp500rb – Rp2,5jt" },
  { id: "b3", label: "Rp2,5jt+" },
  { id: "b4", label: "Belum yakin, mau diskusi" },
];

const STEP_TITLES = ["Kategori", "Budget", "Kontak"];

export default function PreQualifyLanding() {
  const [step, setStep] = useState(0); // 0,1,2 then 3 = done
  const [category, setCategory] = useState(null);
  const [budget, setBudget] = useState(null);
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const nameInputRef = useRef(null);

  useEffect(() => {
    if (step === 2) nameInputRef.current?.focus();
  }, [step]);

  const catData = CATEGORIES.find((c) => c.id === category);
  const budgetData = BUDGETS.find((b) => b.id === budget);

  const waLink = () => {
    const lines = [
      `Halo Solivate Studio! 👋`,
      `Saya ${name.trim()}, tertarik bikin *${catData?.label}*.`,
      `Budget: ${budgetData?.label}`,
      `Boleh dibantu lanjut ke tahap berikutnya?`,
    ];
    return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;
  };

  const handleSubmit = () => {
    if (!name.trim()) {
      setNameError(true);
      return;
    }
    setNameError(false);
    setSending(true);
    // Small deliberate delay: gives the redirect weight instead of an instant
    // jarring tab-swap, and prevents accidental double-taps on mobile.
    setTimeout(() => {
      window.open(waLink(), "_blank", "noopener,noreferrer");
      setSending(false);
      setSent(true);
    }, 650);
  };

  const goNext = () => setStep((s) => Math.min(s + 1, 2));
  const goBack = () => setStep((s) => Math.max(s - 1, 0));

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center"
      style={{
        background:
          "linear-gradient(180deg, var(--bg-dark) 0%, var(--bg-dark) 340px, var(--bg-light-top) 340px, var(--bg-light-bottom) 100%)",
        fontFamily: "var(--font-sans)",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        :root {
          --bg-dark: #0A0F1E;
          --bg-light-top: #EAF1F9;
          --bg-light-bottom: #FFFFFF;
          --card-dark: #101C30;
          --border-dark: #22324A;
          --border-light: #D8E2EE;
          --accent-lime: #DEF33B;
          --accent-cyan: #3ED9EC;
          --accent-blue: #3B6CF6;
          --accent-pink: #F0709C;
          --text-white: #F5F7FA;
          --text-navy: #0F1B2E;
          --text-muted-dark: #8FA0B8;
          --text-muted-light: #5B6B84;
          --font-sans: 'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif;
        }
        @media (prefers-reduced-motion: reduce) {
          * { transition: none !important; animation: none !important; }
        }
        .pq-focus:focus-visible {
          outline: 2px solid var(--accent-cyan);
          outline-offset: 2px;
        }
      `}</style>

      {/* Header */}
      <header className="w-full max-w-2xl flex items-center justify-between px-6 pt-6">
        <div className="flex items-center gap-2">
          <div
            className="w-7 h-7 rounded-md flex items-center justify-center font-extrabold text-sm"
            style={{ background: "var(--accent-lime)", color: "var(--text-navy)" }}
          >
            S
          </div>
          <span className="font-extrabold text-base tracking-tight" style={{ color: "var(--text-white)" }}>
            SOLIVATE
          </span>
        </div>
        <span className="text-xs font-medium" style={{ color: "var(--text-muted-dark)" }}>
          Bekasi, Indonesia
        </span>
      </header>

      {/* Hero */}
      <div className="w-full max-w-2xl px-6 pt-10 pb-8">
        <p
          className="text-xs font-bold tracking-widest uppercase mb-3"
          style={{ color: "var(--accent-cyan)" }}
        >
          Mulai di sini · 30 detik
        </p>
        <h1
          className="font-extrabold leading-tight text-3xl sm:text-4xl mb-3"
          style={{ color: "var(--text-white)" }}
        >
          Ceritain dulu ide proyekmu,
          <br />
          biar tim kami gak nebak-nebak.
        </h1>
        <p className="text-sm sm:text-base max-w-md" style={{ color: "var(--text-muted-dark)" }}>
          Jawab 3 hal singkat ini, chat WhatsApp kamu langsung kebawa konteksnya —
          gak perlu ketik ulang dari nol.
        </p>
      </div>

      {/* Card */}
      <div className="w-full max-w-2xl px-6 pb-16 -mt-2">
        <div
          className="rounded-2xl p-6 sm:p-8"
          style={{ background: "var(--card-dark)", border: "1px solid var(--border-dark)" }}
        >
          {/* browser-chrome nod, echoes the hero mockup on solivate.com */}
          <div className="flex items-center gap-1.5 mb-6">
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: "var(--accent-pink)" }} />
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: "var(--accent-lime)" }} />
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: "var(--accent-cyan)" }} />
          </div>

          {!sent ? (
            <>
              <ProgressDots step={step} />

              {step === 0 && (
                <StepCategory
                  category={category}
                  setCategory={(id) => {
                    setCategory(id);
                    goNext();
                  }}
                />
              )}

              {step === 1 && (
                <StepBudget
                  budget={budget}
                  setBudget={(id) => {
                    setBudget(id);
                    goNext();
                  }}
                  onBack={goBack}
                />
              )}

              {step === 2 && (
                <StepContact
                  name={name}
                  setName={setName}
                  nameError={nameError}
                  nameInputRef={nameInputRef}
                  catLabel={catData?.label}
                  budgetLabel={budgetData?.label}
                  sending={sending}
                  onBack={goBack}
                  onSubmit={handleSubmit}
                />
              )}
            </>
          ) : (
            <SuccessState waLink={waLink()} />
          )}
        </div>
      </div>
    </div>
  );
}

function ProgressDots({ step }) {
  return (
    <div className="flex items-center gap-2 mb-7" aria-label={`Langkah ${step + 1} dari 3`}>
      {STEP_TITLES.map((title, i) => (
        <div key={title} className="flex items-center gap-2 flex-1">
          <div
            className="h-1.5 rounded-full flex-1 transition-all duration-300"
            style={{
              background: i <= step ? "var(--accent-lime)" : "var(--border-dark)",
            }}
          />
        </div>
      ))}
    </div>
  );
}

function OptionCard({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className="pq-focus w-full text-left rounded-xl p-4 flex items-start gap-3 transition-colors duration-150"
      style={{
        background: active ? "rgba(222,243,59,0.08)" : "transparent",
        border: `1px solid ${active ? "var(--accent-lime)" : "var(--border-dark)"}`,
      }}
    >
      {children}
    </button>
  );
}

function StepCategory({ category, setCategory }) {
  return (
    <div>
      <h2 className="text-lg font-bold mb-1" style={{ color: "var(--text-white)" }}>
        Proyek kamu masuk kategori apa?
      </h2>
      <p className="text-sm mb-5" style={{ color: "var(--text-muted-dark)" }}>
        Ini bantu tim kami siapin jawaban yang relevan begitu kamu chat.
      </p>
      <div className="grid gap-3">
        {CATEGORIES.map((c) => {
          const Icon = c.icon;
          return (
            <OptionCard key={c.id} active={category === c.id} onClick={() => setCategory(c.id)}>
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                style={{ background: `${c.accent}1F` }}
              >
                <Icon size={18} style={{ color: c.accent }} strokeWidth={2.25} />
              </div>
              <div>
                <p className="text-sm font-semibold" style={{ color: "var(--text-white)" }}>
                  {c.label}
                </p>
                <p className="text-xs mt-0.5" style={{ color: "var(--text-muted-dark)" }}>
                  {c.desc}
                </p>
              </div>
            </OptionCard>
          );
        })}
      </div>
    </div>
  );
}

function StepBudget({ budget, setBudget, onBack }) {
  return (
    <div>
      <BackRow onBack={onBack} />
      <h2 className="text-lg font-bold mb-1" style={{ color: "var(--text-white)" }}>
        Kira-kira budget-nya berapa?
      </h2>
      <p className="text-sm mb-5" style={{ color: "var(--text-muted-dark)" }}>
        Estimasi aja, biar rekomendasi yang kami kasih pas sasaran.
      </p>
      <div className="grid grid-cols-2 gap-3">
        {BUDGETS.map((b) => (
          <OptionCard key={b.id} active={budget === b.id} onClick={() => setBudget(b.id)}>
            <p className="text-sm font-semibold" style={{ color: "var(--text-white)" }}>
              {b.label}
            </p>
          </OptionCard>
        ))}
      </div>
    </div>
  );
}

function StepContact({
  name,
  setName,
  nameError,
  nameInputRef,
  catLabel,
  budgetLabel,
  sending,
  onBack,
  onSubmit,
}) {
  return (
    <div>
      <BackRow onBack={onBack} />
      <h2 className="text-lg font-bold mb-1" style={{ color: "var(--text-white)" }}>
        Terakhir, siapa nama kamu?
      </h2>
      <p className="text-sm mb-5" style={{ color: "var(--text-muted-dark)" }}>
        Biar CS kami sapa dengan benar, bukan "Halo Kak" doang.
      </p>

      <div
        className="rounded-xl p-3 mb-5 text-xs flex flex-wrap gap-x-4 gap-y-1"
        style={{ background: "rgba(255,255,255,0.03)", border: "1px solid var(--border-dark)" }}
      >
        <span style={{ color: "var(--text-muted-dark)" }}>
          Kategori: <span style={{ color: "var(--text-white)" }}>{catLabel}</span>
        </span>
        <span style={{ color: "var(--text-muted-dark)" }}>
          Budget: <span style={{ color: "var(--text-white)" }}>{budgetLabel}</span>
        </span>
      </div>

      <label
        htmlFor="pq-name"
        className="block text-xs font-bold tracking-widest uppercase mb-2"
        style={{ color: "var(--text-muted-dark)" }}
      >
        Nama
      </label>
      <input
        id="pq-name"
        ref={nameInputRef}
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nama kamu"
        className="pq-focus w-full rounded-lg px-4 py-3 text-sm mb-1"
        style={{
          background: "rgba(255,255,255,0.03)",
          border: `1px solid ${nameError ? "var(--accent-pink)" : "var(--border-dark)"}`,
          color: "var(--text-white)",
        }}
      />
      {nameError && (
        <p className="text-xs mb-3" style={{ color: "var(--accent-pink)" }}>
          Isi nama dulu ya, biar chat-nya kebawa konteks lengkap.
        </p>
      )}

      <button
        onClick={onSubmit}
        disabled={sending}
        className="pq-focus w-full mt-4 rounded-full py-3.5 font-bold text-sm flex items-center justify-center gap-2 transition-opacity duration-150 disabled:opacity-70"
        style={{ background: "var(--accent-lime)", color: "var(--text-navy)" }}
      >
        {sending ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Menyiapkan chat...
          </>
        ) : (
          <>
            Chat Sekarang di WhatsApp
            <ArrowRight size={16} />
          </>
        )}
      </button>
    </div>
  );
}

function BackRow({ onBack }) {
  return (
    <button
      onClick={onBack}
      className="pq-focus flex items-center gap-1 text-xs font-semibold mb-4"
      style={{ color: "var(--text-muted-dark)" }}
    >
      <ArrowLeft size={14} />
      Kembali
    </button>
  );
}

function SuccessState({ waLink }) {
  return (
    <div className="text-center py-6">
      <div
        className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
        style={{ background: "rgba(222,243,59,0.12)" }}
      >
        <Check size={22} style={{ color: "var(--accent-lime)" }} strokeWidth={2.5} />
      </div>
      <h2 className="text-lg font-bold mb-2" style={{ color: "var(--text-white)" }}>
        Cek tab WhatsApp kamu
      </h2>
      <p className="text-sm mb-6" style={{ color: "var(--text-muted-dark)" }}>
        Kalau gak otomatis kebuka, tap tombol di bawah ini.
      </p>
      <a
        href={waLink}
        target="_blank"
        rel="noopener noreferrer"
        className="pq-focus inline-flex items-center gap-2 rounded-full px-6 py-3 font-bold text-sm"
        style={{ background: "var(--accent-lime)", color: "var(--text-navy)" }}
      >
        Buka WhatsApp
        <ArrowRight size={16} />
      </a>
    </div>
  );
}

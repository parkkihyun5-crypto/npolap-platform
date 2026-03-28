"use client";

import React, { useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "npolap-platform-site-v1";
const ADMIN_SESSION_KEY = "npolap-platform-admin-session-v1";
const ADMIN_ID = "admin";
const ADMIN_PASSWORD = "ILU2026!";

const defaultContent = {
  siteName: "공익법인 종합컨설팅 플랫폼",
  siteSubtitle: "설립 · 운영 · 브랜딩 · 홈페이지까지 한 번에",
  heroBadge: "International Leaders Union Consulting & Branding",
  heroTitle: "공익법인 설립과 브랜드 구축을 동시에 완성하는 통합 플랫폼",
  heroDescription:
    "사단법인·재단법인·공익법인 설립 검토부터 정관 설계, 실무 운영 체계, 브랜딩 로고 서비스, 홈페이지 제작까지 실전 중심으로 연결하는 고급형 컨설팅 플랫폼입니다.",
  primaryCta: "설립유형 검토 보기",
  secondaryCta: "브랜딩 서비스 보기",
  topMenu1: "공익법인설립 메뉴",
  topMenu2: "브랜딩 서비스 메뉴",
  consultingTitle: "공익법인 종합컨설팅 서비스",
  consultingDescription:
    "법인 설립 준비 단계부터 운영 안정화, 공신력 확보, 대외 브랜드 구축까지 전체 흐름을 구조적으로 설계합니다.",
  establishmentTitle: "비영리·비영리법인 설립 유형별 검토사항",
  establishmentDescription:
    "설립 목적, 자산 규모, 운영 구조, 공신력 수준에 따라 적합한 법인 유형을 비교하고 바로 컨설팅 상품을 선택할 수 있습니다.",
  brandingTitle: "브랜딩 로고 서비스",
  brandingDescription:
    "기관의 신뢰를 높이는 CI·BI 패키지와 추가 옵션을 선택하고 실시간 견적을 확인할 수 있습니다.",
  paymentTitle: "입금 안내",
  paymentDescription:
    "상담 또는 계약 확정 후 아래 계좌로 입금하시면 확인 절차를 진행합니다. 입금 전 최종 견적과 업무 범위를 반드시 확인해 주세요.",
  contactTitle: "상담 신청",
  contactDescription:
    "설립 유형 검토와 브랜딩 서비스 선택 결과를 함께 접수하여 통합 상담을 진행합니다.",
  footerText: "© International Leaders Union. All rights reserved.",
  phone: "010-0000-0000",
  email: "contact@npolap.cloud",
  bankName: "우리은행",
  bankAccount: "1005-404-403203",
  bankHolder: "국제지도자연합",
  primary: "#0B1F35",
  secondary: "#143F67",
  accent: "#C8A86B",
  bodyBg: "#F5F7FB",
  cardBg: "#FFFFFF",
  textColor: "#0F172A",
};

const consultingServices = [
  {
    id: "establish",
    title: "법인 설립 컨설팅",
    desc: "사단법인·재단법인·공익법인 설립 가능성 검토, 허가 구조 분석, 창립 문서 체계 설계를 지원합니다.",
  },
  {
    id: "governance",
    title: "정관·거버넌스 설계",
    desc: "정관 구조, 임원 권한 체계, 사무국 운영 구조, 실사 대응 포인트를 정밀하게 정리합니다.",
  },
  {
    id: "operation",
    title: "행정·실무 지원",
    desc: "고유번호증, 계좌개설, 대외 제출 문서, 회의록, 증빙 흐름까지 운영 실무를 지원합니다.",
  },
  {
    id: "branding",
    title: "브랜딩 로고 서비스",
    desc: "기관의 신뢰와 공공성을 시각적으로 전달하는 로고, CI·BI, 문서 디자인 체계를 구축합니다.",
  },
];

const establishmentTypes = [
  {
    id: "voluntary",
    name: "비영리 임의단체",
    legal: "자율적 모임",
    procedure: "세무서 신고",
    difficulty: "매우 쉬움",
    period: "1~3일",
    budget: "30~50만",
    summary: "빠르게 출발할 수 있지만 공신력과 제도적 확장성은 제한적입니다.",
    details: [
      ["조직 구조", "대표 중심"],
      ["사업 범위", "친목·활동 중심"],
      ["기부금 영수증", "불가"],
      ["정부 협력", "낮음"],
      ["재원 구조", "회비 중심"],
    ],
  },
  {
    id: "association",
    name: "사단법인(비영리)",
    legal: "회원 기반 법인",
    procedure: "주무관청 허가 + 법원 등기",
    difficulty: "어려움",
    period: "3~6개월",
    budget: "200~300만",
    summary: "공익성과 회원 구조를 갖춘 가장 표준적인 비영리법인 모델입니다.",
    details: [
      ["조직 구조", "회원·총회 중심"],
      ["사업 범위", "공익·협력 사업"],
      ["기부금 영수증", "지정기부금단체 지정 시 가능"],
      ["정부 협력", "위탁사업 가능"],
      ["재원 구조", "회비 + 보조금"],
    ],
  },
  {
    id: "foundation",
    name: "재단법인(비영리)",
    legal: "자산 기반 법인",
    procedure: "주무관청 허가 + 법원 등기",
    difficulty: "매우 어려움",
    period: "6개월~1년",
    budget: "300~500만",
    summary: "충분한 출연재산과 장기적 재단사업 구조가 있을 때 적합합니다.",
    details: [
      ["조직 구조", "이사회 중심"],
      ["사업 범위", "연구·장학·재단사업"],
      ["기부금 영수증", "지정 시 가능"],
      ["정부 협력", "정책 연구 협력"],
      ["재원 구조", "기금 수익"],
    ],
  },
  {
    id: "public-benefit",
    name: "공익법인(지정)",
    legal: "정부 인증 공익기관",
    procedure: "법인 설립 후 국세청 지정",
    difficulty: "최고 수준",
    period: "법인 설립 후 추가 3개월",
    budget: "300~700만",
    summary: "공신력이 가장 높지만 관리 기준과 공익성 요건이 매우 엄격합니다.",
    details: [
      ["조직 구조", "공익 거버넌스"],
      ["사업 범위", "사회 공헌 및 정책 협력"],
      ["기부금 영수증", "가능(세제 혜택)"],
      ["정부 협력", "정책 수행 파트너"],
      ["재원 구조", "정부 + 대기업 후원"],
    ],
  },
];

const establishmentPackages = [
  {
    id: "ngo-basic",
    name: "임의단체 설립 패키지",
    subtitle: "Quick Start",
    price: 500000,
    desc: "간편 신고와 기본 운영 구조 설계를 위한 입문형 패키지",
  },
  {
    id: "association-pro",
    name: "사단법인 설립 패키지",
    subtitle: "Association Pro",
    price: 3000000,
    desc: "정관 설계, 허가 서류, 사무국 준비, 실사 대응을 포함한 표준 패키지",
    popular: true,
  },
  {
    id: "foundation-premium",
    name: "재단법인 설립 패키지",
    subtitle: "Foundation Premium",
    price: 7000000,
    desc: "출연재산 구조, 이사회 설계, 허가 전략을 포함한 고급 패키지",
  },
  {
    id: "public-benefit-signature",
    name: "공익법인 지정 패키지",
    subtitle: "Public Signature",
    price: 12000000,
    desc: "공익성 구조, 세제 요건, 지정 전략을 포함한 최상위 패키지",
  },
];

const brandingPackages = [
  {
    id: "starter",
    name: "STARTER",
    subtitle: "BI Lite",
    price: 1500000,
    desc: "로고 중심의 기본형 브랜딩 패키지",
  },
  {
    id: "standard",
    name: "STANDARD",
    subtitle: "BI Pro",
    price: 3000000,
    desc: "로고와 컬러 시스템을 포함한 표준형 패키지",
  },
  {
    id: "premium",
    name: "PREMIUM",
    subtitle: "CI Basic",
    price: 8000000,
    desc: "전략형 CI·BI 설계와 응용 시스템을 포함한 고급 패키지",
    popular: true,
  },
  {
    id: "signature",
    name: "SIGNATURE",
    subtitle: "CI Full",
    price: 20000000,
    desc: "국제기관 수준의 아이덴티티 체계를 구축하는 최상위 패키지",
  },
];

const brandingAddons = [
  { id: "naming", label: "네이밍 개발", price: 2000000 },
  { id: "slogan", label: "슬로건 개발", price: 1000000 },
  { id: "ppt", label: "PPT 템플릿", price: 1000000 },
  { id: "website", label: "홈페이지 UI 설계", price: 5000000 },
  { id: "sns", label: "SNS 브랜드 키트", price: 1000000 },
  { id: "signage", label: "간판·사인 디자인", price: 2000000 },
];

const directions = [
  { id: "global", label: "글로벌 기관형" },
  { id: "public", label: "공공기관형" },
  { id: "culture", label: "문화예술형" },
  { id: "sustainability", label: "지속가능성 중심" },
];

function formatKRW(value) {
  return new Intl.NumberFormat("ko-KR", {
    style: "currency",
    currency: "KRW",
    maximumFractionDigits: 0,
  }).format(value || 0);
}

function copyText(text) {
  if (typeof navigator !== "undefined" && navigator.clipboard) {
    navigator.clipboard.writeText(text);
  }
}

function SectionHeader({ eyebrow, title, desc, center = false }) {
  return (
    <div className={center ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <div className="text-sm font-semibold uppercase tracking-[0.22em]" style={{ color: "var(--accent)" }}>
        {eyebrow}
      </div>
      <h2 className="mt-3 text-3xl font-bold md:text-4xl">{title}</h2>
      <p className="mt-4 text-slate-600">{desc}</p>
    </div>
  );
}

function LoginModal({ open, onClose, onSuccess, theme }) {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (!open) return null;

  const submit = () => {
    if (id === ADMIN_ID && password === ADMIN_PASSWORD) {
      localStorage.setItem(ADMIN_SESSION_KEY, "true");
      onSuccess();
      setId("");
      setPassword("");
      setError("");
      return;
    }
    setError("아이디 또는 비밀번호가 올바르지 않습니다.");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 px-4">
      <div className="w-full max-w-md rounded-[28px] bg-white p-8 shadow-2xl">
        <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Admin Login</div>
        <h3 className="mt-2 text-3xl font-bold text-slate-900">관리자 로그인</h3>
        <p className="mt-3 text-sm leading-7 text-slate-500">홈페이지 문구와 스타일을 수정하려면 관리자 로그인이 필요합니다.</p>
        <div className="mt-6 space-y-4">
          <input
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder="아이디"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-slate-800"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-slate-800"
          />
        </div>
        {error ? <div className="mt-4 rounded-xl bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">{error}</div> : null}
        <div className="mt-6 flex gap-3">
          <button type="button" onClick={submit} className="flex-1 rounded-xl px-4 py-3 font-bold text-white" style={{ backgroundColor: theme.primary }}>
            로그인
          </button>
          <button type="button" onClick={onClose} className="rounded-xl border border-slate-300 px-4 py-3 font-bold text-slate-700">
            닫기
          </button>
        </div>
        <div className="mt-4 rounded-xl bg-amber-50 px-4 py-3 text-xs leading-6 text-amber-800">
          데모 로그인 정보: <strong>admin</strong> / <strong>ILU2026!</strong>
        </div>
      </div>
    </div>
  );
}

function AdminField({ label, value, onChange, textarea = false, color = false }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-slate-700">{label}</label>
      {color ? (
        <div className="flex items-center gap-3 rounded-xl border border-slate-300 bg-white px-3 py-2">
          <input type="color" value={value} onChange={(e) => onChange(e.target.value)} className="h-10 w-12 border-0 bg-transparent p-0" />
          <input value={value} onChange={(e) => onChange(e.target.value)} className="flex-1 border-0 bg-transparent text-sm outline-none" />
        </div>
      ) : textarea ? (
        <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={4} className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-slate-800" />
      ) : (
        <input value={value} onChange={(e) => onChange(e.target.value)} className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-slate-800" />
      )}
    </div>
  );
}

function PackageCard({ item, active, onClick, theme }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-[24px] border p-6 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-xl ${
        active ? "ring-2 ring-slate-200" : ""
      }`}
      style={{
        backgroundColor: theme.cardBg,
        borderColor: active || item.popular ? theme.accent : "#E2E8F0",
      }}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          {item.subtitle ? <div className="text-sm font-semibold" style={{ color: theme.accent }}>{item.subtitle}</div> : null}
          <h3 className="mt-2 text-xl font-bold">{item.name}</h3>
        </div>
        {item.popular ? <span className="rounded-full px-3 py-1 text-xs font-bold text-[#0A1F33]" style={{ backgroundColor: theme.accent }}>추천</span> : null}
      </div>
      <p className="mt-4 text-sm leading-7 text-slate-600">{item.desc || item.description}</p>
      <div className="mt-6 text-2xl font-bold" style={{ color: theme.primary }}>{formatKRW(item.price)}</div>
    </button>
  );
}

export default function PublicInterestConsultingPremiumSite() {
  const [content, setContent] = useState(defaultContent);
  const [adminOpen, setAdminOpen] = useState(false);
  const [adminLoggedIn, setAdminLoggedIn] = useState(false);
  const [selectedEstablishmentType, setSelectedEstablishmentType] = useState("association");
  const [selectedFoundationPackage, setSelectedFoundationPackage] = useState("association-pro");
  const [selectedBrandingPackage, setSelectedBrandingPackage] = useState("premium");
  const [selectedAddons, setSelectedAddons] = useState(["naming", "ppt"]);
  const [selectedDirection, setSelectedDirection] = useState("global");
  const [vatIncluded, setVatIncluded] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");
  const [inquirySaved, setInquirySaved] = useState(false);
  const [form, setForm] = useState({
    organization: "",
    name: "",
    phone: "",
    email: "",
    description: "",
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = window.localStorage.getItem(STORAGE_KEY);
    const session = window.localStorage.getItem(ADMIN_SESSION_KEY);
    if (saved) {
      try {
        setContent({ ...defaultContent, ...JSON.parse(saved) });
      } catch {}
    }
    setAdminLoggedIn(session === "true");
  }, []);

  const theme = useMemo(
    () => ({
      primary: content.primary,
      secondary: content.secondary,
      accent: content.accent,
      bodyBg: content.bodyBg,
      cardBg: content.cardBg,
      textColor: content.textColor,
    }),
    [content]
  );

  const establishmentType = establishmentTypes.find((item) => item.id === selectedEstablishmentType);
  const foundationPkg = establishmentPackages.find((item) => item.id === selectedFoundationPackage);
  const brandingPkg = brandingPackages.find((item) => item.id === selectedBrandingPackage);

  const addonTotal = selectedAddons.reduce((sum, id) => {
    const found = brandingAddons.find((item) => item.id === id);
    return sum + (found?.price || 0);
  }, 0);

  const subtotal = (foundationPkg?.price || 0) + (brandingPkg?.price || 0) + addonTotal;
  const total = vatIncluded ? Math.round(subtotal * 1.1) : subtotal;

  const persist = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
    setSaveMessage("변경사항이 저장되었습니다.");
    setTimeout(() => setSaveMessage(""), 1800);
  };

  const reset = () => {
    setContent(defaultContent);
    localStorage.removeItem(STORAGE_KEY);
    setSaveMessage("기본값으로 초기화했습니다.");
    setTimeout(() => setSaveMessage(""), 1800);
  };

  const logout = () => {
    localStorage.removeItem(ADMIN_SESSION_KEY);
    setAdminLoggedIn(false);
  };

  const updateContent = (key, value) => {
    setContent((prev) => ({ ...prev, [key]: value }));
  };

  const toggleAddon = (id) => {
    setSelectedAddons((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  const submitInquiry = (e) => {
    e.preventDefault();
    setInquirySaved(true);
    setTimeout(() => setInquirySaved(false), 2000);
    setForm({ organization: "", name: "", phone: "", email: "", description: "" });
  };

  return (
    <div style={{ backgroundColor: theme.bodyBg, color: theme.textColor }} className="min-h-screen">
      <LoginModal open={adminOpen} onClose={() => setAdminOpen(false)} onSuccess={() => { setAdminLoggedIn(true); setAdminOpen(false); }} theme={theme} />

      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6 lg:px-8">
          <div>
            <div className="text-lg font-bold" style={{ color: theme.primary }}>{content.siteName}</div>
            <div className="text-xs text-slate-500">{content.siteSubtitle}</div>
          </div>
          <div className="flex items-center gap-2">
            <a href="#establishment" className="hidden rounded-lg bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 md:block">{content.topMenu1}</a>
            <a href="#branding" className="hidden rounded-lg bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 md:block">{content.topMenu2}</a>
            {adminLoggedIn ? (
              <>
                <button type="button" onClick={persist} className="rounded-lg px-4 py-2 text-sm font-semibold text-white" style={{ backgroundColor: theme.primary }}>
                  저장
                </button>
                <button type="button" onClick={logout} className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700">
                  관리자 종료
                </button>
              </>
            ) : (
              <button type="button" onClick={() => setAdminOpen(true)} className="rounded-lg px-4 py-2 text-sm font-semibold text-white" style={{ backgroundColor: theme.primary }}>
                관리자 로그인
              </button>
            )}
          </div>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden text-white" style={{ background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.secondary} 100%)` }}>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.12),transparent_25%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.09),transparent_30%)]" />
          <div className="relative mx-auto grid max-w-7xl gap-10 px-6 py-20 md:grid-cols-2 md:px-10 lg:px-12 lg:py-28">
            <div className="flex flex-col justify-center">
              <div className="mb-4 inline-flex w-fit items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm backdrop-blur">
                {content.heroBadge}
              </div>
              <h1 className="max-w-3xl text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">{content.heroTitle}</h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-slate-200 md:text-lg">{content.heroDescription}</p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a href="#establishment" className="rounded-xl px-6 py-3 font-semibold text-[#0A1F33] shadow-lg" style={{ backgroundColor: theme.accent }}>
                  {content.primaryCta}
                </a>
                <a href="#branding" className="rounded-xl border border-white/30 px-6 py-3 font-semibold text-white hover:bg-white/10">
                  {content.secondaryCta}
                </a>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="w-full max-w-xl rounded-[28px] border border-white/10 bg-white/95 p-6 text-slate-900 shadow-2xl">
                <div className="text-sm font-semibold" style={{ color: theme.primary }}>Quick Overview</div>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl bg-slate-100 p-4">
                    <div className="text-xs font-semibold text-slate-500">연락처</div>
                    <div className="mt-1 font-bold">{content.phone}</div>
                  </div>
                  <div className="rounded-2xl bg-slate-100 p-4">
                    <div className="text-xs font-semibold text-slate-500">이메일</div>
                    <div className="mt-1 font-bold">{content.email}</div>
                  </div>
                  <div className="rounded-2xl bg-slate-100 p-4 sm:col-span-2">
                    <div className="text-xs font-semibold text-slate-500">입금계좌</div>
                    <div className="mt-1 font-bold">{content.bankName} {content.bankAccount} {content.bankHolder}</div>
                  </div>
                </div>
                <div className="mt-5 flex flex-wrap gap-3">
                  <button type="button" onClick={() => copyText(content.bankAccount)} className="rounded-xl px-4 py-3 text-sm font-bold text-white" style={{ backgroundColor: theme.primary }}>
                    계좌번호 복사
                  </button>
                  <button type="button" onClick={() => copyText(`${content.bankName} ${content.bankAccount} ${content.bankHolder}`)} className="rounded-xl border border-slate-300 px-4 py-3 text-sm font-bold text-slate-700">
                    전체 정보 복사
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-20 md:px-10 lg:px-12">
          <SectionHeader eyebrow="Consulting" title={content.consultingTitle} desc={content.consultingDescription} center />
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {consultingServices.map((item) => (
              <div key={item.id} className="rounded-[24px] border border-slate-200 p-6 shadow-sm" style={{ backgroundColor: theme.cardBg }}>
                <h3 className="text-xl font-bold">{item.title}</h3>
                <p className="mt-4 text-sm leading-7 text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="establishment" className="border-y border-slate-200 py-20" style={{ backgroundColor: theme.cardBg }}>
          <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-12">
            <SectionHeader eyebrow="Establishment" title={content.establishmentTitle} desc={content.establishmentDescription} center />
            <div className="mt-12 grid gap-6 lg:grid-cols-4">
              {establishmentTypes.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelectedEstablishmentType(item.id)}
                  className={`rounded-[24px] border p-6 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-xl ${selectedEstablishmentType === item.id ? "ring-2 ring-slate-200" : ""}`}
                  style={{ backgroundColor: theme.cardBg, borderColor: selectedEstablishmentType === item.id ? theme.accent : "#E2E8F0" }}
                >
                  <div className="text-sm font-semibold" style={{ color: theme.accent }}>{item.legal}</div>
                  <h3 className="mt-2 text-xl font-bold">{item.name}</h3>
                  <p className="mt-4 text-sm leading-7 text-slate-600">{item.summary}</p>
                  <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
                    <div className="rounded-xl bg-slate-50 p-3"><div className="text-xs text-slate-500">절차</div><div className="mt-1 font-semibold">{item.procedure}</div></div>
                    <div className="rounded-xl bg-slate-50 p-3"><div className="text-xs text-slate-500">난이도</div><div className="mt-1 font-semibold">{item.difficulty}</div></div>
                    <div className="rounded-xl bg-slate-50 p-3"><div className="text-xs text-slate-500">기간</div><div className="mt-1 font-semibold">{item.period}</div></div>
                    <div className="rounded-xl bg-slate-50 p-3"><div className="text-xs text-slate-500">비용</div><div className="mt-1 font-semibold">{item.budget}</div></div>
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-12 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
              <div className="rounded-[28px] border border-slate-200 p-6 shadow-sm" style={{ backgroundColor: theme.cardBg }}>
                <div className="text-sm font-semibold uppercase tracking-[0.2em]" style={{ color: theme.accent }}>Selected Type</div>
                <h3 className="mt-3 text-3xl font-bold">{establishmentType?.name}</h3>
                <p className="mt-4 text-sm leading-7 text-slate-600">{establishmentType?.summary}</p>
                <div className="mt-8 rounded-2xl bg-slate-50 p-5">
                  {establishmentType?.details.map(([label, value]) => (
                    <div key={label} className="grid grid-cols-[120px_1fr] gap-4 border-b border-slate-200 py-3 text-sm last:border-b-0">
                      <div className="font-semibold text-slate-500">{label}</div>
                      <div className="text-slate-800">{value}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <div className="rounded-[28px] p-6 text-white shadow-2xl" style={{ backgroundColor: theme.primary }}>
                  <div className="text-sm font-semibold uppercase tracking-[0.2em]" style={{ color: theme.accent }}>Quick Guide</div>
                  <h3 className="mt-3 text-2xl font-bold">설립유형별 컨설팅 상품표</h3>
                  <div className="mt-6 space-y-4">
                    {establishmentPackages.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setSelectedFoundationPackage(item.id)}
                        className={`w-full rounded-2xl border p-4 text-left transition ${selectedFoundationPackage === item.id ? "bg-white text-slate-900" : "bg-white/5 text-white border-white/10"}`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <div className="text-sm font-semibold" style={{ color: selectedFoundationPackage === item.id ? theme.accent : "#E2E8F0" }}>{item.subtitle}</div>
                            <div className="mt-1 text-lg font-bold">{item.name}</div>
                            <div className="mt-2 text-sm leading-7 opacity-90">{item.desc}</div>
                          </div>
                          {item.popular ? <span className="rounded-full px-3 py-1 text-xs font-bold text-[#0A1F33]" style={{ backgroundColor: theme.accent }}>추천</span> : null}
                        </div>
                        <div className="mt-4 text-xl font-bold">{formatKRW(item.price)}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="rounded-[28px] border border-slate-200 p-6 shadow-sm" style={{ backgroundColor: theme.cardBg }}>
                  <div className="text-sm font-semibold uppercase tracking-[0.2em]" style={{ color: theme.accent }}>Office Readiness</div>
                  <h3 className="mt-3 text-2xl font-bold">사무국 실무 역량과 리스크</h3>
                  <p className="mt-4 text-sm leading-7 text-slate-600">
                    사무국은 정관을 실제로 작동시키는 엔진입니다. 준비 없이 제출하면 보완 요구, 재작성 비용, 일정 지연, 파트너십 기회 상실로 이어질 수 있으므로 초기 설계와 실무 준비가 매우 중요합니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="branding" className="py-20">
          <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-12">
            <SectionHeader eyebrow="Branding" title={content.brandingTitle} desc={content.brandingDescription} center />
            <div className="mt-12 grid gap-6 lg:grid-cols-4">
              {brandingPackages.map((item) => (
                <PackageCard key={item.id} item={item} active={selectedBrandingPackage === item.id} onClick={() => setSelectedBrandingPackage(item.id)} theme={theme} />
              ))}
            </div>

            <div className="mt-12 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
              <div>
                <div className="text-sm font-semibold uppercase tracking-[0.2em]" style={{ color: theme.accent }}>Options</div>
                <h3 className="mt-3 text-3xl font-bold">브랜딩 옵션 선택</h3>
                <p className="mt-4 text-slate-600">원하는 범위를 선택하면 통합 견적에 즉시 반영됩니다.</p>
                <div className="mt-8 grid gap-4 md:grid-cols-2">
                  {brandingAddons.map((item) => {
                    const checked = selectedAddons.includes(item.id);
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => toggleAddon(item.id)}
                        className={`rounded-2xl border p-5 text-left transition ${checked ? "text-white shadow-lg" : "border-slate-200 bg-white"}`}
                        style={checked ? { backgroundColor: theme.primary, borderColor: theme.primary } : {}}
                      >
                        <div className="flex items-center justify-between gap-3">
                          <div>
                            <div className="text-lg font-semibold">{item.label}</div>
                            <div className={`mt-2 text-sm ${checked ? "text-slate-200" : "text-slate-500"}`}>{formatKRW(item.price)}</div>
                          </div>
                          <div className={`flex h-8 w-8 items-center justify-center rounded-full border ${checked ? "border-white bg-white" : "border-slate-300 bg-white text-slate-400"}`} style={checked ? { color: theme.primary } : {}}>
                            {checked ? "✓" : "+"}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="mt-6 rounded-2xl bg-white p-5 shadow-sm">
                  <div className="text-sm font-semibold text-slate-700">브랜드 방향 선택</div>
                  <div className="mt-4 grid gap-3 md:grid-cols-2">
                    {directions.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setSelectedDirection(item.id)}
                        className={`rounded-xl border px-4 py-3 text-left text-sm font-semibold ${selectedDirection === item.id ? "shadow-sm" : "border-slate-200"}`}
                        style={selectedDirection === item.id ? { borderColor: theme.accent, backgroundColor: "#FFF8ED" } : {}}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                  <div className="mt-5 flex items-center gap-3 rounded-xl bg-slate-50 px-4 py-3">
                    <input id="vat" type="checkbox" checked={vatIncluded} onChange={(e) => setVatIncluded(e.target.checked)} className="h-4 w-4" />
                    <label htmlFor="vat" className="text-sm font-medium text-slate-700">VAT 포함 금액으로 보기</label>
                  </div>
                </div>
              </div>

              <div className="lg:sticky lg:top-24 lg:self-start">
                <div className="rounded-[28px] p-6 text-white shadow-2xl" style={{ backgroundColor: theme.primary }}>
                  <div className="text-sm font-semibold uppercase tracking-[0.2em]" style={{ color: theme.accent }}>Integrated Estimate</div>
                  <h3 className="mt-3 text-2xl font-bold">통합 견적 요약</h3>
                  <div className="mt-6 rounded-2xl bg-white/5 p-5">
                    <div className="flex items-center justify-between text-sm text-slate-300"><span>설립 패키지</span><span className="font-semibold text-white">{foundationPkg?.name}</span></div>
                    <div className="mt-3 flex items-center justify-between text-sm text-slate-300"><span>브랜딩 패키지</span><span className="font-semibold text-white">{brandingPkg?.name}</span></div>
                    <div className="mt-3 flex items-center justify-between text-sm text-slate-300"><span>브랜딩 옵션</span><span className="font-semibold text-white">{selectedAddons.length}개</span></div>
                    <div className="mt-3 flex items-center justify-between text-sm text-slate-300"><span>브랜드 방향</span><span className="font-semibold text-white">{directions.find((d) => d.id === selectedDirection)?.label}</span></div>
                    <div className="mt-4 border-t border-white/10 pt-4">
                      <div className="text-sm text-slate-300">총 견적{vatIncluded ? " (VAT 포함)" : ""}</div>
                      <div className="mt-2 text-4xl font-bold" style={{ color: theme.accent }}>{formatKRW(total)}</div>
                    </div>
                  </div>
                  <a href="#contact" className="mt-6 block w-full rounded-2xl px-5 py-4 text-center font-bold text-[#0A1F33]" style={{ backgroundColor: theme.accent }}>
                    이 구성으로 상담 신청
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-slate-200 py-20" style={{ backgroundColor: theme.cardBg }}>
          <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-12">
            <div className="grid gap-8 lg:grid-cols-2">
              <div className="rounded-[28px] border border-slate-200 p-6 shadow-sm">
                <SectionHeader eyebrow="Payment" title={content.paymentTitle} desc={content.paymentDescription} />
                <div className="mt-8 rounded-2xl bg-slate-50 p-5">
                  <div className="grid gap-4 md:grid-cols-3">
                    <div><div className="text-xs font-semibold text-slate-500">은행</div><div className="mt-1 text-lg font-bold">{content.bankName}</div></div>
                    <div><div className="text-xs font-semibold text-slate-500">계좌번호</div><div className="mt-1 text-lg font-bold">{content.bankAccount}</div></div>
                    <div><div className="text-xs font-semibold text-slate-500">예금주</div><div className="mt-1 text-lg font-bold">{content.bankHolder}</div></div>
                  </div>
                </div>
                <div className="mt-5 flex flex-wrap gap-3">
                  <button type="button" onClick={() => copyText(content.bankAccount)} className="rounded-xl px-5 py-3 text-sm font-bold text-white" style={{ backgroundColor: theme.primary }}>
                    계좌번호 복사
                  </button>
                  <button type="button" onClick={() => copyText(`${content.bankName} ${content.bankAccount} ${content.bankHolder}`)} className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-bold text-slate-700">
                    전체 정보 복사
                  </button>
                </div>
              </div>

              <div id="contact" className="rounded-[28px] border border-slate-200 p-6 shadow-sm">
                <SectionHeader eyebrow="Contact" title={content.contactTitle} desc={content.contactDescription} />
                <div className="mt-4 text-sm leading-7 text-slate-600">
                  <div>전화: {content.phone}</div>
                  <div>이메일: {content.email}</div>
                </div>
                <form onSubmit={submitInquiry} className="mt-6">
                  <div className="grid gap-5 md:grid-cols-2">
                    <input value={form.organization} onChange={(e) => setForm((prev) => ({ ...prev, organization: e.target.value }))} placeholder="기관명" className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-slate-800" />
                    <input value={form.name} onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))} placeholder="담당자명" className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-slate-800" />
                    <input value={form.phone} onChange={(e) => setForm((prev) => ({ ...prev, phone: e.target.value }))} placeholder="연락처" className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-slate-800" />
                    <input value={form.email} onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))} placeholder="이메일" className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-slate-800" />
                  </div>
                  <textarea value={form.description} onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))} rows={6} placeholder="요청사항" className="mt-5 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-slate-800" />
                  <button type="submit" className="mt-6 w-full rounded-2xl px-6 py-4 text-lg font-bold text-white" style={{ backgroundColor: theme.primary }}>
                    상담 신청하기
                  </button>
                  {inquirySaved ? <div className="mt-4 rounded-xl bg-emerald-50 p-4 text-sm font-semibold text-emerald-700">문의가 저장된 것으로 가정한 데모 상태입니다.</div> : null}
                </form>
              </div>
            </div>
          </div>
        </section>

        {adminLoggedIn ? (
          <section className="mx-auto max-w-7xl px-6 py-20 md:px-10 lg:px-12">
            <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-xl md:p-8">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <div className="text-sm font-semibold uppercase tracking-[0.2em]" style={{ color: theme.accent }}>Admin CMS</div>
                  <h2 className="mt-2 text-3xl font-bold text-slate-900">홈페이지 편집 패널</h2>
                  <p className="mt-2 text-sm leading-7 text-slate-500">문구, 연락처, 입금계좌, 색상 테마를 수정하고 저장할 수 있습니다.</p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <button type="button" onClick={persist} className="rounded-xl px-5 py-3 text-sm font-bold text-white" style={{ backgroundColor: theme.primary }}>변경사항 저장</button>
                  <button type="button" onClick={reset} className="rounded-xl bg-slate-200 px-5 py-3 text-sm font-bold text-slate-800">기본값 초기화</button>
                </div>
              </div>

              {saveMessage ? <div className="mt-5 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">{saveMessage}</div> : null}

              <div className="mt-8 grid gap-8 lg:grid-cols-2">
                <AdminField label="사이트 이름" value={content.siteName} onChange={(v) => updateContent("siteName", v)} />
                <AdminField label="사이트 부제" value={content.siteSubtitle} onChange={(v) => updateContent("siteSubtitle", v)} />
                <AdminField label="상단 배지" value={content.heroBadge} onChange={(v) => updateContent("heroBadge", v)} />
                <AdminField label="연락처" value={content.phone} onChange={(v) => updateContent("phone", v)} />
                <AdminField label="이메일" value={content.email} onChange={(v) => updateContent("email", v)} />
                <AdminField label="은행명" value={content.bankName} onChange={(v) => updateContent("bankName", v)} />
                <AdminField label="계좌번호" value={content.bankAccount} onChange={(v) => updateContent("bankAccount", v)} />
                <AdminField label="예금주" value={content.bankHolder} onChange={(v) => updateContent("bankHolder", v)} />
                <div className="lg:col-span-2">
                  <AdminField label="메인 제목" value={content.heroTitle} onChange={(v) => updateContent("heroTitle", v)} textarea />
                </div>
                <div className="lg:col-span-2">
                  <AdminField label="메인 설명" value={content.heroDescription} onChange={(v) => updateContent("heroDescription", v)} textarea />
                </div>
                <AdminField label="설립유형 섹션 제목" value={content.establishmentTitle} onChange={(v) => updateContent("establishmentTitle", v)} />
                <AdminField label="브랜딩 섹션 제목" value={content.brandingTitle} onChange={(v) => updateContent("brandingTitle", v)} />
                <AdminField label="입금 섹션 제목" value={content.paymentTitle} onChange={(v) => updateContent("paymentTitle", v)} />
                <AdminField label="상담 섹션 제목" value={content.contactTitle} onChange={(v) => updateContent("contactTitle", v)} />
                <AdminField label="기본색" value={content.primary} onChange={(v) => updateContent("primary", v)} color />
                <AdminField label="보조색" value={content.secondary} onChange={(v) => updateContent("secondary", v)} color />
                <AdminField label="강조색" value={content.accent} onChange={(v) => updateContent("accent", v)} color />
                <AdminField label="배경색" value={content.bodyBg} onChange={(v) => updateContent("bodyBg", v)} color />
              </div>
            </div>
          </section>
        ) : null}
      </main>

      <footer className="border-t border-slate-200 bg-white/70">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-8 text-sm text-slate-600 md:flex-row md:items-center md:justify-between md:px-10 lg:px-12">
          <div>{content.footerText}</div>
          <div className="flex flex-wrap gap-4">
            <span>{content.bankName} {content.bankAccount}</span>
            <span>{content.bankHolder}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

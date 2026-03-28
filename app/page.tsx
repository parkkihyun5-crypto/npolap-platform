"use client";

import React, { useEffect, useMemo, useState } from "react";

// --- Types & Interfaces ---
interface Service {
  id: string;
  title: string;
  desc: string;
}

interface SiteConfig {
  platformName: string;
  platformSubtitle: string;
  heroTitle: string;
  heroDescription: string;
  primaryButton: string;
  secondaryButton: string;
  topNotice: string;
  accent: string;
  primary: string;
  secondary: string;
  bodyBg: string;
  cardBg: string;
  textColor: string;
  phone: string;
  email: string;
  bankName: string;
  bankAccount: string;
  bankHolder: string;
  footerText: string;
  services: Service[];
  establishmentIntroTitle: string;
  establishmentIntroDescription: string;
  brandingIntroTitle: string;
  brandingIntroDescription: string;
}

interface PackageItem {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  range: string;
  description: string;
  features: string[];
  badge: string;
  popular?: boolean;
}

interface AddonItem {
  id: string;
  label: string;
  price: number;
}

interface Inquiry {
  id: number;
  organization: string;
  name: string;
  phone: string;
  email: string;
  description: string;
  establishmentPackage?: string;
  package?: string;
  addons: string[];
  direction?: string;
  establishmentType: string;
  total: number;
  createdAt: string;
}

// --- Constants ---
const STORAGE_KEYS = {
  site: "pilu-platform-site-v3",
  auth: "pilu-platform-auth-v3",
  inquiries: "pilu-platform-inquiries-v3",
};

const ADMIN_CREDENTIAL = {
  username: "admin",
  password: "ILU2026!",
};

const DEFAULT_SITE: SiteConfig = {
  platformName: "공익법인 종합컨설팅 플랫폼",
  platformSubtitle: "설립·정관·세무·브랜딩·운영까지 통합 지원",
  heroTitle: "공익법인 설립과 운영에 필요한 모든 컨설팅을 하나의 플랫폼에서",
  heroDescription:
    "법인 설립, 정관 검토, 고유번호증·계좌개설, 공익법인 운영, 문서작성, 브랜딩, 홈페이지 구축까지 실무 중심으로 연결하는 통합 컨설팅 플랫폼입니다.",
  primaryButton: "설립유형 검토 보기",
  secondaryButton: "브랜딩 서비스 보기",
  topNotice: "International Leaders Union · Public Interest Corporation Consulting Platform",
  accent: "#C9A86A",
  primary: "#0A1F33",
  secondary: "#163D68",
  bodyBg: "#F8FAFC",
  cardBg: "#FFFFFF",
  textColor: "#0F172A",
  phone: "010-0000-0000",
  email: "contact@example.com",
  bankName: "우리은행",
  bankAccount: "1005-404-403203",
  bankHolder: "국제지도자연합",
  footerText: "© International Leaders Union. All rights reserved.",
  services: [
    { id: "corp-establishment", title: "법인 설립 컨설팅", desc: "사단법인·공익법인 설립 준비, 정관 설계, 창립총회 문서, 인허가 대응을 체계적으로 지원합니다." },
    { id: "governance", title: "운영·거버넌스 자문", desc: "정관 변경, 임원 구성, 회의록, 규정 정비, 의사결정 구조 설계를 지원합니다." },
    { id: "tax-compliance", title: "세무·행정 실무", desc: "고유번호증, 계좌개설, 증빙 정리, 신고 준비, 행정 제출용 문서 정리를 지원합니다." },
    { id: "branding", title: "CI·BI 브랜딩 서비스", desc: "기관의 신뢰도를 높이는 로고, 아이덴티티, 브랜드 문서 체계를 설계합니다." },
  ],
  establishmentIntroTitle: "비영리·비영리법인 설립 유형별 검토사항",
  establishmentIntroDescription: "임의단체, 사단법인, 재단법인, 공익법인 중 어떤 형태가 목표와 운영 구조에 가장 적합한지 비교·검토할 수 있도록 설계한 메뉴입니다.",
  brandingIntroTitle: "브랜딩 서비스",
  brandingIntroDescription: "아래 메뉴는 공익법인 종합컨설팅 플랫폼 안에 통합된 브랜딩 서비스 섹션입니다. 고객은 패키지를 선택하고 즉시 견적을 확인할 수 있습니다.",
};

const DEFAULT_PACKAGES: PackageItem[] = [
  { id: "starter", name: "STARTER", subtitle: "BI Lite", price: 1500000, range: "30~150만원", description: "개인·초기 단체를 위한 로고 중심 패키지", features: ["로고 1안", "기본 컬러 제안", "수정 1~2회", "PNG/JPG 제공"], badge: "입문형" },
  { id: "standard", name: "STANDARD", subtitle: "BI Pro", price: 3000000, range: "200~500만원", description: "스타트업과 중소기관에 적합한 표준 패키지", features: ["로고 2~3안", "컬러 시스템", "수정 3~5회", "AI/PNG 제공"], badge: "표준형" },
  { id: "premium", name: "PREMIUM", subtitle: "CI Basic", price: 8000000, range: "600~1,200만원", description: "법인·NGO·기관을 위한 전략형 CI 패키지", features: ["로고 3~5안", "브랜드 컨셉", "응용 디자인", "기본 가이드북"], badge: "가장 많이 선택", popular: true },
  { id: "signature", name: "SIGNATURE", subtitle: "CI Full", price: 20000000, range: "1,500~3,000만원", description: "국제기관급 아이덴티티 시스템 구축 패키지", features: ["전략 기반 설계", "다층 로고 시스템", "확장 가이드북", "브랜드 자산 구축"], badge: "최상위" },
];

const DEFAULT_ADDONS: AddonItem[] = [
  { id: "naming", label: "네이밍 개발", price: 2000000 },
  { id: "slogan", label: "슬로건 개발", price: 1000000 },
  { id: "ppt", label: "PPT 템플릿", price: 1000000 },
  { id: "website", label: "홈페이지 UI 설계", price: 5000000 },
  { id: "sns", label: "SNS 브랜드 키트", price: 1000000 },
  { id: "signage", label: "간판·사인 디자인", price: 2000000 },
];

const DEFAULT_FOUNDATION_PACKAGES: PackageItem[] = [
  { id: "ngo-lite", name: "임의단체 설립 패키지", subtitle: "Basic Filing", price: 500000, range: "50만원", description: "세무서 신고 및 기본 운영 구조 설계", features: ["단체 성격 검토", "신고 서류 정리", "기본 운영구조 자문", "초기 문서 체크리스트"], badge: "입문형" },
  { id: "association-consulting", name: "사단법인 설립 패키지", subtitle: "Association Setup", price: 3000000, range: "300만원", description: "정관 설계, 주무관청 대응, 사무국 실사 준비까지 포함한 표준 패키지", features: ["정관 설계", "창립총회 문안", "허가 서류 자문", "사무국 실사 준비"], badge: "표준형", popular: true },
  { id: "foundation-consulting", name: "재단법인 설립 패키지", subtitle: "Foundation Setup", price: 7000000, range: "700만원", description: "출연재산 구조, 이사회 설계, 허가 전략을 포함한 고난도 패키지", features: ["출연재산 구조 검토", "이사회 체계 설계", "허가 전략 자문", "장기 운영모델 설계"], badge: "고급형" },
  { id: "public-benefit-consulting", name: "공익법인 지정 패키지", subtitle: "Public Benefit", price: 12000000, range: "1,200만원", description: "공익법인 지정 전략, 세제 구조, 공익성 입증체계까지 포함한 최고급 패키지", features: ["공익성 구조 설계", "세제 요건 검토", "지정 전략 자문", "운영 통제체계 설계"], badge: "최상위" },
];

const DIRECTIONS = [
  { id: "global", icon: "🌍", label: "글로벌 기관형" },
  { id: "public", icon: "🏛", label: "공공기관형" },
  { id: "business", icon: "💼", label: "기업형" },
  { id: "culture", icon: "🎨", label: "문화예술형" },
  { id: "sustainability", icon: "🌱", label: "지속가능성 중심" },
];

const ESTABLISHMENT_TYPES = [
  { id: "voluntary", name: "비영리 임의단체", legalNature: "자율적 모임", procedure: "세무서 신고", difficulty: "매우 쉬움", asset: "없음", structure: "대표 중심", decision: "대표 결정", term: "종신직 가능", authority: "대표 개인 중심", license: "대표 개인 중심", business: "친목·활동", donation: "제한", receipt: "불가", government: "낮음", credibility: "낮음", finance: "회비 중심", period: "1~3일", burden: "낮음", cost: "30~50만", summary: "출발은 빠르지만 공신력과 제도적 확장성은 제한적입니다." },
  { id: "association", name: "사단법인(비영리)", legalNature: "회원 기반 법인", procedure: "주무관청 허가 + 법원 등기", difficulty: "어려움", asset: "법적 기준 없음 (통상 3천만~1억)", structure: "회원 중심", decision: "총회 중심 민주 구조", term: "임기제 필수 (2~4년)", authority: "법인 중심", license: "법인 중심", business: "공익·협력 사업", donation: "일정 금액 이상 신고", receipt: "지정기부금단체 지정 시 가능", government: "정부 위탁사업 가능", credibility: "높음", finance: "회비 + 보조금", period: "3~6개월", burden: "중간", cost: "200~300만", summary: "공익성과 회원 구조를 갖춘 가장 표준적인 비영리법인 모델입니다." },
  { id: "foundation", name: "재단법인(비영리)", legalNature: "자산 기반 법인", procedure: "주무관청 허가 + 법원 등기", difficulty: "매우 어려움", asset: "3억~50억", structure: "이사회 중심", decision: "이사회 중심", term: "임기제 필수", authority: "출연 재산 기반 중심", license: "재단 중심", business: "연구·장학·재단사업", donation: "적극 가능", receipt: "지정 시 가능", government: "정책 연구 협력", credibility: "매우 높음", finance: "기금 수익", period: "6개월~1년", burden: "높음", cost: "300~500만", summary: "충분한 출연재산과 장기적 공익사업 구조가 있을 때 적합합니다." },
  { id: "public-benefit", name: "공익법인(지정)", legalNature: "정부 인증 공익기관", procedure: "법인 설립 후 국세청 지정", difficulty: "최고 수준", asset: "재단 수준 + 공익 요건", structure: "공익 거버넌스", decision: "이사회 + 공익 감독", term: "연임 제한 권고", authority: "공익 목적 중심", license: "공익 목적 중심", business: "사회 공헌 및 정책 협력", donation: "적극 가능", receipt: "가능 (세제 혜택)", government: "정책 수행 파트너", credibility: "최고", finance: "정부 + 대기업 후원", period: "법인 설립 후 추가 3개월", burden: "매우 높음", cost: "300~700만", summary: "최고 수준의 공신력을 갖지만 관리 기준과 공익성 요건이 매우 엄격합니다." },
];

const ASSOCIATION_REVIEW_POINTS = [
  { title: "목적 조항", desc: "법인의 설립 취지가 공익에 부합하고 구체적인지 검토합니다." },
  { title: "사업 범위", desc: "정관상 사업이 실제로 실행 가능하며 주무관청 소관 업무인지 확인합니다." },
  { title: "재산 출연", desc: "기본재산과 운영재산이 사업 수행에 충분한지 판단합니다." },
  { title: "임원 구성", desc: "목적사업 수행에 필요한 전문성과 도덕성을 갖춘 인원인지 살핍니다." },
  { title: "공익성 판단", desc: "법인의 활동이 특정 개인이나 집단에 귀속되지 않는 구조인지 검토합니다." },
];

const ADMIN_MENU = [
  { id: "dashboard", label: "대시보드" },
  { id: "site", label: "홈페이지 설정" },
  { id: "establishment", label: "설립유형·패키지 관리" },
  { id: "branding", label: "브랜딩 메뉴 관리" },
  { id: "inquiries", label: "상담 신청 관리" },
  { id: "deployment", label: "배포·도메인 안내" },
];

// --- Helper Functions ---
function formatKRW(value: number) {
  return new Intl.NumberFormat("ko-KR", {
    style: "currency",
    currency: "KRW",
    maximumFractionDigits: 0,
  }).format(value || 0);
}

function copyToClipboard(text: string) {
  if (typeof navigator !== "undefined" && navigator.clipboard) {
    navigator.clipboard.writeText(text);
  }
}

function loadJson(key: string, fallback: any) {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function saveJson(key: string, value: any) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

// --- UI Components ---
function SectionHeading({ eyebrow, title, description, center = false }: { eyebrow: string; title: string; description?: string; center?: boolean }) {
  return (
    <div className={center ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <p className="text-sm font-semibold uppercase tracking-[0.2em]" style={{ color: "var(--accent)" }}>
        {eyebrow}
      </p>
      <h2 className="mt-3 text-3xl font-bold md:text-4xl">{title}</h2>
      {description ? <p className="mt-4 text-slate-600">{description}</p> : null}
    </div>
  );
}

function AdminInput({ label, value, onChange, textarea = false, type = "text" }: { label: string; value: string; onChange: (v: string) => void; textarea?: boolean; type?: string }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-slate-700">{label}</label>
      {textarea ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={4}
          className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-slate-800"
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-slate-800"
        />
      )}
    </div>
  );
}

function AdminColor({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-slate-700">{label}</label>
      <div className="flex items-center gap-3 rounded-xl border border-slate-300 bg-white px-3 py-2">
        <input type="color" value={value} onChange={(e) => onChange(e.target.value)} className="h-10 w-12 border-0 bg-transparent p-0" />
        <input value={value} onChange={(e) => onChange(e.target.value)} className="flex-1 border-0 bg-transparent text-sm outline-none" />
      </div>
    </div>
  );
}

function PackageCard({ item, active, onClick }: { item: PackageItem; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group rounded-[24px] border p-6 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-xl ${
        active ? "border-slate-900 ring-2 ring-slate-200" : "border-slate-200"
      }`}
      style={{ backgroundColor: "var(--card-bg)", borderColor: item.popular ? "var(--accent)" : undefined }}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold" style={{ color: "var(--accent)" }}>{item.badge}</p>
          <h3 className="mt-2 text-2xl font-bold">{item.name}</h3>
          <p className="text-sm text-slate-500">{item.subtitle}</p>
        </div>
        {item.popular ? (
          <span className="rounded-full px-3 py-1 text-xs font-bold text-[#0A1F33]" style={{ backgroundColor: "var(--accent)" }}>
            추천
          </span>
        ) : null}
      </div>
      <div className="mt-6 text-3xl font-bold" style={{ color: "var(--primary)" }}>{item.range}</div>
      <p className="mt-4 min-h-[56px] text-sm leading-6 text-slate-600">{item.description}</p>
      <ul className="mt-6 space-y-3 text-sm text-slate-700">
        {item.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3">
            <span className="mt-1 inline-block h-2.5 w-2.5 rounded-full" style={{ backgroundColor: "var(--accent)" }} />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <div
        className="mt-8 rounded-xl px-4 py-3 text-center font-semibold text-white"
        style={{ backgroundColor: active ? "var(--primary)" : item.popular ? "var(--secondary)" : "#CBD5E1", color: active || item.popular ? "white" : "#0F172A" }}
      >
        {active ? "선택됨" : "이 패키지 선택"}
      </div>
    </button>
  );
}

function ServiceCard({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-[24px] border border-slate-200 p-6 shadow-sm" style={{ backgroundColor: "var(--card-bg)" }}>
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-slate-600">{desc}</p>
    </div>
  );
}

function EstablishmentTypeCard({ item, active, onClick }: { item: any; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-[24px] border p-6 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-xl ${
        active ? "border-slate-900 ring-2 ring-slate-200" : "border-slate-200"
      }`}
      style={{ backgroundColor: "var(--card-bg)", borderColor: active ? "var(--accent)" : undefined }}
    >
      <div className="text-sm font-semibold" style={{ color: "var(--accent)" }}>{item.legalNature}</div>
      <h3 className="mt-2 text-2xl font-bold">{item.name}</h3>
      <p className="mt-3 text-sm leading-7 text-slate-600">{item.summary}</p>
      <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
        <div className="rounded-xl bg-slate-50 p-3">
          <div className="text-xs text-slate-500">설립 절차</div>
          <div className="mt-1 font-semibold text-slate-800">{item.procedure}</div>
        </div>
        <div className="rounded-xl bg-slate-50 p-3">
          <div className="text-xs text-slate-500">설립 난이도</div>
          <div className="mt-1 font-semibold text-slate-800">{item.difficulty}</div>
        </div>
        <div className="rounded-xl bg-slate-50 p-3">
          <div className="text-xs text-slate-500">설립 기간</div>
          <div className="mt-1 font-semibold text-slate-800">{item.period}</div>
        </div>
        <div className="rounded-xl bg-slate-50 p-3">
          <div className="text-xs text-slate-500">행정 부담</div>
          <div className="mt-1 font-semibold text-slate-800">{item.burden}</div>
        </div>
      </div>
    </button>
  );
}

function ComparisonRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[120px_1fr] gap-4 border-b border-slate-100 py-3 text-sm last:border-b-0">
      <div className="font-semibold text-slate-500">{label}</div>
      <div className="text-slate-800">{value}</div>
    </div>
  );
}

// --- Main App Component ---
export default function PublicInterestConsultingPlatform() {
  const [site, setSite] = useState<SiteConfig>(DEFAULT_SITE);
  const [packages, setPackages] = useState<PackageItem[]>(DEFAULT_PACKAGES);
  const [foundationPackages, setFoundationPackages] = useState<PackageItem[]>(DEFAULT_FOUNDATION_PACKAGES);
  const [addons, setAddons] = useState<AddonItem[]>(DEFAULT_ADDONS);
  const [selectedPackage, setSelectedPackage] = useState("premium");
  const [selectedFoundationPackage, setSelectedFoundationPackage] = useState("association-consulting");
  const [selectedAddons, setSelectedAddons] = useState<string[]>(["naming", "ppt"]);
  const [selectedDirection, setSelectedDirection] = useState("global");
  const [selectedEstablishment, setSelectedEstablishment] = useState("association");
  const [vatIncluded, setVatIncluded] = useState(false);
  const [form, setForm] = useState({ organization: "", name: "", phone: "", email: "", description: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [view, setView] = useState("site");
  const [adminTab, setAdminTab] = useState("dashboard");
  const [adminLoggedIn, setAdminLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [saveMessage, setSaveMessage] = useState("");
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);

  useEffect(() => {
    const savedSite = loadJson(STORAGE_KEYS.site, DEFAULT_SITE);
    const savedAuth = loadJson(STORAGE_KEYS.auth, { loggedIn: false });
    const savedInquiries = loadJson(STORAGE_KEYS.inquiries, []);
    setSite(savedSite);
    setAdminLoggedIn(Boolean(savedAuth.loggedIn));
    setInquiries(savedInquiries);
  }, []);

  useEffect(() => {
    saveJson(STORAGE_KEYS.site, site);
  }, [site]);

  useEffect(() => {
    saveJson(STORAGE_KEYS.auth, { loggedIn: adminLoggedIn });
  }, [adminLoggedIn]);

  useEffect(() => {
    saveJson(STORAGE_KEYS.inquiries, inquiries);
  }, [inquiries]);

  const pkg = packages.find((item) => item.id === selectedPackage);
  const foundationPkg = foundationPackages.find((item) => item.id === selectedFoundationPackage);
  const selectedType = ESTABLISHMENT_TYPES.find((item) => item.id === selectedEstablishment) || ESTABLISHMENT_TYPES[1];
  const addonTotal = selectedAddons.reduce((sum, id) => {
    const found = addons.find((item) => item.id === id);
    return sum + (found?.price || 0);
  }, 0);
  const subtotal = (pkg?.price || 0) + addonTotal + (foundationPkg?.price || 0);
  const vatAmount = Math.round(subtotal * 0.1);
  const total = vatIncluded ? subtotal + vatAmount : subtotal;

  const themeVars = useMemo(
    () => ({
      "--primary": site.primary,
      "--secondary": site.secondary,
      "--accent": site.accent,
      "--card-bg": site.cardBg,
    } as React.CSSProperties),
    [site]
  );

  const selectedAddonLabels = selectedAddons
    .map((id) => addons.find((item) => item.id === id)?.label)
    .filter((label): label is string => !!label);

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  const updateSite = (key: keyof SiteConfig, value: any) => {
    setSite((prev) => ({ ...prev, [key]: value }));
  };

  const updateService = (index: number, key: keyof Service, value: string) => {
    setSite((prev) => ({
      ...prev,
      services: prev.services.map((item, i) => (i === index ? { ...item, [key]: value } : item)),
    }));
  };

  const updatePackage = (index: number, key: keyof PackageItem, value: any) => {
    setPackages((prev) => prev.map((item, i) => (i === index ? { ...item, [key]: key === "price" ? Number(value) || 0 : value } : item)));
  };

  const updateAddon = (index: number, key: keyof AddonItem, value: any) => {
    setAddons((prev) => prev.map((item, i) => (i === index ? { ...item, [key]: key === "price" ? Number(value) || 0 : value } : item)));
  };

  const updateFoundationPackage = (index: number, key: keyof PackageItem, value: any) => {
    setFoundationPackages((prev) => prev.map((item, i) => (i === index ? { ...item, [key]: key === "price" ? Number(value) || 0 : value } : item)));
  };

  const handleLogin = (un: string, pw: string) => {
    if (un === ADMIN_CREDENTIAL.username && pw === ADMIN_CREDENTIAL.password) {
      setAdminLoggedIn(true);
      setLoginError("");
      setView("admin");
    } else {
      setLoginError("아이디 또는 비밀번호가 올바르지 않습니다.");
    }
  };

  const logout = () => {
    setAdminLoggedIn(false);
    setView("site");
    setAdminTab("dashboard");
  };

  const persistNotice = () => {
    saveJson(STORAGE_KEYS.site, site);
    setSaveMessage("관리자 변경사항이 저장되었습니다.");
    setTimeout(() => setSaveMessage(""), 1800);
  };

  const resetSite = () => {
    setSite(DEFAULT_SITE);
    setPackages(DEFAULT_PACKAGES);
    setAddons(DEFAULT_ADDONS);
    setFoundationPackages(DEFAULT_FOUNDATION_PACKAGES);
    setSaveMessage("기본값으로 초기화했습니다.");
    setTimeout(() => setSaveMessage(""), 1800);
  };

  const submitInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    const record: Inquiry = {
      id: Date.now(),
      ...form,
      establishmentPackage: foundationPkg?.name,
      package: pkg?.name,
      addons: selectedAddonLabels,
      direction: DIRECTIONS.find((item) => item.id === selectedDirection)?.label,
      establishmentType: selectedType.name,
      total,
      createdAt: new Date().toLocaleString("ko-KR"),
    };
    setInquiries((prev) => [record, ...prev]);
    setIsSubmitted(true);
    setForm({ organization: "", name: "", phone: "", email: "", description: "" });
    setTimeout(() => setIsSubmitted(false), 2000);
  };

  const removeInquiry = (id: number) => {
    setInquiries((prev) => prev.filter((item) => item.id !== id));
  };

  // --- Render Sections ---
  return (
    <div style={{ ...themeVars, backgroundColor: site.bodyBg, color: site.textColor }} className="min-h-screen">
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6 lg:px-8">
          <div>
            <div className="text-lg font-bold" style={{ color: site.primary }}>{site.platformName}</div>
            <div className="text-xs text-slate-500">{site.platformSubtitle}</div>
          </div>
          <div className="flex items-center gap-2">
            <button type="button" onClick={() => setView("site")} className={`rounded-lg px-4 py-2 text-sm font-semibold ${view === "site" ? "text-white" : "bg-slate-100 text-slate-700"}`} style={view === "site" ? { backgroundColor: site.primary } : {}}>홈페이지</button>
            <button type="button" onClick={() => setView("admin")} className={`rounded-lg px-4 py-2 text-sm font-semibold ${view === "admin" ? "text-white" : "bg-slate-100 text-slate-700"}`} style={view === "admin" ? { backgroundColor: site.primary } : {}}>관리자</button>
            {adminLoggedIn && <button type="button" onClick={logout} className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700">로그아웃</button>}
          </div>
        </div>
      </header>

      {view === "admin" ? (
        <main className="mx-auto max-w-7xl px-4 py-8 md:px-6 lg:px-8">
          {!adminLoggedIn ? (
            <div className="mx-auto max-w-md rounded-[28px] border border-slate-200 bg-white p-8 shadow-xl">
              <div className="mb-6 text-center">
                <h2 className="text-3xl font-bold text-slate-900">관리자 로그인</h2>
              </div>
              <div className="space-y-4">
                <AdminInput label="아이디" value={form.organization} onChange={(v) => setForm(f => ({...f, organization: v}))} />
                <AdminInput label="비밀번호" type="password" value={form.name} onChange={(v) => setForm(f => ({...f, name: v}))} />
              </div>
              {loginError && <div className="mt-4 text-rose-600 text-sm">{loginError}</div>}
              <button onClick={() => handleLogin(form.organization, form.name)} className="mt-6 w-full rounded-xl bg-slate-900 px-4 py-3 font-bold text-white">로그인</button>
            </div>
          ) : (
            <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
              <aside className="rounded-[28px] bg-slate-900 p-5 text-white shadow-xl">
                <nav className="mt-6 space-y-2">
                  {ADMIN_MENU.map((menu) => (
                    <button key={menu.id} onClick={() => setAdminTab(menu.id)} className={`w-full rounded-xl px-4 py-3 text-left text-sm font-semibold ${adminTab === menu.id ? "text-slate-900" : "bg-white/5 text-white"}`} style={adminTab === menu.id ? { backgroundColor: site.accent } : {}}>{menu.label}</button>
                  ))}
                </nav>
              </aside>
              <section>
                {adminTab === "inquiries" && (
                  <div className="rounded-[28px] bg-white p-6 shadow-sm">
                    <h3 className="text-2xl font-bold">상담 신청 내역</h3>
                    <div className="mt-6 space-y-4">
                      {inquiries.map(item => (
                        <div key={item.id} className="border p-4 rounded-xl">
                          <div className="font-bold">{item.organization} - {item.name}</div>
                          <div className="text-sm text-slate-500">{item.createdAt} | {item.total.toLocaleString()}원</div>
                          <button onClick={() => removeInquiry(item.id)} className="text-rose-500 text-xs mt-2">삭제</button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {/* 다른 관리자 탭 내용들 생략 가능 혹은 필요한 부분 추가 */}
              </section>
            </div>
          )}
        </main>
      ) : (
        <main>
          {/* 홈페이지 메인 섹션 */}
          <section className="relative overflow-hidden text-white py-20" style={{ background: `linear-gradient(135deg, ${site.primary} 0%, ${site.secondary} 100%)` }}>
            <div className="relative mx-auto max-w-7xl px-6">
              <h1 className="text-4xl md:text-6xl font-bold">{site.heroTitle}</h1>
              <p className="mt-6 text-lg text-slate-200">{site.heroDescription}</p>
            </div>
          </section>

          {/* 서비스 카드 섹션 */}
          <section className="mx-auto max-w-7xl px-6 py-20">
            <SectionHeading eyebrow="Services" title="통합 컨설팅 서비스" center />
            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {site.services.map(s => <ServiceCard key={s.id} title={s.title} desc={s.desc} />)}
            </div>
          </section>

          {/* 설립유형 검토 섹션 */}
          <section id="establishment-review" className="bg-white py-20 border-t">
            <div className="mx-auto max-w-7xl px-6">
              <SectionHeading eyebrow="Establishment" title={site.establishmentIntroTitle} center />
              <div className="mt-12 grid gap-6 lg:grid-cols-4">
                {ESTABLISHMENT_TYPES.map(type => (
                  <EstablishmentTypeCard key={type.id} item={type} active={selectedEstablishment === type.id} onClick={() => setSelectedEstablishment(type.id)} />
                ))}
              </div>
            </div>
          </section>

          {/* 브랜딩 견적 섹션 */}
          <section id="branding-service" className="py-20 bg-slate-50">
            <div className="mx-auto max-w-7xl px-6">
              <SectionHeading eyebrow="Estimate" title="실시간 견적 확인" center />
              <div className="mt-12 grid gap-8 lg:grid-cols-3">
                <div className="lg:col-span-2 space-y-6">
                  {packages.map(p => <button key={p.id} onClick={() => setSelectedPackage(p.id)} className={`block w-full p-4 border rounded-xl ${selectedPackage === p.id ? 'border-blue-500 bg-blue-50' : 'bg-white'}`}>{p.name} - {p.range}</button>)}
                </div>
                <div className="bg-white p-6 rounded-[28px] shadow-lg border">
                  <h4 className="text-xl font-bold mb-4">최종 견적</h4>
                  <div className="text-3xl font-bold text-blue-600">{formatKRW(total)}</div>
                  <button className="w-full mt-6 py-3 bg-slate-900 text-white rounded-xl font-bold">상담 신청하기</button>
                </div>
              </div>
            </div>
          </section>
        </main>
      )}
      
      <footer className="p-8 border-t text-center text-sm text-slate-500">
        {site.footerText}
      </footer>
    </div>
  );
}
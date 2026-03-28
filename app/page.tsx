"use client";

import React, { useEffect, useMemo, useState } from "react";

const STORAGE_KEYS = {
  site: "pilu-platform-site-v3",
  auth: "pilu-platform-auth-v3",
  inquiries: "pilu-platform-inquiries-v3",
};

const ADMIN_CREDENTIAL = {
  username: "admin",
  password: "ILU2026!",
};

const DEFAULT_SITE = {
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
    {
      id: "corp-establishment",
      title: "법인 설립 컨설팅",
      desc: "사단법인·공익법인 설립 준비, 정관 설계, 창립총회 문서, 인허가 대응을 체계적으로 지원합니다.",
    },
    {
      id: "governance",
      title: "운영·거버넌스 자문",
      desc: "정관 변경, 임원 구성, 회의록, 규정 정비, 의사결정 구조 설계를 지원합니다.",
    },
    {
      id: "tax-compliance",
      title: "세무·행정 실무",
      desc: "고유번호증, 계좌개설, 증빙 정리, 신고 준비, 행정 제출용 문서 정리를 지원합니다.",
    },
    {
      id: "branding",
      title: "CI·BI 브랜딩 서비스",
      desc: "기관의 신뢰도를 높이는 로고, 아이덴티티, 브랜드 문서 체계를 설계합니다.",
    },
  ],
  establishmentIntroTitle: "비영리·비영리법인 설립 유형별 검토사항",
  establishmentIntroDescription:
    "임의단체, 사단법인, 재단법인, 공익법인 중 어떤 형태가 목표와 운영 구조에 가장 적합한지 비교·검토할 수 있도록 설계한 메뉴입니다.",
  brandingIntroTitle: "브랜딩 서비스",
  brandingIntroDescription:
    "아래 메뉴는 공익법인 종합컨설팅 플랫폼 안에 통합된 브랜딩 서비스 섹션입니다. 고객은 패키지를 선택하고 즉시 견적을 확인할 수 있습니다.",
};

const DEFAULT_PACKAGES = [
  {
    id: "starter",
    name: "STARTER",
    subtitle: "BI Lite",
    price: 1500000,
    range: "30~150만원",
    description: "개인·초기 단체를 위한 로고 중심 패키지",
    features: ["로고 1안", "기본 컬러 제안", "수정 1~2회", "PNG/JPG 제공"],
    badge: "입문형",
  },
  {
    id: "standard",
    name: "STANDARD",
    subtitle: "BI Pro",
    price: 3000000,
    range: "200~500만원",
    description: "스타트업과 중소기관에 적합한 표준 패키지",
    features: ["로고 2~3안", "컬러 시스템", "수정 3~5회", "AI/PNG 제공"],
    badge: "표준형",
  },
  {
    id: "premium",
    name: "PREMIUM",
    subtitle: "CI Basic",
    price: 8000000,
    range: "600~1,200만원",
    description: "법인·NGO·기관을 위한 전략형 CI 패키지",
    features: ["로고 3~5안", "브랜드 컨셉", "응용 디자인", "기본 가이드북"],
    badge: "가장 많이 선택",
    popular: true,
  },
  {
    id: "signature",
    name: "SIGNATURE",
    subtitle: "CI Full",
    price: 20000000,
    range: "1,500~3,000만원",
    description: "국제기관급 아이덴티티 시스템 구축 패키지",
    features: ["전략 기반 설계", "다층 로고 시스템", "확장 가이드북", "브랜드 자산 구축"],
    badge: "최상위",
  },
];

const DEFAULT_ADDONS = [
  { id: "naming", label: "네이밍 개발", price: 2000000 },
  { id: "slogan", label: "슬로건 개발", price: 1000000 },
  { id: "ppt", label: "PPT 템플릿", price: 1000000 },
  { id: "website", label: "홈페이지 UI 설계", price: 5000000 },
  { id: "sns", label: "SNS 브랜드 키트", price: 1000000 },
  { id: "signage", label: "간판·사인 디자인", price: 2000000 },
];

const DEFAULT_FOUNDATION_PACKAGES = [
  {
    id: "ngo-lite",
    name: "임의단체 설립 패키지",
    subtitle: "Basic Filing",
    price: 500000,
    range: "50만원",
    description: "세무서 신고 및 기본 운영 구조 설계",
    features: ["단체 성격 검토", "신고 서류 정리", "기본 운영구조 자문", "초기 문서 체크리스트"],
    badge: "입문형",
  },
  {
    id: "association-consulting",
    name: "사단법인 설립 패키지",
    subtitle: "Association Setup",
    price: 3000000,
    range: "300만원",
    description: "정관 설계, 주무관청 대응, 사무국 실사 준비까지 포함한 표준 패키지",
    features: ["정관 설계", "창립총회 문안", "허가 서류 자문", "사무국 실사 준비"],
    badge: "표준형",
    popular: true,
  },
  {
    id: "foundation-consulting",
    name: "재단법인 설립 패키지",
    subtitle: "Foundation Setup",
    price: 7000000,
    range: "700만원",
    description: "출연재산 구조, 이사회 설계, 허가 전략을 포함한 고난도 패키지",
    features: ["출연재산 구조 검토", "이사회 체계 설계", "허가 전략 자문", "장기 운영모델 설계"],
    badge: "고급형",
  },
  {
    id: "public-benefit-consulting",
    name: "공익법인 지정 패키지",
    subtitle: "Public Benefit",
    price: 12000000,
    range: "1,200만원",
    description: "공익법인 지정 전략, 세제 구조, 공익성 입증체계까지 포함한 최고급 패키지",
    features: ["공익성 구조 설계", "세제 요건 검토", "지정 전략 자문", "운영 통제체계 설계"],
    badge: "최상위",
  },
];

const DIRECTIONS = [
  { id: "global", icon: "🌍", label: "글로벌 기관형" },
  { id: "public", icon: "🏛", label: "공공기관형" },
  { id: "business", icon: "💼", label: "기업형" },
  { id: "culture", icon: "🎨", label: "문화예술형" },
  { id: "sustainability", icon: "🌱", label: "지속가능성 중심" },
];

const ESTABLISHMENT_TYPES = [
  {
    id: "voluntary",
    name: "비영리 임의단체",
    legalNature: "자율적 모임",
    procedure: "세무서 신고",
    difficulty: "매우 쉬움",
    asset: "없음",
    structure: "대표 중심",
    decision: "대표 결정",
    term: "종신직 가능",
    authority: "대표 개인 중심",
    license: "대표 개인 중심",
    business: "친목·활동",
    donation: "제한",
    receipt: "불가",
    government: "낮음",
    credibility: "낮음",
    finance: "회비 중심",
    period: "1~3일",
    burden: "낮음",
    cost: "30~50만",
    summary: "출발은 빠르지만 공신력과 제도적 확장성은 제한적입니다.",
  },
  {
    id: "association",
    name: "사단법인(비영리)",
    legalNature: "회원 기반 법인",
    procedure: "주무관청 허가 + 법원 등기",
    difficulty: "어려움",
    asset: "법적 기준 없음 (통상 3천만~1억)",
    structure: "회원 중심",
    decision: "총회 중심 민주 구조",
    term: "임기제 필수 (2~4년)",
    authority: "법인 중심",
    license: "법인 중심",
    business: "공익·협력 사업",
    donation: "일정 금액 이상 신고",
    receipt: "지정기부금단체 지정 시 가능",
    government: "정부 위탁사업 가능",
    credibility: "높음",
    finance: "회비 + 보조금",
    period: "3~6개월",
    burden: "중간",
    cost: "200~300만",
    summary: "공익성과 회원 구조를 갖춘 가장 표준적인 비영리법인 모델입니다.",
  },
  {
    id: "foundation",
    name: "재단법인(비영리)",
    legalNature: "자산 기반 법인",
    procedure: "주무관청 허가 + 법원 등기",
    difficulty: "매우 어려움",
    asset: "3억~50억",
    structure: "이사회 중심",
    decision: "이사회 중심",
    term: "임기제 필수",
    authority: "출연 재산 기반 중심",
    license: "재단 중심",
    business: "연구·장학·재단사업",
    donation: "적극 가능",
    receipt: "지정 시 가능",
    government: "정책 연구 협력",
    credibility: "매우 높음",
    finance: "기금 수익",
    period: "6개월~1년",
    burden: "높음",
    cost: "300~500만",
    summary: "충분한 출연재산과 장기적 공익사업 구조가 있을 때 적합합니다.",
  },
  {
    id: "public-benefit",
    name: "공익법인(지정)",
    legalNature: "정부 인증 공익기관",
    procedure: "법인 설립 후 국세청 지정",
    difficulty: "최고 수준",
    asset: "재단 수준 + 공익 요건",
    structure: "공익 거버넌스",
    decision: "이사회 + 공익 감독",
    term: "연임 제한 권고",
    authority: "공익 목적 중심",
    license: "공익 목적 중심",
    business: "사회 공헌 및 정책 협력",
    donation: "적극 가능",
    receipt: "가능 (세제 혜택)",
    government: "정책 수행 파트너",
    credibility: "최고",
    finance: "정부 + 대기업 후원",
    period: "법인 설립 후 추가 3개월",
    burden: "매우 높음",
    cost: "300~700만",
    summary: "최고 수준의 공신력을 갖지만 관리 기준과 공익성 요건이 매우 엄격합니다.",
  },
];

const ASSOCIATION_REVIEW_POINTS = [
  {
    title: "목적 조항",
    desc: "법인의 설립 취지가 공익에 부합하고 구체적인지 검토합니다.",
  },
  {
    title: "사업 범위",
    desc: "정관상 사업이 실제로 실행 가능하며 주무관청 소관 업무인지 확인합니다.",
  },
  {
    title: "재산 출연",
    desc: "기본재산과 운영재산이 사업 수행에 충분한지 판단합니다.",
  },
  {
    title: "임원 구성",
    desc: "목적사업 수행에 필요한 전문성과 도덕성을 갖춘 인원인지 살핍니다.",
  },
  {
    title: "공익성 판단",
    desc: "법인의 활동이 특정 개인이나 집단에 귀속되지 않는 구조인지 검토합니다.",
  },
];

const ADMIN_MENU = [
  { id: "dashboard", label: "대시보드" },
  { id: "site", label: "홈페이지 설정" },
  { id: "establishment", label: "설립유형·패키지 관리" },
  { id: "branding", label: "브랜딩 메뉴 관리" },
  { id: "inquiries", label: "상담 신청 관리" },
  { id: "deployment", label: "배포·도메인 안내" },
];

function formatKRW(value: number) {
  return new Intl.NumberFormat("ko-KR", {
    style: "currency",
    currency: "KRW",
    maximumFractionDigits: 0,
  }).format(value || 0);
}

function copyToClipboard(text) {
  if (typeof navigator !== "undefined" && navigator.clipboard) {
    navigator.clipboard.writeText(text);
  }
}

function loadJson(key, fallback) {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function saveJson(key, value) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

function SectionHeading({ eyebrow, title, description, center = false }) {
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

function AdminInput({ label, value, onChange, textarea = false, type = "text" }) {
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

function AdminColor({ label, value, onChange }) {
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

function PackageCard({ item, active, onClick }) {
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

function ServiceCard({ title, desc }) {
  return (
    <div className="rounded-[24px] border border-slate-200 p-6 shadow-sm" style={{ backgroundColor: "var(--card-bg)" }}>
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-slate-600">{desc}</p>
    </div>
  );
}

function EstablishmentTypeCard({ item, active, onClick }) {
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

function ComparisonRow({ label, value }) {
  return (
    <div className="grid grid-cols-[120px_1fr] gap-4 border-b border-slate-100 py-3 text-sm last:border-b-0">
      <div className="font-semibold text-slate-500">{label}</div>
      <div className="text-slate-800">{value}</div>
    </div>
  );
}

function AdminLogin({ onLogin, error }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="mx-auto max-w-md rounded-[28px] border border-slate-200 bg-white p-8 shadow-xl">
      <div className="mb-6 text-center">
        <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Admin Login</div>
        <h2 className="mt-2 text-3xl font-bold text-slate-900">관리자 로그인</h2>
        <p className="mt-2 text-sm text-slate-500">공익법인 종합컨설팅 플랫폼 관리자 전용 페이지입니다.</p>
      </div>
      <div className="space-y-4">
        <AdminInput label="아이디" value={username} onChange={setUsername} />
        <AdminInput label="비밀번호" type="password" value={password} onChange={setPassword} />
      </div>
      {error ? <div className="mt-4 rounded-xl bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">{error}</div> : null}
      <button
        type="button"
        onClick={() => onLogin(username, password)}
        className="mt-6 w-full rounded-xl bg-slate-900 px-4 py-3 font-bold text-white"
      >
        로그인
      </button>
      <div className="mt-4 rounded-xl bg-amber-50 px-4 py-3 text-xs leading-6 text-amber-800">
        데모 로그인 정보: <strong>admin</strong> / <strong>ILU2026!</strong>
      </div>
    </div>
  );
}

function AdminDashboard({ inquiries, site, packages, addons, foundationPackages }) {
  const totalBase = packages.reduce((sum, item) => sum + item.price, 0);
  const totalAddon = addons.reduce((sum, item) => sum + item.price, 0);
  const totalFoundation = foundationPackages.reduce((sum, item) => sum + item.price, 0);
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
      <div className="rounded-[24px] bg-white p-6 shadow-sm">
        <div className="text-sm text-slate-500">상담 신청 수</div>
        <div className="mt-2 text-3xl font-bold text-slate-900">{inquiries.length}건</div>
      </div>
      <div className="rounded-[24px] bg-white p-6 shadow-sm">
        <div className="text-sm text-slate-500">설립 패키지 총합</div>
        <div className="mt-2 text-3xl font-bold text-slate-900">{formatKRW(totalFoundation)}</div>
      </div>
      <div className="rounded-[24px] bg-white p-6 shadow-sm">
        <div className="text-sm text-slate-500">브랜딩 패키지 총합</div>
        <div className="mt-2 text-3xl font-bold text-slate-900">{formatKRW(totalBase)}</div>
      </div>
      <div className="rounded-[24px] bg-white p-6 shadow-sm">
        <div className="text-sm text-slate-500">브랜딩 옵션 총합</div>
        <div className="mt-2 text-3xl font-bold text-slate-900">{formatKRW(totalAddon)}</div>
      </div>
      <div className="rounded-[24px] bg-white p-6 shadow-sm">
        <div className="text-sm text-slate-500">입금 계좌</div>
        <div className="mt-2 text-lg font-bold text-slate-900">{site.bankName}</div>
        <div className="text-sm text-slate-600">{site.bankAccount} / {site.bankHolder}</div>
      </div>
    </div>
  );
}

export default function PublicInterestConsultingPlatform() {
  const [site, setSite] = useState(DEFAULT_SITE);
  const [packages, setPackages] = useState(DEFAULT_PACKAGES);
  const [foundationPackages, setFoundationPackages] = useState(DEFAULT_FOUNDATION_PACKAGES);
  const [addons, setAddons] = useState(DEFAULT_ADDONS);
  const [selectedPackage, setSelectedPackage] = useState("premium");
  const [selectedFoundationPackage, setSelectedFoundationPackage] = useState("association-consulting");
  const [selectedAddons, setSelectedAddons] = useState(["naming", "ppt"]);
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
  const [inquiries, setInquiries] = useState([]);

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
    }),
    [site]
  );

  const selectedAddonLabels = selectedAddons
    .map((id) => addons.find((item) => item.id === id)?.label)
    .filter(Boolean);

  const toggleAddon = (id) => {
    setSelectedAddons((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  const updateSite = (key, value) => {
    setSite((prev) => ({ ...prev, [key]: value }));
  };

  const updateService = (index, key, value) => {
    setSite((prev) => ({
      ...prev,
      services: prev.services.map((item, i) => (i === index ? { ...item, [key]: value } : item)),
    }));
  };

  const updatePackage = (index, key, value) => {
    setPackages((prev) => prev.map((item, i) => (i === index ? { ...item, [key]: key === "price" ? Number(value) || 0 : value } : item)));
  };

  const updateAddon = (index, key, value) => {
    setAddons((prev) => prev.map((item, i) => (i === index ? { ...item, [key]: key === "price" ? Number(value) || 0 : value } : item)));
  };

  const updateFoundationPackage = (index, key, value) => {
    setFoundationPackages((prev) => prev.map((item, i) => (i === index ? { ...item, [key]: key === "price" ? Number(value) || 0 : value } : item)));
  };

  const handleLogin = (username, password) => {
    if (username === ADMIN_CREDENTIAL.username && password === ADMIN_CREDENTIAL.password) {
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

  const submitInquiry = (e) => {
    e.preventDefault();
    const record = {
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

  const removeInquiry = (id) => {
    setInquiries((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div style={{ ...themeVars, backgroundColor: site.bodyBg, color: site.textColor }} className="min-h-screen">
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6 lg:px-8">
          <div>
            <div className="text-lg font-bold" style={{ color: site.primary }}>{site.platformName}</div>
            <div className="text-xs text-slate-500">{site.platformSubtitle}</div>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setView("site")}
              className={`rounded-lg px-4 py-2 text-sm font-semibold ${view === "site" ? "text-white" : "bg-slate-100 text-slate-700"}`}
              style={view === "site" ? { backgroundColor: site.primary } : {}}
            >
              홈페이지
            </button>
            <button
              type="button"
              onClick={() => setView("admin")}
              className={`rounded-lg px-4 py-2 text-sm font-semibold ${view === "admin" ? "text-white" : "bg-slate-100 text-slate-700"}`}
              style={view === "admin" ? { backgroundColor: site.primary } : {}}
            >
              관리자
            </button>
            {adminLoggedIn ? (
              <button type="button" onClick={logout} className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700">
                로그아웃
              </button>
            ) : null}
          </div>
        </div>
      </header>

      {view === "admin" ? (
        <main className="mx-auto max-w-7xl px-4 py-8 md:px-6 lg:px-8">
          {!adminLoggedIn ? (
            <AdminLogin onLogin={handleLogin} error={loginError} />
          ) : (
            <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
              <aside className="rounded-[28px] bg-slate-900 p-5 text-white shadow-xl">
                <div className="text-sm uppercase tracking-[0.2em] text-slate-400">Admin Panel</div>
                <div className="mt-2 text-2xl font-bold">진짜 관리자 페이지</div>
                <div className="mt-2 text-sm leading-7 text-slate-300">공익법인 종합컨설팅 플랫폼과 브랜딩 서비스 메뉴를 한 곳에서 관리합니다.</div>
                <nav className="mt-6 space-y-2">
                  {ADMIN_MENU.map((menu) => (
                    <button
                      key={menu.id}
                      type="button"
                      onClick={() => setAdminTab(menu.id)}
                      className={`w-full rounded-xl px-4 py-3 text-left text-sm font-semibold ${adminTab === menu.id ? "text-slate-900" : "bg-white/5 text-white"}`}
                      style={adminTab === menu.id ? { backgroundColor: site.accent } : {}}
                    >
                      {menu.label}
                    </button>
                  ))}
                </nav>
              </aside>

              <section>
                {adminTab === "dashboard" ? (
                  <div className="space-y-6">
                    <AdminDashboard inquiries={inquiries} site={site} packages={packages} addons={addons} foundationPackages={foundationPackages} />
                  </div>
                ) : null}

                {adminTab === "site" ? (
                  <div className="space-y-6">
                    <div className="rounded-[28px] bg-white p-6 shadow-sm">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <h3 className="text-2xl font-bold text-slate-900">홈페이지 설정</h3>
                          <p className="mt-1 text-sm text-slate-500">상단 메뉴와 설립유형 검토 섹션 제목까지 함께 수정할 수 있습니다.</p>
                        </div>
                        <div className="flex gap-2">
                          <button type="button" onClick={persistNotice} className="rounded-xl px-5 py-3 text-sm font-bold text-white" style={{ backgroundColor: site.primary }}>저장</button>
                          <button type="button" onClick={resetSite} className="rounded-xl bg-slate-200 px-5 py-3 text-sm font-bold text-slate-800">초기화</button>
                        </div>
                      </div>
                      {saveMessage ? <div className="mt-4 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">{saveMessage}</div> : null}

                      <div className="mt-8 grid gap-6 lg:grid-cols-2">
                        <AdminInput label="플랫폼명" value={site.platformName} onChange={(v) => updateSite("platformName", v)} />
                        <AdminInput label="플랫폼 부제" value={site.platformSubtitle} onChange={(v) => updateSite("platformSubtitle", v)} />
                        <AdminInput label="상단 안내문" value={site.topNotice} onChange={(v) => updateSite("topNotice", v)} />
                        <AdminInput label="연락처" value={site.phone} onChange={(v) => updateSite("phone", v)} />
                        <AdminInput label="이메일" value={site.email} onChange={(v) => updateSite("email", v)} />
                        <AdminInput label="푸터 문구" value={site.footerText} onChange={(v) => updateSite("footerText", v)} />
                        <div className="lg:col-span-2">
                          <AdminInput label="메인 제목" value={site.heroTitle} onChange={(v) => updateSite("heroTitle", v)} textarea />
                        </div>
                        <div className="lg:col-span-2">
                          <AdminInput label="메인 설명" value={site.heroDescription} onChange={(v) => updateSite("heroDescription", v)} textarea />
                        </div>
                        <AdminInput label="주 버튼 문구" value={site.primaryButton} onChange={(v) => updateSite("primaryButton", v)} />
                        <AdminInput label="보조 버튼 문구" value={site.secondaryButton} onChange={(v) => updateSite("secondaryButton", v)} />
                        <AdminInput label="설립유형 섹션 제목" value={site.establishmentIntroTitle} onChange={(v) => updateSite("establishmentIntroTitle", v)} />
                        <div className="lg:col-span-2">
                          <AdminInput label="설립유형 섹션 설명" value={site.establishmentIntroDescription} onChange={(v) => updateSite("establishmentIntroDescription", v)} textarea />
                        </div>
                        <AdminInput label="브랜딩 섹션 제목" value={site.brandingIntroTitle} onChange={(v) => updateSite("brandingIntroTitle", v)} />
                        <div className="lg:col-span-2">
                          <AdminInput label="브랜딩 섹션 설명" value={site.brandingIntroDescription} onChange={(v) => updateSite("brandingIntroDescription", v)} textarea />
                        </div>
                        <AdminInput label="은행명" value={site.bankName} onChange={(v) => updateSite("bankName", v)} />
                        <AdminInput label="계좌번호" value={site.bankAccount} onChange={(v) => updateSite("bankAccount", v)} />
                        <AdminInput label="예금주" value={site.bankHolder} onChange={(v) => updateSite("bankHolder", v)} />
                        <AdminColor label="기본색" value={site.primary} onChange={(v) => updateSite("primary", v)} />
                        <AdminColor label="보조색" value={site.secondary} onChange={(v) => updateSite("secondary", v)} />
                        <AdminColor label="강조색" value={site.accent} onChange={(v) => updateSite("accent", v)} />
                        <AdminColor label="본문 배경색" value={site.bodyBg} onChange={(v) => updateSite("bodyBg", v)} />
                        <AdminColor label="카드 배경색" value={site.cardBg} onChange={(v) => updateSite("cardBg", v)} />
                        <AdminColor label="본문 글자색" value={site.textColor} onChange={(v) => updateSite("textColor", v)} />
                      </div>
                    </div>

                    <div className="rounded-[28px] bg-white p-6 shadow-sm">
                      <h3 className="text-2xl font-bold text-slate-900">서비스 메뉴 편집</h3>
                      <div className="mt-6 space-y-5">
                        {site.services.map((service, index) => (
                          <div key={service.id} className="rounded-2xl border border-slate-200 p-5">
                            <div className="grid gap-4 lg:grid-cols-2">
                              <AdminInput label={`서비스 ${index + 1} 제목`} value={service.title} onChange={(v) => updateService(index, "title", v)} />
                              <div className="lg:col-span-2">
                                <AdminInput label={`서비스 ${index + 1} 설명`} value={service.desc} onChange={(v) => updateService(index, "desc", v)} textarea />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : null}

                {adminTab === "establishment" ? (
                  <div className="space-y-6">
                    <div className="rounded-[28px] bg-white p-6 shadow-sm">
                      <h3 className="text-2xl font-bold text-slate-900">설립유형 카드 관리</h3>
                      <p className="mt-2 text-sm text-slate-500">설립유형 비교 카드의 핵심 내용은 현재 상수로 구성되어 있습니다. 아래에서는 설립 패키지 상품표와 비용을 직접 수정할 수 있습니다.</p>
                    </div>
                    <div className="rounded-[28px] bg-white p-6 shadow-sm">
                      <h3 className="text-2xl font-bold text-slate-900">설립유형별 컨설팅 상품표 관리</h3>
                      <div className="mt-6 space-y-5">
                        {foundationPackages.map((item, index) => (
                          <div key={item.id} className="rounded-2xl border border-slate-200 p-5">
                            <div className="grid gap-4 lg:grid-cols-2">
                              <AdminInput label="패키지명" value={item.name} onChange={(v) => updateFoundationPackage(index, "name", v)} />
                              <AdminInput label="부제" value={item.subtitle} onChange={(v) => updateFoundationPackage(index, "subtitle", v)} />
                              <AdminInput label="가격" type="number" value={String(item.price)} onChange={(v) => updateFoundationPackage(index, "price", v)} />
                              <AdminInput label="가격 표시문구" value={item.range} onChange={(v) => updateFoundationPackage(index, "range", v)} />
                              <div className="lg:col-span-2">
                                <AdminInput label="설명" value={item.description} onChange={(v) => updateFoundationPackage(index, "description", v)} textarea />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : null}

                {adminTab === "branding" ? (
                  <div className="space-y-6">
                    <div className="rounded-[28px] bg-white p-6 shadow-sm">
                      <h3 className="text-2xl font-bold text-slate-900">브랜딩 서비스 메뉴 관리</h3>
                      <p className="mt-2 text-sm text-slate-500">플랫폼 안에 통합된 브랜딩 서비스 패키지와 옵션 가격을 수정할 수 있습니다.</p>
                      <div className="mt-8 space-y-5">
                        {packages.map((item, index) => (
                          <div key={item.id} className="rounded-2xl border border-slate-200 p-5">
                            <div className="grid gap-4 lg:grid-cols-2">
                              <AdminInput label="패키지명" value={item.name} onChange={(v) => updatePackage(index, "name", v)} />
                              <AdminInput label="부제" value={item.subtitle} onChange={(v) => updatePackage(index, "subtitle", v)} />
                              <AdminInput label="가격" type="number" value={String(item.price)} onChange={(v) => updatePackage(index, "price", v)} />
                              <AdminInput label="가격 표시문구" value={item.range} onChange={(v) => updatePackage(index, "range", v)} />
                              <div className="lg:col-span-2">
                                <AdminInput label="설명" value={item.description} onChange={(v) => updatePackage(index, "description", v)} textarea />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="rounded-[28px] bg-white p-6 shadow-sm">
                      <h3 className="text-2xl font-bold text-slate-900">추가 옵션 관리</h3>
                      <div className="mt-6 grid gap-4 md:grid-cols-2">
                        {addons.map((item, index) => (
                          <div key={item.id} className="rounded-2xl border border-slate-200 p-5">
                            <AdminInput label="옵션명" value={item.label} onChange={(v) => updateAddon(index, "label", v)} />
                            <div className="mt-4">
                              <AdminInput label="가격" type="number" value={String(item.price)} onChange={(v) => updateAddon(index, "price", v)} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : null}

                {adminTab === "inquiries" ? (
                  <div className="rounded-[28px] bg-white p-6 shadow-sm">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <h3 className="text-2xl font-bold text-slate-900">상담 신청 관리</h3>
                        <p className="mt-1 text-sm text-slate-500">홈페이지에서 접수된 상담 신청 내역입니다.</p>
                      </div>
                      <div className="text-sm font-semibold text-slate-600">총 {inquiries.length}건</div>
                    </div>
                    <div className="mt-6 space-y-4">
                      {inquiries.length === 0 ? (
                        <div className="rounded-2xl bg-slate-50 px-4 py-8 text-center text-sm text-slate-500">아직 접수된 상담 신청이 없습니다.</div>
                      ) : (
                        inquiries.map((item) => (
                          <div key={item.id} className="rounded-2xl border border-slate-200 p-5">
                            <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                              <div>
                                <div className="text-lg font-bold text-slate-900">{item.organization} / {item.name}</div>
                                <div className="mt-1 text-sm text-slate-500">{item.phone} · {item.email}</div>
                                <div className="mt-2 text-sm leading-7 text-slate-700">설립유형: {item.establishmentType}<br />설립 패키지: {item.establishmentPackage}<br />브랜딩 패키지: {item.package}<br />옵션: {item.addons.join(", ") || "없음"}<br />방향: {item.direction}<br />예상금액: {formatKRW(item.total)}</div>
                                <div className="mt-2 text-sm text-slate-600">요청사항: {item.description}</div>
                              </div>
                              <div className="flex shrink-0 flex-col items-end gap-2">
                                <div className="text-xs text-slate-500">{item.createdAt}</div>
                                <button type="button" onClick={() => removeInquiry(item.id)} className="rounded-lg bg-rose-50 px-3 py-2 text-xs font-bold text-rose-700">삭제</button>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                ) : null}

                {adminTab === "deployment" ? (
                  <div className="rounded-[28px] bg-white p-6 shadow-sm">
                    <h3 className="text-2xl font-bold text-slate-900">배포 및 도메인 연결 안내</h3>
                    <div className="mt-4 space-y-4 text-sm leading-7 text-slate-700">
                      <p>이 캔버스 코드는 실제 운영용 구조를 시뮬레이션한 단일 파일입니다. 진짜 관리자 로그인을 서버와 연결하려면 Next.js 프로젝트로 옮기고 인증 및 데이터베이스를 붙여야 합니다.</p>
                      <ol className="list-decimal space-y-2 pl-5">
                        <li>Next.js 프로젝트 생성 후 <code>app/page.jsx</code>와 <code>app/admin/page.jsx</code>로 분리합니다.</li>
                        <li>관리자 로그인은 Supabase Auth, Firebase Auth, NextAuth 중 하나로 교체합니다.</li>
                        <li>상담 신청 데이터는 Supabase/Postgres/Firestore에 저장합니다.</li>
                        <li>Vercel에 배포 후 도메인을 연결합니다.</li>
                        <li>DNS에서 A 레코드 또는 CNAME을 배포 서비스 안내값으로 연결합니다.</li>
                      </ol>
                    </div>
                  </div>
                ) : null}
              </section>
            </div>
          )}
        </main>
      ) : (
        <main>
          <section className="relative overflow-hidden text-white" style={{ background: `linear-gradient(135deg, ${site.primary} 0%, ${site.secondary} 100%)` }}>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.10),transparent_25%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.08),transparent_28%)]" />
            <div className="relative mx-auto max-w-7xl px-6 py-6 md:px-10 lg:px-12">
              <div className="mb-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur">
                <div className="text-sm text-slate-200">{site.topNotice}</div>
                <nav className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => document.getElementById("establishment-review")?.scrollIntoView({ behavior: "smooth" })}
                    className="rounded-lg bg-white/10 px-4 py-2 text-sm font-semibold text-white hover:bg-white/20"
                  >
                    공익법인설립 메뉴
                  </button>
                  <button
                    type="button"
                    onClick={() => document.getElementById("branding-service")?.scrollIntoView({ behavior: "smooth" })}
                    className="rounded-lg bg-white/10 px-4 py-2 text-sm font-semibold text-white hover:bg-white/20"
                  >
                    브랜딩 서비스 메뉴
                  </button>
                </nav>
              </div>
              <div className="grid gap-10 md:grid-cols-2 lg:py-10">
                <div className="flex flex-col justify-center">
                  <h1 className="max-w-3xl text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">{site.heroTitle}</h1>
                  <p className="mt-6 max-w-2xl text-base leading-7 text-slate-200 md:text-lg">{site.heroDescription}</p>
                  <div className="mt-8 flex flex-wrap gap-4">
                    <button type="button" onClick={() => document.getElementById("establishment-review")?.scrollIntoView({ behavior: "smooth" })} className="rounded-xl px-6 py-3 font-semibold text-[#0A1F33] shadow-lg" style={{ backgroundColor: site.accent }}>
                      {site.primaryButton}
                    </button>
                    <button type="button" onClick={() => document.getElementById("branding-service")?.scrollIntoView({ behavior: "smooth" })} className="rounded-xl border border-white/30 px-6 py-3 font-semibold text-white transition hover:bg-white/10">
                      {site.secondaryButton}
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <div className="w-full max-w-xl rounded-[28px] border border-white/10 bg-white/95 p-6 text-slate-900 shadow-2xl">
                    <div className="text-sm font-semibold" style={{ color: site.primary }}>빠른 안내</div>
                    <div className="mt-3 grid gap-4 sm:grid-cols-2">
                      <div className="rounded-2xl bg-slate-100 p-4">
                        <div className="text-xs font-semibold text-slate-500">연락처</div>
                        <div className="mt-1 font-bold">{site.phone}</div>
                      </div>
                      <div className="rounded-2xl bg-slate-100 p-4">
                        <div className="text-xs font-semibold text-slate-500">이메일</div>
                        <div className="mt-1 font-bold">{site.email}</div>
                      </div>
                      <div className="rounded-2xl bg-slate-100 p-4 sm:col-span-2">
                        <div className="text-xs font-semibold text-slate-500">입금계좌</div>
                        <div className="mt-1 font-bold">{site.bankName} {site.bankAccount} {site.bankHolder}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mx-auto max-w-7xl px-6 py-20 md:px-10 lg:px-12">
            <SectionHeading eyebrow="Services" title="통합 컨설팅 서비스" description="설립부터 운영, 세무, 브랜드 구축까지 공익법인의 전 과정을 실무 중심으로 지원합니다." center />
            <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {site.services.map((service) => <ServiceCard key={service.id} title={service.title} desc={service.desc} />)}
            </div>
          </section>

          <section id="establishment-review" className="border-y border-slate-200 py-20" style={{ backgroundColor: site.cardBg }}>
            <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-12">
              <SectionHeading eyebrow="Establishment Review" title={site.establishmentIntroTitle} description={site.establishmentIntroDescription} center />
              <div className="mt-12 grid gap-6 lg:grid-cols-4">
                {ESTABLISHMENT_TYPES.map((item) => (
                  <EstablishmentTypeCard key={item.id} item={item} active={selectedEstablishment === item.id} onClick={() => setSelectedEstablishment(item.id)} />
                ))}
              </div>

              <div className="mt-12 grid gap-6 lg:grid-cols-4">
                {foundationPackages.map((item) => (
                  <PackageCard key={item.id} item={item} active={selectedFoundationPackage === item.id} onClick={() => setSelectedFoundationPackage(item.id)} />
                ))}
              </div>

              <div className="mt-8 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
                <div className="rounded-[28px] border border-slate-200 p-6 shadow-sm" style={{ backgroundColor: "var(--card-bg)" }}>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em]" style={{ color: site.accent }}>Selected Type</p>
                  <h3 className="mt-3 text-3xl font-bold">{selectedType.name}</h3>
                  <p className="mt-4 text-sm leading-7 text-slate-600">{selectedType.summary}</p>
                  <div className="mt-8 rounded-2xl bg-slate-50 p-5">
                    <ComparisonRow label="법적 성격" value={selectedType.legalNature} />
                    <ComparisonRow label="설립 절차" value={selectedType.procedure} />
                    <ComparisonRow label="설립 난이도" value={selectedType.difficulty} />
                    <ComparisonRow label="출연 재산" value={selectedType.asset} />
                    <ComparisonRow label="조직 구조" value={selectedType.structure} />
                    <ComparisonRow label="의사결정" value={selectedType.decision} />
                    <ComparisonRow label="임기" value={selectedType.term} />
                    <ComparisonRow label="권한 구조" value={selectedType.authority} />
                    <ComparisonRow label="라이선스 권한" value={selectedType.license} />
                    <ComparisonRow label="사업 범위" value={selectedType.business} />
                    <ComparisonRow label="기부금 영수증" value={selectedType.receipt} />
                    <ComparisonRow label="정부 협력" value={selectedType.government} />
                    <ComparisonRow label="공신력" value={selectedType.credibility} />
                    <ComparisonRow label="재원 구조" value={selectedType.finance} />
                    <ComparisonRow label="설립 기간" value={selectedType.period} />
                    <ComparisonRow label="행정부담" value={selectedType.burden} />
                    <ComparisonRow label="설립대행비용" value={selectedType.cost} />
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="rounded-[28px] p-6 text-white shadow-2xl" style={{ backgroundColor: site.primary }}>
                    <p className="text-sm font-semibold uppercase tracking-[0.2em]" style={{ color: site.accent }}>Quick Guide</p>
                    <h3 className="mt-3 text-2xl font-bold">설립유형 선택 포인트</h3>
                    <div className="mt-6 space-y-3 text-sm leading-7 text-slate-200">
                      <div>• 선택 설립 패키지: <strong>{foundationPkg?.name}</strong></div>
                      <div>• 설립 패키지 비용: <strong>{formatKRW(foundationPkg?.price || 0)}</strong></div>
                      <div>• 빠른 출발과 간단한 운영이 우선이면 임의단체</div>
                      <div>• 회원 기반 공익활동과 제도적 신뢰가 필요하면 사단법인</div>
                      <div>• 출연재산과 장기 재단사업 구조가 있으면 재단법인</div>
                      <div>• 최고 수준의 공신력과 세제 혜택까지 고려하면 공익법인</div>
                    </div>
                  </div>

                  <div className="rounded-[28px] border border-slate-200 p-6 shadow-sm" style={{ backgroundColor: "var(--card-bg)" }}>
                    <p className="text-sm font-semibold uppercase tracking-[0.2em]" style={{ color: site.accent }}>Association Review</p>
                    <h3 className="mt-3 text-2xl font-bold">사단법인 설립 사전 검토 핵심 5요소</h3>
                    <div className="mt-6 space-y-4">
                      {ASSOCIATION_REVIEW_POINTS.map((point) => (
                        <div key={point.title} className="rounded-2xl bg-slate-50 p-4">
                          <div className="font-bold text-slate-900">{point.title}</div>
                          <div className="mt-2 text-sm leading-7 text-slate-600">{point.desc}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-[28px] border border-slate-200 p-6 shadow-sm" style={{ backgroundColor: "var(--card-bg)" }}>
                    <p className="text-sm font-semibold uppercase tracking-[0.2em]" style={{ color: site.accent }}>Office Readiness</p>
                    <h3 className="mt-3 text-2xl font-bold">사무국 실무 역량과 리스크</h3>
                    <div className="mt-4 text-sm leading-7 text-slate-600">
                      사무국은 정관을 실제로 작동시키는 엔진입니다. 준비되지 않은 상태에서 서류를 제출하면 보완 요구, 재작성 비용, 일정 지연, 파트너십 상실 등으로 초기 예산의 2~3배에 달하는 시간·비용 손실이 발생할 수 있습니다.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="branding-service" className="border-b border-slate-200 py-20" style={{ backgroundColor: site.cardBg }}>
            <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-12">
              <SectionHeading eyebrow="Branding" title={site.brandingIntroTitle} description={site.brandingIntroDescription} center />
              <div className="mt-12 grid gap-6 lg:grid-cols-4">
                {packages.map((item) => (
                  <PackageCard key={item.id} item={item} active={selectedPackage === item.id} onClick={() => setSelectedPackage(item.id)} />
                ))}
              </div>

              <div className="mt-12 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
                <div>
                  <div className="max-w-3xl">
                    <p className="text-sm font-semibold uppercase tracking-[0.2em]" style={{ color: site.accent }}>Options</p>
                    <h3 className="mt-3 text-3xl font-bold">브랜딩 옵션 선택</h3>
                    <p className="mt-4 text-slate-600">추가 서비스 범위를 선택하면 실시간 견적에 반영됩니다.</p>
                  </div>
                  <div className="mt-8 grid gap-4 md:grid-cols-2">
                    {addons.map((addon) => {
                      const checked = selectedAddons.includes(addon.id);
                      return (
                        <button
                          key={addon.id}
                          type="button"
                          onClick={() => toggleAddon(addon.id)}
                          className={`rounded-2xl border p-5 text-left transition ${checked ? "text-white shadow-lg" : "border-slate-200 bg-slate-50"}`}
                          style={checked ? { backgroundColor: site.primary, borderColor: site.primary } : {}}
                        >
                          <div className="flex items-center justify-between gap-3">
                            <div>
                              <div className="text-lg font-semibold">{addon.label}</div>
                              <div className={`mt-1 text-sm ${checked ? "text-slate-200" : "text-slate-500"}`}>{formatKRW(addon.price)}</div>
                            </div>
                            <div className={`flex h-7 w-7 items-center justify-center rounded-full border ${checked ? "border-white bg-white" : "border-slate-300 bg-white text-slate-400"}`} style={checked ? { color: site.primary } : {}}>
                              {checked ? "✓" : "+"}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                  <div className="mt-6 flex items-center gap-3 rounded-2xl bg-slate-100 p-4">
                    <input id="vat" type="checkbox" checked={vatIncluded} onChange={(e) => setVatIncluded(e.target.checked)} className="h-4 w-4" />
                    <label htmlFor="vat" className="text-sm font-medium text-slate-700">VAT 포함 금액으로 보기</label>
                  </div>
                  <div className="mt-6 grid gap-4 md:grid-cols-3">
                    {DIRECTIONS.map((direction) => (
                      <button
                        key={direction.id}
                        type="button"
                        onClick={() => setSelectedDirection(direction.id)}
                        className={`rounded-2xl border p-4 text-left ${selectedDirection === direction.id ? "shadow-lg" : "border-slate-200 bg-white"}`}
                        style={selectedDirection === direction.id ? { borderColor: site.accent, backgroundColor: "#FFF9EE" } : {}}
                      >
                        <div className="text-3xl">{direction.icon}</div>
                        <div className="mt-3 font-bold">{direction.label}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="lg:sticky lg:top-24 lg:self-start">
                  <div className="rounded-[28px] p-6 text-white shadow-2xl" style={{ backgroundColor: site.primary }}>
                    <p className="text-sm font-semibold uppercase tracking-[0.2em]" style={{ color: site.accent }}>Estimate</p>
                    <h3 className="mt-3 text-2xl font-bold">브랜딩 견적 요약</h3>
                    <div className="mt-6 rounded-2xl bg-white/5 p-5">
                      <div className="flex items-center justify-between text-sm text-slate-300"><span>설립 패키지</span><span className="font-semibold text-white">{foundationPkg?.name}</span></div>
                      <div className="mt-3 flex items-center justify-between text-sm text-slate-300"><span>브랜딩 패키지</span><span className="font-semibold text-white">{pkg?.name}</span></div>
                      <div className="mt-3 flex items-center justify-between text-sm text-slate-300"><span>옵션</span><span className="font-semibold text-white">{selectedAddons.length}개</span></div>
                      <div className="mt-3 flex items-center justify-between text-sm text-slate-300"><span>브랜드 방향</span><span className="font-semibold text-white">{DIRECTIONS.find((item) => item.id === selectedDirection)?.label}</span></div>
                      <div className="mt-4 border-t border-white/10 pt-4">
                        <div className="text-sm text-slate-300">총 견적</div>
                        <div className="mt-2 text-4xl font-bold" style={{ color: site.accent }}>{formatKRW(total)}</div>
                      </div>
                    </div>
                    <button type="button" onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })} className="mt-6 w-full rounded-2xl px-5 py-4 font-bold text-[#0A1F33]" style={{ backgroundColor: site.accent }}>
                      이 구성으로 상담 신청
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mx-auto max-w-7xl px-6 py-20 md:px-10 lg:px-12">
            <div className="grid gap-8 lg:grid-cols-2">
              <div className="rounded-[28px] border border-slate-200 p-6 shadow-sm" style={{ backgroundColor: site.cardBg }}>
                <p className="text-sm font-semibold uppercase tracking-[0.2em]" style={{ color: site.accent }}>Payment</p>
                <h3 className="mt-3 text-3xl font-bold">입금 안내</h3>
                <p className="mt-4 text-sm leading-7 text-slate-600">상담 또는 계약 확정 후 아래 계좌로 입금하시면 확인 절차를 진행합니다. 입금 전 상담 내용과 최종 견적을 반드시 확인해 주세요.</p>
                <div className="mt-6 rounded-2xl bg-slate-50 p-5">
                  <div className="text-lg font-bold">{site.bankName}</div>
                  <div className="mt-2 text-2xl font-bold">{site.bankAccount}</div>
                  <div className="mt-2 text-sm text-slate-600">예금주: {site.bankHolder}</div>
                </div>
                <div className="mt-5 flex flex-wrap gap-3">
                  <button type="button" onClick={() => copyToClipboard(site.bankAccount)} className="rounded-xl px-5 py-3 text-sm font-bold text-white" style={{ backgroundColor: site.primary }}>계좌번호 복사</button>
                  <button type="button" onClick={() => copyToClipboard(`${site.bankName} ${site.bankAccount} ${site.bankHolder}`)} className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-bold text-slate-700">전체 정보 복사</button>
                </div>
              </div>

              <div id="contact" className="rounded-[28px] border border-slate-200 p-6 shadow-sm" style={{ backgroundColor: site.cardBg }}>
                <p className="text-sm font-semibold uppercase tracking-[0.2em]" style={{ color: site.accent }}>Contact</p>
                <h3 className="mt-3 text-3xl font-bold">상담 신청</h3>
                <p className="mt-4 text-sm leading-7 text-slate-600">설립유형 검토와 브랜딩 패키지 선택 결과를 함께 저장합니다.</p>
                <form onSubmit={submitInquiry} className="mt-6">
                  <div className="grid gap-5 md:grid-cols-2">
                    <AdminInput label="기관명" value={form.organization} onChange={(v) => setForm((prev) => ({ ...prev, organization: v }))} />
                    <AdminInput label="담당자명" value={form.name} onChange={(v) => setForm((prev) => ({ ...prev, name: v }))} />
                    <AdminInput label="연락처" value={form.phone} onChange={(v) => setForm((prev) => ({ ...prev, phone: v }))} />
                    <AdminInput label="이메일" value={form.email} onChange={(v) => setForm((prev) => ({ ...prev, email: v }))} />
                  </div>
                  <div className="mt-5">
                    <AdminInput label="브랜드 설명 및 요청사항" value={form.description} onChange={(v) => setForm((prev) => ({ ...prev, description: v }))} textarea />
                  </div>
                  <button type="submit" className="mt-6 w-full rounded-2xl px-6 py-4 text-lg font-bold text-white" style={{ backgroundColor: site.primary }}>
                    상담 신청하기
                  </button>
                  {isSubmitted ? <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700">상담 신청이 저장되었습니다. 관리자 페이지에서 확인할 수 있습니다.</div> : null}
                </form>
              </div>
            </div>
          </section>

          <footer className="border-t border-slate-200 bg-white/70">
            <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-8 text-sm text-slate-600 md:flex-row md:items-center md:justify-between md:px-10 lg:px-12">
              <div>{site.footerText}</div>
              <div className="flex flex-wrap gap-4">
                <span>{site.bankName} {site.bankAccount}</span>
                <span>{site.bankHolder}</span>
              </div>
            </div>
          </footer>
        </main>
      )}
    </div>
  );
}

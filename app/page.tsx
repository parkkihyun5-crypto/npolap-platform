"use client";

import React, { useEffect, useMemo, useState } from "react";
type ContentType = {
  siteName: string;
  siteSubtitle: string;
  heroBadge: string;
  heroTitle: string;
  heroDescription: string;
  primaryCta: string;
  secondaryCta: string;
  topMenu1: string;
  topMenu2: string;
  consultingTitle: string;
  consultingDescription: string;
  establishmentTitle: string;
  establishmentDescription: string;
  brandingTitle: string;
  brandingDescription: string;
  paymentTitle: string;
  paymentDescription: string;
  contactTitle: string;
  contactDescription: string;
  footerText: string;
  phone: string;
  email: string;
  bankName: string;
  bankAccount: string;
  bankHolder: string;
  primary: string;
  secondary: string;
  accent: string;
  bodyBg: string;
  cardBg: string;
  textColor: string;
};

type ConsultingService = {
  id: string;
  title: string;
  desc: string;
};

type EstablishmentType = {
  id: string;
  name: string;
  legal: string;
  procedure: string;
  difficulty: string;
  period: string;
  budget: string;
  summary: string;
  details: [string, string][];
};

type EstablishmentPackage = {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  desc: string;
  popular?: boolean;
};

type BrandingPackage = {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  desc: string;
  popular?: boolean;
};

type BrandingAddon = {
  id: string;
  label: string;
  price: number;
};

type Direction = {
  id: string;
  label: string;
};

type InquiryFormType = {
  organization: string;
  name: string;
  phone: string;
  email: string;
  description: string;
};

type ThemeType = {
  primary: string;
  secondary: string;
  accent: string;
  bodyBg: string;
  cardBg: string;
  textColor: string;
};

// --- 1. 타입 인터페이스 정의 (TypeScript 안정성 확보) ---

interface SiteContent {
  siteName: string;
  siteSubtitle: string;
  heroBadge: string;
  heroTitle: string;
  heroDescription: string;
  primaryCta: string;
  secondaryCta: string;
  topMenu1: string;
  topMenu2: string;
  consultingTitle: string;
  consultingDescription: string;
  establishmentTitle: string;
  establishmentDescription: string;
  brandingTitle: string;
  brandingDescription: string;
  paymentTitle: string;
  paymentDescription: string;
  contactTitle: string;
  contactDescription: string;
  footerText: string;
  phone: string;
  email: string;
  bankName: string;
  bankAccount: string;
  bankHolder: string;
  primary: string;
  secondary: string;
  accent: string;
  bodyBg: string;
  cardBg: string;
  textColor: string;
}

interface PackageItem {
  id: string;
  name: string;
  subtitle?: string;
  price: number;
  desc: string;
  popular?: boolean;
}

interface AddonItem {
  id: string;
  label: string;
  price: number;
}

interface EstablishmentType {
  id: string;
  name: string;
  legal: string;
  procedure: string;
  difficulty: string;
  period: string;
  budget: string;
  summary: string;
  details: [string, string][];
}

interface ThemeConfig {
  primary: string;
  secondary: string;
  accent: string;
  bodyBg: string;
  cardBg: string;
  textColor: string;
}

// --- 2. 상수 및 데이터 ---

const STORAGE_KEY = "npolap-platform-site-v1";
const ADMIN_SESSION_KEY = "npolap-platform-admin-session-v1";
const ADMIN_ID = "admin";
const ADMIN_PASSWORD = "ILU2026!";

const defaultContent: SiteContent = {
  siteName: "공익법인 종합컨설팅 플랫폼",
  siteSubtitle: "설립 · 운영 · 브랜딩 · 홈페이지까지 한 번에",
  heroBadge: "International Leaders Union Consulting & Branding",
  heroTitle: "공익법인 설립과 브랜드 구축을 동시에 완성하는 통합 플랫폼",
  heroDescription: "사단법인·재단법인·공익법인 설립 검토부터 정관 설계, 실무 운영 체계, 브랜딩 로고 서비스, 홈페이지 제작까지 실전 중심으로 연결하는 고급형 컨설팅 플랫폼입니다.",
  primaryCta: "설립유형 검토 보기",
  secondaryCta: "브랜딩 서비스 보기",
  topMenu1: "공익법인설립 메뉴",
  topMenu2: "브랜딩 서비스 메뉴",
  consultingTitle: "공익법인 종합컨설팅 서비스",
  consultingDescription: "법인 설립 준비 단계부터 운영 안정화, 공신력 확보, 대외 브랜드 구축까지 전체 흐름을 구조적으로 설계합니다.",
  establishmentTitle: "비영리·비영리법인 설립 유형별 검토사항",
  establishmentDescription: "설립 목적, 자산 규모, 운영 구조, 공신력 수준에 따라 적합한 법인 유형을 비교하고 바로 컨설팅 상품을 선택할 수 있습니다.",
  brandingTitle: "브랜딩 로고 서비스",
  brandingDescription: "기관의 신뢰를 높이는 CI·BI 패키지와 추가 옵션을 선택하고 실시간 견적을 확인할 수 있습니다.",
  paymentTitle: "입금 안내",
  paymentDescription: "상담 또는 계약 확정 후 아래 계좌로 입금하시면 확인 절차를 진행합니다. 입금 전 최종 견적과 업무 범위를 반드시 확인해 주세요.",
  contactTitle: "상담 신청",
  contactDescription: "설립 유형 검토와 브랜딩 서비스 선택 결과를 함께 접수하여 통합 상담을 진행합니다.",
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

const establishmentTypes: EstablishmentType[] = [
  {
    id: "voluntary",
    name: "비영리 임의단체",
    legal: "자율적 모임",
    procedure: "세무서 신고",
    difficulty: "매우 쉬움",
    period: "1~3일",
    budget: "30~50만",
    summary: "빠르게 출발할 수 있지만 공신력과 제도적 확장성은 제한적입니다.",
    details: [["조직 구조", "대표 중심"], ["사업 범위", "친목·활동 중심"], ["기부금 영수증", "불가"], ["정부 협력", "낮음"], ["재원 구조", "회비 중심"]],
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
    details: [["조직 구조", "회원·총회 중심"], ["사업 범위", "공익·협력 사업"], ["기부금 영수증", "지정기부금단체 지정 시 가능"], ["정부 협력", "위탁사업 가능"], ["재원 구조", "회비 + 보조금"]],
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
    details: [["조직 구조", "이사회 중심"], ["사업 범위", "연구·장학·재단사업"], ["기부금 영수증", "지정 시 가능"], ["정부 협력", "정책 연구 협력"], ["재원 구조", "기금 수익"]],
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
    details: [["조직 구조", "공익 거버넌스"], ["사업 범위", "사회 공헌 및 정책 협력"], ["기부금 영수증", "가능(세제 혜택)"], ["정부 협력", "정책 수행 파트너"], ["재원 구조", "정부 + 대기업 후원"]],
  },
];

const establishmentPackages: PackageItem[] = [
  { id: "ngo-basic", name: "임의단체 설립 패키지", subtitle: "Quick Start", price: 500000, desc: "간편 신고와 기본 운영 구조 설계를 위한 입문형 패키지" },
  { id: "association-pro", name: "사단법인 설립 패키지", subtitle: "Association Pro", price: 3000000, desc: "정관 설계, 허가 서류, 사무국 준비, 실사 대응을 포함한 표준 패키지", popular: true },
  { id: "foundation-premium", name: "재단법인 설립 패키지", subtitle: "Foundation Premium", price: 7000000, desc: "출연재산 구조, 이사회 설계, 허가 전략을 포함한 고급 패키지" },
  { id: "public-benefit-signature", name: "공익법인 지정 패키지", subtitle: "Public Signature", price: 12000000, desc: "공익성 구조, 세제 요건, 지정 전략을 포함한 최상위 패키지" },
];

const brandingPackages: PackageItem[] = [
  { id: "starter", name: "STARTER", subtitle: "BI Lite", price: 1500000, desc: "로고 중심의 기본형 브랜딩 패키지" },
  { id: "standard", name: "STANDARD", subtitle: "BI Pro", price: 3000000, desc: "로고와 컬러 시스템을 포함한 표준형 패키지" },
  { id: "premium", name: "PREMIUM", subtitle: "CI Basic", price: 8000000, desc: "전략형 CI·BI 설계와 응용 시스템을 포함한 고급 패키지", popular: true },
  { id: "signature", name: "SIGNATURE", subtitle: "CI Full", price: 20000000, desc: "국제기관 수준의 아이덴티티 체계를 구축하는 최상위 패키지" },
];

const brandingAddons: AddonItem[] = [
  { id: "naming", label: "네이밍 개발", price: 2000000 },
  { id: "slogan", label: "슬로건 개발", price: 1000000 },
  { id: "ppt", label: "PPT 템플릿", price: 1000000 },
  { id: "website", label: "홈페이지 UI 설계", price: 5000000 },
  { id: "sns", label: "SNS 브랜드 키트", price: 1000000 },
  { id: "signage", label: "간판·사인 디자인", price: 2000000 },
];

// --- 3. 헬퍼 함수 (매개변수 타입 정의) ---

function formatKRW(value: number): string {
  return new Intl.NumberFormat("ko-KR", {
    style: "currency",
    currency: "KRW",
    maximumFractionDigits: 0,
  }).format(value || 0);
}

function copyText(text: string): void {
  if (typeof navigator !== "undefined" && navigator.clipboard) {
    navigator.clipboard.writeText(text);
  }
}

// --- 4. UI 컴포넌트 (Props 타입 정의) ---

function SectionHeader({ eyebrow, title, desc, center = false }: { eyebrow: string; title: string; desc: string; center?: boolean }) {
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

function PackageCard({ item, active, onClick, theme }: { item: PackageItem; active: boolean; onClick: () => void; theme: ThemeConfig }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-[24px] border p-6 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-xl ${active ? "ring-2 ring-slate-200" : ""}`}
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
      <p className="mt-4 text-sm leading-7 text-slate-600">{item.desc}</p>
      <div className="mt-6 text-2xl font-bold" style={{ color: theme.primary }}>{formatKRW(item.price)}</div>
    </button>
  );
}

// --- 5. 메인 앱 컴포넌트 (State 타입 정의) ---

export default function PublicInterestConsultingPremiumSite() {
  const [content, setContent] = useState<SiteContent>(defaultContent);
  const [adminOpen, setAdminOpen] = useState<boolean>(false);
  const [adminLoggedIn, setAdminLoggedIn] = useState<boolean>(false);
  const [selectedEstablishmentType, setSelectedEstablishmentType] = useState<string>("association");
  const [selectedFoundationPackage, setSelectedFoundationPackage] = useState<string>("association-pro");
  const [selectedBrandingPackage, setSelectedBrandingPackage] = useState<string>("premium");
  const [selectedAddons, setSelectedAddons] = useState<string[]>(["naming", "ppt"]);
  const [selectedDirection, setSelectedDirection] = useState<string>("global");
  const [vatIncluded, setVatIncluded] = useState<boolean>(false);
  const [saveMessage, setSaveMessage] = useState<string>("");
  const [inquirySaved, setInquirySaved] = useState<boolean>(false);
  const [form, setForm] = useState({ organization: "", name: "", phone: "", email: "", description: "" });

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

  const theme: ThemeConfig = useMemo(() => ({
    primary: content.primary,
    secondary: content.secondary,
    accent: content.accent,
    bodyBg: content.bodyBg,
    cardBg: content.cardBg,
    textColor: content.textColor,
  }), [content]);

  const establishmentType = establishmentTypes.find((item) => item.id === selectedEstablishmentType);
  const foundationPkg = establishmentPackages.find((item) => item.id === selectedFoundationPackage);
  const brandingPkg = brandingPackages.find((item) => item.id === selectedBrandingPackage);

  const addonTotal = selectedAddons.reduce((sum, id) => {
    const found = brandingAddons.find((item) => item.id === id);
    return sum + (found?.price || 0);
  }, 0);

  const subtotal = (foundationPkg?.price || 0) + (brandingPkg?.price || 0) + addonTotal;
  const total = vatIncluded ? Math.round(subtotal * 1.1) : subtotal;

  const persist = (): void => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
    setSaveMessage("변경사항이 저장되었습니다.");
    setTimeout(() => setSaveMessage(""), 1800);
  };

  const logout = (): void => {
    localStorage.removeItem(ADMIN_SESSION_KEY);
    setAdminLoggedIn(false);
  };

  const updateContent = (key: keyof SiteContent, value: string): void => {
    setContent((prev) => ({ ...prev, [key]: value }));
  };

  const toggleAddon = (id: string): void => {
    setSelectedAddons((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  const submitInquiry = (e: React.FormEvent): void => {
    e.preventDefault();
    setInquirySaved(true);
    setTimeout(() => setInquirySaved(false), 2000);
    setForm({ organization: "", name: "", phone: "", email: "", description: "" });
  };

  return (
    <div style={{ backgroundColor: theme.bodyBg, color: theme.textColor, ["--accent" as any]: theme.accent }} className="min-h-screen">
      
      {/* 관리자 로그인 모달 (인라인 구현) */}
      {adminOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 px-4">
          <div className="w-full max-w-md rounded-[28px] bg-white p-8 shadow-2xl text-slate-900">
            <h3 className="text-3xl font-bold">관리자 로그인</h3>
            <div className="mt-6 space-y-4">
              <input onChange={(e) => (window as any).adminId = e.target.value} placeholder="아이디" className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none" />
              <input type="password" onChange={(e) => (window as any).adminPw = e.target.value} placeholder="비밀번호" className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none" />
              <button onClick={() => {
                if ((window as any).adminId === ADMIN_ID && (window as any).adminPw === ADMIN_PASSWORD) {
                  localStorage.setItem(ADMIN_SESSION_KEY, "true");
                  setAdminLoggedIn(true);
                  setAdminOpen(false);
                } else { alert("실패"); }
              }} className="w-full rounded-xl py-3 font-bold text-white bg-slate-900">로그인</button>
              <button onClick={() => setAdminOpen(false)} className="w-full text-sm text-slate-500">닫기</button>
            </div>
          </div>
        </div>
      )}

      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6 lg:px-8">
          <div>
            <div className="text-lg font-bold text-slate-900">{content.siteName}</div>
            <div className="text-xs text-slate-500">{content.siteSubtitle}</div>
          </div>
          <div className="flex gap-2">
            {adminLoggedIn ? (
              <button onClick={logout} className="rounded-lg border px-4 py-2 text-sm font-semibold">관리자 종료</button>
            ) : (
              <button onClick={() => setAdminOpen(true)} className="rounded-lg bg-slate-900 text-white px-4 py-2 text-sm font-semibold">관리자 로그인</button>
            )}
          </div>
        </div>
      </header>

      <main>
        {/* 히어로 섹션 */}
        <section className="relative overflow-hidden text-white py-20 lg:py-28" style={{ background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.secondary} 100%)` }}>
          <div className="relative mx-auto max-w-7xl px-6">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">{content.heroTitle}</h1>
            <p className="mt-6 max-w-2xl text-lg opacity-90">{content.heroDescription}</p>
            <div className="mt-8 flex gap-4">
              <a href="#establishment" className="rounded-xl px-6 py-3 font-bold text-slate-900" style={{ backgroundColor: theme.accent }}>{content.primaryCta}</a>
              <a href="#branding" className="rounded-xl border border-white/30 px-6 py-3 font-bold">브랜딩 견적 보기</a>
            </div>
          </div>
        </section>

        {/* 설립유형 섹션 */}
        <section id="establishment" className="py-20 mx-auto max-w-7xl px-6">
          <SectionHeader eyebrow="Establishment" title={content.establishmentTitle} desc={content.establishmentDescription} center />
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {establishmentTypes.map((item) => (
              <button key={item.id} onClick={() => setSelectedEstablishmentType(item.id)} className={`p-6 border rounded-[24px] text-left transition ${selectedEstablishmentType === item.id ? "ring-2 ring-slate-200" : ""}`} style={{ borderColor: selectedEstablishmentType === item.id ? theme.accent : "#E2E8F0", backgroundColor: theme.cardBg }}>
                <h3 className="text-xl font-bold">{item.name}</h3>
                <p className="mt-2 text-sm text-slate-500">{item.summary}</p>
              </button>
            ))}
          </div>
          
          {/* 상세 정보 테이블 */}
          {establishmentType && (
            <div className="mt-12 p-8 border rounded-[28px] bg-white">
              <h4 className="text-2xl font-bold mb-6">{establishmentType.name} 상세 검토</h4>
              <div className="grid gap-4">
                {establishmentType.details.map(([label, value]) => (
                  <div key={label} className="flex border-b py-3 text-sm">
                    <span className="w-32 font-bold text-slate-500">{label}</span>
                    <span className="text-slate-800">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* 브랜딩 섹션 */}
        <section id="branding" className="py-20 bg-slate-50">
          <div className="mx-auto max-w-7xl px-6">
            <SectionHeader eyebrow="Branding" title={content.brandingTitle} desc={content.brandingDescription} center />
            <div className="mt-12 grid gap-6 lg:grid-cols-4">
              {brandingPackages.map((item) => (
                <PackageCard key={item.id} item={item} active={selectedBrandingPackage === item.id} onClick={() => setSelectedBrandingPackage(item.id)} theme={theme} />
              ))}
            </div>
            
            {/* 견적 요약 카드 */}
            <div className="mt-12 bg-slate-900 text-white p-8 rounded-[28px] shadow-2xl flex flex-col md:flex-row justify-between items-center">
              <div>
                <h3 className="text-2xl font-bold">통합 컨설팅 견적</h3>
                <p className="text-slate-400 mt-2">선택하신 패키지와 옵션이 포함된 예상 견적입니다.</p>
              </div>
              <div className="mt-6 md:mt-0 text-right">
                <div className="text-4xl font-bold" style={{ color: theme.accent }}>{formatKRW(total)}</div>
                <button onClick={() => document.getElementById("contact")?.scrollIntoView({behavior: "smooth"})} className="mt-4 px-8 py-3 rounded-xl font-bold text-slate-900" style={{ backgroundColor: theme.accent }}>상담 신청하기</button>
              </div>
            </div>
          </div>
        </section>

        {/* 상담 신청 폼 */}
        <section id="contact" className="py-20 mx-auto max-w-3xl px-6">
          <SectionHeader eyebrow="Contact" title={content.contactTitle} desc={content.contactDescription} center />
          <form onSubmit={submitInquiry} className="mt-10 space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <input required value={form.organization} onChange={(e)=>setForm({...form, organization: e.target.value})} placeholder="기관명" className="p-4 border rounded-xl outline-none" />
              <input required value={form.name} onChange={(e)=>setForm({...form, name: e.target.value})} placeholder="담당자명" className="p-4 border rounded-xl outline-none" />
            </div>
            <input required value={form.phone} onChange={(e)=>setForm({...form, phone: e.target.value})} placeholder="연락처" className="w-full p-4 border rounded-xl outline-none" />
            <textarea required value={form.description} onChange={(e)=>setForm({...form, description: e.target.value})} rows={5} placeholder="상담 요청내용" className="w-full p-4 border rounded-xl outline-none" />
            <button type="submit" className="w-full py-4 rounded-xl font-bold text-white text-lg" style={{ backgroundColor: theme.primary }}>신청서 제출하기</button>
            {inquirySaved && <p className="text-center text-emerald-600 font-bold">신청이 완료되었습니다!</p>}
          </form>
        </section>

        {/* 관리자 CMS 패널 */}
        {adminLoggedIn && (
          <section className="py-20 bg-slate-100 border-t">
            <div className="mx-auto max-w-7xl px-6">
              <div className="flex justify-between items-center mb-10">
                <h2 className="text-3xl font-bold">관리자 홈페이지 편집</h2>
                <button onClick={persist} className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold">사이트 저장하기</button>
              </div>
              <div className="grid md:grid-cols-2 gap-8 bg-white p-8 rounded-[28px]">
                <div className="space-y-4">
                  <label className="block text-sm font-bold">사이트 이름</label>
                  <input value={content.siteName} onChange={(e) => updateContent("siteName", e.target.value)} className="w-full p-3 border rounded-lg" />
                  
                  <label className="block text-sm font-bold">메인 제목</label>
                  <textarea value={content.heroTitle} onChange={(e) => updateContent("heroTitle", e.target.value)} className="w-full p-3 border rounded-lg" rows={3} />
                  
                  <label className="block text-sm font-bold">연락처</label>
                  <input value={content.phone} onChange={(e) => updateContent("phone", e.target.value)} className="w-full p-3 border rounded-lg" />
                </div>
                <div className="space-y-4">
                  <label className="block text-sm font-bold">강조 색상 (Accent)</label>
                  <input type="color" value={content.accent} onChange={(e) => updateContent("accent", e.target.value)} className="w-full h-12 p-1 border rounded-lg" />
                  
                  <label className="block text-sm font-bold">은행 정보</label>
                  <input value={content.bankName} onChange={(e) => updateContent("bankName", e.target.value)} className="w-full p-3 border rounded-lg mb-2" placeholder="은행명" />
                  <input value={content.bankAccount} onChange={(e) => updateContent("bankAccount", e.target.value)} className="w-full p-3 border rounded-lg" placeholder="계좌번호" />
                </div>
              </div>
              {saveMessage && <p className="mt-4 text-center text-blue-600 font-bold">{saveMessage}</p>}
            </div>
          </section>
        )}
      </main>

      <footer className="p-10 text-center border-t bg-white text-slate-500 text-sm">
        <p>{content.footerText}</p>
        <p className="mt-2">{content.bankName} {content.bankAccount} | 예금주: {content.bankHolder}</p>
      </footer>
    </div>
  );
}
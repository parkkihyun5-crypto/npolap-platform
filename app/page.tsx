"use client";

import React, { useEffect, useMemo, useState } from "react";

// --- 인터페이스 정의 (TypeScript 안정성 확보) ---
interface Service {
  id: string;
  title: string;
  desc: string;
  icon?: string;
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

// --- 상수 데이터 (고급화된 기본 설정) ---
const DEFAULT_SITE: SiteConfig = {
  platformName: "ILU 공익법인 플랫폼",
  platformSubtitle: "Public Interest Corp. Total Consulting",
  heroTitle: "공익법인의 가치를 세우고,\n지속 가능한 운영을 설계합니다.",
  heroDescription: "법인 설립부터 정관 설계, 행정 실무, 그리고 기관의 정체성을 담은 브랜딩까지. 국제지도자연합(ILU)의 전문 역량으로 공익법인의 시작과 성장을 함께합니다.",
  primaryButton: "설립 유형 자가진단",
  secondaryButton: "브랜딩 포트폴리오",
  topNotice: "2026 International Leaders Union | 공익법인 설립 운영 지원 본부",
  accent: "#D4AF37", // Metallic Gold
  primary: "#0F172A", // Deep Slate
  secondary: "#1E293B",
  bodyBg: "#FDFDFD",
  cardBg: "#FFFFFF",
  textColor: "#1E293B",
  phone: "02-1234-5678",
  email: "ilu.foundation@example.com",
  bankName: "우리은행",
  bankAccount: "1005-404-403203",
  bankHolder: "국제지도자연합",
  footerText: "© 2026 International Leaders Union. All rights reserved.",
  services: [
    { id: "s1", title: "법인 설립 전략", desc: "주무관청 협의 및 정관 설계 등 인허가 전 과정을 밀착 지원합니다.", icon: "🏛️" },
    { id: "s2", title: "운영 거버넌스", desc: "이사회 구성 및 회의록 작성 등 법적 안정성을 보장하는 운영 체계를 구축합니다.", icon: "⚖️" },
    { id: "s3", title: "세무/회계 실무", desc: "공익법인 지정 및 고유번호증 발급 등 필수 행정 절차를 대행합니다.", icon: "📊" },
    { id: "s4", title: "프리미엄 브랜딩", desc: "기관의 신뢰도를 높이는 CI/BI 및 웹사이트 아이덴티티를 제안합니다.", icon: "🎨" },
  ],
  establishmentIntroTitle: "최적의 설립 형태 검토",
  establishmentIntroDescription: "활동 목적과 자산 규모에 따라 가장 효율적인 법인 형태를 선택하는 것이 첫 걸음입니다.",
};

const BRANDING_PACKAGES: PackageItem[] = [
  { id: "basic", name: "ESSENTIAL", subtitle: "BI Foundation", price: 2500000, range: "250만원~", description: "소규모 단체 및 초기 법인을 위한 필수 브랜딩 세트", features: ["로고 시스템(국/영문)", "컬러 가이드", "명함/서식류 디자인"], badge: "Basic" },
  { id: "pro", name: "PROFESSIONAL", subtitle: "Identity System", price: 5500000, range: "550만원~", description: "중대형 NGO 및 사단법인을 위한 통합 아이덴티티", features: ["심볼 마크 심화 개발", "브랜드 어플리케이션 5종", "웹 가이드북"], badge: "Most Popular", popular: true },
  { id: "signature", name: "SIGNATURE", subtitle: "Total Heritage", price: 15000000, range: "1,500만원~", description: "국제기구 및 대형 재단을 위한 헤리티지 구축 패키지", features: ["브랜드 전략 컨설팅", "전용 폰트 제안", "공간/사이니지 디자인 가이드"], badge: "Premium" },
];

// --- 헬퍼 함수 ---
const formatPrice = (v: number) => new Intl.NumberFormat("ko-KR", { style: "currency", currency: "KRW" }).format(v);

// --- 컴포넌트 ---
export default function PremiumPlatform() {
  const [site, setSite] = useState<SiteConfig>(DEFAULT_SITE);
  const [view, setView] = useState<"user" | "admin">("user");
  const [selectedPkg, setSelectedPkg] = useState("pro");
  const [isAdminAuth, setIsAdminAuth] = useState(false);

  // 로컬 스토리지 연동 (배포 환경 고려)
  useEffect(() => {
    const saved = localStorage.getItem("ilu_site_config");
    if (saved) setSite(JSON.parse(saved));
  }, []);

  const handleSave = () => {
    localStorage.setItem("ilu_site_config", JSON.stringify(site));
    alert("설정이 저장되었습니다.");
  };

  return (
    <div className="min-h-screen font-sans antialiased" style={{ backgroundColor: site.bodyBg, color: site.textColor }}>
      
      {/* GNB */}
      <nav className="sticky top-0 z-50 border-b border-slate-200/60 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-slate-950 flex items-center justify-center text-white font-bold">ILU</div>
            <div>
              <h1 className="text-lg font-bold tracking-tight text-slate-950">{site.platformName}</h1>
              <p className="text-[10px] font-medium uppercase tracking-widest text-slate-400">{site.platformSubtitle}</p>
            </div>
          </div>
          <div className="flex gap-4">
            <button onClick={() => setView("user")} className={`text-sm font-semibold ${view === "user" ? "text-amber-600" : "text-slate-500"}`}>홈페이지</button>
            <button onClick={() => setView("admin")} className={`text-sm font-semibold ${view === "admin" ? "text-amber-600" : "text-slate-500"}`}>관리자</button>
          </div>
        </div>
      </nav>

      {view === "user" ? (
        <main>
          {/* Hero Section */}
          <section className="relative overflow-hidden bg-slate-950 py-24 text-white lg:py-32">
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `radial-gradient(circle at 2px 2px, ${site.accent} 1px, transparent 0)`, backgroundSize: '40px 40px' }}></div>
            <div className="relative mx-auto max-w-7xl px-6">
              <div className="max-w-3xl">
                <span className="mb-4 inline-block rounded-full bg-amber-500/10 px-4 py-1 text-xs font-bold tracking-widest text-amber-500 ring-1 ring-inset ring-amber-500/20">{site.topNotice}</span>
                <h2 className="mb-8 text-5xl font-extrabold leading-[1.1] tracking-tight md:text-7xl whitespace-pre-line">
                  {site.heroTitle}
                </h2>
                <p className="mb-10 text-lg leading-relaxed text-slate-400 md:text-xl">
                  {site.heroDescription}
                </p>
                <div className="flex flex-wrap gap-4">
                  <button className="rounded-full bg-amber-500 px-8 py-4 text-sm font-bold text-slate-950 transition-transform hover:scale-105" style={{ backgroundColor: site.accent }}>{site.primaryButton}</button>
                  <button className="rounded-full border border-slate-700 px-8 py-4 text-sm font-bold text-white transition-colors hover:bg-slate-800">{site.secondaryButton}</button>
                </div>
              </div>
            </div>
          </section>

          {/* Service Cards */}
          <section className="mx-auto max-w-7xl px-6 py-24">
            <div className="mb-16 text-center">
              <h3 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">Core Consulting</h3>
              <p className="mt-4 text-slate-500">전문적인 분석과 풍부한 실무 경험으로 법인의 초석을 다집니다.</p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {site.services.map((s) => (
                <div key={s.id} className="group rounded-3xl border border-slate-100 bg-white p-8 shadow-sm transition-all hover:-translate-y-2 hover:shadow-xl">
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-50 text-3xl group-hover:bg-amber-50">{s.icon}</div>
                  <h4 className="mb-3 text-xl font-bold text-slate-900">{s.title}</h4>
                  <p className="text-sm leading-relaxed text-slate-500">{s.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Branding Pricing */}
          <section className="bg-slate-50 py-24">
            <div className="mx-auto max-w-7xl px-6">
              <div className="mb-16 text-center">
                <h3 className="text-3xl font-bold text-slate-900 md:text-4xl">Branding Service</h3>
                <p className="mt-4 text-slate-500">기관의 정체성을 시각적 예술로 승화시키는 프리미엄 솔루션</p>
              </div>
              <div className="grid gap-8 lg:grid-cols-3">
                {BRANDING_PACKAGES.map((p) => (
                  <div key={p.id} className={`relative flex flex-col rounded-[2.5rem] border p-10 transition-all ${selectedPkg === p.id ? 'border-amber-500 bg-white shadow-2xl ring-1 ring-amber-500' : 'border-slate-200 bg-white/50'}`}>
                    {p.popular && <span className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-amber-500 px-4 py-1 text-[10px] font-bold text-white">가장 선호하는 솔루션</span>}
                    <div className="mb-8">
                      <p className="text-xs font-bold uppercase tracking-widest text-amber-600">{p.badge}</p>
                      <h4 className="mt-2 text-3xl font-black text-slate-950">{p.name}</h4>
                      <p className="text-sm text-slate-400">{p.subtitle}</p>
                    </div>
                    <div className="mb-8">
                      <span className="text-4xl font-bold text-slate-950">{p.range}</span>
                    </div>
                    <p className="mb-8 text-sm leading-relaxed text-slate-500">{p.description}</p>
                    <ul className="mb-10 flex-1 space-y-4">
                      {p.features.map(f => (
                        <li key={f} className="flex items-center gap-3 text-sm text-slate-600">
                          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-100 text-[10px] text-amber-600">✓</span>
                          {f}
                        </li>
                      ))}
                    </ul>
                    <button onClick={() => setSelectedPkg(p.id)} className={`rounded-2xl py-4 text-sm font-bold transition-all ${selectedPkg === p.id ? 'bg-slate-950 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
                      {selectedPkg === p.id ? '선택됨' : '패키지 선택'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>
      ) : (
        /* Admin Page - 로그인 보안 없이 간소화된 버전 */
        <main className="mx-auto max-w-4xl px-6 py-12">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-bold">Admin Console</h2>
            <button onClick={handleSave} className="rounded-lg bg-amber-500 px-6 py-2 text-sm font-bold text-white shadow-lg">모든 변경사항 저장</button>
          </div>
          
          <div className="space-y-8 rounded-3xl border border-slate-200 bg-white p-8">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-slate-400">플랫폼 명칭</label>
                <input value={site.platformName} onChange={e => setSite({...site, platformName: e.target.value})} className="w-full rounded-xl border border-slate-200 p-3 text-sm outline-none focus:border-amber-500" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-slate-400">메인 강조색</label>
                <div className="flex gap-2">
                  <input type="color" value={site.accent} onChange={e => setSite({...site, accent: e.target.value})} className="h-11 w-11 rounded-lg border-none" />
                  <input value={site.accent} onChange={e => setSite({...site, accent: e.target.value})} className="flex-1 rounded-xl border border-slate-200 p-3 text-sm" />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase text-slate-400">헤로 섹션 타이틀 (줄바꿈 가능)</label>
              <textarea rows={3} value={site.heroTitle} onChange={e => setSite({...site, heroTitle: e.target.value})} className="w-full rounded-xl border border-slate-200 p-3 text-sm" />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase text-slate-400">헤로 섹션 설명</label>
              <textarea rows={4} value={site.heroDescription} onChange={e => setSite({...site, heroDescription: e.target.value})} className="w-full rounded-xl border border-slate-200 p-3 text-sm" />
            </div>

            <div className="border-t pt-8">
               <h4 className="mb-4 text-sm font-bold text-slate-950">컨설팅 서비스 편집</h4>
               <div className="grid gap-4 md:grid-cols-2">
                 {site.services.map((s, idx) => (
                   <div key={idx} className="rounded-2xl bg-slate-50 p-4">
                     <input value={s.title} onChange={e => {
                       const newServices = [...site.services];
                       newServices[idx].title = e.target.value;
                       setSite({...site, services: newServices});
                     }} className="mb-2 w-full bg-transparent font-bold outline-none" />
                     <textarea value={s.desc} onChange={e => {
                       const newServices = [...site.services];
                       newServices[idx].desc = e.target.value;
                       setSite({...site, services: newServices});
                     }} className="w-full bg-transparent text-xs text-slate-500 outline-none" rows={2} />
                   </div>
                 ))}
               </div>
            </div>
          </div>
        </main>
      )}

      {/* Footer */}
      <footer className="border-t border-slate-100 bg-white py-12 text-center">
        <p className="text-sm font-medium text-slate-400">{site.footerText}</p>
        <div className="mt-4 flex justify-center gap-6 text-xs text-slate-500">
          <span>T. {site.phone}</span>
          <span>E. {site.email}</span>
        </div>
      </footer>
    </div>
  );
}
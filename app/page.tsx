export default function Home() {
  return (
    <main
      style={{
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f7f9fc",
        color: "#111",
        minHeight: "100vh",
      }}
    >
      {/* 상단 헤더 */}
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px 40px",
          backgroundColor: "#ffffff",
          borderBottom: "1px solid #e5e7eb",
          position: "sticky",
          top: 0,
          zIndex: 10,
        }}
      >
        <div style={{ fontSize: "24px", fontWeight: "bold", color: "#0047A0" }}>
          NPOLAP
        </div>

        <nav style={{ display: "flex", gap: "24px", fontSize: "15px" }}>
          <span style={{ cursor: "pointer" }}>공익법인 설립</span>
          <span style={{ cursor: "pointer" }}>브랜딩 서비스</span>
          <span style={{ cursor: "pointer" }}>문의하기</span>
          <span style={{ cursor: "pointer" }}>관리자</span>
        </nav>
      </header>

      {/* 메인 비주얼 */}
      <section
        style={{
          padding: "100px 20px 80px",
          textAlign: "center",
          background:
            "linear-gradient(135deg, #eef4ff 0%, #f7f9fc 50%, #ffffff 100%)",
        }}
      >
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <p
            style={{
              color: "#0047A0",
              fontWeight: "bold",
              fontSize: "14px",
              marginBottom: "16px",
              letterSpacing: "1px",
            }}
          >
            PUBLIC INTEREST FOUNDATION & BRANDING CONSULTING
          </p>

          <h1
            style={{
              fontSize: "48px",
              lineHeight: 1.3,
              marginBottom: "24px",
              fontWeight: "bold",
            }}
          >
            공익법인 설립부터
            <br />
            브랜딩 구축까지 한 번에
          </h1>

          <p
            style={{
              fontSize: "18px",
              lineHeight: 1.8,
              color: "#4b5563",
              maxWidth: "760px",
              margin: "0 auto 40px",
            }}
          >
            비영리법인·사단법인·재단법인 설립 검토, 정관 및 서류 설계,
            행정 절차 자문, 브랜드 전략, 홈페이지 기획까지
            공익법인 설립과 운영을 위한 종합 컨설팅 서비스를 제공합니다.
          </p>

          <div
            style={{
              display: "flex",
              gap: "16px",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <button
              style={{
                padding: "16px 30px",
                backgroundColor: "#0047A0",
                color: "#fff",
                border: "none",
                borderRadius: "10px",
                fontSize: "16px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              설립 상담 신청
            </button>

            <button
              style={{
                padding: "16px 30px",
                backgroundColor: "#ffffff",
                color: "#0047A0",
                border: "1px solid #0047A0",
                borderRadius: "10px",
                fontSize: "16px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              서비스 보기
            </button>
          </div>
        </div>
      </section>

      {/* 서비스 소개 카드 */}
      <section style={{ padding: "70px 20px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <h2
            style={{
              textAlign: "center",
              fontSize: "32px",
              marginBottom: "16px",
              fontWeight: "bold",
            }}
          >
            핵심 서비스
          </h2>

          <p
            style={{
              textAlign: "center",
              fontSize: "17px",
              color: "#6b7280",
              marginBottom: "50px",
            }}
          >
            설립 전 검토부터 운영 기반 구축까지 실제 실행 중심으로 지원합니다.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "24px",
            }}
          >
            <div
              style={{
                backgroundColor: "#fff",
                borderRadius: "16px",
                padding: "28px",
                boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
              }}
            >
              <h3 style={{ fontSize: "22px", marginBottom: "14px" }}>
                공익법인 설립
              </h3>
              <p style={{ color: "#4b5563", lineHeight: 1.7 }}>
                사단법인·재단법인·비영리민간단체 등 설립 형태 검토,
                인허가 가능성, 주무관청 대응 방향, 필수 서류 체계를 안내합니다.
              </p>
            </div>

            <div
              style={{
                backgroundColor: "#fff",
                borderRadius: "16px",
                padding: "28px",
                boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
              }}
            >
              <h3 style={{ fontSize: "22px", marginBottom: "14px" }}>
                정관·서류 설계
              </h3>
              <p style={{ color: "#4b5563", lineHeight: 1.7 }}>
                정관, 창립총회 의사록, 임원 취임승낙서, 사업계획서,
                수지예산서 등 제출 문서 전반을 구조적으로 설계합니다.
              </p>
            </div>

            <div
              style={{
                backgroundColor: "#fff",
                borderRadius: "16px",
                padding: "28px",
                boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
              }}
            >
              <h3 style={{ fontSize: "22px", marginBottom: "14px" }}>
                브랜딩 서비스
              </h3>
              <p style={{ color: "#4b5563", lineHeight: 1.7 }}>
                기관명 정비, 슬로건, 소개문구, CI·BI 기획,
                홈페이지 문안 및 대외 커뮤니케이션 방향까지 함께 설계합니다.
              </p>
            </div>

            <div
              style={{
                backgroundColor: "#fff",
                borderRadius: "16px",
                padding: "28px",
                boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
              }}
            >
              <h3 style={{ fontSize: "22px", marginBottom: "14px" }}>
                운영 컨설팅
              </h3>
              <p style={{ color: "#4b5563", lineHeight: 1.7 }}>
                설립 이후 홈페이지 운영, 문의 접수 구조, 관리자 페이지 설계,
                장기적 홍보 및 후원 기반 구축까지 연결합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 하단 CTA */}
      <section
        style={{
          padding: "70px 20px 100px",
        }}
      >
        <div
          style={{
            maxWidth: "1000px",
            margin: "0 auto",
            backgroundColor: "#0047A0",
            color: "#fff",
            borderRadius: "24px",
            padding: "50px 30px",
            textAlign: "center",
          }}
        >
          <h2 style={{ fontSize: "34px", marginBottom: "20px" }}>
            지금 바로 설립 가능성과 준비 방향을 점검해보세요
          </h2>

          <p
            style={{
              fontSize: "17px",
              lineHeight: 1.8,
              marginBottom: "30px",
              opacity: 0.95,
            }}
          >
            홈페이지, 브랜딩, 법인 설립 자문을 하나의 흐름으로 연결해
            초기 준비 시간을 줄이고 실행력을 높일 수 있습니다.
          </p>

          <button
            style={{
              padding: "16px 32px",
              backgroundColor: "#fff",
              color: "#0047A0",
              border: "none",
              borderRadius: "10px",
              fontSize: "16px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            무료 상담 문의
          </button>
        </div>
      </section>
    </main>
  );
}
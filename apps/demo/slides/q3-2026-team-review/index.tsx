import type { DesignSystem, Page, SlideMeta, SlideTransition } from '@open-slide/core';
import { useSlidePageNumber } from '@open-slide/core';
import type { CSSProperties, ReactNode } from 'react';
import morningReportPoster from './assets/morning-report-video-poster.jpg';
import tradingPersonaWheel from './assets/trading-persona-wheel.png';
import tradingWorkbench from './assets/trading-workbench.png';

const morningReportVideo = new URL('./assets/customer-demo-zh-hant-75s.mp4', import.meta.url).href;

export const design: DesignSystem = {
  palette: { bg: '#F7F8FA', text: '#17232D', accent: '#3158D5' },
  fonts: {
    display: '"Helvetica Neue", "PingFang TC", "Microsoft JhengHei", sans-serif',
    body: '"PingFang TC", "Helvetica Neue", "Microsoft JhengHei", sans-serif',
  },
  typeScale: { hero: 136, body: 34 },
  radius: 0,
};

export const transition: SlideTransition = {
  duration: 240,
  exit: { keyframes: [{ opacity: 1 }, { opacity: 1 }] },
  enter: {
    easing: 'cubic-bezier(0, 0, 0.2, 1)',
    keyframes: [{ opacity: 0 }, { opacity: 1 }],
  },
};

const c = {
  muted: '#66717D',
  line: '#D6DCE3',
  blueSoft: '#E9EEF9',
  copper: '#AC572B',
  copperSoft: '#F2E7DE',
  dark: '#14212B',
  cream: '#F6F1EA',
  lightCopper: '#E6A579',
  darkMuted: '#B2BBC3',
  darkLine: '#43505A',
};

const mono: CSSProperties = {
  fontFamily: '"SFMono-Regular", Consolas, monospace',
  fontVariantNumeric: 'tabular-nums',
};
const split: CSSProperties = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80 };

const Label = ({
  children,
  color = 'var(--osd-accent)',
}: {
  children: ReactNode;
  color?: string;
}) => (
  <div style={{ ...mono, color, fontSize: 24, letterSpacing: '0.06em', lineHeight: 1.4 }}>
    {children}
  </div>
);

const Body = ({ children, style }: { children: ReactNode; style?: CSSProperties }) => (
  <p style={{ fontSize: 'var(--osd-size-body)', lineHeight: 1.55, margin: 0, ...style }}>
    {children}
  </p>
);

const Footer = ({ dark = false }: { dark?: boolean }) => {
  const { current, total } = useSlidePageNumber();
  return (
    <footer
      style={{
        position: 'absolute',
        left: 112,
        right: 112,
        bottom: 42,
        borderTop: `1px solid ${dark ? c.darkLine : c.line}`,
        paddingTop: 18,
        display: 'flex',
        justifyContent: 'space-between',
        color: dark ? c.darkMuted : c.muted,
        fontSize: 22,
        ...mono,
      }}
    >
      <span>2026 Q3 / TEAM REVIEW</span>
      <span>
        {String(current).padStart(2, '0')} / {String(total).padStart(2, '0')}
      </span>
    </footer>
  );
};

const Canvas = ({ children, dark = false }: { children: ReactNode; dark?: boolean }) => (
  <section
    data-q3-slide=""
    style={{
      width: '100%',
      height: '100%',
      position: 'relative',
      boxSizing: 'border-box',
      background: dark ? c.dark : 'var(--osd-bg)',
      color: dark ? c.cream : 'var(--osd-text)',
      fontFamily: 'var(--osd-font-body)',
    }}
  >
    {children}
    <Footer dark={dark} />
  </section>
);

const Frame = ({
  section,
  title,
  lead,
  children,
  note,
  travis = false,
}: {
  section: string;
  title: string;
  lead: string;
  children: ReactNode;
  note?: string;
  travis?: boolean;
}) => (
  <Canvas>
    <div style={{ padding: '86px 112px 0' }}>
      <Label color={travis ? c.copper : 'var(--osd-accent)'}>{section}</Label>
      <h2
        style={{
          fontFamily: 'var(--osd-font-display)',
          fontSize: 76,
          fontWeight: 750,
          letterSpacing: '-0.035em',
          lineHeight: 1.16,
          margin: '22px 0 20px',
        }}
      >
        {title}
      </h2>
      <Body style={{ color: c.muted, fontSize: 32 }}>{lead}</Body>
      <div style={{ marginTop: 42 }}>{children}</div>
    </div>
    {note ? (
      <div
        style={{
          position: 'absolute',
          left: 112,
          right: 112,
          bottom: 118,
          fontSize: 24,
          color: c.muted,
          lineHeight: 1.4,
        }}
      >
        {note}
      </div>
    ) : null}
  </Canvas>
);

const Row = ({
  code,
  title,
  children,
  accent = 'var(--osd-accent)',
}: {
  code: string;
  title: string;
  children: ReactNode;
  accent?: string;
}) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: '88px 440px 1fr',
      alignItems: 'center',
      gap: 28,
      minHeight: 124,
      borderTop: `1px solid ${c.line}`,
    }}
  >
    <Label color={accent}>{code}</Label>
    <div style={{ fontSize: 37, fontWeight: 650 }}>{title}</div>
    <Body style={{ fontSize: 31, color: c.muted }}>{children}</Body>
  </div>
);

const Point = ({
  number,
  title,
  children,
  accent = 'var(--osd-accent)',
}: {
  number: string;
  title: string;
  children: ReactNode;
  accent?: string;
}) => (
  <div style={{ borderTop: `2px solid ${accent}`, paddingTop: 26 }}>
    <Label color={accent}>{number}</Label>
    <h3 style={{ fontSize: 44, lineHeight: 1.25, fontWeight: 650, margin: '24px 0 20px' }}>
      {title}
    </h3>
    <Body style={{ color: c.muted, fontSize: 32 }}>{children}</Body>
  </div>
);

const Cover: Page = () => (
  <Canvas>
    <div style={{ position: 'absolute', left: 112, top: 98 }}>
      <Label>QUARTERLY REVIEW / JUL—SEP 2026</Label>
    </div>
    <div style={{ position: 'absolute', left: 112, top: 248 }}>
      <h1
        style={{
          fontFamily: 'var(--osd-font-display)',
          fontSize: 'var(--osd-size-hero)',
          lineHeight: 1.12,
          letterSpacing: '-0.045em',
          margin: 0,
          fontWeight: 750,
        }}
      >
        團隊成果
        <br />
        與產品規劃
      </h1>
      <Body style={{ marginTop: 44, color: c.muted, fontSize: 38 }}>
        既有產品持續推進
        <br />
        Travis AI 開發前準備
      </Body>
    </div>
    <div
      style={{
        position: 'absolute',
        right: 112,
        top: 202,
        width: 530,
        borderTop: '4px solid var(--osd-accent)',
        paddingTop: 16,
      }}
    >
      <div
        style={{
          fontFamily: 'var(--osd-font-display)',
          fontSize: 270,
          fontWeight: 600,
          letterSpacing: '-0.07em',
          lineHeight: 1.15,
          color: 'var(--osd-accent)',
        }}
      >
        Q3
      </div>
      <div style={{ ...mono, fontSize: 46, marginTop: 12 }}>2026</div>
      <div
        style={{
          borderTop: `1px solid ${c.line}`,
          marginTop: 56,
          paddingTop: 26,
          fontSize: 29,
          lineHeight: 1.8,
          color: c.muted,
        }}
      >
        AI 晨報 / 金融 DB
        <br />
        AI 股票交易機器人
        <br />
        <span style={{ color: c.copper }}>Travis AI</span>
      </div>
    </div>
  </Canvas>
);

const Portfolio: Page = () => (
  <Frame
    section="01 / PORTFOLIO"
    title="四項產品，目前推進的位置"
    lead="既有產品延續投入，Travis AI 聚焦人格設計與開發前準備。"
  >
    <div
      style={{ display: 'grid', gridTemplateColumns: '88px 440px 1fr', gap: 28, paddingBottom: 22 }}
    >
      <Label>項目</Label>
      <Label color={c.muted}>產品</Label>
      <Label color={c.muted}>目前方向</Label>
    </div>
    <Row code="01" title="AI 晨報">
      Rework 規劃中，新增事件研究體驗
    </Row>
    <Row code="02" title="金融 DB">
      數據 DB 擴充；研報 DB 上雲與內容擴充
    </Row>
    <Row code="03" title="AI 股票交易機器人">
      延續原方向，開始串接富邦 API
    </Row>
    <Row code="04" title="Travis AI" accent={c.copper}>
      人格設計中，推動專利與 CITI 準備
    </Row>
  </Frame>
);

const MorningFeature = ({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: ReactNode;
}) => (
  <div style={{ borderTop: '2px solid var(--osd-accent)', paddingTop: 24 }}>
    <div style={{ display: 'flex', gap: 28, alignItems: 'baseline' }}>
      <Label>{number}</Label>
      <h3 style={{ fontSize: 40, fontWeight: 650, lineHeight: 1.3, margin: 0 }}>{title}</h3>
    </div>
    <Body style={{ fontSize: 31, color: c.muted, marginTop: 22 }}>{children}</Body>
  </div>
);

const MorningFoundation: Page = () => (
  <Frame
    section="02 / AI MORNING REPORT"
    title="AI 晨報的既有基礎"
    lead="閱讀、收聽與問答能力持續保留，作為下一階段的產品基礎。"
    note="AI 晨報操作示範 / 75 秒 / 含繁體中文字幕與音訊，可手動播放。"
  >
    <div
      style={{ display: 'grid', gridTemplateColumns: '1040px 1fr', gap: 100, alignItems: 'start' }}
    >
      {/* biome-ignore lint/a11y/useMediaCaption: The supplied video includes burned-in Traditional Chinese captions. */}
      <video
        src={morningReportVideo}
        poster={morningReportPoster}
        aria-label="AI 晨報操作示範，75 秒，含繁體中文字幕與音訊"
        controls
        playsInline
        preload="metadata"
        onClick={(event) => event.stopPropagation()}
        onPointerDown={(event) => event.stopPropagation()}
        onKeyDown={(event) => event.stopPropagation()}
        style={{
          width: 1040,
          height: 585,
          objectFit: 'contain',
          objectPosition: 'top left',
          border: `1px solid ${c.line}`,
        }}
      />
      <div style={{ display: 'grid', gap: 48, paddingTop: 16 }}>
        <MorningFeature number="01" title="閱讀">
          保留完整報告與內容脈絡。
        </MorningFeature>
        <MorningFeature number="02" title="收聽">
          透過音訊吸收晨報內容。
        </MorningFeature>
        <MorningFeature number="03" title="問答">
          針對報告內容延伸追問。
        </MorningFeature>
      </div>
    </div>
  </Frame>
);

const EventItem = ({
  day,
  title,
  active = false,
}: {
  day: string;
  title: string;
  active?: boolean;
}) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: '92px 1fr',
      gap: 24,
      padding: '25px 22px',
      borderBottom: `1px solid ${c.line}`,
      background: active ? c.blueSoft : 'transparent',
      color: active ? 'var(--osd-accent)' : 'var(--osd-text)',
    }}
  >
    <span style={{ ...mono, fontSize: 30 }}>{day}</span>
    <span style={{ fontSize: 31, fontWeight: active ? 650 : 400 }}>{title}</span>
  </div>
);

const EventExperience: Page = () => (
  <Frame
    section="02 / REWORK CONCEPT"
    title="在日曆看事件，在走勢找脈絡"
    lead="法說會、FED、IPO 等資訊，放回市場發生的時間點。"
    note="規劃示意：事件日期、公司及價格路徑皆為虛構；圖表呈現時間關係，不代表因果驗證。"
  >
    <div style={{ display: 'grid', gridTemplateColumns: '470px 1fr', gap: 72 }}>
      <div>
        <Label>事件日曆 / 示意週</Label>
        <div style={{ marginTop: 26, borderTop: `1px solid ${c.line}` }}>
          <EventItem day="週二" title="FED 政策活動" />
          <EventItem day="週三" title="A 公司法說會" active />
          <EventItem day="週五" title="B 公司 IPO" />
        </div>
        <Body style={{ marginTop: 36, fontSize: 30, color: c.muted }}>
          提前掌握活動
          <br />
          保留事後回看入口
        </Body>
      </div>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <Label>A 公司 / 股價走勢概念</Label>
          <span style={{ fontSize: 24, color: c.muted }}>同一場法說會</span>
        </div>
        <svg
          viewBox="0 0 1120 410"
          width="1120"
          height="410"
          role="img"
          aria-label="示意股價走勢，以垂直線標出週三 A 公司法說會的時間"
        >
          <path
            d="M 20 70 H 1100 M 20 170 H 1100 M 20 270 H 1100 M 20 370 H 1100"
            stroke={c.line}
            fill="none"
          />
          <path
            d="M 26 273 L 94 255 L 155 286 L 217 219 L 281 233 L 346 180 L 413 199 L 477 238 L 540 206 L 603 244 L 667 178 L 731 160 L 796 192 L 860 126 L 924 148 L 995 98 L 1080 119"
            stroke="var(--osd-accent)"
            strokeWidth="5"
            fill="none"
            strokeLinejoin="round"
          />
          <path
            d="M 540 42 V 370"
            stroke="var(--osd-accent)"
            strokeWidth="2"
            strokeDasharray="7 8"
          />
          <circle
            cx="540"
            cy="206"
            r="10"
            fill="var(--osd-accent)"
            stroke="var(--osd-bg)"
            strokeWidth="4"
          />
          <text x="560" y="56" fill="var(--osd-accent)" fontSize="27">
            A 公司法說會
          </text>
          <text x="20" y="405" fill={c.muted} fontSize="24">
            事件前
          </text>
          <text x="1040" y="405" fill={c.muted} fontSize="24">
            事件後
          </text>
        </svg>
        <div style={{ borderTop: `1px solid ${c.line}`, paddingTop: 24, fontSize: 30 }}>
          事件資訊與活動影片，成為回看走勢的研究入口。
        </div>
      </div>
    </div>
  </Frame>
);

const MorningImplementation: Page = () => (
  <Frame
    section="02 / NEXT STEP"
    title="先建立資料與影片的收集機制"
    lead="Rework 目前已有初步發想，接下來進入實作。"
    note="原有閱讀、收聽與問答功能持續保留。"
  >
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 64, marginTop: 66 }}>
      <Point number="01 / COLLECT" title="資料與影片收集">
        從法說會、FED、IPO 等<br />
        活動資訊與影片開始。
      </Point>
      <Point number="02 / SCHEDULE" title="定期抓取">
        建立持續更新機制，
        <br />
        逐步累積可用內容。
      </Point>
      <Point number="03 / EXPERIENCE" title="事件研究介面">
        以資料基礎支援
        <br />
        日曆與走勢上的事件呈現。
      </Point>
    </div>
    <div
      style={{
        marginTop: 100,
        paddingTop: 28,
        borderTop: `1px solid ${c.line}`,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Label>下一階段的第一個里程碑</Label>
      <div style={{ fontSize: 42, fontWeight: 650 }}>讓事件內容能持續被收集</div>
    </div>
  </Frame>
);

const DatabaseFoundation: Page = () => (
  <Frame
    section="03 / FINANCIAL DATABASE"
    title="金融 DB：數據與研報，兩條擴充路線"
    lead="數據 DB 整理市場資料；研報 DB 累積可搜尋、可追問的研究內容。"
  >
    <div style={{ ...split, marginTop: 32 }}>
      <div style={{ borderTop: '3px solid var(--osd-accent)', paddingTop: 30 }}>
        <Label>01 / DATA DB</Label>
        <h3 style={{ fontSize: 56, fontWeight: 650, margin: '24px 0' }}>數據 DB</h3>
        <Body>
          整合行情、標的、日曆與宏觀資料，
          <br />
          提供一致的查詢與應用基礎。
        </Body>
        <Body style={{ color: c.muted, fontSize: 30, marginTop: 24 }}>
          支援圖表、報告、研究與 AI 查詢。
        </Body>
        <div style={{ borderTop: `1px solid ${c.line}`, paddingTop: 26, marginTop: 36 }}>
          <Label>擴充方向</Label>
          <Body style={{ marginTop: 16 }}>
            FactSet、Finlab 擴充
            <br />
            與活動資料、影片收集
          </Body>
        </div>
      </div>
      <div style={{ borderTop: `3px solid ${c.copper}`, paddingTop: 30 }}>
        <Label color={c.copper}>02 / RESEARCH DB</Label>
        <h3 style={{ fontSize: 56, fontWeight: 650, margin: '24px 0' }}>研報 DB</h3>
        <Body>
          整理 PDF、Word 等研究報告，
          <br />
          建立可檢索與問答的研究語料。
        </Body>
        <Body style={{ color: c.muted, fontSize: 30, marginTop: 24 }}>
          支援語意搜尋、帶引用問答與原文追溯。
        </Body>
        <div style={{ borderTop: `1px solid ${c.line}`, paddingTop: 26, marginTop: 36 }}>
          <Label color={c.copper}>目前任務與後續方向</Label>
          <Body style={{ marginTop: 16 }}>
            執行上雲任務
            <br />
            後續擴充更完整的國內外研報
          </Body>
        </div>
      </div>
    </div>
  </Frame>
);

const DatabaseExpansion: Page = () => (
  <Frame
    section="03 / DATA DB EXPANSION"
    title="數據 DB：擴充來源與事件內容"
    lead="既有來源為 Twelve Data、Shioaji、Finlab，接下來擴充資料範圍。"
  >
    <Row code="01" title="FactSet">
      導入新的金融資料來源，擴充研究可用的市場資訊
    </Row>
    <Row code="02" title="Finlab 擴充">
      延伸既有來源的資料範圍，支援後續研究與產品需求
    </Row>
    <Row code="03" title="活動資料與影片">
      收集法說會、FED、IPO 等活動內容，建立定期抓取機制
    </Row>
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 70,
        marginTop: 38,
        background: c.blueSoft,
        padding: '30px 38px',
      }}
    >
      <div>
        <Label>數據 DB</Label>
        <Body style={{ marginTop: 12 }}>收集與累積事件資料</Body>
      </div>
      <div>
        <Label>AI 晨報</Label>
        <Body style={{ marginTop: 12 }}>日曆與走勢上的研究入口</Body>
      </div>
    </div>
  </Frame>
);

const ResearchDatabaseExpansion: Page = () => (
  <Frame
    section="03 / RESEARCH DB EXPANSION"
    title="研報 DB：先上雲，再擴充研究內容"
    lead="既有研報能力支援搜尋、問答與原文追溯，目前正在執行上雲任務。"
    note="上雲為進行中任務；國內外研報擴充為後續目標，來源與涵蓋範圍將逐步推進。"
  >
    <div style={{ ...split, marginTop: 20 }}>
      <Point number="01 / 目前進行中" title="研報 DB 上雲">
        推進既有研報資料庫的雲端部署，
        <br />
        作為後續服務與內容擴充的基礎。
      </Point>
      <Point number="02 / 後續目標" title="更完整的國內外研報" accent={c.copper}>
        擴充國內與海外研究報告來源，
        <br />
        逐步增加研究內容的完整性。
      </Point>
    </div>
    <div style={{ marginTop: 58, paddingTop: 28, borderTop: `1px solid ${c.line}` }}>
      <Label>既有研報處理與使用方式</Label>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 48, marginTop: 24 }}>
        <div>
          <h3 style={{ fontSize: 34, margin: '0 0 14px' }}>報告整理</h3>
          <Body style={{ fontSize: 30, color: c.muted }}>抽取文字、語意標籤</Body>
        </div>
        <div>
          <h3 style={{ fontSize: 34, margin: '0 0 14px' }}>研究查詢</h3>
          <Body style={{ fontSize: 30, color: c.muted }}>搜尋相關報告、延伸問答</Body>
        </div>
        <div>
          <h3 style={{ fontSize: 34, margin: '0 0 14px' }}>來源追溯</h3>
          <Body style={{ fontSize: 30, color: c.muted }}>透過引用回看原始報告</Body>
        </div>
      </div>
    </div>
  </Frame>
);

const TradingProgress: Page = () => (
  <Frame
    section="04 / AI STOCK TRADING"
    title="交易機器人：推進富邦 API 串接"
    lead="產品方向延續，以既有工作台為基礎持續推進。"
    note="左側為既有產品畫面；富邦 API 串接處於開始推進階段。"
  >
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1050px 1fr',
        gap: 64,
        alignItems: 'center',
        paddingTop: 26,
      }}
    >
      <img
        src={tradingWorkbench}
        alt="既有 AI 股票交易機器人的持倉與監控儀表板"
        style={{ width: 1050, height: 522, objectFit: 'contain', border: `1px solid ${c.line}` }}
      />
      <div>
        <Label>本次更新</Label>
        <div style={{ fontSize: 68, lineHeight: 1.2, fontWeight: 650, marginTop: 24 }}>
          富邦 API
        </div>
        <Body style={{ color: c.muted, marginTop: 28 }}>
          開始串接，
          <br />
          延續原有開發進度。
        </Body>
        <div style={{ marginTop: 48, paddingTop: 28, borderTop: `1px solid ${c.line}` }}>
          <Label color={c.muted}>既有方向</Label>
          <Body style={{ fontSize: 30, marginTop: 16 }}>交易意圖、監控與通知</Body>
        </div>
      </div>
    </div>
  </Frame>
);

const TravisIntro: Page = () => (
  <Canvas dark>
    <div style={{ padding: '96px 112px 0' }}>
      <Label color={c.lightCopper}>05 / NEW PRODUCT · 人格設計階段</Label>
      <h2
        style={{
          fontFamily: 'var(--osd-font-display)',
          fontSize: 176,
          letterSpacing: '-0.055em',
          lineHeight: 1.05,
          fontWeight: 550,
          margin: '100px 0 28px',
        }}
      >
        Travis AI
      </h2>
      <div style={{ fontSize: 60, lineHeight: 1.3, fontWeight: 500 }}>人格驅動的交易助理</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 90, marginTop: 100 }}>
        <div style={{ borderTop: `2px solid ${c.lightCopper}`, paddingTop: 30 }}>
          <Label color={c.lightCopper}>01 / 差距呈現</Label>
          <Body style={{ fontSize: 40, marginTop: 24 }}>
            看見實際行為
            <br />
            與期待人格的差異
          </Body>
        </div>
        <div style={{ borderTop: `2px solid ${c.lightCopper}`, paddingTop: 30 }}>
          <Label color={c.lightCopper}>02 / 行為重新導向</Label>
          <Body style={{ fontSize: 40, marginTop: 24 }}>
            協助交易者
            <br />
            逐步靠近自己的目標
          </Body>
        </div>
      </div>
    </div>
  </Canvas>
);

const PersonalityWheel: Page = () => (
  <Canvas>
    <img
      src={tradingPersonaWheel}
      alt="16 型交易人格輪盤：左上短線靈活決策、右上短線系統化、左下長線系統化、右下長線靈活決策，各含四種人格"
      style={{
        position: 'absolute',
        left: 112,
        top: 110,
        width: 850,
        height: 850,
        objectFit: 'contain',
      }}
    />
    <div style={{ position: 'absolute', left: 1040, top: 100, width: 768 }}>
      <Label color={c.copper}>05 / TRADING PERSONA WHEEL</Label>
      <h2 style={{ fontSize: 72, fontWeight: 750, lineHeight: 1.2, margin: '26px 0 24px' }}>
        16 型交易人格
      </h2>
      <Body style={{ color: c.muted, fontSize: 32 }}>
        先看交易週期與決策方式，
        <br />
        再理解四個象限中的人格。
      </Body>
      <div style={{ marginTop: 40, borderTop: `1px solid ${c.line}` }}>
        <div style={{ padding: '14px 0', borderBottom: `1px solid ${c.line}` }}>
          <div style={{ fontSize: 33, fontWeight: 650, lineHeight: 1.2, color: '#997022' }}>
            左上 / 短線・靈活決策
          </div>
          <Body style={{ fontSize: 30, color: c.muted, marginTop: 10 }}>
            依當下行情調整，例：追勢衝浪手
          </Body>
        </div>
        <div style={{ padding: '14px 0', borderBottom: `1px solid ${c.line}` }}>
          <div style={{ fontSize: 33, fontWeight: 650, lineHeight: 1.2, color: '#705091' }}>
            右上 / 短線・系統化
          </div>
          <Body style={{ fontSize: 30, color: c.muted, marginTop: 10 }}>
            依明確訊號決策，例：突破規則手
          </Body>
        </div>
        <div style={{ padding: '14px 0', borderBottom: `1px solid ${c.line}` }}>
          <div style={{ fontSize: 33, fontWeight: 650, lineHeight: 1.2, color: '#497448' }}>
            左下 / 長線・系統化
          </div>
          <Body style={{ fontSize: 30, color: c.muted, marginTop: 10 }}>
            依配置規則管理，例：系統價值配置師
          </Body>
        </div>
        <div style={{ padding: '14px 0' }}>
          <div style={{ fontSize: 33, fontWeight: 650, lineHeight: 1.2, color: '#297795' }}>
            右下 / 長線・靈活決策
          </div>
          <Body style={{ fontSize: 30, color: c.muted, marginTop: 10 }}>
            依研究判斷機會，例：價值埋伏者
          </Body>
        </div>
      </div>
      <div style={{ marginTop: 12, color: c.muted, fontSize: 24, lineHeight: 1.4 }}>
        分類依提供的輪盤；特質說明為概念示意。
      </div>
    </div>
  </Canvas>
);

const TraderNeed: Page = () => (
  <Frame
    travis
    section="05 / THE TRADER"
    title="小美的實際與期望交易人格"
    lead="同樣做短線交易，小美希望保留對趨勢的敏感度，同時建立明確規則。"
    note="小美為虛構案例；人格名稱與象限取自輪盤，行為描述與目標選擇為示意，無優劣排序。"
  >
    <div style={{ ...split, marginTop: 46 }}>
      <div style={{ borderTop: '3px solid var(--osd-accent)', paddingTop: 32 }}>
        <Label>實際交易人格 / 行為觀測示意</Label>
        <h3 style={{ fontSize: 62, fontWeight: 650, margin: '30px 0 16px' }}>追勢衝浪手</h3>
        <Body style={{ fontSize: 30, color: '#997022' }}>輪盤左上 / 短線・靈活決策</Body>
        <div style={{ fontSize: 57, fontWeight: 650, lineHeight: 1.45, marginTop: 40 }}>
          「行情動了，
          <br />
          我就想跟上。」
        </div>
        <Body style={{ color: c.muted, marginTop: 32, fontSize: 32 }}>
          追著走勢進場，容易臨時改變計畫。
        </Body>
      </div>
      <div style={{ borderTop: `3px solid ${c.copper}`, paddingTop: 32 }}>
        <Label color={c.copper}>期望交易人格 / 小美自行選定</Label>
        <h3 style={{ fontSize: 62, fontWeight: 650, margin: '30px 0 16px' }}>突破規則手</h3>
        <Body style={{ fontSize: 30, color: '#705091' }}>輪盤右上 / 短線・系統化</Body>
        <div style={{ fontSize: 57, fontWeight: 650, lineHeight: 1.45, marginTop: 40 }}>
          「條件符合，
          <br />
          我才做交易決定。」
        </div>
        <Body style={{ color: c.muted, marginTop: 32, fontSize: 32 }}>
          事先訂好條件，按規則執行與回顧。
        </Body>
      </div>
    </div>
  </Frame>
);

const ExpectedPersonality: Page = () => (
  <Frame
    travis
    section="05 / EXPECTED PERSONALITY"
    title="兩種入口，選定期待的人格"
    lead="交易者先建立目標，作為後續行為對照與引導的依據。"
    note="概念示意；人格類型、測驗題目與呈現方式仍在設計。"
  >
    <div style={{ ...split, marginTop: 20 }}>
      <Point accent={c.copper} number="A / 自行選擇" title="閱讀特質說明">
        了解各種人格的特質，
        <br />
        選擇希望靠近的目標。
      </Point>
      <Point accent={c.copper} number="B / 測驗協助" title="進行簡短人格測驗">
        透過簡短測驗，
        <br />
        協助選定期待的人格。
      </Point>
    </div>
    <div
      style={{
        marginTop: 70,
        background: c.copperSoft,
        padding: '32px 40px',
        display: 'grid',
        gridTemplateColumns: '330px 1fr',
        gap: 44,
        alignItems: 'center',
      }}
    >
      <Label color={c.copper}>小美的期待人格 / 示意</Label>
      <div style={{ fontSize: 45, fontWeight: 650 }}>突破規則手：先訂條件，再做決定</div>
    </div>
  </Frame>
);

const GapComparison: Page = () => (
  <Frame
    travis
    section="05 / FEATURE 01"
    title="兩種人格的行為差異"
    lead="以小美的短線交易為例，把人格差距拆成可觀察的行為。"
    note="以下為虛構案例的行為對照，非人格診斷或實際評分；期望人格由使用者自行確認。"
  >
    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 22, textAlign: 'left' }}>
      <thead>
        <tr>
          <th style={{ width: 260, padding: '0 0 30px', fontWeight: 500 }}>
            <Label color={c.muted}>對照面向</Label>
          </th>
          <th style={{ width: 720, padding: '0 36px 30px 0', fontWeight: 500 }}>
            <Label>實際 / 追勢衝浪手</Label>
          </th>
          <th style={{ padding: '0 0 30px', fontWeight: 500 }}>
            <Label color={c.copper}>期望 / 突破規則手</Label>
          </th>
        </tr>
      </thead>
      <tbody style={{ fontSize: 34, lineHeight: 1.55 }}>
        <tr style={{ borderTop: `1px solid ${c.line}` }}>
          <th style={{ padding: '30px 0', fontWeight: 650 }}>進場依據</th>
          <td style={{ padding: '30px 36px 30px 0', color: c.muted }}>看到走勢加速，就想跟進</td>
          <td style={{ padding: '30px 0' }}>等預設突破條件符合才進場</td>
        </tr>
        <tr style={{ borderTop: `1px solid ${c.line}` }}>
          <th style={{ padding: '30px 0', fontWeight: 650 }}>計畫變動</th>
          <td style={{ padding: '30px 36px 30px 0', color: c.muted }}>隨短期波動，臨時改變計畫</td>
          <td style={{ padding: '30px 0' }}>依預設退出條件或調整規則決定</td>
        </tr>
        <tr style={{ borderTop: `1px solid ${c.line}`, borderBottom: `1px solid ${c.line}` }}>
          <th style={{ padding: '30px 0', fontWeight: 650 }}>交易回顧</th>
          <td style={{ padding: '30px 36px 30px 0', color: c.muted }}>
            先看結果，較少記錄決策理由
          </td>
          <td style={{ padding: '30px 0' }}>回看是否遵守條件與變更理由</td>
        </tr>
      </tbody>
    </table>
    <Body style={{ color: c.copper, fontSize: 36, marginTop: 44 }}>
      引導重點：保留對趨勢的敏感度，增加條件確認與決策紀錄。
    </Body>
  </Frame>
);

const BehaviorGuidance: Page = () => (
  <Frame
    travis
    section="05 / FEATURE 02"
    title="Travis 如何引導小美靠近期望人格"
    lead="把「突破規則手」的期望，落在每次交易前、決策當下與交易後。"
    note="流程與提示為產品概念示意；介入規則與效果仍待驗證，最終決定由使用者做出。"
  >
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 56, marginTop: 22 }}>
      <Point accent={c.copper} number="01 / 交易前" title="把期望寫成條件">
        協助小美記下進場條件
        <br />
        與退出規則，建立對照依據。
      </Point>
      <Point accent={c.copper} number="02 / 決策當下" title="提醒確認原定計畫">
        想追價或臨時改計畫時，
        <br />
        提醒先核對條件與理由。
      </Point>
      <Point accent={c.copper} number="03 / 交易後" title="回顧行為是否靠近">
        對照原定條件與實際操作，
        <br />
        回看偏離原因與規則遵守情況。
      </Point>
    </div>
    <div
      style={{
        borderLeft: `5px solid ${c.copper}`,
        background: c.copperSoft,
        marginTop: 46,
        padding: '26px 36px',
      }}
    >
      <Label color={c.copper}>決策當下 / 提示示意</Label>
      <div style={{ fontSize: 37, fontWeight: 600, lineHeight: 1.45, marginTop: 16 }}>
        「這次進場符合你設定的突破條件嗎？若要調整計畫，先記下理由。」
      </div>
      <Body style={{ fontSize: 30, color: c.muted, marginTop: 16 }}>
        回顧時關注條件是否符合、是否記錄理由，讓每次調整都有跡可循。
      </Body>
    </div>
  </Frame>
);

const PersonalityProgress: Page = () => (
  <Frame
    travis
    section="05 / DESIGN PROGRESS"
    title="人格設計：架構原則與待收斂項目"
    lead="沿用既有人格設計基礎，持續收斂可供產品使用的定義。"
    note="既有自評與行為觀測的資料原則，與本次新增說明的「期待人格」目標需分開理解。"
  >
    <div style={{ ...split, marginTop: 18 }}>
      <div>
        <Label color={c.copper}>已確認的設計原則</Label>
        <div style={{ marginTop: 30, borderTop: `1px solid ${c.line}` }}>
          <div style={{ padding: '24px 0', fontSize: 33, borderBottom: `1px solid ${c.line}` }}>
            自評與行為觀測分開保存
          </div>
          <div style={{ padding: '24px 0', fontSize: 33, borderBottom: `1px solid ${c.line}` }}>
            人格傾向與判斷信心分離
          </div>
          <div style={{ padding: '24px 0', fontSize: 33, borderBottom: `1px solid ${c.line}` }}>
            資料不足時，保留未知
          </div>
        </div>
      </div>
      <div>
        <Label color={c.muted}>仍在收斂的設計</Label>
        <div style={{ marginTop: 30, borderTop: `1px solid ${c.line}` }}>
          <div style={{ padding: '24px 0', fontSize: 33, borderBottom: `1px solid ${c.line}` }}>
            四大面向、兩端特質與人格因子
          </div>
          <div style={{ padding: '24px 0', fontSize: 33, borderBottom: `1px solid ${c.line}` }}>
            題目、權重與人格更新規則
          </div>
          <div style={{ padding: '24px 0', fontSize: 33, borderBottom: `1px solid ${c.line}` }}>
            差距呈現與行為引導方式
          </div>
        </div>
      </div>
    </div>
    <div style={{ marginTop: 50, fontSize: 36, color: c.copper }}>
      目前重點：讓人格的定義與使用方式逐步收斂。
    </div>
  </Frame>
);

const AcademicCooperation: Page = () => (
  <Frame
    travis
    section="05 / ACADEMIC COLLABORATION"
    title="學術合作洽談中"
    lead="陽明交通大學吳信龍教授代表系所，從學術研究角度討論合作。"
  >
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 64, marginTop: 54 }}>
      <Point accent={c.copper} number="01 / 研究需求" title="可用於模型研究的資料">
        教授期待團隊提供一筆資料，
        <br />
        用於機器學習或深度學習。
      </Point>
      <Point accent={c.copper} number="02 / 目前限制" title="資料取得有難度">
        對方要求的資料，
        <br />
        目前對團隊而言較難取得。
      </Point>
      <Point accent={c.copper} number="03 / 持續討論" title="協調可行的合作方式">
        持續對齊研究需求
        <br />
        與團隊可提供的資料。
      </Point>
    </div>
    <div
      style={{
        borderTop: `1px solid ${c.line}`,
        marginTop: 90,
        paddingTop: 30,
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <Label color={c.copper}>目前狀態</Label>
      <Body>資料方案與合作分工仍在洽談。</Body>
    </div>
  </Frame>
);

const PatentAndCiti: Page = () => (
  <Frame
    travis
    section="05 / PATENT & CITI"
    title="以兩項特色，展開申請與企劃"
    lead="專利申請與 CITI 企劃書，共用清楚的產品核心。"
    note="CITI：台北市產業發展獎勵補助計畫。此頁呈現準備方向，非送件或核准成果。"
  >
    <div style={{ ...split, marginTop: 12 }}>
      <Point accent={c.copper} number="核心特色 01" title="差距呈現">
        比較行為指向的人格
        <br />
        與交易者期待的人格。
      </Point>
      <Point accent={c.copper} number="核心特色 02" title="行為重新導向">
        協助與提示交易者，
        <br />
        逐步靠近期待的人格。
      </Point>
    </div>
    <div style={{ ...split, marginTop: 65, paddingTop: 30, borderTop: `1px solid ${c.line}` }}>
      <div>
        <Label color={c.copper}>專利申請</Label>
        <Body style={{ marginTop: 20 }}>以兩項特色整理申請內容。</Body>
      </div>
      <div>
        <Label color={c.copper}>CITI 企劃書</Label>
        <Body style={{ marginTop: 20 }}>以兩項特色說明產品與研發方向。</Body>
      </div>
    </div>
  </Frame>
);

const Gate = ({
  number,
  title,
  criterion,
}: {
  number: string;
  title: string;
  criterion: string;
}) => (
  <div
    style={{
      height: 138,
      display: 'grid',
      gridTemplateColumns: '80px 245px 1fr',
      alignItems: 'center',
      gap: 24,
      borderTop: `1px solid ${c.line}`,
    }}
  >
    <Label color={c.copper}>{number}</Label>
    <div style={{ fontSize: 37, fontWeight: 650 }}>{title}</div>
    <Body style={{ fontSize: 32, color: c.muted }}>{criterion}</Body>
  </div>
);

const DevelopmentGates: Page = () => (
  <Frame
    travis
    section="05 / DEVELOPMENT GATES"
    title="三項條件完成後，進入產品開發"
    lead="以明確里程碑推進；CITI 的評審結果是開發前置條件之一。"
    note="依條件推進，暫不綁定開發啟動日期。"
  >
    <div style={{ position: 'relative', marginTop: 56, height: 430 }}>
      <div style={{ width: 1070 }}>
        <Gate number="01" title="人格設計" criterion="完成人格設計" />
        <Gate number="02" title="專利申請" criterion="完成送件" />
        <Gate number="03" title="CITI" criterion="送件、召開評審會議並通過" />
      </div>
      <svg
        width="210"
        height="414"
        viewBox="0 0 210 414"
        aria-hidden="true"
        style={{ position: 'absolute', left: 1080, top: 0 }}
      >
        <path
          d="M 0 69 H 70 V 207 H 204 M 0 207 H 70 M 0 345 H 70 V 207"
          stroke={c.copper}
          strokeWidth="3"
          fill="none"
        />
        <path d="M 192 198 L 204 207 L 192 216" stroke={c.copper} strokeWidth="3" fill="none" />
      </svg>
      <div
        style={{
          position: 'absolute',
          right: 0,
          top: 114,
          width: 355,
          borderLeft: `4px solid ${c.copper}`,
          padding: '20px 0 20px 36px',
        }}
      >
        <Label color={c.copper}>三項皆完成</Label>
        <div style={{ fontSize: 56, fontWeight: 650, lineHeight: 1.25, marginTop: 24 }}>
          產品開發
        </div>
      </div>
    </div>
  </Frame>
);

const Milestone = ({
  name,
  current,
  next,
  accent = 'var(--osd-accent)',
}: {
  name: string;
  current: string;
  next: string;
  accent?: string;
}) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: '420px 490px 1fr',
      gap: 40,
      borderTop: `1px solid ${c.line}`,
      minHeight: 102,
      alignItems: 'center',
    }}
  >
    <div style={{ fontSize: 35, fontWeight: 650 }}>{name}</div>
    <div style={{ fontSize: 31, color: c.muted }}>{current}</div>
    <div style={{ fontSize: 31, color: accent }}>{next}</div>
  </div>
);

const NextMilestones: Page = () => (
  <Frame
    section="06 / NEXT MILESTONES"
    title="下一階段，依里程碑持續推進"
    lead="沿用團隊日常更新節奏，聚焦每項產品接下來的工作。"
    note="此頁為下一階段工作方向，非固定日期的交付承諾。"
  >
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '420px 490px 1fr',
        gap: 40,
        paddingBottom: 24,
      }}
    >
      <Label>產品</Label>
      <Label color={c.muted}>目前位置</Label>
      <Label>下一個里程碑</Label>
    </div>
    <Milestone name="AI 晨報" current="Rework 規劃" next="資料、影片收集與定期抓取" />
    <Milestone
      name="金融 DB / 數據"
      current="既有來源持續支援"
      next="FactSet、Finlab 與活動影片擴充"
    />
    <Milestone name="金融 DB / 研報" current="上雲任務執行中" next="完成上雲，再擴充國內外研報" />
    <Milestone name="AI 股票交易機器人" current="開始串接富邦 API" next="持續推進串接工作" />
    <Milestone
      name="Travis AI"
      current="人格設計與開發前準備"
      next="人格設計、專利送件、CITI 評審通過"
      accent={c.copper}
    />
  </Frame>
);

const Closing: Page = () => (
  <Canvas dark>
    <div style={{ padding: '96px 112px 0' }}>
      <Label color={c.lightCopper}>2026 Q3 / DISCUSSION</Label>
      <h2
        style={{
          fontSize: 104,
          fontFamily: 'var(--osd-font-display)',
          fontWeight: 600,
          lineHeight: 1.25,
          letterSpacing: '-0.04em',
          margin: '78px 0 0',
        }}
      >
        既有產品持續推進
        <br />
        Travis AI 聚焦開發前準備
      </h2>
      <div style={{ ...split, marginTop: 90 }}>
        <div style={{ borderTop: `1px solid ${c.darkLine}`, paddingTop: 28 }}>
          <Label color={c.darkMuted}>既有產品</Label>
          <Body style={{ fontSize: 34, marginTop: 24 }}>
            晨報事件體驗與資料收集
            <br />
            數據來源擴充、研報上雲與內容擴充
            <br />
            富邦 API 串接
          </Body>
        </div>
        <div style={{ borderTop: `1px solid ${c.darkLine}`, paddingTop: 28 }}>
          <Label color={c.lightCopper}>TRAVIS AI</Label>
          <Body style={{ fontSize: 34, marginTop: 24 }}>
            呈現人格差距、協助行為調整
            <br />
            推進設計、申請與學術合作洽談
          </Body>
        </div>
      </div>
      <div style={{ marginTop: 64, color: c.lightCopper, fontSize: 30 }}>
        討論：下一階段的優先順序與可協助的資料來源
      </div>
    </div>
  </Canvas>
);

export const notes: (string | undefined)[] = [
  '建議 0:45。今天回顧第三季團隊的產品進展，也說明接下來的規劃。既有產品會快速同步，後半段聚焦 Travis AI。它目前仍在人格設計階段，接下來會說明產品特色與開發前需要完成的準備。',
  '建議 1:30。四項產品各自位於不同階段。晨報正在規劃新的事件研究體驗；金融 DB 分成數據 DB 與研報 DB，前者擴充資料來源，後者正在上雲，之後將擴充國內外研報；交易機器人的方向延續，開始串接富邦 API；Travis 則專注人格設計、專利與 CITI 準備。團隊平常已持續更新進度，這裡聚焦方向與下一步。',
  '建議 1:45，包含 75 秒影片。先播放 AI 晨報操作示範，影片自帶繁體中文字幕與音訊。晨報已經具備閱讀、收聽與問答的基礎，這些功能會保留。影片播放完後，接著介紹 rework 規劃中的事件研究體驗。',
  '建議 1:45。這是一張規劃示意。以 A 公司的法說會為例，使用者可以先在日曆知道活動即將發生，之後也可以在股價走勢上找到活動時間，回看資訊與影片。FED、IPO 等事件也能用類似方式呈現。事件與價格的時間對照提供研究脈絡，這裡沒有把價格變動直接歸因於單一活動。',
  '建議 1:00。Rework 已有初步發想，接下來會進到實作。第一步是資料與影片收集，以及定期抓取機制。先讓內容能持續累積，再支援日曆與走勢介面。既有的閱讀、收聽與問答功能仍保留。',
  '建議 1:00。金融 DB 由數據 DB 與研報 DB 組成。數據 DB 處理行情、標的、日曆與宏觀等市場資料，支援圖表、報告與 AI 查詢。研報 DB 則整理 PDF、Word 等報告，讓內容可以被搜尋、追問並追溯原文。兩條路線的重點不同：數據 DB 擴充來源與事件內容，研報 DB 目前正在上雲，之後擴充更完整的國內外研報。',
  '建議 1:00。數據 DB 既有來源包含 Twelve Data、Shioaji 與 Finlab。接下來要導入 FactSet，擴充 Finlab 的資料範圍，也收集晨報規劃中的法說會、FED、IPO 等活動資料與影片，建立定期抓取機制。這些擴充支援研究及晨報的日曆與走勢事件入口，並非已完成導入的成果。',
  '建議 1:15。研報 DB 目前正在執行上雲任務，把既有研報資料庫部署到雲端，作為後續服務與內容擴充的基礎。之後的目標是擴充更完整的國內外研究報告。既有 FinDB 簡報已介紹抽取文字、語意標籤、檢索與帶引用問答，讓使用者能搜尋、追問並回到原始報告。這次的更新重點是上雲與後續內容擴充，不宣稱已完成上雲，也不先承諾特定研報來源或數量。',
  '建議 1:00。交易機器人的方向維持一致，本次主要是進度推進，開始串接富邦 API。左邊是既有工作台，用來交代產品基礎。本次不額外展開介面或串接技術細節。',
  '建議 0:45。接下來是本次的重點 Travis AI。它是人格驅動的交易助理，兩項主要特色分別是呈現人格差距，以及協助交易者調整行為。專案目前仍在人格設計階段。',
  '建議 1:30。輪盤圖由使用者提供，資產為 assets/trading-persona-wheel.png。先看兩組分類：短線與長線，以及靈活決策與系統化。四個象限各有四種人格。輪盤名稱與分組依提供圖片，旁邊的特質說明是概念解讀。接下來挑左上的追勢衝浪手與右上的突破規則手，兩者都做短線，差別集中在決策方式。輪盤是理解風格的入口，不代表人格高低或驗證完成的分類。',
  '建議 1:30。小美是虛構案例。實際交易人格由行為觀測推估，這裡示意為追勢衝浪手，看見走勢加速就想跟進。期望交易人格由小美自行選定，這裡是突破規則手，她希望保留對趨勢的敏感度，同時先確認條件再決定。名稱與象限沿用輪盤，個別行為描述是案例設定，並非所有該類型的人都如此。期望方向由小美決定，不表示系統化人格優於靈活人格。',
  '建議 1:30。期待人格有兩種選定方式。一種是看過特質說明後自行選擇，另一種是透過簡短人格測驗協助選定。延續小美的例子，她選擇突破規則手，希望先訂條件再做交易決定。測驗只協助探索，最後由她確認期望目標。期待人格是她想靠近的目標，與她目前如何評價自己需要分開理解。',
  '建議 2:00。第一個特色是差距呈現。從進場依據、計畫變動與交易回顧對照兩種人格。小美現在容易看到行情就想進場，遇到波動就改計畫，回顧時先看結果。她期望先確認突破條件，依退出或調整規則決定，事後檢查條件遵守情況與理由。這些是虛構案例的可觀察行為，沒有實際評分或人格診斷。引導重點是保留對趨勢的敏感度，逐步增加條件確認與決策紀錄。',
  '建議 2:00。第二個特色是行為重新導向。交易前，把小美的期望人格轉成她自己確認的進場條件與退出規則。決策當下，如果她想追價或臨時改計畫，Travis 提醒核對條件，若要變更則記下理由。交易後，對照原定條件與實際操作，回看偏離原因，觀察規則遵守情況與決策理由紀錄，作為下次調整的依據。這是產品概念，觸發方式與改善成效尚待驗證；不提供具體交易參數，也不把盈虧當成人格改善的證明。最終仍由小美決定。',
  '建議 1:45。現有人格設計已確認幾項資料原則，包括分開保存自評與行為觀測，分離人格傾向與判斷信心，以及在資料不足時保留未知。四大面向、因子、題目與更新規則仍在收斂。這些既有自評資料與本次說明的期待人格目標需分開，後續再銜接到差距呈現與引導方式。',
  '建議 1:45。吳信龍教授是代表系所，從學術單位的角度與我們討論合作。教授期待取得一筆可用於機器學習或深度學習的資料，但對方要求的資料目前對團隊而言較難取得。因此合作仍在洽談，我們持續討論研究需求與可提供資料之間的可行方案，分工也尚未定案。',
  '建議 1:30。專利申請與 CITI 企劃書會以這兩項特色為主軸。差距呈現說明如何比對行為人格與期待人格，行為重新導向則說明如何協助交易者靠近目標。這裡呈現準備方向，不表示已送件或取得核准。CITI 指台北市產業發展獎勵補助計畫。',
  '建議 1:30。開發前有三項條件。人格設計要完成，專利以送件為完成，CITI 則需要送件、召開評審會議並通過。三項條件都完成後才進入產品開發，因此目前用里程碑表達，而不先承諾一個固定開發日期。',
  '建議 1:15。下一階段，晨報從收集與抓取開始。金融 DB 分兩條線推進：數據 DB 擴充 FactSet、Finlab 與活動內容；研報 DB 完成上雲後，擴充國內外研報。交易機器人推進富邦串接。Travis 則聚焦人格設計與兩項申請準備，並持續協調學術合作資料方案。延續團隊平時的更新節奏，依里程碑檢視進展。',
  '建議 1:00。第三季回顧的重點，是既有產品持續推進，同時把 Travis 的產品核心與開發前準備整理清楚。金融 DB 同時推進數據來源擴充，以及研報上雲與國內外內容擴充。Travis 的核心是看見差距、協助調整。接下來可以討論各項工作的優先順序，以及是否有可協助學術研究的資料來源。',
];

export const meta: SlideMeta = {
  title: '2026 第三季｜團隊成果與產品規劃',
  createdAt: '2026-10-04T08:18:12.261Z',
};

export default [
  Cover,
  Portfolio,
  MorningFoundation,
  EventExperience,
  MorningImplementation,
  DatabaseFoundation,
  DatabaseExpansion,
  ResearchDatabaseExpansion,
  TradingProgress,
  TravisIntro,
  PersonalityWheel,
  TraderNeed,
  ExpectedPersonality,
  GapComparison,
  BehaviorGuidance,
  PersonalityProgress,
  AcademicCooperation,
  PatentAndCiti,
  DevelopmentGates,
  NextMilestones,
  Closing,
] satisfies Page[];

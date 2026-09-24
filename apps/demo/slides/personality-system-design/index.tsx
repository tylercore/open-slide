import type { CSSProperties, ReactNode } from "react";
import { useSlidePageNumber } from "@open-slide/core";
import type { DesignSystem, Page, SlideMeta } from "@open-slide/core";

/**
 * 進度同步文件：依 travis-ai-16-personality-progress.md 重構（2026-09-18）。
 * 已確認：雙軌分數、關鍵題與權重解耦、信心獨立保存、隱藏指標不計入人格。
 * 未定案：A–D 命名與兩端、題庫規模、權重、預填門檻、Gap 展示與人格更新規則。
 * 數字案例僅為機制示意；下一步為建議工作順序，非已排定時程。
 * 閱讀結構更新：MBTI 僅示範 16 型組合；計分層級另頁解說，前置流程以圖呈現。
 * 非技術團隊版：第 8–12 頁說明三版本、差異、因子驗證、資料取得與總結。
 * Initial 僅保留於關鍵題；Gap 範例非驗證結果或已定案因子。
 * 依使用者補充：計劃與學術單位合作；資料初步評估產學合作、購買與自願者問卷。
 * 驗證步驟與各資料來源的運用為討論方向，不表示合作已成立或資料已取得。
 */
export const design: DesignSystem = {
  palette: { bg: "#F4F1E8", text: "#183238", accent: "#6E9F3C" },
  fonts: {
    display: '"Arial Narrow", "PingFang TC", "Noto Sans TC", sans-serif',
    body: '-apple-system, BlinkMacSystemFont, "PingFang TC", "Noto Sans TC", sans-serif',
  },
  typeScale: { hero: 150, body: 36 },
  radius: 0,
};

const panel = "#FFFEFA";
const muted = "#647575";
const line = "#D4DCD6";
const green = "#527C2D";
const teal = "#16817F";
const amber = "#A46A23";
const coral = "#B9574E";
const mono: CSSProperties = { fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" };
const columns: CSSProperties = { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40 };

const Label = ({ children, color = green }: { children: ReactNode; color?: string }) => (
  <div style={{ ...mono, color, fontSize: 23, fontWeight: 700, letterSpacing: "0.08em" }}>
    {children}
  </div>
);

const Footer = () => {
  const { current, total } = useSlidePageNumber();
  return (
    <div
      style={{
        position: "absolute",
        left: 112,
        right: 112,
        bottom: 42,
        display: "flex",
        justifyContent: "space-between",
        fontSize: 21,
        color: muted,
        ...mono,
      }}
    >
      <span>TRAVIS AI / DESIGN PROGRESS</span>
      <span>
        {String(current).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </span>
    </div>
  );
};

const Frame = ({
  section,
  title,
  children,
  note = "系統設計中",
}: {
  section: string;
  title: string;
  children: ReactNode;
  note?: string;
}) => (
  <div
    style={{
      width: "100%",
      height: "100%",
      boxSizing: "border-box",
      position: "relative",
      padding: "100px 112px",
      color: "var(--osd-text)",
      background: "var(--osd-bg)",
      fontFamily: "var(--osd-font-body)",
    }}
  >
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <Label>{section}</Label>
      <Label color={amber}>{note}</Label>
    </div>
    <h1
      style={{
        fontFamily: "var(--osd-font-display)",
        fontSize: 70,
        lineHeight: 1.2,
        fontWeight: 800,
        letterSpacing: "-0.035em",
        margin: "24px 0 52px",
      }}
    >
      {title}
    </h1>
    {children}
    <Footer />
  </div>
);

const Card = ({
  label,
  title,
  children,
  color = green,
}: {
  label: string;
  title: string;
  children: ReactNode;
  color?: string;
}) => (
  <div
    style={{
      background: panel,
      borderTop: `5px solid ${color}`,
      padding: "36px 40px",
      boxSizing: "border-box",
    }}
  >
    <Label color={color}>{label}</Label>
    <h2 style={{ fontSize: 42, lineHeight: 1.3, margin: "22px 0 24px", fontWeight: 800 }}>
      {title}
    </h2>
    <div style={{ color: muted, fontSize: 32, lineHeight: 1.65 }}>{children}</div>
  </div>
);

const Note = ({ children, color = teal }: { children: ReactNode; color?: string }) => (
  <div
    style={{
      marginTop: 36,
      padding: "24px 32px",
      borderLeft: `5px solid ${color}`,
      background: "#E9EEE6",
      fontSize: 30,
      lineHeight: 1.5,
    }}
  >
    {children}
  </div>
);

const Row = ({
  code,
  title,
  children,
  color = green,
}: {
  code: string;
  title: string;
  children: ReactNode;
  color?: string;
}) => (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "150px 340px 1fr",
      gap: 28,
      alignItems: "center",
      minHeight: 142,
      borderTop: `1px solid ${line}`,
    }}
  >
    <Label color={color}>{code}</Label>
    <div style={{ fontSize: 34, fontWeight: 750 }}>{title}</div>
    <div style={{ color: muted, fontSize: 30, lineHeight: 1.5 }}>{children}</div>
  </div>
);

const FlowNode = ({
  left,
  top = 0,
  width = 376,
  label,
  title,
  children,
  color = teal,
}: {
  left: number;
  top?: number;
  width?: number;
  label: string;
  title: string;
  children: ReactNode;
  color?: string;
}) => (
  <div
    style={{
      position: "absolute",
      left,
      top,
      width,
      boxSizing: "border-box",
      background: panel,
      borderTop: `5px solid ${color}`,
      padding: "28px 30px",
    }}
  >
    <Label color={color}>{label}</Label>
    <div style={{ fontSize: 34, fontWeight: 800, margin: "18px 0", lineHeight: 1.3 }}>{title}</div>
    <div style={{ fontSize: 28, lineHeight: 1.6, color: muted }}>{children}</div>
  </div>
);

const PreferencePair = ({
  pair,
  meaning,
  selected,
  color,
}: {
  pair: string;
  meaning: string;
  selected: string;
  color: string;
}) => (
  <div style={{ background: panel, borderTop: `5px solid ${color}`, padding: "28px 32px" }}>
    <Label color={color}>{meaning}</Label>
    <div style={{ ...mono, fontSize: 62, fontWeight: 750, margin: "22px 0" }}>{pair}</div>
    <div style={{ fontSize: 28, color: muted }}>
      例如為 <strong style={{ color, fontSize: 36 }}>{selected}</strong>
    </div>
  </div>
);

const Cover: Page = () => (
  <div
    style={{
      width: "100%",
      height: "100%",
      boxSizing: "border-box",
      position: "relative",
      padding: "112px",
      fontFamily: "var(--osd-font-body)",
      background: "var(--osd-bg)",
      color: "var(--osd-text)",
    }}
  >
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <Label>TRAVIS AI / PRODUCT & MODEL</Label>
      <Label color={amber}>設計進度同步</Label>
    </div>
    <div style={{ marginTop: 130 }}>
      <h1
        style={{
          fontFamily: "var(--osd-font-display)",
          fontSize: "var(--osd-size-hero)",
          letterSpacing: "-0.045em",
          lineHeight: 1.1,
          margin: 0,
        }}
      >
        16 交易人格
      </h1>
      <div style={{ fontSize: 66, fontWeight: 700, marginTop: 30 }}>從自我認知，走向行為對照</div>
      <p style={{ fontSize: 36, color: muted, lineHeight: 1.6, marginTop: 40 }}>
        四個公開面向 × 雙軌人格分數 × 持續行為觀測
      </p>
    </div>
    <div
      style={{
        position: "absolute",
        left: 112,
        bottom: 154,
        borderTop: `1px solid ${line}`,
        paddingTop: 28,
        width: 1696,
        fontSize: 28,
        color: amber,
      }}
    >
      流程與模型原則已確認；四大面向仍在定義與收斂中。
    </div>
    <Footer />
  </div>
);

const Status: Page = () => (
  <Frame section="01 / CURRENT STATE" title="架構已成形，面向仍待收斂">
    <Row code="已確認" title="產品定位">
      自我探索、行為對照、偏離觀測、決策改善
    </Row>
    <Row code="已確認" title="評分與資料原則">
      User / Observed 平行保存，信心與傾向分離
    </Row>
    <Row code="候選方向" title="四大公開面向" color={amber}>
      A–D 的命名、兩端與納入因子尚未定案
    </Row>
    <Row code="待討論" title="題庫與結果呈現" color={coral}>
      題數、權重、預填門檻、Gap 與人格更新規則
    </Row>
  </Frame>
);

const Purpose: Page = () => (
  <Frame section="02 / PRODUCT PURPOSE" title="以人格為起點，改善交易決策">
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 30 }}>
      <Card label="01 / SELF EXPLORATION" title="我是怎樣的交易者？">
        保留使用者對自己的原始認知。
      </Card>
      <Card label="02 / BEHAVIOR COMPARISON" title="實際行為如何？" color={teal}>
        用交易證據對照自我定位。
      </Card>
      <Card label="03 / DEVIATION" title="最近是否偏離習慣？" color={amber}>
        觀察短、中、長期的行為變化。
      </Card>
      <Card label="04 / DECISION GUIDANCE" title="我想成為怎樣的交易者？" color={coral}>
        依目標改善決策方式，非特定標的推薦。
      </Card>
    </div>
  </Frame>
);

const Architecture: Page = () => (
  <Frame
    section="03 / 16 PERSONALITY TYPES"
    title="像 MBTI 一樣，四組兩端形成 16 型"
    note="以 MBTI 示範組合方式"
  >
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 28 }}>
      <PreferencePair pair="E / I" meaning="外向 / 內向" selected="I" color={green} />
      <PreferencePair pair="S / N" meaning="實感 / 直覺" selected="N" color={teal} />
      <PreferencePair pair="T / F" meaning="思考 / 情感" selected="T" color={amber} />
      <PreferencePair pair="J / P" meaning="判斷 / 感知" selected="J" color={coral} />
    </div>
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "40px 0",
        borderBottom: `1px solid ${line}`,
      }}
    >
      <div>
        <Label>每組取一端</Label>
        <div style={{ ...mono, fontSize: 64, marginTop: 16 }}>
          2 × 2 × 2 × 2 = <strong style={{ color: teal }}>16</strong>
        </div>
      </div>
      <div style={{ textAlign: "right" }}>
        <Label color={teal}>組合示例</Label>
        <div style={{ ...mono, fontSize: 76, fontWeight: 800, color: teal, marginTop: 12 }}>
          INTJ
        </div>
      </div>
    </div>
    <Note>Travis 也用四個面向的兩端形成 16 型；面向內容另行定義，不直接套用 MBTI。</Note>
  </Frame>
);

const ScoringLayers: Page = () => (
  <Frame
    section="03 / SCORING STRUCTURE"
    title="題目形成因子，因子構成面向"
    note="結構示意 · 非定案題庫"
  >
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "440px 100px 440px 100px 1fr",
        alignItems: "center",
        marginTop: 64,
      }}
    >
      <div>
        <Label>01 / 題目</Label>
        <div
          style={{
            background: panel,
            padding: "26px 32px",
            marginTop: 28,
            fontSize: 34,
            lineHeight: 1.8,
          }}
        >
          題目 1 ＋ 題目 2<br />
          <span style={{ fontSize: 27, color: muted }}>提供一組行為線索</span>
        </div>
        <div
          style={{
            background: panel,
            padding: "26px 32px",
            marginTop: 24,
            fontSize: 34,
            lineHeight: 1.8,
          }}
        >
          題目 3 ＋ 題目 4<br />
          <span style={{ fontSize: 27, color: muted }}>提供另一組行為線索</span>
        </div>
      </div>
      <div
        style={{ color: teal, fontSize: 52, textAlign: "center", lineHeight: 3.6, paddingTop: 48 }}
      >
        →<br />→
      </div>
      <div>
        <Label color={teal}>02 / 人格因子</Label>
        <div
          style={{
            background: panel,
            padding: "26px 32px",
            marginTop: 28,
            fontSize: 34,
            lineHeight: 1.8,
            borderLeft: `5px solid ${teal}`,
          }}
        >
          人格因子 1<br />
          <span style={{ fontSize: 27, color: muted }}>整合一類交易特徵</span>
        </div>
        <div
          style={{
            background: panel,
            padding: "26px 32px",
            marginTop: 24,
            fontSize: 34,
            lineHeight: 1.8,
            borderLeft: `5px solid ${teal}`,
          }}
        >
          人格因子 2<br />
          <span style={{ fontSize: 27, color: muted }}>整合另一類交易特徵</span>
        </div>
      </div>
      <div style={{ color: teal, fontSize: 52, textAlign: "center" }}>→</div>
      <div style={{ padding: 36, background: "#E9EEE6", borderTop: `5px solid ${green}` }}>
        <Label>03 / 公開面向</Label>
        <div style={{ fontSize: 38, fontWeight: 800, marginTop: 24 }}>面向 A</div>
        <div style={{ ...mono, fontSize: 88, color: green, fontWeight: 800, margin: "18px 0" }}>
          +35
        </div>
        <div style={{ fontSize: 28, color: muted, lineHeight: 1.6 }}>
          保留單一連續值
          <br />
          暫以 −100 ～ +100 理解
        </div>
      </div>
    </div>
    <Note>同屬一種人格，傾向強度仍可不同；因子參與計分，隱藏指標另供狀態分析。</Note>
  </Frame>
);

const Onboarding: Page = () => (
  <Frame
    section="04 / ONBOARDING"
    title="先保留自我認知，再揭露交易觀測"
    note="流程已確認 · 題數暫定"
  >
    <div style={{ position: "relative", height: 635 }}>
      <svg
        width="1696"
        height="635"
        viewBox="0 0 1696 635"
        aria-hidden="true"
        style={{ position: "absolute", inset: 0 }}
      >
        <defs>
          <marker
            id="onboarding-arrow"
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="8"
            markerHeight="8"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill={teal} />
          </marker>
        </defs>
        <path
          d="M 376 128 H 430"
          fill="none"
          stroke={teal}
          strokeWidth="3"
          markerEnd="url(#onboarding-arrow)"
        />
        <path
          d="M 816 128 H 870"
          fill="none"
          stroke={teal}
          strokeWidth="3"
          markerEnd="url(#onboarding-arrow)"
        />
        <path
          d="M 1256 128 H 1310"
          fill="none"
          stroke={teal}
          strokeWidth="3"
          markerEnd="url(#onboarding-arrow)"
        />
        <path
          d="M 1508 256 V 316 H 848 V 350 M 848 350 H 428 V 390 M 848 350 H 1268 V 390"
          fill="none"
          stroke={teal}
          strokeWidth="3"
        />
        <path
          d="M 428 375 V 395"
          stroke={teal}
          strokeWidth="3"
          markerEnd="url(#onboarding-arrow)"
        />
        <path
          d="M 1268 375 V 395"
          stroke={teal}
          strokeWidth="3"
          markerEnd="url(#onboarding-arrow)"
        />
      </svg>
      <FlowNode left={0} label="01 / 可略過" title="提供交易資料">
        上傳對帳單或少量資料；
        <br />
        無資料也能完成測驗。
      </FlowNode>
      <FlowNode left={440} label="02 / TRAVIS" title="嘗試自動回答">
        保存觀測答案與信心；
        <br />
        資料不足，允許留空。
      </FlowNode>
      <FlowNode left={880} label="03 / 使用者" title="先回答關鍵題" color={amber}>
        尚不揭露觀測答案，
        <br />
        保留原始自我認知。
      </FlowNode>
      <FlowNode left={1320} label="04 / 揭露與確認" title="確認完整問卷">
        可修改預填、補空白；
        <br />
        關鍵題保留原始回答。
      </FlowNode>
      <div style={{ position: "absolute", left: 0, top: 307 }}>
        <Label>05 / 形成雙軌分數</Label>
      </div>
      <FlowNode
        left={168}
        top={402}
        width={520}
        label="USER SCORE"
        title="使用者確認 → 正式人格"
        color={green}
      >
        以最終確認答案計分。
      </FlowNode>
      <FlowNode
        left={1008}
        top={402}
        width={520}
        label="OBSERVED SCORE"
        title="交易觀測 → 行為對照"
      >
        保留原觀測，不覆蓋正式人格。
      </FlowNode>
    </div>
    <div style={{ fontSize: 25, color: muted, marginTop: 24 }}>
      規模暫定：完整題庫約 40 題，每面向最多約 5 題關鍵題。
    </div>
  </Frame>
);

const KeyQuestions: Page = () => (
  <Frame section="05 / KEY QUESTIONS" title="關鍵題的價值，是保留原始自我認知">
    <div style={columns}>
      <Card label="TIMING" title="何時問，決定是否受影響">
        先回答，再看到 Travis 的判斷。
        <br />
        原始回答獨立保留，供後續比較。
        <div style={{ marginTop: 36, color: teal, fontSize: 38, fontWeight: 750 }}>
          Initial Self → Observed → Confirmed
        </div>
      </Card>
      <Card label="WEIGHT" title="關鍵題 ≠ 高權重題" color={amber}>
        是否為關鍵題：控制提問時機。
        <br />
        人格計分權重：控制分數貢獻。
        <div style={{ marginTop: 36, color: amber, fontSize: 36, fontWeight: 750 }}>
          兩個屬性完全解耦
        </div>
      </Card>
    </div>
    <Note>每題保存 Observed、Confidence、Confirmed；關鍵題另保留 Initial Self。</Note>
  </Frame>
);

const ScoreVersions: Page = () => (
  <Frame section="06 / 三個版本" title="三個版本，保留認知到確認的過程">
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 32, marginTop: 70 }}>
      <Card label="INITIAL / 原始自評" title="我原本怎麼看自己" color={amber}>
        看見系統判斷之前，
        <br />
        先回答關鍵題。
        <div
          style={{
            borderTop: `1px solid ${line}`,
            marginTop: 36,
            paddingTop: 24,
            color: amber,
            fontWeight: 750,
          }}
        >
          保留未受提示的原始認知
        </div>
      </Card>
      <Card label="OBSERVED / 行為觀測" title="交易紀錄呈現的我" color={teal}>
        系統根據交易資料，
        <br />
        形成行為判斷。
        <div
          style={{
            borderTop: `1px solid ${line}`,
            marginTop: 36,
            paddingTop: 24,
            color: teal,
            fontWeight: 750,
          }}
        >
          資料不足時，可以留空
        </div>
      </Card>
      <Card label="CONFIRMED / 最終確認" title="我最後認同的自己">
        看過對照後，確認或修改
        <br />
        完整問卷的答案。
        <div
          style={{
            borderTop: `1px solid ${line}`,
            marginTop: 36,
            paddingTop: 24,
            color: green,
            fontWeight: 750,
          }}
        >
          作為正式人格計分依據
        </div>
      </Card>
    </div>
  </Frame>
);

const ScoreExample = ({ label, value, color }: { label: string; value: string; color: string }) => (
  <div style={{ padding: "24px 32px", borderTop: `4px solid ${color}`, background: panel }}>
    <Label color={color}>{label}</Label>
    <div style={{ ...mono, fontSize: 66, color, fontWeight: 800, marginTop: 12 }}>{value}</div>
  </div>
);

const GapComparison: Page = () => (
  <Frame
    section="07 / 差異與 GAP"
    title="Gap 讓認知與行為的差異看得見"
    note="單一關鍵題 · 示意分數"
  >
    <div style={{ fontSize: 29, color: muted, marginBottom: 28 }}>
      例：分數越高，越傾向「等條件更明確才進場」。
    </div>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 32 }}>
      <ScoreExample label="INITIAL / 原始自評" value="+20" color={amber} />
      <ScoreExample label="OBSERVED / 行為觀測" value="+70" color={teal} />
      <ScoreExample label="CONFIRMED / 最終確認" value="+50" color={green} />
    </div>
    <div style={{ ...columns, marginTop: 32 }}>
      <Card label="原始自評 ↔ 行為觀測" title="原來比自己想的更願意等" color={amber}>
        相差 50 分，提供重新理解自己的線索。
      </Card>
      <Card label="最終確認 ↔ 行為觀測" title="確認後，仍有 20 分的 Gap" color={teal}>
        保留差異，作為後續討論與觀察的起點。
      </Card>
    </div>
    <div style={{ fontSize: 28, color: muted, marginTop: 28 }}>
      差異不代表誰對誰錯，也不要求分數一致；正式人格仍由使用者確認。
    </div>
  </Frame>
);

const DiscussionRow = ({
  number,
  title,
  detail,
  color,
}: {
  number: string;
  title: string;
  detail: string;
  color: string;
}) => (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "100px 1fr",
      gap: 28,
      padding: "30px 0",
      borderTop: `1px solid ${line}`,
    }}
  >
    <div style={{ ...mono, color, fontSize: 44, paddingTop: 4 }}>{number}</div>
    <div>
      <div style={{ fontSize: 40, fontWeight: 800, lineHeight: 1.3 }}>{title}</div>
      <div style={{ fontSize: 31, color: muted, lineHeight: 1.6, marginTop: 18 }}>{detail}</div>
    </div>
  </div>
);

const FactorValidation: Page = () => (
  <Frame
    section="08 / 因子測試與驗證"
    title="怎麼知道因子真的測到想測的特徵？"
    note="計劃與學術單位合作"
  >
    <div style={{ borderBottom: `1px solid ${line}` }}>
      <DiscussionRow
        number="01"
        title="定義清楚：這個因子在描述什麼？"
        detail="規劃與學術單位共同檢視因子定義與題目，避免混入不同概念。"
        color={green}
      />
      <DiscussionRow
        number="02"
        title="先做試測：大家是否理解同一件事？"
        detail="邀請受測者試填，找出難懂、難答或容易誤解的題目，再調整內容。"
        color={teal}
      />
      <DiscussionRow
        number="03"
        title="再做驗證：結果是否穩定、有行為依據？"
        detail="規劃重複測驗及交易紀錄對照，檢查結果是否一致、能否解釋差異。"
        color={amber}
      />
    </div>
    <div style={{ fontSize: 27, color: muted, marginTop: 28 }}>
      以上為擬議驗證方向；合作範圍、樣本與判定標準將再與學術單位討論。
    </div>
  </Frame>
);

const DataSources: Page = () => (
  <Frame section="09 / 資料與取得" title="驗證需要資料，初步探索三個來源" note="來源評估中">
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 32, marginTop: 60 }}>
      <Card label="01 / 三方產學合作" title="學校 × 券商 × 公司">
        探討結合研究方法、
        <br />
        交易資料與產品驗證。
        <div
          style={{ borderTop: `1px solid ${line}`, marginTop: 32, paddingTop: 24, fontSize: 29 }}
        >
          先釐清合作分工、可提供的
          <br />
          資料範圍與使用方式。
        </div>
      </Card>
      <Card label="02 / 付費購買" title="評估現成資料" color={teal}>
        尋找符合研究需求的資料，
        <br />
        比較品質與取得成本。
        <div
          style={{ borderTop: `1px solid ${line}`, marginTop: 32, paddingTop: 24, fontSize: 29 }}
        >
          先確認是否包含所需的
          <br />
          交易行為，而非只有行情。
        </div>
      </Card>
      <Card label="03 / 問卷調查" title="招募自願參與者" color={amber}>
        蒐集自我認知與填答回饋，
        <br />
        支援題目試測與調整。
        <div
          style={{ borderTop: `1px solid ${line}`, marginTop: 32, paddingTop: 24, fontSize: 29 }}
        >
          若要對照實際行為，需另行
          <br />
          邀請自願提供交易紀錄。
        </div>
      </Card>
    </div>
    <Note>驗證重點：能否對照同一位受測者的問卷與交易行為？</Note>
  </Frame>
);

const Summary: Page = () => (
  <Frame section="10 / 總結" title="讓人格可理解，讓判斷有依據" note="目前仍在系統設計階段">
    <div style={{ borderBottom: `1px solid ${line}` }}>
      <DiscussionRow
        number="01"
        title="以三個版本，理解自己與交易行為"
        detail="保留原始自評、行為觀測與最終確認，透過差異協助自我探索。"
        color={green}
      />
      <DiscussionRow
        number="02"
        title="以測試與研究，驗證人格因子"
        detail="計劃與學術單位合作，檢查題目是否易懂、結果是否穩定且有依據。"
        color={teal}
      />
      <DiscussionRow
        number="03"
        title="以多元來源，建立驗證所需資料"
        detail="評估三方產學合作、付費購買與自願者問卷，補足不同資料需求。"
        color={amber}
      />
    </div>
    <Note>下一步：與學術單位討論驗證設計，同步評估三種資料來源的可行性。</Note>
  </Frame>
);

export const meta: SlideMeta = {
  title: "Travis AI｜16 交易人格設計進度",
  createdAt: "2026-09-11T03:14:54.389Z",
};

export default [
  Cover,
  Status,
  Purpose,
  Architecture,
  ScoringLayers,
  Onboarding,
  KeyQuestions,
  ScoreVersions,
  GapComparison,
  FactorValidation,
  DataSources,
  Summary,
] satisfies Page[];

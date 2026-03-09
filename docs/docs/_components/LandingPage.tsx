import { Button, Typography, Divider, Switch, Checkbox, Radio, Tag, Badge } from "orizon";

const { Title, Text, Paragraph } = Typography;

/* ─── Landing page theme variables (embedded so the component is self-contained) ─── */
const landingStyles = `
  :root {
    --lp-bg: #FAFBFC;
    --lp-text: #0F172A;
    --lp-text-secondary: #475569;
    --lp-text-muted: #6b7280;
    --lp-text-subtle: #64748b;
    --lp-text-tag: #334155;
    --lp-surface: #fff;
    --lp-border: #e2e8f0;
    --lp-border-swatch: rgba(0,0,0,0.08);
    --lp-hero-bg: linear-gradient(135deg, #f0fdfa 0%, #e0f7f4 30%, #fff 70%);
    --lp-quote-bg: linear-gradient(135deg, #f0fdfa, #e0f7f4);
    --lp-svg-bg: #ccfbf1;
    --lp-svg-dark: #0F172A;
    --lp-svg-light: #fff;
  }
  .dark {
    --lp-bg: #0B1120;
    --lp-text: #e2e8f0;
    --lp-text-secondary: #94a3b8;
    --lp-text-muted: #9ca3af;
    --lp-text-subtle: #94a3b8;
    --lp-text-tag: #cbd5e1;
    --lp-surface: #1e293b;
    --lp-border: rgba(255,255,255,0.1);
    --lp-border-swatch: rgba(255,255,255,0.1);
    --lp-hero-bg: linear-gradient(135deg, #042f2e 0%, #0f3d3a 30%, #0B1120 70%);
    --lp-quote-bg: linear-gradient(135deg, #042f2e, #0f3d3a);
    --lp-svg-bg: #134e4a;
    --lp-svg-dark: #e2e8f0;
    --lp-svg-light: rgba(255,255,255,0.3);
  }
`;

/* ─── Color Swatch ─── */
function ColorSwatch({ color, name, desc, textColor = "#fff" }: { color: string; name: string; desc: string; textColor?: string }) {
  return (
    <div style={{ flex: 1, minWidth: 160 }}>
      <div
        style={{
          background: color,
          borderRadius: 16,
          height: 120,
          display: "flex",
          alignItems: "flex-end",
          padding: 14,
          border: "1px solid var(--lp-border-swatch)",
        }}
      >
        <span style={{ fontFamily: "monospace", fontSize: 12, color: textColor, opacity: 0.8 }}>{color}</span>
      </div>
      <div style={{ marginTop: 10 }}>
        <strong style={{ fontSize: 15 }}>{name}</strong>
        <div style={{ fontSize: 13, color: "var(--lp-text-muted)", marginTop: 2 }}>{desc}</div>
      </div>
    </div>
  );
}

/* ─── Section wrapper ─── */
function Section({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <section style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", ...style }}>
      {children}
    </section>
  );
}

/* ─── Main Landing Page ─── */
export function LandingPage() {
  return (
    <div style={{ background: "var(--lp-bg)", color: "var(--lp-text)", minHeight: "100vh", fontFamily: "'Inter', system-ui, sans-serif" }}>
      <style dangerouslySetInnerHTML={{ __html: landingStyles }} />

      {/* ── Hero ── */}
      <div
        style={{
          background: "var(--lp-hero-bg)",
          borderRadius: "0 0 32px 32px",
          padding: "80px 24px 72px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Section>
          <div style={{ display: "flex", alignItems: "center", gap: 48, flexWrap: "wrap" }}>
            <div style={{ flex: 1, minWidth: 320 }}>
              <span
                style={{
                  display: "inline-block",
                  background: "#0d9488",
                  color: "#fff",
                  fontSize: 12,
                  fontWeight: 600,
                  padding: "4px 12px",
                  borderRadius: 6,
                  letterSpacing: 1,
                  textTransform: "uppercase",
                  marginBottom: 20,
                }}
              >
                v0.3.0-alpha
              </span>
              <h1
                style={{
                  fontSize: "clamp(36px, 5vw, 56px)",
                  fontWeight: 900,
                  lineHeight: 1.1,
                  margin: "0 0 16px",
                  letterSpacing: -1,
                }}
              >
                Design{" "}
                <span style={{ color: "#0d9488" }}>Foundations</span>
              </h1>
              <p style={{ fontSize: 18, color: "var(--lp-text-secondary)", lineHeight: 1.6, maxWidth: 500, margin: "0 0 32px" }}>
                Customizable as <strong>shadcn</strong>, feature-rich as <strong>antd</strong> (Ant Design APIs).
                A modular system built for speed and aesthetics.
              </p>
              <div style={{ display: "flex", gap: 12 }}>
                <a
                  href="/getting-started"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    padding: "12px 28px",
                    background: "#0d9488",
                    color: "#fff",
                    borderRadius: 12,
                    fontWeight: 600,
                    fontSize: 15,
                    textDecoration: "none",
                    transition: "opacity 0.2s",
                  }}
                >
                  Get Started
                </a>
                <a
                  href="/general/button"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    padding: "12px 28px",
                    background: "var(--lp-surface)",
                    color: "var(--lp-text)",
                    borderRadius: 12,
                    fontWeight: 600,
                    fontSize: 15,
                    textDecoration: "none",
                    border: "1px solid var(--lp-border)",
                  }}
                >
                  Explore Docs
                </a>
              </div>
            </div>
            {/* Geometric illustration */}
            <div style={{ flex: "0 0 auto", position: "relative", width: 280, height: 240 }}>
              <svg viewBox="0 0 280 240" fill="none" xmlns="http://www.w3.org/2000/svg" width="280" height="240">
                <rect x="40" y="20" width="200" height="200" rx="32" fill="var(--lp-svg-bg)" opacity="0.6" />
                <polygon points="140,40 200,140 80,140" fill="#0d9488" opacity="0.9" />
                <circle cx="100" cy="170" r="36" fill="#0d9488" opacity="0.7" />
                <circle cx="170" cy="170" r="36" fill="var(--lp-svg-dark)" opacity="0.8" />
                <rect x="130" y="70" width="40" height="40" rx="8" fill="var(--lp-svg-light)" opacity="0.6" />
              </svg>
            </div>
          </div>
        </Section>
      </div>

      {/* ── Core Palette ── */}
      <Section style={{ marginTop: 72 }}>
        <h2 style={{ fontSize: 28, fontWeight: 800, margin: "0 0 8px" }}>Core Palette</h2>
        <p style={{ color: "var(--lp-text-muted)", fontSize: 15, margin: "0 0 32px" }}>
          The foundational colors that define the Orizon visual identity.
        </p>
        <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
          <ColorSwatch color="#0d9488" name="Primary" desc="Main brand & interactive color" />
          <ColorSwatch color="#F5FBF8" name="Background" desc="App-wide background light" textColor="#64748b" />
          <ColorSwatch color="#FFFFFF" name="Surface" desc="Card and container surfaces" textColor="#94a3b8" />
          <ColorSwatch color="#0F172A" name="Text" desc="Primary typography color" />
        </div>
      </Section>

      {/* ── Typography + Action Elements ── */}
      <Section style={{ marginTop: 72 }}>
        <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
          {/* Typography */}
          <div style={{ flex: 1, minWidth: 320 }}>
            <h2 style={{ fontSize: 28, fontWeight: 800, margin: "0 0 8px" }}>Typography</h2>
            <p style={{ color: "var(--lp-text-muted)", fontSize: 15, margin: "0 0 24px" }}>
              Using Inter for maximum clarity and modern feel.
            </p>
            <div
              style={{
                background: "var(--lp-surface)",
                borderRadius: 20,
                padding: 32,
                border: "1px solid var(--lp-border)",
              }}
            >
              <div style={{ marginBottom: 24 }}>
                <span style={{ fontSize: 11, color: "#0d9488", fontWeight: 600 }}>Heading 1 / Black / 48px</span>
                <div style={{ fontSize: 42, fontWeight: 900, marginTop: 4 }}>Orizon Bold</div>
              </div>
              <div style={{ marginBottom: 24 }}>
                <span style={{ fontSize: 11, color: "#0d9488", fontWeight: 600 }}>Heading 2 / Bold / 32px</span>
                <div style={{ fontSize: 28, fontWeight: 700, marginTop: 4 }}>The quick brown fox</div>
              </div>
              <Divider style={{ margin: "16px 0" }} />
              <div style={{ marginBottom: 24 }}>
                <span style={{ fontSize: 11, color: "#0d9488", fontWeight: 600 }}>Body Large / Semibold / 18px</span>
                <div style={{ fontSize: 18, fontWeight: 600, marginTop: 4 }}>Jumped over the lazy dog's back.</div>
              </div>
              <div>
                <span style={{ fontSize: 11, color: "#0d9488", fontWeight: 600 }}>Body Base / Regular / 16px</span>
                <div style={{ fontSize: 15, marginTop: 4, color: "var(--lp-text-secondary)", lineHeight: 1.6 }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </div>
              </div>
            </div>
          </div>

          {/* Action Elements */}
          <div style={{ flex: 1, minWidth: 320 }}>
            <h2 style={{ fontSize: 28, fontWeight: 800, margin: "0 0 8px" }}>Action Elements</h2>
            <p style={{ color: "var(--lp-text-muted)", fontSize: 15, margin: "0 0 24px" }}>
              Pill-shaped components for high-impact interaction.
            </p>
            <div
              style={{
                background: "var(--lp-surface)",
                borderRadius: 20,
                padding: 32,
                border: "1px solid var(--lp-border)",
              }}
            >
              <div style={{ marginBottom: 24 }}>
                <span style={{ fontSize: 11, color: "var(--lp-text-subtle)", fontWeight: 600, textTransform: "uppercase", letterSpacing: 1 }}>Primary Buttons</span>
                <div style={{ display: "flex", gap: 10, marginTop: 12, flexWrap: "wrap", alignItems: "center" }}>
                  <Button type="primary" size="large">Large Active</Button>
                  <Button type="primary">Medium</Button>
                  <Button type="primary" size="small">Small</Button>
                </div>
              </div>
              <div style={{ marginBottom: 24 }}>
                <span style={{ fontSize: 11, color: "var(--lp-text-subtle)", fontWeight: 600, textTransform: "uppercase", letterSpacing: 1 }}>Secondary & Subtle</span>
                <div style={{ display: "flex", gap: 10, marginTop: 12, flexWrap: "wrap", alignItems: "center" }}>
                  <Button type="default">Outline Alt</Button>
                  <Button type="text">Secondary</Button>
                </div>
              </div>
              <div>
                <span style={{ fontSize: 11, color: "var(--lp-text-subtle)", fontWeight: 600, textTransform: "uppercase", letterSpacing: 1 }}>Control States</span>
                <div style={{ display: "flex", gap: 16, marginTop: 12, alignItems: "center", flexWrap: "wrap" }}>
                  <Checkbox checked>Selected</Checkbox>
                  <Radio>Default</Radio>
                  <Switch defaultChecked />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ── Components Showcase ── */}
      <Section style={{ marginTop: 72 }}>
        <h2 style={{ fontSize: 28, fontWeight: 800, margin: "0 0 8px" }}>68 Components</h2>
        <p style={{ color: "var(--lp-text-muted)", fontSize: 15, margin: "0 0 32px" }}>
          Everything you need for production apps, out of the box.
        </p>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          {[
            "Button", "Input", "Select", "Table", "Form", "Modal", "Card", "Tabs",
            "Menu", "Badge", "Tag", "Alert", "Drawer", "Tooltip", "DatePicker",
            "Upload", "Tree", "Steps", "Pagination", "Switch", "Radio", "Checkbox",
            "Slider", "Progress", "Carousel", "Calendar", "Avatar", "Breadcrumb",
          ].map((name) => (
            <span
              key={name}
              style={{
                padding: "6px 16px",
                background: "var(--lp-surface)",
                border: "1px solid var(--lp-border)",
                borderRadius: 10,
                fontSize: 13,
                fontWeight: 500,
                color: "var(--lp-text-tag)",
              }}
            >
              {name}
            </span>
          ))}
          <span
            style={{
              padding: "6px 16px",
              background: "#0d9488",
              borderRadius: 10,
              fontSize: 13,
              fontWeight: 600,
              color: "#fff",
            }}
          >
            +40 more
          </span>
        </div>
      </Section>

      {/* ── Quote ── */}
      <Section style={{ marginTop: 72 }}>
        <div
          style={{
            background: "var(--lp-quote-bg)",
            borderRadius: 24,
            padding: "48px 40px",
            textAlign: "center",
          }}
        >
          <p style={{ fontSize: 22, fontWeight: 600, fontStyle: "italic", color: "var(--lp-text)", margin: "0 0 12px" }}>
            "Design is not just what it looks like, it's how it works."
          </p>
          <span style={{ fontSize: 13, color: "#0d9488", fontWeight: 700, letterSpacing: 1, textTransform: "uppercase" }}>
            Orizon Design System
          </span>
        </div>
      </Section>

      {/* ── Footer ── */}
      <footer
        style={{
          marginTop: 72,
          borderTop: "1px solid var(--lp-border)",
          padding: "24px 0",
        }}
      >
        <Section>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <img src="/logo.svg" alt="Orizon" width="24" height="24" />
              <strong style={{ fontSize: 15 }}>Orizon</strong>
            </div>
            <span style={{ fontSize: 13, color: "var(--lp-text-muted)" }}>
              Built with Tailwind CSS. Made by{" "}
              <a href="https://github.com/web-vikas" style={{ color: "#0d9488", textDecoration: "none" }}>Vikas Patel</a>
            </span>
          </div>
        </Section>
      </footer>
    </div>
  );
}

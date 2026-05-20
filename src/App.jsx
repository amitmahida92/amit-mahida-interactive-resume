import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowUpRight,
  Boxes,
  BrainCircuit,
  ChevronRight,
  Cloud,
  Code2,
  Container,
  Database,
  Download,
  Gauge,
  GitBranch,
  KeyRound,
  Layers3,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  RadioTower,
  Rocket,
  ServerCog,
  ShieldCheck,
  TestTube2,
  Workflow,
} from "lucide-react";
import { education, experience, metrics, platformFlow, profile, showcase, skillGroups } from "./resumeData";

const navItems = [
  { label: "Impact", href: "#impact" },
  { label: "Architecture", href: "#architecture" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
];

const emailHref = `mailto:${profile.email}`;

const showcaseIcons = [Layers3, Workflow, Gauge, BrainCircuit];
const skillIcons = [Code2, ServerCog, Cloud, Database, Boxes, ShieldCheck, TestTube2, Rocket, BrainCircuit];
const flowIcons = {
  client: Code2,
  edge: Cloud,
  contracts: Workflow,
  services: ServerCog,
  infra: Container,
  async: RadioTower,
  security: KeyRound,
  quality: GitBranch,
};

const logoShortLabels = {
  aws: "AWS",
  grpc: "gRPC",
  rest: "REST",
  graphql: "GQL",
  java: "J",
  node: "JS",
  mongo: "MDB",
  postgres: "PG",
  mysql: "SQL",
  firebase: "Fb",
  supabase: "Sb",
  dynamo: "DDB",
  k8s: "K8s",
  docker: "D",
  kafka: "K",
  oauth: "OA",
  auth0: "A0",
  keycloak: "KC",
  vault: "V",
  jenkins: "J",
  github: "GH",
  jest: "Jest",
  karma: "K",
  jasmine: "Js",
  cypress: "Cy",
  junit: "JU",
  mockito: "Mo",
};

function useReveal() {
  useEffect(() => {
    const elements = [...document.querySelectorAll(".reveal")];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.dataset.revealed = "true";
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18, rootMargin: "0px 0px -8% 0px" }
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);
}

function CountUp({ value, suffix = "" }) {
  const ref = useRef(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();

      if (reducedMotion) {
        setCount(value);
        return;
      }

      const duration = 1200;
      const start = performance.now();
      const step = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setCount(Math.round(value * eased));
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });

    observer.observe(node);
    return () => observer.disconnect();
  }, [value]);

  return (
    <span ref={ref}>
      {new Intl.NumberFormat("en-US").format(count)}
      {suffix}
    </span>
  );
}

function TechLogo({ logo, name }) {
  if (logo === "angular") {
    return (
      <svg className="tech-logo-svg angular-logo" viewBox="0 0 32 32" aria-hidden="true">
        <path d="M16 2 4 6.4l1.9 16.2L16 30l10.1-7.4L28 6.4 16 2Z" />
        <path d="M16 5.4 8.1 23.1h3.2l1.6-3.8h6.2l1.6 3.8h3.2L16 5.4Zm0 6.4 2.1 5h-4.2l2.1-5Z" />
      </svg>
    );
  }

  if (logo === "react") {
    return (
      <svg className="tech-logo-svg react-logo" viewBox="0 0 32 32" aria-hidden="true">
        <ellipse cx="16" cy="16" rx="12" ry="4.8" />
        <ellipse cx="16" cy="16" rx="12" ry="4.8" transform="rotate(60 16 16)" />
        <ellipse cx="16" cy="16" rx="12" ry="4.8" transform="rotate(120 16 16)" />
        <circle cx="16" cy="16" r="2.6" />
      </svg>
    );
  }

  return (
    <span className={`tech-logo-fallback logo-${logo}`} aria-hidden="true">
      {logoShortLabels[logo] ?? name.slice(0, 2)}
    </span>
  );
}

function PlatformFlow() {
  const repeatedFlow = [...platformFlow, ...platformFlow];

  return (
    <div className="platform-flow reveal is-visible" aria-label="Highly scalable platform technology sequence">
      <div className="platform-flow-header">
        <span>Highly scalable platform sequence</span>
        <strong>Angular/React - Edge - APIs - Services - Events - Identity - CI/CD</strong>
      </div>
      <div className="platform-flow-window">
        <div className="platform-flow-track">
          {repeatedFlow.map((stage, index) => {
            const Icon = flowIcons[stage.key] ?? Layers3;
            const isDuplicate = index >= platformFlow.length;

            return (
              <article
                className={`flow-stage flow-${stage.accent}`}
                key={`${stage.key}-${index}`}
                aria-hidden={isDuplicate}
              >
                <div className="flow-stage-title">
                  <span className="flow-stage-icon">
                    <Icon size={16} />
                  </span>
                  <span>{stage.stage}</span>
                </div>
                <div className="flow-tech-list">
                  {stage.technologies.map((tech) => (
                    <span className={`flow-tech logo-${tech.logo}`} key={`${stage.key}-${tech.name}`}>
                      <TechLogo logo={tech.logo} name={tech.name} />
                      <span>{tech.name}</span>
                    </span>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function ArchitectureCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const context = canvas.getContext("2d");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let animationFrame = 0;
    let width = 0;
    let height = 0;
    let pointer = { x: 0.72, y: 0.32 };
    const nodes = [
      { x: 0.09, y: 0.28, r: 13, label: "Angular", logo: "angular", color: "#dd0031" },
      { x: 0.09, y: 0.5, r: 13, label: "React", logo: "react", color: "#61dafb" },
      { x: 0.22, y: 0.39, r: 10, label: "S3 / CDN", short: "AWS", color: "#ff9900" },
      { x: 0.35, y: 0.39, r: 10, label: "gRPC REST GraphQL", short: "API", color: "#ff6b4a" },
      { x: 0.49, y: 0.28, r: 10, label: "Java / Node.js", short: "JS", color: "#35d6a4" },
      { x: 0.49, y: 0.52, r: 10, label: "Mongo Postgres MySQL", short: "DB", color: "#2d7dd2" },
      { x: 0.63, y: 0.39, r: 10, label: "K8s + Docker", short: "K8s", color: "#7967ed" },
      { x: 0.77, y: 0.28, r: 10, label: "Kafka SNS SQS", short: "Q", color: "#f2b233" },
      { x: 0.77, y: 0.52, r: 10, label: "OAuth Auth0 Vault", short: "ID", color: "#b88cff" },
      { x: 0.91, y: 0.39, r: 10, label: "CI/CD + Tests", short: "CI", color: "#35d6a4" },
    ];
    const links = [
      [0, 2],
      [1, 2],
      [2, 3],
      [3, 4],
      [3, 5],
      [4, 6],
      [5, 6],
      [6, 7],
      [6, 8],
      [7, 9],
      [8, 9],
    ];

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const onPointerMove = (event) => {
      const rect = canvas.getBoundingClientRect();
      pointer = {
        x: (event.clientX - rect.left) / rect.width,
        y: (event.clientY - rect.top) / rect.height,
      };
    };

    const drawLogoNode = (node, x, y, time, index) => {
      const active = 0.5 + Math.sin(time / 600 + index) * 0.5;

      context.beginPath();
      context.arc(x, y, node.r + 20 + active * 6, 0, Math.PI * 2);
      context.fillStyle = `${node.color}24`;
      context.fill();

      if (node.logo === "angular") {
        const shield = node.r + 8;
        context.beginPath();
        context.moveTo(x, y - shield);
        context.lineTo(x + shield * 0.82, y - shield * 0.58);
        context.lineTo(x + shield * 0.66, y + shield * 0.62);
        context.lineTo(x, y + shield);
        context.lineTo(x - shield * 0.66, y + shield * 0.62);
        context.lineTo(x - shield * 0.82, y - shield * 0.58);
        context.closePath();
        context.fillStyle = "#dd0031";
        context.fill();
        context.fillStyle = "#ffffff";
        context.font = "900 16px Inter, Arial, sans-serif";
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.fillText("A", x, y + 1);
        return;
      }

      if (node.logo === "react") {
        context.save();
        context.translate(x, y);
        context.strokeStyle = "#61dafb";
        context.lineWidth = 1.5;
        [0, Math.PI / 3, (Math.PI * 2) / 3].forEach((rotation) => {
          context.rotate(rotation);
          context.beginPath();
          context.ellipse(0, 0, node.r + 8, node.r * 0.52, 0, 0, Math.PI * 2);
          context.stroke();
          context.rotate(-rotation);
        });
        context.beginPath();
        context.arc(0, 0, 3, 0, Math.PI * 2);
        context.fillStyle = "#61dafb";
        context.fill();
        context.restore();
        return;
      }

      context.beginPath();
      context.arc(x, y, node.r + 6, 0, Math.PI * 2);
      context.fillStyle = "#fbfbf6";
      context.fill();

      context.font = node.short.length > 2 ? "700 8px Inter, Arial, sans-serif" : "800 10px Inter, Arial, sans-serif";
      context.textAlign = "center";
      context.textBaseline = "middle";
      context.fillStyle = node.color;
      context.fillText(node.short, x, y + 0.5);
    };

    const draw = (time = 0) => {
      context.clearRect(0, 0, width, height);
      const grid = 36;

      context.save();
      context.globalAlpha = 0.28;
      context.strokeStyle = "#ffffff";
      context.lineWidth = 0.6;
      for (let x = 0; x < width; x += grid) {
        context.beginPath();
        context.moveTo(x, 0);
        context.lineTo(x + Math.sin(time / 900 + x) * 8, height);
        context.stroke();
      }
      for (let y = 0; y < height; y += grid) {
        context.beginPath();
        context.moveTo(0, y);
        context.lineTo(width, y + Math.cos(time / 1000 + y) * 8);
        context.stroke();
      }
      context.restore();

      const px = pointer.x * width;
      const py = pointer.y * height;
      const glow = context.createRadialGradient(px, py, 0, px, py, Math.max(width, height) * 0.55);
      glow.addColorStop(0, "rgba(255, 183, 77, 0.24)");
      glow.addColorStop(0.45, "rgba(53, 214, 164, 0.16)");
      glow.addColorStop(1, "rgba(0, 0, 0, 0)");
      context.fillStyle = glow;
      context.fillRect(0, 0, width, height);

      links.forEach(([a, b], index) => {
        const from = nodes[a];
        const to = nodes[b];
        const x1 = from.x * width;
        const y1 = from.y * height;
        const x2 = to.x * width;
        const y2 = to.y * height;
        const pulse = (Math.sin(time / 520 + index) + 1) / 2;

        context.beginPath();
        context.moveTo(x1, y1);
        context.lineTo(x2, y2);
        context.strokeStyle = `rgba(255, 255, 255, ${0.18 + pulse * 0.18})`;
        context.lineWidth = 1.1;
        context.stroke();

        const movingX = x1 + (x2 - x1) * pulse;
        const movingY = y1 + (y2 - y1) * pulse;
        context.beginPath();
        context.arc(movingX, movingY, 3.1, 0, Math.PI * 2);
        context.fillStyle = nodes[b].color;
        context.fill();
      });

      nodes.forEach((node, index) => {
        const x = node.x * width + Math.sin(time / 900 + index) * 5;
        const y = node.y * height + Math.cos(time / 1000 + index) * 5;
        drawLogoNode(node, x, y, time, index);

        context.font = "700 10px Inter, Arial, sans-serif";
        context.textAlign = "center";
        context.textBaseline = "alphabetic";
        context.fillStyle = "rgba(255, 255, 255, 0.72)";
        context.fillText(node.label, x, y + 33);
      });

      if (!reducedMotion) {
        animationFrame = requestAnimationFrame(draw);
      }
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    canvas.addEventListener("pointermove", onPointerMove);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  return <canvas className="architecture-canvas" ref={canvasRef} aria-hidden="true" />;
}

function Header() {
  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label="Amit Mahida home">
        <span className="brand-mark">AM</span>
        <span>Amit Mahida</span>
      </a>
      <nav className="nav-links" aria-label="Resume sections">
        {navItems.map((item) => (
          <a key={item.href} href={item.href}>
            {item.label}
          </a>
        ))}
      </nav>
      <a className="header-action" href={emailHref} aria-label="Email Amit Mahida">
        <Mail size={17} />
        <span>Contact</span>
      </a>
    </header>
  );
}

function Hero() {
  const handlePointerMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--cursor-x", `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty("--cursor-y", `${event.clientY - rect.top}px`);
  };

  return (
    <section id="top" className="hero" onPointerMove={handlePointerMove}>
      <ArchitectureCanvas />
      <div className="hero-scrim" />
      <div className="hero-content reveal is-visible">
        <p className="eyebrow">SaaS frontend architecture - performance - team leadership</p>
        <h1>{profile.name}</h1>
        <p className="hero-role">{profile.role}</p>
        <p className="hero-copy">{profile.summary}</p>

        <PlatformFlow />

        <div className="hero-actions" aria-label="Primary actions">
          <a className="button primary" href={profile.pdf} download>
            <Download size={18} />
            <span>Download PDF</span>
          </a>
          <a className="button secondary" href={emailHref}>
            <Mail size={18} />
            <span>Email Amit</span>
          </a>
          <a className="button icon-only" href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="Open LinkedIn profile">
            <Linkedin size={18} />
          </a>
        </div>

        <div className="contact-strip" aria-label="Contact details">
          <span>
            <MapPin size={15} />
            {profile.location}
          </span>
          <a href={`tel:${profile.phone.replace(/\s/g, "")}`}>
            <Phone size={15} />
            {profile.phone}
          </a>
          <a href={emailHref}>
            <Mail size={15} />
            {profile.email}
          </a>
        </div>
      </div>

      <div className="hero-side reveal is-visible">
        <figure className="hero-portrait" aria-label="Portrait of Amit Mahida">
          <img src={profile.image} alt="Amit Mahida" />
          <figcaption>
            <span>Frontend Architect</span>
            <strong>12+ years building SaaS products</strong>
          </figcaption>
        </figure>

        <div className="hero-stats" aria-label="Career highlights">
          {metrics.map((metric, index) => (
            <article className="hero-stat reveal is-visible" key={metric.label} style={{ "--delay": `${index * 80}ms` }}>
              <strong>
                <CountUp value={metric.value} suffix={metric.suffix} />
              </strong>
              <span>{metric.label}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function SectionHeading({ eyebrow, title, children }) {
  return (
    <div className="section-heading reveal">
      <p className="section-kicker">{eyebrow}</p>
      <h2>{title}</h2>
      {children ? <p>{children}</p> : null}
    </div>
  );
}

function Impact() {
  return (
    <section id="impact" className="section">
      <SectionHeading eyebrow="Proof points" title="Numbers recruiters can scan in seconds">
        The resume is framed around measurable scale, architecture ownership, and delivery outcomes.
      </SectionHeading>
      <div className="metric-grid">
        {metrics.map((metric, index) => (
          <article className="metric-card reveal" key={metric.label} style={{ "--delay": `${index * 70}ms` }}>
            <div className="metric-value">
              <CountUp value={metric.value} suffix={metric.suffix} />
            </div>
            <h3>{metric.label}</h3>
            <p>{metric.detail}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function ArchitectureShowcase() {
  return (
    <section id="architecture" className="section architecture-section">
      <SectionHeading eyebrow="Architecture stories" title="High-signal work, packaged like product case studies">
        Each tile turns a dense resume bullet into a crisp conversation starter.
      </SectionHeading>
      <div className="showcase-grid">
        {showcase.map((item, index) => {
          const Icon = showcaseIcons[index] ?? Layers3;
          return (
            <article className="showcase-card reveal" key={item.title} style={{ "--delay": `${index * 90}ms` }}>
              <div className="showcase-topline">
                <span className="icon-tile">
                  <Icon size={20} />
                </span>
                <span>{item.eyebrow}</span>
              </div>
              <h3>{item.title}</h3>
              <strong>{item.stat}</strong>
              <p>{item.body}</p>
              <div className="tag-row">
                {item.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function Experience() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="experience" className="section">
      <SectionHeading eyebrow="Career timeline" title="From senior engineer to frontend architecture owner">
        The timeline favors results, platform decisions, and leadership scope over job-description filler.
      </SectionHeading>

      <div className="timeline">
        {experience.map((item, index) => {
          const isActive = activeIndex === index;
          return (
            <article className={`timeline-card accent-${item.accent} reveal ${isActive ? "active" : ""}`} key={`${item.company}-${item.role}`}>
              <button className="timeline-trigger" type="button" onClick={() => setActiveIndex(isActive ? -1 : index)}>
                <span className="timeline-dot" />
                <span className="timeline-title">
                  <strong>{item.role}</strong>
                  <small>
                    {item.company} - {item.place}
                  </small>
                </span>
                <span className="timeline-period">{item.period}</span>
                <ChevronRight className="timeline-chevron" size={20} />
              </button>

              <div className="timeline-panel" aria-hidden={!isActive}>
                <ul>
                  {item.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function Skills() {
  const [activeGroup, setActiveGroup] = useState(skillGroups[0].name);
  const active = useMemo(() => skillGroups.find((group) => group.name === activeGroup) ?? skillGroups[0], [activeGroup]);

  return (
    <section id="skills" className="section skills-section">
      <SectionHeading eyebrow="Capability map" title="A stack built for frontends that have to scale">
        Recruiters get a fast scan, hiring managers get the architecture depth.
      </SectionHeading>

      <div className="skill-layout">
        <div className="skill-tabs reveal" role="tablist" aria-label="Skill categories">
          {skillGroups.map((group, index) => {
            const Icon = skillIcons[index] ?? Code2;
            const selected = group.name === activeGroup;
            return (
              <button
                className={selected ? "selected" : ""}
                key={group.name}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setActiveGroup(group.name)}
              >
                <Icon size={18} />
                <span>{group.name}</span>
              </button>
            );
          })}
        </div>

        <div className="skill-cloud reveal" role="tabpanel" aria-label={`${active.name} skills`}>
          {active.skills.map((skill, index) => (
            <span key={skill} style={{ "--delay": `${index * 35}ms` }}>
              {skill}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function EducationAndContact() {
  return (
    <section className="section footer-section">
      <div className="education-block reveal">
        <p className="section-kicker">Education</p>
        <h2>Computer science foundation, product architecture trajectory</h2>
        <div className="education-list">
          {education.map((item) => (
            <article className="education-card" key={item.degree}>
              <strong>{item.degree}</strong>
              <span>{item.year}</span>
              <p>
                {item.school} - {item.place}
              </p>
            </article>
          ))}
        </div>
      </div>

      <div className="closing-panel reveal">
        <p className="section-kicker">Recruiter-ready</p>
        <h2>Available as a modern interactive resume and a printable PDF.</h2>
        <div className="closing-actions">
          <a className="button primary" href={`${emailHref}?subject=Frontend%20Architect%20Opportunity`}>
            <Mail size={18} />
            <span>Start a conversation</span>
          </a>
          <a className="button secondary" href={profile.portfolio} target="_blank" rel="noreferrer">
            <ArrowUpRight size={18} />
            <span>Bold Profile</span>
          </a>
        </div>
      </div>
    </section>
  );
}

export default function App() {
  useReveal();

  return (
    <div className="app">
      <Header />
      <main>
        <Hero />
        <Impact />
        <ArchitectureShowcase />
        <Experience />
        <Skills />
        <EducationAndContact />
      </main>
    </div>
  );
}

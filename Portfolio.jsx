import React, { useState } from "react";

/*
  Portfolio.jsx
  Built to match this schema (Aiven Postgres, PG Studio schema map):
  User -> Profile -> Education, Certifications, Projects, Skills,
  Social_Links, Testimonials, Contact_Messages, Analytics
  Project_Skills joins Projects and Skills.
*/

const fontImport = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Inter:wght@400;500;600&display=swap');
`;

const user = {
  Id: 1,
  Email: "james.imperial@example.com",
  Role: "developer",
};

const profile = {
  profile_id: 1,
  user_id: 1,
  firstname: "James",
  lastname: "Imperial",
  middlename: "Walter O.",
  bio: "I build backend systems and the interfaces that sit on top of them. Right now I split my time between distributed data pipelines and small, fast web apps.",
  avatar_url: "",
};

const education = [
  {
    education_id: 1,
    profile_id: 1,
    school_name: "Dalubhasaan ng Lungsod ng Lucena",
    degree: "B.S. Information Technology",
    field_of_study: "Information Technology",
    start_date: "2023-09-01",
    end_date: "2023-05-15",
  },
];

const certifications = [
  {
    certification_id: 1,
    profile_id: 1,
    title: "AWS Certified Solutions Architect",
    issuer: "Amazon Web Services",
    issue_date: "2024-03-01",
    credential_url: "#",
  },
  {
    certification_id: 2,
    profile_id: 1,
    title: "Postgres Performance Tuning",
    issuer: "Aiven Academy",
    issue_date: "2025-01-10",
    credential_url: "#",
  },
];

const skills = [
  { skill_id: 1, profile_id: 1, category: "Languages", name: "TypeScript" },
  { skill_id: 2, profile_id: 1, category: "Languages", name: "Python" },
  { skill_id: 3, profile_id: 1, category: "Languages", name: "SQL" },
  { skill_id: 4, profile_id: 1, category: "Frontend", name: "React" },
  { skill_id: 5, profile_id: 1, category: "Frontend", name: "Tailwind" },
  { skill_id: 6, profile_id: 1, category: "Backend", name: "Node.js" },
  { skill_id: 7, profile_id: 1, category: "Backend", name: "PostgreSQL" },
  { skill_id: 8, profile_id: 1, category: "Infra", name: "Aiven" },
  { skill_id: 9, profile_id: 1, category: "Infra", name: "Docker" },
];

const projects = [
  {
    project_id: 1,
    profile_id: 1,
    project_title: "Route Planner API",
    description:
      "A routing service that scores delivery routes against live traffic data. Cut average delivery time estimates by 18 percent in testing.",
    featured_img: "",
    is_featured: true,
    url_link: "#",
    created_at: "2025-02-01",
    skill_ids: [2, 3, 7, 9],
  },
  {
    project_id: 2,
    profile_id: 1,
    project_title: "Portfolio Data Layer",
    description:
      "The Postgres schema and query layer behind this very site: profiles, projects, skills, and testimonials, all joined through a handful of tables.",
    featured_img: "",
    is_featured: true,
    url_link: "#",
    created_at: "2025-06-01",
    skill_ids: [3, 6, 7, 8],
  },
  {
    project_id: 3,
    profile_id: 1,
    project_title: "Habit Tracker",
    description:
      "A small React app for tracking daily habits, with streak logic and weekly review emails.",
    featured_img: "",
    is_featured: false,
    url_link: "#",
    created_at: "2024-11-01",
    skill_ids: [1, 4, 5],
  },
];

const socialLinks = [
  { social_id: 1, profile_id: 1, platform: "GitHub", url: "#" },
  { social_id: 2, profile_id: 1, platform: "LinkedIn", url: "#" },
  { social_id: 3, profile_id: 1, platform: "Email", url: "mailto:james.imperial@example.com" },
];

const testimonials = [
  {
    testimonial_id: 1,
    profile_id: 1,
    author_name: "Priya Nair",
    author_role: "Engineering Manager, Fenwick Logistics",
    message:
      "James took our slowest reporting query from four minutes to under two seconds. He explains tradeoffs clearly and never over-engineers.",
    rating: 5,
  },
  {
    testimonial_id: 2,
    profile_id: 1,
    author_name: "Marcus Oduya",
    author_role: "Founder, Loop Systems",
    message:
      "Reliable, calm under deadline pressure, and honest when something won't work. That combination is rare.",
    rating: 5,
  },
];

function formatDate(dateStr) {
  if (!dateStr) return "Present";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

function skillsById(ids) {
  return skills.filter((s) => ids.includes(s.skill_id));
}

function groupSkillsByCategory() {
  const groups = {};
  skills.forEach((s) => {
    if (!groups[s.category]) groups[s.category] = [];
    groups[s.category].push(s);
  });
  return groups;
}

export default function Portfolio() {
  const [activeProject, setActiveProject] = useState(null);
  const [contactForm, setContactForm] = useState({ sender_name: "", sender_email: "", message_body: "" });
  const [sent, setSent] = useState(false);

  const grouped = groupSkillsByCategory();
  const fullName = `${profile.firstname} ${profile.middlename} ${profile.lastname}`
    .replace(/\s+/g, " ")
    .trim();

  function handleContactSubmit(e) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <div style={styles.page}>
      <style>{fontImport}</style>

      <div style={styles.layout}>
        <aside style={styles.sidebar}>
          <div>
            <div style={styles.mark}>JI</div>
            <h1 style={styles.name}>{fullName}</h1>
            <p style={styles.role}>{user.Role}</p>
            <p style={styles.bio}>{profile.bio}</p>
          </div>

          <nav style={styles.nav}>
            {["Work", "Skills", "Background", "Notes", "Contact"].map((label) => (
              <a key={label} href={`#${label.toLowerCase()}`} style={styles.navLink}>
                {label}
              </a>
            ))}
          </nav>

          <div style={styles.socialRow}>
            {socialLinks.map((link) => (
              <a key={link.social_id} href={link.url} style={styles.socialLink}>
                {link.platform}
              </a>
            ))}
          </div>
        </aside>

        <main style={styles.main}>
          <section id="work" style={styles.section}>
            <SectionLabel index="01" title="Work" />
            <div style={styles.projectList}>
              {projects.map((project) => (
                <article
                  key={project.project_id}
                  style={{
                    ...styles.projectCard,
                    borderColor: activeProject === project.project_id ? tokens.accent : tokens.line,
                  }}
                  onMouseEnter={() => setActiveProject(project.project_id)}
                  onMouseLeave={() => setActiveProject(null)}
                >
                  <div style={styles.projectHeadRow}>
                    <h3 style={styles.projectTitle}>{project.project_title}</h3>
                    {project.is_featured && <span style={styles.featuredTag}>Featured</span>}
                  </div>
                  <p style={styles.projectDesc}>{project.description}</p>
                  <div style={styles.tagRow}>
                    {skillsById(project.skill_ids).map((s) => (
                      <span key={s.skill_id} style={styles.tag}>
                        {s.name}
                      </span>
                    ))}
                  </div>
                  <a href={project.url_link} style={styles.projectLink}>
                    View project &#8594;
                  </a>
                </article>
              ))}
            </div>
          </section>

          <section id="skills" style={styles.section}>
            <SectionLabel index="02" title="Skills" />
            <div style={styles.skillGrid}>
              {Object.entries(grouped).map(([category, items]) => (
                <div key={category}>
                  <h4 style={styles.skillCategory}>{category}</h4>
                  <ul style={styles.skillList}>
                    {items.map((s) => (
                      <li key={s.skill_id} style={styles.skillItem}>
                        {s.name}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section id="background" style={styles.section}>
            <SectionLabel index="03" title="Background" />
            <div style={styles.timeline}>
              {education.map((ed) => (
                <div key={ed.education_id} style={styles.timelineRow}>
                  <span style={styles.timelineDate}>
                    {formatDate(ed.start_date)} to {formatDate(ed.end_date)}
                  </span>
                  <div>
                    <p style={styles.timelineTitle}>{ed.degree}</p>
                    <p style={styles.timelineSub}>
                      {ed.school_name}, {ed.field_of_study}
                    </p>
                  </div>
                </div>
              ))}
              {certifications.map((cert) => (
                <div key={cert.certification_id} style={styles.timelineRow}>
                  <span style={styles.timelineDate}>{formatDate(cert.issue_date)}</span>
                  <div>
                    <p style={styles.timelineTitle}>{cert.title}</p>
                    <p style={styles.timelineSub}>{cert.issuer}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section id="notes" style={styles.section}>
            <SectionLabel index="04" title="Notes from people I've worked with" />
            <div style={styles.testimonialList}>
              {testimonials.map((t) => (
                <blockquote key={t.testimonial_id} style={styles.testimonial}>
                  <p style={styles.testimonialMessage}>&#8220;{t.message}&#8221;</p>
                  <footer style={styles.testimonialFooter}>
                    {t.author_name}, {t.author_role}
                  </footer>
                </blockquote>
              ))}
            </div>
          </section>

          <section id="contact" style={styles.section}>
            <SectionLabel index="05" title="Get in touch" />
            {sent ? (
              <p style={styles.confirmMessage}>
                Message sent. I read every one and reply within a couple of days.
              </p>
            ) : (
              <form onSubmit={handleContactSubmit} style={styles.form}>
                <label style={styles.formLabel}>
                  Your name
                  <input
                    style={styles.formInput}
                    type="text"
                    required
                    value={contactForm.sender_name}
                    onChange={(e) => setContactForm({ ...contactForm, sender_name: e.target.value })}
                  />
                </label>
                <label style={styles.formLabel}>
                  Your email
                  <input
                    style={styles.formInput}
                    type="email"
                    required
                    value={contactForm.sender_email}
                    onChange={(e) => setContactForm({ ...contactForm, sender_email: e.target.value })}
                  />
                </label>
                <label style={styles.formLabel}>
                  Message
                  <textarea
                    style={{ ...styles.formInput, minHeight: "100px", resize: "vertical" }}
                    required
                    value={contactForm.message_body}
                    onChange={(e) => setContactForm({ ...contactForm, message_body: e.target.value })}
                  />
                </label>
                <button type="submit" style={styles.submitButton}>
                  Send message
                </button>
              </form>
            )}
          </section>

          <footer style={styles.footer}>
            <span>{fullName}</span>
            <span>Data structured for a Postgres backend on Aiven</span>
          </footer>
        </main>
      </div>
    </div>
  );
}

function SectionLabel({ index, title }) {
  return (
    <div style={styles.sectionLabelRow}>
      <span style={styles.sectionIndex}>{index}</span>
      <h2 style={styles.sectionTitle}>{title}</h2>
    </div>
  );
}

const tokens = {
  bg: "#FAF9F5",
  ink: "#1C2621",
  inkSoft: "#5B6660",
  accent: "#2F6F62",
  accentSoft: "#E4EEE9",
  gold: "#C98A3E",
  line: "#DAD6CB",
  card: "#FFFFFF",
};

const styles = {
  page: { background: tokens.bg, color: tokens.ink, fontFamily: "'Inter', sans-serif", minHeight: "100vh", width: "100%" },
  layout: { display: "flex", flexWrap: "wrap", maxWidth: "1100px", margin: "0 auto", gap: "48px", padding: "48px 24px" },
  sidebar: { flex: "1 1 260px", maxWidth: "300px", display: "flex", flexDirection: "column", justifyContent: "space-between", position: "sticky", top: "24px", alignSelf: "flex-start", minHeight: "calc(100vh - 96px)" },
  mark: { width: "44px", height: "44px", borderRadius: "50%", background: tokens.ink, color: tokens.bg, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Fraunces', serif", fontSize: "15px", marginBottom: "24px" },
  name: { fontFamily: "'Fraunces', serif", fontSize: "clamp(28px, 4vw, 36px)", fontWeight: 500, margin: "0 0 4px 0", lineHeight: 1.1 },
  role: { fontSize: "13px", letterSpacing: "0.02em", color: tokens.accent, margin: "0 0 20px 0", textTransform: "capitalize" },
  bio: { fontSize: "15px", lineHeight: 1.6, color: tokens.inkSoft, maxWidth: "34ch" },
  nav: { display: "flex", flexDirection: "column", gap: "10px", margin: "40px 0" },
  navLink: { color: tokens.ink, textDecoration: "none", fontSize: "15px", borderBottom: "1px solid transparent", width: "fit-content", paddingBottom: "2px" },
  socialRow: { display: "flex", gap: "16px", flexWrap: "wrap" },
  socialLink: { fontSize: "13px", color: tokens.inkSoft, textDecoration: "none", borderBottom: `1px solid ${tokens.line}` },
  main: { flex: "3 1 500px", minWidth: "0" },
  section: { marginBottom: "72px" },
  sectionLabelRow: { display: "flex", alignItems: "baseline", gap: "12px", marginBottom: "28px", borderBottom: `1px solid ${tokens.line}`, paddingBottom: "12px" },
  sectionIndex: { fontFamily: "'Fraunces', serif", fontSize: "14px", color: tokens.gold },
  sectionTitle: { fontFamily: "'Fraunces', serif", fontSize: "22px", fontWeight: 500, margin: 0 },
  projectList: { display: "flex", flexDirection: "column", gap: "20px" },
  projectCard: { border: `1px solid ${tokens.line}`, borderRadius: "6px", padding: "24px", background: tokens.card, transition: "border-color 0.15s ease" },
  projectHeadRow: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px", marginBottom: "10px" },
  projectTitle: { fontFamily: "'Fraunces', serif", fontSize: "19px", fontWeight: 500, margin: 0 },
  featuredTag: { fontSize: "11px", color: tokens.accent, background: tokens.accentSoft, padding: "3px 9px", borderRadius: "20px", whiteSpace: "nowrap" },
  projectDesc: { fontSize: "15px", lineHeight: 1.6, color: tokens.inkSoft, margin: "0 0 16px 0" },
  tagRow: { display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "14px" },
  tag: { fontSize: "12px", color: tokens.ink, border: `1px solid ${tokens.line}`, borderRadius: "20px", padding: "3px 10px" },
  projectLink: { fontSize: "14px", color: tokens.accent, textDecoration: "none" },
  skillGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "28px" },
  skillCategory: { fontSize: "13px", color: tokens.gold, margin: "0 0 12px 0", fontWeight: 600 },
  skillList: { listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "8px" },
  skillItem: { fontSize: "15px", color: tokens.ink },
  timeline: { display: "flex", flexDirection: "column", gap: "22px" },
  timelineRow: { display: "grid", gridTemplateColumns: "150px 1fr", gap: "16px", borderBottom: `1px solid ${tokens.line}`, paddingBottom: "18px" },
  timelineDate: { fontSize: "13px", color: tokens.inkSoft },
  timelineTitle: { fontSize: "16px", fontWeight: 500, margin: "0 0 4px 0" },
  timelineSub: { fontSize: "14px", color: tokens.inkSoft, margin: 0 },
  testimonialList: { display: "flex", flexDirection: "column", gap: "24px" },
  testimonial: { margin: 0, padding: "24px", background: tokens.card, border: `1px solid ${tokens.line}`, borderRadius: "6px" },
  testimonialMessage: { fontFamily: "'Fraunces', serif", fontSize: "18px", fontStyle: "italic", lineHeight: 1.5, margin: "0 0 12px 0" },
  testimonialFooter: { fontSize: "13px", color: tokens.inkSoft },
  form: { display: "flex", flexDirection: "column", gap: "18px", maxWidth: "480px" },
  formLabel: { display: "flex", flexDirection: "column", gap: "6px", fontSize: "13px", color: tokens.inkSoft },
  formInput: { fontFamily: "'Inter', sans-serif", fontSize: "15px", padding: "10px 12px", border: `1px solid ${tokens.line}`, borderRadius: "4px", background: tokens.card, color: tokens.ink, outline: "none" },
  submitButton: { fontFamily: "'Inter', sans-serif", fontSize: "15px", fontWeight: 600, background: tokens.ink, color: tokens.bg, border: "none", borderRadius: "4px", padding: "12px 20px", cursor: "pointer", width: "fit-content" },
  confirmMessage: { fontSize: "15px", color: tokens.accent },
  footer: { display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "8px", fontSize: "12px", color: tokens.inkSoft, borderTop: `1px solid ${tokens.line}`, paddingTop: "20px" },
};
```

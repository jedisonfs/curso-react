import { useState } from "react";

const phases = [
    {
        id: 1,
        name: "Fase 1 — Fundamentos Sólidos",
        duration: "8–10 semanas",
        color: "#00D4FF",
        accent: "#003344",
        topics: ["Concurrencia en Java", "Bases de Datos", "Docker"],
        books: [
            "Java Concurrency in Practice — Peierls, Bloch et al.",
            "Bases de datos teoría y práctica — Socas, Maho, Gómez",
        ],
        project: {
            name: "📦 Sistema de Inventario (Monolito)",
            desc: "Aplicación Java monolítica con Spring Boot. Gestión de productos, stock y órdenes. Base de datos PostgreSQL + Redis para caché. Operaciones concurrentes al actualizar stock. Dockerizado desde el inicio.",
            skills: ["Spring Boot", "Concurrencia (locks, threads)", "PostgreSQL", "Redis", "Docker Compose"],
            why: "Construyes la base que luego migrarás a microservicios en Fase 3. Aprenderás los dolores del monolito en carne propia.",
        },
        reading: [
            "Java Concurrency in Practice: Cap 1–5 (fundamentos, seguridad de threads, composición de objetos)",
            "BD: Cap 1–6 (modelo relacional, SQL básico y avanzado, normalización)",
            "Effective Java: Cap 1–3 (creación de objetos, métodos comunes)",
        ],
    },
    {
        id: 2,
        name: "Fase 2 — Reactividad y Frontend",
        duration: "8–10 semanas",
        color: "#A78BFA",
        accent: "#1a0a3a",
        topics: ["Spring WebFlux", "TypeScript", "BD NoSQL"],
        books: [
            "Documentación oficial Spring WebFlux",
            "TypeScript Handbook (oficial — gratis online)",
        ],
        project: {
            name: "🔔 Sistema de Notificaciones en Tiempo Real",
            desc: "Servicio reactivo con Spring WebFlux + WebSockets. Frontend en TypeScript puro. MongoDB para almacenar eventos/notificaciones. Streams de eventos en tiempo real entre usuarios.",
            skills: ["Spring WebFlux", "Reactor (Mono/Flux)", "WebSockets", "TypeScript", "MongoDB"],
            why: "WebFlux se entiende mejor con casos de uso real-time. TypeScript lo aprendes construyendo el cliente. MongoDB es natural para eventos/logs.",
        },
        reading: [
            "Spring WebFlux docs: Reactive Core, WebClient, WebSockets",
            "TypeScript Handbook: Types, Interfaces, Generics, Async/Await",
            "BD: Cap 7–10 (NoSQL, MongoDB, comparación relacional vs documental)",
        ],
    },
    {
        id: 3,
        name: "Fase 3 — Arquitectura y Distribución",
        duration: "10–12 semanas",
        color: "#34D399",
        accent: "#002211",
        topics: ["Diseño de Sistemas", "CI/CD", "Microservicios"],
        books: [
            "Microservices Patterns — Chris Richardson",
            "karanpratapsingh.com/courses/system-design",
        ],
        project: {
            name: "🔀 Migración: Inventario Monolito → Microservicios",
            desc: "Tomas el proyecto de Fase 1 y lo descompones. Servicio de productos, servicio de órdenes, servicio de notificaciones (Fase 2). API Gateway, service discovery, comunicación async con Kafka/RabbitMQ. Pipeline CI/CD completo con GitHub Actions.",
            skills: ["Microservicios", "API Gateway", "Message Brokers", "GitHub Actions", "Docker Swarm / K8s básico"],
            why: "Entiendes los trade-offs reales: qué ganas y qué pierdes al migrar. Es el camino más valioso de aprendizaje.",
        },
        reading: [
            "Microservices Patterns: Cap 1–4 (decomposición, comunicación, sagas)",
            "System Design Course: Todos los módulos — 1 por semana",
            "Effective Java: Cap 4–8 (clases, interfaces, lambdas, métodos)",
        ],
    },
];

const monoVsMicro = {
    verdict: "✅ Excelente idea — con una condición",
    points: [
        {
            icon: "🧠",
            title: "Aprenderás los dolores reales",
            desc: "Construir el monolito primero te hace sentir sus limitaciones: acoplamiento, escalado difícil, despliegues riesgosos. Sin eso, los microservicios son solo teoría.",
        },
        {
            icon: "📚",
            title: "Refuerza todos los libros a la vez",
            desc: "Richardson explica microservicios asumiendo que ya viviste los problemas del monolito. Leerás sus patrones con contexto real.",
        },
        {
            icon: "🔁",
            title: "Reutilizas el trabajo",
            desc: "No empiezas desde cero en Fase 3. Refactorizas algo que ya conoces, lo que hace más claro qué y por qué cambias cada parte.",
        },
        {
            icon: "⚠️",
            title: "La condición: documenta la arquitectura desde el día 1",
            desc: "Escribe un README arquitectural del monolito antes de migrar. Eso te enseña a razonar el diseño de sistemas, no solo a codear.",
        },
    ],
};

const extraProjects = [
    {
        name: "🔐 Auth Service",
        topics: ["JWT", "Spring Security", "TypeScript frontend", "PostgreSQL"],
        desc: "Servicio de autenticación independiente. Perfecto para practicar seguridad, tokens y sesiones distribuidas.",
    },
    {
        name: "📊 Dashboard de Analytics",
        topics: ["Spring WebFlux", "MongoDB", "TypeScript + Chart.js", "Docker"],
        desc: "Ingesta de eventos en tiempo real, consultas agregadas en MongoDB, visualización reactiva en frontend TS.",
    },
    {
        name: "🤖 Job Queue Processor",
        topics: ["Concurrencia Java", "RabbitMQ", "Docker", "CI/CD"],
        desc: "Workers concurrentes que procesan tareas de una cola. Ideal para practicar thread pools, ExecutorService y mensajería.",
    },
];

const readingTips = [
    { icon: "📖", tip: "Lee un capítulo, luego codea algo relacionado el mismo día. No acumules lectura sin práctica." },
    { icon: "🗒️", tip: "Lleva un archivo de notas por libro. Una línea por concepto importante, con un ejemplo tuyo." },
    { icon: "🔗", tip: "Conecta lo que lees con tu proyecto activo. ¿Qué parte del proyecto usa este concepto?" },
    { icon: "⏱️", tip: "30 min de lectura + 1h de código por sesión. Es más efectivo que 2h solo leyendo." },
    { icon: "🔄", tip: "Cada 2 semanas, revisa tus notas y refactoriza algo del proyecto basándote en lo aprendido." },
];

const StudyPlan = () => {
    const [activePhase, setActivePhase] = useState(1);
    const [tab, setTab] = useState("plan");

    const phase = phases.find((p) => p.id === activePhase);

    return (
        <div style={{
            fontFamily: "'DM Mono', 'Fira Code', monospace",
            background: "#0a0a0f",
            minHeight: "100vh",
            color: "#e2e8f0",
            padding: "0",
        }}>
            {/* Header */}
            <div style={{
                background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)",
                borderBottom: "1px solid #1e293b",
                padding: "40px 32px 32px",
                position: "relative",
                overflow: "hidden",
            }}>
                <div style={{
                    position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
                    backgroundImage: "radial-gradient(circle at 20% 50%, rgba(167,139,250,0.08) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(0,212,255,0.06) 0%, transparent 40%)",
                }} />
                <div style={{ position: "relative",  maxWidth: '100%', margin: "0 auto" }}>
                    <div style={{ fontSize: 11, letterSpacing: "0.2em", color: "#64748b", marginBottom: 8, textTransform: "uppercase" }}>
                        Plan de Desarrollo — 2025
                    </div>
                    <h1 style={{
                        fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 700,
                        background: "linear-gradient(90deg, #e2e8f0, #a78bfa, #00d4ff)",
                        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                        margin: "0 0 12px", lineHeight: 1.2,
                    }}>
                        De Developer a Arquitecto
                    </h1>
                    <p style={{ color: "#64748b", fontSize: 14, margin: 0, lineHeight: 1.6 }}>
                        3 fases · 7 tecnologías · 1 proyecto evolutivo · ~30 semanas
                    </p>
                </div>
            </div>

            {/* Nav tabs */}
            <div style={{
                display: "flex", gap: 4, padding: "16px 32px 0",
                borderBottom: "1px solid #1e293b",  maxWidth: '100%', margin: "0 auto",
            }}>
                {[
                    { id: "plan", label: "🗺️ Fases" },
                    { id: "monolito", label: "🔀 Monolito→Micro" },
                    { id: "extras", label: "💡 Más Proyectos" },
                    { id: "lectura", label: "📚 Cómo Leer" },
                ].map((t) => (
                    <button key={t.id} onClick={() => setTab(t.id)} style={{
                        background: tab === t.id ? "#1e293b" : "transparent",
                        border: "none", borderBottom: tab === t.id ? "2px solid #a78bfa" : "2px solid transparent",
                        color: tab === t.id ? "#e2e8f0" : "#475569",
                        padding: "10px 16px", cursor: "pointer", fontSize: 13,
                        fontFamily: "inherit", borderRadius: "4px 4px 0 0",
                        transition: "all 0.15s",
                    }}>{t.label}</button>
                ))}
            </div>

            <div style={{  maxWidth: '100%' , margin: "0 auto", padding: "24px 32px 48px" }}>

                {/* PLAN FASES */}
                {tab === "plan" && (
                    <div>
                        {/* Phase selector */}
                        <div style={{ display: "flex", gap: 12, marginBottom: 24, flexWrap: "wrap" }}>
                            {phases.map((p) => (
                                <button key={p.id} onClick={() => setActivePhase(p.id)} style={{
                                    background: activePhase === p.id ? p.color + "22" : "#0f172a",
                                    border: `1px solid ${activePhase === p.id ? p.color : "#1e293b"}`,
                                    color: activePhase === p.id ? p.color : "#64748b",
                                    padding: "10px 20px", borderRadius: 8, cursor: "pointer",
                                    fontSize: 13, fontFamily: "inherit",
                                    transition: "all 0.2s",
                                }}>
                                    <span style={{ fontWeight: 700 }}>Fase {p.id}</span>
                                    <span style={{ marginLeft: 8, opacity: 0.7 }}>{p.duration}</span>
                                </button>
                            ))}
                        </div>

                        {phase && (
                            <div>
                                {/* Phase header */}
                                <div style={{
                                    background: `linear-gradient(135deg, ${phase.accent} 0%, #0f172a 100%)`,
                                    border: `1px solid ${phase.color}33`,
                                    borderRadius: 12, padding: "24px 28px", marginBottom: 20,
                                }}>
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>
                                        <div>
                                            <h2 style={{ color: phase.color, margin: "0 0 8px", fontSize: 20, fontWeight: 700 }}>{phase.name}</h2>
                                            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                                                {phase.topics.map((t) => (
                                                    <span key={t} style={{
                                                        background: phase.color + "22", border: `1px solid ${phase.color}44`,
                                                        color: phase.color, padding: "2px 10px", borderRadius: 20, fontSize: 12,
                                                    }}>{t}</span>
                                                ))}
                                            </div>
                                        </div>
                                        <div style={{
                                            background: phase.color + "11", border: `1px solid ${phase.color}33`,
                                            borderRadius: 8, padding: "8px 16px", textAlign: "center",
                                        }}>
                                            <div style={{ color: phase.color, fontSize: 18, fontWeight: 700 }}>{phase.duration}</div>
                                            <div style={{ color: "#475569", fontSize: 11 }}>duración estimada</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Project card */}
                                <div style={{
                                    background: "#0f172a", border: "1px solid #1e293b",
                                    borderLeft: `4px solid ${phase.color}`,
                                    borderRadius: 12, padding: "24px 28px", marginBottom: 20,
                                }}>
                                    <div style={{ fontSize: 11, letterSpacing: "0.15em", color: "#475569", marginBottom: 8, textTransform: "uppercase" }}>Proyecto Principal</div>
                                    <h3 style={{ color: "#e2e8f0", margin: "0 0 10px", fontSize: 18 }}>{phase.project.name}</h3>
                                    <p style={{ color: "#94a3b8", fontSize: 14, lineHeight: 1.7, margin: "0 0 16px" }}>{phase.project.desc}</p>
                                    <div style={{ background: phase.color + "08", border: `1px solid ${phase.color}22`, borderRadius: 8, padding: "12px 16px", marginBottom: 12 }}>
                                        <div style={{ color: "#64748b", fontSize: 11, marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.1em" }}>Stack / Skills</div>
                                        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                                            {phase.project.skills.map((s) => (
                                                <span key={s} style={{ background: "#1e293b", color: "#cbd5e1", padding: "3px 10px", borderRadius: 6, fontSize: 12 }}>{s}</span>
                                            ))}
                                        </div>
                                    </div>
                                    <div style={{ color: "#64748b", fontSize: 13, fontStyle: "italic" }}>💬 {phase.project.why}</div>
                                </div>

                                {/* Reading plan */}
                                <div style={{
                                    background: "#0f172a", border: "1px solid #1e293b",
                                    borderRadius: 12, padding: "24px 28px",
                                }}>
                                    <div style={{ fontSize: 11, letterSpacing: "0.15em", color: "#475569", marginBottom: 16, textTransform: "uppercase" }}>Plan de Lectura — Fase {phase.id}</div>
                                    {phase.reading.map((r, i) => (
                                        <div key={i} style={{
                                            display: "flex", gap: 12, padding: "10px 0",
                                            borderBottom: i < phase.reading.length - 1 ? "1px solid #1e293b" : "none",
                                        }}>
                                            <span style={{ color: phase.color, fontSize: 14, minWidth: 20 }}>→</span>
                                            <span style={{ color: "#94a3b8", fontSize: 14, lineHeight: 1.6 }}>{r}</span>
                                        </div>
                                    ))}
                                    <div style={{ marginTop: 16 }}>
                                        <div style={{ fontSize: 11, letterSpacing: "0.1em", color: "#475569", marginBottom: 10, textTransform: "uppercase" }}>Libros de referencia</div>
                                        {phase.books.map((b, i) => (
                                            <div key={i} style={{ color: "#64748b", fontSize: 13, padding: "4px 0" }}>📕 {b}</div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* MONOLITO vs MICRO */}
                {tab === "monolito" && (
                    <div>
                        <div style={{
                            background: "linear-gradient(135deg, #022c1a 0%, #0f172a 100%)",
                            border: "1px solid #34d39933", borderRadius: 12,
                            padding: "24px 28px", marginBottom: 20,
                        }}>
                            <div style={{ fontSize: 11, letterSpacing: "0.15em", color: "#475569", marginBottom: 8, textTransform: "uppercase" }}>Veredicto</div>
                            <h2 style={{ color: "#34d399", margin: 0, fontSize: 20 }}>{monoVsMicro.verdict}</h2>
                        </div>
                        <div style={{ display: "grid", gap: 16 }}>
                            {monoVsMicro.points.map((p, i) => (
                                <div key={i} style={{
                                    background: "#0f172a", border: "1px solid #1e293b",
                                    borderRadius: 12, padding: "20px 24px",
                                    display: "flex", gap: 16,
                                }}>
                                    <span style={{ fontSize: 24, minWidth: 32 }}>{p.icon}</span>
                                    <div>
                                        <div style={{ color: "#e2e8f0", fontWeight: 600, marginBottom: 6, fontSize: 15 }}>{p.title}</div>
                                        <div style={{ color: "#64748b", fontSize: 14, lineHeight: 1.7 }}>{p.desc}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div style={{
                            background: "#0f172a", border: "1px solid #34d39933",
                            borderRadius: 12, padding: "20px 24px", marginTop: 20,
                        }}>
                            <div style={{ color: "#34d399", fontWeight: 600, marginBottom: 8 }}>🗺️ El camino concreto</div>
                            <div style={{ display: "flex", alignItems: "center", gap: 0, flexWrap: "wrap" }}>
                                {["Monolito (Fase 1)", "→", "Añadir WebFlux (Fase 2)", "→", "Descomponer en Micros (Fase 3)", "→", "CI/CD + K8s"].map((step, i) => (
                                    <span key={i} style={{
                                        color: step === "→" ? "#334155" : "#94a3b8",
                                        background: step === "→" ? "transparent" : "#1e293b",
                                        padding: step === "→" ? "0 8px" : "6px 12px",
                                        borderRadius: step === "→" ? 0 : 6,
                                        fontSize: 13, margin: "4px 4px",
                                    }}>{step}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* EXTRA PROJECTS */}
                {tab === "extras" && (
                    <div>
                        <p style={{ color: "#64748b", fontSize: 14, marginBottom: 20, lineHeight: 1.7 }}>
                            Proyectos complementarios para practicar temas específicos cuando quieras profundizar más allá de los proyectos principales.
                        </p>
                        <div style={{ display: "grid", gap: 16 }}>
                            {extraProjects.map((p, i) => (
                                <div key={i} style={{
                                    background: "#0f172a", border: "1px solid #1e293b",
                                    borderRadius: 12, padding: "24px",
                                }}>
                                    <h3 style={{ color: "#e2e8f0", margin: "0 0 8px", fontSize: 17 }}>{p.name}</h3>
                                    <p style={{ color: "#64748b", fontSize: 14, margin: "0 0 16px", lineHeight: 1.6 }}>{p.desc}</p>
                                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                                        {p.topics.map((t) => (
                                            <span key={t} style={{ background: "#1e293b", color: "#94a3b8", padding: "3px 10px", borderRadius: 6, fontSize: 12 }}>{t}</span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* LECTURA */}
                {tab === "lectura" && (
                    <div>
                        <p style={{ color: "#64748b", fontSize: 14, marginBottom: 20, lineHeight: 1.7 }}>
                            La trampa más común: leer mucho y codear poco. Esta estrategia lo equilibra.
                        </p>
                        <div style={{ display: "grid", gap: 12, marginBottom: 28 }}>
                            {readingTips.map((t, i) => (
                                <div key={i} style={{
                                    background: "#0f172a", border: "1px solid #1e293b",
                                    borderRadius: 10, padding: "16px 20px",
                                    display: "flex", gap: 14,
                                }}>
                                    <span style={{ fontSize: 22 }}>{t.icon}</span>
                                    <span style={{ color: "#94a3b8", fontSize: 14, lineHeight: 1.7 }}>{t.tip}</span>
                                </div>
                            ))}
                        </div>
                        <div style={{
                            background: "#0f172a", border: "1px solid #a78bfa33",
                            borderRadius: 12, padding: "24px",
                        }}>
                            <div style={{ color: "#a78bfa", fontWeight: 600, marginBottom: 16 }}>📅 Rutina semanal sugerida</div>
                            {[
                                { day: "Lun / Mié / Vie", action: "30 min lectura + aplica lo leído al proyecto activo" },
                                { day: "Mar / Jue", action: "1.5–2h de código puro en el proyecto principal" },
                                { day: "Sábado", action: "Revisión: ¿qué aprendí esta semana? Notas + refactor" },
                                { day: "Domingo", action: "Descanso. No hay aprendizaje sostenible sin recuperación" },
                            ].map((r, i) => (
                                <div key={i} style={{
                                    display: "flex", gap: 16, padding: "10px 0",
                                    borderBottom: i < 3 ? "1px solid #1e293b" : "none",
                                }}>
                                    <span style={{ color: "#a78bfa", fontSize: 13, minWidth: 130 }}>{r.day}</span>
                                    <span style={{ color: "#64748b", fontSize: 13 }}>{r.action}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default StudyPlan;
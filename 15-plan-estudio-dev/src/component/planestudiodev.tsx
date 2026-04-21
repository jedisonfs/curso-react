import { useState } from "react";

const phases = [
    {
        id: 0,
        name: "Pre-Fase — Estructuras de Datos",
        duration: "2 semanas",
        color: "#F59E0B",
        accent: "#1c1000",
        topics: ["Colecciones Java", "Complejidad O(n)", "LeetCode"],
        books: [
            "Grokking Algorithms — Aditya Bhargava",
            "Documentación oficial java.util (Collections Framework)",
        ],
        project: {
            name: "Sprint de estructuras de datos",
            desc: "No es un proyecto de aplicación — es un sprint de ejercicios deliberados. Resolver 20–30 problemas en LeetCode (Easy/Medium) usando Java, enfocados exclusivamente en elegir la estructura correcta: cuándo HashMap vs TreeMap vs LinkedHashMap, ArrayList vs LinkedList, HashSet vs PriorityQueue. El objetivo no es algoritmos competitivos sino construir intuición de elección.",
            skills: ["HashMap / TreeMap / LinkedHashMap", "ArrayList / LinkedList", "HashSet / PriorityQueue", "Complejidad temporal O(1) O(log n) O(n)", "LeetCode Easy-Medium"],
            why: "Esta es la brecha más peligrosa detectada en el quiz. Un developer que no tiene claro qué estructura usar toma decisiones subóptimas silenciosas — el código funciona pero es 10x más lento. Se aprende rápido con práctica deliberada.",
        },
        reading: [
            "Grokking Algorithms: Cap 1–6 (búsqueda binaria, arrays, listas, hash tables, grafos básicos)",
            "Effective Java: Cap 1–2 (repaso rápido de creación de objetos)",
            "Documentación java.util: Collection, Map, List, Set — leer los javadocs completos",
        ],
        additions: [],
    },
    {
        id: 1,
        name: "Fase 1 — Fundamentos Sólidos",
        duration: "10–12 semanas",
        color: "#00D4FF",
        accent: "#003344",
        topics: ["Concurrencia en Java", "Bases de Datos", "Docker", "Hibernate/JPA"],
        books: [
            "Java Concurrency in Practice — Peierls, Bloch et al.",
            "Bases de datos teoría y práctica — Socas, Maho, Gómez",
            "High-Performance Java Persistence — Mihalcea (caps 5–9)",
        ],
        project: {
            name: "Sistema de Inventario (Monolito)",
            desc: "Aplicación Java monolítica con Spring Boot. Gestión de productos, stock y órdenes. Base de datos PostgreSQL + Redis para caché. Operaciones concurrentes al actualizar stock. Dockerizado desde el inicio.",
            skills: ["Spring Boot", "Concurrencia (locks, threads)", "PostgreSQL", "Redis", "Docker Compose", "Hibernate/JPA", "N+1 resolution"],
            why: "Construyes la base que luego migrarás a microservicios en Fase 3. Aprenderás los dolores del monolito en carne propia.",
        },
        reading: [
            "Java Concurrency in Practice: Cap 1–5 (fundamentos, seguridad de threads, composición de objetos)",
            "BD: Cap 1–6 (modelo relacional, SQL básico y avanzado, normalización)",
            "Effective Java: Cap 1–3 (creación de objetos, métodos comunes)",
            "High-Performance Java Persistence: Cap 5–9 (fetching, N+1, transacciones)",
        ],
        additions: [
            {
                type: "add",
                label: "Nuevo — semanas 1–2",
                text: "Mini-proyecto de concurrencia antes del monolito: simulador de banco con N hilos haciendo transferencias simultáneas. Reproduce race conditions a propósito con synchronized incorrecto, las observas fallar, y las corriges con ReentrantLock y ExecutorService. Esto da contexto real al libro antes de leerlo.",
            },
            {
                type: "add",
                label: "Nuevo — semana 6",
                text: "Semana dedicada a Hibernate bajo el capó: activar show_sql=true, observar todas las queries generadas por el ORM, identificar el problema N+1 en las relaciones del inventario, y resolverlo con JOIN FETCH y @EntityGraph. Sin esta semana el ORM es una caja negra.",
            },
            {
                type: "mod",
                label: "Modificado",
                text: "Duración ampliada de 8–10 a 10–12 semanas para acomodar el mini-proyecto de concurrencia y la semana de Hibernate. Agregar High-Performance Java Persistence (caps 5–9) como lectura de referencia para la parte de persistencia.",
            },
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
            name: "Sistema de Notificaciones en Tiempo Real",
            desc: "Servicio reactivo con Spring WebFlux + WebSockets. Frontend en TypeScript puro. MongoDB para almacenar eventos/notificaciones. Streams de eventos en tiempo real entre usuarios.",
            skills: ["Spring WebFlux", "Reactor (Mono/Flux)", "WebSockets", "TypeScript", "MongoDB"],
            why: "WebFlux se entiende mejor con casos de uso real-time. TypeScript lo aprendes construyendo el cliente. MongoDB es natural para eventos/logs.",
        },
        reading: [
            "Spring WebFlux docs: Reactive Core, WebClient, WebSockets",
            "TypeScript Handbook: Types, Interfaces, Generics, Async/Await",
            "BD: Cap 7–10 (NoSQL, MongoDB, comparación relacional vs documental)",
        ],
        additions: [],
    },
    {
        id: 3,
        name: "Fase 3 — Arquitectura y Distribución",
        duration: "12–14 semanas",
        color: "#34D399",
        accent: "#002211",
        topics: ["Diseño de Sistemas", "CI/CD", "Microservicios", "Saga Pattern", "Java 21"],
        books: [
            "Microservices Patterns — Chris Richardson",
            "karanpratapsingh.com/courses/system-design",
        ],
        project: {
            name: "Migración: Inventario Monolito → Microservicios",
            desc: "Tomas el proyecto de Fase 1 y lo descompones. Servicio de productos, servicio de órdenes, servicio de notificaciones (Fase 2). API Gateway, service discovery, comunicación async con Kafka. Pipeline CI/CD completo con GitHub Actions. Implementación del patrón Saga Orchestration para las transacciones distribuidas de órdenes. Al final, migración a Virtual Threads de Java 21 con comparativa de métricas.",
            skills: ["Microservicios", "API Gateway", "Kafka", "GitHub Actions", "Docker Swarm / K8s básico", "Saga Orchestration", "Virtual Threads Java 21"],
            why: "Entiendes los trade-offs reales: qué ganas y qué pierdes al migrar. Implementar Saga te da el patrón más exigido en entrevistas Senior. Virtual Threads en Java 21 es ya requisito diferenciador en el mercado.",
        },
        reading: [
            "Microservices Patterns: Cap 1–4 (decomposición, comunicación, sagas)",
            "Microservices Patterns: Cap 5–6 (Saga pattern en detalle — Choreography vs Orchestration)",
            "System Design Course: Todos los módulos — 1 por semana",
            "Effective Java: Cap 4–8 (clases, interfaces, lambdas, métodos)",
            "Documentación oficial Java 21: Virtual Threads (Project Loom)",
        ],
        additions: [
            {
                type: "mod",
                label: "Modificado",
                text: "Duración ampliada de 10–12 a 12–14 semanas. Agregar 2 semanas para implementar Saga Orchestration usando Kafka como broker sobre la migración del monolito. No es teórico — los servicios ya existen, se agrega el patrón encima.",
            },
            {
                type: "add",
                label: "Nuevo — semanas finales",
                text: "Una semana final para migrar el servicio de órdenes a Virtual Threads (Java 21). Comparar throughput con JMeter o Gatling antes y después. Documentar las métricas en el README. Esto suma un punto diferenciador real en el CV para posiciones Senior.",
            },
            {
                type: "add",
                label: "Nuevo — README arquitectural",
                text: "Antes de iniciar la migración, escribir un README arquitectural del monolito: diagrama de componentes, decisiones de diseño tomadas, limitaciones encontradas. Esto entrena el razonamiento de diseño de sistemas, no solo el código.",
            },
        ],
    },
];

const weakAreas = [
    {
        id: 1,
        severity: "critical",
        name: "Estructuras de datos — HashMap y colecciones",
        phase: "Pre-Fase",
        desc: "No tener claro cuándo usar cada estructura es una brecha fundamental. En entrevistas Senior siempre preguntan complejidad O(n) y elección de estructura. El plan original no tenía un módulo dedicado a esto.",
        tags: ["HashMap vs TreeMap vs LinkedHashMap", "ArrayList vs LinkedList", "Complejidad temporal", "HashSet / PriorityQueue"],
        fix: "Agregada Pre-Fase de 2 semanas con Grokking Algorithms + 20-30 ejercicios LeetCode en Java.",
        action: "Explícame HashMap vs TreeMap vs LinkedHashMap con ejemplos de código Java y cuándo usar cada uno.",
    },
    {
        id: 2,
        severity: "critical",
        name: "Concurrencia — locks, threads, ExecutorService",
        phase: "Fase 1",
        desc: 'El plan incluye "Java Concurrency in Practice" que es el libro correcto — pero sin un mini-proyecto dedicado exclusivamente a concurrencia, el libro solo queda como teoría. Necesitas código que falle y que arregles.',
        tags: ["synchronized vs ReentrantLock", "ExecutorService", "CompletableFuture", "Race conditions"],
        fix: "Agregado mini-proyecto de simulador bancario concurrente en semanas 1–2 de Fase 1 antes del monolito.",
        action: "Dame un ejercicio práctico de concurrencia en Java para reproducir y resolver una race condition con un simulador de transferencias bancarias.",
    },
    {
        id: 3,
        severity: "improve",
        name: "Hibernate / JPA — N+1, transacciones, fetch",
        phase: "Fase 1",
        desc: "El problema N+1 y el manejo de transacciones aparecen constantemente en código de producción y en entrevistas. El plan usaba JPA en el proyecto pero no dedicaba tiempo a entender el comportamiento del ORM bajo el capó.",
        tags: ["N+1 y JOIN FETCH", "@Transactional y self-invocation", "FetchType LAZY vs EAGER", "EntityGraph"],
        fix: "Agregada semana 6 de Fase 1 dedicada a Hibernate show_sql, identificación y resolución del N+1. Nuevo libro: High-Performance Java Persistence caps 5–9.",
        action: "Explícame el problema N+1 en Hibernate con un ejemplo real y cómo resolverlo con JOIN FETCH y EntityGraph.",
    },
    {
        id: 4,
        severity: "improve",
        name: "Arquitectura distribuida — Saga, CQRS, patrones",
        phase: "Fase 3",
        desc: "El libro de Richardson lo cubre, pero los patrones de transacciones distribuidas (Saga Choreography vs Orchestration) son de los temas más exigentes en entrevistas Senior. Necesitaba tiempo adicional aquí.",
        tags: ["Saga Choreography", "Saga Orchestration", "CQRS básico", "Compensating transactions"],
        fix: "Fase 3 ampliada con 2 semanas extra para implementar Saga Orchestration con Kafka en el proyecto de migración. Lectura agregada: Richardson caps 5–6.",
        action: "Explícame el patrón Saga Orchestration vs Choreography con un ejemplo de código Java usando Kafka.",
    },
    {
        id: 5,
        severity: "improve",
        name: "JVM y rendimiento — GC, Virtual Threads, profiling",
        phase: "Fase 3",
        desc: "Java 21 con Virtual Threads ya es requisito en ofertas Senior actuales. El plan no mencionaba Java 21+ explícitamente y no incluía ninguna actividad de profiling o análisis de GC.",
        tags: ["G1GC vs ZGC", "Virtual Threads (Java 21)", "JVM tuning básico", "Profiling con VisualVM"],
        fix: "Agregada semana final de Fase 3 para migrar a Virtual Threads y comparar métricas de throughput antes/después con JMeter.",
        action: "Explícame Virtual Threads de Java 21 y cómo migrar un servicio Spring Boot existente para usarlos.",
    },
];

const monoVsMicro = {
    verdict: "Excelente idea — con una condición",
    points: [
        {
            icon: "brain",
            title: "Aprenderás los dolores reales",
            desc: "Construir el monolito primero te hace sentir sus limitaciones: acoplamiento, escalado difícil, despliegues riesgosos. Sin eso, los microservicios son solo teoría.",
        },
        {
            icon: "book",
            title: "Refuerza todos los libros a la vez",
            desc: "Richardson explica microservicios asumiendo que ya viviste los problemas del monolito. Leerás sus patrones con contexto real.",
        },
        {
            icon: "loop",
            title: "Reutilizas el trabajo",
            desc: "No empiezas desde cero en Fase 3. Refactorizas algo que ya conoces, lo que hace más claro qué y por qué cambias cada parte.",
        },
        {
            icon: "warn",
            title: "La condición: documenta la arquitectura desde el día 1",
            desc: "Escribe un README arquitectural del monolito antes de migrar. Eso te enseña a razonar el diseño de sistemas, no solo a codear.",
        },
    ],
};

const extraProjects = [
    {
        name: "Auth Service",
        topics: ["JWT", "Spring Security", "TypeScript frontend", "PostgreSQL"],
        desc: "Servicio de autenticación independiente. Perfecto para practicar seguridad, tokens y sesiones distribuidas.",
    },
    {
        name: "Dashboard de Analytics",
        topics: ["Spring WebFlux", "MongoDB", "TypeScript + Chart.js", "Docker"],
        desc: "Ingesta de eventos en tiempo real, consultas agregadas en MongoDB, visualización reactiva en frontend TS.",
    },
    {
        name: "Job Queue Processor",
        topics: ["Concurrencia Java", "RabbitMQ", "Docker", "CI/CD"],
        desc: "Workers concurrentes que procesan tareas de una cola. Ideal para practicar thread pools, ExecutorService y mensajería.",
    },
];

const readingTips = [
    { tip: "Lee un capítulo, luego codea algo relacionado el mismo día. No acumules lectura sin práctica." },
    { tip: "Lleva un archivo de notas por libro. Una línea por concepto importante, con un ejemplo tuyo." },
    { tip: "Conecta lo que lees con tu proyecto activo. ¿Qué parte del proyecto usa este concepto?" },
    { tip: "30 min de lectura + 1h de código por sesión. Es más efectivo que 2h solo leyendo." },
    { tip: "Cada 2 semanas, revisa tus notas y refactoriza algo del proyecto basándote en lo aprendido." },
];

const phaseColors = {
    0: "#F59E0B",
    1: "#00D4FF",
    2: "#A78BFA",
    3: "#34D399",
};

const StudyPlan = () => {
    const [activePhase, setActivePhase] = useState(1);
    const [tab, setTab] = useState("weaknesses");

    const phase = phases.find((p) => p.id === activePhase);

    const S = {
        wrap: {
            fontFamily: "'DM Mono', 'Fira Code', monospace",
            background: "#0a0a0f",
            minHeight: "100vh",
            color: "#e2e8f0",
        },
        header: {
            background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)",
            borderBottom: "1px solid #1e293b",
            padding: "36px 28px 28px",
        },
        eyebrow: { fontSize: 11, letterSpacing: "0.2em", color: "#64748b", marginBottom: 8, textTransform: "uppercase" },
        h1: {
            fontSize: "clamp(22px, 3.5vw, 32px)", fontWeight: 700,
            background: "linear-gradient(90deg, #e2e8f0, #a78bfa, #00d4ff)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            margin: "0 0 10px", lineHeight: 1.2,
        },
        navBar: {
            display: "flex", gap: 2, padding: "14px 28px 0",
            borderBottom: "1px solid #1e293b", overflowX: "auto",
        },
        content: { padding: "24px 28px 48px" },
        card: { background: "#0f172a", border: "1px solid #1e293b", borderRadius: 12, padding: "20px 24px", marginBottom: 16 },
        label: { fontSize: 11, letterSpacing: "0.15em", color: "#475569", marginBottom: 10, textTransform: "uppercase" },
    };

    const navTabs = [
        { id: "weaknesses", label: "Áreas débiles" },
        { id: "plan", label: "Fases del plan" },
        { id: "monolito", label: "Monolito → Micro" },
        { id: "extras", label: "Más proyectos" },
        { id: "lectura", label: "Cómo leer" },
    ];

    // @ts-ignore
    const BadgeType = ({ type }) => {
        const cfg = type === "add"
            ? { bg: "#052e16", border: "#16a34a", color: "#4ade80", label: "+ Nuevo" }
            : { bg: "#1c1400", border: "#b45309", color: "#fbbf24", label: "~ Modificado" };
        return (
            <span style={{
                background: cfg.bg, border: `1px solid ${cfg.border}`,
                color: cfg.color, fontSize: 10, padding: "2px 8px",
                borderRadius: 4, fontWeight: 700, letterSpacing: "0.05em",
                marginRight: 8, whiteSpace: "nowrap",
            }}>{cfg.label}</span>
        );
    };

    return (
        <div style={S.wrap}>
            <div style={S.header}>
                <div style={S.eyebrow}>Plan de Desarrollo — 2025–2026</div>
                <h1 style={S.h1}>De Semi Senior a Senior Java</h1>
                <p style={{ color: "#64748b", fontSize: 13, margin: 0, lineHeight: 1.6 }}>
                    Pre-Fase + 3 fases · 8 tecnologías · 1 proyecto evolutivo · ~14 meses · 5–10h/semana
                </p>
            </div>

            <div style={S.navBar}>
                {navTabs.map(t => (
                    <button key={t.id} onClick={() => setTab(t.id)} style={{
                        background: tab === t.id ? "#1e293b" : "transparent",
                        border: "none",
                        borderBottom: tab === t.id ? "2px solid #a78bfa" : "2px solid transparent",
                        color: tab === t.id ? "#e2e8f0" : "#475569",
                        padding: "9px 14px", cursor: "pointer", fontSize: 12,
                        fontFamily: "inherit", borderRadius: "4px 4px 0 0",
                        whiteSpace: "nowrap", transition: "all 0.15s",
                    }}>{t.label}</button>
                ))}
            </div>

            <div style={S.content}>

                {/* ── ÁREAS DÉBILES ── */}
                {tab === "weaknesses" && (
                    <div>
                        <div style={{
                            background: "#110800", border: "1px solid #92400e44",
                            borderRadius: 10, padding: "14px 18px", marginBottom: 20,
                            display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10,
                        }}>
                            <div>
                                <span style={{ color: "#fbbf24", fontWeight: 700, fontSize: 14 }}>Diagnóstico del quiz — 65–80%</span>
                                <span style={{ color: "#64748b", fontSize: 13, marginLeft: 12 }}>Semi Senior sólido · Brecha hacia Senior identificada</span>
                            </div>
                            <div style={{ display: "flex", gap: 12 }}>
                                <span style={{ fontSize: 12, color: "#f87171", background: "#2d0000", border: "1px solid #7f1d1d", padding: "3px 10px", borderRadius: 6 }}>Crítico ×2</span>
                                <span style={{ fontSize: 12, color: "#fbbf24", background: "#1c1000", border: "1px solid #78350f", padding: "3px 10px", borderRadius: 6 }}>Mejorar ×3</span>
                            </div>
                        </div>

                        {weakAreas.map(area => (
                            <div key={area.id} style={{
                                ...S.card,
                                borderLeft: `4px solid ${area.severity === "critical" ? "#ef4444" : "#f59e0b"}`,
                            }}>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8, flexWrap: "wrap", gap: 8 }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                                        <span style={{
                                            fontSize: 11, padding: "2px 9px", borderRadius: 4, fontWeight: 700,
                                            background: area.severity === "critical" ? "#2d0000" : "#1c1000",
                                            border: `1px solid ${area.severity === "critical" ? "#7f1d1d" : "#78350f"}`,
                                            color: area.severity === "critical" ? "#f87171" : "#fbbf24",
                                        }}>{area.severity === "critical" ? "Crítico" : "Mejorar"}</span>
                                        <span style={{ color: "#e2e8f0", fontWeight: 600, fontSize: 15 }}>{area.name}</span>
                                    </div>
                                    <span style={{ fontSize: 11, color: "#475569", background: "#1e293b", padding: "2px 8px", borderRadius: 4 }}>{area.phase}</span>
                                </div>

                                <p style={{ color: "#64748b", fontSize: 13, lineHeight: 1.65, margin: "0 0 12px" }}>{area.desc}</p>

                                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 12 }}>
                                    {area.tags.map(tag => (
                                        <span key={tag} style={{ background: "#1e293b", color: "#94a3b8", padding: "3px 9px", borderRadius: 5, fontSize: 11 }}>{tag}</span>
                                    ))}
                                </div>

                                <div style={{
                                    background: "#052e16", border: "1px solid #16a34a44",
                                    borderRadius: 8, padding: "10px 14px", marginBottom: 10,
                                }}>
                                    <span style={{ color: "#4ade80", fontSize: 11, fontWeight: 700, letterSpacing: "0.05em" }}>CORRECCIÓN APLICADA AL PLAN  </span>
                                    <span style={{ color: "#86efac", fontSize: 12 }}>{area.fix}</span>
                                </div>

                                <button onClick={() => {
                                    if (typeof sendPrompt === "function") sendPrompt(area.action);
                                }} style={{
                                    background: "transparent",
                                    border: "1px solid #334155",
                                    borderRadius: 6, padding: "6px 12px",
                                    color: "#94a3b8", fontSize: 12, cursor: "pointer",
                                    fontFamily: "inherit",
                                }}>Profundizar en este tema ↗</button>
                            </div>
                        ))}
                    </div>
                )}

                {/* ── PLAN FASES ── */}
                {tab === "plan" && (
                    <div>
                        <div style={{ display: "flex", gap: 10, marginBottom: 24, flexWrap: "wrap" }}>
                            {phases.map(p => (
                                <button key={p.id} onClick={() => setActivePhase(p.id)} style={{
                                    background: activePhase === p.id ? p.color + "22" : "#0f172a",
                                    border: `1px solid ${activePhase === p.id ? p.color : "#1e293b"}`,
                                    color: activePhase === p.id ? p.color : "#64748b",
                                    padding: "8px 16px", borderRadius: 8, cursor: "pointer",
                                    fontSize: 12, fontFamily: "inherit", transition: "all 0.2s",
                                }}>
                                    <span style={{ fontWeight: 700 }}>{p.id === 0 ? "Pre-Fase" : `Fase ${p.id}`}</span>
                                    <span style={{ marginLeft: 8, opacity: 0.7 }}>{p.duration}</span>
                                </button>
                            ))}
                        </div>

                        {phase && (
                            <div>
                                <div style={{
                                    background: `linear-gradient(135deg, ${phase.accent} 0%, #0f172a 100%)`,
                                    border: `1px solid ${phase.color}33`, borderRadius: 12,
                                    padding: "22px 26px", marginBottom: 16,
                                }}>
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>
                                        <div>
                                            <h2 style={{ color: phase.color, margin: "0 0 8px", fontSize: 18, fontWeight: 700 }}>{phase.name}</h2>
                                            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                                                {phase.topics.map(t => (
                                                    <span key={t} style={{
                                                        background: phase.color + "22", border: `1px solid ${phase.color}44`,
                                                        color: phase.color, padding: "2px 9px", borderRadius: 20, fontSize: 11,
                                                    }}>{t}</span>
                                                ))}
                                            </div>
                                        </div>
                                        <div style={{
                                            background: phase.color + "11", border: `1px solid ${phase.color}33`,
                                            borderRadius: 8, padding: "8px 14px", textAlign: "center",
                                        }}>
                                            <div style={{ color: phase.color, fontSize: 16, fontWeight: 700 }}>{phase.duration}</div>
                                            <div style={{ color: "#475569", fontSize: 10 }}>duración estimada</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Additions/Changes */}
                                {phase.additions.length > 0 && (
                                    <div style={{ ...S.card, borderColor: "#16a34a44", background: "#050f08" }}>
                                        <div style={S.label}>Cambios y adiciones respecto al plan original</div>
                                        {phase.additions.map((a, i) => (
                                            <div key={i} style={{
                                                padding: "10px 0",
                                                borderBottom: i < phase.additions.length - 1 ? "1px solid #1e293b" : "none",
                                                display: "flex", gap: 10, alignItems: "flex-start",
                                            }}>
                                                <div style={{ minWidth: 90, paddingTop: 1 }}>
                                                    <BadgeType type={a.type} />
                                                </div>
                                                <div>
                                                    <div style={{ color: "#64748b", fontSize: 10, marginBottom: 3 }}>{a.label}</div>
                                                    <p style={{ color: "#94a3b8", fontSize: 13, lineHeight: 1.6, margin: 0 }}>{a.text}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Project */}
                                <div style={{ ...S.card, borderLeft: `4px solid ${phase.color}` }}>
                                    <div style={S.label}>Proyecto Principal</div>
                                    <h3 style={{ color: "#e2e8f0", margin: "0 0 8px", fontSize: 16 }}>{phase.project.name}</h3>
                                    <p style={{ color: "#94a3b8", fontSize: 13, lineHeight: 1.7, margin: "0 0 14px" }}>{phase.project.desc}</p>
                                    <div style={{ background: phase.color + "08", border: `1px solid ${phase.color}22`, borderRadius: 8, padding: "10px 14px", marginBottom: 10 }}>
                                        <div style={{ color: "#64748b", fontSize: 10, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.1em" }}>Stack / Skills</div>
                                        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                                            {phase.project.skills.map(s => (
                                                <span key={s} style={{ background: "#1e293b", color: "#cbd5e1", padding: "2px 9px", borderRadius: 5, fontSize: 11 }}>{s}</span>
                                            ))}
                                        </div>
                                    </div>
                                    <div style={{ color: "#64748b", fontSize: 13, fontStyle: "italic" }}>{phase.project.why}</div>
                                </div>

                                {/* Reading */}
                                <div style={S.card}>
                                    <div style={S.label}>Plan de Lectura — {phase.id === 0 ? "Pre-Fase" : `Fase ${phase.id}`}</div>
                                    {phase.reading.map((r, i) => (
                                        <div key={i} style={{
                                            display: "flex", gap: 10, padding: "8px 0",
                                            borderBottom: i < phase.reading.length - 1 ? "1px solid #1e293b" : "none",
                                        }}>
                                            <span style={{ color: phase.color, fontSize: 13, minWidth: 16 }}>→</span>
                                            <span style={{ color: "#94a3b8", fontSize: 13, lineHeight: 1.6 }}>{r}</span>
                                        </div>
                                    ))}
                                    <div style={{ marginTop: 14 }}>
                                        <div style={{ fontSize: 10, letterSpacing: "0.1em", color: "#475569", marginBottom: 8, textTransform: "uppercase" }}>Libros de referencia</div>
                                        {phase.books.map((b, i) => (
                                            <div key={i} style={{ color: "#64748b", fontSize: 12, padding: "3px 0" }}>→ {b}</div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* ── MONOLITO vs MICRO ── */}
                {tab === "monolito" && (
                    <div>
                        <div style={{
                            background: "linear-gradient(135deg, #022c1a 0%, #0f172a 100%)",
                            border: "1px solid #34d39933", borderRadius: 12, padding: "22px 26px", marginBottom: 16,
                        }}>
                            <div style={S.label}>Veredicto</div>
                            <h2 style={{ color: "#34d399", margin: 0, fontSize: 18 }}>{monoVsMicro.verdict}</h2>
                        </div>
                        <div style={{ display: "grid", gap: 12 }}>
                            {monoVsMicro.points.map((p, i) => (
                                <div key={i} style={{ ...S.card, display: "flex", gap: 14 }}>
                                    <div>
                                        <div style={{ color: "#e2e8f0", fontWeight: 600, marginBottom: 5, fontSize: 14 }}>{p.title}</div>
                                        <div style={{ color: "#64748b", fontSize: 13, lineHeight: 1.7 }}>{p.desc}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div style={{ ...S.card, borderColor: "#34d39933", marginTop: 4 }}>
                            <div style={{ color: "#34d399", fontWeight: 600, marginBottom: 10, fontSize: 13 }}>El camino concreto</div>
                            <div style={{ display: "flex", alignItems: "center", gap: 0, flexWrap: "wrap" }}>
                                {["Pre-Fase (Estructuras)", "→", "Monolito (Fase 1)", "→", "WebFlux (Fase 2)", "→", "Micros + Saga (Fase 3)", "→", "Java 21 + CI/CD"].map((step, i) => (
                                    <span key={i} style={{
                                        color: step === "→" ? "#334155" : "#94a3b8",
                                        background: step === "→" ? "transparent" : "#1e293b",
                                        padding: step === "→" ? "0 6px" : "5px 10px",
                                        borderRadius: step === "→" ? 0 : 5,
                                        fontSize: 12, margin: "3px 3px",
                                    }}>{step}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* ── EXTRAS ── */}
                {tab === "extras" && (
                    <div>
                        <p style={{ color: "#64748b", fontSize: 13, marginBottom: 18, lineHeight: 1.7 }}>
                            Proyectos complementarios para profundizar en temas específicos más allá de los proyectos principales.
                        </p>
                        <div style={{ display: "grid", gap: 14 }}>
                            {extraProjects.map((p, i) => (
                                <div key={i} style={S.card}>
                                    <h3 style={{ color: "#e2e8f0", margin: "0 0 6px", fontSize: 15 }}>{p.name}</h3>
                                    <p style={{ color: "#64748b", fontSize: 13, margin: "0 0 12px", lineHeight: 1.6 }}>{p.desc}</p>
                                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                                        {p.topics.map(t => (
                                            <span key={t} style={{ background: "#1e293b", color: "#94a3b8", padding: "2px 9px", borderRadius: 5, fontSize: 11 }}>{t}</span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* ── LECTURA ── */}
                {tab === "lectura" && (
                    <div>
                        <p style={{ color: "#64748b", fontSize: 13, marginBottom: 18, lineHeight: 1.7 }}>
                            La trampa más común: leer mucho y codear poco. Esta estrategia lo equilibra.
                        </p>
                        <div style={{ display: "grid", gap: 10, marginBottom: 24 }}>
                            {readingTips.map((t, i) => (
                                <div key={i} style={{ ...S.card, display: "flex", gap: 12 }}>
                                    <span style={{ color: "#a78bfa", fontSize: 13, minWidth: 16 }}>→</span>
                                    <span style={{ color: "#94a3b8", fontSize: 13, lineHeight: 1.7 }}>{t.tip}</span>
                                </div>
                            ))}
                        </div>
                        <div style={{ ...S.card, borderColor: "#a78bfa33" }}>
                            <div style={{ color: "#a78bfa", fontWeight: 600, marginBottom: 14, fontSize: 13 }}>Rutina semanal — 5–10h/semana</div>
                            {[
                                { day: "Lun / Mié", action: "30 min lectura + aplica lo leído al proyecto activo (2h total)" },
                                { day: "Mar / Jue", action: "1.5–2h de código puro en el proyecto principal" },
                                { day: "Sábado", action: "Sesión larga (3–4h): avance proyecto + revisión semanal + notas" },
                                { day: "Cada 2 semanas", action: "Refactoring guiado: mejorar algo del proyecto con lo aprendido" },
                                { day: "Domingo", action: "Descanso. No hay aprendizaje sostenible sin recuperación" },
                            ].map((r, i, arr) => (
                                <div key={i} style={{
                                    display: "flex", gap: 14, padding: "9px 0",
                                    borderBottom: i < arr.length - 1 ? "1px solid #1e293b" : "none",
                                }}>
                                    <span style={{ color: "#a78bfa", fontSize: 12, minWidth: 110 }}>{r.day}</span>
                                    <span style={{ color: "#64748b", fontSize: 12 }}>{r.action}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default StudyPlan;

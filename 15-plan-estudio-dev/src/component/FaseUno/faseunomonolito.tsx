import { useState } from "react";

const sections = [
    {
        id: "overview",
        label: "🏗️ El Proyecto",
    },
    {
        id: "modules",
        label: "📦 Módulos",
    },
    {
        id: "concurrency",
        label: "⚡ Concurrencia",
    },
    {
        id: "db",
        label: "🗄️ Base de Datos",
    },
    {
        id: "roadmap",
        label: "🗺️ Roadmap",
    },
];

const modules = [
    {
        name: "Products",
        emoji: "🛍️",
        color: "#38bdf8",
        entities: ["Product", "Category", "ProductVariant (talla, color)", "PriceHistory"],
        endpoints: [
            "POST /products — crear producto con variantes",
            "GET /products?category=&stock=low — filtros",
            "PATCH /products/{id}/price — actualizar precio (auditable)",
            "GET /products/{id}/stock-history",
        ],
        challenge: "Diseño del modelo: un producto tiene variantes, cada variante tiene su propio stock. Normalización real.",
    },
    {
        name: "Inventory",
        emoji: "📊",
        color: "#fb923c",
        entities: ["StockEntry", "StockMovement", "Warehouse", "StockAlert"],
        endpoints: [
            "POST /inventory/restock — entrada de mercancía",
            "POST /inventory/reserve — reserva stock para orden",
            "POST /inventory/release — libera reserva cancelada",
            "GET /inventory/alerts — productos bajo mínimo",
        ],
        challenge: "Aquí vive la concurrencia. Dos compras simultáneas del último producto. Sin locks correctos → overselling.",
    },
    {
        name: "Orders",
        emoji: "🧾",
        color: "#a78bfa",
        entities: ["Order", "OrderItem", "OrderStatus (FSM)", "PaymentRecord"],
        endpoints: [
            "POST /orders — crea orden y reserva stock",
            "PUT /orders/{id}/confirm — confirma y descuenta stock",
            "PUT /orders/{id}/cancel — cancela y libera stock",
            "GET /orders?status=&dateFrom=",
        ],
        challenge: "Máquina de estados: PENDING → CONFIRMED → SHIPPED → DELIVERED / CANCELLED. Transiciones deben ser atómicas.",
    },
    {
        name: "Reports",
        emoji: "📈",
        color: "#34d399",
        entities: ["Vistas SQL", "Consultas agregadas", "Cache con Redis"],
        endpoints: [
            "GET /reports/low-stock — productos bajo threshold",
            "GET /reports/top-selling?period=7d",
            "GET /reports/revenue?from=&to=",
            "GET /reports/movements/{productId}",
        ],
        challenge: "Optimización: estas queries sin índices y sin caché matan la DB. Aprenderás EXPLAIN ANALYZE de verdad.",
    },
];

const concurrencyScenarios = [
    {
        title: "🔴 El problema del último producto",
        problem: "100 usuarios hacen request simultáneo al último iPhone en stock. Sin control: 100 órdenes confirmadas, 1 producto.",
        solution: "Optimistic Locking con @Version en JPA. Si dos threads leen version=5 y ambos intentan escribir, el segundo recibe OptimisticLockException y reintenta.",
        chapter: "JCIP Cap. 2 — Thread Safety, Cap. 11 — Performance",
        code: `@Entity
public class ProductVariant {
  @Version
  private Long version; // JPA maneja el lock
  
  private int stock;
  
  public void reserve(int qty) {
    if (stock < qty) throw new InsufficientStockException();
    this.stock -= qty; // UPDATE con WHERE version=?
  }
}`,
    },
    {
        title: "🟡 Generación de reportes pesados",
        problem: "El reporte de ventas del mes tarda 8 segundos. Si 10 managers lo piden a la vez → 10 queries pesadas simultáneas → DB muerta.",
        solution: "Cache con Redis (TTL 5 min) + ExecutorService con thread pool limitado para no saturar la DB con queries concurrentes.",
        chapter: "JCIP Cap. 5 — Building Blocks (caches), Cap. 8 — Thread Pools",
        code: `@Service
public class ReportService {
  private final ExecutorService reportExecutor = 
    Executors.newFixedThreadPool(3); // máx 3 queries pesadas simultáneas
    
  public Future<ReportData> generateAsync(ReportRequest req) {
    return reportExecutor.submit(() -> buildReport(req));
  }
}`,
    },
    {
        title: "🟠 Alertas de stock bajo",
        problem: "Al rebajar stock, necesitas verificar si cruzó el umbral mínimo y disparar alerta. Esto no puede bloquear la transacción principal.",
        solution: "Patrón Producer-Consumer con BlockingQueue. El thread de inventario produce el evento, un thread separado consume y envía alertas.",
        chapter: "JCIP Cap. 5 — BlockingQueue, Cap. 7 — Cancellation",
        code: `// En InventoryService
private final BlockingQueue<StockEvent> alertQueue = 
  new LinkedBlockingQueue<>(1000);

public void updateStock(Long variantId, int delta) {
  // ... actualiza stock ...
  if (newStock < product.getMinThreshold()) {
    alertQueue.offer(new StockEvent(variantId, newStock));
  }
}

// AlertProcessor corre en su propio thread
// consumiendo la cola sin bloquear inventario`,
    },
];

const dbDesign = {
    tables: [
        { name: "categories", cols: "id, name, parent_id (autorreferencial para subcategorías)" },
        { name: "products", cols: "id, name, category_id, created_at, is_active" },
        { name: "product_variants", cols: "id, product_id, sku, attributes (JSON), price, stock, version, min_threshold" },
        { name: "price_history", cols: "id, variant_id, old_price, new_price, changed_at, changed_by" },
        { name: "stock_movements", cols: "id, variant_id, type (IN/OUT/RESERVE/RELEASE), qty, reference_id, created_at" },
        { name: "orders", cols: "id, status, total, created_at, updated_at" },
        { name: "order_items", cols: "id, order_id, variant_id, qty, unit_price_at_time" },
    ],
    insights: [
        "unit_price_at_time en order_items: el precio puede cambiar, la orden debe guardar el precio histórico",
        "stock_movements es un ledger (libro contable): nunca borras, solo agregas. El stock real = SUM de movements",
        "parent_id en categories: árbol de categorías con una sola tabla y CTE recursivo en SQL",
        "attributes en product_variants como JSON: flexible para talla/color/memoria sin columnas fijas",
    ],
};

const roadmap = [
    {
        week: "Sem 1–2",
        color: "#38bdf8",
        focus: "Modelado y setup",
        tasks: [
            "Diseña el esquema de BD en papel antes de tocar código",
            "Setup: Spring Boot 3 + PostgreSQL + Docker Compose",
            "Implementa módulo Products con variantes",
            "Lee JCIP Cap 1–2 (fundamentos de concurrencia)",
        ],
    },
    {
        week: "Sem 3–4",
        color: "#fb923c",
        focus: "Inventory + primer desafío de concurrencia",
        tasks: [
            "Implementa stock_movements como ledger",
            "Agrega @Version (Optimistic Locking) a ProductVariant",
            "Escribe un test concurrente: 50 threads comprando el último item",
            "Lee JCIP Cap 3–5",
        ],
    },
    {
        week: "Sem 5–6",
        color: "#a78bfa",
        focus: "Orders + máquina de estados",
        tasks: [
            "Implementa Orders con FSM explícita",
            "Las transiciones de estado deben ser @Transactional",
            "Manejo de compensación: cancel libera stock",
            "Lee JCIP Cap 6–8 (Executors, Thread Pools)",
        ],
    },
    {
        week: "Sem 7–8",
        color: "#34d399",
        focus: "Reports + Redis + Docker final",
        tasks: [
            "Agrega Redis para cache de reportes",
            "Implementa AlertProcessor con BlockingQueue",
            "EXPLAIN ANALYZE en las queries más lentas, agrega índices",
            "Docker Compose final: app + postgres + redis",
            "README arquitectural (esto es el input de Fase 3)",
        ],
    },
];

const StockFlowBlueprint = () => {
    const [active, setActive] = useState("overview");
    const [expandedModule, setExpandedModule] = useState(null);
    const [expandedScenario, setExpandedScenario] = useState(null);

    return (
        <div style={{
            fontFamily: "'IBM Plex Mono', 'Courier New', monospace",
            background: "#07090f",
            minHeight: "100vh",
            color: "#c9d1d9",
        }}>
            {/* Header */}
            <div style={{
                background: "linear-gradient(180deg, #0d1117 0%, #07090f 100%)",
                borderBottom: "1px solid #21262d",
                padding: "36px 32px 28px",
            }}>
                <div style={{ maxWidth: 860, margin: "0 auto" }}>
                    <div style={{
                        display: "inline-block",
                        background: "#fb923c18",
                        border: "1px solid #fb923c44",
                        color: "#fb923c",
                        fontSize: 11,
                        padding: "3px 12px",
                        borderRadius: 20,
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        marginBottom: 14,
                    }}>Fase 1 · Proyecto Principal</div>
                    <h1 style={{
                        margin: "0 0 8px",
                        fontSize: "clamp(26px, 4vw, 40px)",
                        fontWeight: 700,
                        color: "#f0f6fc",
                        letterSpacing: "-0.02em",
                    }}>
                        StockFlow
                    </h1>
                    <p style={{ color: "#6e7681", margin: "0 0 4px", fontSize: 15 }}>
                        Sistema de inventario para e-commerce — Monolito Spring Boot
                    </p>
                    <p style={{ color: "#30363d", margin: 0, fontSize: 13 }}>
                        Spring Boot · PostgreSQL · Redis · Docker · Concurrencia real
                    </p>
                </div>
            </div>

            {/* Nav */}
            <div style={{
                borderBottom: "1px solid #21262d",
                padding: "0 32px",
            }}>
                <div style={{ maxWidth: 860, margin: "0 auto", display: "flex", gap: 0 }}>
                    {sections.map((s) => (
                        <button key={s.id} onClick={() => setActive(s.id)} style={{
                            background: "transparent",
                            border: "none",
                            borderBottom: active === s.id ? "2px solid #fb923c" : "2px solid transparent",
                            color: active === s.id ? "#f0f6fc" : "#6e7681",
                            padding: "12px 16px",
                            cursor: "pointer",
                            fontSize: 13,
                            fontFamily: "inherit",
                            transition: "color 0.15s",
                            whiteSpace: "nowrap",
                        }}>{s.label}</button>
                    ))}
                </div>
            </div>

            <div style={{ maxWidth: 860, margin: "0 auto", padding: "28px 32px 64px" }}>

                {/* OVERVIEW */}
                {active === "overview" && (
                    <div>
                        <div style={{
                            background: "#0d1117",
                            border: "1px solid #21262d",
                            borderRadius: 10,
                            padding: "24px",
                            marginBottom: 20,
                        }}>
                            <h2 style={{ color: "#f0f6fc", margin: "0 0 12px", fontSize: 17 }}>¿Qué es StockFlow?</h2>
                            <p style={{ color: "#8b949e", fontSize: 14, lineHeight: 1.8, margin: "0 0 16px" }}>
                                Un sistema de gestión de inventario para una tienda online que vende productos con variantes (talla, color, etc.). Permite gestionar stock, procesar órdenes y generar reportes — con múltiples operaciones concurrentes reales.
                            </p>
                            <p style={{ color: "#8b949e", fontSize: 14, lineHeight: 1.8, margin: 0 }}>
                                No es un CRUD genérico. Cada módulo tiene un <span style={{ color: "#fb923c" }}>problema concreto de ingeniería</span> que te obligará a aplicar lo que lees en los libros.
                            </p>
                        </div>

                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
                            {[
                                { label: "Problema central", value: "Overselling — dos compras del último producto al mismo tiempo", color: "#f85149" },
                                { label: "Patrón de datos clave", value: "Stock como ledger contable, nunca mutación directa", color: "#38bdf8" },
                                { label: "Complejidad de dominio", value: "Productos → Variantes → Stock → Órdenes → Auditoría", color: "#a78bfa" },
                                { label: "Output de la fase", value: "Monolito documentado, listo para descomponer en Fase 3", color: "#34d399" },
                            ].map((item, i) => (
                                <div key={i} style={{
                                    background: "#0d1117", border: "1px solid #21262d",
                                    borderRadius: 8, padding: "16px",
                                }}>
                                    <div style={{ color: "#6e7681", fontSize: 11, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.1em" }}>{item.label}</div>
                                    <div style={{ color: item.color, fontSize: 13, lineHeight: 1.5 }}>{item.value}</div>
                                </div>
                            ))}
                        </div>

                        <div style={{
                            background: "#0d1117", border: "1px solid #fb923c33",
                            borderRadius: 10, padding: "20px 24px",
                        }}>
                            <div style={{ color: "#fb923c", fontSize: 13, fontWeight: 600, marginBottom: 12 }}>
                                📌 Por qué este proyecto y no algo más simple
                            </div>
                            {[
                                "Spring Boot ya lo dominás — no vas a aprender nada nuevo si haces un CRUD básico",
                                "El dominio de e-commerce tiene problemas de concurrencia naturales y reales (no artificiales)",
                                "La arquitectura de módulos que diseñes acá es exactamente lo que vas a descomponer en microservicios en Fase 3",
                                "Base de datos con relaciones reales, autorreferencia, JSON columns, triggers — aplica todo el libro de BD",
                            ].map((p, i) => (
                                <div key={i} style={{ display: "flex", gap: 10, marginBottom: 8 }}>
                                    <span style={{ color: "#fb923c44", fontSize: 14 }}>▸</span>
                                    <span style={{ color: "#8b949e", fontSize: 14, lineHeight: 1.6 }}>{p}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* MODULES */}
                {active === "modules" && (
                    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                        {modules.map((m, i) => (
                            <div key={i} style={{
                                background: "#0d1117",
                                border: `1px solid ${expandedModule === i ? m.color + "55" : "#21262d"}`,
                                borderRadius: 10, overflow: "hidden",
                                transition: "border-color 0.2s",
                            }}>
                                <button onClick={() => setExpandedModule(expandedModule === i ? null : i)} style={{
                                    width: "100%", background: "transparent", border: "none",
                                    padding: "18px 24px", cursor: "pointer", textAlign: "left",
                                    display: "flex", justifyContent: "space-between", alignItems: "center",
                                    fontFamily: "inherit",
                                }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                        <span style={{ fontSize: 22 }}>{m.emoji}</span>
                                        <span style={{ color: "#f0f6fc", fontSize: 16, fontWeight: 600 }}>{m.name}</span>
                                        <span style={{
                                            background: m.color + "22", color: m.color,
                                            fontSize: 11, padding: "2px 8px", borderRadius: 20,
                                        }}>módulo</span>
                                    </div>
                                    <span style={{ color: "#6e7681", fontSize: 14 }}>{expandedModule === i ? "▲" : "▼"}</span>
                                </button>

                                {expandedModule === i && (
                                    <div style={{ padding: "0 24px 20px", borderTop: "1px solid #21262d" }}>
                                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 16 }}>
                                            <div>
                                                <div style={{ color: "#6e7681", fontSize: 11, marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.1em" }}>Entidades</div>
                                                {m.entities.map((e, j) => (
                                                    <div key={j} style={{ color: "#8b949e", fontSize: 13, padding: "4px 0", borderBottom: "1px solid #21262d" }}>
                                                        <span style={{ color: m.color }}>▸</span> {e}
                                                    </div>
                                                ))}
                                            </div>
                                            <div>
                                                <div style={{ color: "#6e7681", fontSize: 11, marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.1em" }}>Endpoints principales</div>
                                                {m.endpoints.map((e, j) => (
                                                    <div key={j} style={{ color: "#8b949e", fontSize: 12, padding: "4px 0", borderBottom: "1px solid #21262d", fontFamily: "monospace" }}>
                                                        {e}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div style={{
                                            marginTop: 16, background: m.color + "0d",
                                            border: `1px solid ${m.color}33`, borderRadius: 8,
                                            padding: "12px 16px",
                                        }}>
                                            <span style={{ color: m.color, fontSize: 12, fontWeight: 600 }}>⚡ Desafío técnico: </span>
                                            <span style={{ color: "#8b949e", fontSize: 13 }}>{m.challenge}</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {/* CONCURRENCIA */}
                {active === "concurrency" && (
                    <div>
                        <p style={{ color: "#6e7681", fontSize: 14, marginBottom: 20, lineHeight: 1.7 }}>
                            Estos son los 3 escenarios de concurrencia reales del proyecto. Cada uno mapea directamente a capítulos de <span style={{ color: "#f0f6fc" }}>Java Concurrency in Practice</span>.
                        </p>
                        {concurrencyScenarios.map((s, i) => (
                            <div key={i} style={{
                                background: "#0d1117", border: "1px solid #21262d",
                                borderRadius: 10, marginBottom: 16, overflow: "hidden",
                            }}>
                                <button onClick={() => setExpandedScenario(expandedScenario === i ? null : i)} style={{
                                    width: "100%", background: "transparent", border: "none",
                                    padding: "18px 24px", cursor: "pointer", textAlign: "left",
                                    fontFamily: "inherit", display: "flex", justifyContent: "space-between",
                                }}>
                                    <span style={{ color: "#f0f6fc", fontSize: 15, fontWeight: 600 }}>{s.title}</span>
                                    <span style={{ color: "#6e7681" }}>{expandedScenario === i ? "▲" : "▼"}</span>
                                </button>
                                {expandedScenario === i && (
                                    <div style={{ padding: "0 24px 20px", borderTop: "1px solid #21262d" }}>
                                        <div style={{ marginTop: 16, marginBottom: 12 }}>
                                            <span style={{ color: "#f85149", fontSize: 12 }}>PROBLEMA: </span>
                                            <span style={{ color: "#8b949e", fontSize: 14 }}>{s.problem}</span>
                                        </div>
                                        <div style={{ marginBottom: 16 }}>
                                            <span style={{ color: "#34d399", fontSize: 12 }}>SOLUCIÓN: </span>
                                            <span style={{ color: "#8b949e", fontSize: 14 }}>{s.solution}</span>
                                        </div>
                                        <div style={{
                                            background: "#010409", borderRadius: 8,
                                            padding: "16px", marginBottom: 12,
                                            border: "1px solid #30363d", overflowX: "auto",
                                        }}>
                                            <pre style={{ margin: 0, fontSize: 12, color: "#a5d6ff", lineHeight: 1.7 }}>{s.code}</pre>
                                        </div>
                                        <div style={{
                                            background: "#fb923c0d", border: "1px solid #fb923c33",
                                            borderRadius: 6, padding: "8px 14px",
                                            color: "#fb923c", fontSize: 12,
                                        }}>
                                            📖 {s.chapter}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {/* DB */}
                {active === "db" && (
                    <div>
                        <div style={{ marginBottom: 20 }}>
                            <div style={{ color: "#6e7681", fontSize: 11, marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.1em" }}>Esquema de tablas</div>
                            {dbDesign.tables.map((t, i) => (
                                <div key={i} style={{
                                    display: "flex", gap: 16, padding: "12px 16px",
                                    background: i % 2 === 0 ? "#0d1117" : "transparent",
                                    borderRadius: 6, alignItems: "flex-start",
                                }}>
                                    <span style={{ color: "#38bdf8", fontSize: 13, minWidth: 160, fontWeight: 600 }}>{t.name}</span>
                                    <span style={{ color: "#6e7681", fontSize: 13, lineHeight: 1.5 }}>{t.cols}</span>
                                </div>
                            ))}
                        </div>
                        <div style={{
                            background: "#0d1117", border: "1px solid #21262d",
                            borderRadius: 10, padding: "20px 24px",
                        }}>
                            <div style={{ color: "#38bdf8", fontSize: 13, fontWeight: 600, marginBottom: 14 }}>
                                💡 Decisiones de diseño que vale la pena entender
                            </div>
                            {dbDesign.insights.map((ins, i) => (
                                <div key={i} style={{
                                    display: "flex", gap: 10, marginBottom: 12,
                                    paddingBottom: 12,
                                    borderBottom: i < dbDesign.insights.length - 1 ? "1px solid #21262d" : "none",
                                }}>
                                    <span style={{ color: "#38bdf8", marginTop: 2 }}>→</span>
                                    <span style={{ color: "#8b949e", fontSize: 14, lineHeight: 1.7 }}>{ins}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* ROADMAP */}
                {active === "roadmap" && (
                    <div>
                        {roadmap.map((r, i) => (
                            <div key={i} style={{
                                display: "flex", gap: 20, marginBottom: 24,
                            }}>
                                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                    <div style={{
                                        background: r.color + "22", border: `2px solid ${r.color}`,
                                        borderRadius: "50%", width: 40, height: 40,
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                        color: r.color, fontWeight: 700, fontSize: 12,
                                        flexShrink: 0,
                                    }}>{i + 1}</div>
                                    {i < roadmap.length - 1 && (
                                        <div style={{ width: 2, flex: 1, background: "#21262d", margin: "8px 0" }} />
                                    )}
                                </div>
                                <div style={{ flex: 1, paddingBottom: 8 }}>
                                    <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 12 }}>
                                        <span style={{ color: r.color, fontSize: 14, fontWeight: 700 }}>{r.week}</span>
                                        <span style={{ color: "#6e7681", fontSize: 13 }}>— {r.focus}</span>
                                    </div>
                                    <div style={{
                                        background: "#0d1117", border: "1px solid #21262d",
                                        borderRadius: 8, padding: "14px 18px",
                                    }}>
                                        {r.tasks.map((task, j) => (
                                            <div key={j} style={{
                                                display: "flex", gap: 10, padding: "6px 0",
                                                borderBottom: j < r.tasks.length - 1 ? "1px solid #21262d" : "none",
                                            }}>
                                                <span style={{ color: r.color, fontSize: 12, marginTop: 2 }}>☐</span>
                                                <span style={{ color: "#8b949e", fontSize: 13, lineHeight: 1.5 }}>{task}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

            </div>
        </div>
    );
}

export default StockFlowBlueprint;
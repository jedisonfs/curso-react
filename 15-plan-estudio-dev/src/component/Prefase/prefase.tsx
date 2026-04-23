import { useState } from "react";
import StockFlowBlueprint from "../FaseUno/faseunomonolito.tsx";

const weeks = [
    {
        week: 1,
        title: "Semana 1 — HashMap, HashSet y Arrays",
        subtitle: "Dominar la estructura más usada en entrevistas Java",
        focus: ["HashMap", "HashSet", "ArrayList", "Frecuencias"],
        color: "#22c55e",
        bg: "#052e16",
        exercises: [
            {
                difficulty: "easy",
                num: "#1",
                title: "Two Sum",
                url: "https://leetcode.com/problems/two-sum/",
                structure: "HashMap",
                why: "El ejercicio clásico de HashMap. Aprenderás el patrón complemento O(n) vs fuerza bruta O(n²).",
                time: "20–30 min",
            },
            {
                difficulty: "easy",
                num: "#217",
                title: "Contains Duplicate",
                url: "https://leetcode.com/problems/contains-duplicate/",
                structure: "HashSet",
                why: "Diferencia fundamental entre HashSet (existencia) y HashMap (clave-valor). Complejidad O(1) en práctica.",
                time: "15 min",
            },
            {
                difficulty: "easy",
                num: "#242",
                title: "Valid Anagram",
                url: "https://leetcode.com/problems/valid-anagram/",
                structure: "HashMap",
                why: "Contar frecuencias con HashMap. El patrón de frequency map aparece en decenas de problemas.",
                time: "20 min",
            },
            {
                difficulty: "easy",
                num: "#202",
                title: "Happy Number",
                url: "https://leetcode.com/problems/happy-number/",
                structure: "HashSet",
                why: "Detección de ciclos con HashSet. Cuándo usar Set para rastrear estados visitados.",
                time: "20 min",
            },
            {
                difficulty: "easy",
                num: "#205",
                title: "Isomorphic Strings",
                url: "https://leetcode.com/problems/isomorphic-strings/",
                structure: "HashMap",
                why: "Mapping bidireccional con dos HashMaps. Entiedes cuándo necesitas mapear en ambas direcciones.",
                time: "25 min",
            },
            {
                difficulty: "easy",
                num: "#387",
                title: "First Unique Character in a String",
                url: "https://leetcode.com/problems/first-unique-character-in-a-string/",
                structure: "HashMap / LinkedHashMap",
                why: "Primer caso donde necesitas orden. ¿Cuándo cambias de HashMap a LinkedHashMap?",
                time: "20 min",
            },
            {
                difficulty: "easy",
                num: "#706",
                title: "Design HashMap",
                url: "https://leetcode.com/problems/design-hashmap/",
                structure: "HashMap (implementar desde cero)",
                why: "Implementas un HashMap desde cero con array + chaining. Entiendes cómo funciona internamente hashCode() y buckets.",
                time: "35 min",
            },
            {
                difficulty: "medium",
                num: "#49",
                title: "Group Anagrams",
                url: "https://leetcode.com/problems/group-anagrams/",
                structure: "HashMap<String, List>",
                why: "HashMap con listas como valores. 91 apariciones en entrevistas reales. Patrón clave para agrupar.",
                time: "30 min",
            },
            {
                difficulty: "medium",
                num: "#347",
                title: "Top K Frequent Elements",
                url: "https://leetcode.com/problems/top-k-frequent-elements/",
                structure: "HashMap + PriorityQueue",
                why: "Combina HashMap de frecuencias con PriorityQueue (heap). Primer ejercicio que mezcla dos estructuras.",
                time: "35 min",
            },
            {
                difficulty: "medium",
                num: "#560",
                title: "Subarray Sum Equals K",
                url: "https://leetcode.com/problems/subarray-sum-equals-k/",
                structure: "HashMap + prefix sum",
                why: "Técnica de prefix sum con HashMap. O(n) vs O(n³). Uno de los patrones más frecuentes en Medium.",
                time: "40 min",
            },
        ],
    },
    {
        week: 2,
        title: "Semana 2 — LinkedList, TreeMap y PriorityQueue",
        subtitle: "Cuándo salir de HashMap y elegir la estructura correcta",
        focus: ["LinkedList", "TreeMap", "PriorityQueue", "LinkedHashMap LRU"],
        color: "#60a5fa",
        bg: "#0c1a2e",
        exercises: [
            {
                difficulty: "easy",
                num: "#141",
                title: "Linked List Cycle",
                url: "https://leetcode.com/problems/linked-list-cycle/",
                structure: "LinkedList / HashSet",
                why: "Detección de ciclo con HashSet O(n) vs dos punteros O(1). Cuándo importa el espacio extra.",
                time: "20 min",
            },
            {
                difficulty: "easy",
                num: "#206",
                title: "Reverse Linked List",
                url: "https://leetcode.com/problems/reverse-linked-list/",
                structure: "LinkedList",
                why: "Manipulación de nodos de LinkedList. Reversa iterativa vs recursiva. Base para problemas más complejos.",
                time: "25 min",
            },
            {
                difficulty: "easy",
                num: "#21",
                title: "Merge Two Sorted Lists",
                url: "https://leetcode.com/problems/merge-two-sorted-lists/",
                structure: "LinkedList",
                why: "Merge con dos punteros. Cuándo LinkedList facilita la inserción vs ArrayList.",
                time: "25 min",
            },
            {
                difficulty: "easy",
                num: "#290",
                title: "Word Pattern",
                url: "https://leetcode.com/problems/word-pattern/",
                structure: "HashMap bidireccional",
                why: "Refuerza el patrón de bijección con HashMap. Diferencia entre existencia de clave y consistencia del mapeo.",
                time: "20 min",
            },
            {
                difficulty: "medium",
                num: "#146",
                title: "LRU Cache",
                url: "https://leetcode.com/problems/lru-cache/",
                structure: "LinkedHashMap (accessOrder=true)",
                why: "El caso de uso más importante de LinkedHashMap. Implementas una caché LRU real como la del inventario en Fase 1.",
                time: "45 min",
            },
            {
                difficulty: "medium",
                num: "#3",
                title: "Longest Substring Without Repeating Characters",
                url: "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
                structure: "HashMap + sliding window",
                why: "Sliding window con HashMap para rastrear índices. Patrón fundamental para strings.",
                time: "35 min",
            },
            {
                difficulty: "medium",
                num: "#128",
                title: "Longest Consecutive Sequence",
                url: "https://leetcode.com/problems/longest-consecutive-sequence/",
                structure: "HashSet (no TreeMap)",
                why: "Solución O(n) con HashSet vs O(n log n) con TreeMap. El ejercicio perfecto para comparar cuándo NO usar TreeMap.",
                time: "35 min",
            },
            {
                difficulty: "medium",
                num: "#239",
                title: "Sliding Window Maximum",
                url: "https://leetcode.com/problems/sliding-window-maximum/",
                structure: "ArrayDeque (como LinkedList)",
                why: "Deque como ventana deslizante. Diferencia práctica entre ArrayDeque y LinkedList para colas.",
                time: "40 min",
            },
            {
                difficulty: "hard",
                num: "#295",
                title: "Find Median from Data Stream",
                url: "https://leetcode.com/problems/find-median-from-data-stream/",
                structure: "PriorityQueue (dos heaps)",
                why: "Dos PriorityQueues (max-heap + min-heap) para mediana en tiempo real. Patrón avanzado de PriorityQueue.",
                time: "50 min",
            },
            {
                difficulty: "hard",
                num: "#460",
                title: "LFU Cache",
                url: "https://leetcode.com/problems/lfu-cache/",
                structure: "HashMap + LinkedHashMap anidados",
                why: "Caché LFU. Combina HashMap de frecuencias con LinkedHashMaps por frecuencia. El ejercicio más complejo de colecciones Java.",
                time: "60 min",
            },
        ],
    },
];

const diffConfig = {
    easy: { label: "Easy", bg: "#052e16", border: "#16a34a", text: "#4ade80" },
    medium: { label: "Medium", bg: "#1c1400", border: "#b45309", text: "#fbbf24" },
    hard: { label: "Hard", bg: "#2d0000", border: "#7f1d1d", text: "#f87171" },
};

const summary = [
    { label: "Total ejercicios", val: "20", sub: "10 por semana" },
    { label: "Distribución", val: "8E · 8M · 4H", sub: "Easy, Medium, Hard" },
    { label: "Tiempo estimado", val: "~12h", sub: "con intentos propios" },
    { label: "Estructuras cubiertas", val: "7", sub: "HashMap HashSet LinkedList TreeMap PriorityQueue LinkedHashMap ArrayDeque" },
];

const LeetCodePlan = () => {
    const [activeWeek, setActiveWeek] = useState(0);
    const [filter, setFilter] = useState("all");
    const [completed, setCompleted] = useState({});

    const week = weeks[activeWeek];
    const filtered = filter === "all"
        ? week.exercises
        : week.exercises.filter(e => e.difficulty === filter);

    const totalCompleted = Object.values(completed).filter(Boolean).length;

    const S = {
        wrap: {
            fontFamily: "'DM Mono', 'Fira Code', monospace",
            background: "#0a0a0f",
            minHeight: "100vh",
            color: "#e2e8f0",
        },
        header: {
            background: "linear-gradient(135deg, #0f172a 0%, #0d2818 100%)",
            borderBottom: "1px solid #1e293b",
            padding: "28px 24px 20px",
        },
        content: { padding: "20px 24px 48px" },
        card: {
            background: "#0f172a",
            border: "1px solid #1e293b",
            borderRadius: 10,
            padding: "14px 16px",
            marginBottom: 10,
        },
        lbl: { fontSize: 10, letterSpacing: "0.15em", color: "#475569", marginBottom: 6, textTransform: "uppercase" },
    };

    return (
        <div style={S.wrap}>
            <div style={S.header}>
                <div style={{ fontSize: 10, letterSpacing: "0.2em", color: "#475569", marginBottom: 5, textTransform: "uppercase" }}>
                    Pre-Fase — Estructuras de datos · LeetCode
                </div>
                <h1 style={{
                    fontSize: "clamp(16px, 2.8vw, 24px)", fontWeight: 700, margin: "0 0 6px",
                    background: "linear-gradient(90deg, #e2e8f0, #4ade80)",
                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                }}>
                    20 ejercicios en 2 semanas
                </h1>
                <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                    <p style={{ color: "#475569", fontSize: 12, margin: 0 }}>
                        HashMap · HashSet · LinkedList · TreeMap · PriorityQueue · LinkedHashMap
                    </p>
                    <div style={{
                        background: "#1e293b", borderRadius: 99, padding: "3px 10px",
                        fontSize: 11, color: "#4ade80", border: "1px solid #16a34a44",
                    }}>
                        {totalCompleted}/20 completados
                    </div>
                </div>
            </div>

            <div style={S.content}>
                {/* Summary metrics */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(120px,1fr))", gap: 8, marginBottom: 20 }}>
                    {summary.map((s, i) => (
                        <div key={i} style={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 8, padding: "10px 12px" }}>
                            <div style={{ fontSize: 10, color: "#475569", marginBottom: 3 }}>{s.label}</div>
                            <div style={{ fontSize: 16, fontWeight: 700, color: "#e2e8f0" }}>{s.val}</div>
                            <div style={{ fontSize: 10, color: "#334155", marginTop: 2 }}>{s.sub}</div>
                        </div>
                    ))}
                </div>

                {/* Week tabs */}
                <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
                    {weeks.map((w, i) => (
                        <button key={i} onClick={() => setActiveWeek(i)} style={{
                            background: activeWeek === i ? w.color + "22" : "#0f172a",
                            border: `1px solid ${activeWeek === i ? w.color : "#1e293b"}`,
                            color: activeWeek === i ? w.color : "#64748b",
                            padding: "7px 16px", borderRadius: 8, cursor: "pointer",
                            fontSize: 12, fontFamily: "inherit", transition: "all 0.2s",
                        }}>
                            Semana {w.week}
                        </button>
                    ))}
                </div>

                {/* Week header */}
                <div style={{ ...S.card, background: week.bg, borderColor: week.color + "44", marginBottom: 16 }}>
                    <div style={{ color: week.color, fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{week.title}</div>
                    <div style={{ color: "#64748b", fontSize: 13, marginBottom: 10 }}>{week.subtitle}</div>
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                        {week.focus.map(f => (
                            <span key={f} style={{
                                background: week.color + "22", border: `1px solid ${week.color}44`,
                                color: week.color, fontSize: 11, padding: "2px 8px", borderRadius: 20,
                            }}>{f}</span>
                        ))}
                    </div>
                </div>

                {/* Difficulty filter */}
                <div style={{ display: "flex", gap: 6, marginBottom: 14, flexWrap: "wrap" }}>
                    {[
                        { id: "all", label: "Todos" },
                        { id: "easy", label: "Easy" },
                        { id: "medium", label: "Medium" },
                        { id: "hard", label: "Hard" },
                    ].map(f => (
                        <button key={f.id} onClick={() => setFilter(f.id)} style={{
                            background: filter === f.id ? "#1e293b" : "transparent",
                            border: `1px solid ${filter === f.id ? "#334155" : "#1e293b"}`,
                            color: filter === f.id ? "#e2e8f0" : "#475569",
                            padding: "4px 12px", borderRadius: 6, cursor: "pointer",
                            fontSize: 11, fontFamily: "inherit",
                        }}>{f.label}</button>
                    ))}
                    <span style={{ fontSize: 11, color: "#334155", alignSelf: "center", marginLeft: 4 }}>
            {filtered.length} ejercicios
          </span>
                </div>

                {/* Exercise list */}
                {filtered.map((ex, i) => {
                    const diff = diffConfig[ex.difficulty];
                    const key = `${activeWeek}-${ex.num}`;
                    const done = completed[key];
                    return (
                        <div key={i} style={{
                            ...S.card,
                            borderLeft: `3px solid ${diff.border}`,
                            opacity: done ? 0.6 : 1,
                            transition: "opacity 0.2s",
                        }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10, flexWrap: "wrap" }}>
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6, flexWrap: "wrap" }}>
                    <span style={{
                        background: diff.bg, border: `1px solid ${diff.border}`,
                        color: diff.text, fontSize: 10, padding: "2px 7px", borderRadius: 4, fontWeight: 700,
                    }}>{diff.label}</span>
                                        <span style={{ color: "#475569", fontSize: 11 }}>{ex.num}</span>
                                        <span style={{
                                            background: "#1e293b", color: "#94a3b8", fontSize: 10,
                                            padding: "2px 7px", borderRadius: 4,
                                        }}>{ex.structure}</span>
                                        <span style={{ color: "#334155", fontSize: 10 }}>{ex.time}</span>
                                    </div>
                                    <a href={ex.url} target="_blank" rel="noopener noreferrer" style={{
                                        color: done ? "#475569" : "#60a5fa",
                                        fontSize: 14, fontWeight: 600, textDecoration: "none",
                                        display: "block", marginBottom: 5,
                                    }}>
                                        {done ? "✓ " : ""}{ex.title} ↗
                                    </a>
                                    <p style={{ color: "#64748b", fontSize: 12, margin: 0, lineHeight: 1.55 }}>{ex.why}</p>
                                </div>
                                <button
                                    onClick={() => setCompleted(prev => ({ ...prev, [key]: !prev[key] }))}
                                    style={{
                                        background: done ? "#052e16" : "#0f172a",
                                        border: `1px solid ${done ? "#16a34a" : "#1e293b"}`,
                                        color: done ? "#4ade80" : "#475569",
                                        borderRadius: 6, padding: "5px 10px", cursor: "pointer",
                                        fontSize: 11, fontFamily: "inherit", flexShrink: 0,
                                    }}
                                >{done ? "Hecho ✓" : "Marcar"}</button>
                            </div>
                        </div>
                    );
                })}

                {/* Tip card */}
                <div style={{ ...S.card, background: "#110020", borderColor: "#a78bfa33", marginTop: 8 }}>
                    <div style={{ color: "#a78bfa", fontSize: 11, fontWeight: 700, marginBottom: 6 }}>FLUJO POR EJERCICIO</div>
                    {[
                        "1. Intenta resolverlo solo en IntelliJ (15–20 min máximo)",
                        "2. Si te bloqueas: Ctrl+Esc → pregunta a Claude el por qué, no solo la solución",
                        "3. Lee la solución, ciérrala, escríbela de memoria",
                        "4. Pregunta a Claude: '¿Cuándo usarías una estructura diferente aquí?'",
                        "5. Marca como completado y pasa al siguiente",
                    ].map((t, i) => (
                        <div key={i} style={{ display: "flex", gap: 8, padding: "4px 0", fontSize: 12, color: "#64748b" }}>
                            <span style={{ color: "#a78bfa" }}>→</span>
                            <span>{t}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LeetCodePlan;
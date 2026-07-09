/* Lucide icon helper — the app uses lucide-react; we mirror the exact set at
   runtime from the Lucide UMD global (window.lucide.icons[Name]). */
function Icon({ name, size = 20, stroke = 2, style }) {
  const data = window.lucide && window.lucide.icons ? window.lucide.icons[name] : null;
  if (!data) return React.createElement("span", { style: { display: "inline-block", width: size, height: size, ...style } });
  return React.createElement(
    "svg",
    { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: stroke, strokeLinecap: "round", strokeLinejoin: "round", style },
    data.map((c, i) => React.createElement(c[0], { ...c[1], key: i }))
  );
}
Object.assign(window, { Icon });

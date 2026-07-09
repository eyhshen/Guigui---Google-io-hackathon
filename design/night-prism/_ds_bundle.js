/* @ds-bundle: {"format":4,"namespace":"NightPrismDesignSystem_4de317","components":[{"name":"Button","sourcePath":"components/actions/Button.jsx"},{"name":"Chip","sourcePath":"components/actions/Chip.jsx"},{"name":"PrismBackground","sourcePath":"components/ambient/PrismBackground.jsx"},{"name":"EvidenceTag","sourcePath":"components/display/EvidenceTag.jsx"},{"name":"ScreenHeader","sourcePath":"components/display/ScreenHeader.jsx"},{"name":"SectionDivider","sourcePath":"components/display/SectionDivider.jsx"},{"name":"TextField","sourcePath":"components/forms/TextField.jsx"},{"name":"Textarea","sourcePath":"components/forms/Textarea.jsx"},{"name":"SegmentedControl","sourcePath":"components/navigation/SegmentedControl.jsx"},{"name":"TabBar","sourcePath":"components/navigation/TabBar.jsx"},{"name":"BottleGlyph","sourcePath":"components/product/BottleGlyph.jsx"},{"name":"PaoMeter","sourcePath":"components/product/PaoMeter.jsx"},{"name":"BottomSheet","sourcePath":"components/surfaces/BottomSheet.jsx"},{"name":"Card","sourcePath":"components/surfaces/Card.jsx"},{"name":"Toast","sourcePath":"components/surfaces/Toast.jsx"}],"sourceHashes":{"components/actions/Button.jsx":"6d86feeeb402","components/actions/Chip.jsx":"8b910e849208","components/ambient/PrismBackground.jsx":"d421c000ccdf","components/display/EvidenceTag.jsx":"b014cbd3c726","components/display/ScreenHeader.jsx":"b7e0fbccb557","components/display/SectionDivider.jsx":"06f3ed1a46a1","components/forms/TextField.jsx":"4bbd996bd944","components/forms/Textarea.jsx":"e0677989c5a5","components/navigation/SegmentedControl.jsx":"26959192838c","components/navigation/TabBar.jsx":"54de8ce6f6dd","components/product/BottleGlyph.jsx":"0df511d654b3","components/product/PaoMeter.jsx":"990a9c1fc544","components/surfaces/BottomSheet.jsx":"4ad05f7aaa73","components/surfaces/Card.jsx":"dcbba38534b1","components/surfaces/Toast.jsx":"25e9353cb4d0","ui_kits/shelfie/ShelfieAI.jsx":"58271e0c4257","ui_kits/shelfie/ShelfieExplore.jsx":"9ffd38a55c84","ui_kits/shelfie/ShelfieOnboarding.jsx":"f80fb83c4712","ui_kits/shelfie/ShelfieRoutine.jsx":"835f5ea617be","ui_kits/shelfie/ShelfieScan.jsx":"bf6b95de219b","ui_kits/shelfie/ShelfieSheets.jsx":"2cf50095ee78","ui_kits/shelfie/ShelfieShelf.jsx":"fed7067b5ae4","ui_kits/shelfie/data.js":"f2af9e4f40a5","ui_kits/shelfie/icons.jsx":"d9d3069cf6d9","ui_kits/shelfie/shelfie-ui.jsx":"ee85506bdb0d","ui_kits/shelfie/tweaks-panel.jsx":"6591467622ed"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.NightPrismDesignSystem_4de317 = window.NightPrismDesignSystem_4de317 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/actions/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Pill button. variant="prism" is THE accent — max one per viewport. */
function Button({
  variant = "prism",
  disabled = false,
  wrap = false,
  children,
  style,
  ...rest
}) {
  const [down, setDown] = React.useState(false);
  const isPrism = variant === "prism";
  return /*#__PURE__*/React.createElement("button", _extends({}, rest, {
    disabled: disabled,
    onPointerDown: e => {
      setDown(true);
      rest.onPointerDown && rest.onPointerDown(e);
    },
    onPointerUp: e => {
      setDown(false);
      rest.onPointerUp && rest.onPointerUp(e);
    },
    onPointerLeave: e => {
      setDown(false);
      rest.onPointerLeave && rest.onPointerLeave(e);
    },
    style: {
      font: "inherit",
      fontFamily: "var(--font-ui)",
      cursor: disabled ? "default" : "pointer",
      borderRadius: "var(--r-pill)",
      minHeight: "var(--hit-btn)",
      padding: "0 22px",
      letterSpacing: isPrism ? ".08em" : ".02em",
      fontSize: isPrism ? 15 : 12.5,
      fontWeight: isPrism ? 700 : 600,
      lineHeight: 1.3,
      color: isPrism ? "var(--on-prism)" : "var(--ink)",
      background: isPrism ? "var(--prism)" : "var(--surface)",
      border: isPrism ? "none" : "1px solid rgba(255,255,255,.25)",
      boxShadow: isPrism && !disabled ? "var(--glow-prism)" : "none",
      opacity: disabled ? 0.38 : 1,
      transform: down && !disabled ? "scale(.97)" : "none",
      transition: "transform .15s ease, background .2s ease",
      WebkitTapHighlightColor: "transparent",
      ...style
    }
  }), children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/actions/Button.jsx", error: String((e && e.message) || e) }); }

// components/actions/Chip.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const TONES = {
  rose: {
    text: "#FBD3DA",
    border: "var(--rose)",
    fill: "rgba(240,138,155,.16)",
    glow: "var(--glow-rose)"
  },
  mint: {
    text: "var(--ink-on-mint)",
    border: "var(--mint)",
    fill: "rgba(167,232,192,.14)",
    glow: "0 0 18px -2px rgba(167,232,192,.45)"
  },
  amber: {
    text: "var(--ink-on-amber)",
    border: "var(--amber)",
    fill: "rgba(245,195,119,.14)",
    glow: "0 0 18px -2px rgba(245,195,119,.45)"
  },
  blue: {
    text: "var(--ink-on-blue)",
    border: "var(--blue)",
    fill: "rgba(146,196,242,.16)",
    glow: "0 0 18px -2px rgba(146,196,242,.45)"
  },
  lilac: {
    text: "var(--ink-on-lilac)",
    border: "var(--lilac)",
    fill: "rgba(199,168,240,.16)",
    glow: "0 0 18px -2px rgba(199,168,240,.45)"
  }
};

/** Selectable glass chip; when active it tints in a semantic color. */
function Chip({
  active = false,
  tone = "rose",
  disabled = false,
  children,
  style,
  ...rest
}) {
  const t = TONES[tone] || TONES.rose;
  return /*#__PURE__*/React.createElement("button", _extends({}, rest, {
    disabled: disabled,
    "aria-pressed": active,
    style: {
      font: "inherit",
      fontFamily: "var(--font-ui)",
      cursor: disabled ? "default" : "pointer",
      borderRadius: "var(--r-pill)",
      minHeight: "var(--hit-chip)",
      padding: "10px 15px",
      fontSize: 12.5,
      fontWeight: active ? 700 : 500,
      color: active ? t.text : "var(--ink-soft)",
      background: active ? t.fill : "var(--surface)",
      border: `1px solid ${active ? t.border : "rgba(255,255,255,.2)"}`,
      boxShadow: active ? t.glow : "none",
      opacity: disabled ? 0.38 : 1,
      transition: ".2s",
      WebkitTapHighlightColor: "transparent",
      ...style
    }
  }), children);
}
Object.assign(__ds_scope, { Chip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/actions/Chip.jsx", error: String((e && e.message) || e) }); }

// components/ambient/PrismBackground.jsx
try { (() => {
const GRAIN = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";
const BEAM_GRAD = "linear-gradient(105deg,rgba(240,138,155,.85),rgba(245,195,119,.8) 25%,rgba(167,232,192,.75) 50%,rgba(146,196,242,.8) 75%,rgba(199,168,240,.85))";

/**
 * Ambient ground: two blurred prism beams drifting behind content + a static
 * monochrome film-grain overlay. Mount ONCE per screen, position:relative parent.
 */
function PrismBackground({
  animate = true,
  absolute = true
}) {
  const pos = absolute ? "absolute" : "fixed";
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("style", null, `
        @keyframes np-drift-a { to { transform: rotate(-14deg) translate(-24px,18px); } }
        @keyframes np-drift-b { to { transform: rotate(18deg) translate(30px,-14px); } }
        @media (prefers-reduced-motion: reduce) { .np-beam { animation: none !important; } }
      `), /*#__PURE__*/React.createElement("div", {
    className: "np-beam",
    "aria-hidden": "true",
    style: {
      position: pos,
      zIndex: 0,
      pointerEvents: "none",
      filter: "blur(var(--beam-blur, 30px))",
      opacity: "var(--beam-opacity-a, .42)",
      background: BEAM_GRAD,
      top: -60,
      right: "max(-100px, calc(50% - 320px))",
      width: 300,
      height: 210,
      transform: "rotate(-18deg)",
      borderRadius: 48,
      animation: animate ? "np-drift-a var(--dur-beam-a, 26s) ease-in-out infinite alternate" : "none"
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "np-beam",
    "aria-hidden": "true",
    style: {
      position: pos,
      zIndex: 0,
      pointerEvents: "none",
      filter: "blur(var(--beam-blur, 30px))",
      opacity: "var(--beam-opacity-b, .24)",
      background: BEAM_GRAD,
      bottom: "8%",
      left: "max(-130px, calc(50% - 330px))",
      width: 280,
      height: 170,
      transform: "rotate(14deg)",
      borderRadius: 48,
      animation: animate ? "np-drift-b var(--dur-beam-b, 32s) ease-in-out infinite alternate" : "none"
    }
  }), /*#__PURE__*/React.createElement("div", {
    "aria-hidden": "true",
    style: {
      position: pos,
      inset: 0,
      zIndex: 90,
      pointerEvents: "none",
      opacity: "var(--grain-opacity, .28)",
      mixBlendMode: "overlay",
      backgroundImage: GRAIN,
      backgroundSize: "220px 220px"
    }
  }));
}
Object.assign(__ds_scope, { PrismBackground });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/ambient/PrismBackground.jsx", error: String((e && e.message) || e) }); }

// components/display/EvidenceTag.jsx
try { (() => {
/** Tiny mint-outlined pill for research citations — the signature trust element. */
function EvidenceTag({
  children,
  style
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 9,
      fontWeight: 700,
      borderRadius: "var(--r-pill)",
      padding: "2px 8px",
      letterSpacing: ".06em",
      color: "var(--mint)",
      border: "1px solid rgba(167,232,192,.4)",
      whiteSpace: "nowrap",
      fontFamily: "var(--font-ui)",
      display: "inline-block",
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { EvidenceTag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/EvidenceTag.jsx", error: String((e && e.message) || e) }); }

// components/display/ScreenHeader.jsx
try { (() => {
/**
 * The standard screen header: tiny uppercase English eyebrow over a LARGE+THIN
 * display heading whose one emphasized word carries the prism gradient.
 */
function ScreenHeader({
  eyebrow,
  title,
  em,
  sub,
  size = "md"
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-ui)",
      position: "relative",
      zIndex: 2
    }
  }, eyebrow ? /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--eyebrow-size)",
      letterSpacing: "var(--eyebrow-tracking)",
      color: "var(--muted)",
      textTransform: "uppercase"
    }
  }, eyebrow) : null, /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: "var(--font-display, inherit)",
      fontSize: size === "sm" ? "var(--display-size-ob)" : "var(--display-size)",
      fontWeight: "var(--w-thin)",
      letterSpacing: size === "sm" ? ".05em" : "var(--display-tracking)",
      color: "var(--ink)",
      margin: "6px 0 0",
      lineHeight: 1.4
    }
  }, title, em ? /*#__PURE__*/React.createElement("b", {
    style: {
      fontWeight: 700,
      background: "var(--prism)",
      WebkitBackgroundClip: "text",
      backgroundClip: "text",
      color: "transparent"
    }
  }, em) : null), sub ? /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--sub-size)",
      color: "var(--muted)",
      marginTop: 6,
      letterSpacing: ".03em",
      lineHeight: 1.7
    }
  }, sub) : null);
}
Object.assign(__ds_scope, { ScreenHeader });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/ScreenHeader.jsx", error: String((e && e.message) || e) }); }

// components/display/SectionDivider.jsx
try { (() => {
const COLORS = {
  use: "var(--mint)",
  skip: "var(--rose)",
  routine: "var(--lilac)",
  plain: "var(--muted)"
};

/** Tiny tracked section label with a trailing hairline rule ("用这些 ——"). */
function SectionDivider({
  tone = "plain",
  children,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      letterSpacing: ".32em",
      color: COLORS[tone] || COLORS.plain,
      display: "flex",
      alignItems: "center",
      gap: 10,
      margin: "18px 0 10px",
      fontFamily: "var(--font-ui)",
      ...style
    }
  }, children, /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      borderTop: "1px solid rgba(255,255,255,.12)"
    }
  }));
}
Object.assign(__ds_scope, { SectionDivider });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/SectionDivider.jsx", error: String((e && e.message) || e) }); }

// components/forms/TextField.jsx
try { (() => {
/**
 * Text / number / month input on the dark glass ground. Optional eyebrow label.
 * Controlled (value+onChange) or uncontrolled (defaultValue, for <form> capture).
 */
function TextField({
  label,
  type = "text",
  name,
  value,
  defaultValue,
  onChange,
  placeholder,
  min,
  max,
  step,
  required,
  inputMode,
  autoComplete = "off",
  style
}) {
  const [focus, setFocus] = React.useState(false);
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: "block",
      ...style
    }
  }, label ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      fontSize: 10,
      fontWeight: 700,
      letterSpacing: ".08em",
      textTransform: "uppercase",
      color: "var(--muted)",
      marginBottom: 6
    }
  }, label) : null, /*#__PURE__*/React.createElement("input", {
    type: type,
    name: name,
    value: value,
    defaultValue: defaultValue,
    onChange: onChange,
    placeholder: placeholder,
    min: min,
    max: max,
    step: step,
    required: required,
    inputMode: inputMode,
    autoComplete: autoComplete,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      width: "100%",
      boxSizing: "border-box",
      font: "inherit",
      fontSize: 13,
      color: "var(--ink)",
      background: "var(--surface)",
      border: `1px solid ${focus ? "var(--border-lilac)" : "var(--line)"}`,
      borderRadius: "var(--r-card-sm)",
      padding: "12px 14px",
      boxShadow: focus ? "var(--glow-lilac)" : "none",
      transition: ".18s",
      fontVariantNumeric: "tabular-nums"
    }
  }));
}
Object.assign(__ds_scope, { TextField });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/TextField.jsx", error: String((e && e.message) || e) }); }

// components/forms/Textarea.jsx
try { (() => {
/**
 * Multiline input on dark glass. Enter submits (Shift+Enter = newline) when
 * onSubmit is provided — matches the AI advisor composer. Pair with a send Button.
 */
function Textarea({
  value,
  onChange,
  placeholder,
  onSubmit,
  rows = 1,
  disabled,
  style
}) {
  const [focus, setFocus] = React.useState(false);
  return /*#__PURE__*/React.createElement("textarea", {
    value: value,
    onChange: onChange,
    placeholder: placeholder,
    rows: rows,
    disabled: disabled,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    onKeyDown: e => {
      if (onSubmit && e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        onSubmit();
      }
    },
    style: {
      flex: 1,
      width: "100%",
      boxSizing: "border-box",
      font: "inherit",
      fontSize: 13,
      lineHeight: 1.6,
      color: "var(--ink)",
      background: "var(--surface)",
      resize: "none",
      border: `1px solid ${focus ? "var(--border-lilac)" : "var(--line)"}`,
      borderRadius: "var(--r-card-sm)",
      padding: "13px 15px",
      boxShadow: focus ? "var(--glow-lilac)" : "none",
      transition: ".18s",
      ...style
    }
  });
}
Object.assign(__ds_scope, { Textarea });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Textarea.jsx", error: String((e && e.message) || e) }); }

// components/navigation/SegmentedControl.jsx
try { (() => {
/**
 * Segmented control — 2-3 options in a glass track; the active segment lifts to
 * a raised glass fill. Used for the routine sub-tabs and the skin-type picker.
 * Options are strings or { value, label } objects.
 */
function SegmentedControl({
  options = [],
  value,
  onChange,
  name,
  style
}) {
  const opts = options.map(o => typeof o === "string" ? {
    value: o,
    label: o
  } : o);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 4,
      padding: 4,
      background: "var(--surface)",
      border: "1px solid var(--line)",
      borderRadius: "var(--r-card-sm)",
      ...style
    }
  }, opts.map(o => {
    const active = o.value === value;
    return /*#__PURE__*/React.createElement("button", {
      key: o.value,
      type: "button",
      "aria-pressed": active,
      onClick: () => onChange && onChange(o.value),
      style: {
        flex: 1,
        font: "inherit",
        fontSize: 12.5,
        cursor: "pointer",
        padding: "9px 6px",
        borderRadius: 11,
        transition: ".18s",
        fontWeight: active ? 700 : 500,
        whiteSpace: "nowrap",
        border: `1px solid ${active ? "var(--line)" : "transparent"}`,
        color: active ? "var(--ink)" : "var(--muted)",
        background: active ? "var(--surface-2)" : "transparent"
      }
    }, o.label);
  }), name ? /*#__PURE__*/React.createElement("input", {
    type: "hidden",
    name: name,
    value: value || ""
  }) : null);
}
Object.assign(__ds_scope, { SegmentedControl });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/SegmentedControl.jsx", error: String((e && e.message) || e) }); }

// components/navigation/TabBar.jsx
try { (() => {
/**
 * Bottom navigation dock — glass bar, hairline top, safe-area aware.
 * Icon-agnostic: each item supplies its own `icon` node (the kit passes Lucide
 * icons, matching the app's lucide-react set). Active item brightens to --ink
 * with a small prism indicator dot; inactive sits at --dim.
 */
function TabBar({
  items = [],
  value,
  onChange,
  style,
  showLabels = true
}) {
  return /*#__PURE__*/React.createElement("nav", {
    style: {
      display: "flex",
      alignItems: "stretch",
      background: "linear-gradient(180deg, rgba(22,20,31,.4), var(--bg) 70%)",
      borderTop: "1px solid var(--line)",
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      padding: "10px 8px calc(10px + var(--sab))",
      ...style
    }
  }, items.map(it => {
    const active = it.key === value;
    return /*#__PURE__*/React.createElement("button", {
      key: it.key,
      onClick: () => onChange && onChange(it.key),
      "aria-current": active,
      "aria-label": it.label,
      style: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 4,
        background: "none",
        border: "none",
        cursor: "pointer",
        padding: "4px 0",
        color: active ? "var(--ink)" : "var(--dim)",
        transition: ".18s",
        WebkitTapHighlightColor: "transparent"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: "grid",
        placeItems: "center",
        height: 22,
        opacity: active ? 1 : .8
      }
    }, it.icon), showLabels && it.label ? /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 9.5,
        fontWeight: active ? 700 : 500,
        letterSpacing: ".02em"
      }
    }, it.label) : null, /*#__PURE__*/React.createElement("i", {
      style: {
        width: 14,
        height: 3,
        borderRadius: 99,
        marginTop: 1,
        background: active ? "var(--prism)" : "transparent"
      }
    }));
  }));
}
Object.assign(__ds_scope, { TabBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/TabBar.jsx", error: String((e && e.message) || e) }); }

// components/product/BottleGlyph.jsx
try { (() => {
/* Flat bottle glyphs — one per real ProductShape (matches upstream Bottle.tsx:
   'pump' | 'tube' | 'jar' | 'dropper' | 'spray' | 'stick' | 'bottle').
   viewBox 48x64. Layered opacity gives the flat "cap + body + label" read. */
const GLYPHS = {
  pump: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M20 6 h12 v4 h-8 v4 h-4 z",
    opacity: ".85"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "21",
    y: "14",
    width: "7",
    height: "7",
    opacity: ".6"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "13",
    y: "21",
    width: "23",
    height: "38",
    rx: "5"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "17",
    y: "34",
    width: "15",
    height: "13",
    rx: "2",
    fill: "#fff",
    opacity: ".28"
  })),
  dropper: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("circle", {
    cx: "24",
    cy: "7",
    r: "4.5",
    opacity: ".85"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "20",
    y: "10",
    width: "8",
    height: "12",
    rx: "2.5",
    opacity: ".6"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "14",
    y: "24",
    width: "20",
    height: "35",
    rx: "5"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "18",
    y: "36",
    width: "12",
    height: "12",
    rx: "2",
    fill: "#fff",
    opacity: ".28"
  })),
  jar: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("rect", {
    x: "12",
    y: "18",
    width: "24",
    height: "9",
    rx: "3",
    opacity: ".85"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "9",
    y: "29",
    width: "30",
    height: "30",
    rx: "7"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "14",
    y: "38",
    width: "20",
    height: "10",
    rx: "2",
    fill: "#fff",
    opacity: ".28"
  })),
  tube: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("rect", {
    x: "18",
    y: "6",
    width: "12",
    height: "8",
    rx: "2",
    opacity: ".85"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M16 16 h16 l2 36 a6 6 0 0 1 -6 7 h-8 a6 6 0 0 1 -6 -7 z"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "19",
    y: "30",
    width: "10",
    height: "14",
    rx: "2",
    fill: "#fff",
    opacity: ".28"
  })),
  stick: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("rect", {
    x: "16",
    y: "8",
    width: "16",
    height: "11",
    rx: "3",
    opacity: ".85"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "18",
    y: "21",
    width: "12",
    height: "38",
    rx: "4"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "21",
    y: "30",
    width: "6",
    height: "16",
    rx: "2",
    fill: "#fff",
    opacity: ".28"
  })),
  spray: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M13 8 h11 v4 h-7 v3 h-4 z",
    opacity: ".85"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "20",
    y: "7",
    width: "10",
    height: "4",
    rx: "1",
    opacity: ".6"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "18",
    y: "15",
    width: "8",
    height: "7",
    opacity: ".6"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "14",
    y: "22",
    width: "20",
    height: "37",
    rx: "6"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "18",
    y: "34",
    width: "12",
    height: "14",
    rx: "2",
    fill: "#fff",
    opacity: ".28"
  })),
  bottle: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("rect", {
    x: "19",
    y: "6",
    width: "10",
    height: "6",
    rx: "1.5",
    opacity: ".85"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "20.5",
    y: "12",
    width: "7",
    height: "6",
    opacity: ".6"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M15 20 q9 -4 18 0 v33 a6 6 0 0 1 -6 6 h-6 a6 6 0 0 1 -6 -6 z"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "19",
    y: "32",
    width: "10",
    height: "14",
    rx: "2",
    fill: "#fff",
    opacity: ".28"
  })),
  pads: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("rect", {
    x: "10",
    y: "14",
    width: "28",
    height: "8",
    rx: "3",
    opacity: ".85"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "8",
    y: "24",
    width: "32",
    height: "35",
    rx: "7"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "24",
    cy: "41",
    r: "8",
    fill: "#fff",
    opacity: ".28"
  }))
};

/* category (real English keys + lowercase aliases) → default shape + Night Prism gradient */
const CAT = {
  serum: {
    glyph: "dropper",
    a: "#A7E8C0",
    b: "#4E8A68"
  },
  toner: {
    glyph: "bottle",
    a: "#92C4F2",
    b: "#5D7FB0"
  },
  moisturizer: {
    glyph: "jar",
    a: "#92C4F2",
    b: "#5D7FB0"
  },
  cream: {
    glyph: "jar",
    a: "#C7A8F0",
    b: "#8465B8"
  },
  lotion: {
    glyph: "pump",
    a: "#92C4F2",
    b: "#5D7FB0"
  },
  sunscreen: {
    glyph: "tube",
    a: "#F5C377",
    b: "#B98A45"
  },
  cleanser: {
    glyph: "pump",
    a: "#92C4F2",
    b: "#5D7FB0"
  },
  treatment: {
    glyph: "dropper",
    a: "#C7A8F0",
    b: "#8465B8"
  },
  makeup: {
    glyph: "stick",
    a: "#F5C0CB",
    b: "#B06E85"
  },
  ghost: {
    glyph: "dropper",
    a: "#4A465C",
    b: "#332F45"
  }
};

/* #RRGGBB → darker shade for the gradient's second stop */
function darken(hex, amt = 0.42) {
  const m = /^#?([0-9a-f]{6})$/i.exec(hex || "");
  if (!m) return hex;
  const n = parseInt(m[1], 16);
  const r = Math.round((n >> 16 & 255) * (1 - amt));
  const g = Math.round((n >> 8 & 255) * (1 - amt));
  const b = Math.round((n & 255) * (1 - amt));
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}
let uid = 0;

/**
 * Flat bottle icon. Drop-in for a real Product.bottle: pass `shape` + `colorHex`.
 * Falls back to a per-category shape + Night Prism gradient when shape/color are absent.
 */
function BottleGlyph({
  shape,
  category = "serum",
  colorHex,
  height = 52,
  style
}) {
  const idRef = React.useRef(null);
  if (idRef.current === null) idRef.current = "np-bg-" + ++uid;
  const cat = CAT[String(category).toLowerCase()] || CAT.serum;
  const glyph = shape && GLYPHS[shape] ? shape : cat.glyph;
  const a = colorHex || cat.a;
  const b = colorHex ? darken(colorHex) : cat.b;
  const w = Math.round(height * (48 / 64));
  return /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 48 64",
    width: w,
    height: height,
    "aria-hidden": "true",
    style: style
  }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("linearGradient", {
    id: idRef.current,
    x1: "0",
    y1: "0",
    x2: "1",
    y2: "1"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0",
    stopColor: a
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "1",
    stopColor: b
  }))), /*#__PURE__*/React.createElement("g", {
    fill: `url(#${idRef.current})`
  }, GLYPHS[glyph]));
}
Object.assign(__ds_scope, { BottleGlyph });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/product/BottleGlyph.jsx", error: String((e && e.message) || e) }); }

// components/product/PaoMeter.jsx
try { (() => {
/** PAO (period-after-opening) meter: mint→amber fill = months remaining. */
function PaoMeter({
  opened = 0,
  pao = 12,
  showLabel = true,
  warn = true,
  style
}) {
  const left = Math.max(0, pao - opened);
  const pct = Math.max(4, Math.min(100, left / pao * 100));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-ui)",
      ...style
    }
  }, showLabel ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      fontSize: 11,
      color: "var(--muted)",
      marginBottom: 7,
      fontVariantNumeric: "tabular-nums"
    }
  }, /*#__PURE__*/React.createElement("span", null, "\u5F00\u5C01 ", opened, " \u4E2A\u6708 \xB7 PAO ", pao, " \u4E2A\u6708"), /*#__PURE__*/React.createElement("b", {
    style: {
      color: "var(--ink)"
    }
  }, "\u8FD8\u5269\u7EA6 ", left, " \u4E2A\u6708")) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 7,
      borderRadius: "var(--r-pill)",
      background: "var(--surface-2)",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("i", {
    style: {
      display: "block",
      height: "100%",
      borderRadius: "var(--r-pill)",
      background: "linear-gradient(90deg, var(--mint), var(--amber))",
      width: pct + "%"
    }
  })), warn && left <= 2 ? /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 8,
      fontSize: 11.5,
      color: "#FFFFFF",
      background: "#FF000017",
      border: "1px solid var(--border-amber)",
      borderRadius: 12,
      padding: 5,
      lineHeight: 1.6,
      textAlign: "center"
    }
  }, "\u23F3 \u5FEB\u5230\u5F00\u5C01\u4FDD\u8D28\u671F\u4E86\u3002\u4F18\u5148\u7528\u5B83\uFF0C\u522B\u6D6A\u8D39\u3002") : null);
}
Object.assign(__ds_scope, { PaoMeter });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/product/PaoMeter.jsx", error: String((e && e.message) || e) }); }

// components/surfaces/BottomSheet.jsx
try { (() => {
/** Bottom sheet sliding over a blurred dark mask. Max-width 480, safe-area aware. */
function BottomSheet({
  open = false,
  onClose,
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    role: "dialog",
    "aria-modal": "true",
    style: {
      position: "fixed",
      inset: 0,
      zIndex: 100,
      pointerEvents: open ? "auto" : "none"
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: "absolute",
      inset: 0,
      background: "var(--mask)",
      backdropFilter: "blur(3px)",
      WebkitBackdropFilter: "blur(3px)",
      opacity: open ? 1 : 0,
      transition: "opacity .25s"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 0,
      maxWidth: "var(--page-max)",
      margin: "0 auto",
      boxSizing: "border-box",
      borderRadius: "var(--r-sheet) var(--r-sheet) 0 0",
      background: "var(--sheet-grad)",
      border: "1px solid var(--line)",
      borderBottom: 0,
      padding: "10px 22px calc(24px + var(--sab))",
      transform: open ? "none" : "translateY(102%)",
      transition: "transform var(--dur-sheet) var(--ease-sheet)",
      fontFamily: "var(--font-ui)",
      color: "var(--ink)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 40,
      height: 4,
      borderRadius: 99,
      background: "rgba(255,255,255,.22)",
      margin: "2px auto 16px"
    }
  }), children));
}
Object.assign(__ds_scope, { BottomSheet });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/surfaces/BottomSheet.jsx", error: String((e && e.message) || e) }); }

// components/surfaces/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const TINTS = {
  glass: {
    bg: "var(--surface)",
    border: "var(--line)",
    color: "var(--muted)"
  },
  mint: {
    bg: "var(--tint-mint)",
    border: "var(--border-mint)",
    color: "var(--ink-on-mint)"
  },
  rose: {
    bg: "var(--tint-rose)",
    border: "var(--border-rose)",
    color: "var(--ink-on-rose)"
  },
  amber: {
    bg: "var(--tint-amber)",
    border: "var(--border-amber)",
    color: "var(--ink-on-amber)"
  },
  blue: {
    bg: "var(--tint-blue)",
    border: "var(--border-blue)",
    color: "var(--ink-on-blue)"
  },
  lilac: {
    bg: "var(--tint-lilac)",
    border: "var(--border-lilac)",
    color: "var(--ink-on-lilac)"
  }
};

/** Glass card, optionally tinted in a semantic color (info / caution / calm notes). */
function Card({
  tone = "glass",
  size = "md",
  glow = false,
  children,
  style,
  ...rest
}) {
  const t = TINTS[tone] || TINTS.glass;
  const glows = {
    mint: "var(--glow-mint)",
    lilac: "var(--glow-lilac)",
    rose: "var(--glow-rose)",
    amber: "0 0 26px -8px rgba(245,195,119,.4)",
    blue: "0 0 26px -8px rgba(146,196,242,.4)",
    glass: "none"
  };
  return /*#__PURE__*/React.createElement("div", _extends({}, rest, {
    style: {
      borderRadius: size === "sm" ? "var(--r-card-sm)" : "var(--r-card)",
      padding: size === "sm" ? "12px 14px" : "var(--card-pad)",
      background: t.bg,
      border: `1px solid ${t.border}`,
      color: t.color,
      fontSize: "var(--body-size)",
      lineHeight: "var(--body-lh)",
      fontFamily: "var(--font-ui)",
      boxShadow: glow ? glows[tone] : "none",
      position: "relative",
      ...style
    }
  }), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/surfaces/Card.jsx", error: String((e && e.message) || e) }); }

// components/surfaces/Toast.jsx
try { (() => {
/** Dark-glass toast pill, centered above the dock. Non-interactive. */
function Toast({
  show = false,
  children,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    role: "status",
    style: {
      position: "fixed",
      left: "50%",
      bottom: "calc(96px + var(--sab))",
      transform: show ? "translateX(-50%)" : "translateX(-50%) translateY(20px)",
      zIndex: 120,
      background: "var(--toast-bg)",
      border: "1px solid var(--line)",
      color: "var(--ink)",
      fontSize: 13,
      fontWeight: 500,
      fontFamily: "var(--font-ui)",
      padding: "11px 20px",
      borderRadius: "var(--r-pill)",
      opacity: show ? 1 : 0,
      pointerEvents: "none",
      transition: ".28s",
      maxWidth: "86%",
      boxShadow: "var(--shadow-toast)",
      textAlign: "center",
      whiteSpace: "nowrap",
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { Toast });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/surfaces/Toast.jsx", error: String((e && e.message) || e) }); }

// ui_kits/shelfie/ShelfieAI.jsx
try { (() => {
/* AI advisor tab — chat + verdict cards + quick chips + Textarea composer.
   Mirrors upstream App.tsx `ai` tab. getVerdict runs as a local mock (data.js). */
const DS_ai = window.NightPrismDesignSystem_4de317;
const D_ai = window.ShelfieData;
function VerdictChips({
  ids,
  tone,
  inventory
}) {
  if (!ids || !ids.length) return null;
  const label = tone === "mint" ? "建议今天使用：" : "建议今天避开：";
  const icon = tone === "mint" ? "Check" : "AlertCircle";
  const col = tone === "mint" ? "var(--mint)" : "var(--rose)";
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 5,
      fontSize: 11,
      fontWeight: 700,
      color: col,
      marginBottom: 7
    }
  }, /*#__PURE__*/React.createElement(window.Icon, {
    name: icon,
    size: 14
  }), " ", label), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: 6
    }
  }, ids.map(id => {
    const p = inventory.find(x => x.id === id);
    return p ? /*#__PURE__*/React.createElement("span", {
      key: id,
      style: {
        fontSize: 10.5,
        fontWeight: 600,
        borderRadius: 999,
        padding: "4px 11px",
        color: tone === "mint" ? "var(--ink-on-mint)" : "var(--ink-on-rose)",
        background: tone === "mint" ? "var(--tint-mint)" : "var(--tint-rose)",
        border: `1px solid ${tone === "mint" ? "var(--border-mint)" : "var(--border-rose)"}`
      }
    }, p.name) : null;
  })));
}
function ShelfieAI({
  messages,
  query,
  setQuery,
  loading,
  onAsk,
  onSend,
  inventory,
  promptProfile,
  onOpenProfile,
  accountCopy,
  onOpenAccount,
  onDismissAccount
}) {
  const {
    Button,
    Textarea,
    EvidenceTag
  } = DS_ai;
  const scrollRef = React.useRef(null);
  React.useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, loading]);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      gap: 12,
      padding: "6px 20px 0",
      minHeight: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    ref: scrollRef,
    style: {
      flex: 1,
      overflowY: "auto",
      display: "flex",
      flexDirection: "column",
      gap: 12,
      minHeight: 0
    }
  }, promptProfile && /*#__PURE__*/React.createElement(window.ProfileCompletionPrompt, {
    title: "\u5728\u95EE AI \u524D\uFF0C\u5148\u8865\u4E00\u70B9\u57FA\u7840\u6863\u6848",
    description: "\u8FD9\u91CC\u4E0D\u62E6\u4F60\u7EE7\u7EED\u63D0\u95EE\uFF0C\u4F46\u5148\u8865\u80A4\u8D28\u548C\u654F\u611F\u6210\u5206\uFF0CAI \u4F1A\u66F4\u5C11\u7ED9\u6CDB\u5316\u5EFA\u8BAE\u3002",
    emphasizedFields: ["肤质", "敏感成分"],
    onOpen: onOpenProfile
  }), accountCopy && /*#__PURE__*/React.createElement(window.AccountPromptCard, {
    copy: accountCopy,
    onOpen: onOpenAccount,
    onDismiss: onDismissAccount
  }), messages.map((m, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: "flex",
      justifyContent: m.sender === "user" ? "flex-end" : "flex-start"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "86%",
      borderRadius: 20,
      padding: "12px 14px",
      fontSize: 12.5,
      lineHeight: 1.7,
      color: "var(--ink)",
      background: m.sender === "user" ? "var(--surface-2)" : "var(--surface)",
      border: "1px solid var(--line)",
      borderTopRightRadius: m.sender === "user" ? 6 : 20,
      borderTopLeftRadius: m.sender === "user" ? 20 : 6
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      whiteSpace: "pre-line"
    }
  }, m.text), m.verdict && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 11,
      paddingTop: 11,
      borderTop: "1px solid var(--line)",
      display: "flex",
      flexDirection: "column",
      gap: 11
    }
  }, /*#__PURE__*/React.createElement(VerdictChips, {
    ids: m.verdict.recommendedIds,
    tone: "mint",
    inventory: inventory
  }), /*#__PURE__*/React.createElement(VerdictChips, {
    ids: m.verdict.avoidIds,
    tone: "rose",
    inventory: inventory
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 7,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement(EvidenceTag, null, "inventory-aware \xB7 \u53EA\u4ECE\u4F60\u67B6\u5B50\u4E0A\u6311"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 10,
      color: "var(--dim)"
    }
  }, "\u4EC5\u4F9B\u53C2\u8003 \xB7 \u975E\u533B\u7597\u5EFA\u8BAE")))))), loading && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "flex-start"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 9,
      background: "var(--surface)",
      border: "1px solid var(--line)",
      borderRadius: 20,
      borderTopLeftRadius: 6,
      padding: "12px 15px",
      fontSize: 12,
      color: "var(--muted)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      gap: 4
    }
  }, [0, 1, 2].map(k => /*#__PURE__*/React.createElement("i", {
    key: k,
    className: "np-dot",
    style: {
      width: 6,
      height: 6,
      borderRadius: 999,
      background: "var(--muted)",
      animation: "np-bounce 1s infinite",
      animationDelay: `${k * 150}ms`
    }
  }))), "GuiGui \u6B63\u5728\u4E3A\u4F60\u8C03\u914D\u8BCA\u7597\u5EFA\u8BAE\u2026"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 7,
      overflowX: "auto",
      paddingBottom: 2,
      scrollbarWidth: "none",
      flex: "none"
    }
  }, D_ai.quickAsks.map(q => /*#__PURE__*/React.createElement("button", {
    key: q.chip,
    onClick: () => onAsk(q.text),
    disabled: loading,
    style: {
      font: "inherit",
      flex: "none",
      cursor: loading ? "default" : "pointer",
      fontSize: 10.5,
      color: "var(--ink-soft)",
      background: "var(--surface)",
      border: "1px solid var(--line)",
      borderRadius: 999,
      padding: "8px 13px",
      whiteSpace: "nowrap",
      opacity: loading ? .5 : 1
    }
  }, q.chip))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 9,
      alignItems: "stretch",
      padding: "0 0 calc(12px + var(--sab))",
      flex: "none"
    }
  }, /*#__PURE__*/React.createElement(Textarea, {
    value: query,
    onChange: e => setQuery(e.target.value),
    placeholder: "\u63CF\u8FF0\u4F60\u5F53\u4E0B\u7684\u76AE\u80A4\u72B6\u51B5\u6216\u56F0\u6270\u2026",
    onSubmit: onSend,
    style: {
      minHeight: 48
    }
  }), /*#__PURE__*/React.createElement(Button, {
    onClick: onSend,
    disabled: loading || !query.trim(),
    "aria-label": "\u53D1\u9001",
    style: {
      minHeight: 0,
      width: 48,
      padding: 0,
      flex: "none",
      alignSelf: "stretch",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement(window.Icon, {
    name: "ArrowRight",
    size: 20
  }))));
}
Object.assign(window, {
  ShelfieAI
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/shelfie/ShelfieAI.jsx", error: String((e && e.message) || e) }); }

// ui_kits/shelfie/ShelfieExplore.jsx
try { (() => {
/* Explore tab — hero pick banner + curated product cards (add → opens add-date). */
const DS_exp = window.NightPrismDesignSystem_4de317;
const D_exp = window.ShelfieData;
function ShelfieExplore({
  onAdd
}) {
  const {
    BottleGlyph
  } = DS_exp;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minHeight: 0,
      overflowY: "auto",
      display: "flex",
      flexDirection: "column",
      gap: 16,
      padding: "6px 20px 8px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      overflow: "hidden",
      borderRadius: "var(--r-sheet)",
      border: "1px solid var(--line)",
      background: "var(--surface)",
      padding: 18,
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: -40,
      right: -30,
      width: 150,
      height: 150,
      borderRadius: "50%",
      background: "radial-gradient(circle, rgba(199,168,240,.28), transparent 70%)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      maxWidth: "68%"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-block",
      fontSize: 9,
      fontWeight: 700,
      letterSpacing: ".08em",
      textTransform: "uppercase",
      color: "var(--on-prism)",
      background: "var(--prism)",
      borderRadius: 999,
      padding: "3px 10px"
    }
  }, "K-Beauty \u7206\u6B3E\u7CBE\u9009"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-display, inherit)",
      fontSize: 17,
      fontWeight: 200,
      letterSpacing: ".02em",
      color: "var(--ink)",
      marginTop: 10,
      lineHeight: 1.45
    }
  }, "\u63A2\u7D22\u6700\u5951\u5408\u4F60\u80A4\u8D28\u7684", /*#__PURE__*/React.createElement("b", {
    style: {
      fontWeight: 700,
      background: "var(--prism)",
      WebkitBackgroundClip: "text",
      backgroundClip: "text",
      color: "transparent"
    }
  }, "\u62A4\u80A4\u597D\u7269")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: "var(--muted)",
      marginTop: 8,
      lineHeight: 1.6
    }
  }, "\u907F\u514D\u76F2\u76EE\u8DDF\u98CE\uFF0CAI \u79D1\u5B66\u6BD4\u5BF9\u6210\u5206\u5E93")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      right: 6,
      bottom: -6,
      opacity: .9
    }
  }, /*#__PURE__*/React.createElement(BottleGlyph, {
    shape: "dropper",
    colorHex: "#C7A8F0",
    height: 96
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 8,
      background: "var(--surface)",
      border: "1px solid var(--line)",
      borderRadius: "var(--r-card)",
      padding: "12px 16px",
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13.5,
      fontWeight: 700,
      color: "var(--ink)",
      whiteSpace: "nowrap"
    }
  }, "\u4E13\u4E3A\u4F60\u7CBE\u9009\u7684 5 \u6B3E\u597D\u7269"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 9.5,
      color: "var(--dim)",
      letterSpacing: ".04em",
      whiteSpace: "nowrap",
      flexShrink: 0
    }
  }, "AI \u6210\u5206\u6BD4\u5BF9")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 12
    }
  }, D_exp.curatedProducts.map(p => /*#__PURE__*/React.createElement("div", {
    key: p.id,
    style: {
      position: "relative",
      display: "flex",
      gap: 14,
      background: "var(--surface)",
      border: "1px solid var(--line)",
      borderRadius: "var(--r-card)",
      padding: 14,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 54,
      height: 68,
      flex: "none",
      borderRadius: "var(--r-thumb)",
      background: "var(--bg-2)",
      border: "1px solid var(--line)",
      display: "grid",
      placeItems: "center"
    }
  }, /*#__PURE__*/React.createElement(BottleGlyph, {
    shape: p.bottle.shape,
    colorHex: p.bottle.colorHex,
    category: p.category,
    height: 44
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0,
      paddingRight: 30
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 7
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 9,
      fontWeight: 600,
      letterSpacing: ".06em",
      textTransform: "uppercase",
      color: "var(--dim)",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis"
    }
  }, p.brand), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: "none",
      fontSize: 9,
      fontWeight: 700,
      color: "var(--ink-on-mint)",
      background: "var(--tint-mint)",
      border: "1px solid var(--border-mint)",
      borderRadius: 999,
      padding: "2px 8px",
      fontVariantNumeric: "tabular-nums"
    }
  }, p.matchScore, "% \u5951\u5408")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12.5,
      fontWeight: 700,
      color: "var(--ink)",
      marginTop: 4,
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis"
    }
  }, p.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10.5,
      color: "var(--muted)",
      marginTop: 3,
      lineHeight: 1.55,
      display: "-webkit-box",
      WebkitLineClamp: 2,
      WebkitBoxOrient: "vertical",
      overflow: "hidden"
    }
  }, p.description), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: 5,
      marginTop: 8
    }
  }, p.tags.map(t => /*#__PURE__*/React.createElement("span", {
    key: t,
    style: {
      fontSize: 8.5,
      fontWeight: 600,
      color: "var(--ink-soft)",
      background: "var(--surface-2)",
      border: "1px solid var(--line)",
      borderRadius: 7,
      padding: "3px 7px"
    }
  }, t)))), /*#__PURE__*/React.createElement("button", {
    onClick: () => onAdd(p),
    "aria-label": "\u6DFB\u52A0\u81F3\u5316\u5986\u67DC",
    style: {
      position: "absolute",
      right: 14,
      top: "50%",
      transform: "translateY(-50%)",
      width: 34,
      height: 34,
      borderRadius: 999,
      background: "var(--prism)",
      color: "var(--on-prism)",
      border: "none",
      cursor: "pointer",
      display: "grid",
      placeItems: "center",
      boxShadow: "var(--glow-prism)"
    }
  }, /*#__PURE__*/React.createElement(window.Icon, {
    name: "Plus",
    size: 17
  }))))));
}
Object.assign(window, {
  ShelfieExplore
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/shelfie/ShelfieExplore.jsx", error: String((e && e.message) || e) }); }

// ui_kits/shelfie/ShelfieOnboarding.jsx
try { (() => {
/* Onboarding 建档 — 5-step warm profile builder. Composes DS primitives. */
const DS_ob = window.NightPrismDesignSystem_4de317;

/* thin display heading with an optional mid-sentence prism word */
function ObQ({
  children,
  override
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-display, inherit)",
      fontSize: "var(--display-size-ob)",
      fontWeight: 200,
      letterSpacing: ".05em",
      lineHeight: 1.4,
      color: "var(--ink)",
      position: "relative",
      zIndex: 2,
      ...(override || {})
    }
  }, children);
}
function Prism({
  children
}) {
  return /*#__PURE__*/React.createElement("b", {
    style: {
      fontWeight: 700,
      background: "var(--prism)",
      WebkitBackgroundClip: "text",
      backgroundClip: "text",
      color: "transparent"
    }
  }, children);
}

/* prism-selectable option tile. tone="rose" flags caution instead of celebrating. */
function ObTile({
  selected,
  tone = "prism",
  wide,
  onClick,
  children
}) {
  const roseSel = tone === "rose" && selected;
  return /*#__PURE__*/React.createElement("button", {
    "aria-pressed": selected,
    onClick: onClick,
    style: {
      font: "inherit",
      cursor: "pointer",
      borderRadius: "var(--r-opt)",
      padding: "14px 6px",
      textAlign: "center",
      fontSize: 14.5,
      fontWeight: selected ? 700 : 500,
      minHeight: 52,
      transition: ".18s",
      gridColumn: wide ? "1 / -1" : undefined,
      WebkitTapHighlightColor: "transparent",
      border: `1px solid ${selected ? roseSel ? "var(--rose)" : "transparent" : "rgba(255,255,255,.18)"}`,
      color: selected ? roseSel ? "var(--ink-on-rose)" : "var(--on-prism)" : "#E4DEF0",
      background: selected ? roseSel ? "var(--tint-rose)" : "var(--prism)" : "var(--surface)",
      boxShadow: roseSel ? "var(--glow-rose)" : selected ? "0 8px 28px -6px rgba(199,168,240,.5)" : "none"
    }
  }, children);
}
function ShelfieOnboarding({
  onDone,
  onSkip,
  toast,
  introStyle
}) {
  const {
    ScreenHeader,
    Button,
    Card
  } = DS_ob;
  const D = window.ShelfieData;
  const STEPS = ["intro", "skinType", "concerns", "actives", "city", "safety", "done"];
  const [step, setStep] = React.useState(0);
  const [data, setData] = React.useState({
    skinType: null,
    concerns: [],
    actives: [],
    sensitive: false,
    city: null,
    safety: []
  });
  const [stOpen, setStOpen] = React.useState(false);
  const [st, setSt] = React.useState({});
  const key = STEPS[step];
  const gridWrap = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 9,
    marginTop: 20,
    position: "relative",
    zIndex: 2
  };
  const why = t => /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: "var(--muted)",
      lineHeight: 1.8,
      marginTop: 9,
      position: "relative",
      zIndex: 2
    }
  }, t);
  const toggleMulti = (field, val, max) => setData(d => {
    const arr = d[field];
    const has = arr.includes(val);
    if (has) return {
      ...d,
      [field]: arr.filter(x => x !== val)
    };
    if (val.includes("没有")) return {
      ...d,
      [field]: [val]
    };
    let next = arr.filter(x => !x.includes("没有"));
    if (max && next.length >= max) {
      toast(`最多选 ${max} 个`);
      return d;
    }
    return {
      ...d,
      [field]: [...next, val]
    };
  });
  const answerSt = (k, v) => {
    const ns = {
      ...st,
      [k]: v
    };
    setSt(ns);
    if ("tight" in ns && "oil" in ns) {
      const g = ns.tight && ns.oil ? "混合" : ns.tight ? "干性" : ns.oil ? "油性" : "中性";
      setData(d => ({
        ...d,
        skinType: g
      }));
    }
  };
  const next = () => {
    if (key === "skinType" && !data.skinType) return toast("选一个吧");
    if (key === "concerns" && !data.concerns.length) return toast("至少选一个");
    if (key === "actives" && !data.actives.length) return toast("至少选一个(没有就选\u201c都没有\u201d)");
    if (key === "city" && !data.city) return toast("选一个吧");
    if (key === "safety" && !data.safety.length) return toast("如实勾选,没有就选\u201c以上都没有\u201d");
    if (key === "done") return onDone(data);
    setStep(s => s + 1);
  };
  const pct = Math.round(step / (STEPS.length - 1) * 100);
  const label = key === "intro" ? "建档" : key === "done" ? "完成" : `${step} / 5`;
  const cta = key === "intro" ? "开始" : key === "done" ? "进我的架子 →" : key === "safety" ? "完成 ✓" : "下一步";

  /* ---- step bodies ---- */
  let body;
  if (key === "intro") {
    body = /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "0 28px",
        textAlign: "center",
        position: "relative",
        zIndex: 2
      }
    }, /*#__PURE__*/React.createElement("img", {
      src: "../../assets/guigui-logo.png",
      alt: "\u67DC\u67DC",
      style: {
        height: 120,
        width: "auto",
        display: "block",
        margin: "0 auto 26px",
        filter: "drop-shadow(0 0 28px rgba(199,168,240,.55))"
      }
    }), /*#__PURE__*/React.createElement(ObQ, {
      override: introStyle
    }, "\u6B22\u8FCE\u6765\u5230\u4F60\u7684", /*#__PURE__*/React.createElement(Prism, null, "\u67DC\u67DC")), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        color: "var(--muted)",
        lineHeight: 2,
        marginTop: 16
      }
    }, "\u51C6\u5907\u597D\u66F4\u4E86\u89E3\u4F60\u7684\u67DC\u5B50\u4E86\u5417\uFF1F"), /*#__PURE__*/React.createElement("button", {
      onClick: onSkip,
      style: {
        font: "inherit",
        marginTop: 22,
        fontSize: 10,
        fontWeight: 600,
        color: "var(--ink)",
        background: "var(--surface)",
        border: "1px solid var(--line)",
        borderRadius: 999,
        padding: "9px 18px",
        cursor: "pointer",
        minHeight: 35,
        alignSelf: "center",
        whiteSpace: "nowrap"
      }
    }, "\u5148\u901B\u901B\uFF0C\u4E4B\u540E\u518D\u5EFA\u6863\u3002"));
  } else if (key === "skinType") {
    const g = data.skinType;
    body = /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "22px 20px 0"
      }
    }, /*#__PURE__*/React.createElement(ObQ, null, "\u4F60\u7684", /*#__PURE__*/React.createElement(Prism, null, "\u80A4\u8D28"), "\u662F?"), why("决定质地耐受和成分起点。不确定的话,下面有 2 题自测。"), /*#__PURE__*/React.createElement("div", {
      style: gridWrap
    }, D.OB.skinType.map(o => /*#__PURE__*/React.createElement(ObTile, {
      key: o,
      selected: g === o,
      onClick: () => setData(d => ({
        ...d,
        skinType: o
      }))
    }, o))), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 12,
        position: "relative",
        zIndex: 2
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => setStOpen(v => !v),
      style: {
        font: "inherit",
        fontSize: 11.5,
        fontWeight: 600,
        color: "var(--ink-on-blue)",
        background: "var(--tint-blue)",
        border: "1px solid var(--border-blue)",
        borderRadius: 999,
        padding: "8px 15px",
        cursor: "pointer",
        minHeight: 36,
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        whiteSpace: "nowrap"
      }
    }, "\u4E0D\u786E\u5B9A?\u81EA\u6D4B 2 \u9898 ", stOpen ? "↑" : "→"), stOpen && /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 8,
        borderRadius: 16,
        border: "1px solid var(--line)",
        background: "var(--surface)",
        padding: "12px 14px"
      }
    }, /*#__PURE__*/React.createElement(StQ, {
      q: "1 \xB7 \u6D01\u9762\u540E 10 \u5206\u949F,\u4EC0\u4E48\u90FD\u4E0D\u6D82,\u8138\u4F1A\u7D27\u7EF7\u5417?",
      a: ["会紧绷", "不会"],
      sel: st.tight,
      onPick: i => answerSt("tight", i === 0 ? 1 : 0)
    }), /*#__PURE__*/React.createElement(StQ, {
      q: "2 \xB7 \u5230\u4E0B\u5348,T \u533A(\u989D\u5934/\u9F3B\u5B50)\u660E\u663E\u51FA\u6CB9\u5417?",
      a: ["明显出油", "不明显"],
      sel: st.oil,
      onPick: i => answerSt("oil", i === 0 ? 1 : 0)
    }), "tight" in st && "oil" in st && /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: "var(--mint)"
      }
    }, "\u2192 \u66F4\u50CF\u300C", data.skinType, "\u300D,\u5E2E\u4F60\u9009\u597D\u4E86(\u53EF\u6539)"))));
  } else if (key === "concerns") {
    body = /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "22px 20px 0"
      }
    }, /*#__PURE__*/React.createElement(ObQ, null, "\u6700\u60F3\u89E3\u51B3\u7684", /*#__PURE__*/React.createElement(Prism, null, "\u62A4\u80A4\u56F0\u6270"), "?"), why("定向成分——这里只放护肤困扰;遮盖/上妆属于彩妆,不混在这里(最多选 2 个)。"), /*#__PURE__*/React.createElement("div", {
      style: gridWrap
    }, D.OB.concerns.map(o => /*#__PURE__*/React.createElement(ObTile, {
      key: o,
      selected: data.concerns.includes(o),
      onClick: () => toggleMulti("concerns", o, 2)
    }, o))), data.concerns.length > 0 && /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 14,
        fontSize: 12,
        lineHeight: 1.7,
        color: "var(--ink-on-blue)"
      }
    }, "\u5DF2\u9009 ", data.concerns.length, "/2", data.concerns.includes("泛红") ? " · 选了泛红:后面会默认帮你避开酸类/A醇" : ""));
  } else if (key === "actives") {
    body = /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "22px 20px 0"
      }
    }, /*#__PURE__*/React.createElement(ObQ, null, "\u6B63\u5728\u7528\u7684", /*#__PURE__*/React.createElement(Prism, null, "\u529F\u6548\u6210\u5206"), "?"), why("防叠加冲突、避免刺激(比如 A醇 和酸类别一起上脸)。"), /*#__PURE__*/React.createElement("div", {
      style: gridWrap
    }, D.OB.actives.map(o => /*#__PURE__*/React.createElement(ObTile, {
      key: o,
      selected: data.actives.includes(o),
      onClick: () => toggleMulti("actives", o)
    }, o))), /*#__PURE__*/React.createElement("div", {
      style: {
        ...gridWrap,
        marginTop: 12
      }
    }, /*#__PURE__*/React.createElement(ObTile, {
      wide: true,
      selected: data.sensitive,
      onClick: () => setData(d => ({
        ...d,
        sensitive: !d.sensitive
      }))
    }, "\u5BB9\u6613\u654F\u611F / \u6709\u8FC7\u654F\u53F2 ", data.sensitive ? "✓" : "")));
  } else if (key === "city") {
    const w = data.city ? D.CITY_WEATHER[data.city] : null;
    body = /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "22px 20px 0"
      }
    }, /*#__PURE__*/React.createElement(ObQ, null, "\u4F60\u5728", /*#__PURE__*/React.createElement(Prism, null, "\u54EA\u4E2A\u57CE\u5E02"), "?"), why("用当地气候(气温/湿度/紫外/季节)调整推荐——基于皮肤科研究,不是拍脑袋。"), /*#__PURE__*/React.createElement("div", {
      style: gridWrap
    }, D.OB.cities.map(o => /*#__PURE__*/React.createElement(ObTile, {
      key: o,
      selected: data.city === o,
      onClick: () => setData(d => ({
        ...d,
        city: o
      }))
    }, o))), w && /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 16,
        borderRadius: "var(--r-card-lg)",
        padding: "15px 16px",
        background: "var(--surface)",
        border: "1px solid var(--line)",
        position: "relative",
        zIndex: 2,
        overflow: "hidden"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        position: "absolute",
        top: -30,
        right: -30,
        width: 130,
        height: 130,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(245,195,119,.35), transparent 70%)"
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 17,
        fontWeight: 600,
        display: "flex",
        alignItems: "baseline",
        gap: 8,
        position: "relative"
      }
    }, "\uD83D\uDCCD ", data.city, " ", /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 26,
        fontWeight: 200,
        fontVariantNumeric: "tabular-nums"
      }
    }, w.temp, "\xB0")), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 6,
        marginTop: 10,
        flexWrap: "wrap",
        position: "relative"
      }
    }, [`湿度 ${w.humidity}%`, `UV ${w.uv}`, w.season, w.tag].map(c => /*#__PURE__*/React.createElement("span", {
      key: c,
      style: {
        fontSize: 10,
        fontWeight: 600,
        color: "var(--ink-on-blue)",
        border: "1px solid var(--border-blue)",
        borderRadius: 999,
        padding: "4px 10px",
        fontVariantNumeric: "tabular-nums"
      }
    }, c))), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: "var(--muted)",
        lineHeight: 1.7,
        marginTop: 10,
        position: "relative"
      }
    }, "\u67DC\u67DC\u4F1A\u6839\u636E\u4F60\u6240\u5728\u5730\u70B9\u7ED9\u4F60\u5B9A\u5236\u72EC\u5C5E\u4E8E\u4F60\u7684\u62A4\u80A4\u5EFA\u8BAE")));
  } else if (key === "safety") {
    const serious = data.safety.filter(x => x !== "以上都没有");
    body = /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "22px 20px 0"
      }
    }, /*#__PURE__*/React.createElement(ObQ, null, "\u6709\u4EE5\u4E0B\u60C5\u51B5\u5417?", /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 13,
        color: "var(--muted)",
        fontWeight: 400,
        letterSpacing: 0
      }
    }, "(\u5982\u5B9E\u52FE\u9009)")), why("涉及安全:命中会建议先看皮肤科医生,App 只做温和整理,不替代诊断。"), /*#__PURE__*/React.createElement("div", {
      style: gridWrap
    }, D.OB.safety.map(o => {
      const clear = o.includes("没有");
      return /*#__PURE__*/React.createElement(ObTile, {
        key: o,
        wide: !clear,
        tone: clear ? "prism" : "rose",
        selected: data.safety.includes(o),
        onClick: () => toggleMulti("safety", o)
      }, o);
    })), serious.length > 0 && /*#__PURE__*/React.createElement(Card, {
      tone: "amber",
      size: "sm",
      glow: true,
      style: {
        marginTop: 14
      }
    }, "\u26A0\uFE0F \u4F60\u52FE\u9009\u4E86\u300C", serious.join("、"), "\u300D\u2014\u2014\u5EFA\u8BAE", /*#__PURE__*/React.createElement("b", {
      style: {
        color: "var(--ink)"
      }
    }, "\u5148\u770B\u76AE\u80A4\u79D1\u533B\u751F\u9762\u8BCA"), ";\u63A8\u8350\u91CC\u4F1A\u81EA\u52A8\u6392\u9664\u523A\u6FC0\u6027\u529F\u6548\u6210\u5206\u3002"));
  } else {
    const w = D.CITY_WEATHER[data.city];
    const serious = data.safety.filter(x => x !== "以上都没有");
    body = /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: "center",
        padding: "26px 20px 0",
        position: "relative",
        zIndex: 2
      }
    }, /*#__PURE__*/React.createElement(ScreenHeader, {
      eyebrow: "PROFILE READY",
      title: "\u6863\u6848",
      em: "\u5EFA\u597D\u4E86\u3002"
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 6,
        flexWrap: "wrap",
        justifyContent: "center",
        marginTop: 18
      }
    }, /*#__PURE__*/React.createElement(SumChip, null, data.skinType, "\u80A4"), data.concerns.map(c => /*#__PURE__*/React.createElement(SumChip, {
      key: c
    }, c)), data.actives.filter(a => !a.includes("没有")).length > 0 && /*#__PURE__*/React.createElement(SumChip, null, "\u5728\u7528:", data.actives.filter(a => !a.includes("没有")).join("、")), data.sensitive && /*#__PURE__*/React.createElement(SumChip, {
      tone: "rose"
    }, "\u6613\u654F\u611F"), w && /*#__PURE__*/React.createElement(SumChip, {
      tone: "warm"
    }, data.city, " ", w.temp, "\xB0 \xB7 ", w.tag)), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: "var(--muted)",
        marginTop: 18,
        lineHeight: 1.9
      }
    }, "\u4F60\u7684\u67B6\u5B50(8 \u4EF6)\u5C31\u662F\u63A8\u8350\u5019\u9009\u6C60\u3002", /*#__PURE__*/React.createElement("br", null), "\u76AE\u80A4\u6709\u72B6\u51B5\u65F6,\u53BB\u300C\u8BE5\u7528\u54EA\u74F6\u300D\u3002"), serious.length > 0 && /*#__PURE__*/React.createElement(Card, {
      tone: "amber",
      size: "sm",
      style: {
        marginTop: 16,
        textAlign: "left"
      }
    }, "\u4F60\u52FE\u9009\u4E86\u300C", serious.join("、"), "\u300D\u2014\u2014\u5EFA\u8BAE\u5148\u770B\u76AE\u80A4\u79D1\u533B\u751F\u9762\u8BCA;App \u53EA\u505A\u4E00\u822C\u6574\u7406,\u4E0D\u66FF\u4EE3\u8BCA\u65AD\u3002"));
  }
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "14px 20px 0",
      position: "relative",
      zIndex: 2,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => step > 0 ? setStep(s => s - 1) : onSkip(),
    style: {
      font: "inherit",
      fontSize: 14,
      color: "var(--muted)",
      border: "1px solid var(--line)",
      background: "var(--surface)",
      borderRadius: "50%",
      width: 34,
      height: 34,
      padding: 0,
      display: "grid",
      placeItems: "center",
      flex: "none",
      cursor: "pointer",
      visibility: step === 0 ? "hidden" : "visible"
    }
  }, "\u2190"), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      height: 3,
      borderRadius: 99,
      background: "var(--surface-2)",
      margin: "0 14px",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("i", {
    style: {
      display: "block",
      height: "100%",
      background: "var(--prism)",
      borderRadius: 99,
      transition: "width .35s ease",
      width: pct + "%"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 9.5,
      letterSpacing: ".2em",
      color: "var(--muted)",
      whiteSpace: "nowrap"
    }
  }, label)), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflowY: "auto",
      display: "flex",
      flexDirection: "column"
    }
  }, body, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 20
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: window.np_dock()
  }, /*#__PURE__*/React.createElement(Button, {
    style: {
      flex: 1
    },
    onClick: next
  }, cta)));
}
function StQ({
  q,
  a,
  sel,
  onPick
}) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: "var(--ink)",
      marginBottom: 8
    }
  }, q), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      marginBottom: 10
    }
  }, a.map((label, i) => {
    const on = (i === 0 ? 1 : 0) === sel;
    return /*#__PURE__*/React.createElement("button", {
      key: label,
      "aria-pressed": on,
      onClick: () => onPick(i),
      style: {
        font: "inherit",
        flex: 1,
        fontSize: 12,
        borderRadius: 999,
        padding: "8px 0",
        minHeight: 38,
        cursor: "pointer",
        border: `1px solid ${on ? "var(--blue)" : "var(--line)"}`,
        color: on ? "var(--ink-on-blue)" : "var(--ink-soft)",
        background: on ? "rgba(146,196,242,.18)" : "none",
        fontWeight: on ? 700 : 500
      }
    }, label);
  })));
}
function SumChip({
  tone,
  children
}) {
  const c = tone === "rose" ? {
    color: "var(--ink-on-rose)",
    border: "var(--border-rose)"
  } : tone === "warm" ? {
    color: "var(--ink-on-amber)",
    border: "var(--border-amber)"
  } : {
    color: "var(--ink-on-blue)",
    border: "var(--border-blue)"
  };
  return /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 10,
      fontWeight: 600,
      borderRadius: 999,
      padding: "4px 10px",
      color: c.color,
      border: `1px solid ${c.border}`,
      whiteSpace: "nowrap"
    }
  }, children);
}
Object.assign(window, {
  ShelfieOnboarding
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/shelfie/ShelfieOnboarding.jsx", error: String((e && e.message) || e) }); }

// ui_kits/shelfie/ShelfieRoutine.jsx
try { (() => {
/* Routine & Travel tab — segmented sub-tabs; 5-step routine timeline; travel form
   (destination + days inputs) → mock packing list. Mirrors upstream `routine` tab. */
const DS_rt = window.NightPrismDesignSystem_4de317;
const D_rt = window.ShelfieData;
const TONE_CHIP = {
  mint: {
    c: "var(--ink-on-mint)",
    b: "var(--border-mint)",
    bg: "var(--tint-mint)"
  },
  blue: {
    c: "var(--ink-on-blue)",
    b: "var(--border-blue)",
    bg: "var(--tint-blue)"
  },
  amber: {
    c: "var(--ink-on-amber)",
    b: "var(--border-amber)",
    bg: "var(--tint-amber)"
  },
  lilac: {
    c: "var(--ink-on-lilac)",
    b: "var(--border-lilac)",
    bg: "var(--tint-lilac)"
  }
};
function RoutineTimeline({
  inventory
}) {
  const ready = ["Cleanser", "Toner", "Serum", "Moisturizer", "Sunscreen"].filter(c => inventory.some(i => i.category === c)).length;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      background: "var(--surface)",
      border: "1px solid var(--line)",
      borderRadius: "var(--r-sheet)",
      padding: "22px 20px",
      display: "flex",
      flexDirection: "column",
      gap: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 35,
      top: 34,
      bottom: 34,
      width: 2,
      background: "var(--divider)"
    }
  }), D_rt.routineSteps.map(s => {
    const prod = inventory.find(i => i.category === s.cat);
    const t = TONE_CHIP[s.tone];
    return /*#__PURE__*/React.createElement("div", {
      key: s.n,
      style: {
        display: "flex",
        gap: 15,
        position: "relative",
        zIndex: 1
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 26,
        height: 26,
        borderRadius: 999,
        background: "var(--bg-2)",
        border: "3px solid var(--bg)",
        boxShadow: "0 0 0 1px var(--line)",
        color: "var(--ink)",
        fontSize: 11,
        fontWeight: 700,
        display: "grid",
        placeItems: "center",
        flex: "none",
        fontVariantNumeric: "tabular-nums"
      }
    }, s.n), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 8
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12.5,
        fontWeight: 700,
        color: "var(--ink)"
      }
    }, s.label), /*#__PURE__*/React.createElement("span", {
      style: {
        flex: "none",
        fontSize: 8.5,
        fontWeight: 700,
        color: t.c,
        background: t.bg,
        border: `1px solid ${t.b}`,
        borderRadius: 999,
        padding: "2px 8px"
      }
    }, s.timing)), prod ? /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 7,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 8,
        background: "var(--bg-2)",
        border: "1px solid var(--line)",
        borderRadius: 12,
        padding: "9px 12px"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 11.5,
        color: "var(--ink-soft)",
        fontWeight: 500,
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis"
      }
    }, prod.name), /*#__PURE__*/React.createElement(window.Icon, {
      name: "CheckSquare",
      size: 14,
      style: {
        color: "var(--mint)",
        flex: "none"
      }
    })) : /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 10.5,
        color: "var(--dim)",
        fontStyle: "italic",
        marginTop: 6
      }
    }, s.empty)));
  })));
}
function TravelPacking({
  inventory,
  travelRes,
  loading,
  onTravel
}) {
  const {
    Button,
    TextField,
    EvidenceTag
  } = DS_rt;
  const submit = e => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    onTravel(fd.get("destination"), parseInt(fd.get("days"), 10) || 7);
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("form", {
    onSubmit: submit,
    style: {
      background: "var(--surface)",
      border: "1px solid var(--line)",
      borderRadius: "var(--r-sheet)",
      padding: 18,
      display: "flex",
      flexDirection: "column",
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: 700,
      color: "var(--muted)"
    }
  }, "\u667A\u80FD\u89C4\u5212\u76EE\u7684\u5730\u6C14\u5019\u53CA\u63A8\u8350\u7528\u91CF"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(TextField, {
    label: "\u76EE\u7684\u5730",
    name: "destination",
    defaultValue: "\u4E09\u4E9A",
    placeholder: "\u5982\uFF1A\u4F26\u6566\u3001\u4E1C\u4EAC",
    required: true
  }), /*#__PURE__*/React.createElement(TextField, {
    label: "\u65C5\u884C\u5929\u6570",
    name: "days",
    type: "number",
    min: "1",
    defaultValue: "7",
    required: true
  })), /*#__PURE__*/React.createElement(Button, {
    type: "submit",
    disabled: loading
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(window.Icon, {
    name: "Plane",
    size: 16
  }), " ", loading ? "规划中…" : "生成打包清单"))), travelRes && /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--surface)",
      border: "1px solid var(--line)",
      borderRadius: "var(--r-sheet)",
      padding: 18
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10.5,
      fontWeight: 700,
      letterSpacing: ".16em",
      textTransform: "uppercase",
      color: "var(--muted)"
    }
  }, "\u6253\u5305\u6E05\u5355"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 8,
      marginTop: 12
    }
  }, travelRes.selectedIds.map(id => {
    const p = inventory.find(x => x.id === id);
    return p ? /*#__PURE__*/React.createElement("div", {
      key: id,
      style: {
        display: "flex",
        alignItems: "center",
        gap: 11,
        background: "var(--bg-2)",
        border: "1px solid var(--line)",
        borderRadius: 14,
        padding: "10px 12px"
      }
    }, /*#__PURE__*/React.createElement(DS_rt.BottleGlyph, {
      shape: p.bottle.shape,
      colorHex: p.bottle.colorHex,
      category: p.category,
      height: 30
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        fontWeight: 600,
        color: "var(--ink)",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis"
      }
    }, p.name), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 10,
        color: "var(--muted)"
      }
    }, D_rt.categoryLabels[p.category] || p.category)), /*#__PURE__*/React.createElement(window.Icon, {
      name: "Check",
      size: 15,
      style: {
        color: "var(--mint)",
        marginLeft: "auto",
        flex: "none"
      }
    })) : null;
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      color: "var(--muted)",
      lineHeight: 1.7,
      marginTop: 12
    }
  }, travelRes.reason), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 10
    }
  }, /*#__PURE__*/React.createElement(EvidenceTag, null, "\u57FA\u4E8E\u4F60\u7684\u67DC\u5B50 \xB7 \u4E0D\u8D85\u91CF"))));
}
function ShelfieRoutine({
  inventory,
  sub,
  setSub,
  travelRes,
  loading,
  onTravel,
  accountCopy,
  onOpenAccount,
  onDismissAccount
}) {
  const {
    SegmentedControl
  } = DS_rt;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minHeight: 0,
      overflowY: "auto",
      display: "flex",
      flexDirection: "column",
      gap: 14,
      padding: "6px 20px 8px"
    }
  }, accountCopy && /*#__PURE__*/React.createElement(window.AccountPromptCard, {
    copy: accountCopy,
    onOpen: onOpenAccount,
    onDismiss: onDismissAccount
  }), /*#__PURE__*/React.createElement(SegmentedControl, {
    value: sub,
    onChange: setSub,
    options: [{
      value: "routine",
      label: "每日护肤日常"
    }, {
      value: "travel",
      label: "出行智能收纳"
    }]
  }), sub === "routine" ? /*#__PURE__*/React.createElement(RoutineTimeline, {
    inventory: inventory
  }) : /*#__PURE__*/React.createElement(TravelPacking, {
    inventory: inventory,
    travelRes: travelRes,
    loading: loading,
    onTravel: onTravel
  }));
}
Object.assign(window, {
  ShelfieRoutine
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/shelfie/ShelfieRoutine.jsx", error: String((e && e.message) || e) }); }

// ui_kits/shelfie/ShelfieScan.jsx
try { (() => {
/* Scan viewfinder + add-date form. Mirrors upstream Scanner.tsx + add-date view.
   Recognition is mocked (demo) — the real app posts the frame to /api/scan (Gemini). */
const DS_scan = window.NightPrismDesignSystem_4de317;
const D_scan = window.ShelfieData;
function ShelfieScan({
  onBack,
  onRecognize,
  recognizing
}) {
  const {
    BottleGlyph
  } = DS_scan;
  const corners = [{
    top: "15%",
    left: "13%",
    bd: "borderTop borderLeft",
    r: "10px 0 0 0"
  }, {
    top: "15%",
    right: "13%",
    bd: "borderTop borderRight",
    r: "0 10px 0 0"
  }, {
    bottom: "15%",
    left: "13%",
    bd: "borderBottom borderLeft",
    r: "0 0 0 10px"
  }, {
    bottom: "15%",
    right: "13%",
    bd: "borderBottom borderRight",
    r: "0 0 10px 0"
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      background: "var(--bg-scan)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "14px 20px 0"
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onBack,
    style: {
      font: "inherit",
      fontSize: 12,
      color: "var(--ink)",
      background: "var(--surface-2)",
      border: "1px solid var(--line)",
      borderRadius: 999,
      padding: "8px 15px",
      cursor: "pointer"
    }
  }, "\u8FD4\u56DE")), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      position: "relative",
      margin: "16px 20px 6px",
      borderRadius: 26,
      overflow: "hidden",
      background: "radial-gradient(120% 90% at 50% 30%, #232033 0%, #141220 60%, #0D0C13 100%)",
      border: "1px solid var(--line)"
    }
  }, /*#__PURE__*/React.createElement("style", null, `@keyframes np-scanmove{to{top:60%}} @media (prefers-reduced-motion: reduce){.np-sweep{animation:none!important}}`), corners.map((c, i) => /*#__PURE__*/React.createElement("i", {
    key: i,
    style: {
      position: "absolute",
      width: 26,
      height: 26,
      borderRadius: c.r,
      top: c.top,
      bottom: c.bottom,
      left: c.left,
      right: c.right,
      borderStyle: "solid",
      borderColor: "rgba(241,237,247,.85)",
      borderWidth: 0,
      ...(c.bd.includes("borderTop") ? {
        borderTopWidth: 2.5
      } : {}),
      ...(c.bd.includes("borderBottom") ? {
        borderBottomWidth: 2.5
      } : {}),
      ...(c.bd.includes("borderLeft") ? {
        borderLeftWidth: 2.5
      } : {}),
      ...(c.bd.includes("borderRight") ? {
        borderRightWidth: 2.5
      } : {})
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "np-sweep",
    style: {
      position: "absolute",
      left: "14%",
      right: "14%",
      height: 66,
      top: "18%",
      background: "linear-gradient(180deg,transparent,rgba(167,232,192,.22) 45%,rgba(146,196,242,.28) 55%,transparent)",
      filter: "blur(2px)",
      animation: "np-scanmove 2.6s ease-in-out infinite alternate"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: "50%",
      top: "47%",
      transform: "translate(-50%,-50%)",
      opacity: .5
    }
  }, /*#__PURE__*/React.createElement(BottleGlyph, {
    category: "ghost",
    height: 116
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      bottom: 16,
      left: 0,
      right: 0,
      textAlign: "center",
      fontSize: 11.5,
      color: "var(--muted)",
      letterSpacing: ".04em"
    }
  }, recognizing ? "识别中… Gemini 在读瓶身" : "对准瓶身，让它认出这是什么")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "10px 24px calc(18px + var(--sab))"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 92,
      fontSize: 11.5,
      color: "var(--muted)",
      display: "flex",
      alignItems: "center",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement(window.Icon, {
    name: "Upload",
    size: 15
  }), " \u4E0A\u4F20\u7167\u7247"), /*#__PURE__*/React.createElement("button", {
    onClick: onRecognize,
    "aria-label": "\u62CD\u7167\u8BC6\u522B",
    disabled: recognizing,
    style: {
      width: 74,
      height: 74,
      borderRadius: "50%",
      background: "var(--prism)",
      border: "none",
      cursor: "pointer",
      position: "relative",
      boxShadow: "var(--shutter-ring)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      inset: 6,
      borderRadius: "50%",
      border: "2.5px solid var(--on-prism)"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 92,
      fontSize: 11,
      color: "var(--dim)",
      textAlign: "right"
    }
  }, "\u8BC6\u522B\u662F", /*#__PURE__*/React.createElement("br", null), "\u6A21\u62DF\u7684 \xB7 demo")));
}
function ShelfieAddDate({
  scanResult,
  onCancel,
  onConfirm
}) {
  const {
    Button,
    TextField,
    EvidenceTag,
    BottleGlyph
  } = DS_scan;
  const [month, setMonth] = React.useState(D_scan.fmtDate(D_scan.TODAY).slice(0, 7));
  const expiry = D_scan.fmtDate(D_scan.addMonths(D_scan.parseM(month), scanResult.paoMonths || 12)).slice(0, 7);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflowY: "auto",
      display: "flex",
      flexDirection: "column"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "14px 20px 0"
    }
  }, /*#__PURE__*/React.createElement(DS_scan.ScreenHeader, {
    eyebrow: "ADD \xB7 \u786E\u8BA4\u5F00\u5C01\u65F6\u95F4",
    title: "\u5B83\u5DF2\u8BA4\u51FA\uFF0C",
    em: "\u8865\u4E2A\u65E5\u671F",
    size: "sm"
  }), /*#__PURE__*/React.createElement("button", {
    onClick: onCancel,
    style: {
      font: "inherit",
      fontSize: 12,
      color: "var(--muted)",
      background: "none",
      border: "1px solid var(--line)",
      borderRadius: 999,
      padding: "8px 14px",
      cursor: "pointer",
      flex: "none"
    }
  }, "\u53D6\u6D88")), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "18px 20px 0",
      display: "flex",
      flexDirection: "column",
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 15,
      alignItems: "center",
      background: "var(--surface)",
      border: "1px solid var(--line)",
      borderRadius: "var(--r-sheet)",
      padding: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 56,
      height: 72,
      flex: "none",
      borderRadius: "var(--r-thumb)",
      background: "var(--bg-2)",
      border: "1px solid var(--line)",
      display: "grid",
      placeItems: "center"
    }
  }, /*#__PURE__*/React.createElement(BottleGlyph, {
    shape: scanResult.bottle.shape,
    colorHex: scanResult.bottle.colorHex,
    category: scanResult.category,
    height: 48
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 9.5,
      fontWeight: 600,
      letterSpacing: ".08em",
      textTransform: "uppercase",
      color: "var(--dim)"
    }
  }, scanResult.brand), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 700,
      color: "var(--ink)",
      marginTop: 2
    }
  }, scanResult.name), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: 5,
      marginTop: 8
    }
  }, scanResult.keyIngredients.map(ing => /*#__PURE__*/React.createElement("span", {
    key: ing,
    style: {
      fontSize: 9,
      color: "var(--ink-soft)",
      background: "var(--surface-2)",
      border: "1px solid var(--line)",
      borderRadius: 999,
      padding: "2px 8px"
    }
  }, ing))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      fontSize: 12,
      color: "var(--muted)",
      padding: "0 2px"
    }
  }, /*#__PURE__*/React.createElement("span", null, "\u5F00\u5C01\u4FDD\u8D28\u671F (PAO)"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--ink)",
      fontWeight: 600,
      fontVariantNumeric: "tabular-nums"
    }
  }, scanResult.paoMonths, " \u4E2A\u6708")), /*#__PURE__*/React.createElement(TextField, {
    label: "\u5F00\u5C01\u6708\u4EFD",
    type: "month",
    value: month,
    onChange: e => setMonth(e.target.value)
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      color: "var(--muted)",
      display: "flex",
      alignItems: "center",
      gap: 8
    }
  }, "\u9884\u8BA1\u5230\u671F ", /*#__PURE__*/React.createElement("b", {
    style: {
      color: "var(--ink-on-amber)",
      fontVariantNumeric: "tabular-nums"
    }
  }, expiry.replace("-", "年"), "\u6708"), /*#__PURE__*/React.createElement(EvidenceTag, null, "PAO \u4ECE\u5F00\u5C01\u8D77\u7B97 \xB7 T2"))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "auto",
      ...window.np_dock()
    }
  }, /*#__PURE__*/React.createElement(Button, {
    style: {
      flex: 1
    },
    onClick: () => onConfirm(month)
  }, "\u653E\u8FDB\u6211\u7684\u67B6\u5B50 \u2713")));
}
Object.assign(window, {
  ShelfieScan,
  ShelfieAddDate
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/shelfie/ShelfieScan.jsx", error: String((e && e.message) || e) }); }

// ui_kits/shelfie/ShelfieSheets.jsx
try { (() => {
/* Bottom-sheet bodies: product detail, profile editor, guest-account prompt.
   Rendered inside the DS <BottomSheet>. Mirror upstream product sheet /
   profile modal / GuestAccountPromptSheet. */
const DS_sheet = window.NightPrismDesignSystem_4de317;
const D_sheet = window.ShelfieData;
function ProductSheetBody({
  p,
  onClose,
  onDelete
}) {
  const {
    BottleGlyph,
    PaoMeter,
    EvidenceTag
  } = DS_sheet;
  const opened = D_sheet.monthsOpened(p);
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 16,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 74,
      height: 92,
      flex: "none",
      borderRadius: "var(--r-card)",
      background: "var(--bg-2)",
      border: "1px solid var(--line)",
      display: "grid",
      placeItems: "center"
    }
  }, /*#__PURE__*/React.createElement(BottleGlyph, {
    shape: p.bottle.shape,
    colorHex: p.bottle.colorHex,
    category: p.category,
    height: 64
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 9,
      fontWeight: 700,
      letterSpacing: ".08em",
      textTransform: "uppercase",
      color: "var(--muted)",
      background: "var(--surface-2)",
      border: "1px solid var(--line)",
      borderRadius: 999,
      padding: "3px 9px"
    }
  }, p.brand), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      fontWeight: 700,
      color: "var(--ink)",
      marginTop: 8,
      lineHeight: 1.3
    }
  }, p.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      color: "var(--muted)",
      marginTop: 3
    }
  }, D_sheet.categoryLabels[p.category] || p.category))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 10,
      marginTop: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: infoCell()
  }, /*#__PURE__*/React.createElement("div", {
    style: infoLab()
  }, "\u5F00\u5C01\u65F6\u95F4"), /*#__PURE__*/React.createElement("div", {
    style: infoVal()
  }, D_sheet.fmtYearMonth(p.openedDate))), /*#__PURE__*/React.createElement("div", {
    style: infoCell()
  }, /*#__PURE__*/React.createElement("div", {
    style: infoLab()
  }, "\u9884\u8BA1\u5230\u671F"), /*#__PURE__*/React.createElement("div", {
    style: infoVal()
  }, D_sheet.fmtYearMonth(p.expiryDate), " ", /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 10,
      color: "var(--dim)",
      fontWeight: 400
    }
  }, "(", p.paoMonths, "\u4E2A\u6708 PAO)")))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 16
    }
  }, /*#__PURE__*/React.createElement(PaoMeter, {
    opened: opened,
    pao: p.paoMonths
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      fontWeight: 700,
      letterSpacing: ".1em",
      textTransform: "uppercase",
      color: "var(--muted)"
    }
  }, "\u6838\u5FC3\u6D3B\u6027\u6210\u5206 (", p.keyIngredients.length, ")"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: 6,
      marginTop: 9
    }
  }, p.keyIngredients.map(ing => /*#__PURE__*/React.createElement("span", {
    key: ing,
    style: {
      fontSize: 11,
      color: "var(--ink-soft)",
      background: "var(--surface)",
      border: "1px solid var(--line)",
      borderRadius: 999,
      padding: "5px 11px"
    }
  }, ing)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      marginTop: 14
    }
  }, /*#__PURE__*/React.createElement(EvidenceTag, null, "\u6210\u5206\u4E0E PAO \u6765\u81EA\u626B\u63CF\u8BC6\u522B \xB7 T2")), /*#__PURE__*/React.createElement("button", {
    onClick: () => onDelete(p),
    style: {
      font: "inherit",
      marginTop: 16,
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      background: "var(--tint-rose)",
      border: "1px solid var(--border-rose)",
      color: "var(--ink-on-rose)",
      borderRadius: "var(--r-pill)",
      minHeight: 48,
      cursor: "pointer",
      fontSize: 13,
      fontWeight: 600
    }
  }, /*#__PURE__*/React.createElement(window.Icon, {
    name: "Trash2",
    size: 15
  }), " \u4ECE\u67DC\u5B50\u79FB\u9664"));
}
function ProfileModalBody({
  profile,
  onSave
}) {
  const {
    Button,
    TextField,
    SegmentedControl
  } = DS_sheet;
  const [skinType, setSkinType] = React.useState(profile.skinType || "");
  const [sens, setSens] = React.useState((profile.sensitivities || []).join("，"));
  const [act, setAct] = React.useState((profile.currentActives || []).join("，"));
  const [city, setCity] = React.useState(profile.city || "");
  const split = s => s.split(/[,，]/).map(x => x.trim()).filter(Boolean);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      maxHeight: "min(78vh, 620px)",
      overflowY: "auto",
      margin: "0 -4px",
      padding: "0 4px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Noto Sans SC', sans-serif",
      fontSize: 20,
      fontWeight: 500,
      letterSpacing: ".04em",
      color: "var(--ink)"
    }
  }, "\u80A4\u8D28", /*#__PURE__*/React.createElement("b", {
    style: {
      fontFamily: "'Noto Sans SC', sans-serif",
      fontWeight: 700,
      background: "var(--prism)",
      WebkitBackgroundClip: "text",
      backgroundClip: "text",
      color: "transparent"
    }
  }, "\u6863\u6848")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 16,
      marginTop: 14
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: fieldLab()
  }, "\u80A4\u8D28"), /*#__PURE__*/React.createElement(SegmentedControl, {
    value: skinType,
    onChange: setSkinType,
    options: [{
      value: "dry",
      label: "干性"
    }, {
      value: "oily",
      label: "油性"
    }, {
      value: "combination",
      label: "混合"
    }, {
      value: "normal",
      label: "中性"
    }]
  })), /*#__PURE__*/React.createElement(TextField, {
    label: "\u654F\u611F\u6210\u5206 (\u9017\u53F7\u9694\u5F00)",
    value: sens,
    onChange: e => setSens(e.target.value),
    placeholder: "\u5982\uFF1A\u9999\u7CBE, \u9152\u7CBE, \u89C6\u9EC4\u9187"
  }), /*#__PURE__*/React.createElement(TextField, {
    label: "\u5E38\u7528\u6D3B\u6027 (\u9017\u53F7\u9694\u5F00)",
    value: act,
    onChange: e => setAct(e.target.value),
    placeholder: "\u5982\uFF1A\u70DF\u9170\u80FA, \u7EF4C, A\u9187"
  }), /*#__PURE__*/React.createElement(TextField, {
    label: "\u4F60\u5F53\u524D\u6240\u5728\u57CE\u5E02",
    value: city,
    onChange: e => setCity(e.target.value),
    placeholder: "\u5982\uFF1A\u4E0A\u6D77"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10,
      marginTop: 20
    }
  }, /*#__PURE__*/React.createElement(Button, {
    style: {
      flex: 1
    },
    onClick: () => onSave({
      skinType: skinType || null,
      sensitivities: split(sens),
      currentActives: split(act),
      city: city.trim()
    })
  }, "\u4FDD\u5B58\u6863\u6848 \u2713")));
}
function AccountSheetBody({
  copy,
  onClose
}) {
  const {
    Button
  } = DS_sheet;
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10.5,
      fontWeight: 700,
      letterSpacing: ".2em",
      textTransform: "uppercase",
      color: "var(--amber)"
    }
  }, "Save Later"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 17,
      fontWeight: 700,
      color: "var(--ink)",
      marginTop: 6,
      lineHeight: 1.35
    }
  }, copy.title), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12.5,
      lineHeight: 1.7,
      color: "var(--muted)",
      marginTop: 6
    }
  }, copy.description), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--surface)",
      border: "1px solid var(--line)",
      borderRadius: "var(--r-card)",
      padding: 15,
      marginTop: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      fontWeight: 700,
      letterSpacing: ".14em",
      textTransform: "uppercase",
      color: "var(--dim)"
    }
  }, "\u672A\u6765\u8D26\u53F7\u5165\u53E3\u4F1A\u8D1F\u8D23"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 8,
      marginTop: 11
    }
  }, copy.benefits.map(b => /*#__PURE__*/React.createElement("div", {
    key: b,
    style: {
      fontSize: 12.5,
      fontWeight: 500,
      color: "var(--ink-soft)",
      background: "var(--bg-2)",
      border: "1px solid var(--line)",
      borderRadius: 12,
      padding: "10px 12px"
    }
  }, b)))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--tint-amber)",
      border: "1px solid var(--border-amber)",
      borderRadius: "var(--r-card)",
      padding: "12px 14px",
      marginTop: 12,
      fontSize: 11.5,
      lineHeight: 1.7,
      color: "var(--ink-on-amber)"
    }
  }, "\u8FD9\u4E00\u6279\u53EA\u628A guest-first \u7684\u65F6\u673A\u548C\u5165\u53E3\u653E\u5BF9\uFF0C\u4E0D\u63A5 Google / Apple\uFF0C\u4E5F\u4E0D\u505A\u771F\u5B9E\u6301\u4E45\u5316\u3002"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 16
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    style: {
      width: "100%"
    },
    onClick: onClose
  }, "\u77E5\u9053\u4E86\uFF0C\u7EE7\u7EED\u8BBF\u5BA2\u6A21\u5F0F")));
}

/* app menu (hamburger) — carries the brand name (logo-only header omits it) + profile / account entries + disclaimer */
function MenuSheetBody({
  profile,
  onProfile,
  onAccount,
  onClose
}) {
  const D = window.ShelfieData;
  const skin = profile.skinType ? D.skinTypeLabels[profile.skinType] : "未设置";
  const sens = (profile.sensitivities || []).length ? profile.sensitivities.join("、") : "未填写";
  const rows = [{
    icon: "Sliders",
    label: "编辑肤质档案",
    sub: `肤质 ${skin} · 敏感 ${sens}`,
    onClick: onProfile
  }, {
    icon: "Cloud",
    label: "保存与同步",
    sub: "访客模式 · 未来账号入口",
    onClick: onAccount
  }];
  const rowStyle = {
    font: "inherit",
    width: "100%",
    display: "flex",
    alignItems: "center",
    gap: 12,
    background: "var(--surface)",
    border: "1px solid var(--line)",
    borderRadius: 16,
    padding: "12px 14px",
    cursor: "pointer",
    color: "inherit"
  };
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 13
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/guigui-logo.png",
    alt: "\u67DC\u67DC",
    style: {
      height: 42,
      width: "auto",
      display: "block",
      filter: "drop-shadow(0 0 11px rgba(199,168,240,.55))"
    }
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 20,
      fontWeight: 700,
      color: "var(--ink)",
      letterSpacing: ".02em"
    }
  }, "\u67DC\u67DC"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 9.5,
      fontWeight: 600,
      letterSpacing: ".24em",
      textTransform: "uppercase",
      color: "var(--dim)",
      marginTop: 3
    }
  }, "GuiGui Glow \xB7 SK\u0100N"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 10,
      marginTop: 20
    }
  }, rows.map(r => /*#__PURE__*/React.createElement("button", {
    key: r.label,
    onClick: r.onClick,
    style: rowStyle
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 36,
      height: 36,
      flex: "none",
      borderRadius: 12,
      background: "var(--surface-2)",
      border: "1px solid var(--line)",
      display: "grid",
      placeItems: "center",
      color: "var(--ink-soft)"
    }
  }, /*#__PURE__*/React.createElement(window.Icon, {
    name: r.icon,
    size: 17
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      textAlign: "left",
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      fontSize: 13,
      fontWeight: 600,
      color: "var(--ink)"
    }
  }, r.label), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      fontSize: 11,
      color: "var(--muted)",
      marginTop: 2,
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis"
    }
  }, r.sub)), /*#__PURE__*/React.createElement(window.Icon, {
    name: "ChevronRight",
    size: 16,
    style: {
      color: "var(--dim)",
      flex: "none"
    }
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10.5,
      color: "var(--dim)",
      lineHeight: 1.75,
      marginTop: 18,
      textAlign: "center"
    }
  }, "\u67DC\u67DC\u63D0\u4F9B\u7684\u662F\u4E00\u822C\u62A4\u80A4\u6574\u7406\u5EFA\u8BAE\uFF0C\u975E\u533B\u7597\u8BCA\u65AD\u3002\u5B55\u671F / \u5904\u65B9\u836F / \u76AE\u80A4\u7834\u635F\u611F\u67D3\u8BF7\u5148\u54A8\u8BE2\u76AE\u80A4\u79D1\u533B\u751F\u3002"));
}
function infoCell() {
  return {
    background: "var(--surface)",
    border: "1px solid var(--line)",
    borderRadius: "var(--r-card-sm)",
    padding: "11px 13px"
  };
}
function infoLab() {
  return {
    fontSize: 10,
    color: "var(--dim)",
    fontWeight: 600,
    letterSpacing: ".04em"
  };
}
function infoVal() {
  return {
    fontSize: 13,
    color: "var(--ink)",
    fontWeight: 600,
    marginTop: 4,
    fontVariantNumeric: "tabular-nums"
  };
}
function fieldLab() {
  return {
    fontSize: 10,
    fontWeight: 700,
    letterSpacing: ".08em",
    textTransform: "uppercase",
    color: "var(--muted)",
    marginBottom: 8
  };
}
Object.assign(window, {
  ProductSheetBody,
  ProfileModalBody,
  AccountSheetBody,
  MenuSheetBody
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/shelfie/ShelfieSheets.jsx", error: String((e && e.message) || e) }); }

// ui_kits/shelfie/ShelfieShelf.jsx
try { (() => {
/* Shelf tab — profile/account prompts + 今日摘要 + category filter + product grid.
   Grid mirrors upstream Shelf.tsx (3-col, expiry badges, highlight ring). */
const DS_shelf = window.NightPrismDesignSystem_4de317;
const D_shelf = window.ShelfieData;

/* AI-generated product image slot — tinted frame + faint stripes stand in for the
   generated shot (real app renders an AI image here). Bottle glyph = placeholder subject. */
function ProductImageSlot({
  p,
  h
}) {
  const {
    BottleGlyph
  } = DS_shelf;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      position: "absolute",
      inset: 0,
      background: `radial-gradient(118% 84% at 50% 12%, ${p.bottle.colorHex}30, transparent 62%)`
    }
  }), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      position: "absolute",
      inset: 0,
      backgroundImage: "repeating-linear-gradient(135deg, rgba(255,255,255,.035) 0 6px, transparent 6px 13px)"
    }
  }), /*#__PURE__*/React.createElement(BottleGlyph, {
    shape: p.bottle.shape,
    colorHex: p.bottle.colorHex,
    category: p.category,
    height: h
  }), /*#__PURE__*/React.createElement("span", {
    title: "AI \u751F\u6210\u56FE",
    style: {
      position: "absolute",
      bottom: 5,
      left: 5,
      display: "grid",
      placeItems: "center",
      color: p.bottle.colorHex,
      opacity: .75
    }
  }, /*#__PURE__*/React.createElement(window.Icon, {
    name: "Sparkles",
    size: 10
  })));
}
function ShelfGrid({
  inventory,
  onOpen,
  highlightedIds = [],
  mode = "grid"
}) {
  const {
    BottleGlyph
  } = DS_shelf;
  const sorted = [...inventory].sort((a, b) => a.category.localeCompare(b.category) || a.name.localeCompare(b.name));
  if (mode === "list") {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 8
      }
    }, sorted.map(p => {
      const status = D_shelf.expiryStatus(p);
      const hi = highlightedIds.includes(p.id);
      return /*#__PURE__*/React.createElement("button", {
        key: p.id,
        onClick: () => onOpen(p),
        style: {
          font: "inherit",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: 12,
          textAlign: "left",
          padding: "8px 12px 8px 8px",
          borderRadius: "var(--r-card)",
          color: "inherit",
          background: hi ? "var(--tint-mint)" : "var(--surface)",
          border: `1px solid ${hi ? "var(--border-mint)" : "var(--line)"}`,
          WebkitTapHighlightColor: "transparent"
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          position: "relative",
          overflow: "hidden",
          width: 46,
          height: 46,
          flex: "none",
          borderRadius: 12,
          border: "1px solid var(--line)",
          background: "var(--surface-2)",
          display: "grid",
          placeItems: "center"
        }
      }, /*#__PURE__*/React.createElement(ProductImageSlot, {
        p: p,
        h: 30
      })), /*#__PURE__*/React.createElement("span", {
        style: {
          flex: 1,
          minWidth: 0
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          display: "block",
          fontSize: 12.5,
          fontWeight: 600,
          color: "var(--ink-soft)",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis"
        }
      }, p.name), /*#__PURE__*/React.createElement("span", {
        style: {
          display: "block",
          fontSize: 9,
          fontWeight: 600,
          letterSpacing: ".08em",
          textTransform: "uppercase",
          color: "var(--dim)",
          marginTop: 3
        }
      }, p.brand)), status === "expired" && /*#__PURE__*/React.createElement("span", {
        style: inlineBadge("rose")
      }, "\u5DF2\u8FC7\u671F"), status === "expiring" && /*#__PURE__*/React.createElement("span", {
        style: inlineBadge("amber")
      }, "\u4E34\u671F"), /*#__PURE__*/React.createElement(window.Icon, {
        name: "ChevronRight",
        size: 15,
        style: {
          color: "var(--dim)",
          flex: "none"
        }
      }));
    }));
  }

  // grid — bottles resting directly on shelf lines, 4 per row, no card boxes
  const rows = [];
  for (let i = 0; i < sorted.length; i += 4) rows.push(sorted.slice(i, i + 4));
  return /*#__PURE__*/React.createElement("div", null, rows.map((row, ri) => /*#__PURE__*/React.createElement("div", {
    key: ri,
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(4,1fr)",
      alignItems: "end",
      columnGap: 8,
      padding: "18px 2px 11px",
      borderBottom: "1px solid var(--line)"
    }
  }, row.map(p => {
    const status = D_shelf.expiryStatus(p);
    return /*#__PURE__*/React.createElement("button", {
      key: p.id,
      onClick: () => onOpen(p),
      style: {
        font: "inherit",
        cursor: "pointer",
        background: "none",
        border: "none",
        padding: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-end",
        WebkitTapHighlightColor: "transparent"
      }
    }, status === "expired" && /*#__PURE__*/React.createElement("span", {
      style: shelfTag("rose")
    }, "\u5DF2\u8FC7\u671F"), status === "expiring" && /*#__PURE__*/React.createElement("span", {
      style: shelfTag("amber")
    }, "\u4E34\u671F"), /*#__PURE__*/React.createElement(BottleGlyph, {
      shape: p.bottle.shape,
      colorHex: p.bottle.colorHex,
      category: p.category,
      height: 56
    }));
  }), Array.from({
    length: 4 - row.length
  }).map((_, i) => /*#__PURE__*/React.createElement("span", {
    key: "pad" + i,
    "aria-hidden": "true"
  })))));
}
function ShelfieShelf({
  inventory,
  filter,
  setFilter,
  onOpen,
  highlightedIds,
  onScan,
  onChat,
  greetSize,
  greetStroke,
  greetSpacing,
  greetGlow,
  greetColor,
  promptProfile,
  onOpenProfile,
  accountCopy,
  onOpenAccount,
  onDismissAccount,
  soonCount,
  expiredCount,
  missingCoreCategories
}) {
  const [sy, setSy] = React.useState(0);
  const [viewMode, setViewMode] = React.useState("grid");
  const greetRef = React.useRef(null);
  const [gh, setGh] = React.useState(184);
  React.useLayoutEffect(() => {
    if (greetRef.current) setGh(greetRef.current.offsetHeight);
  }, []);
  const fade = Math.max(0, Math.min(1, 1 - sy / Math.max(90, gh - 30)));
  const filtered = filter === "All" ? inventory : inventory.filter(p => p.category === filter);
  return /*#__PURE__*/React.createElement("div", {
    onScroll: e => {
      const y = e.currentTarget.scrollTop;
      setSy(y > gh + 20 ? gh + 20 : y);
    },
    style: {
      flex: 1,
      minHeight: 0,
      overflowY: "auto",
      display: "flex",
      flexDirection: "column"
    }
  }, /*#__PURE__*/React.createElement("div", {
    ref: greetRef,
    style: {
      position: "sticky",
      top: 0,
      zIndex: 0,
      padding: "16px 22px 24px",
      opacity: fade,
      transform: `translateY(${(1 - fade) * -8}px)`,
      pointerEvents: fade < 0.2 ? "none" : "auto"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-logo, var(--font-display, inherit))",
      fontSize: greetSize ?? 52,
      fontWeight: 400,
      letterSpacing: `${greetSpacing ?? 0.03}em`,
      color: greetColor ?? "#F1EDF7",
      WebkitTextStroke: `${greetStroke ?? 0}px ${greetColor ?? "#F1EDF7"}`,
      paintOrder: "stroke fill",
      textShadow: (greetGlow ?? 0) > 0 ? `0 0 ${greetGlow}px ${greetColor ?? "#C7A8F0"}77` : "none",
      lineHeight: 1.3
    }
  }, "\u665A\u5B89\uFF0C\u6842\u6842\u3002"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: "var(--muted)",
      marginTop: 12,
      lineHeight: 1.7
    }
  }, "\u4F60\u7684\u67B6\u5B50\u4E0A\u6709 ", /*#__PURE__*/React.createElement("b", {
    style: {
      color: "var(--ink)",
      fontWeight: 600,
      fontVariantNumeric: "tabular-nums"
    }
  }, inventory.length), " \u4EF6\u62A4\u80A4\u54C1\u3002"), /*#__PURE__*/React.createElement("button", {
    onClick: onChat,
    style: {
      font: "inherit",
      marginTop: 16,
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      whiteSpace: "nowrap",
      background: "var(--surface)",
      border: "1px solid var(--line)",
      borderRadius: 999,
      padding: "10px 16px",
      cursor: "pointer",
      color: "var(--ink)",
      fontSize: 12.5,
      fontWeight: 600
    }
  }, "\u4ECA\u665A\u72B6\u6001\u5982\u4F55\uFF1F\u6765\u804A\u804A ", /*#__PURE__*/React.createElement(window.Icon, {
    name: "ArrowRight",
    size: 15
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      zIndex: 1,
      display: "flex",
      flexDirection: "column",
      gap: 14,
      padding: "0 20px 8px"
    }
  }, accountCopy && /*#__PURE__*/React.createElement(window.AccountPromptCard, {
    copy: accountCopy,
    onOpen: onOpenAccount,
    onDismiss: onDismissAccount
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--bg-2)",
      border: "1px solid var(--line)",
      borderRadius: "24px 24px 18px 18px",
      padding: "16px 16px 18px",
      boxShadow: "0 -14px 40px -18px rgba(11,10,17,.7)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 17,
      fontWeight: 700,
      letterSpacing: ".01em",
      width: "fit-content",
      background: "var(--prism)",
      WebkitBackgroundClip: "text",
      backgroundClip: "text",
      color: "transparent"
    }
  }, "\u6211\u7684\u67B6\u5B50"), /*#__PURE__*/React.createElement("button", {
    onClick: () => setViewMode(m => m === "grid" ? "list" : "grid"),
    "aria-label": viewMode === "grid" ? "以列表显示" : "以网格显示",
    style: {
      width: 29,
      height: 29,
      flex: "none",
      borderRadius: 999,
      background: "var(--surface)",
      border: "1px solid var(--line)",
      color: "var(--ink-soft)",
      display: "grid",
      placeItems: "center",
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement(window.Icon, {
    name: viewMode === "grid" ? "LayoutList" : "LayoutGrid",
    size: 14
  }))), /*#__PURE__*/React.createElement(ShelfGrid, {
    inventory: inventory,
    onOpen: onOpen,
    highlightedIds: highlightedIds,
    mode: viewMode
  })), promptProfile && /*#__PURE__*/React.createElement(window.ProfileCompletionPrompt, {
    title: "\u5148\u8865\u6700\u5173\u952E\u7684\u80A4\u8D28\u4FE1\u606F\uFF0C\u8BA9\u540E\u7EED\u5EFA\u8BAE\u66F4\u9760\u8C31",
    description: "\u73B0\u5728\u5DF2\u7ECF\u80FD\u6B63\u5E38\u7528 cabinet \u4E86\u3002\u8865\u5145\u80A4\u8D28\u548C\u654F\u611F\u6210\u5206\u540E\uFF0CAI \u5EFA\u8BAE\u4F1A\u66F4\u63A5\u8FD1\u771F\u5B9E\u4F7F\u7528\u573A\u666F\u3002",
    emphasizedFields: ["肤质", "敏感成分"],
    onOpen: onOpenProfile
  })));
}
function badge(tone) {
  const c = tone === "rose" ? {
    bg: "var(--tint-rose)",
    bd: "var(--border-rose)",
    tx: "var(--ink-on-rose)"
  } : {
    bg: "var(--tint-amber)",
    bd: "var(--border-amber)",
    tx: "var(--ink-on-amber)"
  };
  return {
    position: "absolute",
    top: 8,
    right: 8,
    zIndex: 2,
    fontSize: 8,
    fontWeight: 700,
    color: c.tx,
    background: c.bg,
    border: `1px solid ${c.bd}`,
    borderRadius: 999,
    padding: "2px 7px"
  };
}
function inlineBadge(tone) {
  const c = tone === "rose" ? {
    bg: "var(--tint-rose)",
    bd: "var(--border-rose)",
    tx: "var(--ink-on-rose)"
  } : {
    bg: "var(--tint-amber)",
    bd: "var(--border-amber)",
    tx: "var(--ink-on-amber)"
  };
  return {
    flex: "none",
    fontSize: 9,
    fontWeight: 700,
    color: c.tx,
    background: c.bg,
    border: `1px solid ${c.bd}`,
    borderRadius: 999,
    padding: "3px 9px"
  };
}
function shelfTag(tone) {
  const c = tone === "rose" ? {
    bg: "var(--tint-rose)",
    bd: "var(--border-rose)",
    tx: "var(--ink-on-rose)"
  } : {
    bg: "var(--tint-amber)",
    bd: "var(--border-amber)",
    tx: "var(--ink-on-amber)"
  };
  return {
    marginBottom: 7,
    fontSize: 8.5,
    fontWeight: 700,
    color: c.tx,
    background: c.bg,
    border: `1px solid ${c.bd}`,
    borderRadius: 999,
    padding: "2px 8px",
    whiteSpace: "nowrap"
  };
}
Object.assign(window, {
  ShelfieShelf,
  ShelfGrid
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/shelfie/ShelfieShelf.jsx", error: String((e && e.message) || e) }); }

// ui_kits/shelfie/data.js
try { (() => {
/* ────────────────────────────────────────────────────────────────────────
   Shelfie UI-kit data — ported from upstream Phat-Po/Guigui---Google-io-hackathon
   (src/App.tsx demoInventory + curatedProducts, src/types.ts contracts).
   Real Product shape kept intact: { id,name,brand,category,keyIngredients,
   paoMonths,openedDate,expiryDate,bottle:{shape,colorHex},status }.
   Verdict/Travel run as LOCAL MOCKS here (the real app calls /api/*).
   ──────────────────────────────────────────────────────────────────────── */
window.ShelfieData = function () {
  const demoProfile = {
    skinType: null,
    sensitivities: [],
    currentActives: [],
    city: ""
  };
  const demoInventory = [{
    id: "1",
    name: "小褐瓶特润修护精华",
    brand: "Estée Lauder",
    category: "Serum",
    keyIngredients: ["二裂酵母", "透明质酸", "多肽"],
    paoMonths: 24,
    openedDate: "2025-01-01",
    expiryDate: "2027-01-01",
    bottle: {
      shape: "dropper",
      colorHex: "#8B5A2B"
    }
  }, {
    id: "2",
    name: "Lotion P50 爽肤水",
    brand: "Biologique Recherche",
    category: "Toner",
    keyIngredients: ["水杨酸", "乳酸", "植酸"],
    paoMonths: 12,
    openedDate: "2025-10-01",
    expiryDate: "2026-10-01",
    bottle: {
      shape: "bottle",
      colorHex: "#D2B48C"
    }
  }, {
    id: "3",
    name: "修护保湿润肤乳",
    brand: "CeraVe",
    category: "Moisturizer",
    keyIngredients: ["神经酰胺", "透明质酸"],
    paoMonths: 12,
    openedDate: "2025-08-01",
    expiryDate: "2026-08-01",
    bottle: {
      shape: "pump",
      colorHex: "#00599C"
    }
  }, {
    id: "4",
    name: "水饱饱 B5 保湿精华",
    brand: "Drunk Elephant",
    category: "Serum",
    keyIngredients: ["维生素B5", "菠萝神经酰胺"],
    paoMonths: 12,
    openedDate: "2026-02-01",
    expiryDate: "2027-02-01",
    bottle: {
      shape: "pump",
      colorHex: "#40E0D0"
    }
  }, {
    id: "5",
    name: "无感隐形防晒乳 SPF40",
    brand: "Supergoop!",
    category: "Sunscreen",
    keyIngredients: ["红藻提取物", "草本精粹"],
    paoMonths: 18,
    openedDate: "2026-06-01",
    expiryDate: "2027-12-01",
    bottle: {
      shape: "tube",
      colorHex: "#FCDC4D"
    }
  }, {
    id: "6",
    name: "绿茶籽水分菁露",
    brand: "Innisfree",
    category: "Serum",
    keyIngredients: ["绿茶籽", "双重透明质酸"],
    paoMonths: 12,
    openedDate: "2025-07-01",
    expiryDate: "2026-07-01",
    bottle: {
      shape: "pump",
      colorHex: "#4CAF50"
    }
  }];
  const curatedProducts = [{
    id: "cur-1",
    name: "积雪草舒缓强韧精华液",
    brand: "Skin1004",
    category: "Serum",
    matchScore: 98,
    tags: ["超强推荐", "无香精", "敏感肌友好"],
    description: "核心提取马达加斯加纯净积雪草，瞬间褪红，强韧受损屏障。",
    keyIngredients: ["积雪草提取物", "羟基积雪草苷"],
    paoMonths: 12,
    bottle: {
      shape: "dropper",
      colorHex: "#E2D3C1"
    }
  }, {
    id: "cur-2",
    name: "温和弱酸性氨基酸洁面",
    brand: "Anua",
    category: "Cleanser",
    matchScore: 94,
    tags: ["深层清洁", "温和不紧绷"],
    description: "含有 77% 鱼腥草精粹，舒缓修护，温和洗净油脂粉尘。",
    keyIngredients: ["鱼腥草提取物", "椰油酰甘氨酸钾"],
    paoMonths: 12,
    bottle: {
      shape: "tube",
      colorHex: "#EAEBE6"
    }
  }, {
    id: "cur-3",
    name: "微修护维 C 亮肤精华",
    brand: "Innbeauty Project",
    category: "Serum",
    matchScore: 89,
    tags: ["提亮肤色", "抗氧化"],
    description: "高活性温和 VC 配方，快速提亮暗沉，淡化新生痘印且不易泛红。",
    keyIngredients: ["包裹型维生素C", "阿魏酸", "神经酰胺"],
    paoMonths: 9,
    bottle: {
      shape: "pump",
      colorHex: "#FF7F50"
    }
  }, {
    id: "cur-4",
    name: "鱼腥草 77% 舒缓爽肤水",
    brand: "Anua",
    category: "Toner",
    matchScore: 92,
    tags: ["去闭口", "湿敷推荐"],
    description: "韩国极高人气爽肤水，主打舒缓镇定，针对闭口和粉刺改善显著。",
    keyIngredients: ["鱼腥草水", "积雪草", "洋甘菊"],
    paoMonths: 12,
    bottle: {
      shape: "bottle",
      colorHex: "#D9ECE4"
    }
  }, {
    id: "cur-5",
    name: "纯净大米益生菌清爽防晒乳",
    brand: "Beauty of Joseon",
    category: "Sunscreen",
    matchScore: 88,
    tags: ["水润轻薄", "不油腻"],
    description: "乳霜质地极易推开，成膜速度快，含有大米发酵物，温和养肤。",
    keyIngredients: ["大米提取物", "谷物益生菌"],
    paoMonths: 12,
    bottle: {
      shape: "tube",
      colorHex: "#FAF6EF"
    }
  }];
  const categoryLabels = {
    All: "全部",
    Serum: "精华液",
    Toner: "爽肤水",
    Moisturizer: "乳液面霜",
    Sunscreen: "防晒霜",
    Cleanser: "洁面乳",
    Cream: "面霜",
    Lotion: "乳液"
  };
  const skinTypeLabels = {
    dry: "干性肌",
    oily: "油性肌",
    combination: "混合肌",
    normal: "中性肌"
  };
  const coreRoutineCategories = ["Cleanser", "Moisturizer", "Sunscreen"];

  /* 5-step routine timeline (matches App.tsx routine tab) */
  const routineSteps = [{
    n: 1,
    cat: "Cleanser",
    label: "洁面乳 · Cleanser",
    timing: "早晚",
    tone: "mint",
    empty: "暂无可用洁面，建议在「探索」或「拍照」中添加"
  }, {
    n: 2,
    cat: "Toner",
    label: "爽肤补水 · Toner",
    timing: "晚间",
    tone: "blue",
    empty: "暂无可用补水，建议添加爽肤水"
  }, {
    n: 3,
    cat: "Serum",
    label: "密集修复 · Serum",
    timing: "早晚",
    tone: "mint",
    empty: "暂无可用精华，建议添加精华液"
  }, {
    n: 4,
    cat: "Moisturizer",
    label: "锁水保湿 · Cream",
    timing: "早晚",
    tone: "lilac",
    empty: "暂无可用保湿霜，建议添加面霜"
  }, {
    n: 5,
    cat: "Sunscreen",
    label: "日间防护 · Sunscreen",
    timing: "日间",
    tone: "amber",
    empty: "暂无可用防晒，建议添加防晒霜"
  }];
  const quickAsks = [{
    text: "下巴长痘且发红，很紧绷",
    chip: "下巴长痘发红 💧"
  }, {
    text: "天气太热了，T区出油严重",
    chip: "T区出油严重 ☀️"
  }, {
    text: "敏感期换季，求温和修复组合",
    chip: "敏感换季温和组合 🌱"
  }];
  const accountPromptCopy = {
    "first-product": {
      title: "已经获得第一轮价值，可以提示未来保存入口了",
      description: "你已经成功把产品放进柜子。下一步真正值得做的账号能力，是保存、同步和跨设备继续使用。",
      benefits: ["保存你的 cabinet", "跨设备同步柜子", "后续接入到期开封提醒"]
    },
    "ai-advice": {
      title: "AI 建议已经产生，未来可以在这里承接账号入口",
      description: "现在你已经感受到 inventory-aware AI 的价值，后续账号提示可以用来保存历史建议和个性化设置。",
      benefits: ["保存 AI 历史建议", "同步肤质与敏感信息", "让后续推荐更连贯"]
    },
    "travel-plan": {
      title: "出行建议已经有价值，未来可以在这里引导注册",
      description: "你已经得到了基于现有柜子的打包建议，后续账号入口可以承接保存清单和跨次旅行复用。",
      benefits: ["保存 travel packing 清单", "同步你的常用柜子", "为后续提醒和个性化做准备"]
    }
  };

  /* ── date helpers (stand-in for date-fns; anchored to a fixed "today") ── */
  const TODAY = new Date("2026-07-07");
  const parseM = ym => new Date(ym.length === 7 ? ym + "-01" : ym);
  const addMonths = (d, n) => {
    const x = new Date(d);
    x.setMonth(x.getMonth() + n);
    return x;
  };
  const daysBetween = (a, b) => Math.round((a - b) / 86400000);
  const fmtYearMonth = ym => {
    const d = parseM(ym);
    return `${d.getFullYear()}年${String(d.getMonth() + 1).padStart(2, "0")}月`;
  };
  const fmtDate = d => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  function expiryStatus(p) {
    const d = daysBetween(parseM(p.expiryDate), TODAY);
    if (d < 0) return "expired";
    if (d <= 30) return "expiring";
    return "active";
  }
  const monthsOpened = p => Math.max(0, Math.round(daysBetween(TODAY, parseM(p.openedDate)) / 30));

  /* ── LOCAL MOCK: getVerdict (real app → POST /api/verdict, Gemini) ──
     inventory-aware, non-medical; returns { recommendedIds, avoidIds, reason }. */
  function mockVerdict(profile, inventory, condition) {
    const c = condition || "";
    const has = arr => arr.some(k => c.includes(k));
    const acne = has(["痘", "闭口", "粉刺", "出油", "油", "毛孔"]);
    const red = has(["红", "敏感", "刺激", "换季", "紧绷", "干", "屏障"]);
    const byIng = kw => inventory.filter(p => p.keyIngredients.some(i => kw.some(k => i.includes(k))));
    const byCat = cat => inventory.filter(p => p.category === cat);
    let rec = [],
      avoid = [],
      reason;
    const acids = byIng(["水杨酸", "乳酸", "植酸", "果酸", "A醇", "视黄醇"]);
    const barrier = byIng(["神经酰胺", "B5", "泛醇", "积雪草", "透明质酸", "绿茶"]);
    const sun = byCat("Sunscreen");
    if (red || acne && red) {
      rec = [...barrier, ...sun].slice(0, 3);
      avoid = acids;
      reason = "屏障在报警——先修护、别叠酸。今天走温和补水 + 防护，把刺激性功效成分停一停。皮肤稳了再谈美白抗老。";
    } else if (acne) {
      rec = [...byIng(["水杨酸"]), ...byIng(["绿茶", "透明质酸"]), ...sun].slice(0, 3);
      avoid = byIng(["A醇", "视黄醇"]);
      reason = "闷热出油、爱冒痘：白天清爽 + 硬防晒，晚上用一次带酸的疏通毛孔就够，别和 A 醇同晚叠加。";
    } else {
      rec = [...barrier, ...sun].slice(0, 3);
      avoid = [];
      reason = "状态平稳。按你架子上现有的走日常三步（清洁 → 保湿 → 防晒）即可，不用加新东西。";
    }
    const uniq = a => [...new Set(a.map(p => p.id))];
    return {
      recommendedIds: uniq(rec),
      avoidIds: uniq(avoid),
      reason
    };
  }

  /* ── LOCAL MOCK: getTravelList (real app → POST /api/travel) ── */
  function mockTravel(profile, inventory, destination, days) {
    const pick = cat => inventory.find(p => p.category === cat);
    const chosen = ["Cleanser", "Toner", "Serum", "Moisturizer", "Sunscreen"].map(pick).filter(Boolean);
    const reason = `${destination || "目的地"} · ${days || 7} 天：从你架子上挑够用不超量的一套。防晒每天都要带足，其余按天数分装即可，别整瓶塞进行李。`;
    return {
      selectedIds: chosen.map(p => p.id),
      reason
    };
  }
  return {
    demoProfile,
    demoInventory,
    curatedProducts,
    categoryLabels,
    skinTypeLabels,
    coreRoutineCategories,
    routineSteps,
    quickAsks,
    accountPromptCopy,
    parseM,
    addMonths,
    daysBetween,
    fmtYearMonth,
    fmtDate,
    expiryStatus,
    monthsOpened,
    TODAY,
    mockVerdict,
    mockTravel,
    // onboarding flow data (kept for ShelfieOnboarding.jsx)
    CITY_WEATHER: {
      "上海": {
        temp: 33,
        humidity: 82,
        uv: 8,
        season: "梅雨/夏",
        tag: "闷热高湿"
      },
      "北京": {
        temp: 8,
        humidity: 30,
        uv: 3,
        season: "秋冬",
        tag: "干冷"
      },
      "洛杉矶": {
        temp: 26,
        humidity: 35,
        uv: 9,
        season: "夏",
        tag: "干热·紫外强"
      },
      "伦敦": {
        temp: 11,
        humidity: 75,
        uv: 2,
        season: "秋",
        tag: "湿冷"
      }
    },
    OB: {
      skinType: ["干性", "油性", "混合", "敏感", "中性"],
      concerns: ["冒痘", "泛红", "干燥", "熬夜后", "上妆前", "换季偏干"],
      actives: ["A醇/维A", "酸类", "维C", "都没有"],
      cities: ["上海", "北京", "洛杉矶", "伦敦"],
      safety: ["孕期/哺乳", "正在看皮肤科/用处方药", "当前有严重痘/破损/感染", "以上都没有"]
    }
  };
}();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/shelfie/data.js", error: String((e && e.message) || e) }); }

// ui_kits/shelfie/icons.jsx
try { (() => {
/* Lucide icon helper — the app uses lucide-react; we mirror the exact set at
   runtime from the Lucide UMD global (window.lucide.icons[Name]). */
function Icon({
  name,
  size = 20,
  stroke = 2,
  style
}) {
  const data = window.lucide && window.lucide.icons ? window.lucide.icons[name] : null;
  if (!data) return React.createElement("span", {
    style: {
      display: "inline-block",
      width: size,
      height: size,
      ...style
    }
  });
  return React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: stroke,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    style
  }, data.map((c, i) => React.createElement(c[0], {
    ...c[1],
    key: i
  })));
}
Object.assign(window, {
  Icon
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/shelfie/icons.jsx", error: String((e && e.message) || e) }); }

// ui_kits/shelfie/shelfie-ui.jsx
try { (() => {
/* Shelfie shared composites — the app's mid-level cards, in Night Prism dark.
   Mirrors upstream components/{HomeSummary,EmptyCabinetState,ProfileCompletionPrompt,
   GuestAccountPrompt}.tsx. Composes DS primitives. */
const DS_ui = window.NightPrismDesignSystem_4de317;
const D_ui = window.ShelfieData;

/* bottom action dock (also used by onboarding via window.np_dock) */
function np_dock() {
  return {
    padding: "12px 20px calc(14px + var(--sab))",
    display: "flex",
    gap: 10,
    position: "relative",
    zIndex: 5,
    background: "linear-gradient(transparent, var(--bg) 40%)"
  };
}

/* ── 今日摘要 — state-driven priority card (expired > soon > first > missing > stable) ── */
function HomeSummary({
  inventory,
  soonCount,
  expiredCount,
  missingCoreCategories,
  onScan
}) {
  const {
    Card
  } = DS_ui;
  let s;
  if (expiredCount > 0) s = {
    badge: "最高优先级",
    icon: "ShieldAlert",
    metricLabel: "已过期",
    tone: "rose",
    metric: expiredCount,
    title: `你有 ${expiredCount} 件产品已经过期`,
    body: "先处理已过期产品，别再把它们留在日常决策里。今天优先确认停用、替换，或从柜子里移除。"
  };else if (soonCount > 0) s = {
    badge: "今日重点",
    icon: "CalendarClock",
    metricLabel: "临期提醒",
    tone: "amber",
    metric: soonCount,
    title: "今天先消化临期产品",
    body: `有 ${soonCount} 件产品进入临期窗口。今天先从这些开始，优先确认开封时间和使用顺序。`
  };else if (inventory.length === 1) s = {
    badge: "下一步",
    icon: "Sparkles",
    metricLabel: "基础柜子",
    tone: "lilac",
    metric: 1,
    title: "继续建立你的第一套柜子",
    body: "你已经有第一件产品了。继续补齐柜子，比先做复杂设置或登录更有价值。"
  };else if (missingCoreCategories.length > 0) s = {
    badge: "结构提醒",
    icon: "Sparkles",
    metricLabel: "待补品类",
    tone: "lilac",
    metric: missingCoreCategories.length,
    title: "今天优先补齐核心品类",
    body: `你的柜子已经能工作了，但还缺 ${missingCoreCategories.join(" / ")}。扫码时优先补缺口，比继续堆同类更有用。`
  };else s = {
    badge: "日常状态",
    icon: "Sparkles",
    metricLabel: "今日柜况",
    tone: "lilac",
    metric: inventory.length,
    title: "你的柜子今天状态稳定",
    body: "当前没有临期压力，柜子结构也稳定。今天按已有产品做决策，需要时再扫码补充。"
  };
  const tint = {
    rose: "var(--ink-on-rose)",
    amber: "var(--ink-on-amber)",
    lilac: "var(--ink-on-lilac)"
  }[s.tone];
  const bd = {
    rose: "var(--border-rose)",
    amber: "var(--border-amber)",
    lilac: "var(--border-lilac)"
  }[s.tone];
  const bg = {
    rose: "var(--tint-rose)",
    amber: "var(--tint-amber)",
    lilac: "var(--tint-lilac)"
  }[s.tone];
  return /*#__PURE__*/React.createElement(Card, {
    size: "md",
    style: {
      borderRadius: "var(--r-sheet)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "space-between",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 17,
      fontWeight: 700,
      color: "var(--ink)",
      lineHeight: 1.35
    }
  }, s.title))), /*#__PURE__*/React.createElement("button", {
    onClick: onScan,
    style: {
      font: "inherit",
      marginTop: 12,
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 10,
      background: "var(--surface)",
      border: "1px solid var(--line)",
      borderRadius: 16,
      padding: "11px 14px",
      cursor: "pointer",
      color: "inherit",
      textAlign: "left"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 11
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 34,
      height: 34,
      borderRadius: 999,
      background: "var(--prism)",
      color: "var(--on-prism)",
      display: "grid",
      placeItems: "center",
      flex: "none"
    }
  }, /*#__PURE__*/React.createElement(window.Icon, {
    name: "Camera",
    size: 16
  })), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      fontSize: 13,
      fontWeight: 600,
      color: "var(--ink)"
    }
  }, "\u7EE7\u7EED\u626B\u7801\u6DFB\u52A0\u4EA7\u54C1"))), /*#__PURE__*/React.createElement(window.Icon, {
    name: "ChevronRight",
    size: 16,
    style: {
      color: "var(--dim)",
      flex: "none"
    }
  })));
}

/* ── empty cabinet — scan primary + explore secondary ── */
function EmptyCabinet({
  onScan,
  onExplore
}) {
  const {
    Button
  } = DS_ui;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      borderRadius: "var(--r-sheet)",
      border: "1px solid var(--line)",
      background: "var(--surface)",
      padding: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10.5,
      fontWeight: 700,
      letterSpacing: ".24em",
      textTransform: "uppercase",
      color: "var(--muted)"
    }
  }, "Empty Cabinet"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-display, inherit)",
      fontSize: 22,
      fontWeight: 200,
      letterSpacing: ".04em",
      color: "var(--ink)",
      marginTop: 8,
      lineHeight: 1.4
    }
  }, "\u5148\u626B\u7B2C\u4E00\u4EF6\u4EA7\u54C1\uFF0C", /*#__PURE__*/React.createElement("br", null), "\u518D\u5F00\u59CB\u7528 ", /*#__PURE__*/React.createElement("b", {
    style: {
      fontWeight: 700,
      background: "var(--prism)",
      WebkitBackgroundClip: "text",
      backgroundClip: "text",
      color: "transparent"
    }
  }, "\u67DC\u67DC")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12.5,
      lineHeight: 1.75,
      color: "var(--muted)",
      marginTop: 10
    }
  }, "\u62CD\u7167\u8BC6\u522B\u4EA7\u54C1\uFF0C\u786E\u8BA4\u5F00\u5C01\u65F6\u95F4\u540E\uFF0C\u5B83\u5C31\u4F1A\u8FDB\u5165\u4F60\u7684\u5316\u5986\u67DC\u3002\u5148\u5B8C\u6210\u7B2C\u4E00\u4EF6\uFF0C\u518D\u770B AI \u5EFA\u8BAE\u548C\u65E5\u5E38\u642D\u914D\u3002"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 10,
      marginTop: 18
    }
  }, /*#__PURE__*/React.createElement(Button, {
    onClick: onScan
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(window.Icon, {
    name: "Camera",
    size: 16
  }), " \u626B\u7801\u6DFB\u52A0\u7B2C\u4E00\u4EF6\u4EA7\u54C1")), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    onClick: onExplore
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(window.Icon, {
    name: "Sparkles",
    size: 15
  }), " \u5148\u770B\u770B\u63A8\u8350\u7075\u611F")))), /*#__PURE__*/React.createElement("div", {
    style: {
      borderRadius: "var(--r-sheet)",
      border: "1px dashed var(--line)",
      background: "var(--surface)",
      padding: 22,
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 52,
      height: 52,
      borderRadius: 999,
      background: "var(--surface-2)",
      border: "1px solid var(--line)",
      display: "grid",
      placeItems: "center",
      margin: "0 auto",
      color: "var(--muted)"
    }
  }, /*#__PURE__*/React.createElement(window.Icon, {
    name: "Camera",
    size: 22
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: "var(--ink-soft)",
      marginTop: 14
    }
  }, "\u4F60\u7684\u67DC\u5B50\u8FD8\u6CA1\u6709\u4EA7\u54C1"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      lineHeight: 1.7,
      color: "var(--muted)",
      marginTop: 6
    }
  }, "\u626B\u63CF\u540E\u81EA\u52A8\u63D0\u53D6\u54C1\u724C\u3001\u54C1\u7C7B\u3001\u6210\u5206\u548C\u5F00\u5C01\u4FDD\u8D28\u671F\uFF0C\u4F60\u53EA\u9700\u8981\u8865\u4E00\u4E2A\u5F00\u5C01\u6708\u4EFD\u3002")));
}

/* ── profile completion — mint card, "improves recs, never blocks" ── */
function ProfileCompletionPrompt({
  title,
  description,
  emphasizedFields,
  onOpen
}) {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      borderRadius: "var(--r-sheet)",
      border: "1px solid var(--border-mint)",
      background: "var(--tint-mint)",
      padding: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10.5,
      fontWeight: 700,
      letterSpacing: ".2em",
      textTransform: "uppercase",
      color: "var(--mint)"
    }
  }, "Profile Later"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13.5,
      fontWeight: 700,
      color: "var(--ink)",
      marginTop: 5
    }
  }, title), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      lineHeight: 1.7,
      color: "var(--muted)",
      marginTop: 4
    }
  }, description), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: 6,
      marginTop: 12
    }
  }, emphasizedFields.map(f => /*#__PURE__*/React.createElement("span", {
    key: f,
    style: {
      fontSize: 10,
      fontWeight: 600,
      borderRadius: 999,
      padding: "4px 10px",
      color: "var(--ink-on-mint)",
      border: "1px solid var(--border-mint)",
      background: "var(--surface)"
    }
  }, f))), /*#__PURE__*/React.createElement("button", {
    onClick: onOpen,
    style: {
      font: "inherit",
      marginTop: 14,
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      background: "var(--surface)",
      border: "1px solid var(--line)",
      borderRadius: 16,
      padding: "11px 14px",
      cursor: "pointer",
      color: "inherit",
      textAlign: "left"
    }
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      fontSize: 13,
      fontWeight: 600,
      color: "var(--ink)"
    }
  }, "\u8865\u5145\u80A4\u8D28\u6863\u6848"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      fontSize: 11,
      color: "var(--muted)"
    }
  }, "\u53EA\u589E\u5F3A\u63A8\u8350\uFF0C\u4E0D\u963B\u585E\u5F53\u524D\u4F7F\u7528")), /*#__PURE__*/React.createElement(window.Icon, {
    name: "ArrowRight",
    size: 16,
    style: {
      color: "var(--dim)"
    }
  })));
}

/* ── guest-first account prompt — amber card, dismissible, non-blocking ── */
function AccountPromptCard({
  copy,
  onOpen,
  onDismiss
}) {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      borderRadius: "var(--r-sheet)",
      border: "1px solid var(--border-amber)",
      background: "var(--tint-amber)",
      padding: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "space-between",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10.5,
      fontWeight: 700,
      letterSpacing: ".2em",
      textTransform: "uppercase",
      color: "var(--amber)"
    }
  }, "Guest-First"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13.5,
      fontWeight: 700,
      color: "var(--ink)",
      marginTop: 5
    }
  }, copy.title), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      lineHeight: 1.7,
      color: "var(--muted)",
      marginTop: 4
    }
  }, copy.description)), /*#__PURE__*/React.createElement("button", {
    onClick: onDismiss,
    "aria-label": "\u7A0D\u540E\u518D\u8BF4",
    style: {
      font: "inherit",
      flex: "none",
      width: 28,
      height: 28,
      borderRadius: 999,
      background: "var(--surface)",
      border: "1px solid var(--line)",
      color: "var(--muted)",
      cursor: "pointer",
      display: "grid",
      placeItems: "center"
    }
  }, /*#__PURE__*/React.createElement(window.Icon, {
    name: "X",
    size: 14
  }))), /*#__PURE__*/React.createElement("button", {
    onClick: onOpen,
    style: {
      font: "inherit",
      marginTop: 14,
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      background: "var(--surface)",
      border: "1px solid var(--line)",
      borderRadius: 16,
      padding: "11px 14px",
      cursor: "pointer",
      color: "inherit",
      textAlign: "left"
    }
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      fontSize: 13,
      fontWeight: 600,
      color: "var(--ink)"
    }
  }, "\u67E5\u770B\u4FDD\u5B58\u4E0E\u540C\u6B65\u5360\u4F4D\u8BF4\u660E"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      fontSize: 11,
      color: "var(--muted)"
    }
  }, "\u672C\u6279\u6B21\u4E0D\u505A\u771F\u5B9E\u767B\u5F55\uFF0C\u53EA\u6807\u8BB0\u672A\u6765\u5165\u53E3")), /*#__PURE__*/React.createElement(window.Icon, {
    name: "ArrowRight",
    size: 16,
    style: {
      color: "var(--dim)"
    }
  })));
}
Object.assign(window, {
  np_dock,
  HomeSummary,
  EmptyCabinet,
  ProfileCompletionPrompt,
  AccountPromptCard
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/shelfie/shelfie-ui.jsx", error: String((e && e.message) || e) }); }

// ui_kits/shelfie/tweaks-panel.jsx
try { (() => {
// @ds-adherence-ignore -- omelette starter scaffold (raw elements/hex/px by design)

/* BEGIN USAGE */
// tweaks-panel.jsx
// Reusable Tweaks shell + form-control helpers.
// Exports (to window): useTweaks, TweaksPanel, TweakSection, TweakRow, TweakSlider,
//   TweakToggle, TweakRadio, TweakSelect, TweakText, TweakNumber, TweakColor, TweakButton.
//
// Owns the host protocol (listens for __activate_edit_mode / __deactivate_edit_mode,
// posts __edit_mode_available / __edit_mode_set_keys / __edit_mode_dismissed) so
// individual prototypes don't re-roll it. Ships a consistent set of controls so you
// don't hand-draw <input type="range">, segmented radios, steppers, etc.
//
// Usage (in an HTML file that loads React + Babel):
//
//   const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
//     "primaryColor": "#D97757",
//     "palette": ["#D97757", "#29261b", "#f6f4ef"],
//     "fontSize": 16,
//     "density": "regular",
//     "dark": false
//   }/*EDITMODE-END*/;
//
//   function App() {
//     const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
//     return (
//       <div style={{ fontSize: t.fontSize, color: t.primaryColor }}>
//         Hello
//         <TweaksPanel>
//           <TweakSection label="Typography" />
//           <TweakSlider label="Font size" value={t.fontSize} min={10} max={32} unit="px"
//                        onChange={(v) => setTweak('fontSize', v)} />
//           <TweakRadio  label="Density" value={t.density}
//                        options={['compact', 'regular', 'comfy']}
//                        onChange={(v) => setTweak('density', v)} />
//           <TweakSection label="Theme" />
//           <TweakColor  label="Primary" value={t.primaryColor}
//                        options={['#D97757', '#2A6FDB', '#1F8A5B', '#7A5AE0']}
//                        onChange={(v) => setTweak('primaryColor', v)} />
//           <TweakColor  label="Palette" value={t.palette}
//                        options={[['#D97757', '#29261b', '#f6f4ef'],
//                                  ['#475569', '#0f172a', '#f1f5f9']]}
//                        onChange={(v) => setTweak('palette', v)} />
//           <TweakToggle label="Dark mode" value={t.dark}
//                        onChange={(v) => setTweak('dark', v)} />
//         </TweaksPanel>
//       </div>
//     );
//   }
//
// TweakRadio is the segmented control for 2–3 short options (auto-falls-back to
// TweakSelect past ~16/~10 chars per label); reach for TweakSelect directly when
// options are many or long. For color tweaks always curate 3-4 options rather than
// a free picker; an option can also be a whole 2–5 color palette (the stored value
// is the array). The Tweak* controls are a floor, not a ceiling — build custom
// controls inside the panel if a tweak calls for UI they don't cover.
/* END USAGE */
// ─────────────────────────────────────────────────────────────────────────────

const __TWEAKS_STYLE = `
  .twk-panel{position:fixed;right:16px;bottom:16px;z-index:2147483646;width:280px;
    max-height:calc(100vh - 32px);display:flex;flex-direction:column;
    transform:scale(var(--dc-inv-zoom,1));transform-origin:bottom right;
    background:rgba(250,249,247,.78);color:#29261b;
    -webkit-backdrop-filter:blur(24px) saturate(160%);backdrop-filter:blur(24px) saturate(160%);
    border:.5px solid rgba(255,255,255,.6);border-radius:14px;
    box-shadow:0 1px 0 rgba(255,255,255,.5) inset,0 12px 40px rgba(0,0,0,.18);
    font:11.5px/1.4 ui-sans-serif,system-ui,-apple-system,sans-serif;overflow:hidden}
  .twk-hd{display:flex;align-items:center;justify-content:space-between;
    padding:10px 8px 10px 14px;cursor:move;user-select:none}
  .twk-hd b{font-size:12px;font-weight:600;letter-spacing:.01em}
  .twk-x{appearance:none;border:0;background:transparent;color:rgba(41,38,27,.55);
    width:22px;height:22px;border-radius:6px;cursor:default;font-size:13px;line-height:1}
  .twk-x:hover{background:rgba(0,0,0,.06);color:#29261b}
  .twk-body{padding:2px 14px 14px;display:flex;flex-direction:column;gap:10px;
    overflow-y:auto;overflow-x:hidden;min-height:0;
    scrollbar-width:thin;scrollbar-color:rgba(0,0,0,.15) transparent}
  .twk-body::-webkit-scrollbar{width:8px}
  .twk-body::-webkit-scrollbar-track{background:transparent;margin:2px}
  .twk-body::-webkit-scrollbar-thumb{background:rgba(0,0,0,.15);border-radius:4px;
    border:2px solid transparent;background-clip:content-box}
  .twk-body::-webkit-scrollbar-thumb:hover{background:rgba(0,0,0,.25);
    border:2px solid transparent;background-clip:content-box}
  .twk-row{display:flex;flex-direction:column;gap:5px}
  .twk-row-h{flex-direction:row;align-items:center;justify-content:space-between;gap:10px}
  .twk-lbl{display:flex;justify-content:space-between;align-items:baseline;
    color:rgba(41,38,27,.72)}
  .twk-lbl>span:first-child{font-weight:500}
  .twk-val{color:rgba(41,38,27,.5);font-variant-numeric:tabular-nums}

  .twk-sect{font-size:10px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;
    color:rgba(41,38,27,.45);padding:10px 0 0}
  .twk-sect:first-child{padding-top:0}

  .twk-field{appearance:none;box-sizing:border-box;width:100%;min-width:0;height:26px;padding:0 8px;
    border:.5px solid rgba(0,0,0,.1);border-radius:7px;
    background:rgba(255,255,255,.6);color:inherit;font:inherit;outline:none}
  .twk-field:focus{border-color:rgba(0,0,0,.25);background:rgba(255,255,255,.85)}
  select.twk-field{padding-right:22px;
    background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'><path fill='rgba(0,0,0,.5)' d='M0 0h10L5 6z'/></svg>");
    background-repeat:no-repeat;background-position:right 8px center}

  .twk-slider{appearance:none;-webkit-appearance:none;width:100%;height:4px;margin:6px 0;
    border-radius:999px;background:rgba(0,0,0,.12);outline:none}
  .twk-slider::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;
    width:14px;height:14px;border-radius:50%;background:#fff;
    border:.5px solid rgba(0,0,0,.12);box-shadow:0 1px 3px rgba(0,0,0,.2);cursor:default}
  .twk-slider::-moz-range-thumb{width:14px;height:14px;border-radius:50%;
    background:#fff;border:.5px solid rgba(0,0,0,.12);box-shadow:0 1px 3px rgba(0,0,0,.2);cursor:default}

  .twk-seg{position:relative;display:flex;padding:2px;border-radius:8px;
    background:rgba(0,0,0,.06);user-select:none}
  .twk-seg-thumb{position:absolute;top:2px;bottom:2px;border-radius:6px;
    background:rgba(255,255,255,.9);box-shadow:0 1px 2px rgba(0,0,0,.12);
    transition:left .15s cubic-bezier(.3,.7,.4,1),width .15s}
  .twk-seg.dragging .twk-seg-thumb{transition:none}
  .twk-seg button{appearance:none;position:relative;z-index:1;flex:1;border:0;
    background:transparent;color:inherit;font:inherit;font-weight:500;min-height:22px;
    border-radius:6px;cursor:default;padding:4px 6px;line-height:1.2;
    overflow-wrap:anywhere}

  .twk-toggle{position:relative;width:32px;height:18px;border:0;border-radius:999px;
    background:rgba(0,0,0,.15);transition:background .15s;cursor:default;padding:0}
  .twk-toggle[data-on="1"]{background:#34c759}
  .twk-toggle i{position:absolute;top:2px;left:2px;width:14px;height:14px;border-radius:50%;
    background:#fff;box-shadow:0 1px 2px rgba(0,0,0,.25);transition:transform .15s}
  .twk-toggle[data-on="1"] i{transform:translateX(14px)}

  .twk-num{display:flex;align-items:center;box-sizing:border-box;min-width:0;height:26px;padding:0 0 0 8px;
    border:.5px solid rgba(0,0,0,.1);border-radius:7px;background:rgba(255,255,255,.6)}
  .twk-num-lbl{font-weight:500;color:rgba(41,38,27,.6);cursor:ew-resize;
    user-select:none;padding-right:8px}
  .twk-num input{flex:1;min-width:0;height:100%;border:0;background:transparent;
    font:inherit;font-variant-numeric:tabular-nums;text-align:right;padding:0 8px 0 0;
    outline:none;color:inherit;-moz-appearance:textfield}
  .twk-num input::-webkit-inner-spin-button,.twk-num input::-webkit-outer-spin-button{
    -webkit-appearance:none;margin:0}
  .twk-num-unit{padding-right:8px;color:rgba(41,38,27,.45)}

  .twk-btn{appearance:none;height:26px;padding:0 12px;border:0;border-radius:7px;
    background:rgba(0,0,0,.78);color:#fff;font:inherit;font-weight:500;cursor:default}
  .twk-btn:hover{background:rgba(0,0,0,.88)}
  .twk-btn.secondary{background:rgba(0,0,0,.06);color:inherit}
  .twk-btn.secondary:hover{background:rgba(0,0,0,.1)}

  .twk-swatch{appearance:none;-webkit-appearance:none;width:56px;height:22px;
    border:.5px solid rgba(0,0,0,.1);border-radius:6px;padding:0;cursor:default;
    background:transparent;flex-shrink:0}
  .twk-swatch::-webkit-color-swatch-wrapper{padding:0}
  .twk-swatch::-webkit-color-swatch{border:0;border-radius:5.5px}
  .twk-swatch::-moz-color-swatch{border:0;border-radius:5.5px}

  .twk-chips{display:flex;gap:6px}
  .twk-chip{position:relative;appearance:none;flex:1;min-width:0;height:46px;
    padding:0;border:0;border-radius:6px;overflow:hidden;cursor:default;
    box-shadow:0 0 0 .5px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.06);
    transition:transform .12s cubic-bezier(.3,.7,.4,1),box-shadow .12s}
  .twk-chip:hover{transform:translateY(-1px);
    box-shadow:0 0 0 .5px rgba(0,0,0,.18),0 4px 10px rgba(0,0,0,.12)}
  .twk-chip[data-on="1"]{box-shadow:0 0 0 1.5px rgba(0,0,0,.85),
    0 2px 6px rgba(0,0,0,.15)}
  .twk-chip>span{position:absolute;top:0;bottom:0;right:0;width:34%;
    display:flex;flex-direction:column;box-shadow:-1px 0 0 rgba(0,0,0,.1)}
  .twk-chip>span>i{flex:1;box-shadow:0 -1px 0 rgba(0,0,0,.1)}
  .twk-chip>span>i:first-child{box-shadow:none}
  .twk-chip svg{position:absolute;top:6px;left:6px;width:13px;height:13px;
    filter:drop-shadow(0 1px 1px rgba(0,0,0,.3))}
`;

// ── useTweaks ───────────────────────────────────────────────────────────────
// Single source of truth for tweak values. setTweak persists via the host
// (__edit_mode_set_keys → host rewrites the EDITMODE block on disk).
function useTweaks(defaults) {
  const [values, setValues] = React.useState(defaults);
  // Accepts either setTweak('key', value) or setTweak({ key: value, ... }) so a
  // useState-style call doesn't write a "[object Object]" key into the persisted
  // JSON block.
  const setTweak = React.useCallback((keyOrEdits, val) => {
    const edits = typeof keyOrEdits === 'object' && keyOrEdits !== null ? keyOrEdits : {
      [keyOrEdits]: val
    };
    setValues(prev => ({
      ...prev,
      ...edits
    }));
    window.parent.postMessage({
      type: '__edit_mode_set_keys',
      edits
    }, '*');
    // Same-window signal so in-page listeners (deck-stage rail thumbnails)
    // can react — the parent message only reaches the host, not peers.
    window.dispatchEvent(new CustomEvent('tweakchange', {
      detail: edits
    }));
  }, []);
  return [values, setTweak];
}

// ── TweaksPanel ─────────────────────────────────────────────────────────────
// Floating shell. Registers the protocol listener BEFORE announcing
// availability — if the announce ran first, the host's activate could land
// before our handler exists and the toolbar toggle would silently no-op.
// The close button posts __edit_mode_dismissed so the host's toolbar toggle
// flips off in lockstep; the host echoes __deactivate_edit_mode back which
// is what actually hides the panel.
function TweaksPanel({
  title = 'Tweaks',
  children
}) {
  const [open, setOpen] = React.useState(false);
  const dragRef = React.useRef(null);
  const offsetRef = React.useRef({
    x: 16,
    y: 16
  });
  const PAD = 16;
  const clampToViewport = React.useCallback(() => {
    const panel = dragRef.current;
    if (!panel) return;
    const w = panel.offsetWidth,
      h = panel.offsetHeight;
    const maxRight = Math.max(PAD, window.innerWidth - w - PAD);
    const maxBottom = Math.max(PAD, window.innerHeight - h - PAD);
    offsetRef.current = {
      x: Math.min(maxRight, Math.max(PAD, offsetRef.current.x)),
      y: Math.min(maxBottom, Math.max(PAD, offsetRef.current.y))
    };
    panel.style.right = offsetRef.current.x + 'px';
    panel.style.bottom = offsetRef.current.y + 'px';
  }, []);
  React.useEffect(() => {
    if (!open) return;
    clampToViewport();
    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', clampToViewport);
      return () => window.removeEventListener('resize', clampToViewport);
    }
    const ro = new ResizeObserver(clampToViewport);
    ro.observe(document.documentElement);
    return () => ro.disconnect();
  }, [open, clampToViewport]);
  React.useEffect(() => {
    const onMsg = e => {
      const t = e?.data?.type;
      if (t === '__activate_edit_mode') setOpen(true);else if (t === '__deactivate_edit_mode') setOpen(false);
    };
    window.addEventListener('message', onMsg);
    window.parent.postMessage({
      type: '__edit_mode_available'
    }, '*');
    return () => window.removeEventListener('message', onMsg);
  }, []);
  const dismiss = () => {
    setOpen(false);
    window.parent.postMessage({
      type: '__edit_mode_dismissed'
    }, '*');
  };
  const onDragStart = e => {
    const panel = dragRef.current;
    if (!panel) return;
    const r = panel.getBoundingClientRect();
    const sx = e.clientX,
      sy = e.clientY;
    const startRight = window.innerWidth - r.right;
    const startBottom = window.innerHeight - r.bottom;
    const move = ev => {
      offsetRef.current = {
        x: startRight - (ev.clientX - sx),
        y: startBottom - (ev.clientY - sy)
      };
      clampToViewport();
    };
    const up = () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', up);
    };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
  };
  if (!open) return null;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("style", null, __TWEAKS_STYLE), /*#__PURE__*/React.createElement("div", {
    ref: dragRef,
    className: "twk-panel",
    "data-omelette-chrome": "",
    style: {
      right: offsetRef.current.x,
      bottom: offsetRef.current.y
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-hd",
    onMouseDown: onDragStart
  }, /*#__PURE__*/React.createElement("b", null, title), /*#__PURE__*/React.createElement("button", {
    className: "twk-x",
    "aria-label": "Close tweaks",
    onMouseDown: e => e.stopPropagation(),
    onClick: dismiss
  }, "\u2715")), /*#__PURE__*/React.createElement("div", {
    className: "twk-body"
  }, children)));
}

// ── Layout helpers ──────────────────────────────────────────────────────────

function TweakSection({
  label,
  children
}) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "twk-sect"
  }, label), children);
}
function TweakRow({
  label,
  value,
  children,
  inline = false
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: inline ? 'twk-row twk-row-h' : 'twk-row'
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-lbl"
  }, /*#__PURE__*/React.createElement("span", null, label), value != null && /*#__PURE__*/React.createElement("span", {
    className: "twk-val"
  }, value)), children);
}

// ── Controls ────────────────────────────────────────────────────────────────

function TweakSlider({
  label,
  value,
  min = 0,
  max = 100,
  step = 1,
  unit = '',
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label,
    value: `${value}${unit}`
  }, /*#__PURE__*/React.createElement("input", {
    type: "range",
    className: "twk-slider",
    min: min,
    max: max,
    step: step,
    value: value,
    onChange: e => onChange(Number(e.target.value))
  }));
}
function TweakToggle({
  label,
  value,
  onChange
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "twk-row twk-row-h"
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-lbl"
  }, /*#__PURE__*/React.createElement("span", null, label)), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "twk-toggle",
    "data-on": value ? '1' : '0',
    role: "switch",
    "aria-checked": !!value,
    onClick: () => onChange(!value)
  }, /*#__PURE__*/React.createElement("i", null)));
}
function TweakRadio({
  label,
  value,
  options,
  onChange
}) {
  const trackRef = React.useRef(null);
  const [dragging, setDragging] = React.useState(false);
  // The active value is read by pointer-move handlers attached for the lifetime
  // of a drag — ref it so a stale closure doesn't fire onChange for every move.
  const valueRef = React.useRef(value);
  valueRef.current = value;

  // Segments wrap mid-word once per-segment width runs out. The track is
  // ~248px (280 panel − 28 body pad − 4 seg pad), each button loses 12px
  // to its own padding, and 11.5px system-ui averages ~6.3px/char — so 2
  // options fit ~16 chars each, 3 fit ~10. Past that (or >3 options), fall
  // back to a dropdown rather than wrap.
  const labelLen = o => String(typeof o === 'object' ? o.label : o).length;
  const maxLen = options.reduce((m, o) => Math.max(m, labelLen(o)), 0);
  const fitsAsSegments = maxLen <= ({
    2: 16,
    3: 10
  }[options.length] ?? 0);
  if (!fitsAsSegments) {
    // <select> emits strings — map back to the original option value so the
    // fallback stays type-preserving (numbers, booleans) like the segment path.
    const resolve = s => {
      const m = options.find(o => String(typeof o === 'object' ? o.value : o) === s);
      return m === undefined ? s : typeof m === 'object' ? m.value : m;
    };
    return /*#__PURE__*/React.createElement(TweakSelect, {
      label: label,
      value: value,
      options: options,
      onChange: s => onChange(resolve(s))
    });
  }
  const opts = options.map(o => typeof o === 'object' ? o : {
    value: o,
    label: o
  });
  const idx = Math.max(0, opts.findIndex(o => o.value === value));
  const n = opts.length;
  const segAt = clientX => {
    const r = trackRef.current.getBoundingClientRect();
    const inner = r.width - 4;
    const i = Math.floor((clientX - r.left - 2) / inner * n);
    return opts[Math.max(0, Math.min(n - 1, i))].value;
  };
  const onPointerDown = e => {
    setDragging(true);
    const v0 = segAt(e.clientX);
    if (v0 !== valueRef.current) onChange(v0);
    const move = ev => {
      if (!trackRef.current) return;
      const v = segAt(ev.clientX);
      if (v !== valueRef.current) onChange(v);
    };
    const up = () => {
      setDragging(false);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("div", {
    ref: trackRef,
    role: "radiogroup",
    onPointerDown: onPointerDown,
    className: dragging ? 'twk-seg dragging' : 'twk-seg'
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-seg-thumb",
    style: {
      left: `calc(2px + ${idx} * (100% - 4px) / ${n})`,
      width: `calc((100% - 4px) / ${n})`
    }
  }), opts.map(o => /*#__PURE__*/React.createElement("button", {
    key: o.value,
    type: "button",
    role: "radio",
    "aria-checked": o.value === value
  }, o.label))));
}
function TweakSelect({
  label,
  value,
  options,
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("select", {
    className: "twk-field",
    value: value,
    onChange: e => onChange(e.target.value)
  }, options.map(o => {
    const v = typeof o === 'object' ? o.value : o;
    const l = typeof o === 'object' ? o.label : o;
    return /*#__PURE__*/React.createElement("option", {
      key: v,
      value: v
    }, l);
  })));
}
function TweakText({
  label,
  value,
  placeholder,
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("input", {
    className: "twk-field",
    type: "text",
    value: value,
    placeholder: placeholder,
    onChange: e => onChange(e.target.value)
  }));
}
function TweakNumber({
  label,
  value,
  min,
  max,
  step = 1,
  unit = '',
  onChange
}) {
  const clamp = n => {
    if (min != null && n < min) return min;
    if (max != null && n > max) return max;
    return n;
  };
  const startRef = React.useRef({
    x: 0,
    val: 0
  });
  const onScrubStart = e => {
    e.preventDefault();
    startRef.current = {
      x: e.clientX,
      val: value
    };
    const decimals = (String(step).split('.')[1] || '').length;
    const move = ev => {
      const dx = ev.clientX - startRef.current.x;
      const raw = startRef.current.val + dx * step;
      const snapped = Math.round(raw / step) * step;
      onChange(clamp(Number(snapped.toFixed(decimals))));
    };
    const up = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "twk-num"
  }, /*#__PURE__*/React.createElement("span", {
    className: "twk-num-lbl",
    onPointerDown: onScrubStart
  }, label), /*#__PURE__*/React.createElement("input", {
    type: "number",
    value: value,
    min: min,
    max: max,
    step: step,
    onChange: e => onChange(clamp(Number(e.target.value)))
  }), unit && /*#__PURE__*/React.createElement("span", {
    className: "twk-num-unit"
  }, unit));
}

// Relative-luminance contrast pick — checkmarks drawn over a swatch need to
// read on both #111 and #fafafa without per-option configuration. Hex input
// only (#rgb / #rrggbb); named or rgb()/hsl() colors fall through to "light".
function __twkIsLight(hex) {
  const h = String(hex).replace('#', '');
  const x = h.length === 3 ? h.replace(/./g, c => c + c) : h.padEnd(6, '0');
  const n = parseInt(x.slice(0, 6), 16);
  if (Number.isNaN(n)) return true;
  const r = n >> 16 & 255,
    g = n >> 8 & 255,
    b = n & 255;
  return r * 299 + g * 587 + b * 114 > 148000;
}
const __TwkCheck = ({
  light
}) => /*#__PURE__*/React.createElement("svg", {
  viewBox: "0 0 14 14",
  "aria-hidden": "true"
}, /*#__PURE__*/React.createElement("path", {
  d: "M3 7.2 5.8 10 11 4.2",
  fill: "none",
  strokeWidth: "2.2",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  stroke: light ? 'rgba(0,0,0,.78)' : '#fff'
}));

// TweakColor — curated color/palette picker. Each option is either a single
// hex string or an array of 1-5 hex strings; the card adapts — a lone color
// renders solid, a palette renders colors[0] as the hero (left ~2/3) with the
// rest stacked in a sharp column on the right. onChange emits the
// option in the shape it was passed (string stays string, array stays array).
// Without options it falls back to the native color input for back-compat.
function TweakColor({
  label,
  value,
  options,
  onChange
}) {
  if (!options || !options.length) {
    return /*#__PURE__*/React.createElement("div", {
      className: "twk-row twk-row-h"
    }, /*#__PURE__*/React.createElement("div", {
      className: "twk-lbl"
    }, /*#__PURE__*/React.createElement("span", null, label)), /*#__PURE__*/React.createElement("input", {
      type: "color",
      className: "twk-swatch",
      value: value,
      onChange: e => onChange(e.target.value)
    }));
  }
  // Native <input type=color> emits lowercase hex per the HTML spec, so
  // compare case-insensitively. String() guards JSON.stringify(undefined),
  // which returns the primitive undefined (no .toLowerCase).
  const key = o => String(JSON.stringify(o)).toLowerCase();
  const cur = key(value);
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-chips",
    role: "radiogroup"
  }, options.map((o, i) => {
    const colors = Array.isArray(o) ? o : [o];
    const [hero, ...rest] = colors;
    const sup = rest.slice(0, 4);
    const on = key(o) === cur;
    return /*#__PURE__*/React.createElement("button", {
      key: i,
      type: "button",
      className: "twk-chip",
      role: "radio",
      "aria-checked": on,
      "data-on": on ? '1' : '0',
      "aria-label": colors.join(', '),
      title: colors.join(' · '),
      style: {
        background: hero
      },
      onClick: () => onChange(o)
    }, sup.length > 0 && /*#__PURE__*/React.createElement("span", null, sup.map((c, j) => /*#__PURE__*/React.createElement("i", {
      key: j,
      style: {
        background: c
      }
    }))), on && /*#__PURE__*/React.createElement(__TwkCheck, {
      light: __twkIsLight(hero)
    }));
  })));
}
function TweakButton({
  label,
  onClick,
  secondary = false
}) {
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: secondary ? 'twk-btn secondary' : 'twk-btn',
    onClick: onClick
  }, label);
}
Object.assign(window, {
  useTweaks,
  TweaksPanel,
  TweakSection,
  TweakRow,
  TweakSlider,
  TweakToggle,
  TweakRadio,
  TweakSelect,
  TweakText,
  TweakNumber,
  TweakColor,
  TweakButton
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/shelfie/tweaks-panel.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Chip = __ds_scope.Chip;

__ds_ns.PrismBackground = __ds_scope.PrismBackground;

__ds_ns.EvidenceTag = __ds_scope.EvidenceTag;

__ds_ns.ScreenHeader = __ds_scope.ScreenHeader;

__ds_ns.SectionDivider = __ds_scope.SectionDivider;

__ds_ns.TextField = __ds_scope.TextField;

__ds_ns.Textarea = __ds_scope.Textarea;

__ds_ns.SegmentedControl = __ds_scope.SegmentedControl;

__ds_ns.TabBar = __ds_scope.TabBar;

__ds_ns.BottleGlyph = __ds_scope.BottleGlyph;

__ds_ns.PaoMeter = __ds_scope.PaoMeter;

__ds_ns.BottomSheet = __ds_scope.BottomSheet;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Toast = __ds_scope.Toast;

})();

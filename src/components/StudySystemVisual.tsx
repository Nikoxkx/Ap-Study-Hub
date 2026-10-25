const courseColors = ["#9c3b2e", "#31456b", "#6b3f6e", "#2f5f56", "#4f6b32", "#9a6520", "#57534a"];

/** Editorial diagram of the read → recall → respond study loop. */
export function StudySystemVisual() {
  return (
    <svg
      viewBox="0 0 1080 440"
      className="h-auto w-full"
      role="img"
      aria-labelledby="study-system-title study-system-desc"
    >
      <title id="study-system-title">One lesson, three ways to make it stick</title>
      <desc id="study-system-desc">
        A cited ten-paragraph lesson connects to a glossary flashcard and an original multiple-choice
        question, with a return path from practice feedback to the exact lesson section.
      </desc>
      <defs>
        <pattern id="lesson-rules" width="12" height="24" patternUnits="userSpaceOnUse">
          <path d="M0 23.5H12" fill="none" stroke="var(--rule)" strokeWidth="1" opacity="0.65" />
        </pattern>
      </defs>

      <rect x="1" y="1" width="1078" height="438" fill="var(--paper)" stroke="var(--rule)" />
      <rect x="1" y="1" width="1078" height="438" fill="url(#lesson-rules)" opacity="0.35" />
      <path d="M42 52H1038" stroke="var(--ink)" strokeWidth="2" />
      <text x="42" y="36" fill="var(--ink-faint)" fontSize="13" letterSpacing="2" fontFamily="var(--font-mono)">
        THE AP STUDY HUB METHOD · 2026–27
      </text>

      {/* Deep lesson sheet */}
      <g>
        <rect x="54" y="86" width="290" height="280" fill="var(--paper-raised)" stroke="var(--rule-strong)" />
        <path d="M310 86h34v34" fill="var(--paper-sunk)" stroke="var(--rule-strong)" />
        <path d="M310 86v34h34" fill="none" stroke="var(--rule-strong)" />
        {courseColors.map((color, index) => (
          <rect key={color} x={70 + index * 34} y="74" width="24" height="12" fill={color} />
        ))}
        <text x="76" y="139" fill="var(--mark)" fontSize="12" letterSpacing="1.8" fontFamily="var(--font-mono)">
          01 · READ DEEPLY
        </text>
        <text x="76" y="174" fill="var(--ink)" fontSize="25" fontFamily="var(--font-display)">
          A complete lesson
        </text>
        <text x="76" y="199" fill="var(--ink-soft)" fontSize="14" fontFamily="var(--font-ui)">
          Objectives · context · worked examples
        </text>
        {[0, 1, 2, 3, 4, 5].map((line) => (
          <path
            key={line}
            d={`M76 ${229 + line * 19}H${line % 3 === 2 ? 272 : 310}`}
            stroke="var(--ink-faint)"
            strokeWidth="3"
            opacity="0.55"
          />
        ))}
        <path d="M287 217v104" stroke="var(--mark)" strokeWidth="2" />
        <text x="76" y="346" fill="var(--ink-faint)" fontSize="12" fontFamily="var(--font-mono)">
          10+ PARAGRAPHS · SOURCES AT SECTION LEVEL
        </text>
      </g>

      <g fill="none" stroke="var(--mark)" strokeWidth="2">
        <path d="M363 225h46m-9-9 9 9-9 9" />
        <path d="M669 225h46m-9-9 9 9-9 9" />
      </g>

      {/* Flashcard */}
      <g>
        <rect x="432" y="104" width="214" height="244" fill="var(--paper-sunk)" stroke="var(--rule)" transform="rotate(3 539 226)" />
        <rect x="420" y="88" width="226" height="260" fill="var(--paper-raised)" stroke="var(--subject-ink)" strokeWidth="1.5" />
        <text x="442" y="127" fill="var(--subject-ink)" fontSize="12" letterSpacing="1.6" fontFamily="var(--font-mono)">
          02 · RECALL
        </text>
        <path d="M442 145h182" stroke="var(--rule)" />
        <text x="442" y="186" fill="var(--ink-faint)" fontSize="12" fontFamily="var(--font-mono)">
          TERM → YOUR EXPLANATION
        </text>
        <text x="442" y="226" fill="var(--ink)" fontSize="26" fontStyle="italic" fontFamily="var(--font-display)">
          Can you produce
        </text>
        <text x="442" y="258" fill="var(--ink)" fontSize="26" fontStyle="italic" fontFamily="var(--font-display)">
          the idea cold?
        </text>
        <rect x="442" y="291" width="112" height="31" fill="var(--subject-tint)" />
        <text x="456" y="312" fill="var(--subject-ink)" fontSize="12" fontFamily="var(--font-mono)">
          FLIP · MARK · REDO
        </text>
      </g>

      {/* Original practice */}
      <g>
        <rect x="735" y="86" width="291" height="280" fill="var(--paper-raised)" stroke="var(--rule-strong)" />
        <text x="757" y="127" fill="var(--mark)" fontSize="12" letterSpacing="1.6" fontFamily="var(--font-mono)">
          03 · RESPOND
        </text>
        <text x="757" y="163" fill="var(--ink)" fontSize="24" fontFamily="var(--font-display)">
          Original practice
        </text>
        {[0, 1, 2].map((option) => (
          <g key={option}>
            <rect x="757" y={187 + option * 42} width="247" height="31" fill="var(--paper)" stroke="var(--rule)" />
            <circle cx="774" cy={202.5 + option * 42} r="6" fill="none" stroke={option === 1 ? "var(--mark)" : "var(--ink-faint)"} />
            {option === 1 ? <circle cx="774" cy={202.5 + option * 42} r="3" fill="var(--mark)" /> : null}
            <path d={`M791 ${202.5 + option * 42}h${option === 1 ? 161 : 128 + option * 19}`} stroke="var(--ink-faint)" strokeWidth="3" opacity="0.55" />
          </g>
        ))}
        <path d="M757 324h247" stroke="var(--rule)" />
        <text x="757" y="347" fill="var(--ink-soft)" fontSize="12" fontFamily="var(--font-mono)">
          FEEDBACK → EXACT LESSON SECTION
        </text>
      </g>

      <path d="M880 379v22H197v-22" fill="none" stroke="var(--mark)" strokeWidth="1.5" strokeDasharray="4 5" />
      <path d="m191 393 6 8 6-8" fill="none" stroke="var(--mark)" strokeWidth="1.5" />
      <text x="540" y="422" textAnchor="middle" fill="var(--ink-faint)" fontSize="13" fontFamily="var(--font-ui)">
        A wrong answer becomes a route back to understanding—not just a score.
      </text>
    </svg>
  );
}

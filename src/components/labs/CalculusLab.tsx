"use client";

import { useMemo, useState } from "react";
import type { CalculusLab as CalculusLabDefinition } from "@/content/labs";
import { Math as Tex } from "@/lib/math";

type Mode = "function" | "change" | "accumulation";

export function CalculusLab({ lab }: { lab: CalculusLabDefinition }) {
  const [mode, setMode] = useState<Mode>("change");
  const [a, setA] = useState(lab.model === "quadratic" ? 1 : 2);
  const [h, setH] = useState(1);
  const [k, setK] = useState(lab.model === "quadratic" ? -2 : 1);
  const [x, setX] = useState(2);
  const [minX, maxX] = lab.domain;

  const fn = (value: number) => lab.model === "quadratic"
    ? a * (value - h) ** 2 + k
    : a * Math.sin(k * value);
  const derivative = (value: number) => lab.model === "quadratic"
    ? 2 * a * (value - h)
    : a * k * Math.cos(k * value);

  const graph = useMemo(() => {
    const samples = Array.from({ length: 241 }, (_, index) => minX + (index / 240) * (maxX - minX));
    const values = samples.map(fn);
    const areaAt = (from: number, to: number) => {
      const steps = 400;
      const width = (to - from) / steps;
      let sum = 0;
      for (let index = 0; index < steps; index += 1) {
        const left = from + index * width;
        sum += ((fn(left) + fn(left + width)) / 2) * width;
      }
      return sum;
    };
    const accumulated = areaAt(0, x);
    const maxY = Math.max(2, ...values.map((value) => Math.abs(value)), Math.abs(accumulated));
    const minY = -maxY * 1.08;
    const upperY = maxY * 1.08;
    const sx = (value: number) => 46 + ((value - minX) / (maxX - minX)) * 674;
    const sy = (value: number) => 18 + ((upperY - value) / (upperY - minY)) * 284;
    const path = samples.map((value, index) => `${index === 0 ? "M" : "L"}${sx(value).toFixed(2)},${sy(fn(value)).toFixed(2)}`).join(" ");
    const tangentAt = (value: number) => fn(x) + derivative(x) * (value - x);
    const tangent = `M${sx(minX)},${sy(tangentAt(minX))} L${sx(maxX)},${sy(tangentAt(maxX))}`;
    const areaSamples = Array.from({ length: 61 }, (_, index) => 0 + (index / 60) * (x - 0));
    const areaPath = areaSamples.length > 1
      ? `${areaSamples.map((value, index) => `${index === 0 ? "M" : "L"}${sx(value)},${sy(fn(value))}`).join(" ")} L${sx(x)},${sy(0)} L${sx(0)},${sy(0)} Z`
      : "";
    return { samples, maxY, minY, upperY, sx, sy, path, tangent, areaPath, accumulated };
  // The function definitions intentionally close over the live controls.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [a, h, k, x, minX, maxX, lab.model]);

  const reset = () => {
    setA(lab.model === "quadratic" ? 1 : 2); setH(1); setK(lab.model === "quadratic" ? -2 : 1); setX(2);
  };
  const functionLabel = lab.model === "quadratic"
    ? String.raw`f(x)=${a}(x-${h})^2+(${k})`
    : String.raw`f(x)=${a}\sin(${k}x)`;
  const controls = lab.model === "quadratic"
    ? [
        { label: "a · vertical scale", value: a, set: setA, min: -2, max: 2, step: 0.25 },
        { label: "h · horizontal shift", value: h, set: setH, min: -2, max: 2, step: 0.25 },
        { label: "k · vertical shift", value: k, set: setK, min: -4, max: 4, step: 0.5 },
      ]
    : [
        { label: "a · amplitude", value: a, set: setA, min: 0.5, max: 4, step: 0.5 },
        { label: "k · angular frequency", value: k, set: setK, min: 0.5, max: 3, step: 0.5 },
      ];

  return (
    <div className="lab-layout">
      <div className="lab-controls no-print">
        <div className="segmented" role="group" aria-label="Graph overlay">
          {(["function", "change", "accumulation"] as Mode[]).map((option) => (
            <button key={option} type="button" aria-pressed={mode === option} onClick={() => setMode(option)}>
              {option === "function" ? "Function" : option === "change" ? "Tangent & change" : "Accumulation"}
            </button>
          ))}
        </div>
        {controls.map((control) => (
          <label key={control.label} className="lab-slider">
            <span>{control.label}<output>{control.value}</output></span>
            <input type="range" min={control.min} max={control.max} step={control.step} value={control.value}
              onChange={(event) => control.set(Number(event.target.value))} />
          </label>
        ))}
        <label className="lab-slider">
          <span>x · point of interest<output>{x.toFixed(2)}</output></span>
          <input type="range" min={minX} max={maxX} step={0.05} value={x} onChange={(event) => setX(Number(event.target.value))} />
        </label>
        <button type="button" className="btn btn-outline btn-sm" onClick={reset}>Reset parameters</button>
      </div>

      <div className="lab-stage">
        <div className="lab-equation"><Tex>{functionLabel}</Tex></div>
        <svg viewBox="0 0 760 340" className="lab-graph" role="img" aria-label={`${lab.title}. Current x ${x.toFixed(2)}.`}>
          <title>{lab.title}</title>
          {Array.from({ length: 9 }, (_, index) => {
            const value = minX + (index / 8) * (maxX - minX);
            return <line key={`x-${index}`} x1={graph.sx(value)} x2={graph.sx(value)} y1={18} y2={302} className="graph-grid" />;
          })}
          {Array.from({ length: 7 }, (_, index) => {
            const value = graph.minY + (index / 6) * (graph.upperY - graph.minY);
            return <line key={`y-${index}`} x1={46} x2={720} y1={graph.sy(value)} y2={graph.sy(value)} className="graph-grid" />;
          })}
          <line x1={46} x2={720} y1={graph.sy(0)} y2={graph.sy(0)} className="graph-axis" />
          <line x1={graph.sx(0)} x2={graph.sx(0)} y1={18} y2={302} className="graph-axis" />
          {mode === "accumulation" && graph.areaPath ? <path d={graph.areaPath} className="graph-area" /> : null}
          {mode === "change" ? <path d={graph.tangent} className="graph-tangent" /> : null}
          <path d={graph.path} className="graph-function" />
          <line x1={graph.sx(x)} x2={graph.sx(x)} y1={graph.sy(0)} y2={graph.sy(fn(x))} className="graph-point-line" />
          <circle cx={graph.sx(x)} cy={graph.sy(fn(x))} r={5} className="graph-point" />
          <text x={718} y={graph.sy(0) - 8} textAnchor="end" className="graph-label">x</text>
          <text x={graph.sx(0) + 8} y={28} className="graph-label">f(x)</text>
          <text x={graph.sx(x)} y={326} textAnchor="middle" className="graph-label">{x.toFixed(1)}</text>
        </svg>
        <div className="lab-readout" aria-live="polite">
          <Tex>{String.raw`f(${x.toFixed(2)})=${fn(x).toFixed(3)}`}</Tex>
          {mode === "change" ? <Tex>{String.raw`f'(${x.toFixed(2)})=${derivative(x).toFixed(3)}`}</Tex> : null}
          {mode === "accumulation" ? <Tex>{String.raw`\int_0^{${x.toFixed(2)}}f(t)\,dt\approx${graph.accumulated.toFixed(3)}`}</Tex> : null}
          <p>{mode === "function" ? "The point gives an output, not a rate or an area." : mode === "change" ? "The dashed tangent uses the derivative at the selected point. A negative slope is a decreasing instantaneous rate." : "The shaded signed accumulation uses the same function. Regions below the axis subtract from the total."}</p>
        </div>
      </div>
    </div>
  );
}

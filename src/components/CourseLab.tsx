"use client";

import Link from "next/link";
import type { CourseLab as CourseLabDefinition } from "@/content/labs";
import { CalculusLab } from "./labs/CalculusLab";
import { DataLab } from "./labs/DataLab";
import { AnnotationLab } from "./labs/AnnotationLab";
import { MatchLab } from "./labs/MatchLab";
import { MatrixLab } from "./labs/MatrixLab";
import { ResearchLab } from "./labs/ResearchLab";

export function CourseLab({ lab, courseLabel }: { lab: CourseLabDefinition; courseLabel: string }) {
  return (
    <article className="course-lab" id={lab.id}>
      <header className="course-lab-header">
        <div>
          <p className="label mb-2">Interactive lesson · {lab.kind}</p>
          <h3>{lab.title}</h3>
          <p>{lab.instructions}</p>
        </div>
        <Link href={`/course/${lab.courseSlug}/notes#unit-${lab.unitNumber}`} className="btn btn-quiet btn-sm no-print">
          Lesson {lab.unitNumber} →
        </Link>
      </header>
      {lab.kind === "calculus" ? <CalculusLab lab={lab} /> : null}
      {lab.kind === "data" ? <DataLab lab={lab} courseLabel={courseLabel} /> : null}
      {lab.kind === "annotation" ? <AnnotationLab lab={lab} /> : null}
      {lab.kind === "match" ? <MatchLab lab={lab} courseLabel={courseLabel} /> : null}
      {lab.kind === "matrix" ? <MatrixLab lab={lab} /> : null}
      {lab.kind === "research" ? <ResearchLab lab={lab} /> : null}
    </article>
  );
}

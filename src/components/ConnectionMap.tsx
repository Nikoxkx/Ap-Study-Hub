import Link from "next/link";
import { getConnectionsFor } from "@/content/connections";
import type { StudyCourse } from "@/lib/study-data";

export function ConnectionMap({ course, courses }: { course: StudyCourse; courses: StudyCourse[] }) {
  const connections = getConnectionsFor(course.slug);
  const lookup = (slug: string, unitNumber: number) => {
    const linkedCourse = courses.find((item) => item.slug === slug);
    const unit = linkedCourse?.units.find((item) => item.unitNumber === unitNumber);
    return { course: linkedCourse, unit };
  };

  return (
    <div className="connection-maps">
      <section aria-labelledby="prerequisite-map">
        <p className="label mb-2">Prerequisite path</p>
        <h3 id="prerequisite-map">Build this course in sequence</h3>
        <p className="map-intro">This is the site’s teaching sequence, not an official College Board prerequisite rule. Use a later lesson’s link back when a missing earlier idea blocks you.</p>
        <ol className="prerequisite-map">
          {course.units.map((unit, index) => <li key={unit.unitNumber}>
            <Link href={`/course/${course.slug}/notes#unit-${unit.unitNumber}`}>
              <span className="folio">{String(unit.unitNumber).padStart(2, "0")}</span>
              <span>{unit.title}</span>
            </Link>
            {index < course.units.length - 1 ? <span className="map-arrow" aria-hidden="true">→</span> : null}
          </li>)}
        </ol>
      </section>

      <section aria-labelledby="cross-course-map">
        <p className="label mb-2">Cross-course connections</p>
        <h3 id="cross-course-map">One idea, another context</h3>
        {connections.length ? <div className="connection-list">
          {connections.map((connection) => {
            const outgoing = connection.from.courseSlug === course.slug;
            const own = outgoing ? connection.from : connection.to;
            const other = outgoing ? connection.to : connection.from;
            const ownContent = lookup(own.courseSlug, own.unitNumber);
            const otherContent = lookup(other.courseSlug, other.unitNumber);
            return <article key={connection.id} className="connection-card">
              <p className="label">{outgoing ? "From this course" : "Into this course"}</p>
              <h4>{connection.title}</h4>
              <p>{connection.explanation}</p>
              <div className="connection-endpoints">
                <span>Lesson {own.unitNumber} · {ownContent.unit?.title}</span>
                <span aria-hidden="true">↔</span>
                <Link href={`/course/${other.courseSlug}/notes#unit-${other.unitNumber}`}>
                  {otherContent.course?.label} · Lesson {other.unitNumber} · {otherContent.unit?.title} →
                </Link>
              </div>
            </article>;
          })}
        </div> : <p className="map-intro">No cross-course link is registered for this course yet.</p>}
      </section>
    </div>
  );
}

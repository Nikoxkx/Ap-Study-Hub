"use client";

import { usePrefs } from "@/lib/use-prefs";
import { HOME_MODULES, HOME_MODULE_ORDER } from "@/lib/site-prefs";
import { Note, Panel, Row, Toggle, TextField } from "./controls";

/**
 * Home page layout: what appears, in what order, and what each section is
 * called.
 *
 * Order is applied with CSS `order` on a flex column, so hiding or moving a
 * section never reflows the DOM the server sent — it is a class change, not a
 * re-render, and the page keeps working if scripting is unavailable.
 */
export function LayoutPanel() {
  const { prefs, update } = usePrefs();
  const order = prefs.layout.order;

  function move(id: string, direction: -1 | 1) {
    update((draft) => {
      const list = draft.layout.order;
      const index = list.indexOf(id);
      const target = index + direction;
      if (index === -1 || target < 0 || target >= list.length) return;
      [list[index], list[target]] = [list[target], list[index]];
    });
  }

  function setVisible(id: string, visible: boolean) {
    update((draft) => {
      const hidden = new Set(draft.layout.hidden);
      if (visible) hidden.delete(id);
      else hidden.add(id);
      draft.layout.hidden = [...hidden];
    });
  }

  return (
    <>
      <Panel
        title="Sections"
        description="Reorder, hide, or rename every block on the home page. Changes apply the moment you make them."
        aside={
          <button
            type="button"
            className="pref-mini"
            onClick={() =>
              update((draft) => {
                draft.layout.order = [...HOME_MODULE_ORDER];
                draft.layout.hidden = [];
              })
            }
          >
            Reset layout
          </button>
        }
      >
        <ol className="module-list">
          {order.map((id, index) => {
            const definition = HOME_MODULES.find((entry) => entry.id === id);
            if (!definition) return null;
            const visible = !prefs.layout.hidden.includes(id);
            return (
              <li key={id} className={`module-row${visible ? "" : " is-hidden"}`}>
                <div className="module-row-main">
                  <div>
                    <p className="module-row-title">{definition.label}</p>
                    <p className="module-row-note">{definition.note}</p>
                  </div>
                  <div className="module-row-actions">
                    <button
                      type="button"
                      className="pref-mini"
                      onClick={() => move(id, -1)}
                      disabled={index === 0}
                      aria-label={`Move ${definition.label} up`}
                    >
                      ↑
                    </button>
                    <button
                      type="button"
                      className="pref-mini"
                      onClick={() => move(id, 1)}
                      disabled={index === order.length - 1}
                      aria-label={`Move ${definition.label} down`}
                    >
                      ↓
                    </button>
                    <Toggle
                      label={`Show ${definition.label}`}
                      checked={visible}
                      onChange={(checked) => setVisible(id, checked)}
                    />
                  </div>
                </div>
                <div className="module-row-rename">
                  <label htmlFor={`rename-${id}`}>Heading</label>
                  <TextField
                    id={`rename-${id}`}
                    value={prefs.layout.renamed[id] ?? ""}
                    placeholder="Use the shipped heading"
                    maxLength={120}
                    onChange={(value) =>
                      update((draft) => {
                        if (value.trim()) draft.layout.renamed[id] = value;
                        else delete draft.layout.renamed[id];
                      })
                    }
                  />
                </div>
              </li>
            );
          })}
        </ol>
        <Note>
          Hiding a section never deletes anything: the lessons, cards, and practice behind it stay
          exactly where they were. Turn it back on and it returns in the same place.
        </Note>
      </Panel>

      <Panel title="Chrome" description="The pieces around the content.">
        <Row label="Header behaviour" hint="Auto-hide follows you down the page and returns when you scroll up.">
          <Toggle
            label="Auto-hide header"
            checked={prefs.layout.headerAutoHide}
            onChange={(checked) => update((draft) => { draft.layout.headerAutoHide = checked; })}
          />
        </Row>
        <Row label="Content width" hint="Wide suits big screens; the default is the reading column.">
          <Toggle
            label="Wide content column"
            checked={prefs.layout.wideContent}
            onChange={(checked) => update((draft) => { draft.layout.wideContent = checked; })}
          />
        </Row>
      </Panel>
    </>
  );
}

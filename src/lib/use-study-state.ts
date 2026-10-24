"use client";

import { DEFAULT_STUDY_STATE, reviveStudyState, STUDY_STORAGE_KEY, type StudyState } from "./study-model";
import { useStoredState } from "./use-stored-state";

/** The single shared study record used by every review and progress surface. */
export function useStudyState() {
  return useStoredState<StudyState>(STUDY_STORAGE_KEY, DEFAULT_STUDY_STATE, reviveStudyState);
}

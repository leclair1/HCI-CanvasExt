// Course Color Customization Store
// Allows users to customize colors for their courses while preserving contrast

import { getReadableTextColor, normalizeHex } from './colorUtils';

export interface CourseColor {
  primary: string;
  light: string;
  dark: string;
  foreground: string;
}

export interface CustomCourseColors {
  [courseId: string]: CourseColor;
}

const STORAGE_KEY = 'canvas_tailored_course_colors';

const createCourseColor = (primary: string, light: string, dark: string): CourseColor => {
  const normalizedPrimary = normalizeHex(primary);
  return {
    primary: normalizedPrimary,
    light: normalizeHex(light),
    dark: normalizeHex(dark),
    foreground: getReadableTextColor(normalizedPrimary),
  };
};

const normalizeCourseColor = (color: CourseColor | undefined): CourseColor => {
  if (!color) {
    return createCourseColor('#3B82F6', '#DBEAFE', '#1E40AF');
  }

  const primary = normalizeHex(color.primary);
  const light = normalizeHex(color.light ?? color.primary);
  const dark = normalizeHex(color.dark ?? color.primary);
  const foreground = color.foreground
    ? normalizeHex(color.foreground)
    : getReadableTextColor(primary);

  return { primary, light, dark, foreground };
};

// Default color palettes users can choose from
export const colorPresets: { [key: string]: CourseColor } = {
  blue: createCourseColor('#3B82F6', '#DBEAFE', '#1E40AF'),
  green: createCourseColor('#10B981', '#D1FAE5', '#047857'),
  orange: createCourseColor('#F59E0B', '#FEF3C7', '#D97706'),
  purple: createCourseColor('#8B5CF6', '#EDE9FE', '#6D28D9'),
  red: createCourseColor('#EF4444', '#FEE2E2', '#B91C1C'),
  pink: createCourseColor('#EC4899', '#FCE7F3', '#BE185D'),
  indigo: createCourseColor('#6366F1', '#E0E7FF', '#4338CA'),
  teal: createCourseColor('#14B8A6', '#CCFBF1', '#0F766E'),
  cyan: createCourseColor('#06B6D4', '#CFFAFE', '#0E7490'),
  amber: createCourseColor('#F59E0B', '#FEF3C7', '#D97706'),
  lime: createCourseColor('#84CC16', '#ECFCCB', '#65A30D'),
  emerald: createCourseColor('#10B981', '#D1FAE5', '#047857'),
};

// Default colors for each course (matching current design)
const defaultColors: CustomCourseColors = {
  crn4020: colorPresets.blue,
  cop4600: colorPresets.green,
  cis4930: colorPresets.orange,
  cis4931: colorPresets.purple,
  eng102: colorPresets.indigo,
};

const withDefaults = (custom: CustomCourseColors = {}): CustomCourseColors => {
  const merged: CustomCourseColors = {};

  Object.entries(defaultColors).forEach(([courseId, color]) => {
    merged[courseId] = normalizeCourseColor(color);
  });

  Object.entries(custom).forEach(([courseId, color]) => {
    merged[courseId] = normalizeCourseColor(color);
  });

  return merged;
};

const saveCustomColors = (colors: CustomCourseColors) => {
  const toSave: CustomCourseColors = {};

  Object.entries(colors).forEach(([courseId, color]) => {
    const normalized = normalizeCourseColor(color);
    const defaultColor = defaultColors[courseId];

    if (!defaultColor || JSON.stringify(normalized) !== JSON.stringify(defaultColor)) {
      toSave[courseId] = normalized;
    }
  });

  if (Object.keys(toSave).length === 0) {
    localStorage.removeItem(STORAGE_KEY);
  } else {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
  }
};

// Get custom colors from localStorage
export function getCustomCourseColors(): CustomCourseColors {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed: CustomCourseColors = JSON.parse(stored);
      return withDefaults(parsed);
    }
  } catch (error) {
    console.error('Error loading custom course colors:', error);
  }

  return withDefaults();
}

// Get color for a specific course
export function getCourseColor(courseId: string): CourseColor {
  const customColors = getCustomCourseColors();
  return customColors[courseId] || colorPresets.blue;
}

// Save custom color for a course
export function setCourseColor(courseId: string, color: CourseColor): void {
  try {
    const customColors = getCustomCourseColors();
    customColors[courseId] = normalizeCourseColor(color);
    saveCustomColors(customColors);
  } catch (error) {
    console.error('Error saving course color:', error);
  }
}

// Set course color by preset name
export function setCourseColorPreset(courseId: string, presetName: string): void {
  const preset = colorPresets[presetName];
  if (preset) {
    setCourseColor(courseId, preset);
  }
}

// Reset course color to default
export function resetCourseColor(courseId: string): void {
  try {
    const customColors = getCustomCourseColors();
    delete customColors[courseId];
    saveCustomColors(customColors);
  } catch (error) {
    console.error('Error resetting course color:', error);
  }
}

// Reset all course colors
export function resetAllCourseColors(): void {
  localStorage.removeItem(STORAGE_KEY);
}

// Get all preset names for UI
export function getPresetNames(): string[] {
  return Object.keys(colorPresets);
}

// Get preset display names
export function getPresetDisplayName(presetName: string): string {
  return presetName.charAt(0).toUpperCase() + presetName.slice(1);
}

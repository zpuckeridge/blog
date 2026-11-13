import { isoDateInBrisbane } from "@/lib/format-in-brisbane";

export const RHYTHMS_KV_KEY = "rhythms:v1";
export const RHYTHMS_RETENTION_DAYS = 400;
export const MAX_SNACKS = 6;
const MAX_IDEMPOTENCY_KEYS = 24;
const MAX_SLEEP_MS = 16 * 60 * 60 * 1000;
const FUTURE_SKEW_MS = 5 * 60 * 1000;
const DAY_MS = 24 * 60 * 60 * 1000;

const STEPS_MAX = 200_000;
const WORKOUT_MINUTES_MAX = 24 * 60;
const WATER_ML_MAX = 20_000;
const COFFEES_MAX = 30;
const ADD_WATER_MAX = 2000;
const ADD_COFFEES_MAX = 10;
const READ_MINUTES_MAX = 24 * 60;
const WEIGHT_MIN_KG = 30;
const WEIGHT_MAX_KG = 250;
const SUPPLEMENT_MAX = 8;
const SUPPLEMENT_NAME = /^[\p{L}\p{N}][\p{L}\p{N} .'+-]{0,39}$/u;

const ISO_DATE = /^(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})$/u;
const INTEGER_TEXT = /^-?\d+$/u;
const WEIGHT_TEXT = /^-?\d+(?:\.\d+)?$/u;
const ZONED_TIMESTAMP = /(?:Z|[+-]\d{2}:\d{2})$/u;
const IDEMPOTENCY_KEY = /^[A-Za-z0-9._:-]{8,80}$/u;

export type MealQuality = "healthy" | "unhealthy";
export type MealSlot = "breakfast" | "dinner" | "lunch" | "snack";
type NamedMealSlot = "breakfast" | "dinner" | "lunch";

export interface RhythmMeals {
  breakfast?: MealQuality;
  dinner?: MealQuality;
  lunch?: MealQuality;
  snacks: MealQuality[];
}

export interface RhythmDay {
  alcohol?: boolean;
  bedAt?: string;
  coffees?: number;
  hungOutInPerson?: boolean;
  hungOutOnline?: boolean;
  idempotencyKeys: string[];
  meals: RhythmMeals;
  /** 1 is low, 5 is high. */
  mood?: number;
  readMinutes?: number;
  /** Whether you smoked that day. */
  smoked?: boolean;
  steps?: number;
  /** Names taken that day. An empty list means you took none. */
  supplements?: string[];
  wokeAt?: string;
  waterMl?: number;
  /** Kilograms, to one decimal place. */
  weightKg?: number;
  workoutMinutes?: number;
}

export interface RhythmStore {
  days: Record<string, RhythmDay>;
  version: 1;
}

export interface RhythmApplySuccess {
  dates: string[];
  ok: true;
  replayed: boolean;
  store: RhythmStore;
}

export interface RhythmApplyFailure {
  error: string;
  ok: false;
}

export type RhythmApplyResult = RhythmApplyFailure | RhythmApplySuccess;

interface MealReplacement {
  breakfast?: MealQuality | null;
  dinner?: MealQuality | null;
  lunch?: MealQuality | null;
  snacks?: MealQuality[];
}

interface RhythmCommand {
  addCoffees?: number;
  addWaterMl?: number;
  alcohol?: boolean | null;
  bedAt?: string | null;
  coffees?: number | null;
  date: string;
  hungOutInPerson?: boolean | null;
  hungOutOnline?: boolean | null;
  idempotencyKey?: string;
  meal?: { quality: MealQuality; slot: MealSlot };
  meals?: MealReplacement;
  mood?: number | null;
  readMinutes?: number | null;
  smoked?: boolean | null;
  steps?: number | null;
  supplement?: string;
  supplements?: string[] | null;
  wokeAt?: string | null;
  waterMl?: number | null;
  weightKg?: number | null;
  workoutMinutes?: number | null;
}

const emptyMeals = (): RhythmMeals => ({ snacks: [] });

const emptyDay = (): RhythmDay => ({
  idempotencyKeys: [],
  meals: emptyMeals(),
});

export const emptyRhythmStore = (): RhythmStore => ({
  days: {},
  version: 1,
});

export const addBrisbaneDays = (isoDate: string, days: number): string => {
  const noon = Date.parse(`${isoDate}T12:00:00+10:00`);
  return isoDateInBrisbane(noon + days * DAY_MS);
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const isIsoDate = (value: string): boolean => {
  const match = ISO_DATE.exec(value);
  const year = Number(match?.groups?.year);
  const month = Number(match?.groups?.month);
  const day = Number(match?.groups?.day);
  if (
    !Number.isInteger(year) ||
    !Number.isInteger(month) ||
    !Number.isInteger(day)
  ) {
    return false;
  }

  const parsed = new Date(Date.UTC(year, month - 1, day));
  return (
    parsed.getUTCFullYear() === year &&
    parsed.getUTCMonth() === month - 1 &&
    parsed.getUTCDate() === day
  );
};

const asInteger = (value: unknown): number | null => {
  if (typeof value === "number" && Number.isInteger(value)) {
    return value;
  }

  if (typeof value === "string" && INTEGER_TEXT.test(value.trim())) {
    return Number(value.trim());
  }

  return null;
};

const integerInRange = (
  value: unknown,
  min: number,
  max: number
): number | null => {
  const integer = asInteger(value);
  if (integer === null || integer < min || integer > max) {
    return null;
  }

  return integer;
};

const isQuality = (value: unknown): value is MealQuality =>
  value === "healthy" || value === "unhealthy";

const isMealSlot = (value: unknown): value is MealSlot =>
  value === "breakfast" ||
  value === "lunch" ||
  value === "dinner" ||
  value === "snack";

const isNamedSlot = (value: MealSlot): value is NamedMealSlot =>
  value === "breakfast" || value === "lunch" || value === "dinner";

const readOptionalInteger = (
  record: Record<string, unknown>,
  key: string,
  min: number,
  max: number,
  label: string
): { error: string } | { set: false } | { set: true; value: number | null } => {
  if (!Object.hasOwn(record, key)) {
    return { set: false };
  }

  const raw = record[key];
  if (raw === null) {
    return { set: true, value: null };
  }

  const value = integerInRange(raw, min, max);
  if (value === null) {
    return { error: `Invalid ${label}` };
  }

  return { set: true, value };
};

const readTimestamp = (
  value: unknown,
  nowMs: number,
  label: string
): { error: string } | { value: string | null } => {
  if (value === null) {
    return { value: null };
  }

  if (typeof value !== "string" || !ZONED_TIMESTAMP.test(value.trim())) {
    return { error: `Invalid ${label}` };
  }

  const ms = Date.parse(value.trim());
  if (!Number.isFinite(ms)) {
    return { error: `Invalid ${label}` };
  }

  if (ms > nowMs + FUTURE_SKEW_MS) {
    return { error: `${label} is in the future` };
  }

  return { value: new Date(ms).toISOString() };
};

const readMealReplacement = (
  value: unknown
): { error: string } | { meals: MealReplacement } => {
  if (!isRecord(value)) {
    return { error: "Invalid meals" };
  }

  const meals: MealReplacement = {};
  for (const slot of ["breakfast", "lunch", "dinner"] as const) {
    if (!Object.hasOwn(value, slot)) {
      continue;
    }

    const raw = value[slot];
    if (raw === null) {
      meals[slot] = null;
      continue;
    }

    if (!isQuality(raw)) {
      return { error: "Invalid meals" };
    }

    meals[slot] = raw;
  }

  if (Object.hasOwn(value, "snacks")) {
    if (!Array.isArray(value.snacks)) {
      return { error: "Invalid meals" };
    }

    if (value.snacks.length > MAX_SNACKS) {
      return { error: "Too many snacks" };
    }

    const snacks: MealQuality[] = [];
    for (const snack of value.snacks) {
      if (!isQuality(snack)) {
        return { error: "Invalid meals" };
      }
      snacks.push(snack);
    }
    meals.snacks = snacks;
  }

  return { meals };
};

const assignInteger = (
  command: RhythmCommand,
  key: "coffees" | "steps" | "waterMl" | "workoutMinutes",
  reading:
    | { error: string }
    | { set: false }
    | { set: true; value: number | null }
): { error: string } | undefined => {
  if ("error" in reading) {
    return reading;
  }

  if (reading.set) {
    command[key] = reading.value;
  }

  return undefined;
};

const parseTotals = (
  body: Record<string, unknown>,
  command: RhythmCommand
): { error: string } | undefined =>
  assignInteger(
    command,
    "steps",
    readOptionalInteger(body, "steps", 0, STEPS_MAX, "steps")
  ) ??
  assignInteger(
    command,
    "workoutMinutes",
    readOptionalInteger(
      body,
      "workoutMinutes",
      0,
      WORKOUT_MINUTES_MAX,
      "workout minutes"
    )
  ) ??
  assignInteger(
    command,
    "waterMl",
    readOptionalInteger(body, "waterMl", 0, WATER_ML_MAX, "water")
  ) ??
  assignInteger(
    command,
    "coffees",
    readOptionalInteger(body, "coffees", 0, COFFEES_MAX, "coffees")
  );

const parseAdditions = (
  body: Record<string, unknown>,
  command: RhythmCommand
): { error: string } | undefined => {
  if (!Object.hasOwn(body, "add")) {
    return undefined;
  }

  if (!isRecord(body.add)) {
    return { error: "Invalid add" };
  }

  if (Object.hasOwn(body.add, "waterMl")) {
    if (command.waterMl !== undefined) {
      return { error: "Send waterMl or add.waterMl, not both" };
    }
    const added = integerInRange(body.add.waterMl, 1, ADD_WATER_MAX);
    if (added === null) {
      return { error: "Invalid water" };
    }
    command.addWaterMl = added;
  }

  if (Object.hasOwn(body.add, "coffees")) {
    if (command.coffees !== undefined) {
      return { error: "Send coffees or add.coffees, not both" };
    }
    const added = integerInRange(body.add.coffees, 1, ADD_COFFEES_MAX);
    if (added === null) {
      return { error: "Invalid coffees" };
    }
    command.addCoffees = added;
  }

  return undefined;
};

const parseSleepTimes = (
  body: Record<string, unknown>,
  command: RhythmCommand,
  nowMs: number
): { error: string } | undefined => {
  if (Object.hasOwn(body, "bedAt")) {
    const bed = readTimestamp(body.bedAt, nowMs, "Bed time");
    if ("error" in bed) {
      return bed;
    }
    command.bedAt = bed.value;
  }

  if (Object.hasOwn(body, "wokeAt")) {
    const woke = readTimestamp(body.wokeAt, nowMs, "Wake time");
    if ("error" in woke) {
      return woke;
    }
    command.wokeAt = woke.value;
  }

  if (
    typeof command.bedAt === "string" &&
    typeof command.wokeAt === "string" &&
    !sleepWindowOk(command.bedAt, command.wokeAt)
  ) {
    return { error: sleepWindowError(command.bedAt, command.wokeAt) };
  }

  return undefined;
};

const parseMealInput = (
  body: Record<string, unknown>,
  command: RhythmCommand
): { error: string } | undefined => {
  if (Object.hasOwn(body, "meal") && Object.hasOwn(body, "meals")) {
    return { error: "Send meal or meals, not both" };
  }

  if (Object.hasOwn(body, "meal")) {
    if (
      !isRecord(body.meal) ||
      !isMealSlot(body.meal.slot) ||
      !isQuality(body.meal.quality)
    ) {
      return { error: "Invalid meal" };
    }
    command.meal = { quality: body.meal.quality, slot: body.meal.slot };
  }

  if (Object.hasOwn(body, "meals")) {
    const meals = readMealReplacement(body.meals);
    if ("error" in meals) {
      return meals;
    }
    command.meals = meals.meals;
  }

  return undefined;
};

const readWeightKg = (value: unknown): number | null => {
  let numeric: number | null = null;
  if (typeof value === "number" && Number.isFinite(value)) {
    numeric = value;
  } else if (typeof value === "string" && WEIGHT_TEXT.test(value.trim())) {
    numeric = Number(value.trim());
  }

  if (numeric === null) {
    return null;
  }

  const rounded = Math.round(numeric * 10) / 10;
  if (rounded < WEIGHT_MIN_KG || rounded > WEIGHT_MAX_KG) {
    return null;
  }

  return rounded;
};

const readFlag = (
  record: Record<string, unknown>,
  key: string,
  label: string
):
  | { error: string }
  | { set: false }
  | { set: true; value: boolean | null } => {
  if (!Object.hasOwn(record, key)) {
    return { set: false };
  }

  const raw = record[key];
  if (raw === null) {
    return { set: true, value: null };
  }
  if (typeof raw === "boolean") {
    return { set: true, value: raw };
  }

  return { error: `Invalid ${label}` };
};

const assignFlag = (
  command: RhythmCommand,
  key: "alcohol" | "hungOutInPerson" | "hungOutOnline" | "smoked",
  reading:
    | { error: string }
    | { set: false }
    | { set: true; value: boolean | null }
): { error: string } | undefined => {
  if ("error" in reading) {
    return reading;
  }
  if (reading.set) {
    command[key] = reading.value;
  }
  return undefined;
};

const parseNotes = (
  body: Record<string, unknown>,
  command: RhythmCommand
): { error: string } | undefined => {
  const mood = readOptionalInteger(body, "mood", 1, 5, "mood");
  if ("error" in mood) {
    return mood;
  }
  if (mood.set) {
    command.mood = mood.value;
  }

  if (Object.hasOwn(body, "weightKg")) {
    if (body.weightKg === null) {
      command.weightKg = null;
    } else {
      const weight = readWeightKg(body.weightKg);
      if (weight === null) {
        return { error: "Invalid weight" };
      }
      command.weightKg = weight;
    }
  }

  const reading = readOptionalInteger(
    body,
    "readMinutes",
    0,
    READ_MINUTES_MAX,
    "reading time"
  );
  if ("error" in reading) {
    return reading;
  }
  if (reading.set) {
    command.readMinutes = reading.value;
  }

  return (
    assignFlag(command, "alcohol", readFlag(body, "alcohol", "alcohol")) ??
    assignFlag(command, "smoked", readFlag(body, "smoked", "smoking")) ??
    assignFlag(
      command,
      "hungOutInPerson",
      readFlag(body, "hungOutInPerson", "in-person socialising")
    ) ??
    assignFlag(
      command,
      "hungOutOnline",
      readFlag(body, "hungOutOnline", "online socialising")
    )
  );
};

const normalizeSupplement = (value: unknown): string | null => {
  if (typeof value !== "string") {
    return null;
  }

  const name = value.trim().replaceAll(/\s+/gu, " ");
  if (!SUPPLEMENT_NAME.test(name)) {
    return null;
  }

  return name;
};

const readSupplementList = (
  value: unknown
): { error: string } | { names: string[] } => {
  if (!Array.isArray(value)) {
    return { error: "Invalid supplements" };
  }
  if (value.length > SUPPLEMENT_MAX) {
    return { error: "Too many supplements" };
  }

  const names: string[] = [];
  for (const item of value) {
    const name = normalizeSupplement(item);
    if (!name) {
      return { error: "Invalid supplement" };
    }
    const already = names.some(
      (existing) => existing.toLowerCase() === name.toLowerCase()
    );
    if (!already) {
      names.push(name);
    }
  }

  return { names };
};

const parseSupplements = (
  body: Record<string, unknown>,
  command: RhythmCommand
): { error: string } | undefined => {
  if (Object.hasOwn(body, "supplement") && Object.hasOwn(body, "supplements")) {
    return { error: "Send supplement or supplements, not both" };
  }

  if (Object.hasOwn(body, "supplements")) {
    if (body.supplements === null) {
      command.supplements = null;
    } else {
      const list = readSupplementList(body.supplements);
      if ("error" in list) {
        return list;
      }
      command.supplements = list.names;
    }
  }

  if (Object.hasOwn(body, "supplement")) {
    const name = normalizeSupplement(body.supplement);
    if (!name) {
      return { error: "Invalid supplement" };
    }
    command.supplement = name;
  }

  return undefined;
};

const parseIdempotency = (
  body: Record<string, unknown>,
  command: RhythmCommand,
  headerKey: string | null
): { error: string } | undefined => {
  const rawKey =
    headerKey ??
    (typeof body.idempotencyKey === "string" ? body.idempotencyKey : null);
  if (rawKey === null) {
    return undefined;
  }

  const key = rawKey.trim();
  if (!IDEMPOTENCY_KEY.test(key)) {
    return { error: "Invalid idempotency key" };
  }

  command.idempotencyKey = key;
  return undefined;
};
const dateError = (isoDate: string, todayIso: string): string | null => {
  if (!isIsoDate(isoDate)) {
    return "Invalid date";
  }

  if (isoDate > todayIso) {
    return "Date is in the future";
  }

  const cutoff = addBrisbaneDays(todayIso, -RHYTHMS_RETENTION_DAYS);
  if (isoDate < cutoff) {
    return "Date is outside the stored range";
  }

  return null;
};

const parseCommand = (
  body: unknown,
  nowMs: number,
  headerKey: string | null
): { command: RhythmCommand } | { error: string } => {
  if (!isRecord(body)) {
    return { error: "Invalid rhythms payload" };
  }

  const date = typeof body.date === "string" ? body.date.trim() : "";
  if (!date) {
    return { error: "Missing date" };
  }

  const invalidDate = dateError(date, isoDateInBrisbane(nowMs));
  if (invalidDate) {
    return { error: invalidDate };
  }

  const command: RhythmCommand = { date };
  const invalid =
    parseTotals(body, command) ??
    parseAdditions(body, command) ??
    parseSleepTimes(body, command, nowMs) ??
    parseMealInput(body, command) ??
    parseNotes(body, command) ??
    parseSupplements(body, command) ??
    parseIdempotency(body, command, headerKey);

  if (invalid) {
    return invalid;
  }

  return { command };
};

const sleepWindowOk = (bedAt: string, wokeAt: string): boolean => {
  const bed = Date.parse(bedAt);
  const woke = Date.parse(wokeAt);
  return woke > bed && woke - bed <= MAX_SLEEP_MS;
};

const sleepWindowError = (bedAt: string, wokeAt: string): string => {
  const bed = Date.parse(bedAt);
  const woke = Date.parse(wokeAt);
  if (woke <= bed) {
    return "Wake time is before bed time";
  }

  return "Time in bed is longer than 16 hours";
};

const setNamedMeal = (
  meals: RhythmMeals,
  slot: NamedMealSlot,
  quality: MealQuality | null
): RhythmMeals => {
  const next: RhythmMeals = { ...meals, snacks: [...meals.snacks] };
  if (slot === "breakfast") {
    if (quality === null) {
      delete next.breakfast;
    } else {
      next.breakfast = quality;
    }
  } else if (slot === "lunch") {
    if (quality === null) {
      delete next.lunch;
    } else {
      next.lunch = quality;
    }
  } else if (quality === null) {
    delete next.dinner;
  } else {
    next.dinner = quality;
  }

  return next;
};

const applyMeals = (
  day: RhythmDay,
  command: RhythmCommand
): { error: string } | { meals: RhythmMeals } => {
  let meals: RhythmMeals = {
    ...day.meals,
    snacks: [...day.meals.snacks],
  };

  if (command.meals?.snacks) {
    meals = { ...meals, snacks: [...command.meals.snacks] };
  }

  for (const slot of ["breakfast", "lunch", "dinner"] as const) {
    const quality = command.meals?.[slot];
    if (quality !== undefined) {
      meals = setNamedMeal(meals, slot, quality);
    }
  }

  if (!command.meal) {
    return { meals };
  }

  if (isNamedSlot(command.meal.slot)) {
    return {
      meals: setNamedMeal(meals, command.meal.slot, command.meal.quality),
    };
  }

  if (meals.snacks.length >= MAX_SNACKS) {
    return { error: "Too many snacks" };
  }

  return {
    meals: { ...meals, snacks: [...meals.snacks, command.meal.quality] },
  };
};

const applyNumber = (
  day: RhythmDay,
  key: "coffees" | "steps" | "waterMl" | "workoutMinutes",
  value: number | null | undefined
): void => {
  if (value === undefined) {
    return;
  }

  const next = value === null ? undefined : value;
  if (key === "steps") {
    day.steps = next;
  } else if (key === "workoutMinutes") {
    day.workoutMinutes = next;
  } else if (key === "waterMl") {
    day.waterMl = next;
  } else {
    day.coffees = next;
  }
};

const applySleepFields = (
  day: RhythmDay,
  bedAt: string | null | undefined,
  wokeAt: string | null | undefined
): void => {
  if (bedAt === null) {
    delete day.bedAt;
  } else if (typeof bedAt === "string") {
    day.bedAt = bedAt;
  }

  if (wokeAt === null) {
    delete day.wokeAt;
  } else if (typeof wokeAt === "string") {
    day.wokeAt = wokeAt;
  }
};

const pairError = (day: RhythmDay | undefined): string | null => {
  if (!day?.bedAt || !day.wokeAt) {
    return null;
  }

  if (sleepWindowOk(day.bedAt, day.wokeAt)) {
    return null;
  }

  return sleepWindowError(day.bedAt, day.wokeAt);
};

const pruneRhythmDays = (store: RhythmStore, todayIso: string): void => {
  const cutoff = addBrisbaneDays(todayIso, -RHYTHMS_RETENTION_DAYS);
  const nextDays: Record<string, RhythmDay> = {};
  for (const [isoDate, day] of Object.entries(store.days)) {
    if (isoDate >= cutoff) {
      nextDays[isoDate] = day;
    }
  }
  store.days = nextDays;
};

const sanitizeQuality = (value: unknown): MealQuality | undefined =>
  isQuality(value) ? value : undefined;

const sanitizeJournal = (
  day: RhythmDay,
  value: Record<string, unknown>
): void => {
  const mood = integerInRange(value.mood, 1, 5);
  const readMinutes = integerInRange(value.readMinutes, 0, READ_MINUTES_MAX);
  const weightKg = readWeightKg(value.weightKg);
  if (mood !== null) {
    day.mood = mood;
  }
  if (readMinutes !== null) {
    day.readMinutes = readMinutes;
  }
  if (weightKg !== null) {
    day.weightKg = weightKg;
  }
  if (typeof value.alcohol === "boolean") {
    day.alcohol = value.alcohol;
  }
  if (typeof value.smoked === "boolean") {
    day.smoked = value.smoked;
  }
  if (typeof value.hungOutInPerson === "boolean") {
    day.hungOutInPerson = value.hungOutInPerson;
  }
  if (typeof value.hungOutOnline === "boolean") {
    day.hungOutOnline = value.hungOutOnline;
  }
  const supplements = readSupplementList(value.supplements);
  if (!("error" in supplements)) {
    day.supplements = supplements.names;
  }
};

const sanitizeDay = (value: unknown): RhythmDay | null => {
  if (!isRecord(value)) {
    return null;
  }

  const day = emptyDay();
  const steps = integerInRange(value.steps, 0, STEPS_MAX);
  const workout = integerInRange(value.workoutMinutes, 0, WORKOUT_MINUTES_MAX);
  const water = integerInRange(value.waterMl, 0, WATER_ML_MAX);
  const coffees = integerInRange(value.coffees, 0, COFFEES_MAX);
  if (steps !== null) {
    day.steps = steps;
  }
  if (workout !== null) {
    day.workoutMinutes = workout;
  }
  if (water !== null) {
    day.waterMl = water;
  }
  if (coffees !== null) {
    day.coffees = coffees;
  }
  sanitizeJournal(day, value);

  if (
    typeof value.bedAt === "string" &&
    Number.isFinite(Date.parse(value.bedAt))
  ) {
    day.bedAt = new Date(value.bedAt).toISOString();
  }
  if (
    typeof value.wokeAt === "string" &&
    Number.isFinite(Date.parse(value.wokeAt))
  ) {
    day.wokeAt = new Date(value.wokeAt).toISOString();
  }

  if (isRecord(value.meals)) {
    day.meals.breakfast = sanitizeQuality(value.meals.breakfast);
    day.meals.lunch = sanitizeQuality(value.meals.lunch);
    day.meals.dinner = sanitizeQuality(value.meals.dinner);
    if (Array.isArray(value.meals.snacks)) {
      for (const snack of value.meals.snacks) {
        if (isQuality(snack) && day.meals.snacks.length < MAX_SNACKS) {
          day.meals.snacks.push(snack);
        }
      }
    }
  }

  if (Array.isArray(value.idempotencyKeys)) {
    for (const key of value.idempotencyKeys) {
      if (typeof key === "string" && IDEMPOTENCY_KEY.test(key)) {
        day.idempotencyKeys.push(key);
      }
    }
    day.idempotencyKeys = day.idempotencyKeys.slice(-MAX_IDEMPOTENCY_KEYS);
  }

  return day;
};

export const readRhythmStore = (raw: string | null): RhythmStore => {
  if (!raw) {
    return emptyRhythmStore();
  }

  try {
    const parsed: unknown = JSON.parse(raw);
    if (!isRecord(parsed) || parsed.version !== 1 || !isRecord(parsed.days)) {
      return emptyRhythmStore();
    }

    const store = emptyRhythmStore();
    for (const [isoDate, day] of Object.entries(parsed.days)) {
      if (!isIsoDate(isoDate)) {
        continue;
      }
      const sanitized = sanitizeDay(day);
      if (sanitized) {
        store.days[isoDate] = sanitized;
      }
    }
    return store;
  } catch {
    return emptyRhythmStore();
  }
};

const ensureDay = (store: RhythmStore, isoDate: string): RhythmDay => {
  const existing = store.days[isoDate] ?? emptyDay();
  store.days[isoDate] = existing;
  return existing;
};

const supplementNamesMatch = (left: string, right: string): boolean =>
  left.toLowerCase() === right.toLowerCase();

const applySupplements = (
  day: RhythmDay,
  command: RhythmCommand
): { error: string } | undefined => {
  if (command.supplements !== undefined) {
    day.supplements =
      command.supplements === null ? undefined : [...command.supplements];
  }

  if (!command.supplement) {
    return undefined;
  }

  const names = [...(day.supplements ?? [])];
  const already = names.some((name) =>
    supplementNamesMatch(name, command.supplement ?? "")
  );
  if (already) {
    return undefined;
  }
  if (names.length >= SUPPLEMENT_MAX) {
    return { error: "Too many supplements" };
  }

  names.push(command.supplement);
  day.supplements = names;
  return undefined;
};

const applyJournal = (day: RhythmDay, command: RhythmCommand): void => {
  if (command.mood !== undefined) {
    day.mood = command.mood === null ? undefined : command.mood;
  }
  if (command.readMinutes !== undefined) {
    day.readMinutes =
      command.readMinutes === null ? undefined : command.readMinutes;
  }
  if (command.weightKg !== undefined) {
    day.weightKg = command.weightKg === null ? undefined : command.weightKg;
  }
  if (command.alcohol !== undefined) {
    day.alcohol = command.alcohol === null ? undefined : command.alcohol;
  }
  if (command.smoked !== undefined) {
    day.smoked = command.smoked === null ? undefined : command.smoked;
  }
  if (command.hungOutInPerson !== undefined) {
    day.hungOutInPerson =
      command.hungOutInPerson === null ? undefined : command.hungOutInPerson;
  }
  if (command.hungOutOnline !== undefined) {
    day.hungOutOnline =
      command.hungOutOnline === null ? undefined : command.hungOutOnline;
  }
};

const applyIncrements = (
  day: RhythmDay,
  command: RhythmCommand
): { error: string } | undefined => {
  if (command.addWaterMl !== undefined) {
    const water = bump(day.waterMl, command.addWaterMl, WATER_ML_MAX);
    if ("error" in water) {
      return water;
    }
    day.waterMl = water.value;
  }

  if (command.addCoffees !== undefined) {
    const coffees = bump(day.coffees, command.addCoffees, COFFEES_MAX);
    if ("error" in coffees) {
      return coffees;
    }
    day.coffees = coffees.value;
  }

  return undefined;
};

const bump = (
  current: number | undefined,
  added: number,
  max: number
): { error: string } | { value: number } => {
  const next = (current ?? 0) + added;
  if (next > max) {
    return { error: "Total is outside the stored range" };
  }

  return { value: next };
};

export const applyRhythmWrite = (
  store: RhythmStore,
  body: unknown,
  nowMs: number,
  headerKey: string | null = null
): RhythmApplyResult => {
  const parsed = parseCommand(body, nowMs, headerKey);
  if ("error" in parsed) {
    return { error: parsed.error, ok: false };
  }

  const { command } = parsed;
  const existingKeys = store.days[command.date]?.idempotencyKeys ?? [];
  if (command.idempotencyKey && existingKeys.includes(command.idempotencyKey)) {
    return { dates: [command.date], ok: true, replayed: true, store };
  }

  const bothSleepTimes =
    typeof command.bedAt === "string" && typeof command.wokeAt === "string";
  const sleepDate = bothSleepTimes
    ? isoDateInBrisbane(Date.parse(command.wokeAt as string))
    : command.date;
  const sleepDateProblem = dateError(sleepDate, isoDateInBrisbane(nowMs));
  if (sleepDateProblem) {
    return { error: sleepDateProblem, ok: false };
  }

  const next: RhythmStore = structuredClone(store);
  const day = ensureDay(next, command.date);
  applyNumber(day, "steps", command.steps);
  applyNumber(day, "workoutMinutes", command.workoutMinutes);
  applyNumber(day, "waterMl", command.waterMl);
  applyNumber(day, "coffees", command.coffees);
  applyJournal(day, command);
  const supplements = applySupplements(day, command);
  if (supplements) {
    return { error: supplements.error, ok: false };
  }
  const increments = applyIncrements(day, command);
  if (increments) {
    return { error: increments.error, ok: false };
  }

  const meals = applyMeals(day, command);
  if ("error" in meals) {
    return { error: meals.error, ok: false };
  }
  day.meals = meals.meals;

  const sleepDay = ensureDay(next, sleepDate);
  if (bothSleepTimes) {
    applySleepFields(sleepDay, command.bedAt, command.wokeAt);
  } else {
    applySleepFields(day, command.bedAt, command.wokeAt);
  }

  const invalidPair = pairError(day) ?? pairError(sleepDay);
  if (invalidPair) {
    return { error: invalidPair, ok: false };
  }

  if (command.idempotencyKey) {
    day.idempotencyKeys = [
      ...day.idempotencyKeys,
      command.idempotencyKey,
    ].slice(-MAX_IDEMPOTENCY_KEYS);
  }

  pruneRhythmDays(next, isoDateInBrisbane(nowMs));

  const dates =
    sleepDate === command.date ? [command.date] : [command.date, sleepDate];
  return { dates, ok: true, replayed: false, store: next };
};

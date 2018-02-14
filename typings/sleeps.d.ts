
export interface Deep {
  count: number;
  minutes: number;
  thirtyDayAvgMinutes: number;
}

export interface Light {
  count: number;
  minutes: number;
  thirtyDayAvgMinutes: number;
}

export interface Rem {
  count: number;
  minutes: number;
  thirtyDayAvgMinutes: number;
}

export interface Wake {
  count: number;
  minutes: number;
  thirtyDayAvgMinutes: number;
}

export interface Asleep {
  count: number;
  minutes: number;
}

export interface Awake {
  count: number;
  minutes: number;
}

export interface Restless {
  count: number;
  minutes: number;
}

export interface LevelsSummary {
  deep: Deep;
  light: Light;
  rem: Rem;
  wake: Wake;
  asleep: Asleep;
  awake: Awake;
  restless: Restless;
}

export interface Datum {
  datetime: Date;
  level: string;
  seconds: number;
  dateTime?: Date;
}

export interface ShortData {
  datetime: Date;
  level: string;
  seconds: number;
}

export interface Levels {
  summary: LevelsSummary;
  data: Datum[];
  shortData: ShortData[];
}

export interface Sleep {
  dateOfSleep: string;
  duration: number;
  efficiency: number;
  isMainSleep: boolean;
  levels: Levels;
  logId: string;
  minutesAfterWakeup: number;
  minutesAsleep: number;
  minutesAwake: number;
  minutesToFallAsleep: number;
  startTime: Date;
  timeInBed: number;
  type: string;
}

export interface SleepsSummary {
  totalMinutesAsleep: number;
  totalSleepRecords: number;
  totalTimeInBed: number;
}

export interface SleepLogs {
  sleep: Sleep[];
  summary: SleepsSummary;
}




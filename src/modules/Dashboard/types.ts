export interface IMainInfo {
  average_student_mark: number;
  courses_count: number;
  managers_count: number;
  teachers_count: number;
  mentors_count: number;
  students_count: number;
  new_students_count: number;
  groups_count: number;
  popular_courses: IPopularCourse[];
  students_academic_performance: 0;
}

interface IPopularCourse {
  course_title: string;
  students_count: number;
  percentage: number;
}

export interface ChargingStationStats {
  lawyer: number,
  boss: number,
  verifier: number,
  gpsEngineer: number,
  creditManager: number,
  clientInformation: number,
}

export interface ICard {
  icon: string;
  count: string;
  title: string;
  class: string;
}

export type AgeDistribution = {
  under_18: {
    count: number;
    percentage: number;
  };
  "18_35": {
    count: number;
    percentage: number;
  };
  "36_50": {
    count: number;
    percentage: number;
  };
  others: {
    count: number;
    percentage: number;
  };
  "51_60": {
    count: number;
    percentage: number;
  };
  over_60: {
    count: number;
    percentage: number;
  };
};

export type GenderStats = {
  male: {
    count: number;
    percentage: number;
  };
  female: {
    count: number;
    percentage: number;
  };
  others: {
    count: number;
    percentage: number;
  };
};

interface HourlyStatistic {
  hour: number;
  count: number;
}

interface MonthlyStatistic {
  month: number;
  count: number;
}

export interface IResponseUsageStats {
  yearly_statistics: Record<string, number>;
  daily_statistics: Record<string, number>;
}

export interface IAppUsageStats {
  gps: HourlyStatistic[];
  lawyer: HourlyStatistic[];
  verifier: HourlyStatistic[];
}

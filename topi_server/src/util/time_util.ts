import format    from 'date-fns/format';

export interface TimestampRange {
  begin: number;
  end: number;
}

export class TimeUtil {

  public static readonly MS_PER_HOUR = 3600000;
  public static readonly MS_PER_QUARTER_HOUR = 15 * 60 * 1000;

  public static ts_to_date(ts: number | string): Date {
    if(typeof ts === 'number') {
      return new Date(ts);
    } else if(typeof ts === 'string') {
      return new Date(parseInt(ts));
    } else {
      throw new Error('ts_to_date - failed to parse');
    }
  }

  // This will return a TS range (stringofied) corresponding to today in the local timezone
  //
  public static today(): TimestampRange {
    const begin = new Date().setHours(0, 0, 0, 0);
    const end = new Date().setHours(23, 59, 59, 999);
    return { begin, end };
  }

  public static day_of_week(d: Date): string {
    return TimeUtil.DOW[d.getDay()];
  }
  public static day_of_month(d: Date): string {
    return '' + d.getDate();
  }

  public static month(d: Date): string {
    return TimeUtil.MONTHS[d.getMonth()];
  }

  public static year(d: Date): string {
    return '' + d.getFullYear();
  }

  public static format(d: Date, format_string: string): string {
    return format(d, format_string);
  }

  public static date_to_ts(month: number, day: number, year: number) {
    return new Date(year, month, day).getTime();
  }

  public static parse_calendar_range(
    start_month: number,
    start_year: number,
    end_month: number,
    end_year: number,
  ): TimestampRange {
    const begin = new Date(start_year, start_month, 1).getTime();
    const end = new Date(end_year, end_month + 1, 0).getTime();
    return { begin, end };
  }

  private static DOW = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  private static MONTHS = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

}

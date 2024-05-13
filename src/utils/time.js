import {DateTime} from 'luxon';

export function todayTime() {
    return DateTime.now()
}

export function lastWeekTime() {
    return todayTime().minus({day: 7});
}

export function fromJSDateToISODate(time) {
    return DateTime.fromJSDate(time).toISODate()
}
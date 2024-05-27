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

function getDateTimeFromISO(time) {
    return DateTime.fromISO(time)
}

export function getUnixInteger(time) {
    return getDateTimeFromISO(time).toUnixInteger()
}

export function getYearMonth(time) {
    return getDateTimeFromISO(time).toFormat("yyyy-MM")
}
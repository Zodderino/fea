import {DateTime} from 'luxon';

export function todayDate() {
    return DateTime.now()
}

export function yesterdayTime() {
    return todayDate().minus({day: 1});
}
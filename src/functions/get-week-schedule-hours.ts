import { ScheduleValidator } from "../database/validators/schedule.validator";

export function getWeekScheduleHours(schedules: ScheduleValidator[]) {
    const currentDate = new Date();
    const weekDay = currentDate.getDay();

    // início da semana 
    const startWeekDay = new Date(currentDate);
    startWeekDay.setDate(currentDate.getDate() - weekDay);

    //fim da semana
    const finalWeekDay = new Date(currentDate);
    finalWeekDay.setDate(currentDate.getDate() + (6 - weekDay));

    const hours = schedules.filter(el =>
        new Date(el.date) >= startWeekDay && new Date(el.date) <= finalWeekDay
    ).map(el => new Date(el.date).toLocaleTimeString('pt-BR'))

    const hourCount = {};

    for (const item of hours) {
        if (hourCount[item]) {
            hourCount[item]++;
        } else {
            hourCount[item] = 1;
        }
    }

    const sortedArray = (Object.entries(hourCount) as any).sort((a: any, b: any) => a[1] - b[1])
    const reversedArray = sortedArray.reverse()

    return {
        first: { hour: reversedArray[0] == undefined ? '0' : reversedArray[0][0], qtt_schedules: reversedArray[0] == undefined ? 0 : reversedArray[0][1] },
        second: { hour: reversedArray[1] == undefined ? '0' : reversedArray[1][0], qtt_schedules: reversedArray[1] == undefined ? 0 : reversedArray[1][1] },
        third: { hour: reversedArray[2] == undefined ? '0' : reversedArray[2][0], qtt_schedules: reversedArray[2] == undefined ? 0 : reversedArray[2][1] },
        fourth: { hour: reversedArray[3] == undefined ? '0' : reversedArray[3][0], qtt_schedules: reversedArray[3] == undefined ? 0 : reversedArray[3][1] },
        fifth: { hour: reversedArray[4] == undefined ? '0' : reversedArray[4][0], qtt_schedules: reversedArray[4] == undefined ? 0 : reversedArray[4][1] },
    };

    return {
        first: { hour: reversedArray[0][0] ?? '0', qtt_schedules: reversedArray[0][1] ?? 0 },
        second: { hour: reversedArray[1][0] ?? '0', qtt_schedules: reversedArray[1][1] ?? 0 },
        third: { hour: reversedArray[2][0] ?? '0', qtt_schedules: reversedArray[2][1] ?? 0 },
        fourth: { hour: reversedArray[3][0] ?? '0', qtt_schedules: reversedArray[3][1] ?? 0 },
        fifth: { hour: reversedArray[4][0] ?? '0', qtt_schedules: reversedArray[4][1] ?? 0 },
    };
}
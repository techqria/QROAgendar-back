import { ScheduleValidator } from "../database/validators/schedule.validator"

export function getAnnualRevenue(schedules: ScheduleValidator[]) {
    const monthlyRevenue = {
        january: 0,
        february: 0,
        march: 0,
        april: 0,
        may: 0,
        june: 0,
        july: 0,
        august: 0,
        september: 0,
        october: 0,
        november: 0,
        december: 0,
    };

    const currentYear = new Date().getFullYear()

    const monthlyInterval = {
        january: new Date(currentYear, 0, 1),
        february: new Date(currentYear, 1, 1),
        march: new Date(currentYear, 2, 1),
        april: new Date(currentYear, 3, 1),
        may: new Date(currentYear, 4, 1),
        june: new Date(currentYear, 5, 1),
        july: new Date(currentYear, 6, 1),
        august: new Date(currentYear, 7, 1),
        september: new Date(currentYear, 8, 1),
        october: new Date(currentYear, 9, 1),
        november: new Date(currentYear, 10, 1),
        december: new Date(currentYear, 11, 1),
    }

    const annualRevenue = schedules.reduce((acc, curr) => {
        const date = new Date(curr.date)
        //verificar se o agendamento pertence ao ano atual
        if (date.getFullYear() == currentYear) {
            if (date >= monthlyInterval.january && date < monthlyInterval.february) {
                acc.january += curr.payment.price
            } else if (date >= monthlyInterval.february && date < monthlyInterval.march) {
                acc.february += curr.payment.price
            } else if (date >= monthlyInterval.march && date < monthlyInterval.april) {
                acc.march += curr.payment.price
            } else if (date >= monthlyInterval.april && date < monthlyInterval.may) {
                acc.april += curr.payment.price
            } else if (date >= monthlyInterval.may && date < monthlyInterval.june) {
                acc.may += curr.payment.price
            } else if (date >= monthlyInterval.june && date < monthlyInterval.july) {
                acc.june += curr.payment.price
            } else if (date >= monthlyInterval.july && date < monthlyInterval.august) {
                acc.july += curr.payment.price
            } else if (date >= monthlyInterval.august && date < monthlyInterval.september) {
                acc.august += curr.payment.price
            } else if (date >= monthlyInterval.september && date < monthlyInterval.october) {
                acc.september += curr.payment.price
            } else if (date >= monthlyInterval.october && date < monthlyInterval.november) {
                acc.october += curr.payment.price
            } else if (date >= monthlyInterval.november && date < monthlyInterval.december) {
                acc.november += curr.payment.price
            } else acc.december += curr.payment.price

            return acc
        }
        return acc
    }, monthlyRevenue)

    return annualRevenue
}


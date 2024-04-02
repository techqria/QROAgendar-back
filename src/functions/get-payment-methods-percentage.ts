import { paymentMethodEnum } from "../database/dto/payment_method.enum"
import { ScheduleValidator } from "../database/validators/schedule.validator"

export function getPaymentMethodsPercentage(schedules: ScheduleValidator[]) {

    const currentYear = new Date().getFullYear()
    
    const paymentMethodsCount = schedules.reduce((acc, curr) => {
        if(curr.date.getFullYear() == currentYear){

            if (curr.payment.method == paymentMethodEnum.debit) acc.debit++
            else if (curr.payment.method == paymentMethodEnum.credit) acc.credit++
            else if (curr.payment.method == paymentMethodEnum.pix) acc.pix++
            else acc.money++
            
            return acc
        } else return acc

    }, { debit: 0, credit: 0, pix: 0, money: 0 })

    const totalSchedules = schedules.length;

    const paymentMethodsPercentage = {
        debit: Math.round((paymentMethodsCount.debit / totalSchedules) * 100),
        credit: Math.round((paymentMethodsCount.credit / totalSchedules) * 100),
        money: Math.round((paymentMethodsCount.money / totalSchedules) * 100),
        pix: Math.round((paymentMethodsCount.pix / totalSchedules) * 100),
    }

    return paymentMethodsPercentage
}

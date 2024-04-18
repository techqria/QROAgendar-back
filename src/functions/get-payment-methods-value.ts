import { paymentMethodEnum } from "../database/dto/payment_method.enum"
import { ScheduleValidator } from "../database/validators/schedule.validator"

export function getPaymentMethodsValue(schedules: ScheduleValidator[]) {

    const paymentMethodsCount = schedules.reduce((acc, curr) => {
            if (curr.payment.method == paymentMethodEnum.debit) acc.debit += curr.payment.price
            else if (curr.payment.method == paymentMethodEnum.credit) acc.credit += curr.payment.price
            else if (curr.payment.method == paymentMethodEnum.pix) acc.pix += curr.payment.price
            else acc.money += curr.payment.price
            
            return acc
    }, { debit: 0, credit: 0, pix: 0, money: 0 })

    return paymentMethodsCount
}

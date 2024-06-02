import { WhereFilterOp } from "firebase-admin/firestore";
import { KeyEnum } from "./enum";

export interface IWhereParams {
    key: KeyEnum,
    operator: WhereFilterOp,
    value: any
}

export interface ISort { key: any, direction: FirebaseFirestore.OrderByDirection }
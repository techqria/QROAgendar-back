import { CollectionEnum, KeyEnum } from "src/enum";
import firebaseService from "./firebase.service";
import { ISort, IWhereParams } from "src/interface";
import { FieldValue } from "firebase-admin/firestore";
import { AnimalInput } from "src/database/inputs/animal.input";

class FirestoreService {

    constructor(private db: FirebaseFirestore.Firestore) { }

    async getAll(collection: CollectionEnum, whereParams?: IWhereParams): Promise<any> {
        const dbRef = this.db.collection(collection)
        const querySnapshot = whereParams
            ? await dbRef.where(whereParams.key, whereParams.operator, whereParams.value).get()
            : await dbRef.get()

        if (querySnapshot.empty) return [];

        return querySnapshot.docs.map(el => el.data())
    }

    async getById(collection: CollectionEnum, id: string): Promise<any> {
        const dbRef = this.db.collection(collection)

        const doc = await dbRef.doc(id).get()

        //return document saved
        return doc
    }

    async getWhere(collection: CollectionEnum, whereParams: IWhereParams, sort?: ISort): Promise<any> {
        const dbRef = this.db.collection(collection)

        const querySnapshot = sort
            ? await dbRef.where(whereParams.key, whereParams.operator, whereParams.value).orderBy(sort.key, sort.direction).get()
            : await dbRef.where(whereParams.key, whereParams.operator, whereParams.value).get()

        if (querySnapshot.empty) return null;

        return querySnapshot.docs[0].data()
    }

    async deleteById(collection: CollectionEnum, id: string): Promise<any> {
        const dbRef = this.db.collection(collection)

        //save document before removing it
        const doc = await dbRef.doc(id).get()

        //remove document
        await dbRef.doc(id).delete()

        //return document saved
        return doc
    }

    async create(collection: CollectionEnum, data: any): Promise<any> {
        const dbRef = this.db.collection(collection)

        const querySnapshot = await dbRef.add(data)

        return (await querySnapshot.get()).data()
    }

    async getSchedulesByVetIdAndByDateRange(collection: CollectionEnum.schedule, vetId: string, startDate: Date, finalDate: Date): Promise<any> {
        const dbRef = this.db.collection(collection)

        const querySnapshot = await dbRef
            .where('employee_id', '==', vetId)
            .where('date', '>=', startDate)
            .where('date', '<=', finalDate)
            .get()

        if (querySnapshot.empty) return []

        return querySnapshot.docs.map(doc => doc.data());
    }

    async getSchedulesByDateRange(collection: CollectionEnum, startDate: Date, finalDate: Date): Promise<any> {
        const dbRef = this.db.collection(collection);
        const querySnapshot = await dbRef
            .where('date', '>=', startDate.getTime())
            .where('date', '<=', finalDate.getTime())
            .get();

        if (querySnapshot.empty) return [];

        return querySnapshot.docs.map(doc => doc.data());
    }

    async increaseSpecialtyQttEmployees(collection: CollectionEnum, specialty_id: string): Promise<void> {
        const dbRef = this.db.collection(collection).doc(specialty_id);
        await dbRef.update({
            qtt_employees: FieldValue.increment(1)
        });
    }

    async decreaseSpecialtyQttEmployees(collection: CollectionEnum, specialty_id: string): Promise<void> {
        const dbRef = this.db.collection(collection).doc(specialty_id);
        await dbRef.update({
            qtt_employees: FieldValue.increment(-1)
        });
    }

    async findByIdAndUpdate(collection: CollectionEnum, id: string, dataToUpdate: any): Promise<any> {
        const dbRef = this.db.collection(collection).doc(id);

        await dbRef.update(dataToUpdate)

        return (await dbRef.get()).data()
    }

    async createAnimal(collection: CollectionEnum, userId: string, animal: AnimalInput): Promise<any> {
        const dbRef = this.db.collection(collection).doc(userId);
        await dbRef.update({
            animals: FieldValue.arrayUnion(animal)
        });

        return (await dbRef.get()).data()
    }

    async verifyScheduleHour(collection: CollectionEnum, date: Date, employee_id: string, specialty_id: string): Promise<number> {
        const startDate = new Date(date.getTime() - 30 * 60000); // 30 minutes before
        const endDate = new Date(date.getTime() + 30 * 60000); // 30 minutes after

        const dbRef = this.db.collection(collection);
        const querySnapshot = await dbRef
            .where('date', '>=', startDate)
            .where('date', '<=', endDate)
            .where('employee_id', '==', employee_id)
            .where('specialty_id', '==', specialty_id)
            .get();

        return querySnapshot.size;
    }

    async removeAnimalByIndex(collection: CollectionEnum, index: number, userId: string): Promise<any> {
        const userRef = this.db.collection(collection).doc(userId);

        // Unset the animal at the specified index
        const unsetField = `animals.${index}`;

        await userRef.update({
            [unsetField]: FieldValue.delete()
        });

        // Remove elements with value 'null'
        const userSnapshot = await userRef.get();
        if (!userSnapshot.exists) {
            throw new Error('User not found');
        }

        const userData = userSnapshot.data();
        const updatedAnimals = (userData.animals || []).filter((animal: any) => animal !== null);

        await userRef.update({
            animals: updatedAnimals
        });

        return userRef.get().then(doc => doc.data());
    }
}

const firestoreService = new FirestoreService(firebaseService.getFirestoreInstance())
export default firestoreService
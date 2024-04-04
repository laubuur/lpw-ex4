import { IError } from "../models/error";

export abstract class AbstractValidator<T> {
    abstract validateForCreate(data: T): IError[] | Promise<IError[]>
    abstract validateForUpdate(data: T): IError[] | Promise<IError[]>
    abstract validateForDelete(data: T): IError[] | Promise<IError[]>
    abstract validateField(field: string, data: T): IError[] | Promise<IError[]>
}
import { Movie } from "@prisma/client";
import { IError } from "../models/error";
import { AbstractValidator } from "./abstract";

export class MovieValidator implements AbstractValidator<Movie> {
    validateForUpdate(data: Movie) {
        let errors: IError[] = [];
        errors = [...errors, ...this.validateField('title', data)];
        errors = [...errors, ...this.validateField('year', data)];
        errors = [...errors, ...this.validateField('synopsis', data)];
        errors = [...errors, ...this.validateField('director', data)];
        return errors;
    }

    validateForCreate(data: Movie) {
        let errors: IError[] = [];
        errors = [...errors, ...this.validateField('title', data)];
        errors = [...errors, ...this.validateField('year', data)];
        errors = [...errors, ...this.validateField('synopsis', data)];
        errors = [...errors, ...this.validateField('director', data)];
        return errors;
    }

    validateForDelete(data: Movie) {
        return [];
    }

    validateField(field: keyof Movie, data: Movie) {
        switch(field) {
            case 'title': 
                if (!data.title) return [{ field, error: 'Le titre du film doit être inclus' }];
            break;
            case 'year':
                if (!data.year) return [{ field, error: 'L\'année doit être inclue' }];
                else if (data.year < 1895) return [{ field, error: 'L\'année doit être plus grande ou égale à 1985' }];
                else if (data.year > 2100) return [{ field, error: 'L\'année doit être plus petite que 2011 '}];
            break;
            case 'synopsis':
                if (!data.synopsis) return [{ field, error: 'Le synopsis doit être inclus '}];
                else if (data.synopsis.length < 5) return [{ field, error: 'Le synopsis doit être plus grand que 5 caractères '}];
            break;
            case 'director':
                if (!data.director) return [{ field, error: 'Le réalisateur doit être encodé' }];
            break;
        }
        return [];
    }
}
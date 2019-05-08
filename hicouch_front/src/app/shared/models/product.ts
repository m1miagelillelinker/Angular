export interface Product {
    id: number;
    title: string;
    description: string ;
    country: string ;
    director: string ;
    year: string;
    genre?: Tag;
    image: string;
    duration?: string;
    type: string;
}

export interface Tag {
    truc?: string;
}

export interface Movie {
    id: string;
    title: string;
    description: string;
    country: string;
    director: string;
    year: string;
    genre: string;
    image: string;
    duration: string;
    type: 'movie';
}

export interface TvShow {
    id: string;
    title: string;
    description: string;
    country: string;
    director: string;
    year: string;
    genre: string;
    image: string;
    duration: string;
    nbSeasons: number;
}

export interface Book {
    id: string;
    title: string;
    description: string;
    author: string;
    year: string;
    genre: string;
    image: string;
    type: 'book';
}

export interface VideoGame {
    id: string;
    title: string;
    description: string;
    prodCompany: string;
    year: string;
    genre: string;
    image: string;
    collection?: string;
    age: string;
    plateforms: string;
}


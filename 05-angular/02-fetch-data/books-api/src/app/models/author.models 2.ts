export class Author {
  first_name: string;
  last_name: string;
  country_of_origin: string;
  birthday: Date;
  books: [
    {
      title: string;
      publication_year: number;
    }
  ];
}

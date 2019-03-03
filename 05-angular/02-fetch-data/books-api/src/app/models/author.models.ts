export class Author {
  first_name: string;
  last_name: string;
  country_of_origin: string;
  birthday: Date;
  books: [
    {
      title: {
        type: string;
        minlength: [3, 'Must be at least 2 characters'];
        required: [true, 'You must provide a title'];
      };
      publication_year: number;
    }
  ];
}

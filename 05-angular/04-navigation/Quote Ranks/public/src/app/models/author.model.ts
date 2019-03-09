export class Author {
  constructor(
    public id: number,
    public name: string,
    public quotes: [Quotes]
  ) {}
}

export class Quotes {
  constructor(
    public id: number,
    public content: string,
    public votes: number
  ) {}
}

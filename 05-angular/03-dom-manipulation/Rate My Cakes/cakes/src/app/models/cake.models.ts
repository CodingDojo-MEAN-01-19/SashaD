export class Cake {
  constructor(
    public id: number,
    public baker: string,
    public url: string,
    public ratings: [Rating]
  ) {}
}
export class Rating {
  constructor(
    public id: number,
    public stars: number,
    public comment: string
  ) {}
}

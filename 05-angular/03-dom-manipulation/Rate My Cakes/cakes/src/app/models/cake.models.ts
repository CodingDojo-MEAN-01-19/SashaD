export class Cake {
  constructor(
    public id: number,
    public bakerName: string,
    public imageUrl: string,
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

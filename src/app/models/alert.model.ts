
export class Alert {
  constructor(
    public idview: number,
    public cod: string,
    public codgroup: string,
    public label: string,
    public value2: number,
    public value1: number,
    public selected?: boolean,
    public activearea?: boolean,
    public immobileactive?: boolean
  ) {}
}

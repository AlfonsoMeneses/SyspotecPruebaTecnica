export class TicketFiltersDto {
  constructor(
    public userName: string,
    public description: string,
    public isAssigned: boolean | null,
    public number: number,
    public priority: string,
    public status: number,
    public from: Date,
    public to: Date,
    public pageNumber: number,
    public pageSize: number
  ) {}
}

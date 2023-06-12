
export class TicketFiltersDto {
  constructor(
    public userName: string,
    public description: string,
    public isAssigned: number | null,
    public number: number | null,
    public priority: string,
    public status: number,
    public from: string,
    public to: string,
    public pageNumber: number,
    public pageSize: number
  ) {}
}

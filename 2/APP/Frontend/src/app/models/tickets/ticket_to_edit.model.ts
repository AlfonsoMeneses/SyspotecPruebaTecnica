export class TicketToEditDto {
  constructor(
    public descripcion: string,
    public prioridad: string,
    public idUsuario: number
  ) {}
}

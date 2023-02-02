
export interface ControlPermisosDto {
   idUsuario: number;
   servidor: string;
   fechaControl: string;
   horaEntrada: string;
   horaSalida: string;
   tipoLicencia: null | string;
   desde: null | string;
   hasta: null | string;
   totalHoras: null | string;
   justificacion: null | string;
}

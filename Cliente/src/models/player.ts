import * as moment from "moment";

export class Player {
  id: string;
  nombreCompleto: string;
  fechaNacimiento: string;
  edad: string;
  lugarNacimiento: string;
  paisNacimiento: string;
  demarcacion: string;
  foto: string;
  equipo: string;
  constructor({
    id,
    nombreCompleto,
    fechaNacimiento,
    edad,
    lugarNacimiento,
    paisNacimiento,
    demarcacion,
    foto,
    equipo,
  }) {
    this.id = id;
    this.nombreCompleto = nombreCompleto;
    this.fechaNacimiento = fechaNacimiento;
    this.edad = edad;
    this.lugarNacimiento = lugarNacimiento;
    this.paisNacimiento = paisNacimiento;
    this.demarcacion = demarcacion;
    this.foto = foto;
    this.equipo = equipo;
  }
}

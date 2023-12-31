//Contiene todos los campos que se reciben al consumir el servicio; TODOS LOS CAMPOS aunque NO se usen todos, de lo contrario marcará error
export interface Cuentas {
    noControl:                    number;
    Municipio:                    string;
    NoMpio:                       number;
    tipoCuenta:                   string;
    NoCuenta:                     number;
    superficieTerreno:            number;
    valorTerreno:                 number;
    valorTerrenoCalculado:        number;
    superficieConstruccion:       number;
    valorConstruccion:            number;
    valorConstruccionCalculado:   number;
    superficieObra:               number;
    valorObra:                    number;
    valorComplementarioCalculado: number;
    baseGravable:                 number;
    baseGravableCalculada:        number;
    IMPUESTO:                     number;
    impuestoAjustado:             number;
    impuestoCalculado:            number;
    difrencias:                   number;
    porcentaje:                   number;
    motivo:                       string;
}
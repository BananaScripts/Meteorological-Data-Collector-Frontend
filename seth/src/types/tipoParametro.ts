export enum UnidadeMedida {
    Celcius = 'Celcius',
    Kelvin = 'Kelvin',
    Fahrenheit = 'Fahrenheit',
    KmPorHora = 'km/h',
    MetrosPorSegundo = 'm/s',
    KgPorMetroCubico = 'kg/m3',
    GramasPorMetroCubico = 'g/m3',
    Milimetro = 'mm',
    Mililitro = 'ml',
    Lux = 'lux'
}

export type tipoParametro = {
    parametroID: number;
    cod_tipoParametro: number;
    nome: string;
    fator: string;
    offset: string;
    unidadeMedida: UnidadeMedida;
    json: string;
}

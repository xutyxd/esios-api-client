
export interface IPVPCHourNormalized {
    day: string;
    hour: string;
    total: string;
    ccv: string; // Coste comercialización variable
    cof2TD: string; // Coeficiente 
    edsr: string; // Excedente o déficit subastas renovables
    fom: string; // Financiación OM
    fos: string; // Financiación OS
    int: string; // Servicio de interrumpibilidad
    pcap: string; // Pago por capacidad
    pmh: string; // Mercado diario e intradiario
    sah: string; // Servicios de ajuste
    tah: string; // Término de ajuste de mercados a plazo
    teu: string; // Peajes y cargos
}
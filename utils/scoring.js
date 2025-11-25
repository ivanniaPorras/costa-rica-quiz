// esta es la función que calcula el puntaje de acuerdo a la distancia que haya tenido del lugar que corresponde
export function calcularPuntos(distanciaKm) {
  if (distanciaKm <= 5) return 100;
  if (distanciaKm <= 15) return 75;
  if (distanciaKm <= 30) return 50;
  if (distanciaKm <= 50) return 25;
  return 0;
}

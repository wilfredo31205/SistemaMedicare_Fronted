export const calculoPorcierto = (porcentaje) => {
  let increment;

  switch (porcentaje) {
    case 5:
      increment = 0.05;
      break;

    case 10:
      increment = 0.1;
      break;

    case 15:
      increment = 0.15;
      break;

    case 20:
      increment = 0.2;
      break;

    default:
      break;
  }

  return increment;
};

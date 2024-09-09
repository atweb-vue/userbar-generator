export const getCanvas = (width: number, height: number) => {
  const cavnas = document.createElement("canvas");
  cavnas.width = width;
  cavnas.height = height;
  return cavnas;
};

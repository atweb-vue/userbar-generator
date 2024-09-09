import { getCanvas } from "./util/canvas";
import visitorFont from "./assets/visitor1.ttf";
import stripes from "./assets/linePattern.png";
import dots from "./assets/dotPattern.png";

import { invlerp } from "./util/math";

export type backgroundParams = {
  type: "gradient" | "plain";
  positionX?: number;
  positionY?: number;
  endPositionX?: number;
  endPositionY?: number;
  colors: string[];
};

export type userbarGeneratorParams = {
  width?: number;
  height?: number;
  text?: string;
  textColor?: string;
  background?: backgroundParams;
  textAlign?: "left" | "center" | "right";
  textBorder?: boolean;
  textBorderWidth?: number;
  textBorderColor?: string;
  pattern?: "none" | "dots" | "stripes";
  topShadow?: boolean;
};

let fontLoaded = false;
const loadFont = async () => {
  if (fontLoaded) return;

  const font = new FontFace("visitor1", `url(${visitorFont})`);
  await font.load();
  document.fonts.add(font);
  fontLoaded = true;
};

const imagesLoaded: { [key: string]: any } = {};
const loadImage = async (src: string) => {
  if (imagesLoaded[src]) return imagesLoaded[src];

  const image = new Image();
  image.src = src;
  await new Promise((resolve) => {
    image.onload = resolve;
  });
  imagesLoaded[src] = image;
  return image;
};

const generateUserbar = async ({
  width = 350,
  height = 19,
  text = "Hello, world!",
  textColor = "white",
  textAlign = "left",
  textBorder = true,
  textBorderWidth = 2,
  textBorderColor = "black",
  pattern = "stripes",
  background = {
    type: "gradient",
    positionX: 0,
    positionY: -100,
    endPositionX: 350,
    endPositionY: 19,
    colors: ["#11edc1", "#1029e3", "#11edc1"],
  },
  topShadow = true,
}: userbarGeneratorParams) => {
  await loadFont();
  const canvas = getCanvas(width, height)!;
  const ctx = canvas.getContext("2d")!;

  const generateText = () => {
    ctx.font = "10px visitor1";
    ctx.fillStyle = textColor;
    ctx.textAlign = textAlign;

    let positionX = 5;
    if (textAlign === "center") {
      positionX = width / 2;
    } else if (textAlign === "right") {
      positionX = width - 5;
    }

    if (textBorder) {
      ctx.strokeStyle = textBorderColor;
      ctx.lineWidth = textBorderWidth;
      ctx.strokeText(text, positionX, height / 2 + 3, width - 10);
    }

    ctx.fillText(text, positionX, height / 2 + 2, width - 10);
  };

  const img = await loadImage(
    {
      none: "",
      dots: dots,
      stripes: stripes,
    }[pattern]
  );

  const generatePattern = async () => {
    const patternFromImage = ctx.createPattern(img, "repeat");
    ctx.fillStyle = patternFromImage!;
    ctx.fillRect(0, 0, width, height);
    console.log("pattern");
  };

  const generateBackground = () => {
    if (background.type === "plain") {
      ctx.fillStyle = background.colors[0];
    } else if (background.type === "gradient") {
      const gradient = ctx.createLinearGradient(
        background.positionX || 0,
        background.positionY || 0,
        background.endPositionX || height,
        background.endPositionY || width
      );
      background.colors.forEach((color, index) => {
        gradient.addColorStop(
          invlerp(0, background.colors.length - 1, index),
          color
        );
      });
      ctx.fillStyle = gradient;
    }
    ctx.fillRect(0, 0, width, height);
  };

  const generateTopShadow = () => {
    const gradient = ctx.createRadialGradient(
      width / 2,
      -height,
      0,

      width / 2,
      -height * 42, //lotsa magic number here, to be fixed someday tm
      width * 2.33
    );

    gradient.addColorStop(0, "rgba(0, 0, 0, 0.3)");
    gradient.addColorStop(0.5, "rgba(255, 255, 255, 0.2)");
    gradient.addColorStop(0.9, "rgba(0, 0, 0, 0.3)");
    gradient.addColorStop(0.91, "rgba(255, 255, 255, 0.1)");
    gradient.addColorStop(1, "rgba(255, 255, 255, 0.3)");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
  };

  generateBackground();
  if (pattern !== "none") generatePattern();
  if (topShadow) generateTopShadow();
  generateText();

  return canvas.toDataURL("image/jpeg");
};

export default generateUserbar;

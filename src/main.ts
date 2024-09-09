import generateUserbar from ".";

let userbar = await generateUserbar({});
let image = document.createElement("img");
image.src = userbar;
document.getElementById("app")?.appendChild(image);

userbar = await generateUserbar({
  text: "Hello, world right!",
  textAlign: "right",
});
image = document.createElement("img");
image.src = userbar;
document.getElementById("app")?.appendChild(image);

userbar = await generateUserbar({
  text: "no shadow",
  textAlign: "center",
  topShadow: false,
});
image = document.createElement("img");
image.src = userbar;
document.getElementById("app")?.appendChild(image);

userbar = await generateUserbar({
  text: "shadow",
  textAlign: "left",
  topShadow: true,
});
image = document.createElement("img");
image.src = userbar;
document.getElementById("app")?.appendChild(image);

userbar = await generateUserbar({
  text: "background plain",
  textAlign: "left",
  topShadow: true,
  background: {
    type: "plain",
    colors: ["#FF0000"],
  },
});
image = document.createElement("img");
image.src = userbar;
document.getElementById("app")?.appendChild(image);

userbar = await generateUserbar({
  text: "background gradient",
  textAlign: "left",
  topShadow: false,
  background: {
    type: "gradient",
    positionX: -0,
    positionY: -50,
    endPositionX: 400,
    endPositionY: 50,
    colors: ["#FF0000", "#00FF00", "#0000FF"],
  },
});
image = document.createElement("img");
image.src = userbar;
document.getElementById("app")?.appendChild(image);

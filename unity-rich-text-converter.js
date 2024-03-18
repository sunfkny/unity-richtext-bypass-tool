const boldconverter = {
  pattern: /<b>(.*?)<\/b>/,
  replace: (match, p1) => {
    return `<strong>${p1}</strong>`;
  },
};

const decReg = /[1-9]{1}[0-9]*/;

const fontsizeconverter = {
  pattern: /<size=([^>]*)>(.*?)<\/size>/,
  replace: (match, p1, p2) => {
    if (!p1.match(decReg)) throw new Error(`error font size : ${match}`);

    return `<span style="font-size: ${p1}px">${p2}</span>`;
  },
};

const italicconverter = {
  pattern: /<i>(.*?)<\/i>/,
  replace: (match, p1) => {
    return `<em>${p1}</em>`;
  },
};

const colors = [
  { name: "aqua", color: "#00ffff" },
  { name: "black", color: "#000000" },
  { name: "blue", color: "#0000ff" },
  { name: "brown", color: "#a52a2a" },
  { name: "cyan", color: "#00ffff" },
  { name: "darkblue", color: "#0000a0" },
  { name: "fuchsia", color: "#ff00ff" },
  { name: "green", color: "#008000" },
  { name: "grey", color: "#808080" },
  { name: "lightblue", color: "#add8e6" },
  { name: "lime", color: "#00ff00" },
  { name: "magenta", color: "#ff00ff" },
  { name: "maroon", color: "#800000" },
  { name: "navy", color: "#000080" },
  { name: "olive", color: "#808000" },
  { name: "orange", color: "#ffa500" },
  { name: "purple", color: "#800080" },
  { name: "red", color: "#ff0000" },
  { name: "silver", color: "#c0c0c0" },
  { name: "teal", color: "#008080" },
  { name: "white", color: "#ffffff" },
  { name: "yellow", color: "#ffff00" },
];

const textcolorconverter = {
  pattern: /<color=([^>]*)>(.*?)<\/color>/,
  replace: (match, p1, p2) => {
    const color = colors.find((v) => v.name === p1);
    return `<span style="color: ${
      color ? color.color : p1.slice(0, 7).toLowerCase()
    }">${p2}</span>`;
  },
};

// <quad size=50 />
const quad = {
  pattern: /<quad size=([^>]*)\/>/,
  replace: (match, p1) => {
    if (!p1.match(decReg)) throw new Error(`error font size : ${match}`);

    return `<span style="font-size: ${p1}px">${p1}</span>`;
  },
};

function linearconverter(input) {
  const converters = [boldconverter, italicconverter];
  converters.forEach((converter) => {
    while (input.match(converter.pattern))
      input = input.replace(converter.pattern, converter.replace);
  });
  return input;
}

function nestedconverter(input) {
  const converters = [fontsizeconverter, textcolorconverter];
  while (true) {
    let ismatch = false;
    converters.forEach((converter) => {
      while (input.match(converter.pattern)) {
        input = input.replace(converter.pattern, converter.replace);
        ismatch = true;
      }
    });

    if (ismatch === false) break;
  }

  return input;
}
function paragraphconverter(input) {
  const pattern = "(.*)";
  const separator = "";
  const fill = (r) => {
    const paragraph = r[1];
    return `<p>${paragraph}</p>`;
  };
  const matcharray = input.split("\n");

  if (!matcharray) throw new Error(`error no paragraph in html input ${input}`);

  const output = matcharray
    .map((item) => {
      const regexp = new RegExp(pattern);
      const regExpMatchArray = item.match(regexp);
      if (!regExpMatchArray)
        throw new Error(`error invalid paragraph in ${item}`);

      return fill(regExpMatchArray);
    })
    .join(separator);

  return output;
}

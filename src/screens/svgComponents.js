import React from "react";
import { SvgXml } from "react-native-svg";  
export default function SvgComponent(){  
  const svgMarkup = `<CONTENT OF SVG FILE>`;
  const SvgImage = () => <SvgXml xml={svgMarkup} width="301px" />;  

  return <SvgImage />;
}
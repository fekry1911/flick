import * as React from "react";
import Svg, { Path } from "react-native-svg";
const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      fill="#FF0"
      d="M11.483 18.082a1 1 0 0 1 1.034 0l3.634 2.193c.757.458 1.692-.221 1.49-1.083l-.964-4.134a1 1 0 0 1 .32-.983l3.212-2.783c.668-.58.31-1.678-.57-1.752L15.41 9.18a1 1 0 0 1-.836-.606L12.92 4.672c-.345-.813-1.497-.813-1.842 0L9.425 8.575a1 1 0 0 1-.836.606l-4.227.359c-.882.074-1.24 1.173-.57 1.752l3.212 2.783a1 1 0 0 1 .319.983l-.965 4.134c-.2.861.734 1.54 1.491 1.083l3.634-2.193Z"
    />
  </Svg>
);
export default SvgComponent;

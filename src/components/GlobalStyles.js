import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyles = createGlobalStyle`
		${reset};
		* {
			box-sizing: border-box;		
			}
		a{
			text-decoration:none;
			color:inherit;
			outline:none;
		}
		html, body, #root{
			width:100%;
			height:100%;
		}
`;

export default GlobalStyles;

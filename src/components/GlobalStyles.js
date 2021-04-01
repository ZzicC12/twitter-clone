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
		body{
			font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
		}
		html, body, #root{
			width:100%;
			height:100%;
		}
		#root{				
			width:500px;
			margin:auto;
			background-color:#ecf0f1;
		}
		::-webkit-scrollbar { display: none; }
		button{
			border:none;
			outline:none;
			background-color:transparent;
			cursor:pointer;
			color:#34495e;
		
		}

`;

export default GlobalStyles;

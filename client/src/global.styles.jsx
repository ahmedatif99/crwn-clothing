import { createGlobalStyle } from "styled-components";

export const GlobalStyled = createGlobalStyle`
    body {
        font-family: "Lexend Peta", sans-serif;
        padding: 20px 60px;

        @media screen and (max-width: 800px) {
			padding: 10px;
		}
    }
  
    a {
        text-decoration: none;
        color: black;
    }
  
    * {
        box-sizing: border-box;
    }
`;

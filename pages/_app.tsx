import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import { ChakraProvider } from "@chakra-ui/react";
import { StoreProvider } from "../Context/Store";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider enableSystem={true} attribute="class">
      <ChakraProvider>
        <StoreProvider>
          <Component {...pageProps} />
        </StoreProvider>
      </ChakraProvider>
    </ThemeProvider>
  );
}

export default MyApp;

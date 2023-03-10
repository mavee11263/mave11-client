import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import { ChakraProvider } from "@chakra-ui/react";
import { StoreProvider } from "../Context/Store";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  useDisclosure,
} from "@chakra-ui/react";
import Cookies from "js-cookie";
import Script from "next/script";
import Link from "next/link";
import { useEffect } from "react";
import App from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cookies_available = Cookies.get("mavee11_cookies_consent");

  useEffect(() => {
    if (!cookies_available) {
      onOpen();
    }
  }, []);

  const OverlayTwo = () => (
    <ModalOverlay bg="none" backdropFilter="auto" backdropBlur="100px" />
  );
  return (
    <>
      <ThemeProvider enableSystem={true} attribute="class">
        <StoreProvider>
          <ChakraProvider>
            {cookies_available === "true" && (
              <>
                <Script
                  type="text/javascript"
                  async
                  strategy="afterInteractive"
                  onError={(e) => {
                    console.error("Script failed to load", e);
                  }}
                  src="//pl17923962.highperformancecpmgate.com/d5/07/8c/d5078c79e72b1d4331b9f6311b608e3c.js"
                />
                <Component {...pageProps} />
              </>
            )}
            <>
              <Modal
                closeOnOverlayClick={false}
                size={"xl"}
                isCentered
                isOpen={isOpen}
                onClose={onClose}
              >
                <OverlayTwo />
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Please Confirm Your Age</ModalHeader>
                  <ModalBody className="text-justify">
                    This site should only be visited by users with of ages 18
                    (eighteen) and above. By visiting this site you agree that
                    you have the right age (18+) The website uses cookies to
                    improve user experience. By using our website you consent to
                    all cookies in accordance with our.
                    <Link href={"/"}>
                      <a className="underline text-blue-600">
                        {" "}
                        privacy policies
                      </a>
                    </Link>
                  </ModalBody>

                  <ModalFooter className="flex flex-col w-full items-center mx-auto">
                    <div
                      onClick={() => {
                        Cookies.set("mavee11_cookies_consent", "true", {
                          expires: 7,
                        });
                        onClose();
                      }}
                      className="flex cursor-pointer dark:bg-blue-700 dark:hover:bg-blue-900 flex-col w-full uppercase text-center bg-blue-700 hover:bg-blue-800 text-white font-semibold px-2 py-2 rounded-full"
                    >
                      <p className="px-2">Iam Over 18</p>
                    </div>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </>
          </ChakraProvider>
        </StoreProvider>
      </ThemeProvider>
    </>
  );
}

MyApp.getInitialProps = async (appContext: any) => {
  const { pageProps } = await App.getInitialProps(appContext);
  const { ctx } = appContext;
  return { pageProps };
};

export default MyApp;

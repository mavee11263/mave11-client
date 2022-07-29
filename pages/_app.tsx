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
  ModalCloseButton,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import Cookies from "js-cookie";
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
           {
             cookies_available === 'true' && (
              <Component {...pageProps} />
             )
           }
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
                  <ModalHeader>This is for Adults</ModalHeader>
                  <ModalBody className="text-justify">
                  This site should only be visited by users with
                    ages 18 (eighteen) and above. By viviting this site you
                    agree that you are hve the right age (18+)
                    The website uses cookies to improve user experience. By
                    using our website you consent to all cookies in accordance
                    with our. 
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
                        Cookies.set("mavee11_cookies_consent", "true");
                        onClose();
                      }}
                      className="flex cursor-pointer dark:bg-blue-700 dark:hover:bg-blue-900 flex-col w-full uppercase text-center bg-blue-700 hover:bg-blue-800 text-white font-semibold px-2 py-2 rounded-full"
                    >
                      <p className="px-2">ACCEPT ALL</p>
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

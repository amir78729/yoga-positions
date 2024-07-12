'use client'
import {Inter} from "next/font/google";
import "./globals.css";
import {QueryClient, QueryClientProvider} from "react-query";
import {createTheme, ThemeProvider} from "@mui/material";
import COLORS from "@/app/constants/colors";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const queryClient = new QueryClient();
    const theme = createTheme({
        palette: {
            primary: {
                main: COLORS.PRIMARY,
                contrastText: '#fff',
            },
            secondary: {
                main: COLORS.SECONDARY,
                contrastText: '#fff',
            }
        },
        components: {
            MuiButton: {
                defaultProps: {
                    variant: 'contained'
                }
            }
        }
    })

    return (
    <html lang="en">
      <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={theme}>
              <body className={inter.className}>
                {children}
              </body>
          </ThemeProvider>
      </QueryClientProvider>
    </html>
    );
}

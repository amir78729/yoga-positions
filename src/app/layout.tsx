'use client'
import {Inter} from "next/font/google";
import "./globals.css";
import {QueryClient, QueryClientProvider, useQuery} from "react-query";
import {
    createTheme,
    List,
    ListItemButton,
    ListItemIcon,
    ListSubheader, Skeleton,
    TextField,
    ThemeProvider,
    Typography
} from "@mui/material";
import COLORS from "@/app/constants/colors";
import {Home} from "@mui/icons-material";
import PositionSidebarPreview from "@/app/components/PositionPreview";
import React, {useState} from "react";
import {Position} from "@/app/types";
import {useRouter} from "next/navigation";
import Icon from "@/app/components/Icon";
import Sidebar from "@/app/components/Sidebar";
import {useIsMobile} from "@/app/hooks";

const inter = Inter({subsets: ["latin"]});

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
            },
            info: {
                main: '#3F4E41',
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
    const isMobile = useIsMobile()

    return (
        <html lang="en">
        <head>
            <link rel="manifest" href="/manifest.json"/>
        </head>
        <body className={inter.className}>
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={theme}>
                <main className={!isMobile ? `ml-[300px]` : ''}>
                    {children}
                </main>
            </ThemeProvider>
        </QueryClientProvider>
        </body>
        </html>
    );
}

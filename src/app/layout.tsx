import type {Metadata} from "next";import "./globals.css";
export const metadata:Metadata={title:"InforMeta | Fanger Design",description:"Panel de rendimiento publicitario de Fanger Design"};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="es-AR"><body>{children}</body></html>;}

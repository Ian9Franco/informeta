import {NextRequest,NextResponse} from "next/server";
import {getDemoReport,parseClientId} from "../../../lib/demo-data";
import {parseRange} from "../../../lib/report";
export function GET(req:NextRequest){const p=new URL(req.url).searchParams;return NextResponse.json(getDemoReport(parseClientId(p.get("client")),parseRange(p.get("range"))),{headers:{"Cache-Control":"no-store"}});}

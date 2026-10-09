import { buildReport, type MetricRow, type ReportRange } from "./report.ts";
export const clients=[{id:"demo-moda",name:"Demo Moda",category:"Indumentaria",currency:"ARS"},{id:"demo-gastro",name:"Demo Gastronomía",category:"Gastronomía",currency:"ARS"}] as const;
export type ClientId=(typeof clients)[number]["id"];
export const parseClientId=(v:string|null|undefined):ClientId=>clients.find(c=>c.id===v)?.id??clients[0].id;
const campaigns=[
{clientId:"demo-moda",id:"mod-01",name:"Colección primavera",budget:13800,quality:1.1},
{clientId:"demo-moda",id:"mod-02",name:"Remarketing catálogo",budget:7200,quality:1.7},
{clientId:"demo-moda",id:"mod-03",name:"Captación de contactos",budget:5500,quality:1.4},
{clientId:"demo-gastro",id:"gas-01",name:"Reservas de temporada",budget:11200,quality:1.25},
{clientId:"demo-gastro",id:"gas-02",name:"Menú ejecutivo",budget:5400,quality:1.55}] as const;
export const demoRows:MetricRow[]=Array.from({length:60},(_,i)=>{const daysAgo=59-i;const date=new Date("2026-10-07T12:00:00Z");date.setUTCDate(date.getUTCDate()-daysAgo);return campaigns.map((c,index)=>{const spend=Math.round(c.budget*(.83+((daysAgo*11+index*7)%25)/100));const impressions=Math.round(spend*(4.2+index%3));const clicks=Math.round(impressions*(.013+c.quality*.006));return {date:date.toISOString().slice(0,10),clientId:c.clientId,campaignId:c.id,campaignName:c.name,spend,impressions,clicks,leads:Math.round(clicks*(.04+c.quality*.035))};});}).flat();
export const getDemoReport=(clientId:ClientId,range:ReportRange)=>buildReport(demoRows,clientId,"ARS",range);

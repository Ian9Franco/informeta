export type ReportRange = 7 | 30;
export interface MetricRow { date:string; clientId:string; campaignId:string; campaignName:string; spend:number; impressions:number; clicks:number; leads:number }
export interface Totals { spend:number; impressions:number; clicks:number; leads:number; ctr:number|null; cpc:number|null; cpl:number|null; cpm:number|null }
export interface CampaignSummary { id:string; name:string; totals:Totals }
export interface Report { clientId:string;currency:string;range:ReportRange;startDate:string;endDate:string;totals:Totals;previousTotals:Totals;daily:{date:string;totals:Totals}[];campaigns:CampaignSummary[];source:"demo" }
export const parseRange = (value:string|null|undefined):ReportRange => value==="7"?7:30;
const div = (n:number,d:number,m=1) => d===0?null:n/d*m;
export function summarize(rows:readonly MetricRow[]):Totals {
 const s=rows.reduce((a,r)=>({spend:a.spend+r.spend,impressions:a.impressions+r.impressions,clicks:a.clicks+r.clicks,leads:a.leads+r.leads}),{spend:0,impressions:0,clicks:0,leads:0});
 return {...s,ctr:div(s.clicks,s.impressions,100),cpc:div(s.spend,s.clicks),cpl:div(s.spend,s.leads),cpm:div(s.spend,s.impressions,1000)};
}
export function buildReport(all:readonly MetricRow[],clientId:string,currency:string,range:ReportRange):Report {
 const rows=all.filter(r=>r.clientId===clientId);
 const dates=[...new Set(rows.map(r=>r.date))].sort();
 const active=new Set(dates.slice(-range)),before=new Set(dates.slice(-range*2,-range));
 const current=rows.filter(r=>active.has(r.date)),previous=rows.filter(r=>before.has(r.date));
 const groups=new Map<string,MetricRow[]>();
 const daily=[...active].sort().map(date=>({date,totals:summarize(current.filter(r=>r.date===date))}));
 for(const r of current)groups.set(r.campaignId,[...(groups.get(r.campaignId)??[]),r]);
 const campaigns=[...groups].map(([id,items])=>({id,name:items[0].campaignName,totals:summarize(items)})).sort((a,b)=>b.totals.spend-a.totals.spend);
 return {clientId,currency,range,startDate:daily[0]?.date??"",endDate:daily.at(-1)?.date??"",totals:summarize(current),previousTotals:summarize(previous),daily,campaigns,source:"demo"};
}
export const percentChange=(a:number|null,b:number|null):number|null=>a===null||b===null||b===0?null:(a-b)/b*100;

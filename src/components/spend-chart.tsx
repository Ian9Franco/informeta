import type {Report} from "../lib/report.ts";
export function SpendChart({daily,currency}:{daily:Report["daily"];currency:string}){
const max=Math.max(1,...daily.map(d=>d.totals.spend));const step=760/Math.max(1,daily.length);
return <svg viewBox="0 0 800 210" className="chart" role="img" aria-label={"Inversión diaria en "+currency}>
{[0,.5,1].map(n=><line key={n} x1="10" x2="790" y1={170-145*n} y2={170-145*n} stroke="#293840" strokeDasharray="3 5"/>)}
{daily.map((d,i)=>{const h=d.totals.spend/max*145;const x=20+i*step;return <g key={d.date}><rect x={x} y={170-h} width={Math.max(3,step*.62)} height={h} rx="3" fill="#8ce2b4"><title>{d.date+": "+d.totals.spend.toLocaleString("es-AR")+" "+currency}</title></rect>{(daily.length===7||i%5===0||i===daily.length-1)&&<text x={x+step*.31} y="195" textAnchor="middle" fontSize="10" fill="#87979f">{d.date.slice(8,10)+"/"+d.date.slice(5,7)}</text>}</g>})}</svg>;
}
import test from "node:test";import assert from "node:assert/strict";
import {summarize,percentChange,parseRange} from "./report.ts";
import {getDemoReport} from "./demo-data.ts";
test("aggregates counts and recalculates weighted CTR",()=>{const r=summarize([{date:"x",clientId:"a",campaignId:"a",campaignName:"x",spend:100,impressions:1000,clicks:20,leads:2},{date:"x",clientId:"a",campaignId:"a",campaignName:"x",spend:300,impressions:9000,clicks:30,leads:3}]);assert.equal(r.ctr,.5);assert.equal(r.cpl,80);});
test("zero denominators return null",()=>{assert.equal(summarize([]).cpl,null);assert.equal(percentChange(1,0),null);});
test("7 and 30 day periods are independent",()=>{assert.equal(getDemoReport("demo-moda",7).daily.length,7);assert.equal(getDemoReport("demo-gastro",30).campaigns.length,2);assert.equal(parseRange("x"),30);});

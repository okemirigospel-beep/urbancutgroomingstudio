import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {lookbookPhotos} from '../src/lib/lookbook.ts';
import {servicePreviews} from '../src/lib/service-media.ts';
import {wavePhotos,waveKit,galleryStep} from '../src/lib/service-gallery.ts';
test('audited photograph placements stay within two and match shipped assets',()=>{
 const audit=JSON.parse(readFileSync('docs/image-usage-oct31.json','utf8'));
 const assets=new Set<string>();
 for(const row of audit.photos){assert.equal(row.count,row.placements.length);assert.ok(row.count<=2);for(const [path,hash] of Object.entries(row.variantHashes)){assets.add(path);assert.equal(createHash('sha256').update(readFileSync('public'+path)).digest('hex'),hash);}}
 for(const p of lookbookPhotos)assert.ok(assets.has(p.src));
 for(const p of Object.values(servicePreviews).flat())assert.ok(assets.has(p.src+'-720.webp'));
 for(const p of wavePhotos){const row=audit.photos.find((r:{source:string})=>r.source===p.source);assert.equal(row.count,2);assert.ok(row.placements.every((p:{location:string})=>p.location.startsWith('sporting-waves')));}
 assert.ok(assets.has(waveKit.src));
});
test('manual wave navigation wraps in both directions',()=>{assert.equal(galleryStep(0,-1),2);assert.equal(galleryStep(2,1),0);});

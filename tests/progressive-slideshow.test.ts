import test from 'node:test';
import assert from 'node:assert/strict';
import { nextPhotoIndex } from '../src/lib/slideshow.ts';
import { heroPhotos } from '../src/lib/hero.ts';
test('progressive queue wraps in either direction and skips failed images',()=>{
 assert.equal(nextPhotoIndex(heroPhotos,0,[]),1);
 assert.equal(nextPhotoIndex(heroPhotos,19,[]),0);
 assert.equal(nextPhotoIndex(heroPhotos,0,[],-1),19);
 assert.equal(nextPhotoIndex(heroPhotos,0,[2,3]),3);
 assert.equal(nextPhotoIndex(heroPhotos,0,heroPhotos.slice(1).map(p=>p.id)),null);
 assert.equal(nextPhotoIndex([],0,[]),null);
});

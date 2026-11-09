import {test} from 'node:test';
import assert from 'node:assert/strict';
import {performance} from 'node:perf_hooks';
import {readFile} from 'node:fs/promises';
import {validateWorkspace, renderWorkspace, escapeHtml} from '../scripts/build.mjs';

const workspace = JSON.parse(await readFile(new URL('../workspace.json', import.meta.url), 'utf8'));

test('performance benchmark: escapeHtml memory allocations and speed', () => {
  const start = performance.now();
  for (let i = 0; i < 100000; i++) {
    escapeHtml('<script>alert("test & execution")</script>');
  }
  const duration = performance.now() - start;
  assert.ok(duration < 200, `escapeHtml took too long: ${duration}ms`);
});

test('performance benchmark: renderWorkspace operations', () => {
  const start = performance.now();
  for (let i = 0; i < 10000; i++) {
    renderWorkspace(workspace);
  }
  const duration = performance.now() - start;
  assert.ok(duration < 500, `renderWorkspace took too long: ${duration}ms`);
});

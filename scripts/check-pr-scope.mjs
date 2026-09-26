// Checks that a participant's pull request only adds or changes their own
// profile: members/<netid>.json and members/<netid>.jpg (or .png).
// CI skips this for leads, whose PRs can change anything.
//
// Run it yourself with: npm run check:pr
// It compares your branch with origin/main. Pass another base as an argument.

import { execFileSync } from 'node:child_process';
import path from 'node:path';

const git = (...args) =>
  execFileSync('git', args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();

const base = git('merge-base', process.argv[2] ?? 'origin/main', 'HEAD');
const changes = git('diff', '--name-status', '--no-renames', base, 'HEAD')
  .split('\n')
  .filter(Boolean)
  .map((line) => {
    const [status, file] = line.split('\t');
    return { status, file };
  });

const errors = [];
const netids = new Set();

for (const { status, file } of changes) {
  const dir = path.dirname(file);
  const name = path.basename(file);
  const netid = path.basename(name, path.extname(name));

  if (dir !== 'members') {
    errors.push(`${file}: your PR should only change files in members/. Undo this change with: git checkout origin/main -- "${file}"${status === 'A' ? ` (or delete the file if it's new: git rm "${file}")` : ''}`);
    continue;
  }
  if (name.startsWith('_') || name.startsWith('.')) {
    errors.push(`${file}: don't change this file. Copy the template to members/<your-netid>.json instead.`);
    continue;
  }
  netids.add(netid);

  // Only leads set "role". Fail if this PR adds or changes it.
  if (path.extname(name) === '.json' && status !== 'D') {
    const roleIn = (rev) => {
      try {
        return JSON.parse(git('show', `${rev}:${file}`)).role;
      } catch {
        return undefined;
      }
    };
    if (roleIn('HEAD') !== undefined && roleIn('HEAD') !== roleIn(base)) {
      errors.push(`${file}: remove the "role" line. Only leads and instructors have a role.`);
    }
  }
}

if (netids.size > 1) {
  errors.push(`this PR changes profiles for ${[...netids].join(', ')}. Change only your own two files (named with your NetID).`);
}

if (errors.length > 0) {
  console.error(`Found ${errors.length} problem${errors.length === 1 ? '' : 's'} with the files in this pull request:\n`);
  for (const e of errors) console.error(`  ✗ ${e}`);
  console.error('\nSee CONTRIBUTING.md for the full steps.');
  process.exit(1);
}

console.log(`✓ This pull request only changes ${netids.size === 1 ? `the profile for ${[...netids][0]}` : 'what it should'}.`);

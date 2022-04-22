#!/usr/bin/env node

import path from 'path'
import fs from 'fs'
import walk from 'walk-sync'

// Gather markdown files
const allFiles = walkFiles('content', '.md')
  .concat(walkFiles('data', '.md'))

// Remove Liquid and write output to .TEMP.md
allFiles.forEach(filename => {
  // const newFilename = filename.replace('.md', '.TEMP.md')
  const content = fs.readFileSync(filename, 'utf-8')
  const modified = content.replaceAll(/\{%.+?%\}/g, '')
  // fs.writeFileSync(newFilename, modified)
  fs.writeFileSync(filename, modified)
})

function walkFiles(dir, ext, opts = {}) {
  const dirPath = path.posix.join(process.cwd(), dir)
  const walkSyncOpts = { includeBasePath: true, directories: false }

  return walk(dirPath, walkSyncOpts)
    .filter((file) => file.endsWith(ext) && !file.endsWith('README.md'))
}

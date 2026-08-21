import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemaTypes'
import { structure } from './structure'
import { projectId, dataset } from '../src/sanity/env'

export default defineConfig({
  basePath: '/studio',
  name: 'sportoid',
  title: 'SPORTOID CMS',
  projectId,
  dataset,

  plugins: [
    structureTool({ structure }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})

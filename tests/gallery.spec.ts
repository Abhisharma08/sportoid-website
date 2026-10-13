import { test, expect } from '@playwright/test'
import { build } from 'esbuild'

test('gallery modal with fixture photos traps focus, navigates and restores focus', async ({ page }) => {
  // Exercise the actual component with local fixtures. No published CMS data is changed.
  const result = await build({
    stdin: {
      resolveDir: process.cwd(), loader: 'tsx', contents: `
        import React from 'react';
        import { createRoot } from 'react-dom/client';
        import { GalleryLightbox } from './src/features/gallery/components/GalleryLightbox';
        const photo = 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect width="100" height="100" fill="red"/></svg>');
        const photos = [1,2].map(n => ({ key: String(n), src: photo, thumb: photo, alt: 'Fixture photo ' + n }));
        function App() {
          const [open, setOpen] = React.useState(false);
          const trigger = React.useRef(null);
          return <><button ref={trigger} onClick={() => setOpen(true)}>Open album</button><a href="#outside">Outside dialog</a>{open && <GalleryLightbox title="Fixture" photos={photos} onClose={() => { setOpen(false); trigger.current?.focus(); }} />}</>;
        }
        createRoot(document.getElementById('root')).render(<App />);
      `,
    }, bundle: true, write: false, platform: 'browser', jsx: 'automatic', define: { 'process.env.NODE_ENV': '"production"', 'process.env': '{}'  },
  })
  await page.goto('about:blank')
  await page.setContent('<html lang="en"><body><main id="root"></main></body></html>')
  await page.addScriptTag({ content: result.outputFiles[0].text })
  const opener = page.getByRole('button', { name: 'Open album' })
  await opener.click()
  const dialog = page.getByRole('dialog')
  await expect(dialog).toBeVisible()
  await expect(page.getByRole('button', { name: 'Close gallery' })).toBeFocused()
  await page.keyboard.press('Shift+Tab')
  expect(await dialog.evaluate((el) => el.contains(document.activeElement))).toBe(true)
  await page.keyboard.press('ArrowRight')
  await expect(page.getByAltText('Fixture photo 2', { exact: true })).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(dialog).not.toBeVisible()
  await expect(opener).toBeFocused()
})

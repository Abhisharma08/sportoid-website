import { ImageResponse } from 'next/og'
export const dynamic = 'force-static'
export function GET() {
  return new ImageResponse(
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 80, width: '100%', height: '100%', background: '#171717', color: 'white' }}>
      <div style={{ display: 'flex', fontSize: 100, fontWeight: 700 }}>SPORT<span style={{ color: '#e61c24' }}>O</span>ID</div>
      <div style={{ fontSize: 36, marginTop: 30 }}>Building Tomorrow’s Champions</div>
      <div style={{ width: 140, height: 8, background: '#e61c24', marginTop: 40 }} />
    </div>, { width: 1200, height: 630 }
  )
}

import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Usman Farooqi - Web Development Lead & Project Manager';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#040409', // Dark premium background
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 180,
            height: 180,
            borderRadius: 40,
            background: 'linear-gradient(to bottom right, #8b5cf6, #3b82f6)',
            padding: 6,
            marginBottom: 48,
          }}
        >
          <div
            style={{
              width: '100%',
              height: '100%',
              borderRadius: 34,
              background: '#020205',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 84,
              fontWeight: 900,
              color: 'white',
              letterSpacing: '-4px',
            }}
          >
            UF
          </div>
        </div>
        <div
          style={{
            fontSize: 72,
            fontWeight: 800,
            color: 'white',
            marginBottom: 20,
            letterSpacing: '-1px',
          }}
        >
          Usman Farooqi
        </div>
        <div
          style={{
            fontSize: 32,
            color: '#818cf8', // Indigo/violet tint
            fontWeight: 600,
            letterSpacing: '2px',
            textTransform: 'uppercase',
          }}
        >
          Project Manager & Digital Ops Lead
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

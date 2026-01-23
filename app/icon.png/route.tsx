import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Block Puzzle";
export const size = { width: 1024, height: 1024 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "linear-gradient(135deg, #1a1625 0%, #2a2435 30%, #7c3aed 70%, #ec4899 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 12,
            padding: 80,
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 8,
              width: 480,
              height: 480,
              backgroundColor: "rgba(31,26,46,0.4)",
              borderRadius: 24,
              padding: 16,
              border: "4px solid rgba(255,255,255,0.1)",
            }}
          >
            <div style={{ width: 140, height: 140, backgroundColor: "#4ecdc4", borderRadius: 12, boxShadow: "0 4px 12px rgba(78,205,196,0.4)" }} />
            <div style={{ width: 140, height: 140, backgroundColor: "#ffd93d", borderRadius: 12, boxShadow: "0 4px 12px rgba(255,217,61,0.4)" }} />
            <div style={{ width: 140, height: 140, backgroundColor: "#bb6bd9", borderRadius: 12, boxShadow: "0 4px 12px rgba(187,107,217,0.4)" }} />
            <div style={{ width: 140, height: 140, backgroundColor: "#6bcf7f", borderRadius: 12, boxShadow: "0 4px 12px rgba(107,207,127,0.4)" }} />
            <div style={{ width: 140, height: 140, backgroundColor: "#ff6b6b", borderRadius: 12, boxShadow: "0 4px 12px rgba(255,107,107,0.4)" }} />
            <div style={{ width: 140, height: 140, backgroundColor: "#4d9de0", borderRadius: 12, boxShadow: "0 4px 12px rgba(77,157,224,0.4)" }} />
            <div style={{ width: 140, height: 140, backgroundColor: "#ffa500", borderRadius: 12, boxShadow: "0 4px 12px rgba(255,165,0,0.4)" }} />
            <div style={{ width: 140, height: 140, backgroundColor: "#e84393", borderRadius: 12, boxShadow: "0 4px 12px rgba(232,67,147,0.4)" }} />
            <div style={{ width: 140, height: 140, backgroundColor: "#7c3aed", borderRadius: 12, boxShadow: "0 4px 12px rgba(124,58,237,0.4)" }} />
          </div>
        </div>
      </div>
    ),
    { width: 1024, height: 1024 }
  );
}

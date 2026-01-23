import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET() {
  const blocks = [
    { x: 3, y: 15, color: "#4ecdc4", shape: [[1,1,1,1]] },
    { x: 0, y: 17, color: "#ffd93d", shape: [[1,1],[1,1]] },
    { x: 5, y: 16, color: "#bb6bd9", shape: [[0,1,0],[1,1,1]] },
    { x: 1, y: 14, color: "#6bcf7f", shape: [[0,1,1],[1,1,0]] },
    { x: 6, y: 18, color: "#ff6b6b", shape: [[1,1,0],[0,1,1]] },
    { x: 2, y: 16, color: "#4d9de0", shape: [[1,0,0],[1,1,1]] },
    { x: 7, y: 15, color: "#ffa500", shape: [[0,0,1],[1,1,1]] },
  ];
  
  const board = Array(20).fill(null).map(() => Array(10).fill(null));
  blocks.forEach(block => {
    block.shape.forEach((row, r) => {
      row.forEach((cell, c) => {
        if (cell && block.y + r < 20 && block.x + c < 10) {
          board[block.y + r][block.x + c] = block.color;
        }
      });
    });
  });
  
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "linear-gradient(135deg, #1a1625 0%, #2a2435 20%, #7c3aed 55%, #ec4899 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "50px 70px",
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 20,
            flex: 1,
            zIndex: 2,
            maxWidth: 500,
          }}
        >
          <div
            style={{
              fontSize: 76,
              fontWeight: 800,
              color: "white",
              lineHeight: 1.1,
              textShadow: "0 4px 24px rgba(0,0,0,0.6)",
              letterSpacing: "-2px",
            }}
          >
            Block Puzzle
          </div>
          <div
            style={{
              fontSize: 30,
              color: "rgba(255,255,255,0.95)",
              fontWeight: 600,
              marginTop: 8,
            }}
          >
            Stack, clear lines, and compete
          </div>
          <div
            style={{
              fontSize: 22,
              color: "rgba(255,255,255,0.75)",
              fontWeight: 400,
              marginTop: 4,
            }}
          >
            Classic block puzzle on Base
          </div>
        </div>
        
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
            width: 300,
            height: 420,
            backgroundColor: "rgba(31,26,46,0.85)",
            borderRadius: 20,
            padding: 14,
            border: "4px solid rgba(124,58,237,0.7)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.4), inset 0 0 0 1px rgba(255,255,255,0.1)",
            zIndex: 2,
          }}
        >
          {board.map((row, rowIdx) => (
            <div
              key={rowIdx}
              style={{
                display: "flex",
                gap: 3,
                height: 19,
              }}
            >
              {row.map((cell, colIdx) => (
                <div
                  key={colIdx}
                  style={{
                    width: 26,
                    height: 19,
                    backgroundColor: cell || "rgba(42,36,53,0.7)",
                    borderRadius: 3,
                    boxShadow: cell ? "0 2px 4px rgba(0,0,0,0.3)" : "none",
                  }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      headers: {
        "Content-Type": "image/png",
      },
    }
  );
}

import { ImageResponse } from "next/og";

import { siteConfig } from "@/lib/site";

export const size = {
  width: 1200,
  height: 630
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          background:
            "linear-gradient(135deg, #fffaf4 0%, #f8e6cf 48%, #d7efe0 100%)",
          color: "#122033",
          fontFamily: "Avenir Next, sans-serif",
          padding: "64px",
          flexDirection: "column",
          justifyContent: "space-between"
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            fontSize: 28,
            fontWeight: 600
          }}
        >
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "16px",
              backgroundColor: "#122033",
              color: "#f7d8b6",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            AI
          </div>
          {siteConfig.name}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div
            style={{
              maxWidth: "900px",
              fontSize: 70,
              lineHeight: 1.05,
              fontWeight: 700
            }}
          >
            Stop struggling with review replies. AI writes them in seconds.
          </div>
          <div
            style={{
              fontSize: 28,
              opacity: 0.85
            }}
          >
            Built for dental clinics first, then every local business that needs
            faster, warmer review responses.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            fontSize: 24
          }}
        >
          <div
            style={{
              display: "flex",
              padding: "14px 24px",
              borderRadius: "999px",
              backgroundColor: "#122033",
              color: "white"
            }}
          >
            Try Free
          </div>
          <div>Free 5/mo • Pro $19/mo</div>
        </div>
      </div>
    ),
    size
  );
}

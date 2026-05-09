"use client";

interface ResponsiveVideoFrameProps {
  src: string;
  title: string;
}

export default function ResponsiveVideoFrame({ src, title }: ResponsiveVideoFrameProps) {
  return (
    <div className="relative w-full overflow-hidden" style={{ paddingTop: "56.25%" }}>
      <iframe
        src={src}
        title={title}
        className="absolute inset-0 h-full w-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        loading="lazy"
        allowFullScreen
      />
    </div>
  );
}

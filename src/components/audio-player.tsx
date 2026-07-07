import { useEffect, useRef, useState } from "react";
import { Play, Pause, SkipBack, SkipForward, Loader2 } from "lucide-react";

type Track = { src: string; label: string };

export function AudioPlayer({
  tracks,
  initialIndex = 0,
  onIndexChange,
}: {
  tracks: Track[];
  initialIndex?: number;
  onIndexChange?: (i: number) => void;
}) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [index, setIndex] = useState(initialIndex);
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const nextIndex = Math.min(Math.max(initialIndex, 0), tracks.length - 1);
    if (Number.isFinite(nextIndex) && nextIndex !== index) {
      setIndex(nextIndex);
    }
  }, [initialIndex, index, tracks.length]);

  useEffect(() => {
    onIndexChange?.(index);
  }, [index, onIndexChange]);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    if (playing) {
      setLoading(true);
      a.currentTime = 0;
      a.play().catch(() => setPlaying(false)).finally(() => setLoading(false));
    } else {
      a.pause();
    }
  }, [playing, index]);

  const cur = tracks[index];
  if (!cur) return null;

  return (
    <div className="sticky bottom-3 z-30 mx-auto max-w-3xl px-3">
      <div className="ornament-border rounded-2xl shadow-lg p-3 flex items-center gap-3">
        <button
          aria-label="Previous"
          onClick={() => setIndex((i) => Math.max(0, i - 1))}
          disabled={index === 0}
          className="p-2 rounded-full hover:bg-accent disabled:opacity-40"
        >
          <SkipBack className="w-4 h-4" />
        </button>
        <button
          aria-label={playing ? "Pause" : "Play"}
          onClick={() => setPlaying((p) => !p)}
          className="w-11 h-11 rounded-full bg-primary text-primary-foreground grid place-items-center shadow hover:opacity-90"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : playing ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
        </button>
        <button
          aria-label="Next"
          onClick={() => setIndex((i) => Math.min(tracks.length - 1, i + 1))}
          disabled={index >= tracks.length - 1}
          className="p-2 rounded-full hover:bg-accent disabled:opacity-40"
        >
          <SkipForward className="w-4 h-4" />
        </button>
        <div className="flex-1 min-w-0">
          <div className="text-xs uppercase tracking-wider text-gold">Now reciting</div>
          <div className="text-sm font-medium truncate">{cur.label}</div>
        </div>
        <div className="text-xs text-muted-foreground tabular-nums">
          {index + 1}/{tracks.length}
        </div>
        <audio
          ref={audioRef}
          src={cur.src}
          onEnded={() => {
            if (index < tracks.length - 1) setIndex(index + 1);
            else setPlaying(false);
          }}
          onWaiting={() => setLoading(true)}
          onCanPlay={() => setLoading(false)}
          preload="auto"
        />
      </div>
    </div>
  );
}

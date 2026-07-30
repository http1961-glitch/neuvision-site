import { useRef, type ReactNode } from "react"

type VideoTileProps = {
  src: string
  poster?: string
  className?: string
  /** Play only while hovered (portfolio cards). Otherwise autoplays muted loop. */
  hoverToPlay?: boolean
  children?: ReactNode
}

export function VideoTile({
  src,
  poster,
  className = "",
  hoverToPlay = false,
  children,
}: VideoTileProps) {
  const ref = useRef<HTMLVideoElement>(null)

  const onEnter = () => {
    if (!hoverToPlay || !ref.current) return
    void ref.current.play()
  }
  const onLeave = () => {
    if (!hoverToPlay || !ref.current) return
    ref.current.pause()
    ref.current.currentTime = 0
  }

  return (
    <div
      className={`relative overflow-hidden bg-bone-dim ${className}`}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <video
        ref={ref}
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        autoPlay={!hoverToPlay}
        preload="metadata"
        className="h-full w-full object-cover"
      />
      {children}
    </div>
  )
}

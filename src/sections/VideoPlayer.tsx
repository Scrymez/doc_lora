import { useRef, useState } from 'react'

function fmt(t: number) {
  if (!isFinite(t)) return '0:00'
  const m = Math.floor(t / 60)
  const s = Math.floor(t % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

export default function VideoPlayer({ src }: { src: string }) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(false)
  const [vol, setVol] = useState(1)
  const [cur, setCur] = useState(0)
  const [dur, setDur] = useState(0)

  const toggle = () => {
    const v = videoRef.current
    if (!v) return
    if (v.paused) v.play()
    else v.pause()
  }

  const seek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = videoRef.current
    if (!v) return
    v.currentTime = Number(e.target.value)
    setCur(v.currentTime)
  }

  const toggleMute = () => {
    const v = videoRef.current
    if (!v) return
    v.muted = !v.muted
    setMuted(v.muted)
    if (!v.muted && v.volume === 0) {
      v.volume = 1
      setVol(1)
    }
  }

  const changeVol = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = videoRef.current
    if (!v) return
    const nv = Number(e.target.value)
    v.volume = nv
    v.muted = nv === 0
    setVol(nv)
    setMuted(v.muted)
  }

  const fullscreen = () => {
    const el = wrapRef.current as (HTMLDivElement & {
      webkitRequestFullscreen?: () => void
    }) | null
    const v = videoRef.current as (HTMLVideoElement & {
      webkitEnterFullscreen?: () => void
    }) | null
    const doc = document as Document & {
      webkitFullscreenElement?: Element
      webkitExitFullscreen?: () => void
    }
    if (document.fullscreenElement || doc.webkitFullscreenElement) {
      if (document.exitFullscreen) document.exitFullscreen()
      else doc.webkitExitFullscreen?.()
      return
    }
    if (el?.requestFullscreen) el.requestFullscreen()
    else if (el?.webkitRequestFullscreen) el.webkitRequestFullscreen()
    else if (v?.webkitEnterFullscreen) v.webkitEnterFullscreen()
  }

  const progress = dur ? (cur / dur) * 100 : 0

  return (
    <div ref={wrapRef} className={`vp ${playing ? 'vp-playing' : ''}`}>
      <video
        ref={videoRef}
        className="vp-video"
        src={src}
        playsInline
        preload="metadata"
        onClick={toggle}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onTimeUpdate={(e) => setCur(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => setDur(e.currentTarget.duration)}
        onEnded={() => setPlaying(false)}
      />

      {!playing && (
        <button className="vp-bigplay" aria-label="Смотреть видео" onClick={toggle}>
          <svg viewBox="0 0 24 24" width="34" height="34" fill="currentColor" aria-hidden>
            <path d="M7 6l11 6-11 6z" />
          </svg>
        </button>
      )}

      <div className="vp-controls" onClick={(e) => e.stopPropagation()}>
        <input
          className="vp-seek"
          type="range"
          min={0}
          max={dur || 0}
          step={0.05}
          value={cur}
          onChange={seek}
          style={{ ['--vp-progress' as string]: `${progress}%` }}
          aria-label="Перемотка"
        />
        <div className="vp-row">
          <button className="vp-btn" onClick={toggle} aria-label={playing ? 'Пауза' : 'Играть'}>
            {playing ? (
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden>
                <path d="M7 5h4v14H7zM13 5h4v14h-4z" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden>
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>
          <span className="vp-time">
            {fmt(cur)} / {fmt(dur)}
          </span>
          <div className="vp-spacer" />
          <div className="vp-vol-wrap">
            <div className="vp-volpanel">
              <input
                className="vp-volslider"
                type="range"
                min={0}
                max={1}
                step={0.05}
                value={muted ? 0 : vol}
                onChange={changeVol}
                style={{ ['--vp-vol' as string]: `${(muted ? 0 : vol) * 100}%` }}
                aria-label="Громкость"
              />
            </div>
            <button className="vp-btn vp-vol" onClick={toggleMute} aria-label={muted ? 'Включить звук' : 'Выключить звук'}>
              {muted || vol === 0 ? (
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden>
                  <path d="M4 9v6h4l5 5V4L8 9H4zm12.5 3l2.5 2.5-1 1L15.5 13 13 15.5l-1-1L14.5 12 12 9.5l1-1L15.5 11 18 8.5l1 1z" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden>
                  <path d="M4 9v6h4l5 5V4L8 9H4zm11.5 3a4 4 0 00-2.5-3.7v7.4A4 4 0 0015.5 12z" />
                </svg>
              )}
            </button>
          </div>
          <button className="vp-btn" onClick={fullscreen} aria-label="На весь экран">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M4 9V5a1 1 0 011-1h4M20 9V5a1 1 0 00-1-1h-4M4 15v4a1 1 0 001 1h4M20 15v4a1 1 0 01-1 1h-4" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

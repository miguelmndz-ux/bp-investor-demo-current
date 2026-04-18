1. Quick-Access Cards
A 2-column CSS grid with gap: 8px. Each card is a flat 48px tall pill with border-radius: 4px and a semi-transparent dark background. A 48×48px square image sits flush on the left (no border-radius). Bold white text fills the middle. On hover, the background lightens and a small 32×32px green circle play button fades in on the right.

<style>
  .quick-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; }
  .qcard { display: flex; align-items: center; height: 48px; background: rgba(255,255,255,0.1); border-radius: 4px; overflow: hidden; cursor: pointer; transition: background 0.3s; position: relative; }
  .qcard:hover { background: rgba(255,255,255,0.2); }
  .qcard:hover .play { opacity: 1; }
  .qcard img { width: 48px; height: 48px; object-fit: cover; flex-shrink: 0; }
  .qcard span { flex: 1; padding: 0 12px; font-size: 14px; font-weight: 700; color: #fff; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .play { width: 32px; height: 32px; border-radius: 50%; background: #1ed760; margin-right: 8px; flex-shrink: 0; opacity: 0; transition: opacity 0.15s; display: flex; align-items: center; justify-content: center; border: none; cursor: pointer; }
  .play svg { width: 13px; height: 13px; fill: #000; margin-left: 2px; }
</style>

<div class="quick-grid">
  <div class="qcard">
    <img src="https://picsum.photos/seed/1/48" alt="" />
    <span>Liked Songs</span>
    <button class="play"><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg></button>
  </div>
  <div class="qcard">
    <img src="https://picsum.photos/seed/2/48" alt="" />
    <span>Daily Mix 1</span>
    <button class="play"><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg></button>
  </div>
  <div class="qcard">
    <img src="https://picsum.photos/seed/3/48" alt="" />
    <span>Chill Vibes</span>
    <button class="play"><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg></button>
  </div>
  <div class="qcard">
    <img src="https://picsum.photos/seed/4/48" alt="" />
    <span>Top Hits 2024</span>
    <button class="play"><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg></button>
  </div>
</div>

----

2. Horizontal Carousel Cards
A section header with an optional small gray eyebrow label (12px) above a bold white title (24px, 700) and a gray uppercase "Show all" link pushed to the right. Below is a horizontally scrollable row (no scrollbar) of cards. Each card is ~178px wide, dark background (#181818), border-radius: 6px, padding: 12px, with a square 1:1 image, a white title, and a gray subtitle. On hover, the background darkens and a 48×48px green play button slides up from the bottom-right of the image.

<style>
  .section { display: flex; flex-direction: column; gap: 8px; }
  .section-header { display: flex; align-items: flex-end; justify-content: space-between; }
  .section-header h2 { font-size: 24px; font-weight: 700; color: #fff; }
  .section-header a { font-size: 14px; font-weight: 700; color: #b3b3b3; text-transform: uppercase; letter-spacing: 0.08em; text-decoration: none; }
  .carousel { display: grid; grid-auto-flow: column; grid-auto-columns: 178px; gap: 16px; overflow-x: auto; scrollbar-width: none; }
  .carousel::-webkit-scrollbar { display: none; }
  .card { background: #181818; border-radius: 6px; padding: 12px; display: flex; flex-direction: column; gap: 12px; cursor: pointer; transition: background 0.3s; }
  .card:hover { background: #282828; }
  .card:hover .card-play { opacity: 1; transform: translateY(0); }
  .card-img { position: relative; width: 100%; aspect-ratio: 1/1; border-radius: 6px; overflow: hidden; background: #333; }
  .card-img img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .card-play { position: absolute; bottom: 8px; right: 8px; width: 48px; height: 48px; border-radius: 50%; background: #1ed760; border: none; display: flex; align-items: center; justify-content: center; opacity: 0; transform: translateY(8px); transition: transform 0.3s, opacity 0.3s; box-shadow: 0 8px 8px rgba(0,0,0,0.3); cursor: pointer; }
  .card-play svg { width: 20px; height: 20px; fill: #000; margin-left: 3px; }
  .card p { font-size: 16px; color: #fff; overflow: hidden; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; }
  .card span { font-size: 14px; color: #b3b3b3; overflow: hidden; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; }
</style>

<div class="section">
  <div class="section-header">
    <h2>Made For You</h2>
    <a href="#">Show all</a>
  </div>
  <div class="carousel">
    <div class="card">
      <div class="card-img">
        <img src="https://picsum.photos/seed/c1/300" alt="" />
        <button class="card-play"><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg></button>
      </div>
      <p>Daily Mix 1</p>
      <span>Drake, Travis Scott and more</span>
    </div>
    <div class="card">
      <div class="card-img">
        <img src="https://picsum.photos/seed/c2/300" alt="" />
        <button class="card-play"><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg></button>
      </div>
      <p>Daily Mix 2</p>
      <span>Bad Bunny, J Balvin and more</span>
    </div>
    <div class="card">
      <div class="card-img">
        <img src="https://picsum.photos/seed/c3/300" alt="" />
        <button class="card-play"><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg></button>
      </div>
      <p>Daily Mix 3</p>
      <span>Coldplay, Dua Lipa and more</span>
    </div>
    <div class="card">
      <div class="card-img">
        <img src="https://picsum.photos/seed/c4/300" alt="" />
        <button class="card-play"><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg></button>
      </div>
      <p>Daily Mix 4</p>
      <span>Kendrick, J. Cole and more</span>
    </div>
  </div>
</div>

----

3. Big Featured Card
A tall portrait card filling most of the panel width with a 3:4 aspect ratio. The background is a full-bleed image. Two gradient overlays sit on top — one fading black down from the top, one fading black up from the bottom — keeping text readable on both ends. At the bottom: a small 96×96px playlist thumbnail sits next to the type label (12px gray uppercase), a large bold title (32px, white), and a creator name (14px gray). Below that is a short description in semi-transparent white and a row with a translucent pill "Preview" button and a three-dot more button. This is a gallery of big cards

<style>
  .fcard { position: relative; border-radius: 8px; overflow: hidden; width: 100%; aspect-ratio: 3/4; display: flex; flex-direction: column; justify-content: flex-end; padding: 24px; cursor: pointer; }
  .fcard-bg { position: absolute; inset: 0; }
  .fcard-bg img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .fcard-grad-t { position: absolute; inset: 0; background: linear-gradient(rgba(0,0,0,.6) 0%, rgba(0,0,0,0) 50%); pointer-events: none; }
  .fcard-grad-b { position: absolute; inset: 0; background: linear-gradient(rgba(0,0,0,0) 47%, rgba(0,0,0,.6) 100%); pointer-events: none; }
  .fcard-body { position: relative; z-index: 1; display: flex; flex-direction: column; gap: 12px; }
  .fcard-header { display: flex; align-items: flex-end; gap: 16px; }
  .fcard-thumb { width: 96px; height: 96px; border-radius: 4px; overflow: hidden; flex-shrink: 0; }
  .fcard-thumb img { width: 100%; height: 100%; object-fit: cover; }
  .fcard-label { font-size: 12px; font-weight: 700; color: #b3b3b3; text-transform: uppercase; letter-spacing: 0.08em; }
  .fcard-title { font-size: 32px; font-weight: 700; color: #fff; line-height: 1.1; }
  .fcard-creator { font-size: 14px; color: #b3b3b3; }
  .fcard-desc { font-size: 14px; color: rgba(255,255,255,0.7); line-height: 1.5; }
  .fcard-controls { display: flex; align-items: center; justify-content: space-between; }
  .btn-preview { height: 32px; padding: 4px 16px; border-radius: 9999px; background: rgba(0,0,0,0.54); border: 1px solid rgba(255,255,255,0.15); color: #fff; font-size: 14px; font-weight: 700; cursor: pointer; }
  .btn-more { width: 32px; height: 32px; border-radius: 50%; background: none; border: none; color: #b3b3b3; cursor: pointer; font-size: 20px; line-height: 1; }
</style>

<div class="fcard">
  <div class="fcard-bg"><img src="https://picsum.photos/seed/big1/600/800" alt="" /></div>
  <div class="fcard-grad-t"></div>
  <div class="fcard-grad-b"></div>
  <div class="fcard-body">
    <div class="fcard-header">
      <div class="fcard-thumb"><img src="https://picsum.photos/seed/big1t/96" alt="" /></div>
      <div>
        <div class="fcard-label">Playlist · Spotify</div>
        <div class="fcard-title">Radio Bad Bunny</div>
        <div class="fcard-creator">Spotify</div>
      </div>
    </div>
    <p class="fcard-desc">With Cosculluela, Plan B, Daddy Yankee and more</p>
    <div class="fcard-controls">
      <button class="btn-preview">▶ Preview</button>
      <button class="btn-more">···</button>
    </div>
  </div>
</div>
import { experiences, heroImage, regions, supporters, wishOptions } from "../data.js";
import { filterExperiences } from "../logic.js";

const wishLines = {
  relax: ["のんびり", "過ごしたい"],
  connect: ["地域の人と", "交流したい"],
  cooking: ["郷土料理を", "教わりたい"],
  farm: ["農業や収穫を", "体験したい"],
  festival: ["地域のお祭りに", "参加したい"],
  outdoor: ["自然やアウトドアを", "楽しみたい"],
};

function WishIcon({ id }) {
  const stroke = { fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" };
  return (
    <svg className="wish-icon" viewBox="0 0 32 32" aria-hidden="true">
      {id === "relax" && (
        <>
          <circle cx="16" cy="13" r="4" {...stroke} />
          <path d="M16 6v2M16 18v2M9 13H7M25 13h-2M10 8l1.5 1.5M22 18l-1.5-1.5M22 8l-1.5 1.5M10 18l1.5-1.5" {...stroke} />
        </>
      )}
      {id === "connect" && (
        <>
          <circle cx="11" cy="12" r="3" {...stroke} />
          <circle cx="21" cy="12" r="3" {...stroke} />
          <path d="M6 23c1-3 3-4 5-4s4 1 5 4M16 23c1-3 3-4 5-4s4 1 5 4" {...stroke} />
        </>
      )}
      {id === "cooking" && (
        <>
          <path d="M10 16h12v6a6 6 0 0 1-12 0z" {...stroke} />
          <path d="M13 16c0-3 6-3 6 0M8 16h16" {...stroke} />
        </>
      )}
      {id === "farm" && (
        <>
          <path d="M16 24V14" {...stroke} />
          <path d="M16 18c-4-1-6-4-6-7 4 1 6 4 6 7zM16 16c4-1 6-4 6-7-4 1-6 4-6 7z" {...stroke} />
        </>
      )}
      {id === "festival" && (
        <>
          <path d="M16 6v4" {...stroke} />
          <rect x="11" y="10" width="10" height="12" rx="4" {...stroke} />
          <path d="M13 22h6" {...stroke} />
        </>
      )}
      {id === "outdoor" && (
        <>
          <path d="M4 24 L12 12 L16 18 L22 8 L28 24 Z" {...stroke} />
          <path d="M4 24h24" {...stroke} />
        </>
      )}
    </svg>
  );
}

export default function Match({ wishId, onWish, onOpen }) {
  const visible = filterExperiences(experiences, wishId);

  return (
    <div>
      <section className="hero">
        <p className="brand">第二のふるさと</p>
        <h1>
          旅先が、
          <br />
          帰る場所になる。
        </h1>
        <p className="hero-lead">地域の人と過ごした時間が、もう一度帰る理由になります。</p>
        <img src={heroImage} alt="" />
      </section>
      <h2>体験を探す</h2>
      <div className="wish-grid">
        {wishOptions.map((item) => (
          <button
            key={item.id}
            type="button"
            className="wish-card"
            aria-pressed={wishId === item.id}
            onClick={() => onWish(wishId === item.id ? "" : item.id)}
          >
            <WishIcon id={item.id} />
            <strong>
              {wishLines[item.id].map((line) => (
                <span key={line} className="wish-line">
                  {line}
                </span>
              ))}
            </strong>
            <small>{item.note}</small>
            {wishId === item.id && <span className="picked">選択中</span>}
          </button>
        ))}
      </div>
      {visible.length === 0 ? (
        <p className="empty">別の希望を選んでください。</p>
      ) : (
        <ul className="list">
          {visible.map((item) => {
            const region = regions.find((entry) => entry.id === item.regionId);
            const supporter = supporters.find((person) => person.id === item.supporterId);
            return (
              <li key={item.id}>
                <button type="button" className="card" onClick={() => onOpen(item.id)}>
                  <img className="scene" src={item.image} alt="" />
                  <div className="card-body">
                    <p className="place">
                      {region?.prefecture} {region?.name}
                    </p>
                    <h3>{item.title}</h3>
                    <p>{item.summary}</p>
                    <div className="hostline">
                      <img className="avatar" src={supporter?.portrait} alt="" />
                      <span>{supporter?.name}と過ごす</span>
                    </div>
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

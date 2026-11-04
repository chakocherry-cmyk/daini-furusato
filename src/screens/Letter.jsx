import { experiences, regions, supporters } from "../data.js";
import { hasWish, waitingNotes } from "../logic.js";

export default function Letter({ letters, state, joinedCount, onWish, onOpen, onFind }) {
  const waiting = waitingNotes(state, experiences);

  return (
    <div>
      <h1>おかえり</h1>
      <p className="lead">
        会った人から、
        <br />
        次に一緒にしたいことが届きます。
      </p>
      {letters.length === 0 ? (
        <section className="letter">
          <p className="meta">招待状</p>
          <h2 className="letter-message">
            {joinedCount > 0 ? "便りは、もう少し先です。" : "まだ、便りはありません。"}
          </h2>
          {joinedCount > 0 ? (
            <>
              <p>参加の記録はあります。</p>
              <ul className="plain">
                {waiting.map((item) => (
                  <li key={item.experienceId}>
                    {item.title}は、季節を{item.remain}か月進めると届きます。
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p>人と会う体験を見つけると、季節が来たときに招待状が届きます。</p>
          )}
          {joinedCount === 0 && (
            <button type="button" className="button" onClick={onFind}>
              体験を探す
            </button>
          )}
        </section>
      ) : (
        <ul className="list">
          {letters.map((letter) => {
            const region = regions.find((item) => item.id === letter.regionId);
            const supporter = supporters.find((item) => item.id === letter.supporterId);
            const wished = hasWish(state, letter.experienceId, letter.nextTitle);
            const from = `${region?.name ?? ""}の${supporter?.name ?? ""}より`;
            const portrait = letter.portrait || supporter?.portrait;
            return (
              <li key={letter.experienceId} className="letter">
                <img className="letter-hero" src={letter.albumImage} alt="" />
                <div className="letter-from">
                  <img
                    className={letter.portraitPosition ? "letter-face" : ""}
                    src={portrait}
                    alt=""
                    style={letter.portraitPosition ? { objectPosition: letter.portraitPosition } : undefined}
                  />
                  <div>
                    <p className="meta">招待状</p>
                    <p className="from">{from}</p>
                  </div>
                </div>
                <h2 className="letter-message">
                  {letter.headline || `「${letter.message}」`}
                </h2>
                <p className="meta prev-label">前回の思い出</p>
                <p className="prev-title">{letter.title}</p>
                <p className="next-line">
                  {letter.headline ? letter.message : `次の体験: ${letter.nextTitle}`}
                </p>
                {letter.headline && <p className="next-line">次は「{letter.nextTitle}」</p>}
                {wished ? (
                  <p className="done">再訪予定に入れました</p>
                ) : (
                  <button type="button" className="button" onClick={() => onWish(letter)}>
                    また会いに行きたい
                  </button>
                )}
                <button type="button" className="text-button" onClick={() => onOpen(letter.experienceId)}>
                  体験の詳細を見る
                </button>
              </li>
            );
          })}
        </ul>
      )}
      {letters.length > 0 && waiting.length > 0 && (
        <section className="letter">
          <p className="meta">まだ届いていない便り</p>
          <ul className="plain">
            {waiting.map((item) => (
              <li key={item.experienceId}>
                {item.title}は、季節を{item.remain}か月進めると届きます。
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}

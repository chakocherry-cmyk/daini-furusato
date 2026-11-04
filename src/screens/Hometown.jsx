import { experiences, regions, supporters } from "../data.js";
import { albumImageOf, hasWish, monthsRemaining, seasonLabel } from "../logic.js";

function joinedMemories(state) {
  return state.joined
    .map((item) => {
      const experience = experiences.find((entry) => entry.id === item.experienceId);
      if (!experience) return null;
      const remain = monthsRemaining(state, experience, item.atMonth);
      return {
        atMonth: item.atMonth,
        experience,
        region: regions.find((entry) => entry.id === experience.regionId),
        supporter: supporters.find((entry) => entry.id === experience.supporterId),
        wished: hasWish(state, experience.id, experience.invitation.nextTitle),
        saved: state.hometownIds.includes(experience.regionId),
        remain,
      };
    })
    .filter(Boolean);
}

function MemoryBody({ memory }) {
  return (
    <>
      <h2>{memory.experience.title}</h2>
      <p className="with-person">{memory.supporter?.name}と過ごした</p>
      <p className="meta">記録した季節: {seasonLabel(memory.atMonth)}</p>
      <p className="next-line">次に体験できること: {memory.experience.invitation.nextTitle}</p>
      <p className="meta">
        {memory.remain > 0 ? `招待状: あと${memory.remain}か月` : "招待状: 届いています"}
      </p>
      <p className={memory.wished ? "done" : "meta"}>
        {memory.wished ? "再訪希望: 登録済み" : "再訪希望: まだです"}
      </p>
    </>
  );
}

export default function Hometown({ state, onFind }) {
  const memories = joinedMemories(state);
  const joinedRegionIds = new Set(memories.map((memory) => memory.region?.id));
  const registeredOnly = state.hometownIds
    .filter((id) => !joinedRegionIds.has(id))
    .map((id) => regions.find((region) => region.id === id))
    .filter(Boolean);

  if (memories.length === 0 && registeredOnly.length === 0) {
    return (
      <div>
        <h1>私の第二のふるさと</h1>
        <p className="lead">また帰りたくなる、旅のアルバムです。</p>
        <section className="album-empty">
          <p className="meta">旅のアルバム</p>
          <h2>まだ、ページはありません。</h2>
          <p>体験して気に入った地域を残すと、ここに一枚の思い出になります。</p>
          <button type="button" className="button" onClick={onFind}>
            体験を探す
          </button>
        </section>
      </div>
    );
  }

  return (
    <div>
      <h1>私の第二のふるさと</h1>
      <p className="lead">また帰りたくなる、旅のアルバムです。</p>
      <ul className="list">
        {registeredOnly.map((region) => {
          const sample = experiences.find((item) => item.regionId === region.id);
          return (
            <li key={region.id} className="album">
              {sample && <img className="memory" src={albumImageOf(sample)} alt="" />}
              <div className="album-body">
                <p className="ribbon">第二のふるさと</p>
                <p className="place">
                  {region.prefecture} {region.name}
                </p>
                <p>{region.lead}</p>
                <p className="meta">参加した体験は、まだありません。</p>
              </div>
            </li>
          );
        })}
        {memories.map((memory) => (
          <li key={memory.experience.id} className="album">
            <img className="memory" src={albumImageOf(memory.experience)} alt="" />
            <div className="album-body">
              {memory.saved && <p className="ribbon">第二のふるさと</p>}
              <p className="place">
                {memory.region?.prefecture} {memory.region?.name}
              </p>
              <MemoryBody memory={memory} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

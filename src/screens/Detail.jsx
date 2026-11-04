import { albumImageOf } from "../logic.js";

export default function Detail({
  experience,
  region,
  supporter,
  joined,
  registered,
  onJoin,
  onRegister,
  onBack,
}) {
  return (
    <div>
      <button type="button" className="text-button back" onClick={onBack}>
        一覧へ戻る
      </button>
      <img className="hero-image" src={albumImageOf(experience)} alt="" />
      <p className="place">
        {region?.prefecture} {region?.name}
      </p>
      <h1>{experience.title}</h1>
      <section className="host-feature">
        <img src={supporter?.portrait} alt="" />
        <div>
          <p className="meta">この体験の人</p>
          <h2>{supporter?.name}</h2>
          <p className="meta">{supporter?.role}</p>
          <blockquote>{supporter?.message}</blockquote>
        </div>
      </section>
      <h2>体験の内容</h2>
      <p>{experience.body}</p>
      <section className="next-visit">
        <p className="meta">また会うとき</p>
        <h2>{experience.invitation.nextTitle}</h2>
        {experience.invitation.headline && <p>{experience.invitation.headline}</p>}
        <p>{experience.invitation.message}</p>
        <p className="meta">参加から{experience.invitation.afterMonths}か月後に届きます。</p>
      </section>
      <h2>参加条件</h2>
      <ul className="conditions">
        {experience.conditions.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <div className="actions">
        <button type="button" className="button" onClick={onJoin} disabled={joined}>
          {joined ? "参加済み" : "参加済みにする"}
        </button>
        <button type="button" className="button secondary" onClick={onRegister} disabled={registered}>
          {registered ? "登録済み" : "第二のふるさとに登録する"}
        </button>
      </div>
    </div>
  );
}

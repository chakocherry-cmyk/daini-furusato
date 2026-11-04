import { useMemo, useState } from "react";
import { experiences, regions, supporters } from "./data.js";
import { hasWish, initialState, invitationsFor, seasonLabel } from "./logic.js";
import { clearState, loadState, saveState } from "./storage.js";
import Detail from "./screens/Detail.jsx";
import Hometown from "./screens/Hometown.jsx";
import Letter from "./screens/Letter.jsx";
import Match from "./screens/Match.jsx";

export default function App() {
  const [state, setState] = useState(loadState);
  const [view, setView] = useState("match");
  const [selectedId, setSelectedId] = useState(null);
  const [wishId, setWishId] = useState("");

  function commit(next) {
    saveState(next);
    setState(next);
  }

  function join(experienceId) {
    commit({
      ...state,
      joined: state.joined.some((item) => item.experienceId === experienceId)
        ? state.joined
        : [...state.joined, { experienceId, atMonth: state.demoMonth }],
    });
  }

  function registerHometown(regionId) {
    commit({
      ...state,
      hometownIds: state.hometownIds.includes(regionId)
        ? state.hometownIds
        : [...state.hometownIds, regionId],
    });
  }

  function advance() {
    commit({ ...state, demoMonth: state.demoMonth + 3 });
  }

  function addWish(letter) {
    if (hasWish(state, letter.experienceId, letter.nextTitle)) return;
    commit({
      ...state,
      wishes: [
        ...state.wishes,
        { experienceId: letter.experienceId, title: letter.nextTitle, atMonth: state.demoMonth },
      ],
    });
  }

  function reset() {
    clearState();
    setState(initialState);
    setView("match");
    setSelectedId(null);
    setWishId("");
  }

  function openExperience(experienceId) {
    setSelectedId(experienceId);
    setView("detail");
  }

  const selected = experiences.find((item) => item.id === selectedId) ?? null;
  const letters = useMemo(() => invitationsFor(state, experiences), [state]);

  return (
    <div className="app">
      <div className="demo-bar">
        <p>旅の季節: {seasonLabel(state.demoMonth)}</p>
        <div className="demo-actions">
          <button type="button" className="button small" onClick={advance}>
            3か月進める
          </button>
          <button type="button" className="text-button" onClick={reset}>
            デモを最初から
          </button>
        </div>
      </div>
      <main>
        {view === "match" && (
          <Match wishId={wishId} onWish={setWishId} onOpen={openExperience} />
        )}
        {view === "detail" && selected && (
          <Detail
            experience={selected}
            region={regions.find((item) => item.id === selected.regionId)}
            supporter={supporters.find((item) => item.id === selected.supporterId)}
            joined={state.joined.some((item) => item.experienceId === selected.id)}
            registered={state.hometownIds.includes(selected.regionId)}
            onJoin={() => join(selected.id)}
            onRegister={() => registerHometown(selected.regionId)}
            onBack={() => setView("match")}
          />
        )}
        {view === "hometown" && <Hometown state={state} onFind={() => setView("match")} />}
        {view === "letter" && (
          <Letter
            letters={letters}
            state={state}
            joinedCount={state.joined.length}
            onWish={addWish}
            onOpen={openExperience}
            onFind={() => setView("match")}
          />
        )}
      </main>
      <nav className="nav">
        <button
          type="button"
          aria-current={view === "match" || view === "detail" ? "page" : undefined}
          onClick={() => setView("match")}
        >
          探す
        </button>
        <button
          type="button"
          aria-current={view === "hometown" ? "page" : undefined}
          onClick={() => setView("hometown")}
        >
          ふるさと
        </button>
        <button
          type="button"
          aria-current={view === "letter" ? "page" : undefined}
          onClick={() => setView("letter")}
        >
          おかえり
          {letters.length > 0 && <span className="badge">{letters.length}</span>}
        </button>
      </nav>
    </div>
  );
}

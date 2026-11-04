export const initialState = {
  demoMonth: 0,
  joined: [],
  hometownIds: [],
  wishes: [],
};

export function seasonLabel(demoMonth) {
  if (!demoMonth) return "はじまり";
  return `${demoMonth}か月後`;
}

export function filterExperiences(experiences, wishId) {
  if (!wishId) return experiences;
  return experiences.filter((item) => item.wishes.includes(wishId));
}

export function monthsRemaining(state, experience, atMonth) {
  if (!experience?.invitation) return null;
  return experience.invitation.afterMonths - (state.demoMonth - atMonth);
}

export function albumImageOf(experience) {
  return experience?.albumImage || experience?.image || "";
}

export function invitationsFor(state, experiences) {
  return state.joined
    .map((join) => {
      const experience = experiences.find((item) => item.id === join.experienceId);
      if (!experience?.invitation) return null;
      if (monthsRemaining(state, experience, join.atMonth) > 0) return null;
      return {
        experienceId: experience.id,
        regionId: experience.regionId,
        supporterId: experience.supporterId,
        title: experience.title,
        headline: experience.invitation.headline || "",
        message: experience.invitation.message,
        nextTitle: experience.invitation.nextTitle,
        albumImage: albumImageOf(experience),
        portrait: experience.invitation.portrait || "",
        portraitPosition: experience.invitation.portraitPosition || "",
      };
    })
    .filter(Boolean);
}

export function waitingNotes(state, experiences) {
  return state.joined
    .map((join) => {
      const experience = experiences.find((item) => item.id === join.experienceId);
      const remain = monthsRemaining(state, experience, join.atMonth);
      if (remain == null || remain <= 0) return null;
      return { experienceId: experience.id, title: experience.title, remain };
    })
    .filter(Boolean);
}

export function hasWish(state, experienceId, title) {
  return state.wishes.some((item) => item.experienceId === experienceId && item.title === title);
}

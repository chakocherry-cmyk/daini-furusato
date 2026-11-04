export const wishOptions = [
  { id: "relax", label: "のんびり過ごしたい", note: "静かな時間を過ごす" },
  { id: "connect", label: "地域の人と交流したい", note: "会話のある滞在" },
  { id: "cooking", label: "郷土料理を教わりたい", note: "家庭の味を教わる" },
  { id: "farm", label: "農業や収穫を体験したい", note: "畑で一緒に収穫" },
  { id: "festival", label: "地域のお祭りに参加したい", note: "祭りの準備に入る" },
  { id: "outdoor", label: "自然やアウトドアを楽しみたい", note: "海や山を歩く" },
];

export const regions = [
  {
    id: "okinawa",
    name: "沖縄本島",
    prefecture: "沖縄県",
    lead: "家庭の台所と、島の畑や海辺がある土地です。",
  },
  {
    id: "hida",
    name: "飛騨高山",
    prefecture: "岐阜県",
    lead: "朝市と祭りが、暮らしのリズムになっている町です。",
  },
];

function publicAsset(file) {
  return `${import.meta.env.BASE_URL}${file}`;
}

export const heroImage = publicAsset("images/hero-goya-champuru.jpg");

export const supporters = [
  {
    id: "obaa",
    regionId: "okinawa",
    name: "おばぁ",
    role: "家庭料理の先生",
    message: "うまくできなくていいよ。一緒に食べられたら、それで十分。",
    portrait: publicAsset("images/obaa.svg"),
  },
  {
    id: "farm",
    regionId: "okinawa",
    name: "農園の健さん",
    role: "島野菜の農家",
    message: "今朝採れたものが、いちばんおいしい。",
    portrait: publicAsset("images/farm.svg"),
  },
  {
    id: "hidaPerson",
    regionId: "hida",
    name: "朝市の佐藤さん",
    role: "朝市と祭りの案内人",
    message: "見るだけより、手伝った方が町のことが分かります。",
    portrait: publicAsset("images/hida.svg"),
  },
];

export const experiences = [
  {
    id: "oki-cooking",
    regionId: "okinawa",
    supporterId: "obaa",
    title: "おばぁと作る家庭料理",
    wishes: ["cooking", "connect"],
    summary: "沖縄の家庭の台所で、日常の料理を一緒に作ります。",
    body: "観光コースにはない、家庭の昼ごはんを作ります。おばぁのペースで、野菜の下ごしらえから始めます。",
    conditions: ["所要時間の目安は3時間", "少人数で行います", "エプロンは現地にあります"],
    image: publicAsset("images/oki-cooking.svg"),
    albumImage: heroImage,
    invitation: {
      afterMonths: 3,
      headline: "また一緒に料理を作ろうね",
      message: "今度は沖縄そばを一緒に作ろうね",
      nextTitle: "おばぁと作る沖縄そば",
      portrait: heroImage,
      portraitPosition: "18% 32%",
    },
  },
  {
    id: "oki-farm",
    regionId: "okinawa",
    supporterId: "farm",
    title: "島野菜の収穫",
    wishes: ["farm"],
    summary: "朝の畑で、島野菜を収穫します。",
    body: "農家の人と畝を歩き、その日に食べる分を摘みます。",
    conditions: ["所要時間の目安は2時間", "動きやすい服装", "雨の日は相談して決めます"],
    image: publicAsset("images/oki-farm.svg"),
    invitation: {
      afterMonths: 2,
      message: "次は収穫した野菜で、簡単な料理をしよう。",
      nextTitle: "収穫野菜の調理",
    },
  },
  {
    id: "oki-sea",
    regionId: "okinawa",
    supporterId: "obaa",
    title: "海辺の朝",
    wishes: ["relax", "outdoor"],
    summary: "人が少ない時間に、海を見ながら歩きます。",
    body: "案内人と海岸を歩き、島の朝の過ごし方を聞きます。",
    conditions: ["所要時間の目安は1時間半", "歩きやすい靴", "日焼け対策があると安心です"],
    image: publicAsset("images/oki-sea.svg"),
    invitation: {
      afterMonths: 2,
      message: "次は夕方の干潟を見に来てね。",
      nextTitle: "夕方の干潟歩き",
    },
  },
  {
    id: "hida-market",
    regionId: "hida",
    supporterId: "hidaPerson",
    title: "朝市の手伝い",
    wishes: ["connect"],
    summary: "開店前の朝市で、品出しを手伝います。",
    body: "店の人と並んで野菜を並べ、通りがかる人にあいさつします。",
    conditions: ["朝早い集合です", "所要時間の目安は2時間", "室内と屋外を行き来します"],
    image: publicAsset("images/hida-market.svg"),
    invitation: {
      afterMonths: 2,
      message: "次は仕込みの朝に来てください。",
      nextTitle: "朝市の仕込み",
    },
  },
  {
    id: "hida-festival",
    regionId: "hida",
    supporterId: "hidaPerson",
    title: "秋祭りの準備",
    wishes: ["festival"],
    summary: "祭りの前日に、飾り付けを手伝います。",
    body: "町の人と提灯や屋台の準備をします。見る側ではなく、準備する側として参加します。",
    conditions: ["開催は秋です", "所要時間の目安は半日", "動きやすい服装"],
    image: publicAsset("images/hida-festival.svg"),
    invitation: {
      afterMonths: 3,
      message: "次の祭りも、準備から一緒にどうですか。",
      nextTitle: "次の祭りの準備",
    },
  },
];

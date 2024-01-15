const determiners = [
  '예쁜',
  '화난',
  '귀여운',
  '배고픈',
  '철학적인',
  '현학적인',
  '슬픈',
  '푸른',
  '비싼',
  '밝은',
];

const animals = [
  '호랑이',
  '비버',
  '강아지',
  '부엉이',
  '여우',
  '치타',
  '문어',
  '고양이',
  '미어캣',
  '다람쥐',
];

const titleRandom = [
  '냥집사 🐈 100일 그림일기 ',
  '그림책 필사',
  '기록 수집',
  '배고픈',
  '철학적인',
  '현학적인',
  '365 드로잉',
  'VUE는 너무 뷰해~',
  '나는 취업마려워 ',
  '밝은척하는 나',
];
const contentRandom = [
  '코딩 마스터 되기 🚀',
  '여행 다녀오기 ✈️',
  '맛있는 음식 만들기 🍲',
  '우주 탐험하기 🚀🌌',
  '피아노 연주하기 🎹',
  '헬스장 다니기 💪',
  '책 읽기 📚',
  '그림 그리기 🎨',
  '코딩 공부하기 💻',
  '다양한 언어 배우기 🌍',
];
// 랜덤한 날짜 생성
function generateRandomDate() {
  const startDate = new Date(); // 현재 날짜를 기준으로 함
  const endDate = new Date();
  endDate.setDate(startDate.getDate() + Math.floor(Math.random() * 30)); // 30일 이내의 랜덤한 날짜 생성

  const randomDate = new Date(
    startDate.getTime() +
      Math.random() * (endDate.getTime() - startDate.getTime())
  );

  return randomDate;
}

// 날짜를 "n월nn일 n요일" 형식으로 포맷팅
function formatRandomDate(date: any) {
  const months = [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월',
  ];
  const days = [
    '일요일',
    '월요일',
    '화요일',
    '수요일',
    '목요일',
    '금요일',
    '토요일',
  ];

  const month = months[date.getMonth()];
  const dayOfMonth = date.getDate();
  const dayOfWeek = days[date.getDay()];

  return `${month}${dayOfMonth}일 ${dayOfWeek}`;
}

// 랜덤한 날짜 생성
const randomDate = generateRandomDate();

// 포맷팅된 결과 출력
const formattedDate = formatRandomDate(randomDate);

export const dummyUsersFn = () => {
  const dummyUsers = [];

  for (let i = 0; i < 20; i++) {
    const user = {
      id: i,
      photoURL: 'https://source.unsplash.com/user/USERNAME',
      displayName:
        determiners[Math.floor(Math.random() * determiners.length)] +
        animals[Math.floor(Math.random() * animals.length)],
      followersCount: Math.floor(Math.random() * 200),
      postCount: Math.floor(Math.random() * 20),
    };

    dummyUsers.push(user);
  }

  return dummyUsers;
};

export const dummyPostsFn = () => {
  const dummyPosts = [];

  for (let i = 0; i < 20; i++) {
    const post = {
      id: i,
      title: titleRandom[Math.floor(Math.random() * titleRandom.length)],
      content: contentRandom[Math.floor(Math.random() * contentRandom.length)],
      fileUrl: 'https://picsum.photos/id/237/200/300',
      likeCount: Math.floor(Math.random() * 200),
      commentCount: Math.floor(Math.random() * 200),
      date: formattedDate,
      user: {
        photoURL: 'https://source.unsplash.com/user/USERNAME',
        displayName:
          determiners[Math.floor(Math.random() * determiners.length)] +
          animals[Math.floor(Math.random() * animals.length)],
      },
    };

    dummyPosts.push(post);
  }

  return dummyPosts;
};

export const MOCK_USER = {
  id: 11,
  userInfos: {
    firstName: 'Werner',
    lastName: 'Schmid',
    age: 25,
  },
  todayScore: 0.4,
  keyData: {
    calorieCount: 2100,
    proteinCount: 123,
    carbohydrateCount: 234,
    lipidCount: 43,
  },
};

export const MOCK_ACTIVITY = {
  userId: 11,
  sessions: [
    {
      day: '2022-02-06',
      kilogram: 95,
      calories: 224,
    },
    {
      day: '2022-02-07',
      kilogram: 95,
      calories: 200,
    },
    {
      day: '2022-02-08',
      kilogram: 93,
      calories: 180,
    },
    {
      day: '2022-02-09',
      kilogram: 94,
      calories: 210,
    },
    {
      day: '2022-02-10',
      kilogram: 95,
      calories: 220,
    },
    {
      day: '2022-02-11',
      kilogram: 94,
      calories: 300,
    },
    {
      day: '2022-02-12',
      kilogram: 93,
      calories: 410,
    },
  ],
};

export const MOCK_AVERAGE_SESSIONS = {
  userId: 11,
  sessions: [
    {
      day: 1,
      sessionLength: 45,
    },
    {
      day: 2,
      sessionLength: 60,
    },
    {
      day: 3,
      sessionLength: 90,
    },
    {
      day: 4,
      sessionLength: 55,
    },
    {
      day: 5,
      sessionLength: 15,
    },
    {
      day: 6,
      sessionLength: 30,
    },
    {
      day: 7,
      sessionLength: 80,
    },
  ],
};

export const MOCK_PERFORMANCE = {
  userId: 11,
  kind: {
    1: 'cardio',
    2: 'energy',
    3: 'endurance',
    4: 'strength',
    5: 'speed',
    6: 'intensity',
  },
  data: [
    {
      value: 120,
      kind: 1,
    },
    {
      value: 80,
      kind: 2,
    },
    {
      value: 135,
      kind: 3,
    },
    {
      value: 70,
      kind: 4,
    },
    {
      value: 180,
      kind: 5,
    },
    {
      value: 75,
      kind: 6,
    },
  ],
};

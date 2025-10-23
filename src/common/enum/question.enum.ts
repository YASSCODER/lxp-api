export const QuestionType = {
  // 1- this question is used !
  Q_PRIMARY_FUNCTIONALITY: {
    key: 'Q_PRIMARY_FUNCTIONALITY',
    text: { en: 'What is your primary role?', ar: 'ما هي دورك الأساسي؟' },
  },

  // 2- this question is used !
  Q_SENIORITY_LEVEL: {
    key: 'Q_SENIORITY_LEVEL',
    text: { en: 'What is your seniority level?', ar: 'ما هي مستوى خبرتك؟' },
  },

  // 3- this question is used !
  Q_TARGET_TRACK: {
    key: 'Q_TARGET_TRACK',
    text: {
      en: 'Which learning track are you training ?',
      ar: 'ما هي مسار التعلم الذي تتدرب عليه؟',
    },
  },

  Q_BASE_LINE_LEVEL: {
    key: 'Q_BASE_LINE_LEVEL',
    text: {
      en: 'What is your base line level?',
      ar: 'ما هي مستوى الأساس الخاص بك؟',
    },
  },

  // 4- this question is used !
  Q_PRIMARY_GOAL: {
    key: 'Q_PRIMARY_GOAL',
    text: {
      en: 'What is you primary goal for this Journey?',
      ar: 'ما هي الغاية الرئيسية لهذا الرحلة؟',
    },
  },

  Q_GOAL_TIMEFRAME: {
    key: 'Q_GOAL_TIMEFRAME',
    text: {
      en: 'What is the timeframe for your goal?',
      ar: 'ما هو الوقت المتوقع لتحقيق الغاية الخاصة بك؟',
    },
  },

  // 5- this question is used !
  Q_SUCCESS_METRIC: {
    key: 'Q_SUCCESS_METRIC',
    text: {
      en: 'What is the success metric for your goal?',
      ar: 'ما هي مقياس النجاح الخاص بالغاية الخاصة بك؟',
    },
  },

  Q_FORMAT_PREFERENCE: {
    key: 'Q_FORMAT_PREFERENCE',
    text: {
      en: 'What is your preferred format for learning?',
      ar: 'ما هي الطريقة المفضلة لتعلمك؟',
    },
  },

  Q_ACCOUNTABILITY: {
    key: 'Q_ACCOUNTABILITY',
    text: {
      en: 'What is your Preferred accountability style ?',
      ar: 'ما هي الطريقة المفضلة للمسؤولية؟',
    },
  },

  // 6- this question is used !
  Q_WEEKLY_TIME_BUDGET: {
    key: 'Q_WEEKLY_TIME_BUDGET',
    text: {
      en: 'Hhow many hours per week can you dedicate to your learning?',
      ar: 'كم ساعة في الأسبوع يمكنك التخصص لتعلمك؟',
    },
  },

  Q_COMP_BAND_MONTHLY_SAR: {
    key: 'Q_COMP_BAND_MONTHLY_SAR',
    text: {
      en: 'Define your current compensation band and monthly salary in Saudi Riyal',
      ar: 'حدد نطاق التعويض الحالي والراتب الشهري بالريال السعودي',
    },
  },

  Q_EXPECTED_RAISE_PCT: {
    key: 'Q_EXPECTED_RAISE_PCT',
    text: {
      en: 'What is your expected raise percentage after goal is achieved a?',
      ar: 'ما هو النسبة المتوقعة للزيادة الشهرية بعد تحقيق الغاية الخاصة بك؟',
    },
  },

  Q_PRODUCTIVITY_GAIN_PCT: {
    key: 'Q_PRODUCTIVITY_GAIN_PCT',
    text: {
      en: 'What is the expected productivity gain percentage after goal is achieved ?',
      ar: 'ما هو النسبة المتوقعة للزيادة الشهرية بعد تحقيق الغاية الخاصة بك؟',
    },
  },

  Q_TIME_VALUE_HOURLY_SAR: {
    key: 'Q_TIME_VALUE_HOURLY_SAR',
    text: {
      en: 'What is your approximate hourly rate in Saudi Riyal?',
      ar: 'ما هي النسبة المتوقعة للزيادة الشهرية بعد تحقيق الغاية الخاصة بك؟',
    },
  },

  Q_EMPLOYER_SPONSORSHIP: {
    key: 'Q_EMPLOYER_SPONSORSHIP',
    text: {
      en: 'Does your employer sponsor your learning?',
      ar: 'هل يدعم شركتك تعلمك؟',
    },
  },
} as const

export enum QuestionEnum {
  Q_PRIMARY_FUNCTIONALITY = 'Q_PRIMARY_FUNCTIONALITY',
  Q_SENIORITY_LEVEL = 'Q_SENIORITY_LEVEL',
  Q_TARGET_TRACK = 'Q_TARGET_TRACK',
  Q_BASE_LINE_LEVEL = 'Q_BASE_LINE_LEVEL',
  Q_PRIMARY_GOAL = 'Q_PRIMARY_GOAL',
  Q_GOAL_TIMEFRAME = 'Q_GOAL_TIMEFRAME',
  Q_SUCCESS_METRIC = 'Q_SUCCESS_METRIC',
  Q_FORMAT_PREFERENCE = 'Q_FORMAT_PREFERENCE',
  Q_ACCOUNTABILITY = 'Q_ACCOUNTABILITY',
  Q_WEEKLY_TIME_BUDGET = 'Q_WEEKLY_TIME_BUDGET',
  Q_COMP_BAND_MONTHLY_SAR = 'Q_COMP_BAND_MONTHLY_SAR',
  Q_EXPECTED_RAISE_PCT = 'Q_EXPECTED_RAISE_PCT',
  Q_PRODUCTIVITY_GAIN_PCT = 'Q_PRODUCTIVITY_GAIN_PCT',
  Q_TIME_VALUE_HOURLY_SAR = 'Q_TIME_VALUE_HOURLY_SAR',
  Q_EMPLOYER_SPONSORSHIP = 'Q_EMPLOYER_SPONSORSHIP',
}

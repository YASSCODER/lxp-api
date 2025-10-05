export const Answers = {
  A_ROLE_FUNCTION: {
    key: 'Q_PRIMARY_FUNCTIONALITY',
    options: [
      { en: 'Software Engineer', ar: 'مهندس برمجيات' },
      { en: 'Data Scientist', ar: 'علماء بيانات' },
      { en: 'cybersecurity', ar: 'أمن المعلومات' },
      { en: 'Product Manager', ar: 'مدير المنتجات' },
      { en: 'Prodject Manager', ar: 'مدير المشروعات' },
      { en: 'Cloud &DevOps', ar: 'مهندس السحابة &  DevOps' },
      { en: 'Cybersecurity Specialist', ar: 'خبير الأمن الإلكتروني' },
      { en: 'AI/ML Engineer', ar: 'مهندس AI/ML' },
      { en: 'UI/UX Designer', ar: 'مصمم الواجهة المستخدم' },
      { en: 'business operations', ar: 'عمليات الأعمال' },
      { en: 'leadership', ar: 'القيادة' },
      { en: 'other', ar: 'أخرى' },
    ],
  },

  A_SENIORITY_LEVEL: {
    key: 'Q_SENIORITY_LEVEL',
    options: [
      { en: 'Intern', ar: 'متدرب' },
      { en: 'Junior', ar: 'مبتدئ' },
      { en: 'Mid', ar: 'متوسط الخبرة' },
      { en: 'Senior', ar: 'كبير' },
      { en: 'Lead', ar: 'قائد فريق' },
      { en: 'Manager', ar: 'مدير' },
      { en: 'Director plus', ar: 'مدير أول' },
    ],
  },

  A_TARGET_TRACK: {
    key: 'Q_TARGET_TRACK',
    options: [
      { en: 'Software Engineering', ar: 'برمجيات' },
      { en: 'Data Science', ar: 'علم البيانات' },
      { en: 'Cybersecurity', ar: 'أمن المعلومات' },
      { en: 'Web Development', ar: 'تطوير الويب' },
      { en: 'Mobile Development', ar: 'تطوير الموبايل' },
      { en: 'AI/ML', ar: 'AI/ML' },
      { en: 'DevOps', ar: 'DevOps' },
      { en: 'Cloud Computing', ar: 'السحابة' },
      { en: 'Product Management', ar: 'إدارة المنتجات' },
      { en: 'Project Management', ar: 'إدارة المشروعات' },
      { en: 'Business Operations', ar: 'عمليات الأعمال' },
      { en: 'Leadership', ar: 'القيادة' },
      { en: 'Other', ar: 'أخرى' },
    ],
  },

  A_BASE_LINE_LEVEL: {
    key: 'Q_BASE_LINE_LEVEL',
    options: [
      { text: { en: 'Intern', ar: 'متدرب' }, scale: 1 },
      { text: { en: 'Beginner', ar: 'مبتدئ' }, scale: 2 },
      { text: { en: 'Intermediate', ar: 'متوسط' }, scale: 3 },
      { text: { en: 'Advanced', ar: 'متقدم' }, scale: 4 },
      { text: { en: 'Expert', ar: 'خبير' }, scale: 5 },
    ],
  },

  A_PRIMARY_GOAL: {
    key: 'Q_PRIMARY_GOAL',
    options: [
      { en: 'Promotion', ar: 'ترقية' },
      { en: 'New Role', ar: 'دور جديد' },
      { en: 'Pass a Certification', ar: 'مرسوم شهادة' },
      {
        en: 'Close skill gap for a project',
        ar: 'إغلاق الفجوة المهارية لمشروع',
      },
      { en: 'Salary increase', ar: 'زيادة الراتب' },
      { en: 'Build/Lunch a product', ar: 'بناء/إطلاق منتج' },
      { en: 'Complice/Mandatory training', ar: 'تدريب مطلوب/مطبق' },
      { en: 'Personal Development', ar: 'تطوير شخصي' },
      { en: 'other', ar: 'أخرى' },
    ],
  },

  A_GOAL_TIMEFRAME: {
    key: 'Q_GOAL_TIMEFRAME',
    options: [
      { en: '1 month or less', ar: 'شهر أو أقل' },
      { en: 'from 3 months to 6 months', ar: '3 أشهر إلى 6 أشهر' },
      { en: 'from 6 months to 1 year', ar: '6 أشهر إلى سنة' },
      { en: 'more than 1 year', ar: 'أكثر من سنة' },
    ],
  },

  A_SUCCESS_METRIC: {
    key: 'Q_SUCCESS_METRIC',
    options: [
      { en: 'Pass an Exam/Certification', ar: 'مرسوم شهادة' },
      { en: 'Ship a work Project', ar: 'إطلاق مشروع عمل' },
      { en: 'Launch a product', ar: 'إطلاق منتج' },
      { en: 'Increase Salary', ar: 'زيادة الراتب' },
      { en: 'Secure a new job offer', ar: 'الحصول على وظيفة جديدة' },
      { en: 'Improve performance review rating', ar: 'تحسين تقييم الأداء' },
      { en: 'Increase the number of customers', ar: 'زيادة عدد العملاء' },
      { en: 'Improve customer satisfaction', ar: 'تحسين رضا العملاء' },
      { en: 'Improve team performance', ar: 'تحسين أداء الفريق' },
      { en: 'Improve personal productivity', ar: 'تحسين الإنتاجية الشخصية' },
      { en: 'Improve personal skills', ar: 'تحسين المهارات الشخصية' },
      { en: 'Improve personal network', ar: 'تحسين الشبكة الشخصية' },
      { en: 'Achieve a client outcome', ar: 'تحقيق نتيجة العميل' },
      { en: 'Other', ar: 'أخرى' },
    ],
  },

  A_FORMAT_PREFERENCE: {
    key: 'Q_FORMAT_PREFERENCE',
    options: [
      { en: 'Video', ar: 'فيديو' },
      { en: 'Reading Guides', ar: 'دليل القراءة' },
      { en: 'Interactive Lab', ar: 'مختبر متعاون' },
      { en: 'Coding Challenges', ar: 'تحديات البرمجة' },
      { en: 'Simulations', ar: 'محاكاة' },
      { en: 'Live Workshop', ar: 'ورشة حية' },
      { en: 'Other', ar: 'أخرى' },
    ],
  },

  A_ACCOUNTABILITY: {
    key: 'Q_ACCOUNTABILITY',
    options: [
      { en: 'Self-paced', ar: 'ذاتي التقدم' },
      { en: 'Weekly Check-ins', ar: 'التحقق الأسبوعي' },
      { en: 'Mentor Guidance', ar: 'توجيه المدرب' },
      { en: 'Peer Cohort', ar: 'فريق المتعاون' },
      { en: 'Other', ar: 'أخرى' },
    ],
  },

  A_WEEKLY_TIME_BUDGET: {
    key: 'Q_WEEKLY_TIME_BUDGET',
    options: [
      { en: 'from 1 hour to 2 hours', ar: 'من 1 ساعة إلى 2 ساعة' },
      { en: 'from 2 hours to 3 hours', ar: 'من 2 ساعة إلى 3 ساعة' },
      { en: 'from 3 hours to 4 hours', ar: 'من 3 ساعة إلى 4 ساعة' },
      { en: 'from 5 hours to 7 hours', ar: 'من 5 ساعة إلى 7 ساعة' },
      { en: 'from 8 hours to 10 hours', ar: 'من 8 ساعة إلى 10 ساعة' },
      { en: 'more than 10 hours', ar: 'أكثر من 10 ساعة' },
    ],
  },

  A_COMP_BAND_MONTHLY_SAR: {
    key: 'Q_COMP_BAND_MONTHLY_SAR',
    options: [
      { en: 'less than 5k', ar: 'أقل من 5 ألف' },
      { en: 'from 5k to 10k', ar: 'من 5 ألف إلى 10 ألف' },
      { en: 'from 10k to 15k', ar: 'من 10 ألف إلى 15 ألف' },
      { en: 'from 15k to 20k', ar: 'من 15 ألف إلى 20 ألف' },
      { en: 'from 20k to 25k', ar: 'من 20 ألف إلى 25 ألف' },
      { en: 'from 25k to 30k', ar: 'من 25 ألف إلى 30 ألف' },
      { en: 'from 30k to 35k', ar: 'من 30 ألف إلى 35 ألف' },
      { en: 'from 35k to 45k', ar: 'من 35 ألف إلى 45 ألف' },
      { en: 'from 45k to 60k', ar: 'من 45 ألف إلى 60 ألف' },
      { en: 'from 60k to 80k', ar: 'من 60 ألف إلى 80 ألف' },
      { en: 'from 80k to 100k', ar: 'من 80 ألف إلى 100 ألف' },
      { en: 'more than 100k', ar: 'أكثر من 100 ألف' },
    ],
  },

  A_EXPECTED_RAISE_PCT: {
    key: 'Q_EXPECTED_RAISE_PCT',
    options: [
      { en: 'less than 5%', ar: 'أقل من 5%' },
      { en: 'from 5% to 10%', ar: 'من 5% إلى 10%' },
      { en: 'from 10% to 20%', ar: 'من 10% إلى 20%' },
      { en: 'from 20% to 30%', ar: 'من 20% إلى 30%' },
      { en: 'more than 30%', ar: 'أكثر من 30%' },
    ],
  },

  A_PRODUCTIVITY_GAIN_PCT: {
    key: 'Q_PRODUCTIVITY_GAIN_PCT',
    options: [
      { en: 'less than 5%', ar: 'أقل من 5%' },
      { en: 'from 5% to 10%', ar: 'من 5% إلى 10%' },
      { en: 'from 10% to 20%', ar: 'من 10% إلى 20%' },
      { en: 'from 20% to 30%', ar: 'من 20% إلى 30%' },
      { en: 'more than 30%', ar: 'أكثر من 30%' },
    ],
  },

  A_TIME_VALUE_HOURLY_SAR: {
    key: 'Q_TIME_VALUE_HOURLY_SAR',
    options: [
      { en: 'less than 50', ar: 'أقل من 50' },
      { en: 'from 50 to 100', ar: 'من 50 إلى 100' },
      { en: 'from 100 to 200', ar: 'من 100 إلى 200' },
      { en: 'from 200 to 400', ar: 'من 200 إلى 400' },
      { en: 'more than 400', ar: 'أكثر من 400' },
    ],
  },

  A_EMPLOYER_SPONSORSHIP: {
    key: 'Q_EMPLOYER_SPONSORSHIP',
    options: [
      { en: 'Company pays all', ar: 'شركة تدفع كل' },
      { en: 'Coast shared', ar: 'شركة تدفع نصف' },
      { en: 'No Sponsorship', ar: 'لا تدعم' },
      { en: 'Not Sure', ar: 'غير متأكد' },
    ],
  },
} as const

export enum AnswerEnum {
  A_ROLE_FUNCTION = 'A_ROLE_FUNCTION',
  A_SENIORITY_LEVEL = 'A_SENIORITY_LEVEL',
  A_TARGET_TRACK = 'A_TARGET_TRACK',
  A_BASE_LINE_LEVEL = 'A_BASE_LINE_LEVEL',
  A_PRIMARY_GOAL = 'A_PRIMARY_GOAL',
  A_GOAL_TIMEFRAME = 'A_GOAL_TIMEFRAME',
  A_SUCCESS_METRIC = 'A_SUCCESS_METRIC',
  A_FORMAT_PREFERENCE = 'A_FORMAT_PREFERENCE',
  A_ACCOUNTABILITY = 'A_ACCOUNTABILITY',
  A_WEEKLY_TIME_BUDGET = 'A_WEEKLY_TIME_BUDGET',
  A_COMP_BAND_MONTHLY_SAR = 'A_COMP_BAND_MONTHLY_SAR',
  A_EXPECTED_RAISE_PCT = 'A_EXPECTED_RAISE_PCT',
  A_PRODUCTIVITY_GAIN_PCT = 'A_PRODUCTIVITY_GAIN_PCT',
  A_TIME_VALUE_HOURLY_SAR = 'A_TIME_VALUE_HOURLY_SAR',
  A_EMPLOYER_SPONSORSHIP = 'A_EMPLOYER_SPONSORSHIP',
}

export interface AcademyLesson {
  id: string;
  category: 'upi' | 'impersonation' | 'investment' | 'malware' | 'seniors';
  titleKey: string;
  durationMinutes: number;
  badgeNameKey: string;
  summaryKey: string;
  sections: {
    headingKey: string;
    contentKey: string;
    bulletKeys?: string[];
  }[];
  quiz: {
    id: string;
    questionKey: string;
    options: {
      id: string;
      labelKey: string;
      isCorrect: boolean;
      explanationKey: string;
    }[];
  }[];
  goldenRuleKey: string;
}

export const ACADEMY_LESSONS: AcademyLesson[] = [
  {
    id: 'upi-safety',
    category: 'upi',
    titleKey: 'academy.lessons.upi.title',
    durationMinutes: 4,
    badgeNameKey: 'academy.lessons.upi.badgeName',
    summaryKey: 'academy.lessons.upi.summary',
    sections: [
      {
        headingKey: 'academy.lessons.upi.sec1Heading',
        contentKey: 'academy.lessons.upi.sec1Content',
        bulletKeys: [
          'academy.lessons.upi.sec1Bullet1',
          'academy.lessons.upi.sec1Bullet2',
          'academy.lessons.upi.sec1Bullet3',
        ],
      },
      {
        headingKey: 'academy.lessons.upi.sec2Heading',
        contentKey: 'academy.lessons.upi.sec2Content',
      },
    ],
    quiz: [
      {
        id: 'upi-q1',
        questionKey: 'academy.lessons.upi.q1Question',
        options: [
          {
            id: 'a',
            labelKey: 'academy.lessons.upi.q1OptA',
            isCorrect: false,
            explanationKey: 'academy.lessons.upi.q1OptAExp',
          },
          {
            id: 'b',
            labelKey: 'academy.lessons.upi.q1OptB',
            isCorrect: true,
            explanationKey: 'academy.lessons.upi.q1OptBExp',
          },
          {
            id: 'c',
            labelKey: 'academy.lessons.upi.q1OptC',
            isCorrect: false,
            explanationKey: 'academy.lessons.upi.q1OptCExp',
          },
        ],
      },
    ],
    goldenRuleKey: 'academy.lessons.upi.goldenRule',
  },
  {
    id: 'digital-arrest',
    category: 'impersonation',
    titleKey: 'academy.lessons.arrest.title',
    durationMinutes: 5,
    badgeNameKey: 'academy.lessons.arrest.badgeName',
    summaryKey: 'academy.lessons.arrest.summary',
    sections: [
      {
        headingKey: 'academy.lessons.arrest.sec1Heading',
        contentKey: 'academy.lessons.arrest.sec1Content',
        bulletKeys: [
          'academy.lessons.arrest.sec1Bullet1',
          'academy.lessons.arrest.sec1Bullet2',
          'academy.lessons.arrest.sec1Bullet3',
        ],
      },
      {
        headingKey: 'academy.lessons.arrest.sec2Heading',
        contentKey: 'academy.lessons.arrest.sec2Content',
      },
    ],
    quiz: [
      {
        id: 'arrest-q1',
        questionKey: 'academy.lessons.arrest.q1Question',
        options: [
          {
            id: 'a',
            labelKey: 'academy.lessons.arrest.q1OptA',
            isCorrect: false,
            explanationKey: 'academy.lessons.arrest.q1OptAExp',
          },
          {
            id: 'b',
            labelKey: 'academy.lessons.arrest.q1OptB',
            isCorrect: true,
            explanationKey: 'academy.lessons.arrest.q1OptBExp',
          },
          {
            id: 'c',
            labelKey: 'academy.lessons.arrest.q1OptC',
            isCorrect: false,
            explanationKey: 'academy.lessons.arrest.q1OptCExp',
          },
        ],
      },
    ],
    goldenRuleKey: 'academy.lessons.arrest.goldenRule',
  },
  {
    id: 'job-investment',
    category: 'investment',
    titleKey: 'academy.lessons.invest.title',
    durationMinutes: 4,
    badgeNameKey: 'academy.lessons.invest.badgeName',
    summaryKey: 'academy.lessons.invest.summary',
    sections: [
      {
        headingKey: 'academy.lessons.invest.sec1Heading',
        contentKey: 'academy.lessons.invest.sec1Content',
        bulletKeys: [
          'academy.lessons.invest.sec1Bullet1',
          'academy.lessons.invest.sec1Bullet2',
          'academy.lessons.invest.sec1Bullet3',
        ],
      },
      {
        headingKey: 'academy.lessons.invest.sec2Heading',
        contentKey: 'academy.lessons.invest.sec2Content',
      },
    ],
    quiz: [
      {
        id: 'invest-q1',
        questionKey: 'academy.lessons.invest.q1Question',
        options: [
          {
            id: 'a',
            labelKey: 'academy.lessons.invest.q1OptA',
            isCorrect: true,
            explanationKey: 'academy.lessons.invest.q1OptAExp',
          },
          {
            id: 'b',
            labelKey: 'academy.lessons.invest.q1OptB',
            isCorrect: false,
            explanationKey: 'academy.lessons.invest.q1OptBExp',
          },
          {
            id: 'c',
            labelKey: 'academy.lessons.invest.q1OptC',
            isCorrect: false,
            explanationKey: 'academy.lessons.invest.q1OptCExp',
          },
        ],
      },
    ],
    goldenRuleKey: 'academy.lessons.invest.goldenRule',
  },
  {
    id: 'device-apk',
    category: 'malware',
    titleKey: 'academy.lessons.apk.title',
    durationMinutes: 4,
    badgeNameKey: 'academy.lessons.apk.badgeName',
    summaryKey: 'academy.lessons.apk.summary',
    sections: [
      {
        headingKey: 'academy.lessons.apk.sec1Heading',
        contentKey: 'academy.lessons.apk.sec1Content',
        bulletKeys: [
          'academy.lessons.apk.sec1Bullet1',
          'academy.lessons.apk.sec1Bullet2',
          'academy.lessons.apk.sec1Bullet3',
        ],
      },
      {
        headingKey: 'academy.lessons.apk.sec2Heading',
        contentKey: 'academy.lessons.apk.sec2Content',
      },
    ],
    quiz: [
      {
        id: 'apk-q1',
        questionKey: 'academy.lessons.apk.q1Question',
        options: [
          {
            id: 'a',
            labelKey: 'academy.lessons.apk.q1OptA',
            isCorrect: false,
            explanationKey: 'academy.lessons.apk.q1OptAExp',
          },
          {
            id: 'b',
            labelKey: 'academy.lessons.apk.q1OptB',
            isCorrect: false,
            explanationKey: 'academy.lessons.apk.q1OptBExp',
          },
          {
            id: 'c',
            labelKey: 'academy.lessons.apk.q1OptC',
            isCorrect: true,
            explanationKey: 'academy.lessons.apk.q1OptCExp',
          },
        ],
      },
    ],
    goldenRuleKey: 'academy.lessons.apk.goldenRule',
  },
  {
    id: 'elderly-safety',
    category: 'seniors',
    titleKey: 'academy.lessons.seniors.title',
    durationMinutes: 5,
    badgeNameKey: 'academy.lessons.seniors.badgeName',
    summaryKey: 'academy.lessons.seniors.summary',
    sections: [
      {
        headingKey: 'academy.lessons.seniors.sec1Heading',
        contentKey: 'academy.lessons.seniors.sec1Content',
        bulletKeys: [
          'academy.lessons.seniors.sec1Bullet1',
          'academy.lessons.seniors.sec1Bullet2',
          'academy.lessons.seniors.sec1Bullet3',
        ],
      },
      {
        headingKey: 'academy.lessons.seniors.sec2Heading',
        contentKey: 'academy.lessons.seniors.sec2Content',
      },
    ],
    quiz: [
      {
        id: 'seniors-q1',
        questionKey: 'academy.lessons.seniors.q1Question',
        options: [
          {
            id: 'a',
            labelKey: 'academy.lessons.seniors.q1OptA',
            isCorrect: false,
            explanationKey: 'academy.lessons.seniors.q1OptAExp',
          },
          {
            id: 'b',
            labelKey: 'academy.lessons.seniors.q1OptB',
            isCorrect: true,
            explanationKey: 'academy.lessons.seniors.q1OptBExp',
          },
          {
            id: 'c',
            labelKey: 'academy.lessons.seniors.q1OptC',
            isCorrect: false,
            explanationKey: 'academy.lessons.seniors.q1OptCExp',
          },
        ],
      },
    ],
    goldenRuleKey: 'academy.lessons.seniors.goldenRule',
  },
];

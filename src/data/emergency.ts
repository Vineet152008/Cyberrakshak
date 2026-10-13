import { EmergencyFlow } from '../types/content';

/**
 * Three distinct guided emergency flows:
 * 1. Financial Fraud (UPI, Net Banking, Card Charge)
 * 2. Account Compromise (Hacked WhatsApp, Email, Social Media)
 * 3. Sensitive Information Disclosure & Extortion (Blackmail, Private Photos, Intimidation)
 * 
 * Safety constraints enforced:
 * - Zero hardcoded bank customer care numbers.
 * - Softened outcomes with no promises of fund recovery.
 * - Extortion flow: preserve evidence BEFORE blocking; 1930 for money sent, cybercrime.gov.in for threats, 112 for danger.
 * - Hacked account flow: trusted device -> change password first -> log out other sessions -> alert contacts.
 * - Cross-links between flows.
 * - All text referenced via i18n keys.
 */

export const EMERGENCY_FLOWS: EmergencyFlow[] = [
  {
    id: 'financial_fraud',
    tabLabelKey: 'emergency.flows.financial.tab',
    titleKey: 'emergency.flows.financial.title',
    subtitleKey: 'emergency.flows.financial.subtitle',
    urgentNoticeKey: 'emergency.flows.financial.notice',
    primaryAction: {
      labelKey: 'emergency.call1930Button',
      href: 'tel:1930',
      isCall: true,
    },
    steps: [
      {
        stepNumber: 1,
        titleKey: 'emergency.flows.financial.step1.title',
        subTitleKey: 'emergency.flows.financial.step1.sub',
        actionTextKey: 'emergency.call1930Button',
        actionHref: 'tel:1930',
        instructionsKey: 'emergency.flows.financial.step1.instructions',
        cautionKey: 'emergency.flows.financial.step1.caution',
      },
      {
        stepNumber: 2,
        titleKey: 'emergency.flows.financial.step2.title',
        subTitleKey: 'emergency.flows.financial.step2.sub',
        actionTextKey: 'emergency.flows.financial.step2.action',
        actionHref: 'https://cybercrime.gov.in',
        isExternalLink: true,
        instructionsKey: 'emergency.flows.financial.step2.instructions',
        cautionKey: 'emergency.flows.financial.step2.caution',
      },
      {
        stepNumber: 3,
        titleKey: 'emergency.flows.financial.step3.title',
        subTitleKey: 'emergency.flows.financial.step3.sub',
        instructionsKey: 'emergency.flows.financial.step3.instructions',
        cautionKey: 'emergency.flows.financial.step3.caution',
      },
      {
        stepNumber: 4,
        titleKey: 'emergency.flows.financial.step4.title',
        subTitleKey: 'emergency.flows.financial.step4.sub',
        instructionsKey: 'emergency.flows.financial.step4.instructions',
        cautionKey: 'emergency.flows.financial.step4.caution',
      },
    ],
  },
  {
    id: 'account_compromise',
    tabLabelKey: 'emergency.flows.account.tab',
    titleKey: 'emergency.flows.account.title',
    subtitleKey: 'emergency.flows.account.subtitle',
    urgentNoticeKey: 'emergency.flows.account.notice',
    steps: [
      {
        stepNumber: 1,
        titleKey: 'emergency.flows.account.step1.title',
        subTitleKey: 'emergency.flows.account.step1.sub',
        instructionsKey: 'emergency.flows.account.step1.instructions',
        cautionKey: 'emergency.flows.account.step1.caution',
      },
      {
        stepNumber: 2,
        titleKey: 'emergency.flows.account.step2.title',
        subTitleKey: 'emergency.flows.account.step2.sub',
        instructionsKey: 'emergency.flows.account.step2.instructions',
        cautionKey: 'emergency.flows.account.step2.caution',
      },
      {
        stepNumber: 3,
        titleKey: 'emergency.flows.account.step3.title',
        subTitleKey: 'emergency.flows.account.step3.sub',
        instructionsKey: 'emergency.flows.account.step3.instructions',
        cautionKey: 'emergency.flows.account.step3.caution',
      },
      {
        stepNumber: 4,
        titleKey: 'emergency.flows.account.step4.title',
        subTitleKey: 'emergency.flows.account.step4.sub',
        instructionsKey: 'emergency.flows.account.step4.instructions',
        cautionKey: 'emergency.flows.account.step4.caution',
      },
    ],
  },
  {
    id: 'sensitive_extortion',
    tabLabelKey: 'emergency.flows.extortion.tab',
    titleKey: 'emergency.flows.extortion.title',
    subtitleKey: 'emergency.flows.extortion.subtitle',
    urgentNoticeKey: 'emergency.flows.extortion.notice',
    steps: [
      {
        stepNumber: 1,
        titleKey: 'emergency.flows.extortion.step1.title',
        subTitleKey: 'emergency.flows.extortion.step1.sub',
        instructionsKey: 'emergency.flows.extortion.step1.instructions',
        cautionKey: 'emergency.flows.extortion.step1.caution',
      },
      {
        stepNumber: 2,
        titleKey: 'emergency.flows.extortion.step2.title',
        subTitleKey: 'emergency.flows.extortion.step2.sub',
        instructionsKey: 'emergency.flows.extortion.step2.instructions',
        cautionKey: 'emergency.flows.extortion.step2.caution',
      },
      {
        stepNumber: 3,
        titleKey: 'emergency.flows.extortion.step3.title',
        subTitleKey: 'emergency.flows.extortion.step3.sub',
        instructionsKey: 'emergency.flows.extortion.step3.instructions',
        cautionKey: 'emergency.flows.extortion.step3.caution',
      },
      {
        stepNumber: 4,
        titleKey: 'emergency.flows.extortion.step4.title',
        subTitleKey: 'emergency.flows.extortion.step4.sub',
        actionTextKey: 'emergency.flows.extortion.step4.action',
        actionHref: 'https://cybercrime.gov.in',
        isExternalLink: true,
        instructionsKey: 'emergency.flows.extortion.step4.instructions',
        cautionKey: 'emergency.flows.extortion.step4.caution',
      },
    ],
  },
];

export interface EvidenceChecklistItem {
  id: string;
  labelKey: string;
  howToGetKey: string;
  whyNeededKey: string;
}

export const EVIDENCE_CHECKLIST_ITEMS: EvidenceChecklistItem[] = [
  {
    id: 'utr_number',
    labelKey: 'emergency.checklist.utr.label',
    howToGetKey: 'emergency.checklist.utr.how',
    whyNeededKey: 'emergency.checklist.utr.why',
  },
  {
    id: 'scammer_contact',
    labelKey: 'emergency.checklist.contact.label',
    howToGetKey: 'emergency.checklist.contact.how',
    whyNeededKey: 'emergency.checklist.contact.why',
  },
  {
    id: 'payment_screenshot',
    labelKey: 'emergency.checklist.receipt.label',
    howToGetKey: 'emergency.checklist.receipt.how',
    whyNeededKey: 'emergency.checklist.receipt.why',
  },
  {
    id: 'chat_history',
    labelKey: 'emergency.checklist.chat.label',
    howToGetKey: 'emergency.checklist.chat.how',
    whyNeededKey: 'emergency.checklist.chat.why',
  },
  {
    id: 'acknowledgement_num',
    labelKey: 'emergency.checklist.ack.label',
    howToGetKey: 'emergency.checklist.ack.how',
    whyNeededKey: 'emergency.checklist.ack.why',
  },
];

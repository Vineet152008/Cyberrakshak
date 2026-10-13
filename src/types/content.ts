/**
 * CyberRakshak Typed Content Models
 */

export type ThreatSeverity = 'critical' | 'high' | 'medium';

export type ScamCategory = 
  | 'upi_collect' 
  | 'kyc_electricity' 
  | 'digital_arrest' 
  | 'fake_part_time_jobs' 
  | 'fake_loan_apps' 
  | 'investment_crypto' 
  | 'otp_courier' 
  | 'sensitive_extortion';

export interface RedFlag {
  id: string;
  label: string;
  highlightText: string;
  explanation: string;
  threatType: 'urgency' | 'auth_theft' | 'impersonation' | 'greed_trap' | 'malicious_link';
}

export interface ScamProfile {
  id: ScamCategory;
  titleKey: string;
  shortKey: string;
  summaryKey: string;
  goldenRuleKey: string;
  howItWorksKey: string;
  hooksKey: string;
  immediateActionKey: string;
  threatSeverity: ThreatSeverity;
  fictionalSample: {
    channel: 'SMS' | 'WhatsApp' | 'Phone Call' | 'App Store';
    senderKey: string;
    textKey: string;
    highlightSubstring: string;
  };
}

export interface SimulatorChoice {
  id: string;
  text: string;
  isSafe: boolean;
  scoreDelta: number;
  instantFeedback: string;
  consequenceExplanation: string;
  nextNodeId?: string;
}

export interface SimulatorNode {
  id: string;
  scamCategory: ScamCategory;
  channel: 'sms' | 'whatsapp' | 'call';
  senderLabel: string;
  senderAvatar?: string;
  verifiedBadgeClaim?: boolean;
  dialogueHistory: Array<{
    sender: 'scammer' | 'user';
    text: string;
    timestamp: string;
    isAttachment?: boolean;
    attachmentDetails?: string;
  }>;
  choices: SimulatorChoice[];
}

export interface RedFlagQuizQuestion {
  id: string;
  scamCategory: ScamCategory;
  contextTitle: string;
  scenarioSnippet: string;
  sender: string;
  channel: string;
  options: {
    id: string;
    text: string;
    isCorrectRedFlag: boolean;
    reason: string;
  }[];
  explanation: string;
  goldenRule: string;
}

export interface AcademyLesson {
  id: string;
  scamCategory: ScamCategory;
  title: string;
  estimatedMinutes: number;
  summary: string;
  coreConcepts: Array<{
    heading: string;
    content: string;
    rule: string;
  }>;
  quickCheck: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

export type EmergencyFlowId = 'financial_fraud' | 'account_compromise' | 'sensitive_extortion';

export interface EmergencyFlowStep {
  stepNumber: number;
  titleKey: string;
  subTitleKey: string;
  actionTextKey?: string;
  actionHref?: string;
  isExternalLink?: boolean;
  instructionsKey: string;
  cautionKey?: string;
}

export interface EmergencyFlow {
  id: EmergencyFlowId;
  tabLabelKey: string;
  titleKey: string;
  subtitleKey: string;
  urgentNoticeKey: string;
  primaryAction?: {
    labelKey: string;
    href: string;
    isCall: boolean;
  };
  steps: EmergencyFlowStep[];
}

export interface Resource {
  id: string;
  titleKey: string;
  descriptionKey: string;
  url: string;
  sourceType: 'official_portal' | 'regulatory_rbi' | 'law_enforcement' | 'banking_association';
  verifiedOn: string; // ISO Date YYYY-MM-DD
  isOfficialGov: boolean;
  phoneContact?: string;
}

export interface DetectionResult {
  riskLevel: 'safe' | 'suspicious' | 'high_risk';
  score: number; // 0 to 100
  matchedFlags: Array<{
    ruleId: string;
    titleKey: string;
    matchedSnippet: string;
    explanationKey: string;
    severity: 'warning' | 'danger';
  }>;
  safetyAdviceKeys: string[];
  disclaimerKey: string;
}

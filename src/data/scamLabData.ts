/**
 * Pure structural definitions for Scam Lab scenarios, segments, decision trees, and quizzes.
 * CRITICAL ARCHITECTURAL GUARANTEE:
 * All user-visible copy, text, labels, messages, choices, feedback, and golden rules
 * are strictly loaded via i18n keys under the 'scamLab' namespace in en.json, hi.json, and mr.json.
 * Zero English strings live in this data file.
 */

export type ScamChannel = 'SMS' | 'WhatsApp' | 'UPI Modal' | 'Video Call';
export type FlagSeverity = 'critical' | 'high' | 'medium';

export interface ScenarioSegmentDef {
  id: string;
  isRedFlag: boolean;
  severity?: FlagSeverity;
}

export interface ScenarioBranchDef {
  id: string;
  isSafe: boolean;
}

export interface LabScenarioDefinition {
  id: string;
  category: 'utility_threat' | 'logistics_phish' | 'upi_collect' | 'digital_arrest';
  channel: ScamChannel;
  fictionalEntityId: string;
  segmentIds: string[];
  flagSegmentIds: string[];
  branchIds: string[];
  safeBranchId: string;
}

export interface QuizQuestionDefinition {
  id: string;
  scenarioId: string;
  optionIds: string[];
  correctOptionId: string;
}

export const LAB_SCENARIO_DEFS: LabScenarioDefinition[] = [
  {
    id: 'electricity_disconnect',
    category: 'utility_threat',
    channel: 'SMS',
    fictionalEntityId: 'urjavidyut_power',
    segmentIds: [
      'seg_consumer_greeting',
      'seg_threat_deadline',
      'seg_officer_phone',
      'seg_fake_bill_link',
      'seg_utility_footer'
    ],
    flagSegmentIds: [
      'seg_threat_deadline',
      'seg_officer_phone',
      'seg_fake_bill_link'
    ],
    branchIds: ['opt_call_officer', 'opt_click_link', 'opt_verify_utility'],
    safeBranchId: 'opt_verify_utility'
  },
  {
    id: 'courier_redelivery',
    category: 'logistics_phish',
    channel: 'SMS',
    fictionalEntityId: 'quicktrack_logistics',
    segmentIds: [
      'seg_courier_greeting',
      'seg_delivery_failed_notice',
      'seg_reschedule_deadline',
      'seg_fake_portal_link',
      'seg_automated_footer'
    ],
    flagSegmentIds: [
      'seg_delivery_failed_notice',
      'seg_reschedule_deadline',
      'seg_fake_portal_link'
    ],
    branchIds: ['opt_pay_fee_link', 'opt_call_courier_number', 'opt_check_official_merchant'],
    safeBranchId: 'opt_check_official_merchant'
  },
  {
    id: 'upi_collect_request',
    category: 'upi_collect',
    channel: 'UPI Modal',
    fictionalEntityId: 'shree_retail_fictional',
    segmentIds: [
      'seg_upi_collect_header',
      'seg_amount_display',
      'seg_payer_note',
      'seg_pin_demand_prompt',
      'seg_bank_warning_footer'
    ],
    flagSegmentIds: [
      'seg_payer_note',
      'seg_pin_demand_prompt'
    ],
    branchIds: ['opt_enter_upi_pin', 'opt_decline_and_block', 'opt_chat_seller'],
    safeBranchId: 'opt_decline_and_block'
  },
  {
    id: 'digital_arrest_notice',
    category: 'digital_arrest',
    channel: 'Video Call',
    fictionalEntityId: 'state_telecom_bureau',
    segmentIds: [
      'seg_official_seal_header',
      'seg_arrest_warrant_claim',
      'seg_secrecy_order',
      'seg_camera_continuous_demand',
      'seg_clearance_deposit_prompt'
    ],
    flagSegmentIds: [
      'seg_arrest_warrant_claim',
      'seg_secrecy_order',
      'seg_camera_continuous_demand',
      'seg_clearance_deposit_prompt'
    ],
    branchIds: ['opt_obey_video_transfer', 'opt_disconnect_call_112', 'opt_ask_for_id_card'],
    safeBranchId: 'opt_disconnect_call_112'
  }
];

export const QUIZ_QUESTION_DEFS: QuizQuestionDefinition[] = [
  {
    id: 'q_electricity_sms',
    scenarioId: 'electricity_disconnect',
    optionIds: ['opt_a', 'opt_b', 'opt_c', 'opt_d'],
    correctOptionId: 'opt_c'
  },
  {
    id: 'q_courier_sms',
    scenarioId: 'courier_redelivery',
    optionIds: ['opt_a', 'opt_b', 'opt_c', 'opt_d'],
    correctOptionId: 'opt_b'
  },
  {
    id: 'q_upi_collect',
    scenarioId: 'upi_collect_request',
    optionIds: ['opt_a', 'opt_b', 'opt_c', 'opt_d'],
    correctOptionId: 'opt_d'
  },
  {
    id: 'q_digital_arrest',
    scenarioId: 'digital_arrest_notice',
    optionIds: ['opt_a', 'opt_b', 'opt_c', 'opt_d'],
    correctOptionId: 'opt_a'
  }
];

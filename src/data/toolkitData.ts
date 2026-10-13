export interface ToolkitChecklistItem {
  id: string;
  category: 'seniors' | 'banking' | 'devices';
  titleKey: string;
  descKey: string;
  howToKey: string;
  priority: 'high' | 'essential' | 'recommended';
}

export interface TriageQuestion {
  id: string;
  triggerKey: string;
  indicatorKey: string;
  verdictKey: string;
  actionKey: string;
  isDangerous: boolean;
}

export const TOOLKIT_CHECKLISTS: ToolkitChecklistItem[] = [
  {
    id: 'block-unknown-sources',
    category: 'seniors',
    titleKey: 'toolkit.items.unknownSources.title',
    descKey: 'toolkit.items.unknownSources.desc',
    howToKey: 'toolkit.items.unknownSources.howTo',
    priority: 'essential',
  },
  {
    id: 'audit-accessibility',
    category: 'seniors',
    titleKey: 'toolkit.items.accessibility.title',
    descKey: 'toolkit.items.accessibility.desc',
    howToKey: 'toolkit.items.accessibility.howTo',
    priority: 'high',
  },
  {
    id: 'family-safeword',
    category: 'seniors',
    titleKey: 'toolkit.items.safeword.title',
    descKey: 'toolkit.items.safeword.desc',
    howToKey: 'toolkit.items.safeword.howTo',
    priority: 'high',
  },
  {
    id: 'upi-daily-limit',
    category: 'banking',
    titleKey: 'toolkit.items.upiLimit.title',
    descKey: 'toolkit.items.upiLimit.desc',
    howToKey: 'toolkit.items.upiLimit.howTo',
    priority: 'essential',
  },
  {
    id: 'secondary-account-upi',
    category: 'banking',
    titleKey: 'toolkit.items.secondaryAccount.title',
    descKey: 'toolkit.items.secondaryAccount.desc',
    howToKey: 'toolkit.items.secondaryAccount.howTo',
    priority: 'high',
  },
  {
    id: 'sim-swap-hygiene',
    category: 'devices',
    titleKey: 'toolkit.items.simHygiene.title',
    descKey: 'toolkit.items.simHygiene.desc',
    howToKey: 'toolkit.items.simHygiene.howTo',
    priority: 'recommended',
  },
];

export const TRIAGE_QUESTIONS: TriageQuestion[] = [
  {
    id: 'triage-arrest',
    triggerKey: 'toolkit.triage.arrest.trigger',
    indicatorKey: 'toolkit.triage.arrest.indicator',
    verdictKey: 'toolkit.triage.arrest.verdict',
    actionKey: 'toolkit.triage.arrest.action',
    isDangerous: true,
  },
  {
    id: 'triage-screen-share',
    triggerKey: 'toolkit.triage.screenshare.trigger',
    indicatorKey: 'toolkit.triage.screenshare.indicator',
    verdictKey: 'toolkit.triage.screenshare.verdict',
    actionKey: 'toolkit.triage.screenshare.action',
    isDangerous: true,
  },
  {
    id: 'triage-qr-pin',
    triggerKey: 'toolkit.triage.qrpin.trigger',
    indicatorKey: 'toolkit.triage.qrpin.indicator',
    verdictKey: 'toolkit.triage.qrpin.verdict',
    actionKey: 'toolkit.triage.qrpin.action',
    isDangerous: true,
  },
  {
    id: 'triage-electricity-apk',
    triggerKey: 'toolkit.triage.apk.trigger',
    indicatorKey: 'toolkit.triage.apk.indicator',
    verdictKey: 'toolkit.triage.apk.verdict',
    actionKey: 'toolkit.triage.apk.action',
    isDangerous: true,
  },
];

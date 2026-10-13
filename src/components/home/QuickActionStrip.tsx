import React from 'react';
import { Link } from 'react-router-dom';
import { TiltCard } from '../pointer/TiltCard';
import { ShieldCheck, Siren, Sparkles, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const QuickActionStrip: React.FC = () => {
  const { t } = useTranslation();

  const actions = [
    {
      title: t('home.quickAction.scamLabTitle'),
      kicker: t('home.quickAction.scamLabKicker'),
      readTime: '5m',
      description: t('home.quickAction.scamLabDesc'),
      link: '/scam-lab',
      ctaText: t('home.quickAction.scamLabCta'),
      icon: Sparkles,
      accentColor: '#C9A96E',
    },
    {
      title: t('home.quickAction.emergencyTitle'),
      kicker: t('home.quickAction.emergencyKicker'),
      readTime: '24x7',
      description: t('home.quickAction.emergencyDesc'),
      link: '/emergency-assist',
      ctaText: t('home.quickAction.emergencyCta'),
      icon: Siren,
      accentColor: '#F43F5E',
    },
    {
      title: t('home.quickAction.checkerTitle'),
      kicker: t('home.quickAction.checkerKicker'),
      readTime: 'Instant',
      description: t('home.quickAction.checkerDesc'),
      link: '/message-checker',
      ctaText: t('home.quickAction.checkerCta'),
      icon: ShieldCheck,
      accentColor: '#38BDF8',
    },
  ];

  return (
    <section className="my-16" aria-labelledby="flagship-modules-heading">
      <div className="mb-8">
        <span className="text-xs uppercase tracking-wider text-[#C9A96E] font-medium">
          {t('home.flagshipBadge')}
        </span>
        <h2 id="flagship-modules-heading" className="text-2xl md:text-3xl font-display font-bold text-[#F8FAFC] mt-1">
          {t('home.flagshipTitle')}
        </h2>
        <p className="text-sm text-[#94A3B8] max-w-xl mt-1">
          {t('home.flagshipSubtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {actions.map((act) => {
          const Icon = act.icon;
          return (
            <TiltCard key={act.link} className="flex flex-col justify-between group">
              <div>
                {/* Zero-pill metadata line with typographic separator */}
                <div className="flex items-center gap-2 text-xs text-[#94A3B8] mb-3">
                  <span className="font-semibold uppercase tracking-wider" style={{ color: act.accentColor }}>
                    {act.kicker}
                  </span>
                  <span aria-hidden="true">&middot;</span>
                  <span>{act.readTime}</span>
                </div>

                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{
                      backgroundColor: `${act.accentColor}18`,
                      border: `1px solid ${act.accentColor}35`,
                      color: act.accentColor,
                    }}
                  >
                    <Icon className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-bold text-[#F8FAFC]">
                    {act.title}
                  </h3>
                </div>

                <p className="text-xs text-[#CBD5E1] leading-relaxed mb-6">
                  {act.description}
                </p>
              </div>

              <div className="pt-4 border-t border-[rgba(201,169,110,0.12)]">
                <Link
                  to={act.link}
                  className="w-full inline-flex items-center justify-between text-xs font-semibold py-2 transition-colors focus-visible:outline-[#C9A96E]"
                  style={{ color: act.accentColor }}
                >
                  <span>{act.ctaText}</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                </Link>
              </div>
            </TiltCard>
          );
        })}
      </div>
    </section>
  );
};

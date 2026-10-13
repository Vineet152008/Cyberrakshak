import { Resource } from '../types/content';

/**
 * Official verified resources.
 * 'verifiedOn' is left empty ("") for all links until manually reviewed and confirmed by the reviewer.
 */
export const VERIFIED_RESOURCES: Resource[] = [
  {
    id: 'res_cybercrime_portal',
    titleKey: 'resources.portal.title',
    descriptionKey: 'resources.portal.desc',
    url: 'https://cybercrime.gov.in',
    sourceType: 'official_portal',
    verifiedOn: '', // Left blank until user manually verifies
    isOfficialGov: true,
    phoneContact: '1930',
  },
  {
    id: 'res_chakshu_sancharsaathi',
    titleKey: 'resources.chakshu.title',
    descriptionKey: 'resources.chakshu.desc',
    url: 'https://sancharsaathi.gov.in/sfc/',
    sourceType: 'official_portal',
    verifiedOn: '', // Left blank until user manually verifies
    isOfficialGov: true,
  },
  {
    id: 'res_rbi_sachet',
    titleKey: 'resources.sachet.title',
    descriptionKey: 'resources.sachet.desc',
    url: 'https://sachet.rbi.org.in',
    sourceType: 'regulatory_rbi',
    verifiedOn: '', // Left blank until user manually verifies
    isOfficialGov: true,
  },
  {
    id: 'res_rbi_kea',
    titleKey: 'resources.rbiKea.title',
    descriptionKey: 'resources.rbiKea.desc',
    url: 'https://cms.rbi.org.in',
    sourceType: 'regulatory_rbi',
    verifiedOn: '', // Left blank until user manually verifies
    isOfficialGov: true,
    phoneContact: '14440',
  },
  {
    id: 'res_cert_in',
    titleKey: 'resources.certin.title',
    descriptionKey: 'resources.certin.desc',
    url: 'https://www.cert-in.org.in',
    sourceType: 'law_enforcement',
    verifiedOn: '', // Left blank until user manually verifies
    isOfficialGov: true,
    phoneContact: '1800-11-4949',
  },
];

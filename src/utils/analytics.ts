import ReactGA from 'react-ga';
import TagManager from 'react-gtm-module';
import { MenuValue } from './meny-storage-utils';
import { initAmplitude } from 'utils/amplitude';
import { logAmplitudeEvent } from 'utils/amplitude';

const trackingId = 'UA-9127381-16';

const tagManagerArgs = {
    gtmId: 'GTM-PM9RP3',
    dataLayerName: 'dataLayer',
};

export enum AnalyticsCategory {
    Header = 'dekorator-header',
    Footer = 'dekorator-footer',
    Meny = 'dekorator-meny',
}

export type AnalyticsEventArgs = {
    category: AnalyticsCategory;
    action: string;
    context?: MenuValue;
    label?: string;
};

export const initAnalytics = () => {
    TagManager.initialize(tagManagerArgs);
    initAmplitude();
    ReactGA.initialize(trackingId, {
        titleCase: false,
        debug: false,
    });
};

export const analyticsEvent = (props: AnalyticsEventArgs) => {
    const { context, category, action, label } = props;
    const actionFinal = `${context ? context + '/' : ''}${action}`;

    logAmplitudeEvent('navigere', {
        destinasjon: label,
        lenketekst: actionFinal,
    });

    ReactGA.event({
        category: category,
        action: actionFinal.toLowerCase(),
        label: label || undefined,
    });
};
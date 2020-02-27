import { FooterLenke } from '../komponenter/footer/Footer-lenker';
import { MenuValue } from './meny-storage-utils';

export default class Environment {
    static BASE_URL: string;
    static BASE_URL_ENONIC: string;
    static API_INNLOGGINGSLINJE_URL: string;
    static API_VARSELINNBOKS_URL: string;
    static BACKEND_MENY_URL: string;
    static BACKEND_SOK_URL: string;
    static MINSIDE_ARBEIDSGIVER_URL: string;
    static DITT_NAV_URL: string;
    static LOGIN_URL: string;
    static LOGOUT_URL: string;

    // Parameters
    static language: string;
    static context: MenuValue;
    static stripped: string;
    static redirectToApp: string;
    static level: string;

    static settEnv = (result: any) => {
        Environment.BASE_URL = result.BASE_URL;
        Environment.BASE_URL_ENONIC = result.BASE_URL_ENONIC;
        Environment.API_INNLOGGINGSLINJE_URL = result.API_INNLOGGINGSLINJE_URL;
        Environment.API_VARSELINNBOKS_URL = result.API_VARSELINNBOKS_URL;
        Environment.MINSIDE_ARBEIDSGIVER_URL = result.MINSIDE_ARBEIDSGIVER_URL;
        Environment.BACKEND_MENY_URL = result.BACKEND_MENY_URL;
        Environment.BACKEND_SOK_URL = result.BACKEND_SOK_URL;
        Environment.DITT_NAV_URL = result.DITT_NAV_URL;
        Environment.LOGIN_URL = result.LOGIN_URL;
        Environment.LOGOUT_URL = result.LOGOUT_URL;

        // Parameters
        Environment.language = result.language;
        Environment.context = result.context;
        Environment.stripped = result.stripped;
        Environment.redirectToApp = result.redirectToApp;
        Environment.level = result.level;
    };
}

export const fetchEnv = () => {
    return new Promise(resolve => {
        const envDom = document.getElementById('decorator-env');
        if (envDom) {
            const url = envDom.getAttribute('data-src');
            if (url) {
                fetch(url)
                    .then(result => result.json())
                    .then(result => {
                        Environment.settEnv(result);
                        resolve(result);
                    })
                    .catch(error => {
                        throw error;
                    });
            }
        } else {
            throw 'Fant ikke data-src fra decorator-env i dom';
        }
    });
};

export const verifyWindowObj = () => {
    return typeof window !== 'undefined';
};

export const erNavDekoratoren = (): boolean => {
    return verifyWindowObj() && window.location.href.includes('/dekoratoren');
};

export const genererLenkerTilUrl = (footerlenker: FooterLenke[]) => {
    const lenker = footerlenker.map(lenke => {
        lenke.url = genererUrl(lenke.url);
        return lenke;
    });
    return lenker;
};

export const genererUrl = (lenke: string): string => {
    return lenke.startsWith('/') ? Environment.BASE_URL_ENONIC + lenke : lenke;
};

export const erDev =
    verifyWindowObj() &&
    process.env.NODE_ENV === 'development' &&
    window.location.origin.toLowerCase().includes('localhost');
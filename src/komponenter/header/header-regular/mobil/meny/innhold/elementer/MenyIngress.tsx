import React from 'react';
import Undertittel from 'nav-frontend-typografi/lib/undertittel';
import Lenke from 'nav-frontend-lenker';
import { arbeidsflateLenker } from 'komponenter/common/arbeidsflate-lenker/arbeidsflate-lenker';
import { useSelector } from 'react-redux';
import { AppState } from 'store/reducers';

const MenyIngress = ({
    className,
    inputext,
}: {
    className: string;
    inputext: string;
}) => {
    const { XP_BASE_URL } = useSelector((state: AppState) => state.environment);
    const lenke = arbeidsflateLenker(XP_BASE_URL).filter(
        (lenke) => lenke.key === inputext
    );

    const textToLowercase = inputext
        ? inputext
              .toUpperCase()
              .charAt(0)
              .concat(inputext.slice(1).toLowerCase())
        : '';

    if (!lenke.length) {
        return null;
    }

    return (
        <div className={className}>
            <Undertittel>{textToLowercase}</Undertittel>
            <Lenke href={lenke[0].url ? lenke[0].url : 'https://nav.no'}>
                Til forsiden
            </Lenke>
        </div>
    );
};

export default MenyIngress;

import React from 'react';
import BEMHelper from 'utils/bem';
import './SokMenyIkon.less';

type Props = {
    isOpen: boolean;
};

export const SokMenyIkon = ({ isOpen }: Props) => {
    const cls = BEMHelper('sok-meny-ikon');

    return (
        <div
            className={`${cls.className}${
                isOpen ? ` ${cls.className}--open` : ''
            }`}
        >
            <div className={cls.element('circle', isOpen ? 'open' : '')} />
            <div className={cls.element('line', isOpen ? 'open' : '')} />
            <div className={cls.element('line-x', isOpen ? 'open' : '')} />
        </div>
    );
};

export default SokMenyIkon;
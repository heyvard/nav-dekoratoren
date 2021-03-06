import React from 'react';
import { AnalyticsEventArgs, analyticsEvent } from 'utils/analytics';
import { HoyreChevron } from 'nav-frontend-chevron';
import Lock from 'ikoner/meny/Lock';
import './LenkeMedSporing.less';

type Props = {
    href: string;
    children: React.ReactNode;
    analyticsEventArgs?: AnalyticsEventArgs;
    className?: string;
    classNameOverride?: string;
    id?: string;
    onClick?: (...args: any) => void;
    tabIndex?: number;
    withChevron?: boolean;
    withLock?: boolean;
};

export const LenkeMedSporing = ({
    href,
    children,
    analyticsEventArgs,
    className,
    classNameOverride,
    id,
    onClick,
    tabIndex,
    withChevron,
    withLock,
}: Props) => {
    const classnameFull = `${classNameOverride || 'lenke dekorator-lenke'}${
        withChevron ? ' chevronlenke' : ''
    }${className ? ` ${className}` : ''}`;

    return (
        <a
            href={href}
            className={classnameFull}
            id={id}
            tabIndex={tabIndex}
            onAuxClick={(event: React.MouseEvent) =>
                analyticsEventArgs &&
                event.button &&
                event.button === 1 &&
                analyticsEvent(analyticsEventArgs)
            }
            onClick={(event: React.MouseEvent) => {
                if (onClick) {
                    onClick(event);
                }
                if (analyticsEventArgs) {
                    analyticsEvent(analyticsEventArgs);
                }
            }}
        >
            <>
                {(withLock || withChevron) && (
                    <div className={'dekorator-lenke__ikon-container'}>
                        {withLock ? (
                            <Lock height={'18px'} width={'18px'} />
                        ) : (
                            withChevron && (
                                <HoyreChevron
                                    className={'chevronlenke__chevron'}
                                />
                            )
                        )}
                    </div>
                )}
                {children}
            </>
        </a>
    );
};

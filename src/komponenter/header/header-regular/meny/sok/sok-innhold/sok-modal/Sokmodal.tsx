import React from 'react';
import ModalWrapper from 'nav-frontend-modal';
import Modal from 'nav-frontend-modal';
import Innholdstittel from 'nav-frontend-typografi/lib/innholdstittel';
import BEMHelper from 'utils/bem';
import Navlogo from 'ikoner/meny/Navlogo';
import Lukknapp from './sok-modal-knapp/Lukknapp';
import { verifyWindowObj } from 'utils/Environment';
import Sok from '../../Sok';
import './Sokmodal.less';

interface Props {
    modalerApen: boolean;
    sokeknappToggle: () => void;
}

const cls = BEMHelper('sok-modal');

class SokModal extends React.Component<Props, {}> {
    constructor(props: Props) {
        super(props);
    }

    componentDidMount(): void {
        if (verifyWindowObj()) {
            Modal.setAppElement(
                document.getElementById('decorator-header')
                    ? '#decorator-header'
                    : 'body'
            );
        }
    }

    render() {
        return (
            <ModalWrapper
                isOpen={this.props.modalerApen}
                contentLabel={'mobilt sokefelt for nav.no'}
                onRequestClose={() => this.props.sokeknappToggle()}
                className="navno-dekorator sok-modal__overlay"
            >
                <div className={`${cls.className} sok-modal__body`}>
                    <div className={cls.element('header')}>
                        <div className={cls.element('logo')}>
                            <Navlogo
                                color="white"
                                viewIndex={this.props.modalerApen}
                            />
                        </div>
                        <div className={cls.element('lukknapp')}>
                            <Lukknapp
                                lukkvindu={this.props.sokeknappToggle}
                                tabindex={this.props.modalerApen}
                            />
                        </div>
                    </div>
                    <div className={cls.element('veiledende-tekst')}>
                        <Innholdstittel>Hva leter du etter?</Innholdstittel>
                    </div>
                    <div className={cls.element('sokefelt')}>
                        <Sok tabindex={this.props.modalerApen} />
                    </div>
                </div>
            </ModalWrapper>
        );
    }
}

export default SokModal;
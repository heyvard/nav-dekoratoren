import React, { useState } from 'react';
import { Textarea, RadioGruppe, Radio } from 'nav-frontend-skjema';
import { Element, Ingress } from 'nav-frontend-typografi';
import Alertstripe from 'nav-frontend-alertstriper';
import { Hovedknapp } from 'nav-frontend-knapper';
import Tekst from 'tekster/finn-tekst';
import './Elaborated.less';
import { verifyWindowObj } from 'utils/Environment';
import FeedbackMessage from '../common/FeedbackMessage';
import sendFeedbackNo from './send-feedback-no';

const { logAmplitudeEvent } = verifyWindowObj()
    ? require('utils/amplitude')
    : () => null;

const Elaborated = () => {
    const [errorTitle, setErrorTitle] = useState(String);
    const [radiobuttonErrorMessage, setRadiobuttonErrorMessage] = useState(String);

    const [feedbackMessage, setFeedbackMessage] = useState('');

    const submitFeedback = (evt: any) => {
        evt.preventDefault();
        logAmplitudeEvent('tilbakemelding_mangler', {svar: errorTitle});

        if (!errorTitle.length) {
            setRadiobuttonErrorMessage('Du må velge et alternativ');
        } else {
            setRadiobuttonErrorMessage('');
            sendFeedbackNo(errorTitle, feedbackMessage);
        }
    };

    return (
        <div className="eloborated-container">
            <Ingress>
                <Tekst id="rapporter-om-feil-mangler" />
            </Ingress>

            <form onSubmit={submitFeedback} className="content">
                <Element className="tekst"> Type feil eller mangel </Element>

                <RadioGruppe
                    feil={radiobuttonErrorMessage}
                    // @ts-ignore
                    onChange={(e) => setErrorTitle(e.target.value)}
                    checked={errorTitle}
                >
                    <Radio label={'Informasjon'} name="feil" value="informasjon"/>
                    <Radio label={'Ytelse'} name="feil" value="ytelse"/>
                    <Radio label={'Utseende'} name="feil" value="utseende"/>
                    <Radio label={'Bug'} name="feil" value="bug"/>
                    <Radio label={'Annet'} name="feil" value="annet"/>
                </RadioGruppe>

                <div>
                    <Element className="tekst">
                        <Tekst id="din-tilbakemelding" />
                    </Element>

                    <div className="advarsel">
                        <Alertstripe type="advarsel">
                            <Tekst id="advarsel-om-personopplysninger" />
                        </Alertstripe>
                    </div>

                    <FeedbackMessage
                        feedbackMessage={feedbackMessage}
                        setFeedbackMessage={setFeedbackMessage}
                    />

                    <div className="submit-knapp">
                        <Hovedknapp htmlType="submit">
                            <Tekst id="send-inn-feilrapport" />
                        </Hovedknapp>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Elaborated;

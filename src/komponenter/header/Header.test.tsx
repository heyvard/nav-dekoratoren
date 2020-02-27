import React from 'react';
import { mount } from 'enzyme';
import { Language, languageDuck } from '../../reducer/language-duck';
import { Header } from './Header';
import Arbeidsflatemeny from './arbeidsflatemeny/Arbeidsflatemeny';
import { createStore, Store } from 'redux';
import { Provider } from 'react-redux';
import { reducer } from '../../reducer/reducer';

const mountWithRedux = (store: Store) =>
    mount(
        <Provider store={store}>
            <Header />
        </Provider>
    );

const store = createStore(reducer);

describe('<Header>', () => {
    it('Skal rendre <Arbeidsflatemeny> komponent hvis språk er norsk', () => {
        store.dispatch(
            languageDuck.actionCreator({ language: Language.NORSK })
        );
        expect(mountWithRedux(store).find(Arbeidsflatemeny)).toHaveLength(1);
    });

    it('Skal ikke rendre <Arbeidsflatemeny> komponent hvis språk er engelsk', () => {
        store.dispatch(
            languageDuck.actionCreator({ language: Language.ENGELSK })
        );
        expect(mountWithRedux(store).find(Arbeidsflatemeny)).toHaveLength(0);
    });

    it('Skal ikke rendre <Arbeidsflatemeny> komponent hvis språk er samisk', () => {
        store.dispatch(
            languageDuck.actionCreator({ language: Language.SAMISK })
        );
        expect(mountWithRedux(store).find(Arbeidsflatemeny)).toHaveLength(0);
    });
});
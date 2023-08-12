import { useContext } from 'react';
import './style.sass';
import { format, parseISO } from 'date-fns';
import { useTemplateVal, useMedia } from '@dsplay/react-template-utils';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from '../../contexts/themeContext';
import ItemList from '../pagination';

function Main() {
  const { globalTheme } = useContext(ThemeContext);

  const logoPicture = useTemplateVal('logoPicture', '');
  const media = useMedia();
  const { airlineInformation } = media;
  const viewWidth = window.innerWidth;
  const { t } = useTranslation();

  let { planePicture } = airlineInformation;

  if (planePicture !== 'up' && planePicture !== 'down') {
    planePicture = 'up';
  }

  const tableContent = airlineInformation.flights.map((flight, index) => {
    const lineColor = (viewWidth < 700 || index % 2 !== 0) ? globalTheme.lineColor : '';

    return (
      <tr
        key={flight.flight + flight.airline}
        style={{ backgroundColor: viewWidth > 700 ? lineColor : '' }}
      >
        <td>{flight.destination}</td>
        <td style={{ backgroundColor: viewWidth < 700 ? lineColor : '' }}>{flight.flight}</td>
        <td>
          <img
            src={flight.airline === '' ? './assets/earth.png' : flight.airline}
            alt="Airline"
            className="airline-img"
          />
        </td>
        <td style={{ backgroundColor: viewWidth < 700 ? lineColor : '' }}>
          {format(parseISO(flight.time), 'HH:mm a')}
        </td>
        <td>{flight.gate}</td>
        <td style={{ backgroundColor: viewWidth < 700 ? lineColor : '' }}>{flight.status}</td>
      </tr>
    );
  });

  return (
    <div className="main">
      <header style={{ backgroundColor: globalTheme.primaryColor }}>
        {
          viewWidth < 700 ? (
            <>
              <section id="sectionHeader">
                <div id="logo">
                  <img src={logoPicture === '' ? 'dsplayLogo.png' : logoPicture} alt="" />
                </div>
                <div>
                  <div>
                    <h1>{airlineInformation.departuresOrArrivals}</h1>
                    <img src={`./assets/${planePicture}.png`} alt="" />
                  </div>
                  <div>
                    <h1>{airlineInformation.airportName}</h1>
                  </div>
                </div>
              </section>
            </>
          ) : (
            <>
              <section>
                <div id="logo">
                  <img src={logoPicture} alt="" />
                </div>
                <div>
                  <h1>{airlineInformation.departuresOrArrivals}</h1>
                  <img src={`assets/${planePicture}.png`} alt="" />
                </div>
              </section>
              <section>
                <h1>{airlineInformation.airportName}</h1>
              </section>
            </>
          )
        }
      </header>
      <section className="table" id="table">
        <table>
          <thead>
            <tr style={{ backgroundColor: globalTheme.secondaryColor }}>
              <th>{t('destination')}</th>
              <th>{t('flight')}</th>
              <th>{t('airline')}</th>
              <th>{t('time')}</th>
              <th>{t('gate')}</th>
              <th>{t('status')}</th>
            </tr>
          </thead>
          <tbody>
            {/* {
              showContent
            } */}
            <ItemList items={tableContent} />
          </tbody>
        </table>
      </section>
      <footer style={{ backgroundColor: globalTheme.secondaryColor }}>
        {t('update')}
        {' '}
        {format(parseISO(airlineInformation.lastUpdate), 'HH:mm a EEEE MMM dd, yyyy')}
      </footer>
    </div>

  );
}

export default Main;

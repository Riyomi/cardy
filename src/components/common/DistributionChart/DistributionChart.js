import Chart from 'react-apexcharts';
import { getSeenCards } from 'utils/utils';

const DistributionChart = ({ deck }) => {
  const options = {
    labels: ['Mastered', 'Studied', 'New'],
    colors: ['#167d47', '#25ac64', '#000'],
    title: {
      text: 'Card distribution',
      style: {
        fontSize: '16px',
        fontFamily: 'Open Sans',
        color: '#263238',
      },
    },
  };

  const getSeries = () => {
    const mastered = deck.mastered;
    const studied = getSeenCards(deck.cards) - mastered;
    const newCards = deck.cards.length - mastered - studied;
    return [mastered, studied, newCards];
  };

  return (
    <div id="card-distribution">
      {deck.cards.length ? (
        <Chart
          options={options}
          series={getSeries()}
          type="pie"
          width="100%"
          height={200}
        />
      ) : (
        <div>
          <h3>Cards distribution</h3>
          <p>This deck doesn't contain any cards yet</p>
        </div>
      )}
    </div>
  );
};

export default DistributionChart;

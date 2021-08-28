import axios from 'axios';
import DeckBody from 'components/DeckDetails/DeckBody/DeckBody';
import DeckHeader from 'components/DeckDetails/DeckHeader/DeckHeader';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const DeckDetails = () => {
  const { id } = useParams();
  const [deck, setDeck] = useState({});

  useEffect(() => {
    axios
      .get('http://localhost:8080/decks/' + Number(id))
      .then((res) => setDeck(res.data));
  }, [id]);

  return (
    <div>
      <DeckHeader deck={deck} />
      <DeckBody deck={deck} />
    </div>
  );
};

export default DeckDetails;

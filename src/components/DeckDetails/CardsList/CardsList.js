const CardsList = ({ cards, editable }) => {
  return (
    <div id="cards-list">
      <h3>Cards ({cards.length})</h3>
      <table>
        <thead>
          <tr>
            <th>Index</th>
            <th>Front</th>
            <th>Back</th>
            {editable && <th></th>}
          </tr>
        </thead>
        <tbody>
          {cards.map((card, index) => (
            <tr key={index}>
              <td>#{index + 1}</td>
              <td>{card.front}</td>
              <td>{card.back}</td>
              {editable && (
                <td>
                  <button className="btn">delete</button>
                </td>
              )}
            </tr>
          ))}
          {editable && (
            <tr>
              <td></td>
              <td>
                <input type="text" />
              </td>
              <td>
                <input type="text" />
              </td>
              <td>
                <button className="btn">add</button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CardsList;

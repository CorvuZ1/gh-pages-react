import classes from "./Table.module.scss";

function Table({ data }) {
  const formatData = () => {
    const headers = [];
    const rowsContent = [];

    for (let i = 0; i < data.length; i++) {
      let row = data[i];

      for (let key in row) {
        if (!headers.includes(key)) {
          headers.push(key);
        }
      }

      rowsContent.push(Object.values(row));
    }
    return [headers, rowsContent];
  };

  const [headers, rowsContent] = formatData();

  return (
    <div className={classes.root}>
      <div className={classes.row}>
        {headers.map((title, index) => (
          <div key={index} className={classes.item}>
            {title}
          </div>
        ))}
      </div>
      {rowsContent.map(([id, ...row]) => (
        <div key={id} className={classes.row}>
          <div className={classes.item}>{id}</div>
          {row.map((item, index) => (
            <div key={index} className={classes.item}>
              {item}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Table;

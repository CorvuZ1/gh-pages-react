import { useEffect, useState } from "react";
import Table from "./components/Table/Table";
import Loader from "./components/Loader/Loader";
import axios from "axios";
import Container from "./components/Container/Container";
import Multiselect from "./components/Multiselect/Multiselect";

function App() {
  const rickAndMortyApi = "https://rickandmortyapi.com/api/location/";
  const mockApi = "/mock.json";

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [apiVariant, setApiVariant] = useState(rickAndMortyApi);
  const [filters, setFilters] = useState({ count: 5, words: [], data: [] });
  const [counter, setCounter] = useState(5);
  const keyFilter = apiVariant === rickAndMortyApi ? "type" : "country";

  const filterByKey = key => {
    const result = data.reduce((acc, curr) => {
      Object.entries(curr).forEach(item => {
        if (item[0] === key) {
          if (acc[item[0]] == null) {
            acc[item[0]] = [];
          }

          if (!acc[item[0]].includes(item[1])) {
            acc[item[0]].push(item[1]);
          }
        }
      });
      return acc;
    }, {});

    return result[key];
  }

  const doFilter = dataArray => {
    setFilters(prev => {
      const newArray = [...dataArray];

      if (prev.words.length > 0) {
        return {
          ...prev,
          data: newArray.filter(el => prev.words.includes(el[keyFilter])).splice(0, filters.count)
        };
      }

      return { ...prev, data: newArray.splice(0, prev.count) };
    });
  };

  useEffect(() => {
    axios
      .get(apiVariant)
      .then(response => {
        const { results } = response.data;

        setData(results);
        doFilter(results);
        setIsLoading(false);
      })
      .catch(e => console.log(e));

    setFilters(prev => {
      return { ...prev, count: counter, words: [] };
    });
  }, [apiVariant]);

  useEffect(() => {
    doFilter(data);
  }, [filters.count, filters.words]);

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <Container>
          <div className="d-flex flex-wrap">
            <select
              className="mr mb"
              defaultValue={apiVariant}
              onChange={event => {
                setIsLoading(true);
                setApiVariant(event.target.value);
              }}
            >
              <option value={rickAndMortyApi}>Рик и Морти</option>
              <option value={mockApi}>Mock API</option>
            </select>
            <select
              className="mr mb"
              defaultValue={filters.count}
              onChange={event => {
                const value = parseInt(event.target.value);

                setFilters(prev => {
                  return { ...prev, count: value };
                });
                setCounter(value);
              }}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
            <div className="mb">
              <Multiselect setFilters={setFilters} values={filterByKey(keyFilter)} />
            </div>
          </div>
          <Table data={filters.data} />
          <button
            className="mt cursor-pointer"
            onClick={() => {
              setFilters(prev => {
                const newOriginData = [...data];
                const newCount = prev.count + counter;

                return {
                  ...prev,
                  count: newCount,
                  data: newOriginData.splice(prev.count, newCount)
                };
              });
            }}
          >
            Больше
          </button>
        </Container>
      )}
    </div>
  );
}

export default App;

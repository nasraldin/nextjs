import React, { Component } from "react";
import Head from "next/head";
import ClientOnly from "../components/ClientOnly";
import Flights from "../components/Flights";
import styles from "../styles/Home.module.css";
import {
  debounce,
  getLocationCode,
  getTomorrowDate,
  getOnDate,
} from "../util/utils";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: {},
      loading: false,
      showSearch: false,
      noResults: false,
    };
  }

  onChange = (e) => {
    const value = e.target.value;

    this.setState({
      showSearch: !this.state.showSearch,
      noResults: !this.state.noResults,
    });

    this.handleFilter(value);
  };

  handleFilter = debounce((val) => {
    const result = onSearch(val);
    this.setState({
      query: result.searchQuery,
      loading: result.isValid,
      showSearch: false,
      noResults: !result.isValid,
    });
  }, 300);

  render() {
    return (
      <div className={styles.container}>
        <Head>
          <title>Flights search</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          <h1 className={styles.title}>Flights search</h1>
          <p className={styles.description}>
            Trips tailored to your every need
          </p>

          <div className={styles.search_wrp}>
            <input
              className={styles.search}
              type="text"
              onChange={this.onChange.bind(this)}
              placeholder="Flights from DXB to BEY tomorrow"
            />
          </div>

          {!!this.state.showSearch && <p>Searching...</p>}
          {this.state.noResults && <p>Sorry, no results.</p>}

          {this.state.loading && (
            <ClientOnly>
              <Flights
                searchQuery={this.state.query}
                loadFlights={this.state.loading}
              />
            </ClientOnly>
          )}
        </main>

        <footer className={styles.footer}>
          <a
            href="https://astrotabs.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by{" "}
            <img
              src="/astrotabs.svg"
              alt="astrotabs Logo"
              className={styles.logo}
            />{" "}
            astrotabs
          </a>
        </footer>
      </div>
    );
  }
}

export function onSearch(searchQuery) {
  const from = getLocationCode(searchQuery, "from");
  const to = getLocationCode(searchQuery, "to");
  const dateOn = getOnDate(searchQuery, "on");
  const isTomorrow = searchQuery.includes("tomorrow");

  const query = {
    originLocationCode: `${from}`,
    destinationLocationCode: `${to}`,
    departureDate: `${isTomorrow ? getTomorrowDate() : dateOn}`,
  };

  if (
    query.departureDate !== "undefined" &&
    searchQuery.includes("from") &&
    searchQuery.includes("to") &&
    (searchQuery.includes("on") || searchQuery.includes("tomorrow"))
  ) {
    return {
      searchQuery: query,
      isValid: true,
    };
  } else {
    return {
      searchQuery: query,
      isValid: false,
    };
  }
}

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
  searchQuery = {
    originLocationCode: "DXB",
    destinationLocationCode: "BEY",
    departureDate: "2021-04-19",
  };

  loading = true;

  onChange = (e) => {
    const value = e.target.value;
    this.handleFilter(value);
  };

  handleFilter = debounce((val) => {
    onSearch(val);
  }, 300);

  render() {
    // const { loading } = this.props.data;
    // const { items } = this.props.data.listIceCreams;
    return (
      // <div className="App">
      //   <input
      //     style={styles.input}
      //     onChange={this.onChange.bind(this)}
      //     placeholder="Search for ice cream"
      //   />
      //   {!!loading && <p>Searching...</p>}
      //   {!loading && !items.length && <p>Sorry, no results.</p>}
      //   {!loading &&
      //     items.map((item, index) => (
      //       <div key={index} style={styles.container}>
      //         <p style={styles.title}>{item.name}</p>
      //         <p style={styles.description}>{item.description}</p>
      //       </div>
      //     ))}
      // </div>

      <div className={styles.container}>
        <Head>
          <title>Create Next App</title>
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

          <ClientOnly>
            <Flights
              searchQuery={this.searchQuery}
              loadFlights={this.loading}
            />
          </ClientOnly>
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

  console.log(from, to, isTomorrow, getTomorrowDate(), dateOn);
}
